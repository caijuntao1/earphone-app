<template>
	<view>
		<block v-for="(item,index) in goodList" :key="item.id">
			<view class="good-item" @tap="selectGood(item.id)">
				<view class="good-image">
					<image :src="item.cover_image?item.cover_image:'/static/image/logo.png'" mode="widthFix"></image>
				</view>
				<view class="good-info">
					<view class="good-name">{{item[languageTypeName('name_')]}}</view>
					<view class="good-unit">
						<view class="good-price"></view>
						<view class="good-cart">{{$t('select_specs')}}</uni-icons>
						</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import httpApi from '@/services/api.js';
	export default {
		name: "goods",
		props: {
			goodList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {};
		},
		computed: {
			...mapState(['statusBarHeight', 'cartList', 'isShowCart', 'language']),
			languageTypeName() {
				return (name) => {
					if (name) {
						return name + this.language
					} else {
						return '-'
					}
				}
			},
			isActive() {
				return (key, item) => {
					if (key) {
						return this.detail[key.id].id == item.id
					} else {
						return false
					}
				}
			},
			specsName() {
				return (good) => {
					if (good.option_group.length) {
						let name = ''
						good.option_group.forEach(item => {
							if (name.length) {
								name = '、' + good[item.id]['name_' + this.language]
							} else {
								name = good[item.id]['name_' + this.language]
							}
						})
						return name
					} else {
						return ''
					}
				}
			}
		},
		methods: {
			...mapMutations(['editAddCart', 'changeCartQty', 'deleteCartAll', 'editIsShowCart']),
			selectGood(id) {
				// this.$emit('openDetail', id)
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.good-title {
		padding: 10px;
	}

	.good-item {
		display: flex;
		padding: 20rpx 0;

		.good-image {
			width: 160rpx;
			margin-right: 15rpx;
			border-radius: 16rpx;
			// border: 1px solid #000;
			overflow: hidden;

			image {
				width: 100%;
			}
		}

		.good-info {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.good-name {
				line-height: 1;
				margin-bottom: 5rpx;
				font-weight: bold;
				// overflow: hidden;
				// display: -webkit-box;
				// text-overflow: ellipsis;
				// -webkit-line-clamp: 2;
				// -webkit-box-orient: vertical;
			}

			.good-unit {
				display: flex;
				align-items: flex-end;

				justify-content: space-between;

				.good-price {
					color: #5AC725;
				}

				.good-cart {
					// width: 50rpx;
					// height: 50rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 5rpx 20rpx;
					font-size: 26rpx;
					color: #fff;
					background: $color_53ba47;
					border-radius: 40rpx;
				}
			}
		}
	}
</style>