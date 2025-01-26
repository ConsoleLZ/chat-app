<template>
	<view
		class="flex-center-row"
		v-if="data?.length"
		hover-class="hover-class-background"
		hover-stay-time="150"
		v-for="item in data"
		:key="item.id"
		style="padding: 12rpx"
		@click="onJumpUserDetail(item)"
	>
		<uv-avatar
			v-if="item.avatar !== '' && item.avatar"
			size="90rpx"
			style="margin-right: 15rpx"
			:src="item.avatar"
		></uv-avatar>
		<uv-avatar v-else :text="item.name?.slice(0, 1)" size="90rpx" style="margin-right: 15rpx"></uv-avatar>
		<view style="flex: 1">
			<view class="title">{{ item.name }}</view>
			<view class="flex-row">
				<text style="font-size: 24rpx">[手机在线]</text>
			</view>
		</view>
	</view>
	<uv-empty v-else mode="list"></uv-empty>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
