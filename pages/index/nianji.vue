<template>
	<view class="content">
		<view class="title">你好！请选择你的年级吧！</view>
		<view class="cont">
			<view :class="index == indexs?'xuan':'weixuan'" v-for="(item,index) in list" :key='index' @click="xuanze(index,item)">{{item.gradeSxcName}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				indexs:-1
			}
		},
		onShow() {
			var that=this;
			if(uni.getStorageSync('ind') == '' && uni.getStorageSync('ind')!== 0 ){
				this.indexs = -1
			}else{
				this.indexs = uni.getStorageSync('ind')
			}
			// 36.APP查询已经购买的年级分册列表
			this.$request('/gxsd-prod/organization/class/selectHaveBuyGradeAndFenCe', {
				appuserId: uni.getStorageSync('login').userId
			}, 'POST').then(res => {
				console.log(res, '36.APP查询已经购买的年级分册列表')
				if (res.code == 200) {
					this.list = res.data
					if(this.indexs==-1){
						//console.log(uni.getStorageSync('login'));
						var gradeName=uni.getStorageSync('login').gradeName;
							var d = new Date()
							if (d.getMonth() + 1 >= 8 && d.getMonth() + 1 <= 12) {
								// console.log('上册')
								var sxcs = '上册'
							} else {
								// console.log('下册')
								var sxcs = '下册'
							}
							gradeName=gradeName+sxcs;
							res.data.forEach(function(vv,kk){
								console.log(vv,kk);
								if(vv.gradeSxcName==gradeName){
									that.indexs=kk;
								}
							})
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
			xuanze(index,item) {
				uni.setStorageSync('ind', index)
				uni.setStorageSync('nian', item)
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 30px 10px;
		box-sizing: border-box;
		.title {
			height: 25px;
			font-size: 18px;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #333333;
			line-height: 25px;
			margin-bottom: 30px;
		}
		.cont {
			display: flex;
			flex-wrap: wrap;
			.weixuan {
				width: 30%;
				height: 40px;
				background: #F3F3F3;
				border-radius: 8px;
				text-align: center;
				line-height: 40px;
				margin-bottom: 15px;
				font-size: 14px;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #666666;
				margin-left: 3%;
			}
			.xuan{
				width: 30%;
				height: 40px;
				background: #4BB4EF;
				border-radius: 8px;
				text-align: center;
				line-height: 40px;
				margin-bottom: 15px;
				font-size: 14px;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
				margin-left: 3%;
			}
		}
	}
</style>
