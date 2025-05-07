<template>
	<view class="">
		<up-navbar title="合同详情" :placeholder="true" :autoBack="true" />
		<view class="conTop">
			<view class="time">2023.02.12 16:00:00</view>
			<view class="title bold">EUT- HT- LS-2071</view>
			<view class="zhongx">上海鑫磊娜童车配件有限公司</view>
			<view class="zhongx">上海市金山区吕岗镇六桥村1090号-1</view>
			<view class="zhongx">负责人：易尤特</view>
			<view class="type">已确认</view>
		</view>
		<view class="fengx"></view>
		<view class="conZho">
			<view class="xinx bold  up-m-b-20">合同信息</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">签约时间</view>
				<view class="zhoRi up-m-l-30">2024-10-01 10:07:35</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">交付时间</view>
				<view class="zhoRi up-m-l-30">2024-10-01 10:07:35</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">经办人</view>
				<view class="zhoRi up-m-l-30">2024-10-01 10:07:35</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">经办人电话</view>
				<view class="zhoRi up-m-l-30">2024-10-01 10:07:35</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">合同条款</view>
				<view class="zhoRi up-m-l-30" style="color:#3C82FE">UI-3299-732959</view>
			</view>
			<view class="zhoLf">备注（对内）</view>
			<view class="textClass up-m-t-20">
				<view>如怀疑存在 DNS 劫持，可尝试更换 D</view>
			</view>
			<view class="zhoLf">备注（对外）</view>
			<view class="textClass up-m-t-20">
				<view>如怀疑存在 DNS 劫持，可尝试更换 D</view>
			</view>
			<view class="zhoItem">
				<view class="zhoLf">附件</view>
				<view class="u-flex up-m-t-20">
					<image class="up-m-l-20" style="width:124rpx;height:124rpx" src="/static/logo.png"></image>
				</view>
			</view>
			<!-- 	<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">金额</view>
				<view class="zhoRi up-m-l-30" style="color:#FE4949">5000</view>
			</view> -->
			<view class="zhoItem">
				<view class="zhoLf">产品及付款方式</view>
				<view class="zhotable up-m-l-30 up-m-t-20">
					<view class="tbaletop u-flex u-col-center u-row-around">
						<view class="ttleft">
							<view>3694805905</view>
							<view>产品名称备份</view>
							<view>1893.00</view>
						</view>
						<view class="ttright u-text-center">
							<view>×1</view>
							<view>1000.00</view>
						</view>
					</view>
					<view class="tbalebot u-flex u-col-center u-row-around">
						<view class="ttleft">首款</view>
						<view class="ttright" style="color:#FE4949">26000</view>
					</view>
					<view class="tbalebot u-flex u-col-center u-row-around">
						<view class="ttleft">尾款</view>
						<view class="ttright" style="color:#FE4949">26000</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fengx"></view>
		<view class="conZho">
			<view class="xinx bold up-m-b-20">合计</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">首款合计</view>
				<view class="zhoRi up-m-l-30">32795.00（壹万伍仟元整）</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">尾款合计</view>
				<view class="zhoRi up-m-l-30">32795.00（壹万伍仟元整）</view>
			</view>
			<view class="zhoItem u-flex u-col-center">
				<view class="zhoLf">合计总金额</view>
				<view class="zhoRi up-m-l-30">32795.00（壹万伍仟元整）</view>
			</view>
		</view>

		<view class="fengx"></view>
		<view class="conZho">
			<view class="xinx bold up-m-b-20">流程及办理</view>
			<view class="liucItem u-flex">
				<image src="/static/logo.png"></image>
				<view class="liucRight u-flex up-m-l-20 u-row-between">
					<view class="">
						<view class="lrleft">发起申请</view>
						<view class="lrlbot">发起人</view>
					</view>
					<view class="lrleft">2023.03.26 16:00:00</view>
				</view>
			</view>
			<view class="shux up-m-l-50 up-m-t-20"></view>
		</view>
		<view class="fengx"></view>
		<view class="">
			<hy-btn-group class="up-m-t-30 up-m-l-20" :list="workList" v-model="workValue" @itemClick="itemClick1" multiple
				:unSelectedStyle="{background: '#F5F7FB',color: '#5A78A0',borderColor: '#F5F7FB'}"
				:selectedStyle="{background: '#ECF1FF',color: '#3C82FE',borderColor: '#ECF1FF'}"></hy-btn-group>
		</view>
		<view class="fengx"></view>
		<view class="btnbox u-flex u-col-center">
			<view class="btnright">开票</view>
			<view class="btnright">收款</view>
			<view class="btnright">付款</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';

	const workList = reactive([{
			label: '采购流程',
			value: 1
		}, {
			label: '入库流程',
			value: 2
		},
		{
			label: '合同流程',
			value: 3
		},
		{
			label: '工作流流程',
			value: 4
		},
	]);
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
				height: 200rpx;
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
			line-height: 1.5;
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

	.textClass {
		width: 618rpx;
		height: 160rpx;
		background: #F6F8FC;
		border-radius: 8rpx;
		padding: 10rpx 0 0 10rpx;
		font-size: 28rpx;
		color: #B7C4D7;
	}

	.btnbox {
		// position: absolute;
		// bottom: 5vw;
		// left: 9vw;
		margin-top: 30rpx;

		.btnleft {
			padding: 25rpx 100rpx;
			font-size: 34rpx;
			color: #3C82FE;
			background: #ECF1FF;
			border-radius: 59rpx;
		}

		.btnright {
			padding: 15rpx 80rpx;
			font-size: 34rpx;
			color: #FFFFFF;
			background: #3C82FE;
			border-radius: 59rpx;
			margin:20rpx 0rpx 50rpx 20rpx;
		}
	}
</style>