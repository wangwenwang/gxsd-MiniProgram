<template>
	<view class="content">
		<view class="head">
			<view class="name">【单选】</view>
			<!-- <u-count-down :time="600 * 1000" format="mm:ss" autoStart millisecond @change="onChange" @finish='finish' ref="countDown">
				<view class="times">{{ timeData.minutes }}:{{ timeData.seconds }}</view>
			</u-count-down> -->
			<smh-timer ref="timer" @timing="timing" :auto="true"></smh-timer>
			<!-- <view class="times">00:10:24</view> -->
		</view>
		<view class="cont">
			<view class="title">{{numbers}}/{{lengths}}  {{list.title}}</view>
			<view class="xuanxiang">
				<!-- 单选 -->
				<view :class="correctAnswer == ''?'box':youwu == 1?list.questionOneVal == correctAnswers?'boxdui':'boxcuo':'box'" @click="xuan(list.questionOneVal,1,list.correctAnswer)" v-if="list.questionOneKey != ''">
					<view class="boxs">A.&nbsp;&nbsp;{{list.questionOneKey}}</view>
					<view class="boxs" v-if="correctAnswer != ''&&youwu == 1&&list.questionOneVal == correctAnswers">
						<u-icon name="checkmark" color='#FFFFFF' size='20px'></u-icon>
					</view>
					<view class="boxs" v-if="correctAnswer != ''&&youwu == 1&&list.questionOneVal != correctAnswers">X</view>
				</view>
				<view :class="correctAnswer == ''?'box':youwu == 2?list.questionTwoVal == correctAnswers?'boxdui':'boxcuo':'box'" @click="xuan(list.questionTwoVal,2,list.correctAnswer)" v-if="list.questionTwoKey != ''">
					<view class="boxs">B.&nbsp;&nbsp;{{list.questionTwoKey}}</view>
					<view class="boxs" v-if="correctAnswer != ''&&youwu == 2&&list.questionTwoVal == correctAnswers">
						<u-icon name="checkmark" color='#FFFFFF' size='20px'></u-icon>
					</view>
					<view class="boxs" v-if="correctAnswer != ''&&youwu == 2&&list.questionTwoVal != correctAnswers">X</view>
				</view>
				<view :class="correctAnswer == ''?'box':youwu == 3?list.questionThreeVal == correctAnswers?'boxdui':'boxcuo':'box'" @click="xuan(list.questionThreeVal,3,list.correctAnswer)" v-if="list.questionThreeKey != ''">
					<view class="boxs">C.&nbsp;&nbsp;{{list.questionThreeKey}}</view>
					<view class="boxs" v-if="correctAnswer != ''&&youwu == 3&&list.questionThreeVal == correctAnswers">
						<u-icon name="checkmark" color='#FFFFFF' size='20px'></u-icon>
					</view>
					<view class="boxs" v-if="correctAnswer != ''&&youwu == 3&&list.questionThreeVal != correctAnswers">X</view>
				</view>
				<view :class="correctAnswer == ''?'box':youwu == 4?list.questionFourVal == correctAnswers?'boxdui':'boxcuo':'box'" @click="xuan(list.questionFourVal,4,list.correctAnswer)" v-if="list.questionFourKey != ''">
					<view class="boxs">D.&nbsp;&nbsp;{{list.questionFourKey}}</view>
					<view class="boxs" v-if="correctAnswer != ''&&youwu == 4&&list.questionFourVal == correctAnswers">
						<u-icon name="checkmark" color='#FFFFFF' size='20px'></u-icon>
					</view>
					<view class="boxs" v-if="correctAnswer != ''&&youwu == 4&&list.questionFourVal != correctAnswers">X</view>
				</view>
				<view :class="correctAnswer == ''?'box':youwu == 5?list.questionFiveVal == correctAnswers?'boxdui':'boxcuo':'box'" @click="xuan(list.questionFiveVal,5,list.correctAnswer)" v-if="list.questionFiveKey != ''">
					<view class="boxs">E.&nbsp;&nbsp;{{list.questionFiveKey}}</view>
					<view class="boxs" v-if="correctAnswer != ''&&youwu == 5&&list.questionFiveVal == correctAnswers">
						<u-icon name="checkmark" color='#FFFFFF' size='20px'></u-icon>
					</view>
					<view class="boxs" v-if="correctAnswer != ''&&youwu == 5&&list.questionFiveVal != correctAnswers">X</view>
				</view>
				<!-- 多选 -->
				<!-- <view class="box">
					<view class="boxs">A</view>
					<view class="boxs">作者实写丁香花的形象，虚写寄托于丁香花的理念、志趣，创造出一个深远的意境。</view>
				</view> -->
				<!-- 简答 -->
				<!-- <textarea value="" placeholder="请填写你的答案..." /> -->
				<!-- 填空 -->
				<!-- <view class="tian">
					<input type="text" value="" placeholder="填空一" />
				</view> -->
			</view>
		</view>
		<!-- <view class="btn">
			<view class="btnone" @click="go()">下一题</view>
			<view class="btntwo">上一题</view>
		</view> -->
	</view>
