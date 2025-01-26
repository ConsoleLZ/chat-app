<template>
	<uv-checkbox-group v-model="checkboxValue" style="margin-bottom: 30rpx;">
		<uv-checkbox v-for="(item, index) in data" :key="index" :customStyle="{ margin: '8px' }" :name="item.contactUserId">
			<template #default>
				<view style="width: 100vw;" class="flex-row">
					<uv-avatar
						v-if="item.avatar !== '' && item.avatar"
						size="90rpx"
						class="margin-right-20"
						:src="item.avatar"
					></uv-avatar>
					<uv-avatar
						v-else
						:text="item.name?.slice(0, 1)"
						size="90rpx"
						class="margin-right-20"
					></uv-avatar>
                    <uv-text :text="item.name"></uv-text>
				</view>
			</template>
		</uv-checkbox>
	</uv-checkbox-group>
    <uv-button text="创建" type="primary" @click="onCreate"></uv-button>
</template>

<script src="./index.js"></script>
