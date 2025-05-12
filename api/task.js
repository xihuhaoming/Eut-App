import {
	post,
	get
} from "/util/request/request.js"

// 获取任务通知列表
export function API_taskList(params) {
	return get('/task/list', {params})
}
// 新增任务
export function API_taskAdd(params) {
	return post('/task/add', params)
}
