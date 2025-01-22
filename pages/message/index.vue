<template>
	<navbar-comp title="消息" />
	<view class="list">
		<view
			class="flex-center-row list-item"
			@click="onJumpChat(item)"
			v-for="(item, index) in messageList"
			:key="index"
		>
			<uv-avatar
				size="90rpx"
				style="background-color: #c1c1c1; margin-right: 12rpx"
				:src="item.avatar"
				v-if="item.avatar !== '' && item.avatar"
			></uv-avatar>
			<uv-avatar
				v-else
				:text="item.name?.slice(0, 1)"
				size="90rpx"
				style="margin-right: 12rpx"
				bg-color="#3c9cff"
			></uv-avatar>
			<view style="flex: 1;">
				<view class="flex-row" style="margin-bottom: 4rpx;">
					<view class="title">{{ item.name }}</view>
					<text style="font-size: 22rpx; color: #c1c1c1">
						<uni-dateformat :date="item.createTime" :threshold="[0,14515200000]"></uni-dateformat>
					</text>
				</view>
				<view class="flex-row" style="height: 35rpx;">
					<view class="message">
						{{ item.content }}
					</view>
					<view v-if="item.unreadCount" class="badge flex-center-row">
						<uv-badge
							class="flex-center-row"
							numberType="overflow"
							type="error"
							max="99"
							:value="item.unreadCount"
						></uv-badge>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
