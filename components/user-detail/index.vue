<template>
	<view v-if="userInfo">
		<view class="flex-center-row">
			<uv-avatar
				v-if="userInfo.avatar !== '' && userInfo.avatar"
				size="200rpx"
				:src="userInfo.avatar"
			></uv-avatar>
			<uv-avatar v-else :text="userInfo.name?.slice(0, 1)" fontSize="36" size="200rpx" randomBgColor></uv-avatar>
		</view>
		<view class="name">{{ userInfo.name }}</view>
		<view class="description">{{ userInfo.signature }}</view>
		<view class="flex-center-row">
			<uv-tags v-for="item in userInfo.tags" style="margin-right: 10rpx" :text="item" size="mini"></uv-tags>
		</view>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
