import {
	post,
	get
} from "/util/request/request.js"

// 任务列表
export function API_getListByType(params) {
	return get('/work/getListByType', {
		params
	})
}
// 工作组列表
export function API_getWorkGroupList(params) {
	return get('/work/getWorkGroupList', {
		params
	})
}

// 修改密码
// export function changePwd(params) {
// 	return post('/user/changePwd', params)
// }