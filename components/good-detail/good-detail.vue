<template>
	<view>
		<view class="popup">
			<u-popup :show="show" @close="close" @open="open" round="40rpx">
				<view class="popup-content">
					<view class="popup-top">
						<view class="popup-left">
							<view class="popup-image">
								<image :src="detail.cover_filenamepath?detail.cover_filenamepath:'/static/image/logo.png'"
									mode="widthFix">
								</image>
							</view>
							<view class="popup-info">
								<view>
									<view class="popup-name">{{detail[languageTypeName('name_')]}}</view>
									<!-- 	<view class="popup-inventory">
										<rich-text :nodes="detail.description_en"></rich-text>
									</view> -->
								</view>
								<view class="popup-price">HK${{detail.price}}</view>
							</view>
						</view>
						<view class="close-icon">
							<uni-icons @tap="close" type="closeempty" size="40rpx"></uni-icons>
						</view>
					</view>
					<!-- <view class="num-box" style="display: block;line-height: 40rpx;">
						<view class="num-tip" style="color: #418ACA;">{{detail[languageTypeName('brand_name_')]}}
						</view>
					</view> -->
					<view class="info-content">
						<view class="norms-list">
							<block v-for="(key,value) in detail.option_group" :key="key.id">
								<view class="norms-box">
									<view class="norms-title">{{key[languageTypeName('name_')]}}</view>
									<view class="norms-type">
										<block v-for="(item,index) in key.options" :key="item.id">
											<view class="type-item">
												<view class="type" @tap="changeType(key,item)" :class="{'active-type': isActive(key,item)}">
													{{item[languageTypeName('name_')]}}
												</view>
											</view>
										</block>
									</view>
								</view>
							</block>
						</view>
						<view class="num-box" style="margin-bottom: 20rpx;">
							<view class="num-tip">{{$t('qty')}}</view>
							<view class="num-count">
								<u-number-box v-model="detail.good_num" :min="1" @change="changePopupQty">
									<block slot="minus">
										<view class="num-minus">
											<u-icon name="minus" :color="detail.good_num==1?'#999':'#666'" size="28rpx"></u-icon>
										</view>
									</block>
									<block slot="input">
										<text class="num-input">{{detail.good_num}}</text>
									</block>
									<block slot="plus">
										<view class="num-plus">
											<u-icon name="plus" color="#666" size="28rpx"></u-icon>
										</view>
									</block>
								</u-number-box>
							</view>
						</view>
						<!-- <view class="num-box" style="display: block;line-height: 40rpx;">
							<view class="num-tip" style="margin-bottom: 10rpx;">{{$t('product_description')}}</view>
							<rich-text :nodes="detail[languageTypeName('description_')]"></rich-text>
						</view> -->
					</view>

					<view class="popup-btn">
						<view class="btn" @tap="addCart">{{$t('i_ve_chosen_it')}}</view>
					</view>
				</view>
			</u-popup>
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
			detail_id: {
				type: [Number, String],
				default: ''
			}
		},
		data() {
			return {
				show: false,
				detail: {},
			};
		},
		watch: {
			detail_id: {
				handler: function(newValue, oldValue) {
					console.log(this.detail_id, 'this.detail_id');
					if (this.detail_id) {
						this.getDetail(this.detail_id)
					}
				},
				immediate: true
			}
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
			//獲取商品規格價格
			getItemDetailsAction(id, option_ids) {
				uni.showLoading({
					title: this.$i18n.t('loading') + '...',
					mask: true
				})
				httpApi.getItemDetails({
					id,
					option_ids: JSON.stringify(option_ids)
				}).then(res => {
					console.log('res：', res)
					uni.hideLoading();
					let result = res || {}
					if (result.code == 200) {
						this.detail = {
							...this.detail,
							product_item_id: result.data.product_item_id,
							price: result.data.price,
							qty: result.data.qty,
							cover_filenamepath: result.data.cover_filenamepath
						}
						// this.$forceUpdate()
						this.sunQtyFn()
						console.log(this.detail);
					} else {
						uni.showModal({
							title: this.$i18n.t('fail'),
							showCancel: false,
							confirmText: 'OK',
							content: result.message,
							confirmColor: '#53BA47'
						});
					}
				}).catch(err => {
					uni.hideLoading()
					uni.showModal({
						title: this.$i18n.t('fail'),
						showCancel: false,
						confirmText: 'OK',
						content: this.$i18n.t('request_fail') + '...',
						confirmColor: '#53BA47'
					});
				})
			},
			//獲取商品詳情
			getProductDetailAction(id) {
				uni.showLoading({
					title: this.$i18n.t('loading') + '...',
					mask: true
				})
				httpApi.getProductDetail({
					id
				}).then(res => {
					console.log('res：', res)
					uni.hideLoading();
					let result = res || {}
					if (result.code == 200) {
						this.detail = {
							...result.data,
							cover_filenamepath: result.data.cover_image,
							good_num: 1
						}
						if (!this.detail.option_group.length) {
							if (this.detail.list.length) {
								this.detail.price = this.detail.list[0].price
								this.detail.product_item_id = this.detail.list[0].product_item_id
								this.detail.qty = this.detail.list[0].qty
							} else {
								this.detail.price = '0.00'
								this.detail.product_item_id = ''
							}
							this.sunQtyFn()
						} else {
							let option_ids = []
							this.detail.option_group.forEach(item => {
								if (item.options.length) {
									this.detail[item.id] = item.options[0]
									option_ids.push(item.options[0].id)
								}
							})
							this.getItemDetailsAction(this.detail.id, option_ids)
						}
						this.show = true
					} else {
						uni.showModal({
							title: this.$i18n.t('fail'),
							showCancel: false,
							confirmText: 'OK',
							content: result.message,
							confirmColor: '#53BA47'
						});
					}
				}).catch(err => {
					uni.hideLoading()
					uni.showModal({
						title: this.$i18n.t('fail'),
						showCancel: false,
						confirmText: 'OK',
						content: this.$i18n.t('request_fail') + '...',
						confirmColor: '#53BA47'
					});
				})
			},
			getDetail(id) {
				this.detail = {}
				this.getProductDetailAction(id)
			},
			addCart() {
				if (this.detail.qty == 0) {
					uni.showModal({
						title: this.$i18n.t('fail'),
						showCancel: false,
						confirmText: 'OK',
						content: this.$i18n.t('out_of_stock'),
						confirmColor: '#53BA47'
					});
					return
				}
				if (this.detail.qty < this.detail.good_num) {
					uni.showModal({
						title: this.$i18n.t('fail'),
						showCancel: false,
						confirmText: 'OK',
						content: this.$i18n.t('insufficient_inventory'),
						confirmColor: '#53BA47'
					});
					return
				}
				let flag = true
				let notes = ''
				if (this.detail.option_group.length) {
					this.detail.option_group.forEach(item => {
						let option_flag = false
						item.options.forEach(it => {
							if (this.detail[item.id].id == it.id) {
								option_flag = true
							}
						})
						if (!option_flag) {
							flag = false
						}
					})
				}
				if (!flag) {
					uni.showModal({
						title: this.$i18n.t('fail'),
						showCancel: false,
						confirmText: 'OK',
						content: this.$i18n.t('please_select_specs'),
						confirmColor: '#53BA47'
					});
					return
				}
				this.editAddCart({
					...this.detail
				})
				this.show = false
				this.$emit('cleanId')
				this.$emit('priceSummaryFn')
			},
			open() {

			},
			close() {
				this.show = false
				this.$emit('cleanId')
			},
			changeType(key, item) {
				this.detail[key.id] = item
				this.$forceUpdate()
				let option_ids = []
				this.detail.option_group.forEach(item => {
					if (this.detail[item.id].id) {
						option_ids.push(this.detail[item.id].id)
					}
				})
				if (option_ids.length == this.detail.option_group.length) {
					this.getItemDetailsAction(this.detail.id, option_ids)
				}
			},
			changePopupQty(e) {
				this.detail.good_num = e.value
			},
			sunQtyFn() {
				if (this.detail.option_group.length) {
					this.cartList.forEach(item => {
						if (item.id == this.detail.id) {
							let flagarr = []
							item.option_group.forEach(it => {
								if (item[it.id].id == this.detail[it.id].id) {
									flagarr.push('true')
								}
							})
							if (flagarr.length == item.option_group.length) {
								this.detail.qty = Number(this.detail.qty) - Number(item.good_num)
							}
						}
					})
				} else {
					this.cartList.forEach(item => {
						if (item.id == this.detail.id) {
							this.detail.qty = Number(this.detail.qty) - Number(item.good_num)
						}
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.popup {
		::v-deep .u-transition {
			z-index: 999 !important;
		}

		.popup-content {
			height: 1160rpx;
			padding: 30rpx 20rpx 100rpx;

			.popup-top {
				display: flex;
				justify-content: space-between;
				margin-bottom: 40rpx;

				.popup-left {
					display: flex;

					.popup-image {
						width: 160rpx;
						margin-right: 15rpx;
						border-radius: 16rpx;
						// border: 1px solid #000;
						overflow: hidden;

						image {
							width: 100%;
						}
					}

					.popup-info {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						font-weight: bold;

						.popup-name {
							margin-bottom: 10rpx;
						}

						.popup-inventory {
							padding: 4rpx 0;
							font-weight: normal;
							font-size: 28rpx;
						}

						.popup-price {
							color: #5AC725;
							font-weight: normal;

							.popup-unit {
								font-size: 26rpx;
							}
						}
					}
				}

				.close-icon {}
			}

			.info-content {
				height: 760rpx;
				overflow-y: auto;
				// max-height: 700rpx;
			}

			.norms-list {

				// padding: 0 20rpx;
				// overflow-y: auto;
				font-size: 30rpx;

				.norms-box {
					margin-bottom: 20rpx;

					.norms-title {
						margin-bottom: 20rpx;
						line-height: 40rpx;
						font-weight: bold;
					}

					.norms-type {
						display: flex;
						flex-wrap: wrap;
						margin: 0 -10rpx;

						.type-item {
							width: 33.33%;
							padding: 0 10rpx;
							margin-bottom: 20rpx;
							box-sizing: border-box;

							.type {
								height: 70rpx;
								line-height: 70rpx;
								text-align: center;
								background: #F4F8FB;
								border: 2rpx solid #F4F8FB;
								border-radius: 16rpx;
								box-sizing: border-box;
							}

							.active-type {
								background: #F8F2F2;
								border-color: #912120;
							}
						}
					}
				}
			}

			.num-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-bottom: 20rpx;

				.num-tip {
					font-weight: bold;
				}

				.num-count {
					.num-minus {}

					.num-input {
						width: 60rpx;
						padding: 4rpx 0;
						margin: 0 20rpx;
						font-size: 30rpx;
						text-align: center;
						background: #f2f2f2;
					}

					.num-plus {}
				}
			}

			.popup-btn {
				position: fixed;
				bottom: 0;
				right: 0;
				left: 0;
				padding: 20rpx;
				background: #fff;

				.btn {
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					border-radius: 60rpx;
					color: #fff;
					background: $color_53ba47;
				}
			}
		}
	}
</style>