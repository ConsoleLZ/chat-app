<template>
    <view class="page">
        <uv-navbar title="发布动态">
            <template #right>
                <uv-button type="primary" customStyle="height: 55rpx;" text="发布"></uv-button>
            </template>
        </uv-navbar>
        <uv-textarea v-model="content" :height="180" :maxlength="200" count placeholder="分享新鲜事..."></uv-textarea>
    </view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>