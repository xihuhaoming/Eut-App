<template>
	<view>
		<up-navbar title="工作台" :placeholder="true" :autoBack="true" />
		<view class="pegebox">
			<view class="workItem" v-for="(item,index) in list" :key="index">
				<view class="title up-p-b-15">{{item.title}}</view>
				<view class="itembox up-flex u-flex-wrap ">
					<block v-for="(it,i) in item.arr" :key="i">
						<view class="boxcon up-m-t-35" @click="navTap(it.url)">
							<image :src="it.img"></image>
							<view class="name up-m-t-5">{{it.name}}</view>
						</view>
					</block>
				</view>
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
	const list = reactive([{
			title: "日常",
			arr: [{
				img: "/static/work/icon1.png",
				name: "任务&通知",
				url: "/pages/work/task/task"
			}, ]
		}, {
			title: "财务",
			arr: [{
				img: "/static/work/icon2.png",
				name: "开票申请",
				url: "/pages/work/makeOut/addmake"
			}, {
				img: "/static/work/icon3.png",
				name: "日常报销",
				url: "/pages/work/reimburse/addReimburse"
			}, {
				img: "/static/work/icon4.png",
				name: "履约金",
				url: "/pages/work/performance/addPerformance"
			}, {
				img: "/static/work/icon5.png",
				name: "收款申请",
				url: "/pages/work/receivepay/addReceivepay"
			}, {
				img: "/static/work/icon6.png",
				name: "成本支出",
				url: "/pages/work/cost/addCost"
			}, ]
		}, {
			title: "销售",
			arr: [{
					img: "/static/work/icon7.png",
					name: "客户",
					url: ""
				},
				{
					img: "/static/work/icon8.png",
					name: "合同",
					url: "/pages/work/contract/contractList"
				},
			]
		},
		{
			title: "物资",
			arr: [{
					img: "/static/work/icon9.png",
					name: "领用申请",
					url: "/pages/work/drawOn/adddrawOn"
				},
				{
					img: "/static/work/icon10.png",
					name: "采购管理",
					url: "/pages/work/procurement/addProcurement"
				},
				{
					img: "/static/work/icon11.png",
					name: "物资管理",
					url: ""
				},
				{
					img: "/static/work/icon12.png",
					name: "入库",
					url: "/pages/work/warehousing/addWarehousing"
				},
			]
		},
	])
	const navTap = (url) => {
		uni.navigateTo({
			url: url
		})
	}
</script>

<style scoped lang="scss">
	::v-deep .u-navbar__content__left {
		display: none !important;
	}

	page {
		background: #F6F8FA;
	}

	.pegebox {
		padding: 30rpx;
		width: 100%;

		.workItem {
			padding: 30rpx;

			.title {
				font-size: 36rpx;
				color: #092D5C;
				border-bottom: 1rpx solid #E1E1E1;
			}

			.itembox {
				text-align: center;

				.boxcon {
					margin: 0 50rpx 0 10rpx;

					image {
						width: 86rpx;
						height: 86rpx;
					}

					.name {
						font-size: 24rpx;
						color: #092D5C;
					}
				}

			}
		}
	}
</style>