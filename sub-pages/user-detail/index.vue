<template>
	<view>
		<view style="padding-top: 40rpx">
			<user-detail-comp :userId="userId" />
		</view>
		<view class="btn">
			<uv-button @click="onJumpChat" style="width: 80%" type="primary" text="发消息"></uv-button>
		</view>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
