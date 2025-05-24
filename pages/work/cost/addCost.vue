<template>
	<view>
		<up-navbar title="成本支出" :placeholder="true" :autoBack="true" />
		<up-tabs :scrollable="false" :list="list" @click="tabclick"
			itemStyle="padding:0 50rpx; height: 34rpx; margin:30rpx 0;" inactiveStyle="font-size: 28rpx;color: #B7C4D7;"
			activeStyle="color: #092D5C;font-size:30rpx"></up-tabs>
		<view class="content" v-if="tabIndex == 0">
			<view class="xtitle bold">
				申请信息
			</view>
			<view class="card">
				<up-cell-group :border="false">
					<up-cell title="申请部门" @click="departshow = true" :value="formData.entDeptName" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="成本流程" @click="processshow = true" :value="formData.processName" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<!-- <up-cell title="审批人" value="审批人" :isLink="false" arrow-direction="right" :required="false"></up-cell> -->
					<up-cell title="日期" @click="timeshow = true" :value="formData.createDate" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="合同编号" @click="openContract" :value="formData.code" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="客户名称" :value="formData.csrCustomerName" :isLink="false" arrow-direction="right" :required="false"></up-cell>
					<up-cell title="合同金额" :isLink="false" arrow-direction="right" :required="false">
						<template #right-icon>
							<view style="color:#FE4949">{{formData.allPrice}}</view>
						</template>
					</up-cell> <up-cell title="回款金额" :isLink="false" arrow-direction="right" :required="false">
						<template #right-icon>
							<view style="color:#FE4949">{{formData.invoicePrice}}</view>
						</template>
					</up-cell> <up-cell title="付款金额" :isLink="false" arrow-direction="right" :required="false">
						<template #right-icon>
							<view style="color:#FE4949">{{formData.putPrice}}</view>
						</template>
					</up-cell> <up-cell title="已申请金额" :isLink="false" arrow-direction="right" :required="false">
						<template #right-icon>
							<view style="color:#FE4949">{{formData.waitApproveAmount}}</view>
						</template>
					</up-cell>
				</up-cell-group>
					<!-- 申请部门选择 -->
					<up-picker :show="departshow" keyName="name" :columns="departList" @cancel="departshow = false" @confirm="departConfirm"></up-picker>
					<!-- 成本流程选择 -->
					<up-picker :show="processshow" keyName="processName" :columns="processList" @cancel="processshow = false" @confirm="processConfirm"></up-picker>
					<!-- 日期选择 -->
					<up-datetime-picker :minDate="1735660800000" :hasInput="false" class="timeView" hasInput :show="timeshow"
					v-model="selectTime" mode="date" placeholder="开始时间" @confirm="timeConfirm"
					@cancel="timeshow = false"></up-datetime-picker>
					<!-- 合同选择 -->
					<up-picker :show="contractshow" keyName="csrCustomerName" :columns="contractList" @cancel="contractshow = false" @confirm="contractConfirm"></up-picker>
				<view class="u-flex u-row-between u-col-center">
					<view class="xtitle bold">产品及付款信息</view>
				</view>
				<view class="card">
					<up-cell-group :border="false">
						<up-cell title="服务商" value="选择的服务商" :isLink="true" arrow-direction="right" :required="true"></up-cell>
						<up-cell title="产品" value="选择的产品" :isLink="true" arrow-direction="right" :required="false"></up-cell>
						<up-cell title="产品金额" :isLink="false" arrow-direction="right" :required="false">
							<template #right-icon>
								<view style="color:#FE4949">1000</view>
							</template>
						</up-cell> <up-cell title="已付款金额" :isLink="false" arrow-direction="right" :required="false">
							<template #right-icon>
								<view style="color:#FE4949">1000</view>
							</template>
						</up-cell>
						<up-cell title="已申请金额" :isLink="false" arrow-direction="right" :required="false">
							<template #right-icon>
								<view style="color:#FE4949">1000</view>
							</template>
						</up-cell>
						<up-cell title="需支付金额" :isLink="false" :required="true">
							<template #value>
								<input v-model="name" placeholder="请输入" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell>
						<view class="textClass up-m-t-20">
							<textarea type="textarea" placeholder="支付明细" border="surround" v-model="textValue"></textarea>
						</view>

						<up-cell title="收款单位名称" :isLink="false" :required="true">
							<template #value>
								<input v-model="name" placeholder="请输入" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell> <up-cell title="开户行" :isLink="false" :required="true">
							<template #value>
								<input v-model="name" placeholder="请输入" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell><up-cell title="收款单位账号" :isLink="false" :required="true">
							<template #value>
								<input v-model="name" placeholder="请输入" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell> <up-cell title="支付单位" :isLink="false" :required="true">
							<template #value>
								<input v-model="name" placeholder="请输入" type="text"
									style="text-align:right;color:#092D5C;font-size:26rpx;">
							</template>
						</up-cell>
						<view class="attachmentTitle u-flex up-m-t-30 u-row-between ">
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
						</view>
					</up-cell-group>
				</view>


			</view>
			<view class="qued up-m-t-70">提交</view>

		</view>
		<view class="content1" v-if="tabIndex == 1">
			<view class="up-p-t-20" style="background:#ffffff;">
				<up-search class="up-m-b-20" placeholder="请输入查找内容" v-model="keyword" :showAction="false" bgColor="#F6F8FC"
					height="40"></up-search>
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
				<view class="taskItem">
					<view class="titemTop u-flex u-row-between up-p-b-15">
						<view class="ttleft u-flex u-col-center">
							<image src="/static/work/time.png"></image>
							<view>2023.03.05 16:00</view>
						</view>
						<view class="ttright">待确认</view>
						<!-- 	<view class="ttright" style="color:#FE4949">待确认</view>
						<view class="ttright" style="color:#1CAA42">待确认</view>
						<view class="ttright" style="color:#092D5C">已作废</view> -->
					</view>
					<view class="task-title up-m-t-20 bold">
						嘉兴星程电子有限公司
					</view>
					<view class="tasktext up-m-b-10" style="color:#3C82FE">TU-UI69-7329589 </view>
					<view class="tasktext">日期：2025.4.28</view>
					<view class="tasktext">合同金额：<text style="color:red">28930.00</text></view>
					<view class="tasktext">部门：数字中心</view>
					<view class="tasktext">负责人：负责人</view>
					<view class="tasktext">需支付金额：<text style="color:red">28930.00</text></view>
					<view class="tasktext">产品：<text style="color:#3C82FE">IS9001</text></view>
				</view>
			</view>


		</view>
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
		ref,
		reactive,
		onMounted
	} from 'vue';
