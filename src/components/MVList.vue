<template>
    <div>
      <div style="margin-left: 10px;font-size: 24px;margin-bottom: 5px">最热MV</div>
        <div class="swiper-container3">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in musicList" @click="SongListPlay(item)" :key="item.id">
              <div class="slide">
                <div class="hotImg1" :style = "{ 'background-image': 'url(' + item.pic + ')'}">
                  <div class="cover-img" :style="{'background-image': 'url(./static/cover_play.png)'}"></div>
                </div>
                <div class="hotImgText">
                  <span>{{item.name}}</span>
                </div>
                <div class="playCount">
                  <span>{{item.singer}}</span><span style="float: right">播放次数：{{item.playCount}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
  import Swiper from 'swiper';
    export default {
        name: "MVList",
        data(){
          return{
            musicList:'',
          }
        },
      methods:{
        SongListPlay(item){
          this.$router.push({  //核心语句
            path:'/MvPlay',   //跳转的路径
            query:{           //路由传参时push和query搭配使用 ，作用时传递参数
              id:item.id,
            }
          })
        },
      },
      mounted(){
        // https://api.itooi.cn/music/netease/topMvList?key=579621905&limit=10&offset=0
        this.axios.get('https://api.itooi.cn/music/netease/topMvList?key=579621905&limit=50&offset=0').then((res)=>{
          let result = res.data.result;
          // console.log(res)
          if(result === 'SUCCESS'){
            this.musicList = res.data.data;
            this.$nextTick().then(()=>{   // 可以等DOM渲染完触发then
              new Swiper ('.swiper-container3', {
                preventClicks : true,//默认true
                slidesPerColumn: 10,//显示10行
                slidesPerView: 5,
              })
            });
          }
        });
      },
    }
</script>

<style scoped lang="scss">
  .hotImg1{
    background-repeat:no-repeat;
    background-size: 100%;
    background-position: center;
    height: 150px;
    transition: all 0.6s;
  }
  .hotImg1:hover{
    background-size: 120% ;
    .cover-img{
      opacity: 1;
    }
  }
  .cover-img{
    transition: all 1s;
    background-repeat:no-repeat;
    background-position: center;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .slide{
    padding: 0 10px;
  }
  .hotImgText{
    span{
      font-weight: 400;
      line-height: 22px;
      font-size:14px ;
    }
  }
  .playCount{
    span{
      color: #999;
      font-size: 14px;
    }
  }
</style>
