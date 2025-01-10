<template>
	<view class="l-tabs">
		<view class="l-tabs__wrap" :style="[styles]">
			<slot name="left"></slot>
			<scroll-view class="l-tabs__scroll" 
				:class="{'l-tabs__scroll--split': split}"
				enhanced 
				enable-flex 
				:scroll-left="scrollLeft" 
				scroll-x 
				scroll-anchoring
				scroll-with-animation 
				enable-passive 
				:show-scrollbar="false" 
				@scroll="onScroll">
				<view class="l-tabs__nav">
					<view class="l-tabs__item" 
						:style="{color: !item.disabled && (index == currentIndex ? activeColor : color)}"
						:class="[
							'l-tabs__item-text--' + size, 
							{
								
								'l-tabs__item--active': index == currentIndex, 
								'l-tabs__item--evenly': spaceEvenly, 
								'l-tabs__item--disabled': item.disabled
							}
						]" 
						v-for="(item, index) in tabs" 
						:key="index" 
						@tap="onClick(index, item)" aria-role="tab">
						<l-badge 
							v-if="item.dot == true || item.badge" 
							:dot="item.dot"
							:offset="item.offset"
							:content="item.badge">
							<view class="l-tabs__item-text l-ellipsis">
								{{item.label}}
							</view>
						</l-badge>
						<view v-else class="l-tabs__item-text l-ellipsis">
							{{item.label}}
						</view>
					</view>
					<view class="l-tabs__track" :style="[trackStyle]"></view>
				</view>
			</scroll-view>
			<slot name="right"></slot>
		</view>
		<view class="l-tabs__content"
			@touchstart="onTouchStart"
			@touchmove="onTouchMove"
			@touchend="onTouchEnd"
			@touchcancel="onTouchEnd"
			:class="{'l-tabs__content--animated': animated}"
			v-if="$slots['default']">
			<view class="l-tabs__content-inner" :style="[innerStyle]" ref="innerRef">
				<slot></slot>
			</view>  
		</view>
	</view>
