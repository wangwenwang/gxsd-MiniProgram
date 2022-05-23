<template>
	
	<view class="content">
			<u-navbar
			           
			           @leftClick="right"
			           :autoBack="false"
					   style="background-color: rgba(0,0,0,0);"
			       >
			       </u-navbar>
<!-- 		<view><img src="../../static/zuo.png" alt="" style="width: 10px;height: 10px;"></view> -->
		<image class="headbg" src="../../static/mybg.png" mode=""></image>
		
		<view class="cont">
			<view class="head">
				<view class="title">{{obj.title}}</view>
				<view class="nian">{{obj.grade}}</view>
			</view>
			<view class="end">
				<view class="box">
					<view class="num">{{obj.wordCount}}字</view>
					<view class="nums" style='margin-bottom: 46px;'>字数</view>
					<view class="num">{{obj.trainSpeed}}字</view>
					<view class="nums">阅读速度(字/分钟)</view>
				</view>
				<view class="box">
					<view class="num">{{obj.checkAccuracyRate}}%</view>
					<view class="nums" style='margin-bottom: 46px;'>正确率</view>
					<view class="num">{{obj.readTimes}}次</view>
					<view class="nums">阅读次数</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj:{},
				background:{backgroundColor: '#ffffff',}, //导航栏背景
			}
		},
		onLoad() {
			// uni.setNavigationBarTitle({
			// 	title: uni.getStorageSync('classes').title + '（' + uni.getStorageSync('classes').wordCount + '）' + '字'
			// })
			// if(uni.getStorageSync('pan') == 2){
			// 	uni.setNavigationBarTitle({
			// 		title: uni.getStorageSync('classes').articleTitle + '（' + uni.getStorageSync('classes').wordCount + '）' + '字'
			// 	})
			// 	//this.articleId = uni.getStorageSync('classes').articleId
			// }
		},
		onShow() {
			this.obj = uni.getStorageSync('recordReadDetailBook3')
			console.log(this.obj)
		},
		methods: {
			right() {
			            console.log('rightClick');
						if(uni.getStorageSync('pan') == 2){
							console.log(2)
							uni.switchTab({
								url:'/pages/renwu/renwu'
							})
						}else{
							uni.switchTab({
								url:'/pages/index/index'
							})
							console.log(1)
						}
			},
			// 返回
			backs(){
				
				// uni.navigateBack({
				// 	delta:3
				// })
			}
		}
	}
</script>

<style lang="scss">
	.content{
		.headbg{
			position: fixed;
			top: 90px;
			width: 100%;
			height: 130px;
			z-index: -100;
		}
		.cont{
			width: 95vw;
			margin: 120px auto 0;
			padding: 20px;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 8px 8px 8px 8px;
			.head{
				height: 80px;
				text-align: center;
				border-bottom: 1px solid #F2F2F2;
				margin-bottom: 20px;
				.title{
					height: 25px;
					font-size: 18px;
					font-family: PingFang SC-Heavy, PingFang SC;
					font-weight: 800;
					color: #333333;
					line-height: 25px;
					margin-bottom: 10px;
				}
				.nian{
					height: 20px;
					font-size: 14px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #666666;
					line-height: 20px;
				}
			}
			.end{
				display: flex;
				justify-content: space-between;
				text-align: center;
				.box{
					width: 50%;
					.num{
						height: 28px;
						font-size: 20px;
						font-family: PingFang SC-Heavy, PingFang SC;
						font-weight: 800;
						color: #333333;
						line-height: 28px;
						margin-bottom: 10px;
					}
					.nums{
						height: 22px;
						font-size: 16px;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #999999;
						line-height: 22px;
					}
				}
			}
		}
	}
</style>
