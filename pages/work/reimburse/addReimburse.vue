<template>
	<view>
		<up-navbar title="日常报销" :placeholder="true" :autoBack="true" />
		<up-tabs :scrollable="false" :current="tabIndex" :list="list" @click="tabclick"
			itemStyle="padding:0 50rpx; height: 34rpx; margin:30rpx 0;" inactiveStyle="font-size: 28rpx;color: #B7C4D7;"
			activeStyle="color: #092D5C;font-size:30rpx"></up-tabs>
		<view class="content" v-if="tabIndex == 0">
			<view class="xtitle bold">
				申请信息
			</view>
			<view class="card">
				<up-cell-group :border="false">
					<up-cell title="申请部门" @click="departshow = true" :value="formData.entDeptName" :isLink="true" arrow-direction="right" :required="false"></up-cell>
					<up-cell title="报销流程" @click="processshow = true" :value="formData.processName" :isLink="true" arrow-direction="right" :required="true"></up-cell>
					<!-- <up-cell title="办理人" :value="formData.user" :isLink="false" arrow-direction="right" :required="false"></up-cell> -->
					<up-cell @click="lxshow = true" title="报销类型" :value="formData.finReimbursementTypeName" :isLink="true" arrow-direction="right"
						:required="true"></up-cell>
					<!-- 申请部门选择 -->
					<up-picker :show="departshow" keyName="name" :columns="departList" @cancel="departshow = false" @confirm="departConfirm"></up-picker>
					<!-- 报销类型选择 -->
					<up-picker :show="lxshow" keyName="name" :columns="columns" @cancel="lxshow = false" @confirm="qeudlx"></up-picker>
					<!-- 报销流程选择 -->
					<up-picker :show="processshow" keyName="processName" :columns="processList" @cancel="processshow = false" @confirm="processConfirm"></up-picker>
					<up-cell v-if="formData.finReimbursementTypeName == '油卡'" @click="ykshow = true" title="选择油卡" :value="formData.createUserName" :isLink="true" arrow-direction="right"
						:required="true"></up-cell>
					<up-cell title="借支单" :value="formData.borrowingName" :isLink="true" arrow-direction="right" :required="false"></up-cell>
					<up-picker :show="borrowingshow" keyName="name" :columns="borrowingList" @cancel="borrowingshow = false" @confirm="borrowingConfirm"></up-picker>
					<up-picker :show="ykshow" keyName="createUserName" :columns="ykList" @cancel="ykshow = false" @confirm="ykConfirm"></up-picker>
					<!-- 	<up-cell title="事项名称" isLink :required="true">
						<template #value>
							<input v-model="name" placeholder="请输入事项名称" type="text"
								style="text-align:right;color:#092D5C;font-size:26rpx;">
						</template>
					</up-cell> -->
				</up-cell-group>
				<view class="u-flex u-row-between u-col-center">
					<view class="xtitle bold">发票列表</view>
					<view class="u-flex u-col-center">
						<view class="up-m-r-10" style="font-size: 26rpx;color: #B7C4D7;">添加发票</view>
						<up-icon name="plus-circle" size="20px" color="#5A78A0" @click="addInvoice"></up-icon>
					</view>
				</view>
				<view class="card" v-if="formData.finTranslateSubs.length > 0">
					<up-cell-group :border="false" v-for="(item,index) in formData.finTranslateSubs" :key="index">
						<up-cell title="发票类型" @click="openInvoiceType(item,index)" :value="item.invoiceTypeName" :isLink="true" arrow-direction="right" :required="true"></up-cell>
						<up-cell title="发票号码" :value="item.num" :isLink="false" arrow-direction="right" :required="true">
							<template #value>
								<up-input v-model="item.num" class="input-num" placeholder="请输入发票号码" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;"></up-input>
							</template>
						</up-cell>
						<view class="attachmentTitle u-flex up-m-t-30 u-row-between ">
							<view class="attLeft">
								发票图片：<text style="color: #B7C4D7;">请添加图片或文件</text>
							</view>
							<up-icon name="plus-circle" size="22px" color="#5A78A0" @click="addInvoiceImage(item,index)"></up-icon>
						</view>
						<view class="u-flex up-m-t-30 u-row-between " v-if="item.imageUrl">
							<view class="updataLeft u-flex u-col-center">
								<image :src="item.imageUrl"></image>
								<view class="up-m-l-10 name">{{item.imageName}}</view>
							</view>
							<up-icon name="close-circle-fill" size="22px" color="#B7C4D7" @click="deleteInvoiceImage(item,index)"></up-icon>
						</view>
					</up-cell-group>
					<!-- 发票类型选择 -->
					<up-picker :show="invoicetypeshow" keyName="dictLabel" :columns="invoiceTypeList" @cancel="invoicetypeshow = false" @confirm="invoiceTypeConfirm"></up-picker>
				</view>
				<view class="xtitle bold">
					报销信息
				</view>
				<view class="card">
					<up-cell-group :border="false">
						<up-cell title="是否预算内" @click="intypeshow = true" :value="formData.inTypeName" :isLink="true" arrow-direction="right" :required="false"></up-cell>
						<up-cell title="报销公司" @click="invoiceCompanyshow = true" :value="formData.reimbursementCompany" :isLink="true" arrow-direction="right" :required="true"></up-cell>
						<up-cell title="收款人" :value="formData.ssName" :isLink="false" arrow-direction="right" :required="true">
							<template #value>
								<up-input v-model="formData.ssName" class="input-num" placeholder="请输入收款人" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;"></up-input>
							</template>
						</up-cell>
						<up-cell title="卡号" :value="formData.ssAccount" :isLink="false" arrow-direction="right" :required="true">
							<template #value>
								<up-input v-model="formData.ssAccount" @blur="bankCardCheck" class="input-num" placeholder="请输入卡号" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;"></up-input>
							</template>
						</up-cell>
						<up-cell title="开户行" :value="formData.ssType" :isLink="false" arrow-direction="right" :required="true">
							<template #value>
								<up-input v-model="formData.ssType" class="input-num" placeholder="请输入开户行" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;"></up-input>
							</template>
						</up-cell>
						
						<up-cell title="报销金额" :value="formData.reimbursementPrice" :isLink="false" arrow-direction="right" :required="true">
							<template #value>
								<up-input v-model="formData.reimbursementPrice" class="input-num" placeholder="请输入报销金额" type="text" style="text-align:right;color:#092D5C;font-size:26rpx;"></up-input>
							</template>
						</up-cell>
						<!-- 报销时间 -->
						<up-cell title="报销时间" :value="formData.time" @click="timeshow = true" :isLink="false" arrow-direction="right" :required="true">
						</up-cell>
					</up-cell-group>
					<!-- 是否预算内选择 -->
					<up-picker :show="intypeshow" keyName="dictLabel" :columns="inTypeList" @cancel="intypeshow = false" @confirm="inTypeConfirm"></up-picker>
					<!-- 报销公司选择 -->
					<up-picker :show="invoiceCompanyshow" keyName="name" :columns="invoiceCompanyList" @cancel="invoiceCompanyshow = false" @confirm="invoiceCompanyConfirm"></up-picker>
					<!-- 					<view class="textClass up-m-t-20">
						<textarea type="textarea" placeholder="请输入备注" border="surround" v-model="textValue"></textarea>
					</view> -->
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
					<textarea type="textarea" class="textarea_remarks" placeholder="请输入备注" border="surround" v-model="formData.remarks"></textarea>
				</view>
			</view>
			<view class="qued up-m-t-70" @click="submitClick">提交</view>

		</view>
		<view class="content1" v-if="tabIndex == 1">
			<view class="up-p-t-20" style="background:#ffffff;">
				<up-search class="up-m-b-20" placeholder="请输入查找内容" v-model="searchData.name" :showAction="false" bgColor="#F6F8FC"
					height="40" @search="SubmitTime"></up-search>
				<view class="u-flex filter u-col-center u-row-around">
					<!-- 时间 -->
					<up-dropdown ref="uDropdownRef" border-radius="20">
						<up-dropdown-item title="时间">
							<view class="slot-content">
								<view class="slotCon up-flex up-text-center up-content-color u-row-around up-p-t-40 up-p-b-40">
									<view class="timeView" @click="timeTan(1)">{{searchData.stTime || '开始时间'}}</view>
									<view class="timeView" @click="timeTan(2)">{{searchData.edTime || '结束时间'}}</view>
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
									<hy-btn-group class="up-m-t-30 up-m-l-20" :multiple="false" :list="statusList" v-model="searchData.status"
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
		</view>
			<up-list
				class="taskbox"
				:scrollTop="scrollTop"
			@scrolltolower="scrolltolower"
		>
			<up-list-item
				v-for="(item, index) in indexList"
				:key="index"
				class="taskItem"
				@click="goReimbursementDetail(item)"
			>
				<view class="titemTop u-flex u-row-between up-p-b-15">
						<view class="ttleft u-flex u-col-center">
							<image src="/static/work/time.png"></image>
							<view>{{item.time}}</view>
						</view>
						<view class="ttright">{{getLabel(item.useStatus,statusList,'value','label')}}</view>
						<!-- 	<view class="ttright" style="color:#FE4949">待确认</view>
						<view class="ttright" style="color:#1CAA42">待确认</view>
						<view class="ttright" style="color:#092D5C">已作废</view> -->
					</view>
					<view class="task-title up-m-t-20 bold">
						报销金额：{{item.reimbursementPrice}} 元
					</view>
					<view class="tasktext up-m-b-10" style="color:#B7C4D7">{{item.inUserName}}（{{item.entDeptName}}） </view>
					<view class="tasktext">是否预算内：{{getLabel(item.inType,inTypeList[0],'dictValue','dictLabel')}}</view>
					<view class="tasktext">打款金额：<text style="color:red">{{item.paymentPrice || '--' }}</text></view>
					<view class="tasktext">备注：{{item.remarks}}</view>
			</up-list-item>
		</up-list>
		<!-- 选择时间 -->
		<up-datetime-picker :show="timeshow" :minDate="1587524800000" v-model="selectTime" mode="date" @cancel="timeshow = false" @confirm="timeConfirm"></up-datetime-picker>
		<up-datetime-picker :show="timeshow1" :minDate="1587524800000" v-model="startTime" mode="date" @cancel="timeshow1 = false" @confirm="timeConfirm1"></up-datetime-picker>
		<up-datetime-picker :show="timeshow2" :minDate="minEndDate" v-model="endTime" mode="date" @cancel="timeshow2 = false" @confirm="timeConfirm2"></up-datetime-picker>
	</view>
