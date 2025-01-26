<template>
	<uv-radio-group>
		<uv-radio v-for="(item, index) in data" :key="index" :customStyle="{ margin: '8px' }" :name="item.name">
			<template #default>
				<view style="width: 100vw;">
					<uv-avatar
						v-if="item.avatar !== '' && item.avatar"
						size="90rpx"
						style="margin-right: 15rpx"
						:src="item.avatar"
					></uv-avatar>
					<uv-avatar
						v-else
						:text="item.name?.slice(0, 1)"
						size="90rpx"
						style="margin-right: 15rpx"
					></uv-avatar>
				</view>
			</template>
		</uv-radio>
	</uv-radio-group>
</template>

<script src="./index.js"></script>
