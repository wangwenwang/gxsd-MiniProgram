<template>
	<view class="content">
		<view class="title">登录</view>
		<view class="user">
			<view class="tit">手机号</view>
			<input type="number" style="border-bottom: 1px solid #999999;" value="" v-model="phone" placeholder="请填写手机号" />
		</view>
		<view class="user">
			<view class="tit">验证码</view>
			<view class="useryan">
				<input type="text" style="border-bottom: 1px solid #999999;" value="" v-model="yzm" placeholder="请填写验证码" />
				<view class="yan" @tap="getCode">{{tips}}</view>
			</view>
		</view>
		<view class="btn" @click="logins">登录</view>

		<view class="imgs">
			<image src="../../static/weixin.png"  @click="getUserProfile" mode=""></image>
			<!-- <image src="../../static/register.png" mode="" @click="goregister"></image> -->
		</view>
		<!-- <button open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号码</button> -->

		<u-code :seconds="seconds" ref="uCode" @change="codeChange"></u-code>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips: '',
				seconds: 90,
				phone: '',
				yzm: '',
				lcode:''
			}
		},
		onLoad() {
			uni.setStorageSync('nian','');
		},
		methods: {
			// 获取手机号
			decryptPhoneNumber(e){
				console.log(e)
				return
				// console.log(e.detail.errMsg)
				// console.log(e.detail.iv)
				// console.log(e.detail.encryptedData)
				uni.request({
					url: this.baseUrl + "wechatData",
					method: 'POST',
					data: {
						iv:e.detail.iv,
						encryptedData:e.detail.encryptedData
					},
					header:{
						authorization:uni.getStorageSync('authorization')
					},
					success: res => {
						console.log(res,'微信获手机号(消息解密)')
						if(res.data.code==200){
							uni.showToast({
								title:res.data.msg
							})
							setTimeout(function() {
								uni.switchTab({
									url:'../index/index'
								})
							}, 500);
						}
					}
				})
			},
			// // 2.验证验证码是否正确
			// login() {
			// 	this.$request('/app/user/checkPhoneCode?phone=' + this.phone + '&code=' + this.yzm + '&type=3', {}, 'POST').then(res => {
			// 		console.log(res, '2.验证验证码是否正确')
			// 		if (res.code == 200) {
			// 			var that = this
			// 			setTimeout(function() {
			// 				that.logins()
			// 			}, 1000);
			// 		} else {
			// 			uni.showToast({
			// 				title: res.message,
			// 				icon: 'none'
			// 			})
			// 		}
			// 	})
			// },
			// 3.APP用户登录
			logins() {
				if (this.phone.trim() == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				if (this.yzm.trim() == '') {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return
				}
				this.$request('/gxsd-prod/read/readUser/login?account=' + this.phone + '&yzm=' + this.yzm + '&accountType=1&appType=微信小程序', {}, 'POST').then(res => {
					console.log(res, '3.APP用户登录')
					if (res.code == 200) {
						uni.setStorageSync('login', res.data)
						uni.showToast({
							title:res.message
						})
						setTimeout(function() {
							uni.switchTab({
								url:'../index/index'
							})
						}, 500);
					}
				})
			},
			// // 注册
			// goregister(){
			// 	uni.navigateTo({
			// 		url:'register'
			// 	})
			// },
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.phone.trim() == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					// 1.发送验证码
					this.$request('/gxsd-prod/app/user/sendPhoneCode?phone=' + this.phone + '&type=3', {}, 'POST').then(res => {
						console.log(res, '1.发送验证码')
						if (res.code == 200) {
							setTimeout(() => {
								uni.hideLoading();
								// 这里此提示会被this.start()方法中的提示覆盖
								uni.$u.toast('验证码已发送');
								// 通知验证码组件内部开始倒计时
								this.$refs.uCode.start();
							}, 1000);
						} else {
							uni.showToast({
								title: '请求失败',
								icon: 'none'
							})
						}
					})
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			getCodes() {
				var that = this
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes.code);
						// 获取用户信息
						that.lcode = loginRes.code
						uni.setStorageSync('lcode',loginRes.code)
					}
				});
			},
			getUserProfile(){
				// 获取code值
				this.getCodes()
				var that = this
				uni.getUserProfile({
					desc: '登录',
					success: function(res) {
						that.$request('/gxsd-prod/read/readUser/login?xcxCode=' + that.lcode + '&accountType=1', {},'GET').then(logins => {
							console.log(logins, 'wx登录')
							uni.setStorageSync('login', logins.data);
							if(logins.message == '请求成功！'){
								uni.showToast({
									title:logins.message,
									icon:'none'
								})
								setTimeout(function() {
									uni.switchTab({
										url:'../index/index'
									})
								}, 1000);
							}else{
								setTimeout(function() {
									uni.navigateTo({
										url:'register'
									})
								}, 1000);
							}
						})
					},
					fail: (fails) => {
						console.log(fails,'失败回调')
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 80px 16px;
		box-sizing: border-box;

		.title {
			font-size: 25px;
			height: 50px;
			line-height: 50px;
			font-weight: bold;
			margin-bottom: 20px;
		}

		.user {
			margin-bottom: 20px;

			.tit {
				height: 30px;
				font-size: 16px;
				font-family: PingFang SC-Heavy, PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 22px;
				margin-bottom: 10px;
			}

			input {
				height: 30px;
				font-size: 16px;
				font-family: PingFang SC-Heavy, PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 30px;
			}

			.useryan {
				display: flex;
				justify-content: space-between;

				input {
					width: 50%;
					height: 30px;
					font-size: 16px;
					font-family: PingFang SC-Heavy, PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 30px;
				}

				.yan {
					width: 40%;
					height: 30px;
					background-color: #4BB4EF;
					font-size: 16px;
					font-family: PingFang SC-Heavy, PingFang SC;
					font-weight: 500;
					color: #ffffff;
					line-height: 30px;
					text-align: center;
					border-radius: 8rpx;
				}
			}
		}

		.btn {
			width: 80vw;
			height: 48px;
			margin: 0 auto;
			background: linear-gradient(180deg, #8ACCF1 0%, #4BB4EF 100%);
			box-shadow: 0px 4px 4px 1px rgba(11, 124, 187, 0.24);
			border-radius: 90px 90px 90px 90px;
			text-align: center;
			font-size: 16px;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 48px;
			margin-bottom: 50px;
		}

		.imgs {
			width: 50%;
			height: 40px;
			line-height: 40px;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			image {
				width: 40px;
				height: 40px;
				border-radius: 40px;
			}
		}
	}
</style>
