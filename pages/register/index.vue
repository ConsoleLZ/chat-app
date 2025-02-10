<template>
	<view class="main">
		<uv-input class="input" v-model="name" clearable placeholder="请输入您的昵称">
			<template #prefix>
				<uv-image style="margin: 6rpx" width="26rpx" src="/static/name.png" mode="widthFix"></uv-image>
			</template>
		</uv-input>
		<uv-input
			class="input"
			v-model="account"
			clearable
			placeholder="请输入账号"
			prefixIcon="account-fill"
		></uv-input>
		<uv-input
			class="input"
			v-model="password"
			style="margin-bottom: 100rpx"
			:password="isPasswordType"
			clearable
			placeholder="请输入密码"
			prefixIcon="lock-fill"
		>
			<template #suffix>
				<uv-icon @click="onChangePasswordType" :name="isPasswordType ? 'eye-fill' : 'eye-off'"></uv-icon>
			</template>
		</uv-input>
		<uv-button
			type="primary"
			:loading="isLoading"
			:disabled="isLoading"
			loadingText="加载中..."
			@click="onRegister"
			text="注册"
		></uv-button>
	</view>
	
	<toast-comp ref="toastRef"></toast-comp>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
