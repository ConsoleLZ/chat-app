<template>
	<view class="page">
		<view class="moment-box">
			<view class="flex-row margin-bottom-20" style="gap: 20rpx">
				<!-- <uv-avatar v-if="item.avatar !== '' && item.avatar" shape="square" :src="item.avatar"></uv-avatar> -->
				<uv-avatar text="c" shape="square"></uv-avatar>
				<view>
					<view>用户名</view>
					<uv-text
						type="info"
						:text="'发布时间：' + '2024-09-03 12:00'"
					></uv-text>
				</view>
			</view>
			<view class="margin-bottom-20">
				内容区域
			</view>
			<uv-album></uv-album>
			<view class="icon-box">
				<uv-icon size="20" name="/static/moments/2.png"></uv-icon>
			</view>
			<!-- <view v-if="item.thumbsText">
				<uv-text v-if="item.thumbsText?.length <= 10" type="info" :text="`${item.thumbsText?.join('、')}赞了`"></uv-text>
				<uv-text v-else type="info" :text="`${item.thumbsText?.slice(0, 10).join('，')}等${item.thumbsText?.length}人赞了`"></uv-text> 
			</view> -->
		</view>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
