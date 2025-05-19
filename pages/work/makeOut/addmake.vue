<template>
	<view>
		<up-navbar title="开票申请" :placeholder="true" :autoBack="true" @leftClick="backTap()" />
		<up-tabs :scrollable="false" :list="list" @click="tabclick"
			itemStyle="padding:0 50rpx; height: 34rpx; margin:30rpx 0;" inactiveStyle="font-size: 28rpx;color: #B7C4D7;"
			activeStyle="color: #092D5C;font-size:30rpx"></up-tabs>
		<view class="content" v-if="tabIndex == 0">
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
					<up-cell title="申请部门" :value="entDeptName" :isLink="true" arrow-direction="right" :required="true"
						@click="deptshow= true"></up-cell>
					<up-cell title="开票流程" :value="statuValue" :isLink="true" arrow-direction="right" :required="true"
						@click="statusshow= true"></up-cell>
					<up-cell title="办理人" :value="user" :isLink="false" arrow-direction="right" :required="false"></up-cell>
					<up-cell title="合同编号" :value="contractData.sysNo" :isLink="true" arrow-direction="right" :required="true"
						@click="navcon()"></up-cell>
					<up-cell title="未开票金额" :value="(contractData.allPrice-contractData.invoicePrice)" :isLink="false"
						arrow-direction="right" :required="false"></up-cell>
					<up-cell title="开票流程中金额" :value="contractData.applyingInvoicePrice" :isLink="false" arrow-direction="right"
						:required="false"></up-cell>
					<!-- 	<up-cell title="事项名称" isLink :required="true">
						<template #value>
							<input v-model="name" placeholder="请输入事项名称" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell> -->
				</up-cell-group>
				<view class="u-flex u-row-between u-col-center">
					<view class="xtitle bold">添加产品</view>
					<view class="u-flex u-col-center" @click="addprod()">
						<view class="up-m-r-10" style="font-size: 26rpx;color: #B7C4D7;">添加产品</view>
						<up-icon name="plus-circle" size="20px" color="#5A78A0"></up-icon>
					</view>
				</view>
				<block v-for="(item,index) in prodList" :key="index">
					<view class="card up-m-t-20">
						<up-cell-group :border="false">
							<up-cell title="产品" :value="prodList[index].proServeName" :isLink="true" arrow-direction="right"
								:required="true" @click="proTap(index)"></up-cell>
							<up-cell title="开票金额" :value="prodList[index].recPrice" :isLink="false" arrow-direction="right"
								:required="true"></up-cell>
							<view class="up-m-t-20 up-m-t-20 u-text-center" style="color:red" @click="delitTap(index)">删除</view>
						</up-cell-group>
					</view>
				</block>
				<view class="xtitle bold">
					企业信息
				</view>
				<view class="card">
					<up-cell-group :border="false">
						<up-cell title="企业名称" :required="true" :isLink="false">
							<template #value>
								<input v-model="inEntName" placeholder="请输入" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell>
						<up-cell title="税号" :required="true" :isLink="false">
							<template #value>
								<input v-model="csrCustomerCode" placeholder="请输入" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell>
						<up-cell title="地址" :required="false" :isLink="false">
							<template #value>
								<input v-model="csrAddress" placeholder="请输入" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell>
						<up-cell title="电话" :required="false" :isLink="false">
							<template #value>
								<input v-model="csrPhone" placeholder="请输入" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell>
						<up-cell title="开票公司" :required="true" :isLink="false">
							<template #value>
								<input v-model="invoiceName" placeholder="请输入" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell>
						<up-cell title="开票电话" :required="false" :isLink="false">
							<template #value>
								<input v-model="invoiceTel" placeholder="请输入" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell>
						<up-cell title="开票联系方式" :required="false" :isLink="false">
							<template #value>
								<input v-model="invoicePhone" placeholder="请输入" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell>
						<up-cell title="银行账号" :required="false" :isLink="false">
							<template #value>
								<input v-model="bankAccount" placeholder="请输入" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell>
						<up-cell title="开户行" :required="false" :isLink="false">
							<template #value>
								<input v-model="bankType" placeholder="请输入" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell>
						<up-cell title="开票邮箱" :required="true" :isLink="false">
							<template #value>
								<input v-model="invoiceEmail" placeholder="请输入" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell>
						<up-cell title="开票金额" :required="true" :isLink="false">
							<template #value>
								<input v-model="recPrice" placeholder="请输入" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell>
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
			<view class="qued up-m-t-70" @click="addData()">提交</view>

		</view>
		<view class="content1" v-if="tabIndex == 1">
			<view class="up-p-t-20" style="background:#ffffff;">
				<up-search class="up-m-b-20" placeholder="请输入查找内容" v-model="keyword" :showAction="false" bgColor="#F6F8FC"
					height="40" @search="getlistData()"></up-search>
				<view class="u-flex filter u-col-center u-row-around">
					<!-- 时间 -->
					<up-dropdown ref="uDropdownRef" border-radius="20">
						<up-dropdown-item title="时间">
							<view class="slot-content">
								<view class="slotCon up-flex up-text-center up-content-color u-row-around up-p-t-40 up-p-b-40">
									<view class="timeView" @click="timeTan(1)">{{startTime}}</view>
									<view class="timeView" @click="timeTan(2)">{{endTime}}</view>
								</view>
								<view class="slotCon up-flex up-text-center u-row-around up-p-t-40 up-p-b-40">
									<view class="timeBtn" @click="chongzTime">重置</view>
									<view class="timeBtn2" @click="SubmitTime">确认</view>
								</view>
								<!-- <up-button type="primary" @click="closeDropdown">时间</up-button> -->
							</view>
						</up-dropdown-item>
						<!-- 类型 -->
						<up-dropdown-item title="类型">
							<view class="slot-content up-p-l-25 up-p-r-25">
								<view class="slotCon up-text-center up-content-color up-p-t-40 up-p-b-40">
									<!-- 任务 -->
									<view class="typeTitle u-flex u-col-center ">
										<view class="ttleft up-m-r-20"></view>
										<view class="ttright">任务&通知</view>
									</view>
									<hy-btn-group class="up-m-t-30 up-m-l-20" :list="workList0" v-model="workValue0"
										@itemClick="itemClick1" multiple
										:unSelectedStyle="{background: '#F5F7FB',color: '#5A78A0',borderColor: '#F5F7FB'}"
										:selectedStyle="{background: '#ECF1FF',color: '#3C82FE',borderColor: '#ECF1FF'}"></hy-btn-group>
									<!-- 工作组名称 -->
									<view class="typeTitle u-flex u-col-center up-m-t-30">
										<view class="ttleft1 up-m-r-20"></view>
										<view class="ttright">工作组名称</view>
									</view>
									<hy-btn-group class="up-m-t-30 up-m-l-20" :list="workList" v-model="workValue" @itemClick="itemClick1"
										multiple :unSelectedStyle="{background: '#F5F7FB',color: '#5A78A0',borderColor: '#F5F7FB'}"
										:selectedStyle="{background: '#ECF1FF',color: '#3C82FE',borderColor: '#ECF1FF'}"></hy-btn-group>
									<!-- 工作组名称 -->
									<view class="typeTitle u-flex u-col-center up-m-t-30">
										<view class="ttleft1 up-m-r-20"></view>
										<view class="ttright">工作组名称</view>
									</view>
									<hy-btn-group class="up-m-t-30 up-m-l-20" :list="workList2" v-model="workValue2"
										@itemClick="itemClick1" multiple
										:unSelectedStyle="{background: '#F5F7FB',color: '#5A78A0',borderColor: '#F5F7FB'}"
										:selectedStyle="{background: '#ECF1FF',color: '#3C82FE',borderColor: '#ECF1FF'}"></hy-btn-group>
								</view>
								<view class="slotCon up-flex up-text-center u-row-around up-p-t-40 up-p-b-40">
									<view class="timeBtn" @click="chongzTime">重置</view>
									<view class="timeBtn2" @click="SubmitTime">确认</view>
								</view>
								<!-- <up-button type="primary" @click="closeDropdown">时间</up-button> -->
							</view>
						</up-dropdown-item>
					</up-dropdown>
				</view>
			</view>
			<view class="taskbox">
				<block v-for="(item,index) in ListData" :key="index">
					<view class="taskItem up-m-t-20">
						<view class="titemTop u-flex u-row-between up-p-b-15">
							<view class="ttleft u-flex u-col-center">
								<image src="/static/work/time.png"></image>
								<view>{{item.createInDate}}</view>
							</view>
							<view class="ttright">{{item.useStatusStr}}</view>
							<!-- 	<view class="ttright" style="color:#FE4949">待确认</view>
						<view class="ttright" style="color:#1CAA42">待确认</view>
						<view class="ttright" style="color:#092D5C">已作废</view> -->
						</view>
						<view class="task-title up-m-t-20 bold">
							{{item.csrCustomerName}}
						</view>
						<view class="tasktext up-m-b-10" style="color:#B7C4D7">{{item.code}}</view>
						<view class="tasktext">开票金额：<text style="color:red">{{item.recPrice}}</text></view>
						<view class="tasktext">合同编码：{{item.projContractSysNo}}</view>
						<view class="tasktext">部门：{{item.entDeptName}}</view>
						<view class="tasktext">负责人：{{item.inUserName}}</view>
					</view>
				</block>
			</view>


		</view>
		<!-- 选择产品 -->
		<up-picker :show="proshow" :columns="[contractData.projContractServer]" keyName="proServeName" @cancel="proCancel"
			@confirm="proconfirm"></up-picker>
		<!-- 选择开票流程 -->
		<up-picker :show="statusshow" :columns="useStatusList" keyName="processName" @cancel="statusCancel"
			@confirm="statusconfirm"></up-picker>
		<!-- 选择部门 -->
		<up-picker :show="deptshow" :columns="[store.userInfo.deptList]" keyName="name" @cancel="deptCancel"
			@confirm="deptconfirm"></up-picker>
		<!-- 选择时间 -->
		<up-datetime-picker :minDate="1735660800000" :hasInput="false" class="timeView" hasInput :show="timeshow1"
			v-model="startTime" mode="date" placeholder="开始时间" @confirm="confirm1"
			@cancel="timeshow1 = false"></up-datetime-picker>
		<up-datetime-picker :minDate="1735660800000" :hasInput="false" class="timeView" hasInput :show="timeshow2"
			v-model="endTime" mode="date" placeholder="结束时间" @confirm="confirm2"
			@cancel="timeshow2 = false"></up-datetime-picker>
	</view>
