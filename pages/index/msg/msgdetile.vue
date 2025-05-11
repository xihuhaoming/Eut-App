<template>
	<view>
		<up-navbar title="消息详情" :placeholder="true" :autoBack="true" />
		<view class="msgbox">
			<view class="detiil-title up-flex u-row-between u-col-center">
				<view class="title-left" v-if="detaile.value.type==0">通知公告</view>
				<view class="title-left" v-if="detaile.value.type==1">消息通知</view>
				<view class="title-right">{{detaile.value.createInDate}}</view>
			</view>
			<view class="title-left up-m-t-30">{{detaile.value.title}}</view>
			<view class="detile-con up-m-t-10">
				<up-parse :content="detaile.value.content"></up-parse>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		noticeDetail
	} from '/api/user.js'
	import {
		ref,
		reactive,
		onMounted,
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	const noticeId = ref()
	const detaile = reactive({})
	const deTaileData = (noticeId) => {
		uni.showLoading({})
		noticeDetail(noticeId).then(res => {
			console.log(res)
			detaile.value = res.data
			uni.hideLoading()
		})
	}
	onLoad((e) => {
		console.log(e.noticeId)
		// noticeId.value = noticeId
		deTaileData(e.noticeId)
	})
</script>

<style scoped lang="scss">
	.msgbox {
		padding: 30rpx;
		width: 100%;

		.detiil-title {
			.title-left {
				font-size: 56rpx;
				color: #000000;
			}

			.title-right {
				font-size: 26rpx;
				color: #B7C4D7;
			}
		}

		.detile-con {
			font-size: 28rpx;
			color: #5A78A0;
		}
	}
</style>