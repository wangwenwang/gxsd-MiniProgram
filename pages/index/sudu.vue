<template>
	<view class="content">
		<view class="title">速度范围（字/分钟）</view>
		<view class="cont">
			<view class=""
				style="width: 90%;height: 8px;background-color: rgba(75, 180, 239, 0.5);position: relative;top: 42px;left: 14px;z-index: -10;">
			</view>
			<view class="tiao" @click="dian(0)" :style="{width: tiaoWidth + 'px'}" style="top: 13px;left: 12px;"></view>
			<view class="tiao" @click="dian(1)" :style="{width: tiaoWidth + 'px',left: tiaoWidth + 12 + 'px'}"
				style="top: -37px;"></view>
			<view class="tiao" @click="dian(2)" :style="{width: tiaoWidth + 'px',left: tiaoWidth * 2 + 12 + 'px'}"
				style="top: -87px;"></view>
			<view class="tiao" @click="dian(3)" :style="{width: tiaoWidth - 4 + 'px',left: tiaoWidth * 3 + 12 + 'px'}"
				style="top: -137px;"></view>
			<view class="box">
				<view class="yuan" @click="dian(0)">
					<view :class="indexs == 0?'xuanze':'xuan'"></view>
					<view class="num">150</view>
				</view>
				<view class="yuan" @click="dian(1)">
					<view :class="inde == 1||indexs == 1?'xuanze':'xuan'"></view>
					<view class="num">1000</view>
				</view>
				<view class="yuan" @click="dian(2)">
					<view :class="inde == 2||indexs == 2?'xuanze':'xuan'"></view>
					<view class="num">3000</view>
				</view>
				<view class="yuan" @click="dian(3)">
					<view :class="inde == 3||indexs == 3?'xuanze':'xuan'"></view>
					<view class="num">5000</view>
				</view>
				<view class="yuan" @click="dian(4)">
					<view :class="inde == 4||indexs == 4?'xuanze':'xuan'"></view>
					<view class="num">25000</view>
				</view>
			</view>
		</view>
		
		<view class="" v-if="indexs == 0" style="position: absolute;top: 54px;left: 20px;">🚩</view>
		<view class="" v-if="inde == 1||indexs == 1" style="position: absolute;top: 54px;"
			:style="{left: tiaoWidth + 15 + 'px'}">🚩</view>
		<view class="" v-if="inde == 2||indexs == 2" style="position: absolute;top: 54px;"
			:style="{left: tiaoWidth * 2 + 14 + 'px'}">🚩</view>
		<view class="" v-if="inde == 3||indexs == 3" style="position: absolute;top: 54px;"
			:style="{left: tiaoWidth * 3 + 13 + 'px'}">🚩</view>
		<view class="" v-if="inde == 4||indexs == 4" style="position: absolute;top: 54px;"
			:style="{left: tiaoWidth * 4 + 15 + 'px'}">🚩</view>
		<view class="" style="width: 100%;height: 70px;"></view>
		<view class="title">速度调节（字/分钟）</view>
		<view class=""
			style="text-align: center;height: 25px;font-size: 18px;font-family: PingFang SC-Bold, PingFang SC;font-weight: bold;color: #333333;margin-bottom: 20px;">
			阅读速度{{nums}}字/分钟
		</view>
		<view class="jiajian">
			<view class="one" @click="jian">-</view>
			<!-- <view class="two">{{nums}}</view> -->
			<input type="number" class="two" v-model="nums">
			<!-- <input type="number" disabled class="two" v-model="nums"> -->
			<view class="three" @click="jia">+</view>
		</view>
		<view class="btn" @click="start">开始</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nums: 150,
				indexs: 0,
				inde: 1,
				numone: 150,
				numtwo: 1000,
				tiaoWidth: 0,
			}
		},
		watch: {
			nums() {
				if (this.nums < 150) {
					uni.showToast({
						title: '最小值为150哦~',
						icon: 'none'
					})
					setTimeout(() => {
						this.nums = 150
					}, 100)
				} else if (this.nums > 25000) {
					uni.showToast({
						title: '最大值为25000哦~',
						icon: 'none'
					})
					setTimeout(() => {
						this.nums = 25000
					}, 100)
				}
			}
		},
		onLoad() {
			console.log(this.nums, this.numone, this.numtwo)
			uni.getSystemInfo({
				success: res => {
					console.log(res, res.screenWidth, res.screenHeight)
					this.tiaoWidth = (res.screenWidth - 50) / 4
				}
			})
		},
		methods: {
			input(e) {
				// console.log(e.detail.value)
				if (e.detail.value <= 150) {
					uni.showToast({
						title: '最小值为150哦~',
						icon: 'none'
					})
					this.nums = 150
				} else if (e.detail.value >= 25000) {
					this.nums = 25000
					uni.showToast({
						title: '最大值为25000哦~',
						icon: 'none'
					})
				} else if (e.detail.value > 150 && e.detail.value < 1000) {
					this.nums = 150
				} else if (e.detail.value > 1000 && e.detail.value < 3000) {
					this.nums = 1000
				} else if (e.detail.value > 3000 && e.detail.value < 5000) {
					this.nums = 3000
				} else if (e.detail.value > 5000 && e.detail.value < 25000) {
					this.nums = 5000
				}
			},
			dian(index) {
				if (index == 0) {
					this.indexs = index
					this.inde = 1
					this.numone = 150
					this.numtwo = 1000
				} else if (index == 1) {
					this.indexs = index
					this.inde = 2
					this.numone = 1000
					this.numtwo = 3000
				} else if (index == 2) {
					this.indexs = index
					this.inde = 3
					this.numone = 3000
					this.numtwo = 5000
				} else if (index == 3) {
					this.indexs = index
					this.inde = 4
					this.numone = 5000
					this.numtwo = 25000
				} else if (index == 4) {
					this.indexs = index
					this.inde = 3
					this.numone = 5000
					this.numtwo = 25000
				}
				this.nums = this.numone
				console.log(this.nums, this.numone, this.numtwo)
			},
			jian() {
				// 150~1000
				if (this.numone == 150 && this.nums == 150) {
					uni.showToast({
						title: '当前已为最小值',
						icon: 'none'
					})
				} else if (this.numone == 150 && this.nums > 150) {
					this.nums -= 50
				} else if (this.numone == 1000 && this.nums == 1000) {
					// 1000~3000
					uni.showToast({
						title: '当前已为最小值',
						icon: 'none'
					})
				} else if (this.numone == 1000 && this.nums > 1000) {
					this.nums -= 100
				} else if (this.numone == 3000 && this.nums == 3000) {
					// 3000~5000
					uni.showToast({
						title: '当前已为最小值',
						icon: 'none'
					})
				} else if (this.numone == 3000 && this.nums > 3000) {
					this.nums -= 200
				} else if (this.numone == 5000 && this.nums == 5000) {
					// 5000~25000
					uni.showToast({
						title: '当前已为最小值',
						icon: 'none'
					})
				} else if (this.numone == 5000 && this.nums > 5000) {
					this.nums -= 200
				}
			},
			jia() {
				// 150~1000
				if (this.numtwo == 1000 && this.nums == 1000) {
					uni.showToast({
						title: '当前已为最大值',
						icon: 'none'
					})
				} else if (this.numtwo == 1000 && this.nums < 1000) {
					this.nums += 50
				} else if (this.numtwo == 3000 && this.nums == 3000) {
					// 1000~3000
					uni.showToast({
						title: '当前已为最大值',
						icon: 'none'
					})
				} else if (this.numtwo == 3000 && this.nums < 3000) {
					this.nums += 100
				} else if (this.numtwo == 5000 && this.nums == 5000) {
					// 3000~5000
					uni.showToast({
						title: '当前已为最大值',
						icon: 'none'
					})
				} else if (this.numtwo == 5000 && this.nums < 5000) {
					this.nums += 200
				} else if (this.numtwo == 25000 && this.nums == 25000) {
					// 5000~25000
					uni.showToast({
						title: '当前已为最大值',
						icon: 'none'
					})
				} else if (this.numtwo == 25000 && this.nums < 25000) {
					this.nums += 200
				}
			},
			// 选择阅读速度开始
			start() {
				console.log(this.nums)
				uni.setStorageSync('sudu', this.nums)
				this.$request('/gxsd-prod/read/appRead/getSpeedWordNumber', {
					speed: this.nums
				}, 'POST').then(res => {
					console.log(res, '选择阅读速度开始')
					if (res.code == 200) {
						uni.setStorageSync('zishu', res.data.wordNumber)
						uni.navigateTo({
							url: '../test/test'
						})
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
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 20px 15px;
		box-sizing: border-box;

		.title {
			height: 20px;
			font-size: 14px;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #666666;
			line-height: 20px;
			margin-bottom: 20px;
		}

		.cont {
			position: absolute;
			width: 92%;
			height: 64px;
			margin-top: -25px;

			.tiao {
				height: 50px;
				// background-color: #666666;
				position: relative;
			}

			.box {
				display: flex;
				justify-content: space-between;
				margin-top: -170px;

				.yuan {
					text-align: center;
					z-index: 100;

					.xuan {
						width: 16px;
						height: 16px;
						background: #4BB4EF;
						border-radius: 16px;
						margin-bottom: 8px;
						margin: 0 auto;
					}

					.xuanze {
						width: 16px;
						height: 16px;
						background: rgba(170, 224, 255, 1);
						border: 4px solid rgba(120, 120, 255, 1);
						box-sizing: border-box;
						border-radius: 16px;
						margin-bottom: 8px;
						margin: 0 auto;
					}

					.num {
						height: 17px;
						font-size: 12px;
						font-family: PingFang SC-Bold, PingFang SC;
						font-weight: bold;
						color: #000000;
						line-height: 17px;
					}
				}
			}
		}

		.jiajian {
			padding: 10px;
			box-sizing: border-box;
			width: 80vw;
			height: 60px;
			margin: 0 auto;
			background: linear-gradient(180deg, #79ABF8 0%, #3D95E7 100%);
			box-shadow: 0px 4px 7px 1px rgba(23, 99, 214, 0.4);
			border-radius: 12px 12px 12px 12px;
			display: flex;
			justify-content: space-between;

			.one {
				width: 15%;
				height: 40px;
				line-height: 40px;
				color: #FFFFFF;
				text-align: center;
			}

			.two {
				width: 70%;
				height: 40px;
				background: #FFFFFF;
				box-shadow: 0px 2px 4px 1px rgba(0, 40, 63, 0.15);
				border-radius: 12px 12px 12px 12px;
				line-height: 40px;
				text-align: center;
				font-size: 18px;
				font-family: PingFang SC-Heavy, PingFang SC;
				font-weight: 800;
				color: #333333;
			}

			.three {
				width: 15%;
				height: 40px;
				color: #FFFFFF;
				line-height: 40px;
				text-align: center;
			}
		}

		.btn {
			margin-top: 100px;
			height: 48px;
			background: linear-gradient(180deg, #8ACCF1 0%, #4BB4EF 100%);
			box-shadow: 0px 4px 4px 1px rgba(11, 124, 187, 0.24);
			border-radius: 90px 90px 90px 90px;
			font-size: 16px;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 48px;
			text-align: center;
		}
	}
</style>
