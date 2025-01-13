<template>
	<uv-image src="/static/logo.svg" mode="widthFix" class="logo"></uv-image>
	<view class="main">
		<uv-input class="input" v-model="account" clearable placeholder="请输入账号" prefixIcon="account-fill"></uv-input>
		<uv-input class="input" v-model="password" style="margin-bottom: 100rpx;" :password="isPasswordType" clearable placeholder="请输入密码" prefixIcon="lock-fill">
			<template #suffix>
				<uv-icon @click="onChangePasswordType" :name="isPasswordType ? 'eye-fill' : 'eye-off'"></uv-icon>
			</template>
		</uv-input>
		<uv-button type="primary" @click="onLogin" text="登录"></uv-button>
		<view class="or-text">——OR——</view>
		<uv-button type="primary" :plain="true" text="注册"></uv-button>
	</view>
	<uv-toast ref="toastRef"></uv-toast>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