import {
	API_finApiPerformanceList,
	API_getUnionContractList,
	API_getStartProcessList,
		API_finApiReceivepayAdd,
		API_finApiReceivepayList
	} from '@/api/task.js'
	import {
		useCounterStore
	} from '/store/counter';
	import {
		API_getDictType
	} from '/api/client.js'
import {
		formatTimestamp
	} from '/util/formatTimestamp.js'
	import { getLabelByValue, statusList } from '@/util/dict.js'
	import { onShow } from '@dcloudio/uni-app'
	const store = useCounterStore();

	const formData = ref({
		entDeptName: '',
		entDeptSysNo: '',
		contractName: '',
		contractSysNo: '',
		projContractSysNo: '', //合同流水号
		code: '', //合同编码
		recPrice: '', //收款金额
		type: '', //收款类型
		account: '', //收款账户
		accountSysNo: '', //收款账户流水号
		remarks: '', //备注
	})
	// 部门列表

	const departList = ref([])
	const departshow = ref(false)	

	const processList = ref([])	
	const processshow = ref(false)

	// 收款合同列表
	const contractList = ref([])
	const contractshow = ref(false)

	// 收款类型列表
	const lxList = ref([])
	const lxshow = ref(false)
	// 收款账户列表
	const zhanghuList = ref([])
	const zhanghushow = ref(false)
	// 履约金列表
	const performanceList = ref([])

	const columns = reactive([
		['油卡', '办公用品']
	]);
	const lxValue = ref("")
	const tabIndex = ref(0)
	const keyword = ref("")
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
	const startTime = ref(Date.now())
	const endTime = ref(Date.now())
	const timeshow1 = ref(false);
	const timeshow2 = ref(false);
		const timeshow = ref(false);
	const selectTime = ref(Date.now())
	formData.value.createDate = formatTimestamp(selectTime.value)
