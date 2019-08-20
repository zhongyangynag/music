<template>
  <div style="padding: 0 10px">
    <el-button @click="back" style="padding: 0;font-size: 30px;cursor: pointer;position: relative;background: transparent;border: none" class="iconfont icon-fanhui"></el-button>
    <div>
      <i style="font-size: 23px;color: red;" class="iconfont icon-mv"></i>
      <span style="font-size: 24px">{{mvData.name}}</span>
      <span style="font-size:16px;">{{mvData.artistName}}</span>
    </div>
    <el-row>
      <el-col :span="18">
        <div id="player" ></div>
        <div>
          <div style="border-bottom: 2px solid #c20c0c;margin-bottom: 10px;padding: 10px 0">
            <span style="font-size: 20px">评论</span>
            <span style="color: #666;font-size: 13px;margin-left: 10px">共{{totalP.total}}条评论</span>
          </div>
          <div>
            <p style="border-bottom: 1px solid #ccc;padding-bottom: 10px;">精彩评论</p>
            <div v-for="item in hotComments">
              <div style="border-bottom: 1px  dashed #ccc;padding: 8px 0">
                <el-row style="overflow: hidden">
                  <el-col  :span="2"><img  alt="" style="width:50px;height: 50px" :src=item.user.avatarUrl></el-col>
                  <el-col :span="22">
                    <span style="color: #0c73c2">{{item.user.nickname}}:</span><span style="margin-left: 5px">{{item.content}}</span>
                    <div style="margin-top: 10px">
                      <span>{{item.time|formatDate}}</span><span style="float: right" class="iconfont icon-praise2">({{item.likedCount}})</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <p style="border-bottom: 1px solid #ccc;padding-bottom: 10px;margin-top: 30px">最新评论({{totalP.total}})</p>
            <div v-for="item in comment1">
                <div style="border-bottom: 1px  dashed #ccc;padding: 8px 0">
                  <el-row style="overflow: hidden">
                    <el-col  :span="2"><img alt="" style="width:50px;height: 50px" :src=item.user.avatarUrl></el-col>
                    <el-col :span="22">
                      <span style="color: #0c73c2">{{item.user.nickname}}:</span><span style="margin-left: 5px">{{item.content}}</span>
                      <div style="margin-top: 10px">
                        <span>{{item.time|formatDate}}</span><span style="float: right" class="iconfont icon-praise2">({{item.likedCount}})</span>
                      </div>
                    </el-col>
                  </el-row>
                </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col style="padding-left: 10px" :span="6">
        <div class="synopsis">MV简介</div>
        <div class="mvMessage">
          <span>发布时间：{{mvData.publishTime}}</span>
          <span>播放次数：{{mvData.playCount}}</span>
          <p>{{mvData.briefDesc}}{{mvData.desc}}</p>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import 'dplayer/dist/DPlayer.min.css';
  import DPlayer from 'dplayer';

  var padDate=function(va) {
    va = va < 10 ? '0' + va : va;
    return va
  };
  let dp ;
    export default {
        name: "mvPlay",
      data(){
        return{
          mvData:'',
          comment1:[],
          hotComments:[],
          totalP:''
        }
      },
      filters:{
        formatDate:function (val) {
          let value=new Date(val);
          let month=padDate(value.getMonth()+1);
          let day=padDate(value.getDate());
          let hour=padDate(value.getHours());
          let minutes=padDate(value.getMinutes());
          return month+'月'+day+'日 '+hour+':'+minutes;

        }
      },
      mounted() {
         dp = new DPlayer({
          container: document.getElementById('player'),
          autoplay: false,
          theme: '#FADFA3',
          lang: 'zh-cn',
          screenshot: true,
          hotkey: true,
          preload: 'auto',
          volume: 0.7,
          mutex: true,
          video: {
            url: '',
            pic: '',
            thumbnails: '',
            type: 'auto'
          },
          highlight: [
            {
              time: 20,
              text: '这是第 20 秒'
            },
            {
              time: 120,
              text: '这是 2 分钟'
            }
          ]
        });
        // console.log(dp.video)
        if(this.$route.query.type === 0){
          let id=this.$route.query.id;
          let mvD={};
          mvD.name=this.$route.query.data.title;
          mvD.playCount=this.$route.query.data.playTime;
          this.mvData=mvD;
          dp.video.src='https://v1.itooi.cn/netease/mvUrl?id='+id+'&quality=1080';
          dp.video.poster=this.$route.query.data.coverUrl;
          this.axios.get('https://v1.itooi.cn/netease/comment/video?id='+id+'&page=0&pageSize=300').then((res)=>{
            let result = res.status;
            if(result === 200){
              // console.log(res.data.data);
              this.hotComments=res.data.data.hotComments;
              this.comment1=res.data.data.comments;
              this.totalP=res.data.data;
              // console.log(this.comment1)
            }
          });
        }else {
          let id=this.$route.query.id;
          // https://api.itooi.cn/music/netease/mv?key=579621905&id=5965802
          // netease/comment/mv?id=10866117&page=0&pageSize=300
          // netease/mvUrl?id=10866117&quality=1080
          this.axios.get('https://v1.itooi.cn/netease/mv?key=579621905&id='+id).then((res)=>{
            let result = res.status;
            if(result === 200){
              // console.log(res.data.data.data);
              this.mvData=res.data.data.data;
              dp.video.src='https://v1.itooi.cn/netease/mvUrl?id='+res.data.data.data.id+'&quality=1080';
              dp.video.poster=res.data.data.data.cover
            }
          });
          //*********
          this.axios.get('https://v1.itooi.cn/netease/comment/mv?id='+id+'&page=0&pageSize=300').then((res)=>{
            let result = res.status;
            if(result === 200){
              // console.log(res.data.data);
              this.hotComments=res.data.data.hotComments;
              this.comment1=res.data.data.comments;
              this.totalP=res.data.data;
              // console.log(this.comment1)
            }
          });
        }

      },
      methods: {
        back(){
          this.$router.go(-1)
        },
      }
    }
</script>

<style scoped lang="scss">
  .synopsis{
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  .mvMessage{
    margin-top: 10px;
    span{
      font-size: 14px;
      color: #999;
      display: block;
    }
    p{
      margin-top: 20px;
      font-size:15px;
    }
  }
</style>
