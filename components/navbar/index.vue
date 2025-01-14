<template>
	<view class="navbar flex-row">
		<uv-avatar size="60rpx" src="https://pic.imgdb.cn/item/665f06ac5e6d1bfa0573f8c5.jpg"></uv-avatar>
		<text class="title">消息</text>
		<image @click="onShowOverlay" style="width: 36rpx" src="/static/add.png" mode="widthFix"></image>
	</view>
	<uv-overlay :show="isShowOverlay" @click="onCloseOverlay" opacity="0.2" duration="150">
		<view class="overlay-box flex-column">
			<view @click="onJumpSearchContact" class="flex-center-row" style="padding: 15rpx 0;width: 100%;" hover-class="hover-class-background" hover-stay-time="150">
				<uv-image
					src="/static/add-friend.png"
					width="36rpx"
					mode="widthFix"
					style="margin-right: 12rpx"
				></uv-image>
				<text>添加联系人</text>
			</view>
		</view>
	</uv-overlay>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
