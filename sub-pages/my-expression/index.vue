<template>
	<view class="page">
		<uv-upload
			multiple
			:maxCount="10"
			@afterRead="afterRead"
		></uv-upload>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
