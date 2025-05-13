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