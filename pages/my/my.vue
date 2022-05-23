<template>
	<view class="content">
		<image class="headbg" src="../../static/mybg.png" mode=""></image>
		<view class="" style="position: fixed;top: 6vh;left: 15px;font-size: 18px;font-family: PingFang SC-Bold, PingFang SC;font-weight: bold;color: #FFFFFF;">个人中心</view>
		<view class="head">
			<image :src="avatar == ''?'../../static/myhead.png':avatar" mode=""></image>
			<view class="title">
				<view class="name">{{user == ''?'用户12138':user}}</view>
				<view class="ids">ID {{id == ''?'12138':id}}</view>
			</view>
		</view>
		<view class="cont">
			<view class="conts" v-for="(item,index) in list" :key='index' @click="go(item.url)">
				<view class="name">{{item.name}}</view>
				<u-icon name="arrow-right" color="#CCCCCC"></u-icon>
			</view>
			<view class="conts"  @click="go_out()">
				<view class="name">退出登录</view>
				<u-icon name="arrow-right" color="#CCCCCC"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar:'',
				user:'',
				id:'',
				list:[
					{
						name:'个人资料',
						url:'ziliao'
					},
					{
						name:'任务说明',
						url:'shuoming'
					}
				]
			}
		},
		onShow() {
			if(uni.getStorageSync('login').token == ''||uni.getStorageSync('login').token == undefined){
				uni.showToast({
					title:'您当前还未登录！',
					icon:'none'
				})
				setTimeout(function() {
					uni.navigateTo({
						url:'../login/login'
					})
				}, 500);
			}else{
				// 30. 查询用户信息
				this.$request('/gxsd-prod/app/user/findUserInfo?userId=' + uni.getStorageSync('login').userId, {}, 'POST').then(res => {
					// 打印调用成功回调
					console.log(res, '30. 查询用户信息')
					if (res.code == 200) {
						uni.setStorageSync('user',res.data)
						this.user = res.data.name
						this.id = res.data.userId
						this.avatar = res.data.icon
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
						if(res.code==402){
							setTimeout(function() {
								uni.navigateTo({
									url:'../login/login'
								})
							}, 500);
						}
					}
				})
			}
		},
		methods: {
			go(url){
				uni.navigateTo({
					url:url
				})
			},
			go_out(){
				uni.setStorageSync('login',{token:''});
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		.headbg{
			position: fixed;
			top: 0px;
			width: 100%;
			height: 290px;
			z-index: -100;
		}
		.head{
			padding: 12px 15px;
			margin-bottom: 8px;
			box-sizing: border-box;
			display: flex;
			margin-top: 80px;
			image{
				width: 80px;
				height: 80px;
				border-radius: 80px;
				margin-right: 20px;
			}
			.title{
				padding-top: 15px;
				box-sizing: border-box;
				.name{
					height: 25px;
					font-size: 18px;
					font-family: PingFang SC-Bold, PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
					line-height: 21px;
					margin-bottom: 8px;
				}
				.ids{
					height: 20px;
					font-size: 14px;
					font-family: PingFang SC-Bold, PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
					line-height: 16px;
				}
			}
		}
		.cont{
			width: 95vw;
			margin: 0 auto;
			padding: 0px 20px;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 8px 8px 8px 8px;
			.conts{
				display: flex;
				justify-content: space-between;
				height: 62px;
				line-height: 62px;
				.name{
					height: 62px;
					line-height: 62px;
					font-size: 16px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
				}
			}
		}
	}
</style>
