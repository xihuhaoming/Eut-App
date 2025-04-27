<template>
	<view>
		<up-navbar title="事项详情" :placeholder="true" :autoBack="true" />
		<view class="const">
			<view class="detileItem">
				<view class="textClass up-m-t-20">
					<textarea type="textarea" placeholder="请输入文字内容" border="surround" v-model="textValue"></textarea>
				</view>
				<view class="attachmentTitle u-flex up-m-t-30 u-row-between ">
					<view class="attLeft">
						附件：<text style="color: #B7C4D7;">请添加图片或文件</text>
					</view>
					<up-icon name="plus-circle" size="22px" color="#5A78A0"></up-icon>
				</view>
				<view class="u-flex up-m-t-30 u-row-between ">
					<view class="updataLeft u-flex u-col-center">
						<image src="/static/logo.png"></image>
						<view class="up-m-l-10 name">文件名称</view>
					</view>
					<up-icon name="close-circle-fill" size="22px" color="#B7C4D7"></up-icon>
				</view>
			</view>
			<view class="qued btn" style="position:absolute;bottom:50rpx;">提交</view>
		</view>
	</view>
</template>

<script setup>

</script>

<style scoped lang="scss">
	page {
		background: #F6F8FA;
	}

	.const {
		padding: 30rpx;
	}

	.btn {
		position: absolute;
		bottom: 50rpx;
		left: 50%;
		margin-left: -319rpx;
	}

	.detileItem {
		padding: 30rpx 35rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
		border-radius: 10rpx;
	}

	.textClass {
		width: 618rpx;
		height: 160rpx;
		background: #F6F8FC;
		border-radius: 8rpx;
		padding: 10rpx 0 0 10rpx;
	}

	.attachmentTitle {
		.attLeft {
			font-size: 28rpx;
			color: #5A78A0;
		}
	}

	.updataLeft {
		image {
			width: 68rpx;
			height: 68rpx;
		}

		.name {
			font-size: 22rpx;
			color: #092D5C;
		}
	}
</style>