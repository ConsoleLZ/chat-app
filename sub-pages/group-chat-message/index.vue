<template>
	<view class="chat-container">
		<!-- 顶部导航 -->
		<uv-navbar
			:title="title"
			:border="true"
			:fixed="true"
			placeholder
			leftIcon="arrow-left"
			@leftClick="goBack"
		></uv-navbar>

		<!-- 消息列表 -->

		<!-- 输入框 -->
		<view class="input-area">
			<uv-input v-model="inputText" placeholder="输入消息..." clearable class="input-box"></uv-input>
			<uv-button type="primary" @click="sendMessage" class="send-btn" :disabled="!inputText">发送</uv-button>
		</view>
		<view class="select flex-row">
			<!-- 发送表情包 -->
			<uv-icon @click="openFace" style="margin-right: 66rpx" size="46rpx" name="/static/face.png"></uv-icon>
			<!-- 发送图片 -->
			<uv-icon size="41rpx" name="/static/photo.png"></uv-icon>
		</view>
		<uv-popup ref="popupRef" mode="bottom">
			<view class="popupFace">
				<text @click="selectFace(item)" v-for="(item, index) in faceList" :key="index">{{ item }}</text>
			</view>
		</uv-popup>

		<uv-loading-page :loading="loading" loading-text="加载中..." font-size="24rpx"></uv-loading-page>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
