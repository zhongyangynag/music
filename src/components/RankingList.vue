<template>
<div>
  <el-row class="tac">
    <el-col :span="6">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @select="handleOpen"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">
          <img src="static/img/download.png">
          <span slot="title">音乐飙升榜</span>
        </el-menu-item>
        <el-menu-item index="2">
          <img src="static/img/download-1.png">
          <span slot="title">新歌榜</span>
        </el-menu-item>
        <el-menu-item index="3" >
          <img src="static/img/download-2.png">
          <span slot="title">原创歌曲榜</span>
        </el-menu-item>
        <el-menu-item index="4">
        <img src="static/img/download-3.png">
        <span slot="title">热歌榜</span>
        </el-menu-item>
        <el-menu-item index="5">
          <img src="static/img/download.jpg">
          <span slot="title">新声榜</span>
        </el-menu-item>
        <el-menu-item index="6">
          <img src="static/img/download-1.jpg">
          <span slot="title">说唱榜</span>
        </el-menu-item>
        <el-menu-item index="7">
          <img src="static/img/download-4.png">
          <span slot="title">古典音乐榜</span>
        </el-menu-item>
        <el-menu-item index="8">
          <img src="static/img/download-2.jpg">
          <span slot="title">电音榜</span>
        </el-menu-item>
        <el-menu-item index="9">
          <img src="static/img/download-5.png">
          <span slot="title">抖音排行榜</span>
        </el-menu-item>
        <el-menu-item index="10">
          <img src="static/img/download-6.png">
          <span slot="title">ACG音乐榜</span>
        </el-menu-item>
        <el-menu-item index="11">
          <img src="static/img/download-3.jpg">
          <span slot="title">韩语榜</span>
        </el-menu-item>
        <el-menu-item index="12">
          <img src="static/img/download-4.jpg">
          <span slot="title">国电榜</span>
        </el-menu-item>
        <el-menu-item index="13">
          <img src="static/img/download-5.jpg">
          <span slot="title">美国billboard榜</span>
        </el-menu-item>
        <el-menu-item index="14">
          <img src="static/img/download-7.png">
          <span slot="title">iTunes榜</span>
        </el-menu-item>
        <el-menu-item index="15">
          <img src="static/img/download-6.jpg">
          <span slot="title">日本Oricon榜</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="18">
      <div class="max_box">
        <el-row style="position: relative">
          <el-col :span="6">
            <div class="songListPic" :style = "{ 'background-image': 'url(' + imgData.songListPic +')'}">
            </div>
          </el-col>
          <el-col :span="18">
            <div class="description">
              <h1>{{imgData.songListName}}</h1>
              <p>播放量：{{imgData.songListPlayCount}}</p>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @row-click="rowClick"
              class="row-box"
              @cell-mouse-enter="hoverMusic"
            >
              <el-table-column
                type="index"
                label="序号"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="歌曲"
              >
              </el-table-column>
              <el-table-column
                prop="singer"
                label="歌手"
              >
              </el-table-column>
              <el-table-column
                prop="time"
                label="时长"
                width="100"
              >
              </el-table-column>
              <el-table-column
                width="80"
                show-overflow-tooltip>
                <div class="iconfont icon-play"></div>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>

      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
  var sec_to_time = function(msd) {
    var time = parseFloat(msd) / 1000;
    if (null != time && "" != time) {
      if (time > 60 && time < 60 * 60) {
        var a = parseInt(time / 60.0) < 10 ? ('0' + parseInt(time / 60.0)) : parseInt(time / 60.0);
        var ms = parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60);
        var b = (ms < 10) ? ('0' + ms) : ms;
        time =  a + ':' + b;
      }
      else if (time >= 60 * 60 && time < 60 * 60 * 24) {
        var H = parseInt(time / 3600.0) < 10 ? ('0' + parseInt(time / 3600.0)) : parseInt(time / 3600.0);
        var ms = parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60);
        var M = (ms < 10) ? ('0' + ms) : ms;
        var ss = parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60);
        var S = (ss < 10) ? ('0' + ss) : ss;
        time =  + M + ':' + S;
      }
      else {
        var d = parseInt(time) < 10 ? ('0' + parseInt(time)) : parseInt(time);
        time = '00:00:' + d;
      }
    }
    return time;
  };
    export default {
        name: "RankingList",
      data(){
        return {
          tableData:[],
          imgData:'',
          creator:'',
          id:19723756,
          musicList:[19723756,3779629,2884035,3778678,2617766278,991319590,71384707,1978921795,2250011882,71385702,745956260,10520166,60198,11641012,60131]
        };
      },
      mounted() {
        // console.log(this.id);
        // https://api.itooi.cn/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0
        // netease/songList?id=141998290&pageSize=20
        this.axios.get('https://api.itooi.cn/music/netease/songList?key=579621905&id='+this.id).then((res)=>{
          var result = res.data.result;
          if(result === "SUCCESS"){
            this.tableData = res.data.data.songs;
            this.imgData=res.data.data;
            for(var val of this.tableData) {
              val.time=sec_to_time(val.time)
            }
          }
        });
      },
      methods: {
        handleOpen(key) {
          this.id=this.musicList[key-1];
          this.axios.get('https://api.itooi.cn/music/netease/songList?key=579621905&id='+this.id).then((res)=>{
            var result = res.data.result;
            if(result === 'SUCCESS'){
              this.tableData = res.data.data.songs;
              this.imgData=res.data.data;
              for(var val of this.tableData) {
                val.time=sec_to_time(val.time)
              }
            }
          });
        },
        rowClick(row){
          //********** 往本地存歌曲的ID，查找是否存在若存在则删除重新添加到最新的位置。
          var storage=window.localStorage;
          var isMusicId=storage.getItem("musicId");
          var isMusicIdObj=JSON.parse(isMusicId);
          if(isMusicIdObj){
            if(isMusicIdObj.musicId.indexOf(row.id)==-1){
              isMusicIdObj.musicId.unshift(row.id);
              console.log('不在',row.id)
            }else {
              isMusicIdObj.musicId.splice(isMusicIdObj.musicId.indexOf(row.id),1);
              isMusicIdObj.musicId.unshift(row.id);
              // console.log('在',row.id,isMusicIdObj.musicId)
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
            MusicData.musicId.unshift(row.id);
            var musicIdList=JSON.stringify(MusicData);
            storage.setItem("musicId",musicIdList);
            this.$router.push({  //核心语句
              path:'/musicPlay',   //跳转的路径
            })
          }

          //**********
        },
        hoverMusic(row,column,cell,event){
        },
        // 所有歌曲ID
        // 歌单id
      }
    }
</script>

<style scoped lang="scss">
  .songListPic{
    margin-left: 10px;
    height: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .description{
    margin-top: 20px;
    margin-left: 40px;
  p{
    margin: 40px 0px;
    color: #333;
  }
  }
  .btn{
    position: absolute;
    bottom: 0;
    margin-left: 40px;
  button{
    background: transparent;
    outline: none;
    border: 1px solid #c9c9c9;
    font-size: 15px;
    border-radius: 2px;
    margin-right: 6px;
    padding: 0 23px;
    height: 38px;
    line-height: 38px;
    display: inline-block;
    white-space: nowrap;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
  }
  button:hover{
    background-color: #ededed;
  }
  .play{
    background-color: #31c27c;
  }
  .play:hover{
    background-color: #2caf6f;
  }
  }
  .synopsis{
    margin-left: 10px;
  span{
    font-size: 20px;
  }
  p{
    text-indent:2em;
    margin-top:10px ;
    color: #333;
  }
  }
  .icon-play{
    height: 100%;
    opacity: 0;
  }
  .el-table__row:hover{
  .icon-play{
    opacity: 1;
  }
  }
</style>
