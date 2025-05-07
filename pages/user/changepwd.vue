<template>
	<view>
		<up-navbar title="修改密码" :placeholder="true" :autoBack="true" />
		<view class="pwdbox">
			<view class="title">修改密码</view>
			<view class="yhm-box">
				<view class="name">原密码</view>
				<up-input type="password" v-model="oldPassword" class="yhm-iput" placeholder="请输入原密码" border="bottom"
					clearable></up-input>
				<view class="name up-m-t-30">新密码</view>
				<up-input type="password" v-model="password1" class="yhm-iput" placeholder="请输入密码" border="bottom"
					clearable></up-input>
				<view class="name up-m-t-30">确认密码</view>
				<up-input type="password" v-model="password2" class="yhm-iput" placeholder="请输入密码" border="bottom"
					clearable></up-input>

				<view class="qued up-m-t-50" @click="Submit">确定</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		changePwd
	} from '/api/user.js'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	const oldPassword = ref('')
	const password1 = ref('')
	const password2 = ref('')
	const Submit = () => {
		if (!oldPassword.value) return uni.$u.toast('请输入原密码')
		if (!password1.value) return uni.$u.toast('请输入密码')
		if (!password2.value) return uni.$u.toast('请输入密码')
		if (password1.value != password2.value) return uni.$u.toast('两次密码输入不一致，请重新输入')
		let obj = {
			oldPassword: oldPassword.value,
			password: password1.value
		}
		changePwd(obj).then(res => {
			let {
				code,
				data
			} = res;
			if (code == 200) {
				uni.$u.toast('修改成功');
				oldPassword.value = ""
				password1.value = ""
				password2.value = ""
			}
		})
	}
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


	}
</style>