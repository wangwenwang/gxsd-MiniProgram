<template>
	<view class="content">
		<!-- <view class="imgs" @click="goread">
			<image src="../../static/read.png" mode=""></image>
		</view> -->
		<view  :animation="animation" :style="{'top':top+'vh'}" @transitionend='animationend'
			style="z-index: 20000;position: absolute;left: 0rpx;width: 100vw;height: 100vh;background-color: #ffffff;">
			<!-- <canvas canvas-id="firstCanvas" style="width: 100vw;height: 100vh;background-color: #ffffff;"></canvas> -->
			<image :src="url" mode="" style="width: 100%;height: 100%;position: absolute;bottom: 0px;"></image>
		</view>
		<view class="cont" v-if="timu">{{author}}</view>
		<view class="cont" :style="{width: wth + 'px',height: hhts + 'px','line-height': 40 + 'px'}"
		
			v-for="(item,index) in line_arr">{{item}}</view>
	</view>
</template>

<script>
	import {
		formatDate
	} from '@/common/formatDate.js'

	var dd = 0;
	export default {
		data() {
			return {
				contents: '',
				wth: 16,
				hhts: 30, //行高
				hht: 30, //行高
				Width: 320,
				Height: 568,
				screen_sr: 1, //标准比
				cont: 0, //全部字数
				page_hht: 1, //一页的行数
				content_hht: 0, //文章需要多少行
				page_count: 1, //计算文章总页数
				content_time: 0, //计算时间
				content_sr: 1, //文章长度标准比，处理前文章长度
				number_words: 0, //一页展示的字数
				zhanshi: [],
				blank_qty: 0,
				ani: "",
				height: 0,
				top: -100,
				animation: "",
				lefts: 0,
				url: '',
				line_arr: [],
				author: '',
				timu: '',
				isShow: true,
				nowPage: 0, //当前页
				t1: null
			}
		},
		onReady() {
			this.contents = ''
			this.isShow = true
			this.nowPage = 0
			// uni.setNavigationBarTitle({
			// 	title: uni.getStorageSync('classes').title + '（' + uni.getStorageSync('classes').wordCount + '）' +
			// 		'字'
			// })
			if (uni.getStorageSync('pan') == 1) {
				uni.setNavigationBarTitle({
					title: uni.getStorageSync('classes').title
				})

			} else if (uni.getStorageSync('pan') == 2) {
				uni.setNavigationBarTitle({
					title: uni.getStorageSync('classes').articleTitle
				})

			}
			this.contents = uni.getStorageSync('tmzs').content
			uni.getSystemInfo({
				success: res => {
					console.log(res, res.screenWidth, res.screenHeight);
					
					this.Width = res.screenWidth
					this.Height = res.screenHeight
					if(res.safeAreaInsets.bottom<0 && res.platform!='android'){
						this.Height = res.screenHeight+(res.safeAreaInsets.bottom/2);
					}
					this.lefts = (this.Width - 175) / 2
				}
			})
			console.log(this.Width, '宽')
			console.log(this.Height, '高')
			var s = this.contents
			s = s.replace(/<p class="ql-align-justify">/g, "　　")
			s = s.replace(/<p class="ql-align-center">/g, "　　")
			s = s.replace(/<p>&nbsp;<\/p>/g, "")
			s = s.replace(/<br>/g, "")
			s = s.replace(/<\/p>/g, "`")
			s = s.replace(/&nbsp;/g, "")
			s = s.replace(/\ +/g, "")
			s = s.replace(/<p>/g, "　　")
			s = s.replace(/,/g, "，")
			s = s.replace(/;/g, "；")
			s = s.replace(/:/g, "：")
			s = s.replace(/"/g, "”")
			var deal_b = s.length
			while (s.indexOf("`") != -1) {
				s = this.enter_key(s)
			}
			// console.log(s)
			this.content_sr = s.length / deal_b
			console.log("处理前文字长度：" + deal_b)
			console.log("处理后文字长度：" + s.length)
			console.log("标准比：" + this.content_sr)
			// 判断每行展示的字数（宽度）
			this.wth = uni.getStorageSync('zishu') * 18
			// 标准比
			this.screen_sr = this.Width / 375
			console.log("uni.getStorageSync('bottomHeight')",uni.getStorageSync('bottomHeight'))
			// 文章容器高（高度）
			this.hht = this.Height - uni.getStorageSync('bottomHeight') * this.screen_sr
			console.log(this.hht, '文章容器高（高度）')
			this.hht = Math.floor(this.hht) //向下取整
			console.log(this.hht, '文章容器高（高度）(向下取整)')
			// 一页的行数
			this.page_hht = (this.hht / 30) - 1
			this.page_hht = Math.floor(this.page_hht) //向下取整
			console.log(this.page_hht, '一页的行数')
			// 全部字数
			this.cont = uni.getStorageSync('tmzs').content.length
			// console.log(uni.getStorageSync('tmzs').content, '全部文字')
			console.log(this.cont, '全部字数')
			// 文章需要多少行
			this.content_hht = this.cont / uni.getStorageSync('zishu')
			this.content_hht = Math.ceil(this.content_hht) //向上取整
			console.log(this.content_hht, '文章需要多少行')
			// 计算文章总页数
			console.log(" this.content_hht", this.content_hht)
			console.log(" this.page_hht", this.page_hht)
			this.page_count = this.content_hht / this.page_hht
			this.page_count = Math.ceil(this.page_count) //向上取整
			console.log(this.page_count, '计算文章总页数')
			uni.setStorageSync('page_count_wait',(this.page_count)*2);
			
			console.log(uni.getStorageSync('page_count_wait'),'page_count_wait');
			// 一页展示的字数
			this.number_words = uni.getStorageSync('zishu') * this.page_hht
			console.log(uni.getStorageSync('zishu'), '行字数')
			console.log(this.number_words, '页字数')
			// 计算时间
			this.content_time = (this.number_words * 60) / uni.getStorageSync('sudu') / this.content_sr
								//   (一页展示的字数 * 60)/速度/标准比
			console.log(this.content_time, '计算时间')
			if (0 < uni.getStorageSync('sudu') && uni.getStorageSync('sudu') <= 500) {
				this.url =
					'http://1309598056.vod2.myqcloud.com/44bbbcf0vodcq1309598056/1dfba988387702299328979275/wFbugHgRCaYA.png'
			} else if (500 < uni.getStorageSync('sudu') && uni.getStorageSync('sudu') <= 1000) {
				this.url =
					'http://1309598056.vod2.myqcloud.com/44bbbcf0vodcq1309598056/1929e05b387702299328753308/wVSA3hHszWIA.png'
			} else if (1000 < uni.getStorageSync('sudu') && uni.getStorageSync('sudu') <= 2000) {
				this.url =
					'http://1309598056.vod2.myqcloud.com/44bbbcf0vodcq1309598056/6f0615a1387702299326074689/EK9eOkGftTYA.png'
			} else {
				this.url =
					'http://1309598056.vod2.myqcloud.com/44bbbcf0vodcq1309598056/193adc7d387702299328761257/QyEb9QP2DXAA.png'
			}
			// console.log(this.content_sr)
			// console.log(this.cont)
			// console.log(this.content_time)
			this.contents = s
			this.hht = this.hht - 28
			var a = this.number_words - (uni.getStorageSync('zishu') * 2)

			var c = 0
			// 把每页的分开
			console.log("a",a)
			console.log("this.contents",this.contents)
			for (var b = 0; b < 500; b++) {
				if (b == 0) {
					// if(uni.getStorageSync('tmzs').author != ''){
					this.zhanshi.push(this.contents.substring(0, a))
					// }else{
					// this.zhanshi.push(this.contents.substring(0, a))
					// }
				} else {
					// if(uni.getStorageSync('tmzs').author != ''){
					var aa = a + c
					c += a
					var bb = a + c
					if(this.contents.substring(aa, bb)){
						this.zhanshi.push(this.contents.substring(aa, bb))
					}
					
					// }else{
					// 	var aa = a + c
					// 	c += a
					// 	var bb = a + c
					// 	this.zhanshi.push(this.contents.substring(aa, bb))
					// }

				}
			}
			
			console.log(this.zhanshi,"this.zhanshi")
			this.contents = this.zhanshi[0]
			// console.log(this.contents)

			// this.contents = this.zhanshi[1]
			// console.log(this.contents)
			dd = 0
			// =========================================
			this.wenzizhanshi(this.contents, dd)

			// =========================================
			var that = this
			that.animation = uni.createAnimation({
				duration: that.content_time * 1000,
				timingFunction: 'linear',
				delay: 1000
			});

			// 动画移动
			setTimeout(() => {
				uni.createSelectorQuery().select(".content").boundingClientRect(function(data) {
					that.Height = data.height + 85
					that.start(that, that.Height);
				}).exec();
			},2000)


			// 控制文章转换
			// that.t1 = setInterval(function() {
			// dd += 1
			// console.log(dd)
			// that.contents = ''
			// that.contents = that.zhanshi[dd]
			// console.log("循环")
			// console.log(that.contents)
			// console.log(dd)
			// if (that.contents == undefined || that.contents == '') {
			// 	that.goread()
			// 	// clearInterval(that.t1)
			// 	return
			// }
			// that.wenzizhanshi(that.contents, dd)
			// console.log(that.contents.length,'文字字数')
			// }, that.content_time * 1000 + 2350)
			if (uni.getStorageSync('pan') == 1) {
				that.articleId = uni.getStorageSync('classes').id
			} else {
				that.articleId = uni.getStorageSync('classes').taskId
			}
		},
		onUnload() {
			clearInterval(this.t1)
		},
		methods: {
			wenzizhanshi(contents, dd) {
				this.nowPage++
				if (dd < 1) {
					this.timu = true
				} else {
					this.timu = false
				}
				var str = contents
				var line = uni.getStorageSync('zishu')
				this.line_arr = []
				var ind = 0
				for (var i = 0; i < str.length; i++) {
					if (i == 0 && dd == 0 && uni.getStorageSync('tmzs').author != "") {
						this.author = "作者：" + uni.getStorageSync('tmzs').author
						// this.line_arr[0] = "作者：" + uni.getStorageSync('tmzs').author
					} else {
						if (i != 0 && i % line && (str.substr(line * ind, line).length > 0)) {
							this.line_arr.push(str.substr(line * ind, line))
							ind++;
						}
					}
				}
				// console.log(this.line_arr, 'line_arr')
			},

			animationend() {
				console.log("触发")
				var _this = this;
				setTimeout(function() {
					dd += 1;
					
					_this.contents = ''
					_this.contents = _this.zhanshi[dd]
					if (_this.contents == undefined || _this.contents == '') {
						_this.goread()
						return
					}
					_this.top = "-100"
					_this.animation = uni.createAnimation({
						duration: _this.content_time * 1000,
						timingFunction: 'linear',
						delay: 0
					});
					_this.animation.rotate(0, 0)
						.scale(1)
						.translate(0, 0)
						.skew(0, 0)
						.step({
							duration: 0
						})
					_this.animation = _this.animation.export()

					
					_this.wenzizhanshi(_this.contents, dd)
					console.log(_this.contents)
					console.log(_this.line_arr)
					console.log(new Date().getSeconds())
					setTimeout(function() {
						uni.createSelectorQuery().select(".content").boundingClientRect(function(data) {
							console.log("----------------------------------------------------",
								data.height)
							_this.Height = data.height + 85
							_this.start(_this, _this.Height);
						}).exec();
						console.log(new Date().getSeconds())
					},1500)



				}, 100)

			},
			start(_this, height) {
				//if (_this.line_arr.length < (_this.page_hht * 0.75)) {
					//console.log("说明行数在1/2以下  ")

					var x = _this.line_arr.length / _this.page_hht;
					console.log(x)
					var content_time = _this.content_time * x ;
					_this.animation = "";
					console.log(content_time)
					console.log(height)
					
					_this.animation = uni.createAnimation({
						duration: content_time * 1000,
						timingFunction: 'linear',
						delay: 0
					});
				// } else {
				// 	_this.animation = uni.createAnimation({
				// 		duration: _this.content_time * 1000,
				// 		timingFunction: 'linear',
				// 		delay: 0
				// 	});
				// 	console.log("走着路吗")
				// }

				_this.animation.translate(0, height - 85).step()
				_this.animation = _this.animation.export()



			},
			enter_key(s) {
				this.word_per_line = uni.getStorageSync('zishu');
				for (var i = 0; i < s.length; i++) {
					if (s.slice(i, i + 1) == "`") {
						var blank = ""
						for (var j = this.word_per_line; j > i % this.word_per_line; j--) {
							blank += "　"
							this.blank_qty++
						}
						if (i % this.word_per_line == 0) {
							blank = ""
						}
						s = s.replace(/`/, blank)
						return s
					}
				}
			},
			goread() {
				// 19.记录单篇阅读明细存折(第二个)
				uni.setStorageSync('time2', formatDate('YY-MM-DD hh:mm:ss'));
				var post_data = {
					articleId: this.articleId,
					bookCharpterId: uni.getStorageSync('tmzs').stockList[0].id,
					bookOrArticle: "ARTICLE",
					endDate: formatDate('YY-MM-DD hh:mm:ss'),
					id: uni.getStorageSync('recordReadDetailBook1').id,
					readDate: formatDate('YY-MM-DD'),
					readFinishFlag: "F",
					readTime: uni.getStorageSync('recordReadDetailBook1').sameDayReadTimes,
					readTimes: 1,
					readType: uni.getStorageSync('xun'),
					readTypeTwo: "自主阅读",
					startDate: uni.getStorageSync('recordReadDetailBook1').startDate,
					studentId: uni.getStorageSync('login').userId,
					trainSpeed: uni.getStorageSync('sudu'),
					trainTime: uni.getStorageSync('recordReadDetailBook1').sameDayReadTimes
				}
				if (uni.getStorageSync('pan') == 2) {
					var item = uni.getStorageSync('classes');
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
					// taskStudent.readTime = 123;//parseFloat(this.accum_total_time).toFixed(0)
					//  }
					// 学生相关信息
					post_data.taskStudent = taskStudent
					post_data.readTypeTwo = `任务阅读`
				}
				console.log(post_data);
				this.$request('/gxsd-prod/read/appRead/recordReadDetailBook', post_data, 'POST').then(res => {
					console.log(res, '19.记录单篇阅读明细存折(第二个)')
					if (res.code == 200) {
						uni.setStorageSync('recordReadDetailBook2', res.data)
						uni.redirectTo({
							url: 'huixiang'
						})
					}
				})
				
				// this.isShow = false
			}
		}
	}
</script>

<style lang="scss">
	.content {
		.imgs {
			position: fixed;
			top: -100vh;
			width: 100vw;
			height: 100vh;
			background: linear-gradient(180deg, #FFE3E3 0%, #FFFFFF 100%);
			border-radius: 8px 8px 0px 0px;
			text-align: center;
			// animation: snow infinite;
			// animation-duration: 5s;
			// animation-iteration-count: 1;
			// animation-timing-function: linear;

			image {
				width: 220px;
				height: 250px;
				margin-top: 75%;
			}
		}

		// @keyframes snow {
		// 	0% {
		// 		top: -100vh;
		// 	}

		// 	50% {
		// 		top: -50vh;
		// 	}

		// 	100% {
		// 		top: 0vh;
		// 	}
		// }


	}

	.cont {
		text-align: center;
		margin: 0 auto;
	}
</style>
