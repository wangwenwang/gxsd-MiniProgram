<template>
	<view class="content">
		<image class="headbg" src="../../static/renbg.png" mode=""></image>
		<view class="" :style="{top: top + 'vh',}" style="position: fixed;left: 15px;font-size: 18px;font-family: PingFang SC-Bold, PingFang SC;font-weight: bold;color: #FFFFFF;z-index: -10;">任务</view>
		<view class="box">
			<view class="head" :style="{margin: margintop + 'px  0px 0px 0px',}" style="padding-top: 2px; background-color: #f7f0f0; padding-bottom: 10px;">
			</view>
			<view class="head" style="margin:0px auto 20px; margin-left: 15px; margin-right: 15px; width: auto;">
				<view class="headbox" v-for="(item,index) in list" :key='index'>
					<view class="num">{{item.num}}</view>
					<view class="title">{{item.title}}</view>
				</view>
			</view>
			<view class="cont" v-for="(item,index) in rw" :key='index'>
				<view class="tit">{{item.date}}</view>
				<view class="boxs" @click="gostart(items.taskType,items.articleId,items.endTime,index,indexs)" v-for="(items,indexs) in item.detailList" :key='indexs'>
					<view class="dabiao">
						<view class=""></view>
						<view class="weida" v-if="items.score > 0&&items.score < items.passScore">未达标</view>
						<view class="da" v-if="items.score > 0&&items.score >= items.passScore">达标</view>
						<view class="guo" v-if="items.score == null && times > items.endTime">过期</view>
						<view class="guo" style="background-color: #FFFFFF;" v-if="items.score == null && times < items.endTime"></view>
					</view>
					<view class="biao">
						<view class="titles">{{items.taskDesc}}</view>
						<!-- <view class="Times">需读1遍</view> -->
					</view>
					<view class="fenshu">
						<view class="fenshuxian">阅读要求：{{items.readSpeed}}字每分钟</view>
						<view class="fenshuxian">{{items.passScore}}分达标</view>
						<view class="defen" v-if="items.score != null">{{items.score}}分</view>
					</view>
					<view class="btns">
						<view class="times">截至时间：{{items.endTime}}</view>
						<view class="btn" v-if="items.score == null && times < items.endTime">开始</view>
						<view class="btn" v-if="items.score != null && times < items.endTime">重读答题</view>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" :load-text="loadText"/>
	</view>
</template>

