<template>
	<view style="padding: 0 20rpx">
		<uv-form labelAlign="right" labelWidth="170rpx" labelPosition="left" :model="formState" :rules="rules" ref="form">
			<uv-form-item label="昵称:" prop="userInfo.name" borderBottom>
				<uv-input v-model="formState.userInfo.name" border="none"></uv-input>
			</uv-form-item>
			<uv-form-item label="个性签名:" prop="userInfo.signature" borderBottom>
				<uv-input v-model="formState.userInfo.signature" border="none"></uv-input>
			</uv-form-item>
			<uv-form-item label="个性化标签:" prop="userInfo.signature" borderBottom>
				<uv-tags text="标签" size="mini" closable :show="close1" @close="close1 = false"></uv-tags>
			</uv-form-item>
		</uv-form>
	</view>
</template>

<script src="./index.js"></script>