</template>

<script>
	import { formatDate } from '@/common/formatDate.js'
	export default {
		data() {
			return {
				timeData: {},
				zong:[],
				list:{},
				correctAnswer:'',
				correctAnswers:'',
				youwu:'',
				a:0,
				articleId:'',
				numbers:1,
				lengths:0,
				correct:0,
				stttt:0,
				endttt:0,
				timestamp1:0,
				timestamp2:0,
				d_list:[],//答题记录
			}
		},
		onLoad() {
			this.stttt = formatDate('YY-MM-DD hh:mm:ss')
			this.timestamp1 = Date.parse(this.stttt)
			uni.setStorageSync('timestamp1',this.timestamp1)
			// console.log(this.timestamp1,'timestamp1')
			uni.setNavigationBarTitle({
				title: uni.getStorageSync('classes').title + '（' + uni.getStorageSync('classes').wordCount + '）' + '字'
			})
			if(uni.getStorageSync('pan') == 2){
				uni.setNavigationBarTitle({
					title: uni.getStorageSync('classes').articleTitle + '（' + uni.getStorageSync('classes').wordCount + '）' + '字'
				})
				//this.articleId = uni.getStorageSync('classes').articleId
			}
			// console.log(uni.getStorageSync('tmzs').stockList[0].topicList,'length')
			this.zong = uni.getStorageSync('tmzs').stockList[0].topicList
			this.lengths = this.zong.length
			this.list = this.zong[0]
			this.correctAnswers = this.zong[0].correctAnswer
			if(uni.getStorageSync('pan') == 1){
				this.articleId = uni.getStorageSync('classes').id
			}else{
				this.articleId = uni.getStorageSync('classes').articleId
			}
		},
		methods: {
			// 计时时间
			timing(e){
				// console.log(e)
			},
			// onChange(e) {
			// 	this.timeData = e
			// },
			go(){
				uni.navigateTo({
					url:'/pages/test/outcome'
				})
			},
			xuan(xuanxiang,e,Answer){
				var key=this.a;
				var  topicList=this.zong;//全部题信息
				
				
				
				console.log(topicList,'题信息');
				
				
				var t_info=topicList[key];
				console.log(t_info,'题信息2');
				
				// console.log(xuanxiang == Answer,'判断是否正确')
				var  result='NOT_PASS';
				if(xuanxiang == Answer){
					this.correct += 1;
					 result='PASS';
				}
				this.correctAnswer = xuanxiang
				this.youwu = e
				var that = this;
				if(uni.getStorageSync('pan') == 2){
					var item =  uni.getStorageSync('classes');
					  // 学生任务id
					var taskStudentId = item.taskStudentId
					  // 任务id
					 var taskId = item.taskId
					 var data_info={
						 TaskTopicStudentId:uni.getStorageSync('tmzs').stockList[0].id,//
						 answer: xuanxiang,
						 answerVal: xuanxiang,
						 result: result,
						 studentId: uni.getStorageSync('login').userId,
						 taskId: taskId,
						 taskStudentId: taskStudentId,
						 topicId: this.list.id,
					 }
					 this.d_list.push(data_info);
					
				}
				//var that=this;
				setTimeout(function() {
					// console.log(that.a,'aaaaaaa')
					if(that.a < uni.getStorageSync('tmzs').stockList[0].topicList.length - 1){
						that.a += 1
						that.list = that.zong[that.a]
						that.correctAnswers = that.zong[that.a].correctAnswer
						that.correctAnswer = ''
						that.youwu = ''
						if(that.numbers < that.lengths){
							that.numbers += 1
						}
						
						if(that.a==1){
							//第一页 传开始阅读信息
							// var psot_data={
							// 	studentId:uni.getStorageSync('login').userId,
							// 	readDate:formatDate('YY-MM-DD'),
							// 	articleId:that.articleId,
							// 	readType:'训练',
							// 	startDate:formatDate('YY-MM-DD hh:mm:ss'),
							// 	readFinishFlag:'F',
							// 	trainSpeed: uni.getStorageSync('sudu'),
							// 	readTimes:1,
							// 	bookOrArticle:'ARTICLE',
							// 	bookCharpterId:0,
							// 	readTypeTwo:'自主阅读',
							// 	id: "3378",
							// 	readTime: 136,
							// };
							
						}
					}else{
						console.log('打印答题信息',that.d_list);
						// console.log(that.correct)
						// console.log(that.lengths)
						// console.log(that.correct/that.lengths)
						console.log('已经是最后一题了')
						this.endttt = formatDate('YY-MM-DD hh:mm:ss')
						this.timestamp2 = Date.parse(this.endttt.replace(/-/g, '/'))
						console.log(uni.getStorageSync('timestamp1'),'timestamp1')
						console.log(this.timestamp2,'timestamp2')
						
						var open_time=uni.getStorageSync('open_time');//开始读题的时间
							open_time=Date.parse(open_time.replace(/-/g, '/'));
							
							var time1=uni.getStorageSync('time1');//开始阅读的时间
								time1=Date.parse(time1.replace(/-/g, '/'));
							
							var time2=uni.getStorageSync('time2');//结束阅读的时间
								time2=Date.parse(time2.replace(/-/g, '/'));
							var time3=this.endttt; //提交答案的时间
								time3=Date.parse(time3.replace(/-/g, '/'));
						
						
						
						// 19.记录单篇阅读明细存折(第三个)
						var page_count_wait= uni.getStorageSync('page_count_wait');
						console.log(page_count_wait,'page_count_wait');
						console.log( ((time2-time1)/1000  - page_count_wait ).toString());
						var post_data= {
							articleId: that.articleId,
							articleOrBook: "ARTICLE",
							bookCharpterId: uni.getStorageSync('tmzs').stockList[0].id,
							bookOrArticle: "ARTICLE",
							checkAccuracyRate: (Math.round(that.correct / that.lengths * 100)).toString(),//成绩
							checkRightTopic: that.correct,//检测正确答题数
							checkTopic: that.zong.length,//检测答题数；单篇试题数量
							checkTopicTime: ((time3 - time2) / 1000).toString(),//检测答题时间   检测答题所用的时间
							endDate: formatDate('YY-MM-DD hh:mm:ss'),
							id: uni.getStorageSync('recordReadDetailBook1').id,
							readDate: formatDate('YY-MM-DD'),
							readFinishFlag: "T",
							readTime: ((time2-time1)/1000  - page_count_wait ).toString(),
							readTimes: 1,
							readTopicTime:((time1-open_time)/1000).toString() ,//读题时间
							readType: uni.getStorageSync('xun'),
							readTypeTwo: "自主阅读",
							score: (Math.round(that.correct / that.lengths * 100)).toString(),//成绩
							startDate: uni.getStorageSync('recordReadDetailBook1').startDate,
							studentId: uni.getStorageSync('login').userId,
							trainSpeed: uni.getStorageSync('sudu'),
							wordCount: uni.getStorageSync('tmzs').wordCount
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
								 taskStudent.readTime = ((time2-time1)/1000  - page_count_wait ).toString();
								 taskStudent.answerTime=((time3 - time2) / 1000).toString();
							 //  }
							  // 学生相关信息
							  post_data.taskStudent = taskStudent
							  post_data.readTypeTwo = `任务阅读`
							  post_data.taskTopicStudent=that.d_list
						}
						
						console.log(post_data);
						that.$request('/gxsd-prod/read/appRead/recordReadDetailBook',post_data,'POST').then(res => {
							console.log(res, '19.记录单篇阅读明细存折(第三个)')
							if(res.code == 200){
								uni.setStorageSync('recordReadDetailBook3',res.data)
								uni.showToast({
									title:'正在计算请稍等',
									icon:'none'
								})
								console.log(that.correct)
								setTimeout(function() {
									uni.reLaunch({
										url:'./outcome'
									})
								}, 1000)
							}
						})
					}
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	.content{
		padding: 10px 15px;
		box-sizing: border-box;
		.head{
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;
			.name{
				height: 25px;
				font-size: 16px;
				font-family: PingFang SC-Heavy, PingFang SC;
				font-weight: 800;
				color: #4BB4EF;
				line-height: 25px;
			}
			.times{
				height: 25px;
				font-size: 18px;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #4BB4EF;
				line-height: 25px;
			}
		}
		.cont{
			padding: 20px;
			box-sizing: border-box;
			.title{
				margin-bottom: 20px;
				font-size: 16px;
				font-family: PingFang SC-Heavy, PingFang SC;
				font-weight: 800;
				color: #333333;
				line-height: 19px;
			}
			.xuanxiang{
				// 单选
				.box{
					padding: 10px;
					box-sizing: border-box;
					margin-bottom: 20px;
					background: #F2F2F2;
					border-radius: 8px 8px 8px 8px;
					display: flex;
					justify-content: space-between;
					.boxs{
						font-size: 14px;
						font-family: PingFang SC-Bold, PingFang SC;
						font-weight: bold;
						color: #333333;
					}
				}
				.boxcuo{
					padding: 10px;
					box-sizing: border-box;
					margin-bottom: 20px;
					background: #D11111;
					border-radius: 8px 8px 8px 8px;
					display: flex;
					justify-content: space-between;
					.boxs{
						font-size: 14px;
						font-family: PingFang SC-Bold, PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
					}
				}
				.boxdui{
					padding: 10px;
					box-sizing: border-box;
					margin-bottom: 20px;
					background: #0CBC48;
					border-radius: 8px 8px 8px 8px;
					display: flex;
					justify-content: space-between;
					.boxs{
						font-size: 14px;
						font-family: PingFang SC-Bold, PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
					}
				}
				// 多选
				// .box{
				// 	padding: 10px;
				// 	box-sizing: border-box;
				// 	margin-bottom: 20px;
				// 	background: #4BB4EF;
				// 	border-radius: 8px 8px 8px 8px;
				// 	display: flex;
				// 	justify-content: space-between;
				// 	.boxs{
				// 		height: 60px;
				// 		font-size: 14px;
				// 		font-family: PingFang SC-Bold, PingFang SC;
				// 		font-weight: bold;
				// 		color: #FFFFFF;
				// 	}
				// }
				// 简答
				textarea{
					background: #F2F2F2;
					border-radius: 8px 8px 8px 8px;
					padding: 20px;
					box-sizing: border-box;
					font-size: 14px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #999999;
					line-height: 16px;
					width: 100%;
				}
				// 填空
				.tian{
					input{
						padding: 20px;
						box-sizing: border-box;
						height: 60px;
						border-radius: 8px;
						font-size: 14px;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #999999;
						line-height: 20px;
						margin-bottom: 20px;
					}
				}
			}
		}
		.btn{
			position: fixed;
			bottom: 20px;
			left: 10vw;
			.btnone{
				width: 80vw;
				height: 40px;
				background: #4BB4EF;
				border-radius: 90px 90px 90px 90px;
				text-align: center;
				font-size: 14px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 40px;
				margin-bottom: 20px;
			}
			.btntwo{
				border: 1px solid #4BB4EF;
				box-sizing: border-box;
				width: 80vw;
				height: 40px;
				background: #FFFFFF;
				border-radius: 90px 90px 90px 90px;
				text-align: center;
				font-size: 14px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #4BB4EF;
				line-height: 40px;
			}
		}
	}
</style>
