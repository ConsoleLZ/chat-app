<template>
	<view class="container">
		<view class="navbar flex-center-row">
			<uv-icon @click="onBack" name="arrow-left"></uv-icon>
			<view style="flex: 1; margin: 0 20rpx">
				<uv-input
					v-model="searchValue"
					placeholder="搜索用户账号/名字/群号"
					@confirm="onConfirmSearch"
					prefixIcon="search"
					confirmType="search"
					clearable
					focus
				></uv-input>
			</view>
			<view>
				<uv-text @click="onClear" type="primary" text="清空"></uv-text>
			</view>
		</view>
		<view class="search-list" v-if="users">
			<uv-text style="margin-bottom: 24rpx" size="24rpx" type="info" text="用户"></uv-text>
			<view class="flex-center-row search-list-item" v-for="item in users" :key="item.id">
				<uv-avatar v-if="item.avatar !== '' && item.avatar" size="90rpx" style="margin-right: 15rpx" :src="item.avatar"></uv-avatar>
				<uv-avatar v-else :text="item.name?.slice(0, 1)" fontSize="18" size="90rpx" randomBgColor style="margin-right: 15rpx"></uv-avatar>
				<view style="flex: 1">
					<view class="title">{{ item.name }}</view>
					<view class="flex-row">
						<view class="tag">未知</view>
					</view>
				</view>
				<uv-button
					@click="onApplicationAdd(item.id)"
					v-if="!contactUserIdList.includes(item.id) && userId !== item.id"
					type="primary"
					text="添加"
				></uv-button>
				<uv-button v-else type="primary" disabled text="已添加"></uv-button>
			</view>
		</view>
	</view>
	<uv-toast ref="toastRef"></uv-toast>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
