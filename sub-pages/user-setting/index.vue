<template>
	<view>
		<uv-list>
			<uv-list-item title="备注"></uv-list-item>
			<uv-list-item title="分组" show-arrow></uv-list-item>
		</uv-list>

        <view class="btn">
			<uv-button @click="onDel" style="width: 90%;" type="error" text="删除联系人"></uv-button>
		</view>

		<uv-modal ref="modalRef" title="提示" content='是否删除该联系人' align="center" @confirm="onConfirmDel"></uv-modal>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>