(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/test/read"],{"09ed":function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}));var s=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"5bdb":function(t,e,n){"use strict";var o=n("a391"),s=n.n(o);s.a},"7de7":function(t,e,n){"use strict";(function(t){n("2e0c");o(n("66fd"));var e=o(n("dee6"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},a391:function(t,e,n){},d1c0:function(t,e,n){"use strict";n.r(e);var o=n("d68b"),s=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=s.a},d68b:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("8b10"),s=0,a={data:function(){return{contents:"",wth:16,hhts:30,hht:30,Width:320,Height:568,screen_sr:1,cont:0,page_hht:1,content_hht:0,page_count:1,content_time:0,content_sr:1,number_words:0,zhanshi:[],blank_qty:0,ani:"",height:0,top:-100,animation:"",lefts:0,url:"",line_arr:[],author:"",timu:"",isShow:!0,nowPage:0,t1:null}},onReady:function(){var e=this;this.contents="",this.isShow=!0,this.nowPage=0,1==t.getStorageSync("pan")?t.setNavigationBarTitle({title:t.getStorageSync("classes").title+"（"+t.getStorageSync("classes").wordCount+"）字"}):2==t.getStorageSync("pan")&&t.setNavigationBarTitle({title:t.getStorageSync("classes").articleTitle+"（"+t.getStorageSync("classes").wordCount+"）字"}),this.contents=t.getStorageSync("tmzs").content,t.getSystemInfo({success:function(t){console.log(t,t.screenWidth,t.screenHeight),e.Width=t.screenWidth,e.Height=t.screenHeight,t.safeAreaInsets.bottom<0&&"android"!=t.platform&&(e.Height=t.screenHeight+t.safeAreaInsets.bottom/2),e.lefts=(e.Width-175)/2}}),console.log(this.Width,"宽"),console.log(this.Height,"高");var n=this.contents;n=n.replace(/<p class="ql-align-justify">/g,"　　"),n=n.replace(/<p class="ql-align-center">/g,"　　"),n=n.replace(/<p>&nbsp;<\/p>/g,""),n=n.replace(/<br>/g,""),n=n.replace(/<\/p>/g,"`"),n=n.replace(/&nbsp;/g,""),n=n.replace(/\ +/g,""),n=n.replace(/<p>/g,"　　"),n=n.replace(/,/g,"，"),n=n.replace(/;/g,"；"),n=n.replace(/:/g,"："),n=n.replace(/"/g,"”");var o=n.length;while(-1!=n.indexOf("`"))n=this.enter_key(n);this.content_sr=n.length/o,console.log("处理前文字长度："+o),console.log("处理后文字长度："+n.length),console.log("标准比："+this.content_sr),this.wth=18*t.getStorageSync("zishu"),this.screen_sr=this.Width/375,console.log("uni.getStorageSync('bottomHeight')",t.getStorageSync("bottomHeight")),this.hht=this.Height-t.getStorageSync("bottomHeight")*this.screen_sr,console.log(this.hht,"文章容器高（高度）"),this.hht=Math.floor(this.hht),console.log(this.hht,"文章容器高（高度）(向下取整)"),this.page_hht=this.hht/30-1,this.page_hht=Math.floor(this.page_hht),console.log(this.page_hht,"一页的行数"),this.cont=t.getStorageSync("tmzs").content.length,console.log(this.cont,"全部字数"),this.content_hht=this.cont/t.getStorageSync("zishu"),this.content_hht=Math.ceil(this.content_hht),console.log(this.content_hht,"文章需要多少行"),console.log(" this.content_hht",this.content_hht),console.log(" this.page_hht",this.page_hht),this.page_count=this.content_hht/this.page_hht,this.page_count=Math.ceil(this.page_count),console.log(this.page_count,"计算文章总页数"),t.setStorageSync("page_count_wait",2*this.page_count),console.log(t.getStorageSync("page_count_wait"),"page_count_wait"),this.number_words=t.getStorageSync("zishu")*this.page_hht,console.log(t.getStorageSync("zishu"),"行字数"),console.log(this.number_words,"页字数"),this.content_time=60*this.number_words/t.getStorageSync("sudu")/this.content_sr,console.log(this.content_time,"计算时间"),0<t.getStorageSync("sudu")&&t.getStorageSync("sudu")<=500?this.url="http://1309598056.vod2.myqcloud.com/44bbbcf0vodcq1309598056/1dfba988387702299328979275/wFbugHgRCaYA.png":500<t.getStorageSync("sudu")&&t.getStorageSync("sudu")<=1e3?this.url="http://1309598056.vod2.myqcloud.com/44bbbcf0vodcq1309598056/1929e05b387702299328753308/wVSA3hHszWIA.png":1e3<t.getStorageSync("sudu")&&t.getStorageSync("sudu")<=2e3?this.url="http://1309598056.vod2.myqcloud.com/44bbbcf0vodcq1309598056/6f0615a1387702299326074689/EK9eOkGftTYA.png":this.url="http://1309598056.vod2.myqcloud.com/44bbbcf0vodcq1309598056/193adc7d387702299328761257/QyEb9QP2DXAA.png",this.contents=n,this.hht=this.hht-28;var a=this.number_words-2*t.getStorageSync("zishu"),i=0;console.log("a",a),console.log("this.contents",this.contents);for(var c=0;c<500;c++)if(0==c)this.zhanshi.push(this.contents.substring(0,a));else{var r=a+i;i+=a;var h=a+i;this.contents.substring(r,h)&&this.zhanshi.push(this.contents.substring(r,h))}console.log(this.zhanshi,"this.zhanshi"),this.contents=this.zhanshi[0],s=0,this.wenzizhanshi(this.contents,s);var g=this;g.animation=t.createAnimation({duration:1e3*g.content_time,timingFunction:"linear",delay:1e3}),setTimeout((function(){t.createSelectorQuery().select(".content").boundingClientRect((function(t){g.Height=t.height+85,g.start(g,g.Height)})).exec()}),2e3),1==t.getStorageSync("pan")?g.articleId=t.getStorageSync("classes").id:g.articleId=t.getStorageSync("classes").taskId},onUnload:function(){clearInterval(this.t1)},methods:{wenzizhanshi:function(e,n){this.nowPage++,this.timu=n<1;var o=e,s=t.getStorageSync("zishu");this.line_arr=[];for(var a=0,i=0;i<o.length;i++)0==i&&0==n&&""!=t.getStorageSync("tmzs").author?this.author="作者："+t.getStorageSync("tmzs").author:0!=i&&i%s&&o.substr(s*a,s).length>0&&(this.line_arr.push(o.substr(s*a,s)),a++)},animationend:function(){console.log("触发");var e=this;setTimeout((function(){s+=1,e.contents="",e.contents=e.zhanshi[s],void 0!=e.contents&&""!=e.contents?(e.top="-100",e.animation=t.createAnimation({duration:1e3*e.content_time,timingFunction:"linear",delay:0}),e.animation.rotate(0,0).scale(1).translate(0,0).skew(0,0).step({duration:0}),e.animation=e.animation.export(),e.wenzizhanshi(e.contents,s),console.log(e.contents),console.log(e.line_arr),console.log((new Date).getSeconds()),setTimeout((function(){t.createSelectorQuery().select(".content").boundingClientRect((function(t){console.log("----------------------------------------------------",t.height),e.Height=t.height+85,e.start(e,e.Height)})).exec(),console.log((new Date).getSeconds())}),1500)):e.goread()}),100)},start:function(e,n){var o=e.line_arr.length/e.page_hht;console.log(o);var s=e.content_time*o;e.animation="",console.log(s),console.log(n),e.animation=t.createAnimation({duration:1e3*s,timingFunction:"linear",delay:0}),e.animation.translate(0,n-85).step(),e.animation=e.animation.export()},enter_key:function(e){this.word_per_line=t.getStorageSync("zishu");for(var n=0;n<e.length;n++)if("`"==e.slice(n,n+1)){for(var o="",s=this.word_per_line;s>n%this.word_per_line;s--)o+="　",this.blank_qty++;return n%this.word_per_line==0&&(o=""),e=e.replace(/`/,o),e}},goread:function(){t.setStorageSync("time2",(0,o.formatDate)("YY-MM-DD hh:mm:ss"));var e={articleId:this.articleId,bookCharpterId:t.getStorageSync("tmzs").stockList[0].id,bookOrArticle:"ARTICLE",endDate:(0,o.formatDate)("YY-MM-DD hh:mm:ss"),id:t.getStorageSync("recordReadDetailBook1").id,readDate:(0,o.formatDate)("YY-MM-DD"),readFinishFlag:"F",readTime:t.getStorageSync("recordReadDetailBook1").sameDayReadTimes,readTimes:1,readType:t.getStorageSync("xun"),readTypeTwo:"自主阅读",startDate:t.getStorageSync("recordReadDetailBook1").startDate,studentId:t.getStorageSync("login").userId,trainSpeed:t.getStorageSync("sudu"),trainTime:t.getStorageSync("recordReadDetailBook1").sameDayReadTimes};if(2==t.getStorageSync("pan")){var n=t.getStorageSync("classes"),s={};e.taskStudentId=n.taskStudentId,s.taskStudentId=n.taskStudentId,s.taskId=n.taskId,s.studentId=t.getStorageSync("login").userId,e.taskStudent=s,e.readTypeTwo="任务阅读"}console.log(e),this.$request("/gxsd-testing/read/appRead/recordReadDetailBook",e,"POST").then((function(e){console.log(e,"19.记录单篇阅读明细存折(第二个)"),200==e.code&&(t.setStorageSync("recordReadDetailBook2",e.data),t.redirectTo({url:"huixiang"}))}))}}};e.default=a}).call(this,n("543d")["default"])},dee6:function(t,e,n){"use strict";n.r(e);var o=n("09ed"),s=n("d1c0");for(var a in s)"default"!==a&&function(t){n.d(e,t,(function(){return s[t]}))}(a);n("5bdb");var i,c=n("f0c5"),r=Object(c["a"])(s["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);e["default"]=r.exports}},[["7de7","common/runtime","common/vendor"]]]);