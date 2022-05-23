<template>
	<view class="content">
		<view class="title">读背要求</view>
		<view class="mode">
			<view class="xun" style="margin-right: 40px;" @click="xz(1)">
				<image v-if="xuanze == 1" src="../../static/xuan.png" mode=""></image>
				<image v-else src="../../static/weixuan.png" mode=""></image>
				<view class="name">朗诵</view>
			</view>
			<view class="xun" @click="xz(2)">
				<image v-if="xuanze != 1" src="../../static/xuan.png" mode=""></image>
				<image v-else src="../../static/weixuan.png" mode=""></image>
				<view class="name">背诵</view>
			</view>
		</view>
		<view class="luyin">
			<!-- <view class="tit">范读</view> -->
			<!-- <image src="../../static/kaishi.png" mode=""></image> -->
			<WzsAudio music="http://www.yinpin.com/upload/ninhaoganxienindelaidian0306001j.mp3" image="" title="范读" :autoplay="false"></WzsAudio>
		</view>
		<view class="title">读背内容</view>
		<view class="paragraph">
			<view class="xun" @click="quanbu">
				<image v-if="quan == 1" src="../../static/xuan.png" mode=""></image>
				<image v-else src="../../static/weixuan.png" mode=""></image>
				<view class="name">全选</view>
			</view>
			<view class="duanluo">共{{leng}}段，已选{{arr.length}}段</view>
		</view>
		<view class="duan" @click="duanluo(index)" v-for="(item,index) in rw" :key='index'>
			<image v-if="arr.indexOf(index) != -1" src="../../static/xuan.png" mode=""></image>
			<image v-else src="../../static/weixuan.png" mode=""></image>
			<view class="name" v-html="item.title"></view>
		</view>
		<view class="btn" @click="kaishi">开始朗诵</view>
	</view>
</template>

<script>
	import WzsAudio from '@/components/WZS-Audio/WZS-Audio.vue'
	export default {
		data() {
			return {
				xuanze:1,
				leng:'',
				rw:[],
				arr:[],
				quan:0,
				articleId:''
			}
		},
		onLoad(e) {
			this.articleId = e.articleId
			// 91.APP通过文章ID、任务ID、学生ID查询文章
			this.$request('/gxsd-prod/read/appRead/getArticlesByTaskAndStudentId', {
				articleId: e.articleId,
				questionStockTitle: "朗诵背诵",
				readTypeTwo: "自主朗诵",
				studentId: uni.getStorageSync('login').userId
			}, 'POST').then(res => {
				console.log(res, '91.APP通过文章ID、任务ID、学生ID查询文章')
				if (res.code == 200) {
					this.leng = res.data.stockList[0].topicList.length
					this.rw = res.data.stockList[0].topicList
					console.log(this.rw)
				} else if(res.code == 402){
					uni.showToast({
						title:res.message + '请重新登录！',
						icon:'none'
					})
					setTimeout(function() {
						uni.navigateTo({
							url:'../login/login'
						})
					}, 500);
				}
			})
		},
		components:{ WzsAudio },
		methods: {
			// 选择是否训练实战
			xz(e){
				this.xuanze = e
			},
			// 全部
			quanbu(){
				if(this.quan == 0){
					this.quan = 1
					for(var a = 0;a < this.rw.length;a++){
						console.log(a)
						this.arr.push(a)
					}
				}else{
					this.quan = 0
					this.arr = []
				}
				console.log(this.quan,'quan')
				console.log(this.arr)
			},
			// 段落选择
			duanluo(index){
				console.log(this.arr.indexOf(index))
				if(this.arr.indexOf(index) == -1){
					this.arr.push(index)
				}else{
					console.log('取消当前这个')
					this.arr.splice(this.arr.indexOf(index), 1)
				}
				console.log(this.arr)
				console.log(this.arr.length)
				if(this.arr.length == this.leng){
					this.quan = 1
				}
			},
			kaishi(){
				uni.setStorageSync('lengths',this.arr)
				uni.navigateTo({
					url:'Recite?articleId=' + this.articleId
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		padding: 20px 15px;
		box-sizing: border-box;
		.title{
			height: 20px;
			font-size: 14px;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #666666;
			line-height: 20px;
			margin-bottom: 20px;
		}
		.mode{
			display: flex;
			height: 40px;
			margin-bottom: 28px;
			.xun{
				display: flex;
				image{
					width: 20px;
					height: 20px;
					margin-right: 10px;
				}
				.name{
					height: 20px;
					font-size: 14px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 20px;
				}
			}
		}
		.luyin{
			// height: 50px;
			background: #F2F2F2;
			border-radius: 8px 8px 8px 8px;
			padding: 15px 20px;
			box-sizing: border-box;
			display: flex;
			margin-bottom: 40px;
			.tit{
				height: 20px;
				font-size: 14px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 20px;
				margin-right: 20px;
			}
			image{
				width: 20px;
				height: 20px;
			}
		}
		.paragraph{
			margin-bottom: 16px;
			display: flex;
			justify-content: space-between;
			.xun{
				display: flex;
				image{
					width: 20px;
					height: 20px;
					margin-right: 10px;
				}
				.name{
					height: 20px;
					font-size: 14px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 20px;
				}
			}
			.duanluo{
				height: 20px;
				font-size: 12px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #4BB4EF;
				line-height: 20px;
			}
		}
		.duan{
			display: flex;
			image{
				width: 20px;
				height: 20px;
				margin-right: 10px;
			}
			.name{
				width: 80%;
				padding: 20px;
				box-sizing: border-box;
				font-size: 14px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 20px;
			}
		}
		.btn{
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
