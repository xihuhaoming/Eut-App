<template>
	<view>
		<up-navbar title="客户详情" :placeholder="true" :autoBack="true" :bgColor="bgColor" :titleStyle="{color:'#ffffff'}">
			<template #right>
				<view class="u-flex" style="padding-left: 4px;" @tap="$u.route('')">
					<image style="width:34rpx;height:34rpx;" src="/static/client/phone1.png"></image>
					<image class="up-m-l-20" style="width:34rpx;height:34rpx;" src="/static/client/dian.png"></image>
					<!-- <up-icon name="phone" color="#ffffff" size="28"></up-icon> -->
					<!-- <up-icon name="more-circle-fill" class="up-m-l-20" color="#ffffff" size="28"></up-icon> -->
				</view>
			</template>
		</up-navbar>
		<view class="top">
			<view class="info">
				<view class="bqclass u-flex u-flex-wrap">
					<view class="bq">
						添加标签
					</view>
					<view class="bq up-m-l-20">
						添加标签
					</view>
				</view>
				<view class="title up-m-t-30">{{ companyClientData.contacts }}</view>
				<view class="leix up-m-t-10">来源：{{ companyClientData.customerType === 0 ? '新客户' : companyClientData.customerType === 1 ? '老客户' : '激活客户' }}</view>
				<view class="inforight u-text-center">
					<image src="/static/client/kehu1.png"></image>
					<view>未标记</view>
				</view>
				<view class="infobot">
					{{ companyClientData.level === 0 ? '未标记' : companyClientData.level === 1 ? '钻石客户' : 'VIP客户' }}
				</view>
			</view>
		</view>
		<view class="up-m-t-90" style="background:#fff;margin-top:130rpx;">
			<up-tabs :scrollable="false" :list="list" @click="tabclick"
				itemStyle="padding:0 50rpx; height: 34rpx; margin:30rpx 0;" inactiveStyle="font-size: 28rpx;color: #B7C4D7;"
				activeStyle="color: #092D5C;font-size:30rpx"></up-tabs>
		</view>
		<!-- 个人客户 -->
		<view v-if="tabIndex==100" class="pd-30">
			<view class="card">
				<up-cell size="large" title="客户名称" value="客户名称" :isLink="false"></up-cell>
				<up-cell size="large" title="身份证号" value="274958939" :isLink="false"></up-cell>
				<up-cell size="large" title="公司" value="主联系人" :isLink="false"></up-cell>
				<up-cell size="large" title="部门" value="项目的类别" :isLink="false"></up-cell>
				<up-cell size="large" title="职位" value="项目的类别" :isLink="false"></up-cell>
				<up-cell size="large" title="邮箱" value="项目的类别" :isLink="false"></up-cell>
			</view>
		</view>
		<!-- 企业客户 -->
		<view v-if="tabIndex==0" class="pd-30">
			<view class="card">
				<up-cell size="large" title="企业名称" :value="companyClientData.name" :isLink="false" ></up-cell>
				<up-cell size="large" title="社会统一信用码" :value="companyClientData.code" :isLink="false"></up-cell>
				<up-cell size="large" title="主联系人" :value="companyClientData.contacts" :isLink="false"></up-cell>
				<up-cell size="large" title="联系人手机" :value="companyClientData.phone" :isLink="false"></up-cell>
				<up-cell size="large" title="坐标" :value="companyClientData.coordinate" :isLink="false"></up-cell>
				<up-cell size="large" title="地区" :value="companyClientData.region" :isLink="false"></up-cell>
				<up-cell size="large" title="详细地址" :value="companyClientData.address" :isLink="false"></up-cell>
			</view>
			<view class="card up-m-t-20">
				<up-cell size="large" title="法人" :value="companyClientData.legal" :isLink="false"></up-cell>
				<up-cell size="large" title="法人电话" :value="companyClientData.legalPhone" :isLink="false"></up-cell>
				<up-cell size="large" title="公司电话" value="274958939" :isLink="false"></up-cell>
				<up-cell size="large" title="传真" :value="companyClientData.fax" :isLink="false"></up-cell>
			</view>

			<view class="xtitle bold up-m-t-20">其他联系人</view>
			<view class="card up-m-t-20" style="padding:30rpx" v-for="item in otherUserList" :key="item.id">
				<view class="zhoItem u-flex u-col-center">
					<view class="zhoLf">联系人名称</view>
					<view class="zhoRi up-m-l-30">{{item.name}}</view>
				</view>
				<view class="zhoItem u-flex u-col-center">
					<view class="zhoLf">电话：</view>
					<view class="zhoRi up-m-l-30">{{item.phone}}</view>
				</view>
				<view class="zhoItem u-flex u-col-center">
					<view class="zhoLf">邮箱：</view>
					<view class="zhoRi up-m-l-30">{{item.email}}</view>
				</view>
				<image src="/static/client/phone2.png" class="phone"></image>
			</view>
			<view class="xtitle bold up-m-t-20">账户信息</view>
			<view class="card up-m-t-20" style="margin-bottom:200rpx">
				<up-cell size="large" title="银行账号" :value="companyClientData.bankAccount" :isLink="false"></up-cell>
				<up-cell size="large" title="开户行" :value="companyClientData.bankType" :isLink="false"></up-cell>
				<up-cell size="large" title="邮箱" :value="companyClientData.email" :isLink="false"></up-cell>
				<up-cell size="large" title="开票电话" :value="companyClientData.invoiceTel" :isLink="false"></up-cell>
				<up-cell size="large" title="开票联系电话" :value="companyClientData.invoicePhone" :isLink="false"></up-cell>
				<up-cell size="large" title="注册地址" :value="companyClientData.registeredAddress" :isLink="false"></up-cell>
			</view>
		</view>
		<view v-if="tabIndex==1" class="pd-30">
			<view class="card pd-30 up-m-t-20">
				<view class="genjTime">创建时间：2023.02.23 16:0</view>
				<view class="genjtitle up-m-t-10">走访情况描述：</view>
				<view class="genjCon">
					虽然年同比和年环比的计算公式相同，但两者所侧重反映的时间跨度和数据变化特点有所不同。年同比更强调长期趋势和周期性变虽然年同比和年环比的计算公式相同，但两者所侧重反映的时间跨度和数据变化特点有所不同。年同比更强调长期趋势和周期性变
				</view>
				<view class="genjbq" style="background:#3C82FE">
					有意向
				</view>
				<!-- 	<view class="genjbq" v-if="item.status==1" style="background:#FE4949">
					有意向
				</view> -->
			</view>
		</view>
		<view v-if="tabIndex==2" class="pd-30">
			<view class="pic pd-30 up-m-t-20" v-for="item in projectList" :key="item.id">
				<view class="picttle bold">
					{{ item.projectName? item.projectName : '未命名' }}
				</view>
				<view class="piccon">
					金额：{{ item.projectAmount }}
				</view>
				<view class="piccon">
					到期时间：<text style="color:#FE4949">{{ item.expireDate? item.expireDate : '未设置' }}</text>
				</view>
				<view class="piccon">
					签发机构：{{ item.issuingAgency? item.issuingAgency : '未设置' }}
				</view>
			</view>
		</view>
		<view class="bottom u-flex u-col-center u-row-between">
			<view class="botitem u-flex u-col-center">
				<image src="/static/client/btn1.png"></image>
				<view>客户标记</view>
			</view>
			<view class="botitem u-flex u-col-center" @click="addFlow()">
				<image src="/static/client/btn2.png"></image>
				<view>新建跟进</view>
			</view>
			<view class="botitem u-flex u-col-center">
				<image src="/static/client/btn3.png"></image>
				<view>合同签约</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		watch
	} from 'vue';
	import {
		API_getClientBySysNo
	} from '@/api/client';
	import {
		useRoute
	} from 'vue-router';
	const tabIndex = ref(0)
	const list = reactive([{
			name: '基本信息'
		},
		{
			name: '跟进记录'
		}, {
			name: '已做项目'
		}
	]);
	const bgColor = ref('#3C82FE');


	// 定义 id 变量
	const id = ref(null);

	

	const companyClientData = ref({})

	// 新增一个 ref 来存储处理后的 otherUser 字符串
	const otherUserDisplayString = ref('');

	onMounted(() => {
		// 获取当前页面实例
		const pages = getCurrentPages();
  		const currentPage = pages[pages.length - 1];
		// 从页面参数中获取 id
		if (currentPage.options && currentPage.options.id) {
			id.value = currentPage.options.id;
			console.log('获取到客户ID:', id.value);
			// 获取客户详情
			getClientDetailFun();
		} else {
			console.error('未获取到客户ID');
		}
		
	});

	const projectList = ref([])

	// 监听 companyClientData.value.otherUser 的变化
	watch(() => companyClientData.value.otherUser, (newOtherUser) => {
		if (newOtherUser) {
			processOtherUser(newOtherUser);
		} else {
			otherUserDisplayString.value = '暂无其他联系人';
		}
	}, { deep: true, immediate: false }); 

	const otherUserList = ref([])

	const processOtherUser = (otherUserData) => {
		console.log("开始处理 otherUser 数据:", otherUserData);
		let users = [];
		if (typeof otherUserData === 'string') {
			try {
				users = JSON.parse(otherUserData); // 如果是JSON字符串，先解析
				if (!Array.isArray(users)) { // 如果解析出来不是数组，置为空数组
					console.warn("解析后的 otherUser 不是一个数组:", users);
					users = [];
				}
			} catch (e) {
				console.error("解析 otherUser JSON 字符串失败:", e);
				users = []; // 解析失败则视为空数组
			}
		}
		otherUserList.value = users
	};

	// tab切换
	const tabclick = (e) => {
		console.log(e)
		tabIndex.value = e.index
	}
	const addFlow = () => {
		uni.navigateTo({
			url: '/pages/work/Client/addFollow'
		})
	}

	
	// 获取客户详情
	const getClientDetailFun = async () => {
		console.log(id.value)
		if (!id.value) {
			return;
		}
		const params = {
			sysNo: id.value
		};
		const res = await API_getClientBySysNo(params)
		console.log(res)
		companyClientData.value = res.data
		projectList.value = res.data.projectList
	}
	


