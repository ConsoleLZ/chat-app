<template>
	<uv-image src="/static/logo.svg" mode="widthFix" class="logo"></uv-image>
	<view class="main">
		<uv-input class="input" clearable placeholder="请输入账号" prefixIcon="account-fill"></uv-input>
		<uv-input class="input" style="margin-bottom: 100rpx;" :password="isPasswordType" clearable placeholder="请输入密码" prefixIcon="lock-fill">
			<template #suffix>
				<uv-icon @click="onChangePasswordType" :name="isPasswordType ? 'eye-fill' : 'eye-off'"></uv-icon>
			</template>
		</uv-input>
		<uv-button type="primary" text="确定"></uv-button>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
