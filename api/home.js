import {
	post,
	get
} from "/util/request/request.js"

export function API_getListByType(params) {
	return get('/work/getListByType', {
		params
	})
}
// 修改密码
export function changePwd(params) {
	return post('/user/changePwd', params)
}