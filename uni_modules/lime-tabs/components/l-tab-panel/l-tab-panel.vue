<template>
	<view class="l-tab__panel" aria-role="tabpanel">
		<slot/>
	</view>
</template>
<script lang="ts">
	// @ts-nocheck
	import {onMounted, defineComponent, inject, onUnmounted} from '@/uni_modules/lime-shared/vue';
	import panelProps from './props';
	export default defineComponent({
		name: 'l-tab-panel',
		props: panelProps,
		setup(props) {
			const children = inject<LTabPanelComponentPublicInstance[]|null>('LimeTabs', null) as Ref<LTabPanelComponentPublicInstance[]>|null;
			onMounted(()=>{
				if(!children) return
				children.value.push(props)
			})
			
			onUnmounted(()=>{
				if(!children) return
				children.value = children.value.filter((it):boolean => it != props)
			})
			
			return {
				
			}
		}
	})
</script>
<style lang="scss">
	@import './index';
</style>
