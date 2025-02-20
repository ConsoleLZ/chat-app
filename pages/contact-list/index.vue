<template>
	<navbar-comp title="联系人" />
	<uv-list :style="`padding-top: ${statusBarHeight + 120}rpx;`">
		<uv-list-item @click="onJumpNew" title="新朋友" note="交友需谨慎哦" link></uv-list-item>
	</uv-list>
	<uv-tabs :list="tabList" @click="onChangeTabs"></uv-tabs>
	<view>
		<view v-if="tabsIndex === 0">
			<uv-collapse ref="collapseRef" accordion :border="false" value="expand">
				<uv-collapse-item title="特别关心">
					<collapse-data-comp :data="classifyContactsData?.particularly" />
				</uv-collapse-item>
				<uv-collapse-item title="家人">
					<collapse-data-comp :data="classifyContactsData?.family" />
				</uv-collapse-item>
				<uv-collapse-item title="同学">
					<collapse-data-comp :data="classifyContactsData?.schoolmate" />
				</uv-collapse-item>
				<uv-collapse-item title="朋友">
					<collapse-data-comp :data="classifyContactsData?.friend" />
				</uv-collapse-item>
				<uv-collapse-item title="好友" name="expand">
					<collapse-data-comp :data="classifyContactsData?.normal" />
				</uv-collapse-item>
			</uv-collapse>
		</view>
		<view v-else-if="tabsIndex === 1">
			<collapse-data-comp :data="groupsData" :mode="1" />
		</view>
	</view>
	
	<toast-comp ref="toastRef"></toast-comp>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
