import {
	post,
	get
} from "/util/request/request.js"

// 获取字典类型
export function API_getDictType(params) {
	return get('/system/dict/data/type/' + params.dictType)
}
