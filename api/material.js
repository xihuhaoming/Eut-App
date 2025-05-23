import { get } from "/util/request/request.js"

// 获取物资列表
export const getMaterialList = (params) => {
	return get('/proApi/pro/entityClass/list', params)
}   



