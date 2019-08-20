<template>
<div class="max_box">
  <el-button @click="back" style="padding: 0;font-size: 30px;cursor: pointer;position: relative;background: transparent;border: none" class="iconfont icon-fanhui"></el-button>
  <el-row style="position: relative">
    <el-col :span="8">
      <div class="songListPic" :style = "{ 'background-image': 'url(' + imgData.coverImgUrl +')'}">
      </div>
    </el-col>
    <el-col :span="16">
      <div class="description">
        <h1>{{imgData.name}}</h1>
        <span class="iconfont icon-yonghu"> {{this.imgData.creator.nickname}}</span>
        <p>播放量：{{imgData.playCount}}</p>
        <p><span>简介</span>{{imgData.description}}</p>
      </div>
      <div class="btn">
        <button @click="playAll" class="iconfont play icon-icon- "> 全部播放</button>
        <button @click="collect" class="iconfont icon-xin"> 收藏</button>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="16">
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
        label="歌手"
      ><template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <p>{{ scope.row.artists[0].name}}</p>
          </div>
      </template>
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
    <el-col :span="8">
      <div class="synopsis">
        <span>简介</span>
        <p>{{imgData.songListDescription}}</p>
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
        name: "musicList",
      data(){
        return {
          tableData:[],
          imgData:{
            creator:{
            }
          },
        };
      },
      mounted() {
        let id=this.$route.query.id;
        // https://api.itooi.cn/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0
        this.axios.get('https://v1.itooi.cn/netease/songList?id='+id).then((res)=>{
          var result = res.data.code;
          if(result === 200){
            this.tableData = res.data.data.tracks;
            this.imgData=res.data.data;
            for(var val of this.tableData) {
              val.time=sec_to_time(val.duration)
            }
          }
        });
      },
      methods: {
        back(){
          this.$router.go(-1)
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
        playAll(){
          // console.log(this.tableData.tracks)
          var storage=window.localStorage;
          var musicId=[];
          for (var value of this.tableData) {
            musicId.unshift(value.id)
          }
          var isMusicId=storage.getItem("musicId");
          var isMusicIdObj=JSON.parse(isMusicId);
          if(isMusicIdObj){
            for (var val of musicId) {
              if(isMusicIdObj.musicId.indexOf(val)==-1){
                isMusicIdObj.musicId.unshift(val);
                // console.log(1)
              }else {
                // console.log(1234)
              }
            }
            var MusicIdObj=JSON.stringify(isMusicIdObj);
            storage.setItem("musicId",MusicIdObj);
          }else {
            var MusicData={
              musicId:[]
            };
            MusicData.musicId=musicId;
            var musicIdList=JSON.stringify(MusicData);
            storage.setItem("musicId",musicIdList);
          }
          this.$router.push({  //核心语句
            path:'/musicPlay',   //跳转的路径
          })
        },
        // 歌单id
        collect(){
          var id=parseInt(this.imgData.id);
          var storage=window.localStorage;
          var json=storage.getItem("songListId");
          var jsonObj=JSON.parse(json);
          if(jsonObj){
            if(jsonObj.id.indexOf(id)==-1){
              jsonObj.id.unshift(id);
              var songList=JSON.stringify(jsonObj);
              storage.setItem("songListId",songList);
              this.$notify({
                title: '成功',
                message: '收藏歌单成功！',
                type: 'success'
              });
            }else {
              this.$notify({
                title: '警告',
                message: '已经收藏过啦！',
                type: 'warning'
              });
            }
          }else{
            var data={
              id:[]
            };
            data.id.unshift(id);
            var d=JSON.stringify(data);
            storage.setItem("songListId",d);
            this.$notify({
              title: '成功',
              message: '收藏歌单成功',
              type: 'success'
            });
          }

        }
      }
    }

</script>

<style scoped lang="scss">
  .max_box{
    margin-top: 40px;
    padding: 0 50px;
  }
  .songListPic{
    height: 300px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .description{
    margin-left: 40px;
    span{
      color: #333;
      display: block;
      margin: 20px 0px;
    }
    p{
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
