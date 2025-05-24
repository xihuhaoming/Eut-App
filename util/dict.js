export const statusList = [{
	label: '待确认',
	value: 0
}, {
	  label: '已确认',
	  value: 1
	}, {
	  label: '已拒绝',
	  value: 2
	}, {
	  label: '已作废',
	  value: -1
	}, {
	  label: '流程中',
	  value: 100
	}]

export const getLabelByValue = (value) => {
	return statusList.find(item => item.value === value)?.label || '--'
}
