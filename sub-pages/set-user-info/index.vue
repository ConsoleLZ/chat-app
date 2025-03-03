<template>
	<view style="padding: 0 20rpx">
		<uv-form
			labelAlign="right"
			labelWidth="195rpx"
			labelPosition="left"
			:model="formState"
			:rules="rules"
			ref="form"
		>
			<uv-form-item label="头像:" prop="userInfo.name" borderBottom>
				<uv-avatar
					v-if="formState.userInfo.avatar !== '' && formState.userInfo.avatar"
					size="70rpx"
					:src="formState.userInfo.avatar"
				></uv-avatar>
				<uv-avatar v-else :text="formState.userInfo.name?.slice(0, 1)" fontSize="18" size="70rpx"></uv-avatar>
			</uv-form-item>
			<uv-form-item label="昵称:" prop="userInfo.name" borderBottom>
				<uv-input v-model="formState.userInfo.name" border="none"></uv-input>
			</uv-form-item>
			<uv-form-item label="个性签名:" prop="userInfo.signature" borderBottom>
				<uv-input v-model="formState.userInfo.signature" border="none"></uv-input>
			</uv-form-item>
			<uv-form-item label="个性化标签:" prop="userInfo.signature" borderBottom>
				<div class="flex-row" style="width: 100%;">
					<div class="tag-list">
						<uv-tags
							plain
							v-for="(item, index) in formState.userInfo.tags"
							:text="item.title"
							size="mini"
							closable
							:show="item.show"
							@close="closeTag(index)"
						></uv-tags>
					</div>
					<uv-button type="primary" text="增加" size="mini"></uv-button>
				</div>
			</uv-form-item>
		</uv-form>
	</view>

	<uv-loading-page :loading="loading" loading-text="加载中..." font-size="24rpx"></uv-loading-page>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
