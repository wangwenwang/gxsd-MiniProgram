<template>
	<view class="content">
		<view class="cont">
			<view class="title">闭目回想写题纲</view>
			<image src="../../static/huixiang.png" mode=""></image>
			<view class="one" @click="dati">答题挑战</view>
			<view class="two" @click="again">再读一遍</view>
			<view class="three" @click="backs()">返回</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				urls:'testes'
			}
		},
		onLoad() {
			if(uni.getStorageSync('pan') == 2){
				uni.setNavigationBarTitle({
					title: uni.getStorageSync('classes').articleTitle + '（' + uni.getStorageSync('classes').wordCount + '）' + '字'
				})
			}else{
				uni.setNavigationBarTitle({
					title: uni.getStorageSync('classes').title + '（' + uni.getStorageSync('classes').wordCount + '）' + '字'
				})
			}
		
		},
		methods: {
			// 挑战
			dati(){
				uni.navigateTo({
					url:'/pages/test/testes'
				})
			},
			// 再来
			again(){
				// uni.navigateBack({
				// 	data:1
				// })
				uni.navigateTo({
					url:'read'
				})
			},
			// 返回
			backs(){
				// uni.switchTab({
				// 	url:'../index/index'
				// })
				uni.navigateBack({
					delta:3
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		padding: 40px;
		box-sizing: border-box;
		.cont{
			background: #FFFFFF;
			box-shadow: 0px 4px 4px 1px rgba(204, 204, 204, 0.25);
			border-radius: 8px 8px 8px 8px;
			padding: 30px;
			box-sizing: border-box;
			text-align: center;
			.title{
				height: 28px;
				font-size: 20px;
				font-family: PingFang SC-Heavy, PingFang SC;
				font-weight: 800;
				color: #333333;
				line-height: 28px;
				margin-bottom: 10px;
			}
			image{
				width: 150px;
				height: 150px;
				margin-bottom: 8px;
			}
			.one{
				height: 40px;
				background: #4BB4EF;
				border-radius: 90px 90px 90px 90px;
				font-size: 14px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 40px;
				text-align: center;
				margin-bottom: 20px;
			}
			.two{
				height: 40px;
				background: #79ABF8;
				border-radius: 90px 90px 90px 90px;
				font-size: 14px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 40px;
				text-align: center;
				margin-bottom: 20px;
			}
			.three{
				height: 40px;
				border-radius: 90px 90px 90px 90px;
				border: 1px solid #4BB4EF;
				box-sizing: border-box;
				font-size: 14px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #4BB4EF;
				line-height: 40px;
			}
		}
	}
</style>
