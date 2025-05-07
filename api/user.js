import {
	post,
	get
} from "/util/request/request.js"

export function userInfo1(params) {
	return get('/login/accountLogin', {
		params
	})
}
// 修改密码
export function changePwd(params) {
	return post('/user/changePwd', params)
}
// 登录
export function login(params) {
	return post('/login/accountLogin', params)
}
// 退出登录
export function userLogout(params) {
	return post('/user/logout', params)
}