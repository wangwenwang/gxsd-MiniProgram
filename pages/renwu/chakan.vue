<template>
	<view class="content">
		<image class="headbg" src="../../static/renbg.png" mode=""></image>
		<view class="" style="position: fixed;top: 5vh;left: 15px;font-size: 18px;font-family: PingFang SC-Bold, PingFang SC;font-weight: bold;color: #FFFFFF;">
			<u-icon name="arrow-left" color="#ffffff" size="28"></u-icon>
		</view>
		<view class="head">
			<view class="title">你的成绩<text style="color: #D11111;margin-left: 10px;">88分</text></view>
			<image src="../../static/daan.png" mode=""></image>
		</view>
		<view class=""></view>
		<view class="btns">点击查看答案</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.content{
		.headbg{
			position: fixed;
			top: 0px;
			width: 100%;
			height: 160px;
			z-index: -100;
		}
		.head{
			width: 95vw;
			margin: 90px auto 12px;
			display: flex;
			justify-content: space-between;
			padding: 25px;
			box-sizing: border-box;
			text-align: center;
			background: #FFFFFF;
			box-shadow: 0px 4px 4px 1px rgba(204, 204, 204, 0.25);
			border-radius: 8px 8px 8px 8px;
			.title{
				display: flex;
				justify-content: space-between;
				height: 44px;
				font-size: 18px;
				font-family: PingFang SC-Heavy, PingFang SC;
				font-weight: 800;
				color: #333333;
				line-height: 44px;
			}
			image{
				width: 44px;
				height: 44px;
			}
		}
		.btns{
			width: 240px;
			height: 40px;
			border-radius: 90px 90px 90px 90px;
			border: 1px solid #4BB4EF;
			box-sizing: border-box;
			font-size: 14px;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #4BB4EF;
			text-align: center;
			line-height: 40px;
			margin: 0 auto;
		}
	}
</style>