</script>

<style lang="scss" scoped>
	page {
		background: #F6F8FA;
	}

	::v-deep .uicon-arrow-left {
		color: #ffffff !important;
	}

	.top {
		width: 100%;
		height: 149rpx;
		background: #3C82FE;
		padding: 30rpx 30rpx 30rpx 30rpx;

		.info {
			box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
			border-radius: 10rpx;
			background: #ffffff;
			padding: 30rpx;
			position: relative;

			.title {
				font-size: 36rpx;
				color: #092D5C;
			}

			.leix {
				font-size: 26rpx;
				color: #5A78A0;
			}

			.inforight {
				position: absolute;
				right: 50rpx;
				top: 60rpx;
				font-size: 24rpx;
				color: #5A78A0;

				image {
					width: 60rpx;
					height: 41rpx;
				}

			}

			.infobot {
				position: absolute;
				display: inline-block;
				background-color: #007AFF;
				color: white;
				padding: 10rpx 20rpx;
				font-size: 20rpx;
				bottom: 0;
				right: 0;
				border-radius: 0 0 10rpx 0;
			}


		}

		.bq {
			width: 128rpx;
			height: 46rpx;
			border-radius: 6rpx;
			border: 2rpx solid #3C82FE;
			text-align: center;
			line-height: 46rpx;
			font-size: 22rpx;
			background: #E1ECFF;
			color: #3C82FE;
		}
	}

	::v-deep .u-cell__title-text,
	.u-cell__value {
		color: #5A78A0 !important;
	}

	::v-deep .u-cell__value {
		color: #092D5C !important;
	}

	.card {
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
		border-radius: 10rpx;
		position: relative;

		.phone {
			position: absolute;
			width: 40rpx;
			height: 40rpx;
			right: 60rpx;
			top: 60rpx;
		}
	}

	.zhoLf {
		font-size: 28rpx;
		color: #5A78A0;
	}

	.zhoRi {
		font-size: 28rpx;
		color: #092D5C;
	}

	.pd-30 {
		padding: 30rpx;
	}

	.genjTime {
		font-size: 26rpx;
		color: #B7C4D7;
	}

	.genjtitle {
		font-size: 28rpx;
		color: #092D5C;
	}

	.genjCon {
		font-size: 28rpx;
		color: #5A78A0;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		/* 限制显示的行数 */
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		/* 可选：允许单词内换行 */
	}

	.genjbq {
		padding: 10rpx 35rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		width: 163rpx;
		border-radius: 0px 10rpx 0px 10rpx;
		position: absolute;
		right: 0;
		top: 0;
	}

	.pic {
		background: #ffffff;

		.picttle {
			font-size: 28rpx;
			color: #092D5C;
		}

		.piccon {
			font-size: 26rpx;
			color: #5A78A0;
		}
	}

	.bottom {
		background: #ffffff;
		width: 100%;
		// height:200rpx;
		position: fixed;
		bottom: 0;
		padding: 40rpx;

		.botitem {
			font-size: 28rpx;
			color: #092D5C;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
		}
	}
</style>