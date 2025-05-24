<template>
	<view>
		<up-navbar title="履约保证金" :placeholder="true" :autoBack="true" />
		<up-tabs :scrollable="false" :current="tabIndex" :list="list" @click="tabclick"
			itemStyle="padding:0 50rpx; height: 34rpx; margin:30rpx 0;" inactiveStyle="font-size: 28rpx;color: #B7C4D7;"
			activeStyle="color: #092D5C;font-size:30rpx"></up-tabs>
		<view class="content" v-if="tabIndex == 0">
			<view class="xtitle bold">
				申请信息
			</view>
			<view class="card">
				<up-cell-group :border="false">
					<up-cell title="申请部门" @click="departshow = true" :value="formData.entDeptName" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="履约金流程" @click="processshow = true" :value="formData.processName" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<!-- <up-cell title="审批人" :value="formData.approver" :isLink="false" arrow-direction="right" :required="false"></up-cell> -->
					<up-cell title="到期时间" @click="timeshow = true" :value="formData.expirationDate" :isLink="true" arrow-direction="right" :required="false"></up-cell>
				</up-cell-group>

			<!-- 申请部门选择 -->
					<up-picker :show="departshow" keyName="name" :columns="departList" @cancel="departshow = false" @confirm="departConfirm"></up-picker>
				<!-- 履约金流程选择 -->
					<up-picker :show="processshow" keyName="processName" :columns="processList" @cancel="processshow = false" @confirm="processConfirm"></up-picker>
					<!-- 到期时间选择 -->
					<up-datetime-picker :show="timeshow" :minDate="1587524800000" v-model="selectTime" mode="date" @cancel="timeshow = false" @confirm="timeConfirm"></up-datetime-picker>
				<!-- 					<view class="textClass up-m-t-20">
						<textarea type="textarea" placeholder="请输入备注" border="surround" v-model="textValue"></textarea>
					</view> -->
			</view>
			<view class="xtitle bold">
				合同信息
			</view>
			<view class="card">
				<up-cell-group :border="false">
					<up-cell title="合同编号" @click="contractshow = true" :value="formData.code" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="产品" @click="contractProductshow = true" :value="formData.projServerName" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="客户单位名称" :required="false" :isLink="false">
						<template #value>
							<input v-model="formData.csrCustomerName" placeholder="请输入事项名称" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell> <up-cell title="客户单位税号" :required="false" :isLink="false">
						<template #value>
							<input v-model="formData.csrCustomerCode" placeholder="请输入事项名称" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="合同总金额" :value="formData.allPrice" :isLink="false" arrow-direction="right" :required="false"></up-cell>
					<up-cell title="合同履约金额" :value="formData.invoicePrice" :isLink="false" arrow-direction="right" :required="false"></up-cell>
					<up-cell title="已支付履约金" :value="formData.putPrice" :isLink="false" arrow-direction="right" :required="false"></up-cell>
					<up-cell title="待审批金额" :value="formData.waitApproveAmount" :isLink="false" arrow-direction="right" :required="false"></up-cell>
				</up-cell-group>
				<!-- 履约金合同选择 -->
					<up-picker :show="contractshow" keyName="code" :columns="contractList" @cancel="contractshow = false" @confirm="contractConfirm"></up-picker>
				<!-- 合同下产品服务选择 -->
					<up-picker :show="contractProductshow" keyName="label" :columns="contractProductList" @cancel="contractProductshow = false" @confirm="contractProductConfirm"></up-picker>
			</view>
			<view class="xtitle bold">
				履约金信息
			</view>
			<view class="card">
				<up-cell-group :border="false">
					<up-cell title="履约金类型" @click="lxshow = true" :value="formData.inTypeName" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<up-cell title="申请金额" :required="true" :isLink="false">
						<template #value>
							<input v-model="formData.recPrice" placeholder="请输入事项名称" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell>
					<up-cell title="支付/退回单位" :value="formData.gsName" :required="true" :isLink="true" @click="zhanghushow = true" arrow-direction="right">
					</up-cell>
				</up-cell-group>
				<!-- 履约金类型选择 -->
					<up-picker :show="lxshow" keyName="dictLabel" :columns="lxList" @cancel="lxshow = false" @confirm="qeudlx"></up-picker>
				<!-- 支付/退回单位选择 -->
					<up-picker :show="zhanghushow" keyName="name" :columns="invoiceCompanyList" @cancel="zhanghushow = false" @confirm="invoiceCompanyConfirm"></up-picker>
				<view class="textClass up-m-t-20">
					<textarea type="textarea"  placeholder="支付明细" border="surround" class="textarea_remarks" v-model="formData.remarks"></textarea>
				</view>
			</view>
			<view class="qued up-m-t-70" @click="submitClick">提交</view>

		</view>
		<view class="content1" v-if="tabIndex == 1">
			<view class="up-p-t-20" style="background:#ffffff;">
				<up-search class="up-m-b-20" placeholder="请输入查找内容" v-model="searchData.search" :showAction="false" bgColor="#F6F8FC"
					height="40" @search="SubmitTime"></up-search>
				<view class="u-flex filter u-col-center u-row-around">
					<!-- 时间 -->
					<up-dropdown ref="uDropdownRef" border-radius="20">
						<up-dropdown-item title="时间">
							<view class="slot-content">
								<view class="slotCon up-flex up-text-center up-content-color u-row-around up-p-t-40 up-p-b-40">
									<view class="timeView" @click="timeTan(1)">{{searchData.startDate || '开始时间'}}</view>
									<view class="timeView" @click="timeTan(2)">{{searchData.endDate || '结束时间'}}</view>
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
										<view class="ttright">状态</view>
									</view>
									<hy-btn-group class="up-m-t-30 up-m-l-20" :list="statusList" v-model="searchData.useStatusList"
										@itemClick="itemClick1" :multiple="false"
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

				<up-list
				class="taskbox"
			@scrolltolower="scrolltolower"
		>
			<up-list-item
				v-for="(item, index) in indexList"
				:key="index"
				class="taskItem"
				@click="goPerformanceDetail(item)"
			>
				<view class="titemTop u-flex u-row-between up-p-b-15">
						<view class="ttleft u-flex u-col-center">
							<image src="/static/work/time.png"></image>
							<view>{{item.createInDate || '--'}}</view>
						</view>
						<view class="ttright">{{getLabelByValue(item.useStatus) || '--'}}</view>
						<!-- 	<view class="ttright" style="color:#FE4949">待确认</view>
						<view class="ttright" style="color:#1CAA42">待确认</view>
						<view class="ttright" style="color:#092D5C">已作废</view> -->
					</view>
					<view class="task-title up-m-t-20 bold">
						履约金额：{{item.recPrice || '--'}} 元
						<text style="font-size:26rpx;color:#FE4949;">（已支付）</text>
						<!-- <text style="font-size:26rpx;color:#1CAA42;">（已退回）</text> -->
					</view>
					<view class="tasktext up-m-b-10" style="color:#3C82FE">{{item.sysNo || ''}}</view>
					<view class="tasktext">企业名称：{{item.csrCustomerName || '--'}}</view>
					<view class="tasktext">税号：{{item.csrCustomerCode || '--'}}</view>
					<view class="tasktext">到期时间：{{item.expirationDate || '--'}}<text style="font-size:26rpx;color:#FE4949;">（距离到期 {{item.expirationDate || '--'}}天）</text></view>
					<view class="tasktext">负责人：{{item.inUserName || '--'}}</view>
					<view class="tasktext">产品：{{item.projServerName || '--'}}</view>
					
					<!-- <view class="tasktext">打款金额：<text style="color:red">28930.00</text></view> -->
			</up-list-item>
		</up-list>
		</view>
		<!-- 选择时间 -->
		<up-datetime-picker :minDate="1735660800000" :hasInput="false" class="timeView" hasInput :show="timeshow1"
			v-model="startTime" mode="date" placeholder="开始时间" @confirm="confirm1"
			@cancel="timeshow1 = false"></up-datetime-picker>
		<up-datetime-picker :minDate="minEndDate" :hasInput="false" class="timeView" hasInput :show="timeshow2"
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
		API_getStartProcessList,
		API_getUnionContractList,
		API_finApiPerformanceAdd,
		API_finApiPerformanceList,
		API_getContractProductList,
		API_finApiInvoiceCompanyList,
		API_finApiPerformanceContractList,
		API_finApiPerformanceContractDetail
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
	const store = useCounterStore();

	const formData = ref({
		entDeptName: '',
		entDeptSysNo: '',
		processName: '',
		workFlowSysNo: '',
		contractName: '',
		contractSysNo: '',
		projContractSysNo: '', //合同流水号
		recPrice: '', //履约金额
		inType: '', //履约金类型
		remarks: '', //备注
		code: '', //合同编码
		allPrice: '', //合同总金额
		putPrice: '', //已支付履约金
		csrCustomerName: '', //客户单位名称
		csrCustomerCode: '', //客户单位税号
	})

	const searchData = ref({
		search: '',
		startDate: '',
		endDate: '',
		useStatusList: '',
		type: 1
	})
	// 部门列表

	const departList = ref([])
	const departshow = ref(false)	

	const processList = ref([])	
	const processshow = ref(false)

	// 履约金合同列表
	const contractList = ref([])
	const contractshow = ref(false)

	// 合同下产品服务列表
	const contractProductList = ref([])
	const contractProductshow = ref(false)

	// 开票公司列表
	const invoiceCompanyList = ref([])
	const zhanghushow = ref(false)
	// 履约金列表
	const performanceList = ref([])
	const indexList = ref([])
	// 履约金类型列表
	const lxList = ref([])
	const lxshow = ref(false)
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
	const minEndDate = ref(Date.now())
	formData.value.expirationDate = formatTimestamp(selectTime.value)
