<template>
	<uv-modal ref="modalRef" title="增加标签" :closeOnClickOverlay="false" showCancelButton @confirm="onConfirm">
		<template #default>
			<uv-form labelWidth="105rpx" ref="fromRef" labelPosition="left" :model="formState" :rules="rules">
				<uv-form-item label="标签名" prop="title">
					<uv-input v-model="formState.title" border="bottom" placeholder="请输入标签名称"></uv-input>
				</uv-form-item>
			</uv-form>
		</template>
	</uv-modal>
</template>

<script src="./index.js"></script>
