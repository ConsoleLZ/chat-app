<template>
	<view style="padding: 0 15rpx;">
		<uv-form labelPosition="left" :model="formState" :rules="rules" ref="form">
			<uv-form-item label="昵称" prop="userInfo.name" borderBottom>
				<uv-input v-model="formState.userInfo.name" border="none"></uv-input>
			</uv-form-item>
		</uv-form>
	</view>
</template>

<script src="./index.js"></script>
