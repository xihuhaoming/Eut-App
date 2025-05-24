import {
	post,
	get
} from "/util/request/request.js"

// 获取字典类型
export function API_getDictType(params) {
	return get('/system/dict/data/type/' + params.dictType)
}

// 添加企业客户
export function API_addEnterpriseClient(data) {
	return post('/customerApi/ent/customer/add', data)
}

// 放入公共池子中
export function API_addClientToPool(data) {
	return post('/customerApi/ent/customer/publicPool', data)
}

// 查询企业客户
export function API_getEnterpriseClient(params) {
	return get('/customerApi/ent/customer/page', {
		params
	})
}

// 查询个人客户
export function API_getPersonalClient(params) {
	return get('/customerApi/csr/customer/page', {params})
}


// 根据sysNo查询客户
export function API_getClientBySysNo(params) {
	return get('/customerApi/ent/customer/detail', {params})
}


	
