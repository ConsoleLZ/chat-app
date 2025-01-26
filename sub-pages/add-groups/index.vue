<template>
	<view>
		<view class="navbar flex-center-row" :style="`padding-top: ${statusBarHeight}px;`">
			<uv-icon @click="onBack" name="arrow-left" size="36rpx"></uv-icon>
			<view style="flex: 1; margin: 0 20rpx">
				<uv-input
					v-model="searchValue"
					placeholder="搜索联系人"
					prefixIcon="search"
					confirmType="search"
					clearable
					focus
				></uv-input>
			</view>
			<view>
				<uv-text @click="onClear" type="primary" text="清空"></uv-text>
			</view>
		</view>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
