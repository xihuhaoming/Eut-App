<template>
	<view class="bg-container">
		<view class="pagetitle">个人中心</view>
		<view class="pagebox">
			<view class="usercon up-p-t-40">
				<image class="toux" src="/static/logo.png"></image>
				<view class="name bold">易尤特</view>
				<view class="bum up-m-t-5 up-m-b-5">所属部门的名字</view>
				<view class="phone">18538572021</view>
				<view class="bianj up-flex u-col-center">
					<image src="/static/user/xiug.png"></image>
					<view>编辑</view>
				</view>
			</view>
			<up-cell-group class="up-m-t-40" :border="false">
				<up-cell title="修改密码" isLink url="/pages/user/changepwd">
					<template #icon>
						<image class="cellimg" src="/static/user/yaos.png"></image>
					</template>
				</up-cell>
				<up-cell class="tuic" title="退出登录" isLink url="/pages/componentsB/tag/tag">
					<template #icon>
						<image class="cellimg" src="/static/user/tuic.png"></image>
					</template>
				</up-cell>
			</up-cell-group>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	const leftClick = () => {
		uni.navigateBack()
	}
</script>

<style scoped lang="scss">
	::v-deep .u-navbar__content__left {
		display: none !important;
	}

	::v-deep .tuic .u-cell__title-text {
		color: red;
	}

	.bg-container {
		background-image: url('@/static/user/bg.png');
		background-size: cover;
		background-position: center;
		width: 100%;
		height: 410rpx;
	}

	.pagetitle {
		text-align: center;
		font-size: 32rpx;
		color: #ffffff;
		padding: 30rpx;
	}

	.pagebox {
		padding: 30rpx;
		width: 100%;

		.usercon {
			width: 690rpx;
			height: 377rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
			border-radius: 10rpx;
			margin-top: 20rpx;
			text-align: center;
			position: relative;

			.bianj {
				width: 114rpx;
				height: 46rpx;
				background: #FEAC49;
				border-radius: 23rpx 0rpx 0rpx 23rpx;
				position: absolute;
				right: 0;
				top: 80rpx;
				font-size: 22rpx;
				color: #FFFFFF;
				padding: 12rpx 0 12rpx 24rpx;

				image {
					width: 20rpx;
					height: 20rpx;
					margin-right:5rpx;
					margin-top:2rpx;
				}
			}

			.toux {
				width: 130rpx;
				height: 130rpx;
				border-radius: 50%;
			}

			.name {
				font-size: 36rpx;
				color: #092D5C;
			}

			.bum,
			.phone {
				font-size: 26rpx;
				color: #B7C4D7;
			}
		}

		.cellimg {
			width: 30rpx;
			height: 30rpx;
			margin-right: 8rpx;
			margin-top: 5rpx;
		}
	}
</style>