<template>
	<uv-tabs :list="tabList" @click="onChangeTabs"></uv-tabs>
	<view class="list" v-show="tabsIndex === 0">
		<view class="flex-center-row list-item" v-for="item in dataList" :key="item.id">
			<uv-avatar
				v-if="item.avatar !== '' && item.avatar"
				size="90rpx"
				:src="item.avatar"
				class="margin-right-20"
			></uv-avatar>
			<uv-avatar v-else :text="item.name?.slice(0, 1)" size="90rpx" class="margin-right-20"></uv-avatar>
			<view style="flex: 1">
				<view class="title">{{ item.name }}</view>
				<view class="flex-row">
					<view class="tag">未知</view>
				</view>
			</view>
			<uv-button v-if="item.agree === 0" @click="onAgree(item)" type="primary" text="同意"></uv-button>
			<uv-button v-else type="primary" text="已同意" disabled></uv-button>
		</view>
	</view>

	<view class="list" v-show="tabsIndex === 1">
		<view class="flex-center-row list-item" v-for="item in groupDataList" :key="item.id">
			<uv-avatar
				v-if="item.avatar !== '' && item.avatar"
				size="90rpx"
				:src="item.avatar"
				class="margin-right-20"
			></uv-avatar>
			<uv-avatar v-else :text="item.name?.slice(0, 1)" size="90rpx" class="margin-right-20"></uv-avatar>
			<view style="flex: 1">
				<view class="title">{{ item.name }}</view>
			</view>
			<uv-button v-if="item.agree === 0" @click="onAddMember(item)" type="primary" text="同意"></uv-button>
			<uv-button v-else type="primary" text="已同意" disabled></uv-button>
		</view>
	</view>

	<toast-comp ref="toastRef"></toast-comp>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
