<template>
	<view class="content">
		<view class="cont">
			<view class="lefts">头像</view>
			<view class="rights" @click="imgs">
				<image :src="obj.icon == ''?'../../static/myhead.png':obj.icon" mode=""></image>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="cont">
			<view class="lefts">账号</view>
			<view class="rights">
				<input type="text" disabled value="" v-model="obj.phone"/>
				<!-- <u-icon name="arrow-right"></u-icon> -->
			</view>
		</view>
		<!-- <view class="cont">
			<view class="lefts">姓名</view>
			<view class="rights">
				<input type="text" value="" v-model="obj.name" placeholder="请填写名字" />
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view> 
		 <view class="cont">
			<view class="lefts">学校</view>
			<view class="rights">
				<input type="text" value="" v-model="obj.organizationName" placeholder="请填写学校" />
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view> -->
		<!-- <view class="cont">
			<view class="lefts">年级</view>
			<view class="rights" @click="nianjixuanze">
				<input type="text" disabled value="" v-model="obj.gradeName" placeholder="请选择年级" />
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="cont">
			<view class="lefts">班级</view>
			<view class="rights" @click="banjixuanze">
				<input type="text" disabled value="" v-model="obj.className" placeholder="请选择班级" />
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view> -->
		<view class="cont">
			<view class="lefts">ID</view>
			<view class="rights">
				<input type="text" disabled value="" v-model="obj.userId" placeholder="请输入id" />
				<!-- <u-icon name="arrow-right"></u-icon> -->
			</view>
		</view>
		<view class="btn" @click="preservation">保存</view>

		<u-picker :show="show" :columns="columns" @confirm='confirm' closeOnClickOverlay='true'></u-picker>
		<u-picker :show="shows" :columns="columnes" @confirm='confirms' closeOnClickOverlay='true'></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj: {},
				show: false,
				shows: false,
				columns: [],
				columnes:[],
				gradeId:[],
				classId:[]
			}
		},
		onLoad() {
			console.log(uni.getStorageSync('user'))
			this.obj = uni.getStorageSync('user')
			this.$request('/gxsd-prod/app/user/findGrades', {}, 'POST').then(res => {
				console.log(res, '31. 查询年级')
				if(res.code == 200){
					console.log(this.columns)
					var aa = []
					for(var a = 0;a < res.data.length;a ++){
						aa.push(res.data[a].gradeName)
						this.gradeId.push(res.data[a].gradeId)
					}
					this.columns.push(aa)
				}
			})
			if(this.obj.gradeId != ''){
				this.$request('/gxsd-prod/organization/class/findBaseClassInfos', {
					classQueryDTO:this.obj.gradeId
				}, 'POST').then(res => {
					console.log(res, '31. 查询班级')
					if(res.code == 200){
						var bb = []
						for(var b = 0;b < res.data.length;b ++){
							bb.push(res.data[b].className)
							this.classId.push(res.data[b].classId)
						}
						this.columnes.push(bb)
					}
				})
			}
		},
		methods: {
			nianjixuanze(){
				this.show = true
			},
			confirm(e){
				console.log(e)
				this.show = false
				this.obj.gradeName = e.value[0]
				this.obj.gradeId = this.gradeId[e.indexs[0]]
			},
			banjixuanze(){
				this.shows = true
			},
			confirms(e){
				this.shows = false
				this.obj.className = e.value[0]
				this.obj.classId = this.classId[e.indexs[0]]
			},
			imgs() {
				// 26.文件上传
				var that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						console.log(res.tempFilePaths[0])
						uni.uploadFile({
							url: "https://www.gxsd.mobi/gxsd-prod/system/upload", //仅为示例，非真实的接口地址
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								token: uni.getStorageSync('login').token,
							},
							success: (uploadFileRes) => {
								// console.log(uploadFileRes)
								console.log(JSON.parse(uploadFileRes.data))
								that.obj.icon = JSON.parse(uploadFileRes.data).data
							}
						})
					}
				})
			},
			// 保存
			preservation() {
				// 4.APP修改用户信息
				this.$request('/gxsd-prod/app/user/updateUserInfo?icon=' + this.obj.icon + '&name=' + this.obj.name +
					'&organizationName=' + this.obj.organizationName + '&gradeId=' + this.obj.gradeId +
					'&userId=' + this.obj.userId + '&classId=' + this.obj.classId, {}, 'POST').then(res => {
					// 打印调用成功回调
					console.log(res, '4.APP修改用户信息')
					if (res.code == 200) {
						uni.showToast({
							title: '修改成功！',
							icon: 'none'
						})
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							})
						}, 500);
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 0px 15px;
		box-sizing: border-box;

		.cont {
			display: flex;
			justify-content: space-between;

			.lefts {
				width: 50%;
				height: 60px;
				line-height: 60px;
				font-size: 16px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #666666;
			}

			.rights {
				display: flex;
				text-align: right;

				image {
					width: 40px;
					height: 40px;
					border-radius: 40px;
					margin-top: 10px;
					margin-right: 10px;
				}

				input {
					text-align: right;
					font-size: 16px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #999999;
					height: 60px;
					line-height: 60px;
				}
			}
		}

		.btn {
			height: 48px;
			background: linear-gradient(180deg, #8ACCF1 0%, #4BB4EF 100%);
			box-shadow: 0px 4px 4px 1px rgba(11, 124, 187, 0.24);
			border-radius: 90px 90px 90px 90px;
			border-radius: 48px;
			text-align: center;
			font-size: 16px;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 48px;
			margin-top: 50px;
		}
	}
</style>
