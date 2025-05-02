<template>
	<view class="chat-container">
		<!-- 顶部导航 -->
		<uv-navbar :title="title" :border="true" :fixed="true" placeholder leftIcon="arrow-left" @leftClick="goBack">
			<template #right>
				<uv-icon @click="onShowInfo" name="more-dot-fill" size="20"></uv-icon>
			</template>
		</uv-navbar>

		<!-- 消息列表 -->
		<scroll-view class="message-list" scroll-y :scroll-top="scrollTop">
			<view v-for="(msg, index) in messages" :key="index">
				<view v-if="msg.groupId === groupId">
					<view v-if="!msg.isDate" :class="['message-item', msg.isMe ? 'me' : 'other']">
						<uv-avatar
							v-if="msg.userInfo.avatar !== '' && msg.userInfo.avatar"
							:src="msg.userInfo.avatar"
							shape="circle"
							style="background-color: #e0e0e0"
						></uv-avatar>
						<uv-avatar
							v-else
							:text="msg.userInfo.name.slice(0, 1)"
							fontSize="14"
							bg-color="#8696de"
						></uv-avatar>
						<view v-if="msg.messageType === messageType.text" class="message-content">
							{{ msg.content }}
						</view>
						<view v-if="msg.messageType === messageType.image" class="message-image flex-center-row">
							<uv-loading-icon v-if="msg.loading"></uv-loading-icon>
							<uv-image :src="msg.content" height="240rpx" mode="heightFix" />
						</view>
					</view>
					<view class="date-text flex-center-row" v-else>
						<uni-dateformat :date="msg.date" :threshold="[0, 14515200000]"></uni-dateformat>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 输入框 -->
		<view class="input-area">
			<uv-input v-model="inputText" placeholder="输入消息..." clearable class="input-box"></uv-input>
			<uv-button type="primary" @click="sendMessage" class="send-btn" :disabled="!inputText">发送</uv-button>
		</view>
		<view class="select flex-row">
			<!-- 发送表情 -->
			<uv-icon @click="openFace" style="margin-right: 66rpx" size="46rpx" name="/static/face.png"></uv-icon>
			<!-- 发送图片 -->
			<uv-icon @click="onChooseImage" size="41rpx" name="/static/photo.png"></uv-icon>
		</view>
		<uv-popup ref="popupRef" mode="bottom">
			<uv-tabs :list="tabs" @click="onChangeTabs"></uv-tabs>
			<!-- emoji表情 -->
			<view class="popupFace" v-if="index === 0">
				<text @click="selectFace(item)" v-for="(item, index) in faceList" :key="index">{{ item }}</text>
			</view>
			<!-- 表情包 -->
			<view class="expression" v-if="index === 1">
				<uv-image
					v-for="item in expressionList"
					:src="item.url"
					:key="item.id"
					width="220rpx"
					height="220rpx"
					@click="onSendExpression(item.url)"
				></uv-image>
			</view>
		</uv-popup>

		<uv-loading-page :loading="loading" loading-text="加载中..." font-size="24rpx"></uv-loading-page>
		<uv-popup ref="popupInfoRef" mode="right" closeable>
			<view class="group-info">
				<view class="members-box">
					<view style="margin-bottom: 15rpx;">群聊成员:</view>
					<view class="members-item">
						<uv-avatar v-for="item in groupMembers" :key="item.id" :src="item.avatar" size="70rpx"></uv-avatar>
					</view>
				</view>
			</view>
		</uv-popup>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
