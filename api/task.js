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
// 开票
export function API_invoiceApplyAdd(params) {
	return post('/invoiceApply/add', params)
}