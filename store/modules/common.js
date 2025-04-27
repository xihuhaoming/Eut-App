
const common = {
    namespaced: true,
    state: {
        departList: [],
        treeDataList: {}
    },
    getters: {
        treeData: state => {
            return state.treeDataList;
        }
    },
    mutations: {
        setDepartList(state, data) {
            let {
                list,
                r
            } = data;
            state.departList = list;
            r();
        },
        setTreeData(state, data) {
            let {
                list,
                type,
                r,
                dataKey
            } = data;
            if (dataKey) {
                if (!state.treeDataList[type]) {
                    state.treeDataList[type] = {};
                }
                state.treeDataList[type][dataKey] = list;
            } else {
                state.treeDataList[type] = list;
            }
            r();
        },
        clearDepartList(state) {
            state.departList = [];
        }
    },
    actions: {
        async setDepartList({ commit, state }, vm) {
            if (state.departList.length == 0) {
                let d = await vm.API_getLoginUserManageDeptList();
                if (d.departList && d.departList.length > 0) {
                    await new Promise(r => {
                        commit('setDepartList', {
                            list: d.departList,
                            r
                        });
                    });

                }
            };
        },
        async setTreeData({ commit, state }, data) {
            let {
                vm,
                dataFn,
                arg
            } = data;
            console.log(dataFn);
            await new Promise(async r => {
                let treeData = state.treeDataList[dataFn];
                if (arg) {
                    let dataKey = JSON.stringify(arg);
                    if (!treeData || treeData.length == 0 || !treeData[dataKey] || treeData[dataKey].length == 0) {
                        let d = await vm[dataFn].call(this, arg);
                        if (d && d.length > 0) {
                            commit('setTreeData', {
                                list: d,
                                type: dataFn,
                                dataKey,
                                r
                            });
                        }
                    } else {
                        r();
                    }
                } else {
                    if (!treeData || treeData.length == 0) {
                        let d = await vm[dataFn].call(this);
                        if (d && d.length > 0) {
                            commit('setTreeData', {
                                list: d,
                                type: dataFn,
                                r
                            });
                        }
                    } else {
                        r();
                    }
                }
            });
        }
    },
};
export default common;