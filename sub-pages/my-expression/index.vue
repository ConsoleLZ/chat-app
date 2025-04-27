<template>
	<view class="page">
		<uv-upload
			multiple
			:maxCount="10"
			@afterRead="afterRead"
		></uv-upload>
        <view class="expression-list">
            <uv-image src="https://cdn.uviewui.com/uview/album/1.jpg" width="220rpx" height="220rpx"></uv-image>
            <uv-image src="https://cdn.uviewui.com/uview/album/1.jpg" width="220rpx" height="220rpx"></uv-image>
            <uv-image src="https://cdn.uviewui.com/uview/album/1.jpg" width="220rpx" height="220rpx"></uv-image>
        </view>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
