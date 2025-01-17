<template>
	<view style="padding-top: 130rpx;">
		<user-detail-comp :userInfo="userInfo" />
		<uv-list style="margin-top: 50rpx">
			<uv-list-item title="收藏" thumb="/static/about/star.png" link thumb-size="sm"></uv-list-item>
			<uv-list-item title="设置" thumb="/static/about/set.png" link thumb-size="sm"></uv-list-item>
			<uv-list-item title="版本号: 1.0.0" thumb="/static/about/version.png" link thumb-size="sm"></uv-list-item>
		</uv-list>
		<uv-button @click="onQuit" style="width: 80%; margin: 100rpx auto" type="error" text="退出登录"></uv-button>
	</view>
</template>

<script src="./index.js"></script>
