<template>
	<view class="bg-container">
		<view class="pagetitle">个人中心</view>
		<view class="pagebox">
			<view class="usercon up-p-t-40">
				<image class="toux" :src="store.userInfo.avatar"></image>
				<view class="name bold">{{store.userInfo.name}}</view>
				<view class="bum up-m-t-5 up-m-b-5">{{store.userInfo.deptList[0].name}}</view>
				<view class="phone">{{store.userInfo.sysNo}}</view>
				<view class="bianj up-flex u-col-center">
					<image src="/static/user/xiug.png"></image>
					<view @click="updata">编辑</view>
				</view>
			</view>
			<up-cell-group class="up-m-t-40" :border="false">
				<up-cell title="修改密码" isLink url="/pages/user/changepwd">
					<template #icon>
						<image class="cellimg" src="/static/user/yaos.png"></image>
					</template>
				</up-cell>
				<up-cell class="tuic" title="退出登录" isLink url="/pages/componentsB/tag/tag" @click="logouttap">
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
		uploadFileFn
	} from '/util/request/request';
	import {
		userLogout,
		changeAvatar
	} from '/api/user.js'
	import {
		removeToken
	} from '/util/auth.js'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	import {
		useCounterStore
	} from '/store/counter';
	const store = useCounterStore();
	import {
		setToken,
		getToken
	} from '/util/auth.js'
	const absoluteUrl = ref('')
	// const info = store.userInfo;
	console.log(store.userInfo.avatar)
	const updata = () => {
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function(res) {
				console.log(res);
				let filList = res.tempFilePaths[0];
				// const newStr = filList.slice(2, -2); //截取fill格式
				let size = res.tempFiles[0].size / 1024;
				console.log(size)
				// if (size > 512) {
				// 	uni.$u.toast('头像大小不能超过512kb，请重新上传');
				// } else {
				// uploadFilePromise(filList)
				// console.log(uploadFileFn(filList))
				uploadFileFn(filList).then(res => {
					// console.log(res)
					let obj = store.userInfo;
					obj.avatar = res.absoluteUrl;
					
					store.setUserinfo(obj)
					changeAvatar({
						string: res.url
					}).then(res => {
						console.log(res);
						if (res.code === 200) {
							uni.$u.toast('上传成功')
						}
					})
				})



				// }
			}
		});
	}
	// const uploadFilePromise = (url) => {

	// 	return new Promise((resolve, reject) => {
	// 		let a = uni.uploadFile({
	// 			url: UPLOADURL, // 仅为示例，非真实的接口地址
	// 			filePath: url,
	// 			name: 'file',
	// 			header: {
	// 				Authorization: getToken(),
	// 			},
	// 			success: (res) => {
	// 				const d = JSON.parse(res.data)
	// 				console.log(d)
	// 				if (d.code === 200) {
	// 					changeAvatar({
	// 						string: d.data.url
	// 					}).then(res => {
	// 						console.log(res);
	// 						if (res.code === 200) {
	// 							// this.$refreshUserInfo();
	// 							uni.$u.toast('上传成功')
	// 						}
	// 					})
	// 				} else {
	// 					reject('上传失败')
	// 					uni.$u.toast(d.msg)
	// 				}
	// 			},
	// 		});
	// 	});
	// }
	const logouttap = () => {
		uni.showModal({
			title: '提示：',
			content: '请确认是否退出登录',
			success: function(res) {
				if (res.confirm) {
					uni.reLaunch({
						url: "/pages/login/login"
					})
					userLogout().then(d => {
						removeToken();
						console.log(d)
						// if (d.data.code == 200) {

						// }
					})
				} else if (res.cancel) {}
			}
		});

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
					margin-right: 5rpx;
					margin-top: 2rpx;
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