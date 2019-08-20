<template>
<div>
  <div class="tittle">歌单推荐</div>
  <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in bannerList" @click="handlebtn(item)" :key="bannerList.id">
          <div class="slide">
            <div class="hotImg" :style = "{ 'background-image': 'url(' + item.coverImgUrl + ')'}">
              <div class="cover-img" :style="{'background-image': 'url(./static/cover_play.png)'}"></div>
            </div>
            <div class="hotImgText">
              <span>{{item.name}}</span>
            </div>
            <div class="playCount">
              <span>播放量：{{item.playCount}}</span>
            </div>
          </div>
        </div>
      </div>
    <!-- 分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

  </div>
  <div class="tittle1">最新音乐</div>
  <div class="swiper-container1">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in hotList" @click="handlebtnMusic(item)">
        <div class="slide">
          <div class="hotImg1" :style = "{ 'background-image': 'url(' + item.song.album.picUrl + ')'}">
            <div class="cover-img" :style="{'background-image': 'url(./static/cover_play.png)'}"></div>
          </div>
          <div class="hotImgText">
            <span>{{item.song.artists[0].name}}</span>
          </div>
          <div class="playCount">
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--mv-->
  <div class="tittle2">MV</div>
  <div class="swiper-container2">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in mvList" @click="handlebtnMv(item)">
        <div class="slide">
          <div class="hotImg1" :style = "{ 'background-image': 'url(' + item.cover + ')'}">
            <div class="cover-img" :style="{'background-image': 'url(./static/cover_play.png)'}"></div>
          </div>
          <div class="hotImgText">
            <span>{{item.singer}}</span>
          </div>
          <div class="playCount">
            <span>{{item.name}}</span>
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
      name: "HomePageList",
      data(){
        return {
          bannerList : [],
          highList : [],
          hotList : [],
          mvList:[]
        };
      },
      mounted(){
        //热门歌单
        // https://api.itooi.cn/music/netease/hotSongList?key=579621905&cat=全部&limit=100&offset=0
        // https://v1.itooi.cn/netease/songList/hot?cat=全部&pageSize=20&page=0
        this.axios.get('https://v1.itooi.cn/netease/songList/hot?cat=全部&pageSize=20&page=0').then((res)=>{
          var result = res.data.code;
          console.log(res)
          if(result === 200){
            console.log(res)
            this.bannerList = res.data.data;
            this.$nextTick().then(()=>{   // 可以等DOM渲染完触发then
              new Swiper ('.swiper-container', {
                pagination: {
                  el: '.swiper-pagination',
                  clickable :true,
                },
                autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
                },
                slidesPerView: 5,
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
              })
            });
          }
        });
        // https://api.itooi.cn/music/netease/highQualitySongList?key=579621905&cat=全部&limit=100
        // 最新音乐
            //Swiper 必须保证DOM加载完成才生效
            // https://api.itooi.cn/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0
            this.axios.get('https://v1.itooi.cn/netease/song/newest').then((res)=>{
              // console.log( res.data );
              var result = res.data.code;
              if(result === 200){
                this.hotList = res.data.data;
                // console.log(this.bannerList)
                //Swiper 必须保证DOM加载完成才生效
                this.$nextTick().then(()=>{   // 可以等DOM渲染完触发then
                  new Swiper ('.swiper-container1', {
                    preventClicks : true,//默认true
                    slidesPerColumn: 2,//显示2行
                    slidesPerView: 5,
                  })
                });
              }
            });
        // MV   https://api.itooi.cn/music/netease/topMvList?key=579621905&limit=10&offset=0
        this.axios.get('https://v1.itooi.cn/netease/mv/top?pageSize=10&page=0').then((res)=>{
          // console.log( res.data );
          var result = res.data.code;
          if(result === 200){
            this.mvList = res.data.data;
            //Swiper 必须保证DOM加载完成才生效
                this.$nextTick().then(()=>{   // 可以等DOM渲染完触发then
                  new Swiper ('.swiper-container2', {
                    preventClicks : true,//默认true
                    slidesPerColumn: 2,//显示2行
                    slidesPerView: 5,
                  })
                });
          }
        });
      },
      methods:{
          handlebtn(item){
            this.$router.push({  //核心语句
              path:'/musicList',   //跳转的路径
              query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                id:item.id,
              }
            })
          },
        handlebtnMusic(item){
          //  ************** 往本地存歌曲的ID，查找是否存在若存在则删除重新添加到最新的位置。
          var storage=window.localStorage;
          var isMusicId=storage.getItem("musicId");
          var isMusicIdObj=JSON.parse(isMusicId);
          if(isMusicIdObj){
            if(isMusicIdObj.musicId.indexOf(item.id)==-1){
              isMusicIdObj.musicId.unshift(item.id);
            }else {
              isMusicIdObj.musicId.splice(isMusicIdObj.musicId.indexOf(item.id),1);
              isMusicIdObj.musicId.unshift(item.id);
            }
            var MusicIdObj=JSON.stringify(isMusicIdObj);
            storage.setItem("musicId",MusicIdObj);
              this.$router.push({  //核心语句
                path:'/musicPlay',   //跳转的路径
              })

          }else {
            var MusicData={
              musicId:[]
            };
            MusicData.musicId.unshift(item.id);
            var musicIdList=JSON.stringify(MusicData);
            storage.setItem("musicId",musicIdList);
              this.$router.push({  //核心语句
                path:'/musicPlay',   //跳转的路径
              })
          }
          //  **************

        },
        handlebtnMv(item){
          this.$router.push({  //核心语句
            path:'/mvPlay',   //跳转的路径
            query:{           //路由传参时push和query搭配使用 ，作用时传递参数
              id:item.id ,
            }
          })
        }
      }
    }
</script>

<style scoped lang="scss">
.tittle{
  padding-top: 30px;
  text-align: center;
  font-size: 28px;
  font-family: "Adobe Arabic";
}
.tittle1{
  text-align: center;
  font-size: 28px;
  padding-bottom:20px ;
}
.tittle2{
  padding-top: 30px;
  text-align: center;
  font-size: 28px;
  padding-bottom:20px ;
}
.swiper-container {
  /*width: 1300px;*/
  height: 300px;
  margin: 20px auto;
}
  .swiper-slide{
    /*padding: 0 10px 0 10px;*/
    /*background-color: red;*/
  }
  .slide{
    padding: 0 10px;
  }
  .hotImg{
    background-repeat:no-repeat;
     background-size: cover;
     height: 200px;
     background-size: 100%;
     background-position: center;
     transition: all 0.6s;
  }
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
.hotImg:hover{
  background-size: 120% ;
  .cover-img{
    opacity: 1;
  }
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
  .cover-img{
    transition: all 1s;
    background-repeat:no-repeat;
    background-position: center;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

</style>
