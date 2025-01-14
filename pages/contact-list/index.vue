<template>
	<navbar-comp title="联系人" />
	<uv-tabs :list="tabList" @click="onChangeTabs"></uv-tabs>
	<view>
		<view v-if="tabsIndex === 0">
			<uv-collapse accordion :border="false" value="expand">
				<uv-collapse-item title="特别关心">111</uv-collapse-item>
				<uv-collapse-item title="家人">111</uv-collapse-item>
				<uv-collapse-item title="同学">111</uv-collapse-item>
				<uv-collapse-item title="朋友">111</uv-collapse-item>
				<uv-collapse-item title="好友" name="expand">
					<view class="contact-list">
						<view class="flex-center-row contact-list-item">
							<uv-avatar size="90rpx" style="margin-right: 15rpx" src="https://consolelz.github.io/"></uv-avatar>
							<view style="flex: 1">
								<view class="title">嘻嘻</view>
								<view class="flex-row">
									<text style="font-size: 24rpx;">[手机在线]</text>
								</view>
							</view>
						</view>
					</view>
				</uv-collapse-item>
			</uv-collapse>
		</view>
		<view v-else-if="tabsIndex === 1">222</view>
	</view>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped></style>
