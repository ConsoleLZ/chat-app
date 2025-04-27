<template>
	<view class="page">
		<uv-upload
			multiple
			:maxCount="10"
			@afterRead="afterRead"
		></uv-upload>
        <view class="expression-list" v-if="imgList.length">
            <uv-image v-for="item in imgList" :src="item.url" :key="item.id" width="220rpx" height="220rpx"></uv-image>
        </view>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
