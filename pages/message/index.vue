<template>
	<navbar-comp title="消息" />
	<view class="list">
		<view class="flex-center-row list-item">
			<uv-avatar size="90rpx" style="margin-right: 15rpx" src="https://pic.imgdb.cn/item/665f06ac5e6d1bfa0573f8c5.jpg"></uv-avatar>
			<view style="flex: 1">
				<view class="title">123</view>
				<text class="message">你好呀</text>
			</view>
			<view class="flex-center-column">
				<text style="font-size: 20rpx;color: #c1c1c1;">11:34</text>
				<view class="badge flex-center-row">
					<uv-badge class="flex-center-row" numberType="overflow" type="error" max="99" :value="1"></uv-badge>
				</view>
			</view>
		</view>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>