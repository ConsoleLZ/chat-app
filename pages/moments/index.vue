<template>
	<view class="page">
		<view v-for="item in list" :key="item.id">
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
			<view class="icon-box">
				<uv-icon size="20" name="/static/moments/1.png"></uv-icon>
				<uv-icon size="20" name="/static/moments/3.png"></uv-icon>
			</view>
			<uv-text type="info" text="小哲赞了、阿松地哦赞了"></uv-text>
		</view>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
