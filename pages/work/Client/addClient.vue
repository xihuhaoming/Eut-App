<template>
	<view>
		<up-navbar title="客户" :placeholder="true" :autoBack="true" />
		<view style="background:#fff;">
			<up-tabs :scrollable="false" :list="list" @click="tabclick"
				itemStyle="padding:0 50rpx; height: 34rpx; margin:30rpx 0;" inactiveStyle="font-size: 28rpx;color: #B7C4D7;"
				activeStyle="color: #092D5C;font-size:30rpx"></up-tabs>
		</view>
		<view class="content">
			<view class="card" v-if="tabIndex==0">
				<up-cell-group :border="false">
					<up-cell title="企业名称" value="客户名称" :isLink="false" arrow-direction="right" :required="true">
						<template #value>
							<input v-model="name" placeholder="请输入事项名称" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell> <up-cell title="主联系人" value="客户名称" :isLink="false" arrow-direction="right" :required="true">
						<template #value>
							<input v-model="name" placeholder="请输入事项名称" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>

					<up-cell title="社会统一信用码" :isLink="false" :required="false">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="主联系人" value="客户名称" :isLink="false" arrow-direction="right" :required="true">
						<template #value>
							<input v-model="name" placeholder="请输入事项名称" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="联系人电话" value="客户名称" :required="true" arrow-direction="right">
						<template #value>
							<input v-model="name" placeholder="请输入事项名称" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="坐标" value="选择坐标" :isLink="true" arrow-direction="right" :required="false"></up-cell>
					<up-cell title="地区" value="选择坐标" :isLink="true" arrow-direction="right" :required="true"></up-cell>
				</up-cell-group>





				<view class="textClass up-m-t-20">
					<textarea type="textarea" placeholder="请输入文字内容" border="surround" v-model="content"></textarea>
				</view>
			</view>
			<view class="card" v-if="tabIndex==1">
				<up-cell-group :border="false">
					<up-cell title="姓名" value="客户名称" :isLink="false" arrow-direction="right" :required="true">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="联系人电话" value="客户名称" :required="true" arrow-direction="right">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="身份证号" value="客户名称" :required="true" arrow-direction="right">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
				</up-cell-group>
			</view>
			<view class="card up-m-t-20">
				<view class="zhoLf">客户标签</view>
				<view class="bqclass u-flex u-flex-wrap up-m-t-20">
					<view class="bq up-m-l-10">
						添加标签
						<up-icon name="close-circle-fill" style="position: relative;left:150rpx;bottom:80rpx;"></up-icon>
					</view>
					<view class="bqadd up-m-l-20">添加标签</view>
				</view>
				<up-cell-group :border="false"><up-cell title="负责人" value="默认自己" :isLink="false" arrow-direction="right"
						:required="true">
					</up-cell>
					<up-cell title="客户来源" value="默认自己" :isLink="false" arrow-direction="right" :required="true">
					</up-cell>
					<up-cell title="意向项目类别" value="默认自己" :isLink="false" arrow-direction="right" :required="true">
					</up-cell>
					<up-cell title="客户类型" value="默认自己" :isLink="false" arrow-direction="right" :required="true">
					</up-cell>
					<up-cell title="客户等级" value="默认自己" :isLink="false" arrow-direction="right" :required="true">
					</up-cell>
				</up-cell-group>
			</view>
			<view class="u-flex u-row-between u-col-center  up-m-t-20">
				<view class="xtitle bold">已做项目</view>
				<view class="u-flex u-col-center">
					<view class="up-m-r-10" style="font-size: 26rpx;color: #B7C4D7;">添加发票</view>
					<up-icon name="plus-circle" size="20px" color="#5A78A0"></up-icon>
				</view>
			</view>
			<view class="card up-m-t-20">
				<up-cell-group :border="false">
					<up-cell title="项目" value="根据选择的产品显示名称" :isLink="false" arrow-direction="right" :required="false">
					</up-cell>
					<up-cell title="到期时间" value="2023.01.23" :isLink="true" arrow-direction="right" :required="true">
					</up-cell>
					<up-cell title="金额" value="" :required="false" arrow-direction="right">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="发证机构" value="" :required="false" arrow-direction="right">
						<template #value>
							<input v-model="name" placeholder="请输入" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
				</up-cell-group>
			</view>


			<view class="u-flex u-row-between u-col-center  up-m-t-20" v-if="tabIndex==0">
				<view class="xtitle bold">其他联系人</view>
				<view class="u-flex u-col-center">
					<view class="up-m-r-10" style="font-size: 26rpx;color: #B7C4D7;">添加发票</view>
					<up-icon name="plus-circle" size="20px" color="#5A78A0"></up-icon>
				</view>
			</view>

			<view class="card up-m-t-20" v-if="tabIndex==0">
				<view class="zhoItem u-flex u-col-center">
					<view class="zhoLf">联系人名称</view>
					<view class="zhoRi up-m-l-30">开发部/UI 设计师</view>
				</view>
				<view class="zhoItem u-flex u-col-center">
					<view class="zhoLf">电话：</view>
					<view class="zhoRi up-m-l-30">7395932</view>
				</view>
				<view class="zhoItem u-flex u-col-center">
					<view class="zhoLf">邮箱：</view>
					<view class="zhoRi up-m-l-30">27439590436@qq.co</view>
				</view>
			</view>

			<view class="xtitle bold">公司信息</view>
			<view class="card up-m-t-20">
				<up-cell title="法人" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="法人电话" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="公司电话" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="传真" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
			</view>

			<view class="xtitle bold" v-if="tabIndex==0">账户信息</view>
			<view class="card up-m-t-20" v-if="tabIndex==0">
				<up-cell title="银行账号" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="开户行" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="邮箱" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
				<up-cell title="开票电话" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell> <up-cell title="开票联系电话" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell> <up-cell title="注册地址" :isLink="false" :required="false">
					<template #value>
						<input v-model="name" placeholder="请输入" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;">
					</template>
				</up-cell>
			</view>
		</view>
		<view class="btnbox u-flex u-col-center u-row-center up-m-b-20">
			<view class="btnleft">放入公共池</view>
			<view class="btnright">保存</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';

	const tabIndex = ref(0)
	const list = reactive([{
			name: '企业客户'
		},
		{
			name: '个人客户'
		}
	]);
	const typeValue = ref(1)


	// tab切换
	const tabclick = (e) => {
		console.log(e)
		tabIndex.value = e.index
	}
