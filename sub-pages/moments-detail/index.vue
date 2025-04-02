<template>
	<view class="page">
		<view class="moment-box" v-if="data">
			<view class="flex-row margin-bottom-20" style="gap: 20rpx">
				<uv-avatar v-if="data.avatar !== '' && data.avatar" :src="data.avatar"></uv-avatar>
				<uv-avatar v-else :text="data.name?.slice(0, 1)"></uv-avatar>
				<view>
					<view>{{ data.name }}</view>
					<uv-text
						type="info"
						:text="'发布时间：' + dayjs(data.createTime).format('YYYY-MM-DD HH:mm')"
					></uv-text>
				</view>
			</view>
			<view class="margin-bottom-20">
				{{ data.content }}
			</view>
			<uv-album v-if="data.imgList?.length" :urls="data.imgList"></uv-album>
			<view class="icon-box">
				<uv-icon
					size="20"
					:name="data.thumbsIcon"
					@click="onThumbsUp(data.id, data.thumbs, data.thumbsIcon, data.hasThmbs)"
				></uv-icon>
			</view>
			<view v-if="data.thumbsText">
				<uv-text
					v-if="data.thumbsText?.length <= 10"
					type="info"
					:text="`${data.thumbsText?.join('、')}赞了`"
				></uv-text>
				<uv-text
					v-else
					type="info"
					:text="`${data.thumbsText?.slice(0, 10).join('，')}等${data.thumbsText?.length}人赞了`"
				></uv-text>
			</view>
		</view>
		<view v-if="data?.comments">
			<uv-text v-for="(item, index) in data?.comments" :key="index" :text="item.name + '：' + item.value"></uv-text>
		</view>
		<view class="input-box flex-center-row">
			<uv-input v-model="value" @confirm="onConfirm" placeholder="发送评论" border="surround">
				<template #prefix>
					<uv-icon size="20" name="/static/moments/3.png"></uv-icon>
				</template>
			</uv-input>
		</view>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
