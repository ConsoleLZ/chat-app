<template>
	<view class="container">
		<view class="navbar flex-center-row">
		<uv-icon name="arrow-left"></uv-icon>
		<view style="flex: 1; margin: 0 20rpx">
			<uv-input placeholder="搜索用户账号/名字/群号" prefixIcon="search"></uv-input>
		</view>
		<view>
			<uv-text type="primary" text="清空"></uv-text>
		</view>
	</view>
	<view class="search-list">
		<uv-text style="margin-bottom: 24rpx;" size="24rpx" type="info" text="用户"></uv-text>
		<view class="flex-center-row search-list-item">
			<uv-avatar size="90rpx" style="margin-right: 15rpx;" src="https://via.placeholder.com/200x200.png/2878ff"></uv-avatar>
			<view style="flex: 1;">
				<view class="title">1111</view>
				<view class="flex-row">
					<view class="tag">未知</view>
				</view>
			</view>
			<uv-button type="primary" text="添加"></uv-button>
		</view>
	</view>
	</view>
</template>

<style lang="scss" src="./index.scss" scoped></style>
