<template>
	<navbar-comp title="朋友圈" />
	<view class="page">
		<view class="moment-box" v-for="item in list" :key="item.id" @click="jump('/sub-pages/moments-detail/index?id=' + item.id)">
			<view class="flex-row margin-bottom-20" style="gap: 20rpx">
				<uv-avatar v-if="item.avatar !== '' && item.avatar" shape="square" :src="item.avatar"></uv-avatar>
				<uv-avatar v-else :text="item.name?.slice(0, 1)" shape="square"></uv-avatar>
				<view>
					<view>{{ item.name }}</view>
					<uv-text
						type="info"
						:text="'发布时间：' + dayjs(item.createTime).format('YYYY-MM-DD HH:mm')"
					></uv-text>
				</view>
			</view>
			<view class="margin-bottom-20">
				{{ item.content }}
			</view>
			<uv-album v-if="item.imgList?.length" :urls="item.imgList"></uv-album>
			<view class="icon-box">
				<uv-icon size="20" :name="item.thumbsIcon" @click="onThumbsUp(item.id, item.thumbs, item.thumbsIcon, item.hasThmbs)"></uv-icon>
			</view>
			<view v-if="item.thumbsText">
				<uv-text v-if="item.thumbsText?.length <= 10" type="info" :text="`${item.thumbsText?.join('、')}赞了`"></uv-text>
				<uv-text v-else type="info" :text="`${item.thumbsText?.slice(0, 10).join('，')}等${item.thumbsText?.length}人赞了`"></uv-text> 
			</view>
		</view>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
