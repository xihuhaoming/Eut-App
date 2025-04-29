<template>
	<view>
		<up-navbar title="开票申请" :placeholder="true" :autoBack="true" />
		<up-tabs :scrollable="false" :list="list" @click="tabclick"
			itemStyle="padding:0 50rpx; height: 34rpx; margin:30rpx 0;" inactiveStyle="font-size: 28rpx;color: #B7C4D7;"
			activeStyle="color: #092D5C;font-size:30rpx"></up-tabs>
		<view class="content">

			<view class="typeTop up-flex u-row-center">
				<hy-btn-group :list="typeList" v-model="typeValue" @itemClick="itemClick" :cancelSelectItem="false"
					:unSelectedStyle="{background: '#F5F7FB',color: '#5A78A0',borderColor: '#F6F8FC',borderRadius:'30rpx'}"
					:selectedStyle="{background: '#ECF1FF',color: '#3C82FE',borderColor: '#ECF1FF',borderRadius:'30rpx'}"></hy-btn-group>
			</view>
			<view class="xtitle bold">
				申请信息
			</view>
			<view class="card">
				<up-cell-group :border="false">
					<up-cell title="申请部门" value="易尤特集团" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="开票流程" value="易尤特集团" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="办理人" value="易尤特集团" :isLink="false" arrow-direction="right" :required="false"></up-cell>
					<up-cell title="合同编号" value="易尤特集团" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="未开票金额" value="易尤特集团" :isLink="false" arrow-direction="right" :required="false"></up-cell>
					<up-cell title="开票流程中金额" value="易尤特集团" :isLink="false" arrow-direction="right" :required="false"></up-cell>
					<!-- 	<up-cell title="事项名称" isLink :required="true">
						<template #value>
							<input v-model="name" placeholder="请输入事项名称" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell> -->
				</up-cell-group>
				<view class="xtitle bold">
					添加产品
				</view>
				<view class="card">
					<up-cell-group :border="false">
						<up-cell title="产品" value="IS9001" :isLink="true" arrow-direction="right" :required="true"></up-cell>
						<up-cell title="开票金额" value="5000" :isLink="false" arrow-direction="right" :required="true"></up-cell>
						<view class="up-m-t-20 up-m-t-20 u-text-center" style="color:red">删除</view>
					</up-cell-group>
				</view>
				<view class="xtitle bold">
					企业信息
				</view>
				<view class="card">
					<up-cell-group :border="false">
						<up-cell title="*企业名称" value="IS9001" :isLink="true" arrow-direction="right" :required="true"></up-cell>
						<up-cell title="税号" value="5000" :isLink="false" arrow-direction="right" :required="true"></up-cell>
						<up-cell title="地址" value="5000" :isLink="false" arrow-direction="right" :required="false"></up-cell>
						<up-cell title="电话" value="5000" :isLink="false" arrow-direction="right" :required="false"></up-cell>
						<up-cell title="开票公司" value="5000" :isLink="false" arrow-direction="right" :required="true"></up-cell>
						<up-cell title="开票电话" value="5000" :isLink="false" arrow-direction="right" :required="false"></up-cell>
						<up-cell title="开票联系方式" value="5000" :isLink="false" arrow-direction="right" :required="false"></up-cell>
						<up-cell title="银行账号" value="5000" :isLink="false" arrow-direction="right" :required="false"></up-cell>
						<up-cell title="开户行" value="5000" :isLink="false" arrow-direction="right" :required="false"></up-cell>
						<up-cell title="开票邮箱" value="5000" :isLink="false" arrow-direction="right" :required="true"></up-cell>
						<up-cell title="开票金额" value="5000" :isLink="false" arrow-direction="right" :required="true"></up-cell>
					</up-cell-group>
				</view>
				<!-- 			<view class="attachmentTitle u-flex up-m-t-30 u-row-between ">
					<view class="attLeft">
						附件：<text style="color: #B7C4D7;">请添加图片或文件</text>
					</view>
					<up-icon name="plus-circle" size="22px" color="#5A78A0"></up-icon>
				</view>
				<view class="u-flex up-m-t-30 u-row-between ">
					<view class="updataLeft u-flex u-col-center">
						<image src="/static/logo.png"></image>
						<view class="up-m-l-10 name">文件名称</view>
					</view>
					<up-icon name="close-circle-fill" size="22px" color="#B7C4D7"></up-icon>
				</view> -->
				<view class="textClass up-m-t-20">
					<textarea type="textarea" placeholder="请输入备注" border="surround" v-model="textValue"></textarea>
				</view>
			</view>





			<view class="qued up-m-t-70">提交</view>
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
			name: '发起提交'
		},
		{
			name: '提交记录'
		}
	]);
	const typeValue = ref(1)
	const typeList = reactive([{
		label: '增值税普通发票',
		value: 1
	}, {
		label: '增值税专用发票',
		value: 2
	}]);
	const name = ref('')
	const textValue = ref('')
	// 选择类型Z 
	const itemClick = (e) => {
		console.log(e)
	}
	// tab切换
	const tabclick = (e) => {
		console.log(e)
	}
</script>

<style setup lang="scss">
	page {
		background: #F6F8FA;
	}

	::v-deep .u-tabs {
		background: #fff;
	}

	::v-deep .u-cell__body {
		padding: 25rpx 0 !important;
	}

	::v-deep .u-cell__title-text,
	.u-cell__value {
		color: #5A78A0 !important;
	}

	::v-deep .u-cell__value {
		color: #092D5C !important;
	}

	.content {
		padding: 30rpx;

		.updataLeft {
			image {
				width: 68rpx;
				height: 68rpx;
			}

			.name {
				font-size: 22rpx;
				color: #092D5C;
			}
		}

		.attachmentTitle {
			.attLeft {
				font-size: 28rpx;
				color: #5A78A0;
			}
		}

		.textClass {
			width: 618rpx;
			height: 160rpx;
			background: #F6F8FC;
			border-radius: 8rpx;
			padding: 10rpx 0 0 10rpx;
		}

		.card {
			padding: 30rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
			border-radius: 10rpx;
		}

		.xtitle {
			font-size: 36rpx;
			color: #092D5C;
			padding: 30rpx 0 20rpx 0;
		}

		.typeTop {
			width: 100%;
			padding: 30rpx;
			background: #fff;
		}

		::v-deep .btn-group {
			justify-content: center !important;
			display: flex !important;
		}
	}
</style>