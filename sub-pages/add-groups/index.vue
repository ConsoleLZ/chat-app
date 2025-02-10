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
	<view class="btn flex-center-row">
		<uv-button style="width: 80%" text="创建" type="primary" @click="onCreate"></uv-button>
	</view>
	<uv-modal ref="modalRef" title="创建群聊" showCancelButton asyncClose @confirm="onConfirm">
		<template #default>
			<uv-form ref="fromRef" labelPosition="left" :model="formState" :rules="rules">
				<uv-form-item label="名称" prop="name">
					<uv-input v-model="formState.name" border="bottom" placeholder="请输入群聊名称"></uv-input>
				</uv-form-item>
			</uv-form>
		</template>
	</uv-modal>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
