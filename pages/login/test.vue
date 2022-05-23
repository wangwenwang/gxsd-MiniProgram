<template>
	<view>
		<view class="container">
			<!-- <scroll-view :style="{'height':height+'px'}"> -->

			<view :animation="ani" :style="{'top':top+'px'}" @transitionend='animationend'
				style="z-index: 20000;position: absolute;left: 0rpx;width: 100%;   border: 1rpx solid red;">
				<image src="../../static/img.jpeg" mode=""></image>
			</view>
			<text class=""
				style="  width: 90%; text-align: center;background: #fff; color: #000;font-size: 40rpx; z-index: 1;">
				一排字一一排字一一排字一一排字一一排字一一排字一一排字一一排字一一排字一一排字一
			</text>
			<!-- </scroll-view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ani: "",
				height: 0,
				top: -200,
				animation: ""
			};
		},
		onLoad() {
			var _this = this;
			console.log("走了吗")
			_this.animation = uni.createAnimation({
				duration: 6000,
				timingFunction: 'linear',
				delay: 1000
			});
			console.log("第二步")
			_this.start(_this, 504);
		},
		methods: {
			animationend() {
				console.log("走了吗111")
				var _this = this;

				_this.top = "0"
				_this.animation.rotate(0, 0)
					.scale(1)
					.translate(0, 0)
					.skew(0, 0)
					.step({
						duration: 0
					})
				setTimeout(function() {
					_this.ani = _this.animation.export()
				}, 100)

				_this.$forceUpdate()
				setTimeout(function() {
					_this.start(_this, 504);
				}, 1500)
			},
			start(_this, height) {
				console.log("最后一步")
				_this.animation.translate(0, height).step()
				_this.ani = _this.animation.export()

			}

		}
	}
</script>

<style lang="scss">
	.img {}
</style>
