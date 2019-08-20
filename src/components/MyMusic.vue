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
            <img  alt="" style="width: 40px ;width: 40px" :src="pic">
            <span slot="title">我喜欢的音乐</span>
          </el-menu-item>
          <div style="padding: 0 20px"> 收藏的歌单</div>
          <el-menu-item v-for="(item,index) in songListData" :key="item.songListId" :index="(index+2).toString()">
            <div style="overflow: hidden">
              <div style="display: inline-block"><img style="width: 40px ;width: 40px" alt="" :src="item.songListPic"></div>
              <div style="display: inline-block;width: 80%">
                <p style="width: 100%;line-height: 20px">{{item.songListName}}</p>
                <p style="line-height: 20px;font-size: 12px;color: gainsboro">{{item.songListCount}}首<button @click.stop="DeleteMusicList(item.songListId)" class="iconfont icon-shanchu"></button></p>
              </div>
            </div>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <div class="max_box">
          <el-row style="position: relative">
            <el-col :span="6">
              <div v-if="key === '1'" class="songListPic" :style = "{ 'background-image': 'url(' + pic +')'}"></div>
              <div v-else class="songListPic" :style = "{ 'background-image': 'url(' + songListData[key-2].songListPic +')'}"></div>
            </el-col>
            <el-col :span="18">
              <div class="description">
                <h1 v-if="key === '1'">我喜欢的音乐</h1>
                <h1 v-else>{{songListData[key-2].songListName}}</h1>
                <p v-if="key !== '1'">播放量：{{songListData[key-2].songListPlayCount}}</p>
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
                  label="歌手"
                >
                  <template slot-scope="scope">
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
    name: "MyMusic",
    data(){
      return {
        tableData:[],
        songListData:[],
        imgData:'',
        creator:'',
        key:'1',
        pic:''
      };
    },
    mounted() {
      // console.log(this.id);
      // https://api.itooi.cn/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0
      // netease/songList?id=141998290&pageSize=20
      let storage=window.localStorage;
      let isMusicId=storage.getItem("musicCollect");
      let isMusicIdObj=JSON.parse(isMusicId);
      let songListId=storage.getItem("songListId");
      let songList=JSON.parse(songListId);
      // console.log(isMusicId,isMusicIdObj);
      var th=this;
      if(isMusicIdObj){
      for(var val of isMusicIdObj.musicIdCollect) {
        $.ajax({
          async: false,
          type : "get",
          url :'https://api.itooi.cn/music/netease/song?key=579621905&id='+val,
          dataType : 'json',
          success : function(data) {
            let MData={
              id:data.data.id,
              name:data.data.name,
              singer:data.data.singer,
              url:data.data.url,
              cover:data.data.pic,
              lrc:data.data.lrc,
              time: sec_to_time(data.data.time),
              theme: '#ebd0c2'
            };
            th.tableData.push(MData)
          }
        });
      }
      this.pic=this.tableData[0].cover;
      }
      for(var val of songList.id) {
        $.ajax({
          async: true,
          type : "get",
          // https://v1.itooi.cn/netease/songList?id='+val+'&pageSize=20
          url :'https://v1.itooi.cn/netease/songList?id='+val,
          dataType : 'json',
          success : function(data) {
            console.log(data);
            let MData={
              songListCount:data.data.trackCount,
              songListId:data.data.id,
              songListName:data.data.name,
              songListUserId:data.data.creator.userId,
              songListPic:data.data.coverImgUrl,
              songListPlayCount:data.data.playCount
            };
            th.songListData.push(MData)
          }
        });
      }
    },
    methods: {
      DeleteMusicList(item){
        let th=this;
        let id=parseInt(item);
        let storage=window.localStorage;
        let songListId=storage.getItem("songListId");
        let songList=JSON.parse(songListId);
        this.$confirm('此操作将永久删除该歌单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          songList.id.splice(songList.id.indexOf(id),1);
          let songListObj=JSON.stringify(songList);
          storage.setItem("songListId",songListObj);
          this.songListData=[];
          for(var val of songList.id) {
            $.ajax({
              async: true,
              type : "get",
              // https://v1.itooi.cn/netease/songList?id='+val+'&pageSize=20
              url :'https://v1.itooi.cn/netease/songList?id='+val,
              dataType : 'json',
              success : function(data) {
                console.log(data);
                let MData={
                  songListCount:data.data.trackCount,
                  songListId:data.data.id,
                  songListName:data.data.name,
                  songListUserId:data.data.creator.userId,
                  songListPic:data.data.coverImgUrl,
                  songListPlayCount:data.data.playCount
                };
                th.songListData.push(MData)
              }
            });
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      handleOpen(key) {
        this.key=key;
        if(key !== '1'){
          this.id=this.songListData[key-2].songListId;
          this.axios.get('https://v1.itooi.cn/netease/songList?id='+this.id).then((res)=>{
            let result = res.data.code;
            if(result === 200){
              this.tableData = res.data.data.tracks;
              for(let val of this.tableData) {
                val.time=sec_to_time(val.duration)
              }
            }
          });
        }

      },
      rowClick(row){
        //********** 往本地存歌曲的ID，查找是否存在若存在则删除重新添加到最新的位置。
        let storage=window.localStorage;
        let isMusicId=storage.getItem("musicId");
        let isMusicIdObj=JSON.parse(isMusicId);
        if(isMusicIdObj){
          if(isMusicIdObj.musicId.indexOf(row.id)==-1){
            isMusicIdObj.musicId.unshift(row.id);
            console.log('不在',row.id)
          }else {
            isMusicIdObj.musicId.splice(isMusicIdObj.musicId.indexOf(row.id),1);
            isMusicIdObj.musicId.unshift(row.id);
            console.log('在',row.id)
          }
          let MusicIdObj=JSON.stringify(isMusicIdObj);
          storage.setItem("musicId",MusicIdObj);
          this.$router.push({  //核心语句
            path:'/musicPlay',   //跳转的路径
          })
        }else {
          let MusicData={
            musicId:[]
          };
          MusicData.musicId.unshift(row.id);
          let musicIdList=JSON.stringify(MusicData);
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
  .icon-shanchu{
    color: #fff;
    font-size: 17px;
    float: right;
    margin-right: 5px;
    background: transparent;
    outline: none;
    cursor: pointer;
    display: none;
  }
  .el-menu-item:hover{
    .icon-shanchu{
      display: inline-block;
    }
  }
</style>
