<template>
	<view class="list" v-if="dataList">
		<view class="flex-center-row list-item" v-for="item in dataList" :key="item.id">
			<uv-avatar size="90rpx" style="margin-right: 15rpx" :src="item.avatar"></uv-avatar>
			<view style="flex: 1">
				<view class="title">{{ item.name }}</view>
				<view class="flex-row">
					<view class="tag">未知</view>
				</view>
			</view>
			<uv-button type="primary" text="同意"></uv-button>
		</view>
	</view>
	<uv-empty v-else style="height: 80vh" mode="data" icon-size="100rpx"></uv-empty>

	<uv-toast ref="toastRef"></uv-toast>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
