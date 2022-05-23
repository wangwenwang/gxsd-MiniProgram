<template>
	<view class="content">
		<view class="box">
			<u-count-down :time="60 * 1000" format="HH:mm:ss" autoStart millisecond @change="onChange" @finish='finish' ref="countDown">
				<view class="tops">{{ timeData.seconds }}</view>
			</u-count-down>
			<view class="cont">
				<view class="timu" v-for="(item,index) in list" :key='index'>
					<view class="title">{{index + 1}}.&nbsp;&nbsp;{{item.title}}</view>
					<view class="daan" v-if="item.questionOneKey != ''">A.&nbsp;&nbsp;{{item.questionOneKey}}</view>
					<view class="daan" v-if="item.questionTwoKey != ''">B.&nbsp;&nbsp;{{item.questionTwoKey}}</view>
					<view class="daan" v-if="item.questionThreeKey != ''">C.&nbsp;&nbsp;{{item.questionThreeKey}}</view>
					<view class="daan" v-if="item.questionFiveKey != ''">D.&nbsp;&nbsp;{{item.questionFiveKey}}</view>
				</view>
			</view>
			<view class="" style="width: 100%;height: 50px;"></view>
			<view class="btn" @click="goread">开始阅读</view>
		</view>
		
	</view>
</template>

<script>
	import { formatDate } from '@/common/formatDate.js'
	export default {
		data() {
			return {
				timeData: {},
				list: [],
				articleId:''
			}
		},
		onLoad() {
		 
			
		},
		onShow() {
			//两种情况这里用的标题不一样 要分开的 知道不!!!!
			if(uni.getStorageSync('pan') == 1){
				uni.setNavigationBarTitle({
					title: uni.getStorageSync('classes').title
				})
				this.articleId = uni.getStorageSync('classes').id
			}
			console.log(this.articleId ,111);
			if(uni.getStorageSync('pan') == 2){
				uni.setNavigationBarTitle({
					title: uni.getStorageSync('classes').articleTitle
				})
				this.articleId = uni.getStorageSync('classes').articleId
			}
			console.log(uni.getStorageSync('classes'));
			console.log(this.articleId ,222);
			console.log(formatDate('YY-MM-DD hh:mm:ss'),'当前时间')
			uni.setStorageSync('open_time',formatDate('YY-MM-DD hh:mm:ss'));
			// 题目展示60s
			// this.$refs.countDown.reset();
			this.$request('/gxsd-prod/read/appRead/getArticleById', {
				articleId: this.articleId
			}, 'POST').then(res => {
				console.log(res, '题目展示60s')
				if (res.code == 200) {
					if(res.data==null){
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
						return false;
					}else{
						uni.setStorageSync('tmzs', res.data)
						this.list = res.data.stockList[0].topicList
					}
					
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
		},
		methods: {
			onChange(e) {
				this.timeData = e
			},
			finish(){
				// 19.记录单篇阅读明细存折(第一个)
				this.$request('/gxsd-prod/read/appRead/recordReadDetailBook', {
					articleId: this.articleId,
					bookCharpterId: uni.getStorageSync('tmzs').id,
					bookOrArticle: "ARTICLE",
					readDate: formatDate('YY-MM-DD'),
					readFinishFlag: "F",
					readTimes: 1,
					readType: uni.getStorageSync('xun'),
					readTypeTwo: "自主阅读",
					startDate: formatDate('YY-MM-DD hh:mm:ss'),
					studentId: uni.getStorageSync('login').userId,
					trainSpeed: uni.getStorageSync('sudu')
				},'POST').then(res => {
					console.log(res, '19.记录单篇阅读明细存折(第一个)')
					if(res.code == 200){
						uni.setStorageSync('recordReadDetailBook1',res.data);
					}
				})
				uni.navigateTo({
					url: 'read'
				})
			},
			// 前往阅读
			goread() {
				this.$refs.countDown.pause();
				// 19.记录单篇阅读明细存折(第一个)
				var  datas=uni.getStorageSync('tmzs');
				uni.setStorageSync('time1',formatDate('YY-MM-DD hh:mm:ss'));
				var post_data={
					articleId: this.articleId,
					bookCharpterId: datas.stockList[0].id,
					bookOrArticle: "ARTICLE",
					readDate: formatDate('YY-MM-DD'),
					readFinishFlag: "F",
					readTimes: 1,
					readType: uni.getStorageSync('xun'),
					readTypeTwo: "自主阅读",
					startDate: formatDate('YY-MM-DD hh:mm:ss'),
					studentId: uni.getStorageSync('login').userId,
					trainSpeed: uni.getStorageSync('sudu')
				};
				
				if(uni.getStorageSync('pan') == 2){
					var item =  uni.getStorageSync('classes');
					var taskStudent = {}
					 post_data.taskStudentId = item.taskStudentId
					  // 学生任务id
					  taskStudent.taskStudentId = item.taskStudentId
					  // 任务id
					  taskStudent.taskId = item.taskId
					  // 用户id
					  taskStudent.studentId = uni.getStorageSync('login').userId;
					 //  if(is_first == false){
						// // 阅读时间
						taskStudent.readTime = '';//parseFloat(this.accum_total_time).toFixed(0)
					 //  }
					  // 学生相关信息
					  post_data.taskStudent = taskStudent
					  post_data.readTypeTwo = `任务阅读`
				}
				
				console.log(post_data);
				this.$request('/gxsd-prod/read/appRead/recordReadDetailBook',post_data ,'POST').then(res => {
					console.log(res, '19.记录单篇阅读明细存折(第一个)')
					if(res.code == 200){
						uni.setStorageSync('recordReadDetailBook1',res.data)
						//uni.setStorageSync('res_read_one',res.data);
					}
				})
				uni.navigateTo({
					url: 'read'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		height: 100vh;
		padding: 10px 15px;
		box-sizing: border-box;
		background-color: rgba(213, 213, 213, 0.4);
		.tops {
			text-align: right;
			height: 25px;
			font-size: 18px;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #4BB4EF;
			line-height: 25px;
			margin-bottom: 10px;
		}

		.cont {
			padding: 20px;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 8px;

			.timu {
				margin-bottom: 20px;
				border-bottom: 1px solid #d5d5d5;

				.title {
					font-size: 16px;
					font-family: PingFang SC-Heavy, PingFang SC;
					font-weight: 800;
					color: #333333;
					line-height: 19px;
					margin-bottom: 16px;
				}

				.daan {
					font-size: 14px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 20px;
					margin-bottom: 16px;
				}
			}
		}

		.btn {
			position: fixed;
			left: 5vw;
			bottom: 20px;
			width: 90vw;
			height: 48px;
			background: linear-gradient(180deg, #8ACCF1 0%, #4BB4EF 100%);
			box-shadow: 0px 4px 4px 1px rgba(11, 124, 187, 0.24);
			border-radius: 90px 90px 90px 90px;
			text-align: center;
			font-size: 16px;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 48px;
		}
	}
	.box{
		height: 100%;
	}
</style>