<script>
	import { formatDate } from '@/common/formatDate.js'
	export default {
		data() {
			return {
				list:[
					{
						num:'0',
						title:'总任务(次)'
					},
					{
						num:'0',
						title:'完成任务(次)'
					},
					{
						num:'0',
						title:'优秀任务(次)'
					}
				],
				rw:[],
				times:'',
				data:[],
				Width:0,
				Height:0,
				top:0,
				margintop:0,
				status: 'loadmore',
				currentPage:0,
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '加载完成'
				}
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					console.log(res, res.screenWidth, res.screenHeight)
					this.Width = res.screenWidth
					this.Height = res.screenHeight
					if(this.Height < 800){
						this.top = 4
						this.margintop = 80
					}else if(this.Height >= 800){
						this.top = 7
						this.margintop = 120
					}
				}
			})
		},
		onShow() {
			this.currentPage = 0
			this.times = formatDate('YY-MM-DD hh:mm:ss')
			// console.log(this.times)
			// 41.APP学生查询任务列表
			this.zhanshi()
		},
		onPullDownRefresh(){
			this.currentPage = 0
			this.zhanshi()
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			this.status = 'loading';
			this.currentPage = ++ this.currentPage;
			setTimeout(() => {
				this.zhanshi()
				console.log(this.currentPage);
				if(this.currentPage >= 1) this.status = 'nomore';
				else this.status = 'loading';
			}, 1000)
		},
		methods: {
			zhanshi(){
				// 41.APP学生查询任务列表
				this.$request('/gxsd-prod/read/task/getTaskListByStudent', {
					currentPage:this.currentPage,
					pageSize: 10,
					queryUnFinishTask: "queryUnFinishTask",
					taskDateStart: "2020-08-08 12:10:00",
					studentId: uni.getStorageSync('login').userId
				}, 'POST').then(res => {
					console.log(res, '41.APP学生查询任务列表')
					if (res.code == 200) {
						// uni.showToast({
						// 	title:res.message,
						// 	icon:'none'
						// })
						this.list[0].num = res.data.total
						this.list[1].num = res.data.finishQty
						this.list[2].num = res.data.goodQty
						this.rw = []
						// this.rw = res.data.taskList
						this.rw.push(...res.data.taskList)
						// this.rw = this.rw.concat(res.data.taskList)
						this.data=res.data.taskList;
						console.log('666666',this.data)
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
			gostart(taskType,articleId,endTime,k1,k2){
				uni.removeStorageSync('tmzs')
				uni.removeStorageSync('ind')
				uni.removeStorageSync('nian')
				uni.removeStorageSync('classes')
				uni.removeStorageSync('pan')
				uni.removeStorageSync('zishu')
				 
				var items=this.rw[k1].detailList[k2];
				 console.log(1111,items);
				 
				 
				 //return false;
				if(this.times > endTime){
					uni.showToast({
						title:'此任务已过期！',
						icon:'none'
					})
					return
				}
				// console.log(1123)
				if(taskType == 'RECIT'){
					uni.navigateTo({
						url:'start?articleId=' + articleId
					})
				}else{
					uni.setStorageSync('classes',items)
					uni.setStorageSync('pan',2)
					uni.setStorageSync('sudu', items.readSpeed);
					console.log('这是啥',items);
					this.$request('/gxsd-prod/read/appRead/getSpeedWordNumber', {
						speed: items.readSpeed
					}, 'POST').then(res => {
						console.log(res, '选择阅读速度开始')
						if (res.code == 200) {
							uni.setStorageSync('zishu',res.data.wordNumber)
							uni.navigateTo({
								url: '../test/test'
							})
						} else if (res.code == 4000) {
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
	}
</script>

<style lang="scss">
	page{
	  background: #f7f0f0;
	 }
	.content{
		.headbg{
			position: fixed;
			top: 0px;
			width: 100%;
			height: 190px;
			z-index: -100;
		}
		.box{
			width: 100%;
			background-color: #f7f0f0;
			border-radius: 8px;
			.head{
				width: 95vw;
				display: flex;
				justify-content: space-between;
				padding: 25px;
				box-sizing: border-box;
				text-align: center;
				background: #FFFFFF;
				box-shadow: 0px 4px 4px 1px rgba(204, 204, 204, 0.25);
				border-radius: 8px 8px 8px 8px;
				.headbox{
					.num{
						height: 25px;
						font-size: 18px;
						font-family: PingFang SC-Bold, PingFang SC;
						font-weight: bold;
						color: #333333;
						line-height: 25px;
						margin-bottom: 8px;
					}
					.title{
						height: 20px;
						font-size: 14px;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #999999;
						line-height: 20px;
					}
				}
			}
			.cont{
				padding: 0px 15px;
				box-sizing: border-box;
				.tit{
					height: 25px;
					font-size: 18px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #999999;
					line-height: 25px;
					margin-bottom: 12px;
				}
				.boxs{
					padding: 0px 10px 16px 10px;
					box-sizing: border-box;
					background: #FFFFFF;
					box-shadow: 0px 4px 4px 1px rgba(204, 204, 204, 0.5);
					border-radius: 8px 8px 8px 8px;
					margin-bottom: 20px;
					.dabiao{
						display: flex;
						justify-content: space-between;
						.weida{
							width: 60px;
							height: 25px;
							background: #D11111;
							border-radius: 0px 8px 0px 90px;
							line-height: 25px;
							font-size: 12px;
							font-family: PingFang SC-Bold, PingFang SC;
							font-weight: bold;
							color: #FFFFFF;
							text-align: center;
						}
						.da{
							width: 60px;
							height: 25px;
							background: #0CBC48;
							border-radius: 0px 8px 0px 90px;
							line-height: 25px;
							font-size: 12px;
							font-family: PingFang SC-Bold, PingFang SC;
							font-weight: bold;
							color: #FFFFFF;
							text-align: center;
						}
						.guo{
							width: 60px;
							height: 25px;
							background: #E6E6E6;
							border-radius: 0px 8px 0px 90px;
							line-height: 25px;
							font-size: 12px;
							font-family: PingFang SC-Bold, PingFang SC;
							font-weight: bold;
							color: #FFFFFF;
							text-align: center;
						}
					}
					.biao{
						margin-bottom: 10px;
						display: flex;
						.titles{
							height: 22px;
							font-size: 16px;
							font-family: PingFang SC-Bold, PingFang SC;
							font-weight: bold;
							color: #333333;
							line-height: 22px;
						}
						.Times{
							background: rgba(75, 180, 239, 0.2);
							border-radius: 0px 0px 0px 0px;
							padding: 0px 8px;
							box-sizing: border-box;
							height: 14px;
							font-size: 10px;
							font-family: PingFang SC-Medium, PingFang SC;
							font-weight: 500;
							color: #4BB4EF;
							line-height: 14px;
							margin-top: 5px;
						}
					}
					.fenshu{
						display: flex;
						justify-content: space-between;
						margin-top: -4px;
						.fenshuxian{
							height: 25px;
							font-size: 12px;
							font-family: PingFang SC-Bold, PingFang SC;
							font-weight: bold;
							color: #999999;
							line-height: 25px;
						}
						.defen{
							height: 25px;
							font-size: 18px;
							font-family: Alfa Slab One-Regular, Alfa Slab One;
							font-weight: 400;
							color: #D11111;
							line-height: 25px;
							margin-top: -10px;
						}
					}
					.btns{
						display: flex;
						justify-content: space-between;
						.times{
							height: 28px;
							font-size: 12px;
							font-family: PingFang SC-Bold, PingFang SC;
							font-weight: bold;
							color: #999999;
							line-height: 28px;
						}
						.btn{
							width: 80px;
							height: 28px;
							background: #4BB4EF;
							border-radius: 90px 90px 90px 90px;
							font-size: 12px;
							font-family: PingFang SC-Medium, PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
							line-height: 28px;
							text-align: center;
						}
					}
				}
			}
		}
	}
</style>
