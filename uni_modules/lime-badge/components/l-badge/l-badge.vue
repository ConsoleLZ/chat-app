<template>
	<view class="l-badge__wrapper" v-if="$slots.default">
		<slot></slot>
		<view v-if="hasContent || props.dot" class="l-badge" :class="classes" :style="[styles]">
			<slot v-if="$slots.content" name="content"></slot>
			<block v-else-if="renderContent">{{ renderContent }}</block>
		</view>
	</view>
	<view v-else-if="hasContent || props.dot" class="l-badge" :class="classes" :style="[styles]">
		<slot v-if="$slots.content" name="content"></slot>
		<block v-else-if="renderContent">{{ renderContent }}</block>
	</view>
</template>
<script lang="ts">
	// @ts-nocheck
	import { computed, defineComponent, getCurrentInstance, onMounted } from '@/uni_modules/lime-shared/vue'
	import badgeProps from './props'
	import { isNumeric } from '@/uni_modules/lime-shared/isNumeric'
	import { isNumber } from '@/uni_modules/lime-shared/isNumber'
	import { addUnit } from '@/uni_modules/lime-shared/addUnit'
	import { isDef } from '@/uni_modules/lime-shared/isDef'
	import { getClassStr } from '@/uni_modules/lime-shared/getClassStr'
	import { getOffsetWithMinusString } from './utils'
	const name = 'l-badge'
	interface CSSProperties {
		[key : string] : string | number | undefined;
	}
	export default defineComponent({
		name,
		props: badgeProps,
		setup(props) {
			const context = getCurrentInstance()
			// vue2 setup 解构的 slots 为空
			const classes = computed(() => {
				return getClassStr({
					[`${name}--fixed`]: context.slots.default,
					[`${name}--dot`]: props.dot,
					[`${name}--${props.position}`]: Boolean(context.slots['default'])
				})
			})
			const styles = computed(() => {
				const style : CSSProperties = {
					background: props.color,
				};
				if (props.offset) {
					const [x, y] = props.offset;
					const { position } = props;
					const [offsetY, offsetX] = `${position}`.split('-') as ['top' | 'bottom', 'left' | 'right'];
					if (context.slots.default) {
						if (isNumber(y)) {
							style[offsetY] = addUnit(offsetY === 'top' ? y : -y);
						} else {
							style[offsetY] = offsetY === 'top' ? addUnit(y) : getOffsetWithMinusString(`${y}`);
						}
						if (isNumber(x)) {
							style[offsetX] = addUnit(offsetX === 'left' ? x : -x);
						} else {
							style[offsetX] = offsetX === 'left' ? addUnit(x) : getOffsetWithMinusString(`${x}`);
						}
					} else {
						style.marginTop = addUnit(y);
						style.marginLeft = addUnit(x);
					}
				}
				return style
			})
			const hasContent = computed(() => {
				if (Boolean(context.slots.content)) {
					return !0
				}
				const { content, showZero } = props;
				return (isDef(content) && content !== '' && (showZero || (content !== 0 && content !== '0')));

			})
			const renderContent = computed(() => {
				const { dot, max, content } = props;

				if (!dot && hasContent.value) {
					//@ts-ignore
					if (isDef(max) && max != 0 && isDef(content) && isNumeric(content!) && +content > +max) {
						return `${max}+`
					}
				}
				return content
			})


			return {
				props,
				classes,
				styles,
				hasContent,
				renderContent
			}
		}
	})
</script>
<style lang="scss">
	@import './index-u';
</style>