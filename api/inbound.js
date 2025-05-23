import { post, get } from "/util/request/request.js";


/**
 * 新增入库
 * @param {Object} data - 入库表单数据
 * @returns {Promise}
 */
export function addInboundOrder(data) {
    return post('/proApi/pro/warehousing/add', data);
}


/**
 * 查询入库流程数据
 */
export function getStartProcessList() {
    return get('/workflow/process/getStartProcessList');
}

// 查询采购单号
export function getPurchaseOrderNumber() {
    return get('/proApi/pro/warehousing/myPurchase');
}