onMounted(() => {
	getDepartList()
	getProcessList()
	getContractList()
	getLxType()
	getPayUnit()
})
	// 获取履约金列表
	function getPerformanceList() {
		let params = {
			search: searchData.value.search || null,
			startDate: searchData.value.startDate || null,
			endDate: searchData.value.endDate || null,
			useStatusList: searchData.value.useStatusList || null,
			type: 1
		}
		indexList.value = []
		API_finApiPerformanceList(params).then(res => {
			console.log(res,'履约金列表')
			if(res.code == 200) {
				let result = res.data
				performanceList.value[0] = result
				indexList.value = result.slice(0, 10)
				console.log(performanceList.value)
			}
		})
	}
	function goPerformanceDetail(item) {
		uni.navigateTo({
			url: `/pages/work/performance/perforDetile?sysNo=${item.sysNo}`
		})
	}
	// 获取部门列表
	function getDepartList() {
		console.log(store.userInfo,'userinfo')
		let result = store.userInfo?.deptList
		departList.value[0] = result
		console.log(departList.value)
	}
		// 获取履约金流程列表
	function getProcessList() {
		API_getStartProcessList({
			category: 'performanceFee'
		}).then(res => {
			if(res.code == 200) {
				let result = res.data
				processList.value[0] = result
				console.log(processList.value)
			}
		})
	}
	// 获取履约金合同列表
	function getContractList() {
		API_finApiPerformanceContractList().then(res => {
			console.log(res,'履约金合同列表')
			if(res.code == 200) {
				let result = res.data
				contractList.value[0] = result
				console.log(contractList.value)
			}
		})
	}
	// 获取合同下产品服务列表
	function getContractProductList(sysNo) {
		API_finApiPerformanceContractDetail(sysNo).then(res => {
			console.log(res,'合同详情')
			if(res.code == 200) {
				let result = res.data
				formData.value.csrCustomerName = result.csrName //客户单位名称
				formData.value.csrCustomerCode = result.csrTaxNo //税号
				formData.value.allPrice = result.contractAmount //总金额
				formData.value.putPrice = result.paidPerformAmount //已付款
				formData.value.invoicePrice = result.performAmount //已开票
				formData.value.waitApproveAmount = result.waitApproveAmount //已开票

				contractProductList.value[0] = result.contractServerList
				// console.log(contractProductList.value)
			}
		})
	}
	// 获取支付单位
	function getPayUnit() {
		API_finApiInvoiceCompanyList().then(res => {
			console.log(res,'开票公司')
			if(res.code == 200) {
				let result = res.data
				invoiceCompanyList.value[0] = result
				console.log(invoiceCompanyList.value)
			}
		})
	}
		// 获取履约金类型
	function getLxType() {
		API_getDictType({dictType: 'performance_type'}).then(res => {
			console.log(res,'履约金类型')
			if(res.code == 200) {
				let result = res.data
				lxList.value[0] = result
				console.log(lxList.value)
			}
		})
	}
		// 报销流程选择
	const processConfirm = (e) => {
		console.log(e)
		formData.value.processName = e.value[0].processName
		formData.value.workFlowSysNo = e.value[0].definitionId
		processshow.value = false
	}
	// 申请部门选择
	const departConfirm = (e) => {
		console.log(e)
		formData.value.entDeptName = e.value[0].name
		formData.value.entDeptSysNo = e.value[0].sysNo
		departshow.value = false
	}
	// 履约金合同选择
	const contractConfirm = (e) => {
		console.log(e,'履约金合同选择')
		formData.value.code = e.value[0].code //合同编码
		// formData.value.allPrice = e.value[0].allPrice //合同总金额
		// formData.value.putPrice = e.value[0].putPrice //已支付履约金
		// formData.value.projContract = {
		// 	...e.value[0]
		// }
		contractshow.value = false
		formData.value.projContractSysNo = e.value[0].sysNo
		getContractProductList(e.value[0].sysNo)
	}
	// 合同下产品服务选择
	const contractProductConfirm = (e) => {
		console.log(e,'合同下产品服务选择')
		formData.value.projServerName = e.value[0].label
		formData.value.projServerSysNo = e.value[0].value
		contractProductshow.value = false
	}
	// 选择开票公司
	const invoiceCompanyConfirm = (e) => {
		console.log(e)
		formData.value.gsName = e.value[0].name
		zhanghushow.value = false
	}
	// 履约金类型选择
	const qeudlx = (e) => {
		console.log(e)
		formData.value.inType = e.value[0].dictValue
		formData.value.inTypeName = e.value[0].dictLabel
		lxshow.value = false
	}
	function submitClick() {
		console.log(formData.value)
		if(verifyForm()) {
			uni.showLoading({
				title: '提交中...',
				mask: true
			})
			try {
				API_finApiPerformanceAdd(formData.value).then(res => {
					console.log(res)
					if(res.code == 200) {
					uni.showToast({
						title: '提交成功',
						icon: 'success'
					})
					uni.hideLoading()
					tabIndex.value = 1;
					getPerformanceList()
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
	
		if(formData.value.workFlowSysNo == '') {
			uni.showToast({
				title: '请选择履约金流程',
				icon: 'none'
			})
			return false
		}
		if(formData.value.code == '') {
			uni.showToast({
				title: '请选择合同',
				icon: 'none'
			})
			return false
		}
		if(formData.value.projServerSysNo == '') {
			uni.showToast({
				title: '请选择产品',
				icon: 'none'
			})
			return false
		}
		if(formData.value.inType == '') {
			uni.showToast({
				title: '请选择履约金类型',
				icon: 'none'
			})
			return false
		}
		if(formData.value.recPrice == '') {
			uni.showToast({
				title: '请输入申请金额',
				icon: 'none'
			})
		}
		if(formData.value.gsName == '') {
			uni.showToast({
				title: '请输入支付/退回单位',
				icon: 'none'
			})
			return false
		}
		return true
	}	
	function resetFormData() {
		formData.value = {
			entDeptName: '',
		entDeptSysNo: '',
		processName: '',
		workFlowSysNo: '',
		contractName: '',
		contractSysNo: '',
		projContractSysNo: '', //合同流水号
		recPrice: '', //履约金额
		inType: '', //履约金类型
		remarks: '', //备注
		code: '', //合同编码
		allPrice: '', //合同总金额
		putPrice: '', //已支付履约金
		csrCustomerName: '', //客户单位名称
		csrCustomerCode: '', //客户单位税号
		}
	}
	// 时间确定
	const timeConfirm = (e) => {
		formData.value.expirationDate = formatTimestamp(e.value)
		timeshow.value = false;
	}
	const scrolltolower = () => {
  loadmore();
};

const loadmore = () => {
 let start = indexList.value.length
	if(start >= performanceList.value.length) {
		return
	}
  let newList = performanceList.value.slice(start, start + 10)
  indexList.value = [...indexList.value, ...newList]
};
	// 选择类型Z 
	const itemClick = (e) => {
		console.log(e)
	}
	// tab切换
	const tabclick = (e) => {
		console.log(e)
		tabIndex.value = e.index
		if(tabIndex.value == 1) {
			getPerformanceList()
		}
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
		searchData.value.startDate = formatTimestamp(e.value)
		minEndDate.value = e.value
		timeshow1.value = false;
	}
	const confirm2 = (e) => {
		searchData.value.endDate = formatTimestamp(e.value)
		timeshow2.value = false;
	}
	// 时间重置
	const chongzTime = () => {
		searchData.value.startDate = ''
		searchData.value.endDate = ''
		searchData.value.useStatusList = ''
		uDropdownRef.value.close()
		getPerformanceList()
	}
	// 时间确定
	const SubmitTime = () => {
		uDropdownRef.value.close()
		getPerformanceList()
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
			.textarea_remarks {
				height: 160rpx;
			}
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
			height: 60rpx;
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