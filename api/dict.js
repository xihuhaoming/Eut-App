
// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
    return uni.$u.http.get(`/system/dict/data/type/${dictType}`);
}