</template>
<script lang="ts">
	// @ts-nocheck
	import { defineComponent, ref, provide, reactive, getCurrentInstance, watch, computed, ComputedRef, onUnmounted, nextTick, onMounted } from '@/uni_modules/lime-shared/vue';
	import tabsProps from './props'
	import { TabPanel } from './type';
	import { getRect, getAllRect } from '@/uni_modules/lime-shared/getRect'
	import { clamp } from '@/uni_modules/lime-shared/clamp'
	import { calcScrollOffset, ease } from './utils'
	import { useTouch } from './touch';
	// import { onReady } from '@dcloudio/uni-app'
	export default defineComponent({
		name: 'l-tabs',
		props: tabsProps,
		options: {
			addGlobalClass: true,
			virtualHost: true,
		},
		emits: ['update:modelValue', 'change', 'input', 'click'],
		setup(props, {emit}) {
			const context = getCurrentInstance().proxy!
			const scrollLeft = ref(0)
			const lastLeft = ref(0)
			const trackDistance =ref(0)
			const children = ref([])
			const innerStyle = reactive({
				width: '',
				'transition-duration': ``,
				'transform': ``,
			})
			const currentValue = computed({
				set(value: number) {
					emit('update:modelValue', value)
					emit('change', value)
					// #ifdef VUE2
					emit('input', value)
					// #endif
				},
				get():number {
					return props.value ?? props.modelValue ?? 0
				}
			} as WritableComputedOptions<number>);
			
			const styles = computed(()=>{
				const style:Record<string, any> = {};
				if(props.bgColor) {
					style['background'] = props.bgColor
				}
				return style
			})
			
			const trackStyle = computed(():Map<string, any>=>{
				const style:Record<string, any> = {
					'-webkit-transform': `translateX(${trackDistance.value}px)`,
					'transform': `translateX(${trackDistance.value}px)`,
				};
				if(props.lineColor) {
					style['background'] = props.lineColor!
				}
				if(props.lineWidth) {
					style['width']=  props.lineWidth!
				}
				if(props.lineHeight) {
					style['height'] = props.lineHeight!
				}
				return style
			})
			
			const tabs : ComputedRef<TabPanel[]> = computed(() => {
				if (props.list) return props.list as TabPanel[]
				return children.value
			})
			
			const currentIndex = computed(() => {
				const index = tabs.value.findIndex((child, index) => (child.value || index) == currentValue.value)
				if (index >= 0) return index
				return 0
			})
			
			const moveToActiveTab = () => {
				nextTick(()=>{
					try {
						Promise.all([
							getRect(`.l-tabs__scroll`, context), 
							getRect(`.l-tabs__track`, context), 
							getAllRect(`.l-tabs__item`, context)
						]).then(([scrollRect, trackRect, tabRects])=> {
							const tabRect = tabRects[currentIndex.value];
							if (!tabRect) return;
							
							let count = 0;
							let distance = 0;
							let totalSize = 0;
							
							tabRects.forEach((item: any) => {
								if (count < currentIndex.value) {
									distance += item.width;
									count += 1;
								}
								totalSize += item.width;
							});
							if(totalSize == 0) return
							const size = calcScrollOffset(scrollRect.width, tabRect.left, tabRect.width, lastLeft.value);
							const maxOffset = totalSize - scrollRect.width;
							scrollLeft.value = clamp(size, 0, maxOffset)
							
							distance += (tabRect.width - trackRect.width) / 2;
							trackDistance.value = distance;
							
						})
					} catch (e) {
						console.error(e)
					}
				})
			}
			const updateInnerStyle = (offset: number) => {
				if(props.list.length > 0) return
				nextTick(()=>{
					Promise.all(
						[
							getRect('.l-tabs__content', context), 
							getRect('.l-tabs__content-inner', context)
						]).then(([parent, inner])=>{
							const left = -parent.width * currentIndex.value + offset;
							if(offset !=0) {
								innerStyle.transform = `translateX(${left}px)`
								innerStyle['transition-duration'] = `0s`
							} else {
								if(props.animated){
									innerStyle['transition-duration'] = offset != 0 || !props.animated ? '0s' : `${props.duration}s`
								}
								innerStyle.transform = `translateX(${left}px)`
							}
					})
				})
			}
			
			
			const onScroll = (e) => {
				scrollLeft.value = e.detail.scrollLeft
			}
			
			const onClick = (index : number, item : TabPanel) => {
				const { value = index, disabled, label } = item;
				if (disabled || currentValue.value === value) {return}
				currentValue.value = value
				emit('click', value)
				moveToActiveTab()
			}
			const getAvailableTabIndex = (deltaX: number):number => {
				const step = deltaX > 0 ? -1 : 1;
				const len = tabs.value.length;
				for (let i = step; currentIndex.value + step >= 0 && currentIndex.value + step < len; i += step) {
					const newIndex = currentIndex.value + i;
					
					if (newIndex >= 0 && newIndex < len && tabs.value.length > newIndex && !tabs.value[newIndex].disabled) {
					   return newIndex;
					}
				}
				return -1; 
			}
			const touch = useTouch();
			const onTouchStart = (event: UniTouchEvent) => {
				if (!props.swipeable) return;
				 touch.start(event);
			}
			const onTouchMove = (event: UniTouchEvent) => {
				if (!props.swipeable) return;
				touch.move(event);
				const {direction, deltaX, startX } = touch
				if(direction.value != 'horizontal') return
				if(!props.animated) return	
				const isAtFirstTab = currentIndex.value == 0;
				const isAtLastTab = currentIndex.value == tabs.value.length - 1;
				
				if ((isAtFirstTab && deltaX.value > 0) || (isAtLastTab && deltaX.value < 0)) {
					 const base = isAtFirstTab ? 1 : -1;
					const adjustedDelta = ease(deltaX.value, base);
					updateInnerStyle(adjustedDelta);
				} else {
					updateInnerStyle(deltaX.value);
				}
			}
			const onTouchEnd = () => {
				if (!props.swipeable) return;
				const {direction, deltaX, offsetX } = touch
				const minSwipeDistance = 50;
				if(direction.value == 'horizontal' && offsetX.value >= minSwipeDistance) {
					const index = getAvailableTabIndex(deltaX.value);
					if (index != -1) {
						onClick(index, tabs.value[index])
					}
				}
				updateInnerStyle(0)
			}
			
			const stopWatch = watch(tabs, (v) => {
				moveToActiveTab()
			})
			const stopValueWatch = watch(currentValue, (_v:number)=>{
				moveToActiveTab()
				updateInnerStyle(0)
			})
			
			const stopVisibleWatch = watch(()=> props.visible, (v)=>{
				if(v) {
					moveToActiveTab()
					updateInnerStyle(0)
				}
			})
			onMounted(() => {
				if(tabs.value.length == 0) return
				moveToActiveTab()
				updateInnerStyle(0)
			})
			onUnmounted(()=>{
				stopWatch()
				stopVisibleWatch()
				stopValueWatch()
			})
			
			provide('LimeTabs', children)
			return {
				styles,
				
				tabs,
				scrollLeft,
				currentValue,
				currentIndex,
				trackStyle,
				innerStyle,
				onScroll,
				onClick,
				onTouchStart,
				onTouchMove,
				onTouchEnd
			}
		}
	})
</script>
<style lang="scss">
	@import './index';
</style>