import { get } from "/util/request/request.js"

// 获取物资列表
export const getMaterialList = (params) => {
	return get('/proApi/pro/entityClass/list', {params})
}   

// 获取库存列表
export const getInventoryList = (params) => {
	return get('/proApi/pro/entity/stock/page', {params})
}



