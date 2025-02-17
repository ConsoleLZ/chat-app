<template>
	<uv-checkbox-group v-if="data?.length" @change="onChange" style="margin-bottom: 30rpx">
		<uv-checkbox
			v-for="(item, index) in data"
			:key="index"
			:customStyle="{ margin: '8px' }"
			:name="JSON.stringify(item)"
		>
			<template #default>
				<view style="width: 100vw" class="flex-row">
					<uv-avatar
						v-if="item.avatar !== '' && item.avatar"
						size="90rpx"
						class="margin-right-20"
						:src="item.avatar"
					></uv-avatar>
					<uv-avatar v-else :text="item.name?.slice(0, 1)" size="90rpx" class="margin-right-20"></uv-avatar>
					<uv-text :text="item.name"></uv-text>
				</view>
			</template>
		</uv-checkbox>
	</uv-checkbox-group>
	<uv-empty v-else mode="list"></uv-empty>
</template>

<script src="./index.js"></script>
