<template>
	<view class="flex-center-row">
		<uv-avatar v-if="userInfo.avatar !== '' && userInfo.avatar" size="200rpx" :src="userInfo.avatar"></uv-avatar>
		<uv-avatar v-else :text="userInfo.name?.slice(0, 1)" fontSize="36" size="200rpx" randomBgColor></uv-avatar>
	</view>
	<view class="name">{{ userInfo.name }}</view>
	<view class="description">个性签名</view>
	<view class="flex-center-row">
		<uv-tags style="margin-right: 10rpx" text="标签" size="mini"></uv-tags>
		<uv-tags text="标签" size="mini"></uv-tags>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
