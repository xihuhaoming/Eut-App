<template>
	<view>
		<up-navbar title="修改密码" :placeholder="true" :autoBack="true" />
		<view class="pwdbox">
			<view class="title">修改密码</view>
			<view class="yhm-box">
				<view class="name">原密码</view>
				<up-input type="password" v-model="name" class="yhm-iput" placeholder="请输入原密码" border="bottom"
					clearable></up-input>
				<view class="name up-m-t-30">新密码</view>
				<up-input type="password" v-model="name" class="yhm-iput" placeholder="请输入密码" border="bottom"
					clearable></up-input>
				<view class="name up-m-t-30">确认密码</view>
				<up-input type="password" v-model="name" class="yhm-iput" placeholder="请输入密码" border="bottom"
					clearable></up-input>

				<view class="qued up-m-t-50">确定</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
</script>

<style scoped lang="scss">
	.pwdbox {
		padding: 30rpx;
		width: 100%;

		.title {
			font-size: 56rpx;
			color: #092D5C;
		}

		.yhm-box {
			font-size: 36rpx;
			color: #092D5C;
			margin-top: 35rpx;
		}

		.yhm-iput {
			padding: 20rpx 0 !important;
		}

		.qued {
			width: 638rpx;
			height: 98rpx;
			background: #3C82FE;
			box-shadow: 0rpx 8rpx 21rpx 0rpx rgba(60, 130, 254, 0.3);
			border-radius: 59rpx;
			text-align:center;
			line-height: 98rpx;
			color:#fff;
			font-size: 36rpx;
		}
	}
</style>