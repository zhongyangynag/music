<template>
  <div>
    <el-row style="margin-bottom: 5px">
      <el-col :span="6">
      <el-select style="width:100%" v-model="value" @change="changeSelect" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </el-col>
      <el-col style="text-align: right" :span="18">
        <el-radio-group @change="RadioChange"  v-model="radio1">
          <el-radio-button label="最热"></el-radio-button>
          <el-radio-button label="最新"></el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="swiper-container2">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in musicList" @click="SongListPlay(item)" :key="item.id">
              <div class="slide">
                <div class="hotImg1" :style = "{ 'background-image': 'url(' + item.coverImgUrl + ')'}">
                  <div class="cover-img" :style="{'background-image': 'url(./static/cover_play.png)'}"></div>
                </div>
                <div class="hotImgText">
                  <span>{{item.title}}</span>
                </div>
                <div class="playCount">
                  <span>{{item.creator}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Swiper from 'swiper';
    export default {
        name: "SongSheet",
        data(){
            return{
              options: [],
              value: '全部',
              Data:[],
              musicList:'',
              radio1: '最热',
              select:'hot'
            }
        },
      methods:{
        SongListPlay(item){
            this.$router.push({  //核心语句
              path:'/musicList',   //跳转的路径
              query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                id:item.id,
                creator:item.creator
              }
            })
          },
        RadioChange(e){
          if(e=='最热'){
            this.select='hot'
          }else {
            this.select='new'
          }
          this.axios.get('https://api.itooi.cn/music/netease/hotSongList?key=579621905&cat='+this.value+'&limit=40&offset=0&order='+this.select).then((res)=>{
            var result = res.data.result;
            if(result === 'SUCCESS'){
              this.musicList = res.data.data.splice(0,30);
              this.$nextTick().then(()=>{   // 可以等DOM渲染完触发then
                new Swiper ('.swiper-container2', {
                  preventClicks : true,//默认true
                  slidesPerColumn: 6,//显示6行
                  slidesPerView: 5,
                })
              });
            }
          });
        },
        changeSelect(e){
          // console.log(this.value)
          this.axios.get('https://api.itooi.cn/music/netease/hotSongList?key=579621905&cat='+e+'&limit=40&offset=0&order='+this.select).then((res)=>{
            var result = res.data.result;
            if(result === 'SUCCESS'){
              this.musicList = res.data.data.splice(0,30);
              this.$nextTick().then(()=>{   // 可以等DOM渲染完触发then
                new Swiper ('.swiper-container2', {
                  preventClicks : true,//默认true
                  slidesPerColumn: 6,//显示6行
                  slidesPerView: 5,
                })
              });
            }
          });
        }
      },
      mounted(){
        this.axios.get('https://api.itooi.cn/music/netease/songListCategory?key=579621905').then((res)=>{
          let result = res.status;
          if (result==200){
            let DataList = res.data.sub;
            for(var val of DataList) {
              let NameList={};
              NameList.value=val.name;
              this.options.push(NameList)
            }
          }
        });
        this.axios.get('https://api.itooi.cn/music/netease/hotSongList?key=579621905&cat=全部&limit=40&offset=0').then((res)=>{
          var result = res.data.result;
          if(result === 'SUCCESS'){
            this.musicList = res.data.data.splice(0,30);
            this.$nextTick().then(()=>{   // 可以等DOM渲染完触发then
              new Swiper ('.swiper-container2', {
                preventClicks : true,//默认true
                slidesPerColumn: 6,//显示6行
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
