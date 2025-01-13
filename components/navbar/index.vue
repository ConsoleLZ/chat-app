<template>
	<view class="navbar flex-row">
		<view class="image">
			<image style="width: 100%;" src="https://pic.imgdb.cn/item/665f06ac5e6d1bfa0573f8c5.jpg" mode="widthFix">
			</image>
		</view>
		<text class="title">消息</text>
		<image @click="onShowDialog" style="width: 36rpx;" src="/static/add.png" mode="widthFix"></image>
	</view>
	<view @click.stop="onCloseDialog" id="dialog" class="dialog">
		<view id="dialog-box" class="dialog-box flex-column">
			<view hover-class="hover-class" @click="onAdd" class="flex-center-row item">
				<image style="width: 34rpx;margin-right: 14rpx;" src="@/static/add-friend.png" mode="widthFix"></image>
				<text style="font-size: 32rpx;">加好友/群</text>
			</view>
		</view>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>