<template>
	<view class="content">
		<view class="head">
			<view class="imgbtn">
				<image src="../../static/logo.png" mode=""></image>
				<view class="btn">0分 未达标</view>
			</view>
			<view class="box" style="position: fixed;top: 40px;left: 16px;">
				<view class="weida">未达标</view>
				<view class="weidatit">完整度</view>
			</view>
			<view class="box" style="position: fixed;top: 40px;right: 16px;">
				<view class="weida">未达标</view>
				<view class="weidatit">流利度</view>
			</view>
			<view class="box" style="position: fixed;top: 120px;left: 30px;">
				<view class="weida">未达标</view>
				<view class="weidatit">声韵母</view>
			</view>
			<view class="box" style="position: fixed;top: 120px;right: 30px;">
				<view class="weida">未达标</view>
				<view class="weidatit">声调</view>
			</view>
		</view>
		<view class="cont">
			<view class="conts">
				<view class="headcont">
					<view class="" v-for="(item,index) in list" :key='index'>{{item}}</view>
				</view>
				<view class="headconts">
					<view class="" v-for="(item,index) in listone" :key='index'>{{item}}</view>
				</view>
				<view class="headconts">
					<view class="" v-for="(item,index) in listtwo" :key='index'>{{item}}</view>
				</view>
			</view>
			<view class="chongdu">
				<view class="cd">
					<view class="fen">1-5段<text style="margin-left: 10px;">0分</text></view>
					<view class="btn">重读</view>
				</view>
				<view class="zan">
					<!-- <image src="../../static/zanting.png" mode=""></image> -->
					<WzsAudio music="http://www.yinpin.com/upload/ninhaoganxienindelaidian0306001j.mp3" image="" title="范读" :autoplay="false"></WzsAudio>
				</view>
				<view class="neirong">一个大，一个小。一头黄牛一只猫。一边多，一边少。一群鸭子一只鸟。一个大，一个小。一个苹果一颗枣。一边多，一边小。一堆杏子一个桃。</view>
			</view>
		</view>
	</view>
</template>

<script>
	import WzsAudio from '@/components/WZS-Audio/WZS-Audio.vue'
	export default {
		data() {
			return {
				list:['段落','完整度','声韵母','流利度','声调','综合分'],
				listone:['1-5',0,0,0,0,0],
				listtwo:['总评',0,0,0,0,0],
			}
		},
		components:{WzsAudio},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.content{
		.head{
			width: 100%;
			height: 235px;
			background: #51ADE7;
			border-radius: 0px 0px 0px 0px;
			.imgbtn{
				padding-top: 30px;
				box-sizing: border-box;
				text-align: center;
				image{
					width: 80px;
					height: 80px;
					border-radius: 80px;
					margin-bottom: 10px;
				}
				.btn{
					width: 140px;
					height: 30px;
					background: #FFA927;
					border-radius: 90px 90px 90px 90px;
					font-size: 14px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 30px;
					margin: 0 auto;
					text-align: center;
				}
			}
			.box{
				text-align: center;
				.weida{
					width: 40px;
					height: 40px;
					background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
					font-size: 10px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					text-align: center;
					line-height: 40px;
					border-radius: 40px;
					margin-bottom: 2px;
				}
				.weidatit{
					height: 17px;
					font-size: 12px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 17px;
				}
			}
		}
		.cont{
			margin-top: -20px;
			background: #FFFFFF;
			border-radius: 8px 8px 0px 0px;
			padding: 20px 15px;
			box-sizing: border-box;
			.conts{
				margin-bottom: 12px;
				padding: 20px;
				box-sizing: border-box;
				background: #F7F7F7;
				.headcont{
					display: flex;
					justify-content: space-between;
					height: 24px;
					border-bottom: 1px solid #EBEBEB;
					view{
						height: 17px;
						font-size: 12px;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #666666;
						line-height: 17px;
					}
				}
				.headconts{
					display: flex;
					justify-content: space-between;
					height: 24px;
					view{
						height: 17px;
						font-size: 12px;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #666666;
						line-height: 17px;
					}
				}
			}
			.chongdu{
				padding: 20px;
				box-sizing: border-box;
				.cd{
					display: flex;
					justify-content: space-between;
					.fen{
						height: 20px;
						font-size: 14px;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 20px;
					}
					.btn{
						width: 60px;
						height: 30px;
						background: #4BB4EF;
						border-radius: 90px 90px 90px 90px;
						text-align: center;
						font-size: 14px;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 30px;
					}
				}
				.zan{
					// height: 46px;
					background: #FFFFFF;
					border-radius: 8px 8px 8px 8px;
					padding: 11px 0px;
					box-sizing: border-box;
					margin-bottom: 16px;
					// display: flex;
					// image{
					// 	width: 24px;
					// 	height: 24px;
					// 	margin-right: 10px;
					// }
				}
				.neirong{
					font-size: 14px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 26px;
				}
			}
		}
	}
</style>
