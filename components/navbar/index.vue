<template>
	<view class="navbar flex-row" :style="`padding-top: ${statusBarHeight}px;`">
		<uv-avatar
			@click="onOpenPopup"
			v-if="userInfo.avatar !== '' && userInfo.avatar"
			size="60rpx"
			:src="userInfo.avatar"
		></uv-avatar>
		<uv-avatar
			@click="onOpenPopup"
			v-else
			:text="userInfo.name?.slice(0, 1)"
			fontSize="12"
			size="60rpx"
		></uv-avatar>
		<text class="title">{{ title }}</text>
		<image @click="onShowOverlay" style="width: 36rpx" src="/static/add.png" mode="widthFix"></image>
	</view>
	<uv-overlay :show="isShowOverlay" @click="onCloseOverlay" opacity="0.2" duration="150">
		<view class="overlay-box flex-column">
			<view
				@click="onJumpSearchContact"
				class="flex-center-row"
				style="padding: 15rpx 0; width: 100%"
				hover-class="hover-class-background"
				hover-stay-time="150"
			>
				<uv-image
					src="/static/add-friend.png"
					width="36rpx"
					mode="widthFix"
					style="margin-right: 12rpx"
				></uv-image>
				<text>添加联系人</text>
			</view>
		</view>
	</uv-overlay>
	<uv-popup ref="popupRef" mode="left">
		<user-detail-comp />
	</uv-popup>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
