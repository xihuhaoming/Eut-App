import {
	post,
	get
} from "/util/request/request.js"

// 获取任务通知列表
export function API_taskList(params) {
	return get('/task/list', {
		params
	})
}
// 新增任务
export function API_taskAdd(params) {
	return post('/task/add', params)
}
// 任务详情
export function API_taskDetail(params) {
	return get('/task/detail/' + params)
}
// 任务进度
export function API_getProcessDetail(params) {
	return get('/task/getProcessDetail/' + params)
}
// 中止任务
export function API_taskStop(params) {
	return post('/task/stop/' + params)
}
// 修改任务
export function API_taskEdit(params) {
	return post('/task/edit', params)
}
// 审核
export function API_taskReplyAudit(params) {
	return post('/taskReply/audit', params)
}
// 任务回复详情
export function API_taskReplyDetail(params) {
	return get('/taskReply/detail/' + params)
}
// 任务回复列表
export function API_taskReplyList(params) {
	return get('/taskReply/list',{params})
}
// 提交
export function API_taskReplySubmit(params) {
	return post('/taskReply/submit', params)
}
// 完成
export function API_taskReplyComplete(params) {
	return post('/taskReply/complete/' + params)
}

// 选择合同
export function API_getUnionContractList(params) {
	return get('/contract/getUnionContractList', {params})
}
// 合同详情
export function API_contracthDetail(params) {
	return get('/projApi/proj/contract/hDetail', {params})
}
// 获取合同下产品服务列表
export function API_getContractProductList(sysNo) {
	return get('/h5/contractServe/getServeList/' + sysNo)
}
// 开票
export function API_invoiceApplyAdd(params) {
	return post('/projApi/project/ProjInvoice/add', params)
}
// 开票列表
export function API_ProjInvoicePage(params) {
	return get('/projApi/project/ProjInvoice/page', {params})
}
// 开票流程列表
export function API_getStartProcessList(params) {
	return get('/workflow/process/getStartProcessList', {params})
}
// 开票详情
export function API_ProjInvoicedetail(params) {
	return get('/projApi/project/ProjInvoice/detail', {params})
}
// 报销列表
export function API_finApitranslateList(params) {
	return get('/finApi/fin/translate/list', {
		params
	})
}
// 新增报销
export function API_finApitranslateadd(params) {
	return post('/finApi/fin/translate/add', params)
}
// 报销详情
export function API_finApitranslateDetail(params) {
	return get('/finApi/fin/translate/detail', {
		params
	})
}
//报销类型
export function API_finApitranslateType(params) {
	return get('/finApi/fin/reimbursement/type/list', {
		params
	})
}
// 借支单已通过列表
export function API_finApiBorrowingList(params) {
	return get('/projApi/project/projBorrowing/my', {
		params
	})
}
// 员工油卡列表
export function API_finApiYkList(params) {
	return get('/customerApi/csr/employee/card/myList', {
		params
	})
}
// 开票公司
export function API_finApiInvoiceCompanyList(params) {
	return get('/projApi/project/projGs/list', {
		params
	})
}
// 履约金列表
export function API_finApiPerformanceList(params) {
	return get('/projApi/project/ProjPerform/list', {
		params
	})
}
// 履约金详情
export function API_finApiPerformanceDetail(params) {
	return get('/projApi/project/ProjPerform/detail', {
		params
	})
}
// 履约金新增
export function API_finApiPerformanceAdd(params) {
	return post('/projApi/project/ProjPerform/add', params)
}
// 履约金合同列表
export function API_finApiPerformanceContractList(params) {
	return get('/projApi/project/ProjPerform/contracts')
}
// 履约金合同详情
export function API_finApiPerformanceContractDetail(sn) {
	return get('/projApi/project/ProjPerform/contractDetail/' + sn)
}

// 收款申请列表
export function API_finApiReceivepayList(params) {
	return get('/projApi/project/ProjReceivable/list', {
		params
	})
}
// 收款申请详情
export function API_finApiReceivepayDetail(params) {
	return get('/projApi/project/ProjReceivable/detail', {
		params
	})
}
// 收款申请新增
export function API_finApiReceivepayAdd(params) {
	return post('/projApi/project/ProjReceivable/add', params)
}
// 收款账户列表
export function API_finApiReceivepayAccountList(params) {
	return get('/projApi/project/projAccount/list', {
		params
	})
}



