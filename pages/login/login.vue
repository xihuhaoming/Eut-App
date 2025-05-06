<template>
	<view class="box">
		<!-- <image class="logo" src="@/static/logo.png" /> -->
		<view class="logo bold">EUT</view>
		<view class="title">
			<text class="greeting-text">欢迎，来到易尤特</text>
		</view>

		<view class="yhm-box">
			<view class="name">用户名</view>
			<up-input v-model="name" class="yhm-iput" placeholder="请输入登录用户名" border="bottom" clearable></up-input>
		</view>
		<view class="yhm-box">
			<view class="name">登录密码</view>
			<up-input class="yhm-iput" placeholder="请输入密码" border="bottom" clearable :type="psdshow?'password':'text'">
				<template #suffix>
					<up-icon @click="psdshow=false" v-if="psdshow" name="eye-fill" color="#B7C4D7" size="24"></up-icon>
					<up-icon @click="psdshow=true" v-else name="eye-off" color="#B7C4D7" size="24"></up-icon>
				</template>
			</up-input>
		</view>
		<up-button color="#3C82FE" class="up-m-t-60" type="primary" :loading="logloading" loadingText="登录中" text="登录"
			shape="circle"></up-button>
		<view class="u-flex up-m-t-35 u-col-center">
			<up-checkbox-group>
				<up-checkbox v-model="checked" shape="circle" label=""></up-checkbox>
			</up-checkbox-group>
			<view class="checkedtext">我已阅读并同意以下协议<text style="color:#3C82FE">《用户使用协议》</text></view>
		</view>
	</view>
</template>

<script setup>
	// import {
	// 	API_loginAccountLogin
	// } from '/api/user.js'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	const name = ref('')
	const psdshow = ref(true)
	const logloading = ref(false) 
	const checked = ref(false)
	// 初始化
	onMounted(() => {
		// console.log(this.appApi)
		 initRequest.API_loginAccountLogin().then(res => {
			console.log(res)
		})

	});
</script>

<style scoped lang="scss">
	.box {
		padding: 70rpx 50rpx;
	}

	.logo {
		width: 140rpx;
		// height: 80rpx;
		border: 8rpx solid #092D5C;
		text-align: center;
		line-height: 80rpx;
		font-size: 60rpx;
		border-radius: 20rpx;
		color: #092D5C;
	}

	.title {
		margin: 70rpx 0 120rpx 0;
	}

	.greeting-text {
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

	.checkedtext {
		font-size: 22rpx;
		color: #B7C4D7;
	}
</style>