</template>

<script setup>
	import {
		API_finApitranslateadd,
		API_getStartProcessList,
		API_finApitranslateType,
		API_finApitranslateList,
		API_finApiBorrowingList,
		API_finApiYkList,
		API_finApiInvoiceCompanyList
	} from '/api/task.js'
	import {
		userGetDepartList
	} from '/api/user.js'
	import {
		API_getDictType
	} from '/api/client.js'
	import {
		API_uploadImage
	} from '/api/home.js'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	import {
		formatTimestamp,
		formatTimestampToDate
	} from '/util/formatTimestamp.js'
	import {
		useCounterStore
	} from '/store/counter';
	import BIN from 'bankcardinfo'
	const statusList = reactive([{
		label: '待确认',
		value: 0
	}, {
		label: '已确认',
		value: 1
	}, {
		label: '已拒绝',
		value: 2
	}, {
		label: '已作废',
		value: -1
	}, {
		label: '流程中',
		value: 100
	}])
	const store = useCounterStore();

	const processList = ref([])	
	const processshow = ref(false)

	const departList = ref([])
	const departshow = ref(false)	

	const borrowingList = ref([])
	const borrowingshow = ref(false)

	const inTypeList = ref([])
	const intypeshow = ref(false)

	// 发票类型
	const invoiceTypeList = ref([])
	const invoicetypeshow = ref(false)
	const chooseIndex = ref(0)

	// 油卡列表
	const ykList = ref([])
	const ykshow = ref(false)

	// 开票公司
	const invoiceCompanyList = ref([])
	const invoiceCompanyshow = ref(false)

	// 报销列表
	const reimbursementList = ref([])
	const indexList = ref([])

	const formData = ref({
		user: '',//办理人
		entDeptSysNo: '',//申请部门
		processName: '',//报销流程
		workFlowSysNo: '',//报销流水号
		finReimbursementTypeSysNo: '',//报销类型
		reimbursementPrice: '',//报销金额
		reimbursementCompany: '',//报销公司
		ssType: '',//开户行
		ssAccount: '',//卡号
		remarks: '',//备注
		useStatus: '',//报销状态
		time: '',//报销时间
		inType: '',//是否预算内
		finTranslateSubs: []
	})
	const selectTime = ref(Date.now())
	formData.value.time = formatTimestampToDate(selectTime.value)

	const searchData = ref({
		name: '',
		stTime: '',
		edTime: '',
		status: '',
	})
	const scrollTop = ref(0)
	const minEndDate = ref(Date.now())
	const lxshow = ref(false);
	const columns = ref([])
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
	onMounted(() => {

		
		getDepartList()
		getProcessList()
		getReimbursementType()
		getBorrowingList()
		getInType()
		getInvoiceType()
		getInvoiceCompany()
		getYkList()
	})

	// 添加发票图片
	const addInvoiceImage = (item,index) => {
		console.log(item,index)
		uni.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: (res) => {
				console.log(res)
				item.imageUrl = res.tempFilePaths[0]
				item.imageName = res.tempFiles[0].name
				API_uploadImage(item.imageUrl).then(res => {
					console.log(res,'上传图片')
					formData.value.finTranslateSubs[index].imageUrl = res.absoluteUrl
				})
			}
		})
	}
	// 删除发票图片
	const deleteInvoiceImage = (item,index) => {
		console.log(item,index)
		formData.value.finTranslateSubs[index].imageUrl = ''
		formData.value.finTranslateSubs[index].imageName = ''
	}
	// 根据value获取label
	function getLabel(value,list,key,labelKey) {
		let result = list.find(item => {
			return item[key] == value
		})
		return result ? result[labelKey] : '--'
	}
	// 银行卡号校验
	function bankCardCheck() {
		BIN.getBankBin(formData.value.ssAccount,function(err,data){
			if(!err){
				formData.value.ssType = data.bankName
			}else{
				uni.showToast({
					title: '请输入正确的银行卡号',
					icon: 'none'
				})
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
	// 获取报销流程列表
	function getProcessList() {
		API_getStartProcessList({
			category: 'reimbursement'
		}).then(res => {
			if(res.code == 200) {
				let result = res.data
				processList.value[0] = result
				console.log(processList.value)
			}
		})
	}
	// 获取报销类型
	function getReimbursementType() {
		API_finApitranslateType().then(res => {
			if(res.code == 200) {
				let result = res.data
				columns.value[0] = result
				console.log(columns.value)
			}
		})
	}
	// 获取借支单列表
	function getBorrowingList() {
		API_finApiBorrowingList({type: 1}).then(res => {
			console.log(res,'借支单列表')
			if(res.code == 200) {
				let result = res.data
				borrowingList.value[0] = result
				console.log(borrowingList.value)
			}
		})
	}
	// 获取员工油卡列表
	function getYkList() {
		API_finApiYkList().then(res => {
			console.log(res,'员工油卡列表')
			if(res.code == 200) {
				let result = res.data
				ykList.value[0] = result
				console.log(ykList.value)
			}
		})
	}
	// 获取是否预算内类型
	function getInType() {
		API_getDictType({dictType: 'in_type'}).then(res => {
			console.log(res,'是否预算内类型')
			if(res.code == 200) {
				let result = res.data
				inTypeList.value[0] = result
				console.log(inTypeList.value)
			}
		})
	}
	// 获取发票类型
	function getInvoiceType() {
		API_getDictType({dictType: 'invoice_type'}).then(res => {
			console.log(res,'发票类型')
			if(res.code == 200) {
				let result = res.data
				invoiceTypeList.value[0] = result
				console.log(invoiceTypeList.value)
			}
		})
	}
	// 获取开票公司
	function getInvoiceCompany() {
		API_finApiInvoiceCompanyList().then(res => {
			console.log(res,'开票公司')
			if(res.code == 200) {
				let result = res.data
				invoiceCompanyList.value[0] = result
				console.log(invoiceCompanyList.value)
			}
		})
	}
	// 报销列表
	function getReimbursementList() {
		let params = {
			name: searchData.value.name,
			stTime: searchData.value.stTime,
			edTime: searchData.value.edTime,
			status: searchData.value.status,
			type: 1
		}
		API_finApitranslateList(params).then(res => {
			console.log(res,'报销列表')
			if(res.code == 200) {
				let result = res.data
				reimbursementList.value = result
				// 初始化报销列表
				indexList.value = reimbursementList.value.slice(0, 10)
				console.log(reimbursementList.value)
			}
		})
	}
	// 打开发票类型选择
	const openInvoiceType = (item,index) => {
		chooseIndex.value = index
		invoicetypeshow.value = true
	}
	// 添加发票
	const addInvoice = () => {
		formData.value.finTranslateSubs.push({
			invoiceType: '',
			invoiceTypeName: '',
			num: '',
			imageUrl: ''
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
	// 选择借支单
	const borrowingConfirm = (e) => {
		console.log(e)
		formData.value.borrowingName = e.value[0].name
		formData.value.borrowingSysNo = e.value[0].sysNo
		borrowingshow.value = false
	}
	// 选择报销类型
	const qeudlx = (e) => {
		lxshow.value = false
		formData.value.finReimbursementTypeSysNo = e.value[0].sysNo
		formData.value.finReimbursementTypeName = e.value[0].name
	}
	// 选择油卡
	const ykConfirm = (e) => {
		console.log(e)
		formData.value.createUserName = e.value[0].createUserName
		formData.value.createUserSysNo = e.value[0].createUserSysNo
		formData.value.cardNo = e.value[0].cardNo
		ykshow.value = false
	}
	// 选择是否预算内
	const inTypeConfirm = (e) => {
		console.log(e)
		formData.value.inType = e.value[0].dictValue
		formData.value.inTypeName = e.value[0].dictLabel
		intypeshow.value = false
	}
	// 选择发票类型
	const invoiceTypeConfirm = (e) => {
		console.log(e)
		formData.value.finTranslateSubs[chooseIndex.value].invoiceType = e.value[0].dictValue
		formData.value.finTranslateSubs[chooseIndex.value].invoiceTypeName = e.value[0].dictLabel
		invoicetypeshow.value = false
	}
	// 选择开票公司
	const invoiceCompanyConfirm = (e) => {
		console.log(e)
		formData.value.reimbursementCompany = e.value[0].name
		invoiceCompanyshow.value = false
	}
	function submitClick() {
		console.log(formData.value)
		if(verifyForm()) {
			uni.showLoading({
				title: '提交中...',
				mask: true
			})
			try {
				API_finApitranslateadd(formData.value).then(res => {
					console.log(res)
					if(res.code == 200) {
					uni.showToast({
						title: '提交成功',
						icon: 'success'
					})
					uni.hideLoading()
					tabIndex.value = 1
					getReimbursementList()
					//清除表单数据
					resetForm()
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
		if(formData.value.finReimbursementTypeSysNo == '') {
			uni.showToast({
				title: '请选择报销类型',
				icon: 'none'
			})
			return false
		}
		if(formData.value.reimbursementPrice == '') {
			uni.showToast({
				title: '请输入报销金额',
				icon: 'none'
			})
			return false
		}
		if(formData.value.workFlowSysNo == '') {
			uni.showToast({
				title: '请选择报销流程',
				icon: 'none'
			})
			return false
		}
		if(formData.value.time == '') {
			uni.showToast({
				title: '请选择报销时间',
				icon: 'none'
			})
			return false
		}
		if(formData.value.ssName == '') {
			uni.showToast({
				title: '请输入收款人',
				icon: 'none'
			})
			return false
		}
		if(formData.value.ssAccount == '') {
			uni.showToast({
				title: '请输入卡号',
				icon: 'none'
			})
			return false
		}
		if(formData.value.ssType == '') {
			uni.showToast({
				title: '请输入开户行',
				icon: 'none'
			})
		}
		if(formData.value.reimbursementCompany == '') {
			uni.showToast({
				title: '请输入报销公司',
				icon: 'none'
			})
			return false
		}
		return true
	}	
	// 重置表单
	const resetForm = () => {
		formData.value = {
		user: '',//办理人
		entDeptSysNo: '',//申请部门
		processName: '',//报销流程
		workFlowSysNo: '',//报销流水号
		finReimbursementTypeSysNo: '',//报销类型
		reimbursementPrice: '',//报销金额
		reimbursementCompany: '',//报销公司
		ssType: '',//开户行
		ssAccount: '',//卡号
		remarks: '',//备注
		useStatus: '',//报销状态
		time: '',//报销时间
		inType: '',//是否预算内
		finTranslateSubs: []
	}
	}
const scrolltolower = () => {
  loadmore();
};

const loadmore = () => {
  let start = indexList.value.length
	if(start >= reimbursementList.value.length) {
		return
	}
  let newList = reimbursementList.value.slice(start, start + 10)
  indexList.value = [...indexList.value, ...newList]
};
function goReimbursementDetail(item) {
	uni.navigateTo({
		url: `/pages/work/reimburse/reimDetile?sysNo=${item.sysNo}`
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
		console.log('点击了')
		if(e.index == 1) {
			indexList.value = []
			reimbursementList.value = []
			getReimbursementList()
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
	// 时间确定
	const timeConfirm = (e) => {
		formData.value.time = formatTimestamp(e.value)
		timeshow.value = false;
	}
	const timeConfirm1 = (e) => {
		searchData.value.stTime = formatTimestamp(e.value)
		minEndDate.value = e.value
		timeshow1.value = false;
	}
	const timeConfirm2 = (e) => {
		searchData.value.edTime = formatTimestamp(e.value)
		timeshow2.value = false;
	}
	// 时间重置
	const chongzTime = () => {
		searchData.value.status = ''
		searchData.value.name = ''
		searchData.value.stTime = ''
		searchData.value.edTime = ''
		minEndDate.value = Date.now()
		timeshow1.value = false
		timeshow2.value = false
		uDropdownRef.value.close()
		scrollTop.value = 0
		getReimbursementList()
	}
	// 时间确定
	const SubmitTime = () => {
		uDropdownRef.value.close()
		scrollTop.value = 0
		getReimbursementList()
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
	.qued {
		z-index: 9999;
	}
	:deep(.u-cell) {
		.input-num {
			min-width: 400rpx;
			
			border: none!important;
			.uni-input-input {
				text-align: right!important;
				color: #092D5C!important;
			font-size: 28rpx!important;
			}
			.uni-input-placeholder {
				text-align: right!important;
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
				margin-right: 10rpx;
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