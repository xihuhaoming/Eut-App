<template>
	<view class="btn">
		<view class="btn-group" :style="{'--line-number':lineNumber,'--gap':gap}">
			<view v-for="(item, index) in arr" :key="index" class="btn-group-item" @click="btnItemClick(item,index)"
				:style="[getBtnStyle(item)]">
				<slot :item="item" :index="index">
					<text>{{item[labelKey] }}</text>
				</slot>
				<view class="btn-group-badge" :style="[getBadgePosition]" v-if="showBadge">
					<ex-icon :name="badgePosition === 'top'?'right-top-mark-check':'right-bot-mark-check'"
						:size="badgeSize" :color="getBadegColor(item)"></ex-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import props from './props.js'
	export default {
		props,
		emits: ['itemClick', 'update:modelValue'],
		computed: {
			labelKey() {
				return this?.props?.label ?? 'label'
			},
			valueKey() {
				return this?.props?.value ?? 'value'
			},
			// 角标位置
			getBadgePosition() {
				return {
					[this.badgePosition]: 0
				}
			}
		},
		watch: {
			list: {
				handler(val) {
					let tempArr = val?.map(o => {
						if (typeof o === "string" || typeof o === "number") {
							return {
								[this.labelKey]: o,
								[this.valueKey]: o
							}
						}
						return o
					}) || []
					this.arr = tempArr
					this.allList = tempArr
				},
				deep: true,
				immediate: true
			},
			// #ifndef VUE3
			value: {
				handler(val) {
					this.initVal(val)
				},
				deep: true,
				immediate: true
			},
			// #endif
			// #ifdef VUE3
			modelValue: {
				handler(val) {
					this.initVal(val)
				},
				deep: true,
				immediate: true
			},
			// #endif

			disabledArr: {
				handler(val = []) {
					this.disableds = val
				},
				deep: true,
				immediate: true
			}
		},

		data() {
			return {
				arr: [],
				selecteds: [], // 选中的项
				disableds: [], // 禁用的项
				allList: []
			}
		},
		methods: {

			// 按钮样式
			getBtnStyle(item) {
				if (item.disabled || this.disableds.includes(item[this.valueKey])) {
					return this.disabledStyle
				}
				if (this.selecteds.includes(item[this.valueKey])) {
					return this.selectedStyle
				}
				return this.unSelectedStyle
			},
			// 角标颜色
			getBadegColor(item) {
				if (item.disabled || this.disableds.includes(item[this.valueKey])) {
					return this.badgeDisabledColor
				}
				if (this.selecteds.includes(item[this.valueKey])) {
					return this.badgeSelectedColor
				}
				return this.badgeColor
			},
			// 按钮点击事件
			btnItemClick(item, index) {
				this.itemClick(item, index)
				let selectVal = null
				if (this.multiple) {
					selectVal = [...this.selecteds]
				} else {
					selectVal = this.selecteds?.[0]
				}
				// #ifndef VUE3
				this.$emit('input', selectVal)
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue', selectVal)
				// #endif
			},

			initVal(val) {
				if (val === '' || val === undefined || val === null) {
					this.selecteds = []
					return
				}
				if (Array.isArray(val)) {
					this.selecteds = val
				} else {
					this.selecteds = [val]
				}
			},

			// 选项点击
			itemClick(item, index) {
				let val = item[this.valueKey]
				let selected = this.selecteds.includes(val)
				this.$emit('itemClick', {
					val,
					item,
					index,
					selected: !selected
				})
				// 禁用的项 (如果配置了disabledArr属性,同时list属性传递的数组有选项属性为disabled则都会禁用)
				if (item.disabled || this.disableds.includes(val)) {
					return
				}
				// 选中的选项,并且不允许取消选中
				if (selected && !this.cancelSelectItem) {
					return
				}
				this.multiple ? this.multipleClick(val, selected) : this.singleClick(val, selected)
			},

			// 单选点击
			singleClick(val, selected) {
				this.selecteds = selected ? [] : [val]
			},

			// 多选点击
			multipleClick(val, selected) {
				// 最大数量校验
				if ((this.selecteds.length + 1) > this.maxNum && !selected) {
					uni.showToast({
						icon: 'none',
						title: this.maxNumToast
					})
					return
				}
				if (selected) {
					this.selecteds = this.selecteds.filter(o => {
						return o != val
					}) || []
				} else {
					this.selecteds.push(val)
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
	.btn {
		width: 100%;

		&-group {
			width: 100%;
			display: grid;
			grid-template-columns: repeat(var(--line-number), 1fr);
			gap: var(--gap);

			&-item {
				flex: 1;
				min-height: 36px;
				border-radius: 5px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 14px;
				position: relative;
				border-style: solid;
				border-width: 1px;
			}

			&-badge {
				position: absolute;
				display: flex;
				right: 0;
			}
		}
	}
</style>