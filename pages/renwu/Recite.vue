<template>
	<view class="content">
		<view class="head">段落{{leng}}/{{lengs}}</view>
		<view class="cont" v-for="(item,index) in rw" :key='index'>
			<view class="" v-html="item.title"></view>
		</view>
		<view class="" style="width: 100%;height: 200px;"></view>
		<view class="btn">
			<view class="miao">
				<image src="../../static/times.png" mode=""></image>
				<view class="times">00:20</view>
				<image src="../../static/times.png" mode=""></image>
			</view>
			<view class="btns">
				<view class="box">
					<image src="../../static/fandu.png" mode=""></image>
					<view class="">范读</view>
				</view>
				<view class="boxs">
					<image v-if='imgs == 1' src="../../static/luyin.png" @click="startRecord" mode=""></image>
					<image v-if='imgs == 2' src="../../static/jieshu.png" @click="endRecord" mode=""></image>
					<image v-if='imgs == 3' src="../../static/tijiao.png"  mode=""></image>
					<view class="">{{imgs == 1?'开始朗读':imgs == 2?'结束朗读':'提交'}}</view>
				</view>
				<view class="box">
					<image src="../../static/chongdu.png" mode=""></image>
					<view class="">重读</view>
				</view>
			</view>
			
			<!-- <view class="luyin">
				<WzsAudio music="http://www.yinpin.com/upload/ninhaoganxienindelaidian0306001j.mp3" image="" title="范读" :autoplay="true"></WzsAudio>
			</view>
			<view class="back" @click="goresult">返回朗诵</view> -->
		</view>
	</view>
</template>

<script>
	import WzsAudio from '@/components/WZS-Audio/WZS-Audio.vue'
	let recorderManager = uni.getRecorderManager();
	let innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				imgs:1,
				leng:'',
				rw:[],
				rws:[],
				rwid:[],
				leng:'',
				lengs:'',
				lengths:[]
			}
		},
		onLoad(e) {
			console.log(e)
			let that = this;
			recorderManager.onStop(function (res) {
				console.log(res.tempFilePath)
				that.voicePath = res.tempFilePath;
				uni.setStorageSync('path',that.voicePath)
			})
			// 91.APP通过文章ID、任务ID、学生ID查询文章
			that.$request('/gxsd-prod//read/appRead/getArticlesByTaskAndStudentId', {
				articleId: e.articleId,
				questionStockTitle: "朗诵背诵",
				readTypeTwo: "自主朗诵",
				studentId: uni.getStorageSync('login').userId
			}, 'POST').then(res => {
				console.log(res, '91.APP通过文章ID、任务ID、学生ID查询文章')
				if (res.code == 200) {
					that.leng = uni.getStorageSync('lengths').length		//选择段落长度
					that.lengs = res.data.stockList[0].topicList.length		//段落总长度
					// that.rw = res.data.stockList[0].topicList
					that.rws = uni.getStorageSync('lengths')
					for(var a = 0;a < res.data.stockList[0].topicList.length;a ++){
						// console.log(that.rws[a])
						that.rw.push(res.data.stockList[0].topicList[that.rws[a]])
						that.rwid.push(res.data.stockList[0].topicList[that.rws[a]].id)
						uni.setStorageSync('rwids',that.rwid)
					}
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
			console.log(uni.getStorageSync('rwids').length,99999999)
			// var as = []
			// for(var bb = 0;bb < that.rwid.length;bb ++){
			// 	console.log(bb,777888999)
			// }
			// as.push({topicId: })
			// console.log(as)
		},
		components:{WzsAudio},
		methods: {
			goresult(){
				uni.navigateTo({
					url:'result'
				})
			},
			// 开始录音
			startRecord() {
				console.log('开始录音');
				uni.showToast({
					title:'5S后开始录音，请做好准备',
					icon:'none'
				})
				let options = {//参数
					format: 'mp3',
				}
				setTimeout(function() {
					uni.showToast({
						title:'开始录音',
						icon:'none'
					})
					recorderManager.start(options);
				}, 5000);
				this.imgs = 2
			},
			// 录音结束
			endRecord() {
				console.log('录音结束');
				recorderManager.stop();
				this.imgs = 3
			}
		}
	}
</script>

<style lang="scss">
	.content{
		padding: 10px 0px;
		box-sizing: border-box;
		.head{
			height: 25px;
			font-size: 18px;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #4BB4EF;
			line-height: 25px;
			margin-bottom: 16px;
		}
		.cont{
			padding: 20px;
			box-sizing: border-box;
			font-size: 16px;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 26px;
		}
		.btn{
			position: fixed;
			bottom: 0px;
			width: 100vw;
			height: 200px;
			background: #FFFFFF;
			border-radius: 0px 0px 0px 0px;
			padding: 10px 16px;
			box-sizing: border-box;
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
			.back{
				margin: 0 auto;
				width: 80%;
				height: 40px;
				border-radius: 90px 90px 90px 90px;
				border: 1px solid #4BB4EF;
				box-sizing: border-box;
				text-align: center;
				font-size: 14px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #4BB4EF;
				line-height: 40px;
			}
			.miao{
				display: flex;
				justify-content: center;
				margin-bottom: 10px;
				image{
					width: 20px;
					height: 20px;
					margin: 0 10px;
				}
				.times{
					height: 20px;
					font-size: 14px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 20px;
				}
			}
			.btns{
				display: flex;
				justify-content: space-between;
				text-align: center;
				.box{
					margin-top: 20px;
					image{
						width: 40px;
						height: 40px;
						border-radius: 8px;
						margin-bottom: 14px;
					}
					view{
						height: 20px;
						font-size: 14px;
						font-family: PingFang SC-Bold, PingFang SC;
						font-weight: bold;
						color: #333333;
						line-height: 20px;
					}
				}
				.boxs{
					image{
						width: 60px;
						height: 60px;
						border-radius: 8px;
						margin-bottom: 14px;
					}
					view{
						height: 20px;
						font-size: 14px;
						font-family: PingFang SC-Bold, PingFang SC;
						font-weight: bold;
						color: #333333;
						line-height: 20px;
					}
				}
			}
		}
	}
</style>
