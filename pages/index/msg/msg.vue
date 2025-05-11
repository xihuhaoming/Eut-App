<template>
	<view>
		<up-navbar title="消息中心" :placeholder="true" :autoBack="true" />
		<view class="msgbox">
			<view v-if="list.value.length!=0">
			<!-- <view> -->
				<block v-for="(item,index) in list.value" :key="index">
					<view class="u-flex msgItem" @click="detileClick(item.noticeId)">
						<view class="itemLeft up-m-r-20" v-if="item.type==0">公告</view>
						<view class="itemLeft up-m-r-20" v-if="item.type==1">通知</view>
						<view class="itemright">
							<view class="itemr-top up-flex u-row-between">
								<view class="up-m-r-80">{{item.title}}</view>
								<view>{{item.createInDate}}</view>
							</view>
							<view class="itemr-bot up-m-t-20">{{item.content}}</view>
						</view>
					</view>
				</block>
			</view>
			<up-empty v-else class="up-m-t-50" mode="message" icon="/static/ques.png"></up-empty>
		</view>
	</view>
</template>

<script setup>
	import {
		noticeList
	} from '/api/user.js'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app'


	const list = reactive([])
	onLoad(async () => {
		noticeListData()
	})
	const noticeListData = () => {
		uni.showLoading({})
		noticeList().then(res => {
			console.log(res.data)
			list.value = res.data
			uni.hideLoading()
			console.log(list.value)
		})
	}
	const detileClick = (noticeId) => {
		// console.log(noticeId)
		// return;
		uni.navigateTo({
			url: "/pages/index/msg/msgdetile?noticeId=" + noticeId
		})
	}
</script>

<style scoped lang="scss">
	.msgbox {
		padding: 30rpx;

		.msgItem {
			border-bottom: 1rpx solid #e5e5e5;
			padding: 30rpx 0;

			.itemLeft {
				width: 99rpx;
				height: 99rpx;
				background: #FEAC49;
				border-radius: 50%;
				text-align: center;
				line-height: 99rpx;
				color: #fff;
				font-size: 28rpx;
			}

			.itemright {
				width: 80vw;
			}

			.itemr-top {
				font-size: 26rpx;
				color: #B7C4D7;
			}

			.itemr-bot {
				font-size: 28rpx;
				color: #092D5C;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				/* 显示的行数 */
				overflow: hidden;
			}
		}
	}
</style>