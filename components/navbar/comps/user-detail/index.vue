<template>
	<view style="padding-top: 130rpx; width: 600rpx">
		<user-detail-comp :userInfo="userInfo" />
		<uv-list style="margin-top: 50rpx">
			<uv-list-item title="我的表情包" thumb="/static/about/face.png" link thumb-size="sm"></uv-list-item>
			<uv-list-item title="个人信息" thumb="/static/about/user.png" link thumb-size="sm"></uv-list-item>
			<uv-list-item title="版本号: 1.0.0" thumb="/static/about/version.png" link thumb-size="sm"></uv-list-item>
		</uv-list>
		<uv-button @click="onQuit" style="width: 80%; margin: 100rpx auto" type="error" text="退出登录"></uv-button>
	</view>
</template>

<script src="./index.js"></script>
