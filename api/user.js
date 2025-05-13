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
// 修改头像 
export function changeAvatar(params) {
	return post('/user/changeAvatar', params)
}
// 消息列表
export function noticeList(params) {
	return get('/notice/list', {
		params
	})
}
// 消息详情
export function noticeDetail(params) {
	return get('/notice/detail/'+params)
}
// 未读消息
export function noticeUnReadCount(params) {
	return get('/notice/unReadCount', {
		params
	})
}

// 通讯录 部门列表
export function userGetDepartList(params) {
	return get('/user/getDepartList', {
		params
	})
}
// 通讯录 用户列表
export function userGetUserList(params) {
	return get('/user/getUserList', {
		params
	})
}