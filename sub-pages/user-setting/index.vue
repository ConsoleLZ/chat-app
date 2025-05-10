<template>
	<view style="padding: 20rpx;">
		<uv-form labelPosition="left">
			<uv-form-item label="备注" borderBottom>
				<uv-input border="none" v-model="formState.remarks"></uv-input>
			</uv-form-item>
			<uv-form-item label="分组" borderBottom @click="showGroupSelect">
				<uv-input
					v-model="groupingName"
					disabled
					disabledColor="#ffffff"
					placeholder="请选择分组"
					border="none"
				></uv-input>
				<template v-slot:right>
					<uv-icon name="arrow-right"></uv-icon>
				</template>
			</uv-form-item>
		</uv-form>

		<view class="btn">
			<uv-button style="width: 40%;margin-right: 20rpx;" type="primary" text="保存" @click="onSave"></uv-button>
			<uv-button style="width: 40%;" @click="onDel" type="error" text="删除联系人"></uv-button>
		</view>

		<uv-modal
			ref="modalRef"
			title="提示"
			content="是否删除该联系人"
			align="center"
			showCancelButton
			@confirm="onConfirmDel"
			:closeOnClickOverlay="false"
		></uv-modal>

		<!-- 分组 -->
		<uv-action-sheet
			ref="groupSelectRef"
			:actions="groupSelectActions"
			title="请选择分组"
			@select="onGroupSelect"
		></uv-action-sheet>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
