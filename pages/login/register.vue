<template>
	<view class="content">
		<view class="title"></view>
		<view class="title" style="margin-bottom: 20px;">首次使用请先绑定账号</view>
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
		<view class="btn" @click="logins">关联</view>
		
		
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
			
		},
		methods: {
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
				console.log(uni.getStorageSync('login'),'看看这是什么');
				this.$request('/gxsd-prod/system/bindStudentOpenid', {
					account:this.phone,
					yzm:this.yzm,
					accountType:1,
					openId:uni.getStorageSync('login').openid
				}, 'POST').then(res => {
					console.log(res, '3.APP用户登录（关联）')
					//return;
					if (res.code == 200) {
						uni.setStorageSync('login',res.data);
						uni.showToast({
							title:res.message
						})
						setTimeout(function() {
							uni.switchTab({
								url:'../index/index'
							})
						}, 1000);
					}
				})
			},
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
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 16px;
		box-sizing: border-box;

		.title {
			font-size: 25px;
			height: 50px;
			line-height: 50px;
			font-weight: bold;
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