</script>

<style setup lang="scss">
	page {
		background: #F6F8FA;
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
	}

	.card {
		padding: 30rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
		border-radius: 10rpx;

		.zhoLf {
			font-size: 28rpx;
			color: #5A78A0;
		}

		.zhoRi {
			font-size: 28rpx;
			color: #092D5C;
		}

		.bqadd {
			width: 172rpx;
			height: 68rpx;
			border-radius: 6rpx;
			border: 2rpx dashed #3C82FE;
			text-align: center;
			line-height: 68rpx;
			font-size: 28rpx;
			color: #3C82FE;
		}

		.bq {
			width: 172rpx;
			height: 68rpx;
			border-radius: 6rpx;
			border: 2rpx solid #3C82FE;
			text-align: center;
			line-height: 68rpx;
			font-size: 28rpx;
			background: #E1ECFF;
			color: #3C82FE;
		}
	}

	.textClass {
		width: 618rpx;
		height: 160rpx;
		background: #F6F8FC;
		border-radius: 8rpx;
		padding: 10rpx 0 0 10rpx;
	}

	.xtitle {
		font-size: 36rpx;
		color: #092D5C;
		padding: 30rpx 0 20rpx 0;
	}

	.btnbox {
		// position: absolute;
		// bottom: 5vw;
		// left: 9vw;

		.btnleft {
			padding: 25rpx 115rpx;
			font-size: 36rpx;
			color: #3C82FE;
			background: #ECF1FF;
			border-radius: 59rpx;
		}

		.btnright {
			padding: 25rpx 115rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			background: #3C82FE;
			border-radius: 59rpx;
			margin-left: 20rpx;
		}
	}
</style>