</template>

<script setup>
	import {
		API_invoiceApplyAdd,
		API_contracthDetail,
		API_ProjInvoicePage,
		API_getStartProcessList
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
	import {
		useCounterStore
	} from '/store/counter';
	const store = useCounterStore();
	const deptList1 = reactive([
		[]
	]);
	const deptshow = ref(false)
	const entDeptName = ref('')
	const entDeptSysNo = ref('')
	const tabIndex = ref(0)
	const keyword = ref("")
	entDeptName.value = store.userInfo.deptList[0].name
	entDeptSysNo.value = store.userInfo.deptList[0].sysNo

	const statusshow = ref(false)
	const statuValue = ref('请选择')
	const useStatus = ref('')
	const useStatusList = reactive([
		[]
	]);
	const user = ref('')
	user.value = store.userInfo.name
	const contractData = ref({
		code: "请选择",
		allPrice: 0,
		putPrice: 0
	})
	const prodList = ref([])
	const proshow = ref(false)
	const projInvoiceSubs = ref([])
	const proIndex = ref(0)
	const inEntName = ref('')
	const csrCustomerCode = ref('')
	const csrAddress = ref('')
	const csrPhone = ref('')
	const invoiceName = ref('')
	const invoiceTel = ref('')
	const invoicePhone = ref('')
	const bankAccount = ref('')
	const bankType = ref('')
	const invoiceEmail = ref('')
	const recPrice = ref('')
	const pageIndex = ref(1)
	const total = ref(0)

	const ListData = ref([])
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
	const workList0 = reactive([{
		label: '任务',
		value: 1
	}, {
		label: '通知',
		value: 2
	}]);
	const name = ref('')
	const textValue = ref('')
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
	const workList2 = reactive([{
			label: '采购流程',
			value: 1
		}, {
			label: '入库流程',
			value: 2
		},
		{
			label: '合同流程',
			value: 3
		}
	]);
	const workValue0 = reactive([])
	const workValue = reactive([])
	const workValue2 = reactive([])
	const uDropdownRef = ref(null)
	const startTime = ref('开始时间')
	const endTime = ref('结束时间')
	const timeshow1 = ref(false);
	const timeshow2 = ref(false);
	onMounted({
		// await store.fetchUserInfo(); // 等待数据加载完成
		// deptList1[0] = store.userInfo.deptList || []; // 赋值给响应式数组
	});
	onLoad((e) => {
		getlistData();
		getProcessList();
		if (e.sysNo) {
			console.log(e.sysNo)
			contractDetile(e.sysNo)
			// contractData.value = JSON.parse(e.item)
		}
	})
	onReachBottom(() => {
		getlistData();

	})
	// 流程列表
	const getProcessList = () => {
		// 流程列表
		API_getStartProcessList({
			category: 'invoice'
		}).then(res => {
			console.log(res)
			useStatusList[0] = res.data
			console.log(res.data[0].definitionId)
			useStatus.value = res.data[0].definitionId
			statuValue.value = res.data[0].processName
			console.log(useStatus.value)
		})
	}
	// 列表
	const getlistData = () => {

		API_ProjInvoicePage({
			search: keyword.value,
			type: 1,
			pageSize: 10,
			pageIndex: pageIndex.value
		}).then(res => {
			console.log(res)
			if (res.data.records.length == 0) {
				ListData.value = []
			}
			if (ListData.value.length != 0 && ListData.value.length >= total.value)
				return;
			if (pageIndex == 1) {
				ListData.value = res.data.records;
			} else {
				ListData.value = ListData.value.concat(res.data.records);
			}
			total.value = total;
			pageIndex.value++;
			console.log(ListData.value)
		})
	}
	// 选择产品
	const proTap = (index) => {
		console.log(index)
		proIndex.value = index
		proshow.value = true
	}
	// 合同详情
	const contractDetile = (sysNo) => {
		API_contracthDetail({
			sysNo: sysNo
		}).then(res => {
			contractData.value = res.data
			console.log(contractData.value)
		})
	}
	// 删除产品
	const delitTap = (index) => {
		prodList.value.splice(index, 1)
	}
	// 添加产品
	const addprod = () => {
		let obj = {
			proServeName: "",
			recPrice: "",
			projServerSysNo: ""
		}
		prodList.value.push({
			...obj
		})
	}
	// 返回
	const backTap = () => {
		uni.switchTab({
			url: '/pages/work/work'
		})
	}
	const deptCancel = () => {
		deptshow.value = false
	}
	const statusCancel = () => {
		statusshow.value = false
	}
	const proCancel = () => {
		proshow.value = false
	}
	const proconfirm = (e) => {
		console.log(e)

		prodList.value[proIndex.value].proServeName = e.value[0].proServeName
		prodList.value[proIndex.value].recPrice = e.value[0].invoicePrice
		prodList.value[proIndex.value].projServerSysNo = e.value[0].projServerSysNo
		// entDeptSysNo.value = e.value[0].sysNo
		// entDeptName.value = e.value[0].name
		proshow.value = false

		console.log(prodList.value)
	}
	const deptconfirm = (e) => {
		console.log(e.value[0].name)
		entDeptSysNo.value = e.value[0].sysNo
		entDeptName.value = e.value[0].name
		deptshow.value = false
	}
	const statusconfirm = (e) => {
		console.log(e.value[0].value)
		useStatus.value = e.value[0].definitionId
		statuValue.value = e.value[0].processName
		statusshow.value = false
	}

	// 新增
	const addData = () => {
		if (!statuValue.value) return uni.$u.toast('请选择开票流程')
		if (!contractData.value.code) return uni.$u.toast('请选择合同')
		let prosf;
		if (prodList.value.length > 0) {
			prosf = prodList.value.some((item) => {
				return item.proServeName !== '';
			});
			// console.log(prosf);
		}
		// console.log(prosf);
		if (!prosf) return uni.$u.toast('请选择产品')
		if (!prodList.value.length) return uni.$u.toast('请选择合同')
		// console.log(contractData.code)
		let inType;
		if (tabIndex.value == 0) {
			inType = 1
		} else {
			inType = 2
		}
		if (!inEntName.value) return uni.$u.toast('请输入企业名称')
		if (!csrCustomerCode.value) return uni.$u.toast('请输入税号')
		if (!invoiceName.value) return uni.$u.toast('请输入开票公司')
		if (!invoiceEmail.value) return uni.$u.toast('请输入开票邮箱')
		if (!recPrice.value) return uni.$u.toast('请输入开票金额')
		let obj = {
			inType: inType,
			entDeptName: entDeptName.value,
			workFlowSysNo: useStatus.value,
			user: user.value,

			projContractSysNo: contractData.value.sysNo,
			projInvoiceSubs: prodList.value,
			inEntName: inEntName.value,
			csrCustomerCode: csrCustomerCode.value,
			csrAddress: csrAddress.value,
			csrPhone: csrPhone.value,
			invoiceName: invoiceName.value,
			invoiceTel: invoiceTel.value,
			invoicePhone: invoicePhone.value,
			bankAccount: bankAccount.value,
			bankType: bankType.value,
			invoiceEmail: invoiceEmail.value,
			recPrice: recPrice.value,
		}
		console.log(obj)
		API_invoiceApplyAdd(obj).then(res => {
			uni.$u.toast('提交成功')
			getlistData()
		})
	}
	// 选择合同
	const navcon = () => {
		uni.navigateTo({
			url: '/pages/work/contract/OptionContract'
		})
	}
	// 选择类型Z 
	const itemClick = (e) => {
		console.log(e)
	}
	// tab切换
	const tabclick = (e) => {
		console.log(e)
		tabIndex.value = e.index
	}
	// 关闭筛选框
	const closeDropdown = () => {
		// this.$refs.uDropdownRef.close();
		uDropdownRef.value.close()
	}
	// 选择类型
	const itemClick1 = (e) => {
		console.log(e)
	}
	// 选择时间
	const timeTan = (e) => {
		console.log(e)
		if (e == 1) {
			timeshow1.value = true
		} else {
			timeshow2.value = true
		}
	}
	const confirm1 = (e) => {
		startTime.value = formatTimestamp(e.value)
		timeshow1.value = false;
	}
	const confirm2 = (e) => {
		endTime.value = formatTimestamp(e.value)
		timeshow2.value = false;
	}
	// 时间重置
	const chongzTime = () => {
		startTime.value = "开始时间"
		endTime.value = "结束时间"
		workValue0.length = 0;
		workValue.length = 0;
		workValue2.length = 0;
	}
	// 时间确定
	const SubmitTime = () => {
		uDropdownRef.value.close()
		workValue0.length = 0;
		workValue.length = 0;
		workValue2.length = 0;
		startTime.value = "开始时间";
		endTime.value = "结束时间";

	}
	// 转换时间戳
	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
</script>

<style setup lang="scss">
	page {
		background: #F6F8FA;
	}

	::v-deep .u-dropdown-item {
		background: #fff;
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

	.slot-content {
		background: #fff;

		.timeView {
			padding: 18rpx 85rpx;
			background: #F5F7FB;
			font-size: 24rpx;
			color: #5A78A0;
			border-radius: 34rpx;
		}

		.timeBtn {
			font-size: 28rpx;
			color: #3C82FE;
			padding: 24rpx 120rpx;
			background: #F6F8FC;
			border-radius: 49rpx;
		}

		.timeBtn2 {
			font-size: 28rpx;
			color: #fff;
			padding: 24rpx 120rpx;
			background: #3C82FE;
			border-radius: 49rpx;
		}

		.typeTitle {
			font-size: 30rpx;
			color: #092D5C;

			.ttleft {
				width: 12rpx;
				height: 12rpx;
				background: linear-gradient(53deg, #FFC46F 0%, #FEAC49 100%);
				box-shadow: 0rpx 2rpx 6rpx 0rpx #FEAC49;
			}

			.ttleft1 {
				width: 12rpx;
				height: 12rpx;
				background: linear-gradient(53deg, #6FB8FF 0%, #3C82FE 100%);
				box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(60, 130, 254, 0.3);
			}
		}

	}

	.taskbox {
		padding: 30rpx;
	}

	.taskItem {
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 26rpx 1rpx rgba(138, 139, 143, 0.16);
		border-radius: 10rpx;
		padding: 30rpx;

		.titemTop {
			border-bottom: 1rpx solid #F5F5F5;

			.ttleft {
				font-size: 26rpx;
				color: #B7C4D7;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				}
			}

			.ttright {
				font-size: 26rpx;
				color: #3C82FE;
			}
		}

		.task-title {
			font-size: 36rpx;
			color: #092D5C;
		}

		.tasktext {
			font-size: 26rpx;
			color: #5A78A0;
			line-height: 50rpx;
		}
	}
</style>