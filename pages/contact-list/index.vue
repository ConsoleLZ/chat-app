<template>
	<navbar-comp title="联系人" />
	<uv-list :style="`padding-top: ${statusBarHeight + 120}rpx;`">
		<uv-list-item @click="onJumpNew" title="新朋友" note="交友需谨慎哦" link></uv-list-item>
	</uv-list>
	<uv-tabs :list="tabList" @click="onChangeTabs"></uv-tabs>
	<view>
		<view v-if="tabsIndex === 0">
			<uv-collapse ref="collapseRef" accordion :border="false" value="expand">
				<uv-collapse-item title="特别关心">111</uv-collapse-item>
				<uv-collapse-item title="家人">111</uv-collapse-item>
				<uv-collapse-item title="同学">111</uv-collapse-item>
				<uv-collapse-item title="朋友">111</uv-collapse-item>
				<uv-collapse-item title="好友" name="expand">
					<collapse-data-comp :data="classifyContactsData?.normal" />
				</uv-collapse-item>
			</uv-collapse>
		</view>
		<view v-else-if="tabsIndex === 1">222</view>
	</view>
	<uv-toast ref="toastRef"></uv-toast>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
