<template>
	<view>
		<view class="list">
			<block v-for="item in goodList" :key="item.id">
				<view class="good-item" @tap="selectGood(item.id)">
					<view class="good">
						<view class="good-image">
							<image :src="item.cover_image?item.cover_image:'/static/image/logo.png'" mode="widthFix">
							</image>
						</view>
						<view class="good-info">
							<view class="good-name">{{item[languageTypeName('name_')]}}</view>
							<view class="good-unit">
								<view class="good-price">HK${{item.price}}</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
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
			return {

			};
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
				this.$emit('openDetail', id)
			},

		}
	}
</script>

<style scoped lang="scss">
	.good-title {
		padding: 10px;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		margin: 6px -6px;

		.good-item {
			width: 50%;
			padding: 6px 6px;

			.good {
				height: 100%;
				border-radius: 16rpx;
				background: #fff;
			}

			.good-image {
				width: 340rpx;
				height: 340rpx;
				// border: 1px solid #000;
				display: flex;
				align-items: center;
				justify-content: center;
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
				padding: 15rpx;

				.good-name {
					line-height: 1;
					margin-bottom: 10rpx;
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
	}
</style>