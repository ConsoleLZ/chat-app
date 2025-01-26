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
		<view>
			<uv-collapse ref="collapseRef" accordion :border="false" value="expand">
				<uv-collapse-item title="特别关心">
					<collapse-data-comp :data="classifyContactsData?.particularly" />
				</uv-collapse-item>
				<uv-collapse-item title="家人">
					<collapse-data-comp :data="classifyContactsData?.family" />
				</uv-collapse-item>
				<uv-collapse-item title="同学">
					<collapse-data-comp :data="classifyContactsData?.schoolmate" />
				</uv-collapse-item>
				<uv-collapse-item title="朋友">
					<collapse-data-comp :data="classifyContactsData?.friend" />
				</uv-collapse-item>
				<uv-collapse-item title="好友" name="expand">
					<collapse-data-comp v-model="checkedValue" :data="classifyContactsData?.normal" />
				</uv-collapse-item>
			</uv-collapse>
		</view>
	</view>
	<uv-button text="创建" type="primary" @click="onCreate"></uv-button>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
