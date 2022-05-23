<template>
	<view class="content">
		<!-- <image class="headbg" src="../../static/indexbg.png" mode=""></image> -->
		<!-- <view class="" style="position: fixed;top: 6vh;left: 15px;font-size: 18px;font-family: PingFang SC-Bold, PingFang SC;font-weight: bold;color: #FFFFFF;z-index: -10;">飞思速读</view> -->
		<view class="" v-if="Height < 800" style="width: 100%;height: 10px;background-color: #FFFFFF;"></view>
		<view class="" v-else style="width: 100%;height: 24px;background-color: #FFFFFF;"></view>
		<view class="" style="width: 100%;background-color: #FFFFFF;box-sizing: border-box;display: flex;padding-top: 35rpx;">
			<view class="nianji" @click="gonian">
				<image src="../../static/nianji.png" mode=""></image>
				<view class="title">{{gradeSxcNames == ''?'未选择年级':gradeSxcNames + sxcs}}</view>
				<u-icon name="arrow-down" size="16"></u-icon>
			</view>
			<view class="timu" style="line-height: 40px;margin-left: 8%;"></view>
		</view>
		<view class="head">

			<view class="indexStatus">
				<scroll-view scroll-x="true" class="kite-classify-scrolls">
					<view v-for="(item,index) of list" :key='index' @click="headindex(index,item.unit)"
						class="kite-classify-cell" :class="currentIndex== index?'kcc2':''">
						{{item.unit}}
						<view class=""
							style="width: 28px;height: 4px;background: #4BB4EF;border-radius: 2px 2px 2px 2px;margin: 4px auto 0;">
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="mode">
				<view class="xun" style="margin-right: 40px;" @click="xz(1)">
					<image v-if="xuanze == 1" src="../../static/xuan.png" mode=""></image>
					<image v-else src="../../static/weixuan.png" mode=""></image>
					<view class="name">训练模式</view>
				</view>
			<!-- 	<view class="xun" @click="xz(2)">
					<image v-if="xuanze != 1" src="../../static/xuan.png" mode=""></image>
					<image v-else src="../../static/weixuan.png" mode=""></image>
					<view class="name">实战模式</view>
				</view> -->
			</view>
		</view>
		<!-- cont -->
		<view class="conts">
			<view class="" v-if="classes.length == 0"
				style="width: 100%;height: 50px;line-height: 50px;text-align: center;padding-top: 50px;box-sizing: border-box;font-size: 20px;">
				本单元暂无课文</view>
			<view class="cont" v-for="(item,index) in classes" :key='index' @click="go(item)">
				<view class="info">
					<view class="box">
						<!-- <view class="title">{{item.title}}（{{item.type}}）</view> -->
						<view class="title">{{item.title}}</view>
						<view class="infos">{{item.wordCount}}字 | 共{{item.questionCount}}题 | 预计{{Math.ceil(item.wordCount/500)}}分钟</view>
					</view>
					<view class="fen" v-if="item.stockList[0].readscore != 0">{{item.stockList[0].readscore}}分</view>
					<view class="btn">{{item.stockList[0].readscore == 0?'开始':'重读'}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				currentIndex: 0,
				xuanze: 1,
				gradeSxcNames: '',
				classes: [],
				Width: 0,
				Height: 0,
				sxcs: ''
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					console.log(res, res.screenWidth, res.screenHeight)
					this.Width = res.screenWidth
					this.Height = res.screenHeight
				}
			})
			uni.setStorageSync('xun', '训练')
		},
		onShow(){
			// console.log(uni.getStorageSync('currentIndex'),'');
			// if(uni.getStorageSync('currentIndex')){
			// 	this.currentIndex = uni.getStorageSync('currentIndex')
			// }
			this.onShow1();
		},

		methods: {
			onShow1() {
				var d = new Date()
				// console.log(d.getMonth() + 1,'时间')
				// console.log(uni.getStorageSync('login').token == undefined)
				if (uni.getStorageSync('login').token == undefined) {
					console.log('没有登录')
				} else {
					if (uni.getStorageSync('login').gradeName != null && uni.getStorageSync('nian') == '') {
						if (d.getMonth() + 1 >= 8 && d.getMonth() + 1 <= 12) {
							// console.log('上册')
							this.sxcs = '上册'
						} else {
							// console.log('下册')
							this.sxcs = '下册'
						}
						this.gradeSxcNames = uni.getStorageSync('login').gradeName
						// 108.APP查询年级分册单元列表，只查询有课内文章的单元
						this.$request('/gxsd-prod/organization/class/selectGradeSxcUnitArticleList', {
							gradeId: uni.getStorageSync('login').gradeId,
							notQueryGWGS: "T",
							sxc: this.sxcs
						}, 'POST').then(res => {
							console.log(res, '108.APP查询年级分册单元列表，只查询有课内文章的单元')
							if (res.code == 200) {
								this.list = res.data
								if(res.data.length>0){
									 this.headindex(0, this.list[0].unit)
								}else{
									this.list=[];
									this.classes=[];
								}
								
							} else if (res.code == 402) {
								// uni.showToast({
								// 	title: res.message + '请重新登录！',
								// 	icon: 'none'
								// })
								// setTimeout(function() {
								// 	uni.navigateTo({
								// 		url: '../login/login'
								// 	})
								// }, 500);
								this.to_login();
							}
						})
						//设置默认选中年级
						var class_name=this.gradeSxcNames + this.sxcs ;
						this.$request('/gxsd-prod/organization/class/selectHaveBuyGradeAndFenCe', {
							appuserId: uni.getStorageSync('login').userId
						}, 'POST').then(res => {
							console.log('年级信息',res);
							var res_data=res.data;
							res_data.forEach(function(vv,kk){
								if(class_name==vv.gradeSxcName){
									console.log(vv);
									uni.setStorageSync('nian',vv);
								}
							})
						})
						
						
						
						
						
						
					} else {
						console.log('登录')
					}
				}
				if (uni.getStorageSync('nian') == '') {
					console.log('当前没有选择年级')
					// uni.showToast({
					// 	title:'您当前没有选择年级',
					// 	icon:'none'
					// })
				} else {
					this.sxcs=' ';
					if(uni.getStorageSync('nian').gradeSxcName==this.gradeSxcNames){
						this.gradeSxcNames = uni.getStorageSync('nian').gradeSxcName
						// 108.APP查询年级分册单元列表，只查询有课内文章的单元
						this.$request('/gxsd-prod/organization/class/selectGradeSxcUnitArticleList', {
							gradeId: uni.getStorageSync('nian').gradeId,
							sxc: uni.getStorageSync('nian').sxc,
							notQueryGWGS: "T"
						}, 'POST').then(res => {
							console.log(res, '108.APP查询年级分册单元列表，只查询有课内文章的单元')
							if (res.code == 200) {
								//this.list = res.data
								//this.headindex(0, this.list[0].unit)
								if(res.data.length>0){
									this.list = res.data
									this.headindex(0, this.list[0].unit)
								}else{
									this.list=[];
									this.classes=[];
									uni.showToast({
										title:'暂无数据',
										icon:'none'
									})
								}
							} else if (res.code == 402) {
								// uni.showToast({
								// 	title: res.message + '请重新登录！',
								// 	icon: 'none'
								// })
								// setTimeout(function() {
								// 	uni.navigateTo({
								// 		url: '../login/login'
								// 	})
								// }, 500);
								this.to_login();
								
							}
						})
					}else{
						this.gradeSxcNames = uni.getStorageSync('nian').gradeSxcName
						// 108.APP查询年级分册单元列表，只查询有课内文章的单元
						this.$request('/gxsd-prod/organization/class/selectGradeSxcUnitArticleList', {
							gradeId: uni.getStorageSync('nian').gradeId,
							sxc: uni.getStorageSync('nian').sxc,
							notQueryGWGS: "T"
						}, 'POST').then(res => {
							console.log(res, '108.APP查询年级分册单元列表，只查询有课内文章的单元')
							if (res.code == 200) {
								//this.list = res.data
								//this.headindex(0, this.list[0].unit)
								if(res.data.length>0){
									this.list = res.data
									this.headindex(0, this.list[0].unit)
								}else{
									this.list=[];
									this.classes=[];
									uni.showToast({
										title:'暂无数据',
										icon:'none'
									})
								}
							} else if (res.code == 402) {
								// uni.showToast({
								// 	title: res.message + '请重新登录！',
								// 	icon: 'none'
								// })
								// setTimeout(function() {
								// 	uni.navigateTo({
								// 		url: '../login/login'
								// 	})
								// }, 500);
								this.to_login();
								
							}
						})
					}
					
				}
			},
			to_login(){
				var login_data=uni.getStorageSync('login');
					var that=this;
				if(login_data.token!='' && login_data.token!=undefined){
				
					//有但是失效了
					if(login_data.openid!='' && login_data.openid!=undefined){
						console.log(login_data,'登录信息123');
						that.$request('/gxsd-prod/read/readUser/login?openIdXcx=' +login_data.openid + '&accountType=1', {},'GET').then(logins => {
							console.log(logins, 'wx登录')
							uni.setStorageSync('login', logins.data);
							if(logins.message == '请求成功！'){
								that.onShow1();
								// uni.showToast({
								// 	title:logins.message,
								// 	icon:'none'
								// })
							}else{
								uni.showToast({
									title: res.message + '请重新登录！',
									icon: 'none'
								})
								setTimeout(function() {
									uni.navigateTo({
										url: '../login/login'
									})
								}, 500);
							}
						})
					}else{
						uni.showToast({
							title: res.message + '请重新登录！',
							icon: 'none'
						})
						setTimeout(function() {
							uni.navigateTo({
								url: '../login/login'
							})
						}, 500);
					}
					
				}
			},
			// 选择年级
			gonian() {
				if (uni.getStorageSync('login').token == '' || uni.getStorageSync('login').token == undefined) {
					uni.showToast({
						title: '您当前还未登录！',
						icon: 'none'
					})
					setTimeout(function() {
						uni.navigateTo({
							url: '../login/login'
						})
					}, 500);
				} else {
					uni.navigateTo({
						url: 'nianji'
					})
				}
			},
			// 切换单元
			headindex(index, unit) {
				var grade=uni.getStorageSync('login').gradeName;
				var sxc_name=this.sxcs;
				if(uni.getStorageSync('nian') != '' && uni.getStorageSync('nian') != undefined){
					grade=uni.getStorageSync('nian').gradeName;
					sxc_name= uni.getStorageSync('nian').sxc
				}
				// 	uni.showToast({
				// 		title:'您当前没有选择年级',
				// 		icon:'none'
				// 	})
				// 	setTimeout(function() {
				// 		uni.navigateTo({
				// 			url:'nianji'
				// 		})
				// 	}, 500);
				// }else{
				console.log(index, unit)
				this.currentIndex = index
				uni.setStorageSync('currentIndex',this.currentIndex)
				// 单元选择查看
				this.$request('/gxsd-prod/read/appRead/getArticlesByStudent', {
					currentPage: 0,
					type: "课内",
					pageSize: 200,
					grade: grade,
					questionstockTitle: "课内速读",
					readTypeTwo: "自主阅读",
					title: "",
					studentId: uni.getStorageSync('login').userId,
					sxc: sxc_name,
					unit: unit,
				}, 'POST').then(res => {
					console.log(res, '单元选择查看')
					if (res.code == 200) {
						this.classes = res.data
					} else if (res.code == 402) {
						uni.showToast({
							title: res.message + '请重新登录！',
							icon: 'none'
						})
						setTimeout(function() {
							uni.navigateTo({
								url: '../login/login'
							})
						}, 500);
					} else if (res.code == 250) {
						uni.showToast({
							title: '网络繁忙，请稍后重试！',
							icon: 'none'
						})
					}
				})
				// }
			},
			// 选择是否训练实战
			xz(e) {
				if (uni.getStorageSync('nian') == '') {
					uni.showToast({
						title: '您当前没有选择年级',
						icon: 'none'
					})
					setTimeout(function() {
						uni.navigateTo({
							url: 'nianji'
						})
					}, 500);
				} else {
					this.xuanze = e
					if (e == 1) {
						uni.setStorageSync('xun', '训练')
					} else {
						uni.setStorageSync('xun', '实战')
					}
				}
			},
			go(item) {
				uni.setStorageSync('classes', item)
				uni.setStorageSync('pan', 1)
				if (uni.getStorageSync('nian') == '') {
					uni.showToast({
						title: '您当前没有选择年级',
						icon: 'none'
					})
					setTimeout(function() {
						uni.navigateTo({
							url: 'nianji'
						})
					}, 500);
				} else {
					uni.navigateTo({
						url: 'sudu'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		.headbg {
			position: fixed;
			top: 0px;
			width: 100%;
			height: 220px;
			z-index: -100;
		}

		.nianji {
			height: 40px;
			border-bottom: 1px solid #F2F2F2;
			box-sizing: border-box;
			display: flex;

			image {
				margin-top: 10px;
				width: 20px;
				height: 20px;
				margin-right: 10px;
			}

			.title {
				height: 40px;
				font-size: 14px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 40px;
				margin-right: 10px;
			}
		}

		.head {
			width: 94vw;
			background: #FFFFFF;
			border-radius: 8px 8px 8px 8px;
			margin: 0 auto;
			z-index: 1000;
			padding: 16px 20px;
			box-sizing: border-box;

			.nianji {
				height: 40px;
				border-bottom: 1px solid #F2F2F2;
				box-sizing: border-box;
				display: flex;

				image {
					margin-top: 10px;
					width: 20px;
					height: 20px;
					margin-right: 10px;
				}

				.title {
					height: 40px;
					font-size: 14px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 40px;
					margin-right: 10px;
				}
			}

			.indexStatus {
				width: 100%;
				height: 60px;
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #F2F2F2;
				box-sizing: border-box;

				.kite-classify-scrolls {
					width: 100%;
					height: 60px;
					overflow: hidden;
					white-space: nowrap;

					.kite-classify-cell {
						display: inline-block;
						height: 60px;
						font-size: 14px;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #999999;
						line-height: 60px;
						margin-right: 32px;
					}

					.kcc2 {
						height: 60px;
						font-size: 16px;
						font-family: PingFang SC-Bold, PingFang SC;
						font-weight: bold;
						color: #4BB4EF;
						line-height: 30px;
						margin-right: 32px;
					}
				}
			}

			.mode {
				padding-top: 20px;
				box-sizing: border-box;
				display: flex;
				height: 40px;

				.xun {
					display: flex;

					image {
						width: 20px;
						height: 20px;
						margin-right: 10px;
					}

					.name {
						height: 20px;
						font-size: 14px;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 20px;
					}
				}
			}
		}

		.conts {
			padding: 0px 15px;
			box-sizing: border-box;

			.cont {
				padding: 0px 20px;
				box-sizing: border-box;
				background: #FAFAFA;
				border-radius: 0px 0px 0px 0px;

				.info {
					display: flex;
					justify-content: space-between;

					.box {
						width: 62%;
						padding: 24px 0px;
						box-sizing: border-box;
						// overflow: hidden; //超出的文本隐藏
						// text-overflow: ellipsis; //用省略号显示
						// white-space: nowrap; //不换行

						.title {
							font-size: 16px;
							font-family: PingFang SC-Heavy, PingFang SC;
							font-weight: 800;
							color: #333333;
							line-height: 19px;
							margin-bottom: 4px;
						}

						.infos {
							height: 20px;
							font-size: 14px;
							font-family: PingFang SC-Medium, PingFang SC;
							font-weight: 500;
							color: #999999;
							line-height: 16px;
						}
					}

					.fen {
						height: 94px;
						font-size: 14px;
						font-family: Alfa Slab One-Regular, Alfa Slab One;
						font-weight: 400;
						color: #D11111;
						line-height: 94px;
					}

					.btn {
						width: 60px;
						height: 28px;
						background: #4BB4EF;
						border-radius: 14px 14px 14px 14px;
						font-size: 12px;
						font-family: PingFang SC-Bold, PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
						line-height: 28px;
						text-align: center;
						margin-top: 30px;
					}
				}
			}
		}
	}
</style>
