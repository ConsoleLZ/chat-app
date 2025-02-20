<template>
	<view>
		<view style="padding-top: 40rpx">
			<user-detail-comp :userInfo="userInfo" />
		</view>
		<view class="btn">
			<uv-button @click="onJumpChat" style="width: 80%" type="primary" text="发消息"></uv-button>
		</view>

		<uv-loading-page :loading="loading" loading-text="加载中..." font-size="24rpx"></uv-loading-page>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
