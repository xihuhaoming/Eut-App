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
// 修改密码
export function changePwd(params) {
	return post('/user/changePwd', params)
}
