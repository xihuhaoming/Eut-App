<template>
	<!-- 开票详情 -->
	<view class="">
		<up-navbar title="开票详情" :placeholder="true" :autoBack="true" />
		<view class="conTop">
			<view class="time">{{detileData.createInDate}}</view>
			<view class="title bold">{{detileData.createUserName}}提交的开票申请</view>
			<view class="zhongx">{{detileData.entDeptName}}</view>
			<view class="type">{{detileData.useStatusStr}}</view>
		</view>
		<view class="fengx"></view>
		<view class="conZho">
			<view class="xinx bold  up-m-b-20">申请信息</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">系统编号</view>
				<view class="zhoRi up-m-l-30">{{detileData.sysNo}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">合同编号</view>
				<view class="zhoRi up-m-l-30" style="color:#3C82FE">{{detileData.projContract.sysNo}}</view>
			</view>
			<view class="zhoItem">
				<view class="zhoLf">开票信息</view>
				<view class="zhotable up-m-l-30 up-m-t-20">
					<view class="tbaletop u-flex u-col-center u-row-around">
						<view class="ttleft">产品</view>
						<view class="ttright">开票金额</view>
					</view>
					<block v-for="(item,index) in detileData.projInvoiceSubs" :key="index">
						<view class="tbalebot u-flex u-col-center u-row-around">
							<view class="ttleft">{{item.projServerName}}</view>
							<view class="ttright">{{item.recPrice}}</view>
						</view>
					</block>
				</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">发票类型</view>
				<view class="zhoRi up-m-l-30" v-if="detileData.inType==1">增值税普通发票</view>
				<view class="zhoRi up-m-l-30" v-if="detileData.inType==2">增值税专用发票</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">税号</view>
				<view class="zhoRi up-m-l-30">{{detileData.csrCustomerCode}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">地址</view>
				<view class="zhoRi up-m-l-30">{{detileData.csrAddress}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">电话</view>
				<view class="zhoRi up-m-l-30">{{detileData.csrPhone}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">开户行</view>
				<view class="zhoRi up-m-l-30">{{detileData.bankType}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">银行账号</view>
				<view class="zhoRi up-m-l-30">{{detileData.bankNum}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">开票公司</view>
				<view class="zhoRi up-m-l-30">{{detileData.invoiceName}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">开票接收邮箱</view>
				<view class="zhoRi up-m-l-30">{{detileData.invoiceEmail}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">开票金额</view>
				<view class="zhoRi up-m-l-30" style="color:#FE4949">{{detileData.recPrice}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">开票备注</view>
				<view class="zhoRi up-m-l-30">{{detileData.invoiceRemarks}}</view>
			</view>
		</view>
		<view class="fengx"></view>
		<view class="conZho">
			<view class="xinx bold up-m-b-20">开票信息</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">发票代码</view>
				<view class="zhoRi up-m-l-30">{{detileData.invoiceCode}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">发票号码</view>
				<view class="zhoRi up-m-l-30">{{detileData.invoiceNum}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">开票人</view>
				<view class="zhoRi up-m-l-30">{{detileData.user}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">开票时间</view>
				<view class="zhoRi up-m-l-30">{{detileData.createInDate}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">备注</view>
				<view class="zhoRi up-m-l-30">{{detileData.invoiceRemarks}}</view>
			</view>
		</view>
		<view class="fengx"></view>
		<view class="conZho">
			<view class="xinx bold up-m-b-20">流程及办理</view>
			<!-- 流程 -->
			<Flow :list='detileData.historyProcNodeList'></Flow>
		</view>
	</view>
</template>

<script setup>
	import Flow from '@/components/flow.vue';
	import {
		API_ProjInvoicedetail
	} from '/api/task.js'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	import {
		onLoad,
		onReachBottom
	} from '@dcloudio/uni-app'
	const detileData = ref({})
	onLoad((e) => {
		getData(e.sysNo)
	})

	const getData = (sysNo) => {
		API_ProjInvoicedetail({
			sysNo: sysNo
		}).then(res => {
			console.log(res)
			detileData.value = res.data
			detileData.value.historyProcNodeList.reverse();
		})
	}
</script>

<style scoped lang="scss">
	page {}



	.conZho {
		padding: 30rpx 35rpx;

		.zhoItem {
			padding: 10rpx 0;
		}

		.xinx {
			font-size: 36rpx;
			color: #092D5C;
		}

		.zhoLf {
			font-size: 26rpx;
			color: #5A78A0;
			width: 25vw;
		}

		.zhoRi {
			font-size: 28rpx;
			color: #092D5C;
		}

		.zhotable {
			// border: 1rpx solid #979797;
			box-shadow: inset 0 0 0 0.5rpx #979797;

			.tbaletop {
				height: 88rpx;
				background-color: #3C82FE;
				color: #fff;
			}

			.tbalebot {
				height: 88rpx;
			}
		}


	}

	.conTop {
		padding: 30rpx 35rpx;

		.time {
			font-size: 26rpx;
			color: #B7C4D7;
		}

		.title {
			font-size: 36rpx;
			color: #092D5C;
		}

		.zhongx {
			font-size: 26rpx;
			color: #5A78A0;
			line-height: 2;
		}

		.type {
			font-size: 28rpx;
			color: #1CAA42;
		}
	}

	.fengx {
		width: 100vw;
		height: 20rpx;
		background: #F6F8FA;
	}
</style>