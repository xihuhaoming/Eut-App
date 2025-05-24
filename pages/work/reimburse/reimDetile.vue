<template>
	<!-- 开票详情 -->
	<view class="">
		<up-navbar title="报销详情" :placeholder="true" :autoBack="true" />
		<view class="conTop">
			<view class="time">{{reimbursementDetail.createInDate || '--'}}</view>
			<view class="title bold">{{reimbursementDetail.createUserName || '--'}}提交的报销申请</view>
			<view class="zhongx">{{reimbursementDetail.entDeptName || '--'}}</view>
			<view class="type">{{ getLabelByValue(reimbursementDetail.useStatus) || '--'}}</view>
		</view>
		<view class="fengx"></view>
		<view class="conZho">
			<view class="xinx bold  up-m-b-20">申请信息</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">系统编号</view>
				<view class="zhoRi up-m-l-30">{{reimbursementDetail.sysNo || '--'}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">报销类型</view>
				<view class="zhoRi up-m-l-30">{{getNameByNo(reimbursementDetail.finReimbursementTypeSysNo,translateType,'sysNo','name') || '--'}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">借支单号</view>
				<view class="zhoRi up-m-l-30">{{reimbursementDetail.borrowingSysNo || '--'}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center" v-if="reimbursementDetail.cardNo"> 
				<view class="zhoLf">油卡卡号</view>
				<view class="zhoRi up-m-l-30">{{reimbursementDetail.cardNo || '--'}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">是否预算内</view>
				<view class="zhoRi up-m-l-30">{{getNameByNo(reimbursementDetail.inType,inTypeList,'dictValue','dictLabel') || '--'}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">金额</view>
				<view class="zhoRi up-m-l-30" style="color:#FE4949">5000</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">报销内容</view>
				<view class="zhoRi up-m-l-30">{{reimbursementDetail.remarks || '--'}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">报销公司</view>
				<view class="zhoRi up-m-l-30">{{reimbursementDetail.reimbursementCompany || '--'}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">报销时间</view>
				<view class="zhoRi up-m-l-30">{{reimbursementDetail.time || '--'}}</view>
			</view>
			<view class="zhoItem">
				<view class="zhoLf">发票信息</view>
				<view class="zhotable up-m-l-30 up-m-t-20">
					<view class="tbaletop u-flex u-col-center u-row-around">
						<view class="ttleft">发票类型</view>
						<view class="ttright">发票号码</view>
						<view class="ttright">图片</view>
					</view>
					<view class="tbalebot u-flex u-col-center u-row-around">
						<view class="ttleft">CE-EMC</view>
						<view class="ttright">26000</view>
						<image style="width:50rpx;height:50rpx" src="/static/logo.png"></image>
					</view>
				</view>
			</view>
		
		</view>
		<view class="fengx"></view>
		<view class="conZho">
			<view class="xinx bold up-m-b-20">打款信息</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">打款流水号</view>
				<view class="zhoRi up-m-l-30">{{reimbursementDetail.paymentNumber || '--'}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">打款金额</view>
				<view class="zhoRi up-m-l-30">{{reimbursementDetail.paymentPrice || '--'}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">卡号</view>
				<view class="zhoRi up-m-l-30">{{reimbursementDetail.ssAccount || '--'}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">开户行</view>
				<view class="zhoRi up-m-l-30">{{reimbursementDetail.ssType || '--'}}</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">收款人</view>
				<view class="zhoRi up-m-l-30">{{reimbursementDetail.ssName || '--'}}</view>
			</view>
		</view>
		<view class="fengx"></view>
		<view class="conZho">
			<view class="xinx bold up-m-b-20">流程及办理</view>
			<template v-for="(item,index) in (reimbursementDetail.historyProcNodeList || [])" :key="index">
			<view class="liucItem u-flex">
				<image :src="item.avatar || '/static/user/default-icon.jpg'"></image>
				<view class="liucRight u-flex up-m-l-20 u-row-between">
					<view class="">
						<view class="lrleft">{{item.assigneeName}}</view>
						<view class="lrlbot">发起人</view>
					</view>
					<view class="lrleft">{{item.createTime}}</view>
				</view>
			</view>
			<view class="shux up-m-l-50 up-m-t-20" v-if="index !== (reimbursementDetail.historyProcNodeList || []).length - 1"></view>
			</template>
		</view>
	</view>
</template>

<script setup>
import {
	ref,
	reactive,
	onMounted
} from 'vue'
import {
	useRoute
} from 'vue-router'
import {
	API_finApitranslateDetail,
	API_finApitranslateType
} from '/api/task.js'
import {
	API_getDictType
} from '/api/client.js'
import { getLabelByValue } from '/util/dict.js'
const sysNo = ref('')
const reimbursementDetail = ref({})
const translateType = ref([])
const inTypeList = ref([])
const route = useRoute()
onMounted(() => {
	sysNo.value = route.query.sysNo
	getReimbursementDetail()
	getReimbursementType()
	getInType()
})
function getReimbursementDetail() {
	API_finApitranslateDetail({
		sysNo: sysNo.value
	}).then(res => {
		console.log(res)
		reimbursementDetail.value = res.data
	})
}
	// 获取报销类型
function getReimbursementType() {
		API_finApitranslateType().then(res => {
			if(res.code == 200) {
				let result = res.data
				translateType.value = result
			}
		})
	}
	// 获取是否预算内类型
	function getInType() {
		API_getDictType({dictType: 'in_type'}).then(res => {
			console.log(res,'是否预算内类型')
			if(res.code == 200) {
				let result = res.data
				inTypeList.value = result
				console.log(inTypeList.value)
			}
		})
	}
function getNameByNo(sn,list,key,labelKey) {
	return list.find(item => item[key] == sn)?.[labelKey] || '--'
}
</script>

<style scoped lang="scss">
	page {}

	.liucItem {
		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			display: block;
		}

		.liucRight {
			width: 70vw;

			.lrleft {
				font-size: 26rpx;
				color: #B7C4D7;
			}

			.lrlbot {
				font-size: 28rpx;
				color: #092D5C;
			}
		}
	}

	.shux {
		width: 1rpx;
		height: 60rpx;
		border: 3rpx solid #B7C4D7;
	}

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