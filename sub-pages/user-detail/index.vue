<template>
	<view>
		<view style="padding-top: 40rpx">
			<user-detail-comp :userId="userId" />
		</view>
		<view class="btn flex-row">
			<uv-button @click="onJumpChat" style="width: 200rpx;" type="primary" text="发消息"></uv-button>
			<uv-button style="width: 200rpx;" type="error" text="删除好友"></uv-button>
		</view>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