onMounted(() => {
	getDepartList()
	getContractList()
	getProcessList()
	getLxType()
})
function goToContract() {
		uni.navigateTo({
			url: '/pages/work/contract/OptionContract?sourcePage=addCost',
		})
	}
	onShow(() => {
		let contractSysNo = uni.getStorageSync('contractSysNo')
		if (contractSysNo) {
			console.log(contractSysNo)
			formData.value.projContractSysNo = contractSysNo
			contractDetile(contractSysNo)
			// contractData.value = JSON.parse(e.item)
		}			
	})
	function goCostDetail(item) {
		uni.navigateTo({
			url: `/pages/work/cost/costDetile?sysNo=${item.sysNo}`
		})
	}
			// 合同详情
	const contractDetile = (sysNo) => {
		API_contracthDetail({
			sysNo: sysNo
		}).then(res => {
			contractData.value = res.data
			console.log(contractData.value,'详情数据')
			formData.value.projContractSysNo = res.data.sysNo || '' //合同流水号
			formData.value.code = res.data.code || '' //合同编码
			formData.value.csrCustomerName = res.data.csrCustomerName || '' //客户名称
			formData.value.csrCustomerCode = res.data.csrCustomerCode || '' //客户税号
			formData.value.allPrice = res.data.allPrice || '' //合同总金额
			formData.value.putPrice = res.data.putPrice || '' //已支付履约金
			formData.value.rPrice = res.data.assPrice || '' //考核金额
			formData.value.waitApproveAmount = res.data.waitApproveAmount || '' //待确认金额
			proServerList.value[0] = contractData.value.projContractServer || [] //产品服务
		})
	}
	// 获取履约金列表
	function getPerformanceList() {
		API_finApiPerformanceList().then(res => {
			console.log(res,'履约金列表')
			if(res.code == 200) {
				let result = res.data
				performanceList.value[0] = result
				console.log(performanceList.value)
			}
		})
	}
	// 获取部门列表
	function getDepartList() {
		console.log(store.userInfo,'userinfo')
		let result = store.userInfo?.deptList
		departList.value[0] = result
		console.log(departList.value)
	}
		// 获取成本流程列表
	function getProcessList() {
		API_getStartProcessList({
			category: 'costPayment'
		}).then(res => {
			if(res.code == 200) {
				let result = res.data
				processList.value[0] = result
				console.log(processList.value)
			}
		})
	}
	// 获取收款合同列表
	function getContractList() {
		API_getUnionContractList().then(res => {
			console.log(res,'收款合同列表')
			if(res.code == 200) {
				let result = res.data
				contractList.value[0] = result
				console.log(contractList.value)
			}
		})
	}
		// 获取收款类型
	function getLxType() {
		API_getDictType({dictType: 'receivepay_type'}).then(res => {
			console.log(res,'收款类型')
			if(res.code == 200) {
				let result = res.data
				lxList.value[0] = result
				console.log(lxList.value)
			}
		})
	}

	// 申请部门选择
	const departConfirm = (e) => {
		console.log(e)
		formData.value.entDeptName = e.value[0].name
		formData.value.entDeptSysNo = e.value[0].sysNo
		departshow.value = false
	}
	// 合同选择
	const contractConfirm = (e) => {
		console.log(e)
		formData.value.contractName = e.value[0].csrCustomerName
		formData.value.contractSysNo = e.value[0].sysNo
		formData.value.allPrice = e.value[0].allPrice
		formData.value.invoicePrice = e.value[0].invoicePrice
		formData.value.putPrice = e.value[0].putPrice
		contractshow.value = false
	}
	// 收款类型选择
	const qeudlx = (e) => {
		console.log(e)
		lxValue.value = e.value[0]
		lxshow.value = false
	}
	// 成本流程选择
	const processConfirm = (e) => {
		console.log(e)
		formData.value.processName = e.value[0].processName
		formData.value.workFlowSysNo = e.value[0].definitionId
		processshow.value = false
	}
	function submitClick() {
		console.log(formData.value)
		if(verifyForm()) {
			uni.showLoading({
				title: '提交中...',
				mask: true
			})
			try {
				API_finApiReceivepayAdd(formData.value).then(res => {
					console.log(res)
					if(res.code == 200) {
					uni.showToast({
						title: '提交成功',
						icon: 'success'
					})
					uni.hideLoading()
				}
			}).catch(err => {
				uni.hideLoading()
				uni.showToast({
					title: err.message || '提交失败',
						icon: 'none'
					})
				})
			} catch (err) {
				uni.hideLoading()
				uni.showToast({
					title: err.message || '提交失败',
					icon: 'none'
				})
			}
		}
	}
	function verifyForm() {
		if(formData.value.entDeptSysNo == '') {
			uni.showToast({
				title: '请选择部门',
				icon: 'none'
			})
			return false
		}
	
		if(formData.value.projContractSysNo == '') {
			uni.showToast({
				title: '请选择合同',
				icon: 'none'
			})
			return false
		}
		if(formData.value.recPrice == '') {
			uni.showToast({
				title: '请选择产品',
				icon: 'none'
			})
			return false
		}
		if(formData.value.inType == '') {
			uni.showToast({
				title: '请输入本次收款金额',
				icon: 'none'
			})
			return false
		}
		if(formData.value.applyAmount == '') {
			uni.showToast({
				title: '请选择收款类型',
				icon: 'none'
			})
		}
		if(formData.value.payUnit == '') {
			uni.showToast({
				title: '请选择收款账户',
				icon: 'none'
			})
			return false
		}
		if(formData.value.remarks == '') {
			uni.showToast({
				title: '请输入备注',
				icon: 'none'
			})
			return false
		}
		return true
	}	
	// 时间确定
	const timeConfirm = (e) => {
		formData.value.createDate = formatTimestamp(e.value)
		timeshow.value = false;
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