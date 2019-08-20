<template>
  <div style="height: 100%">
    <div class="max_box" :style = "{ 'background-image': 'url(' + music +')'}"></div>
    <div><el-button @click="back" style="font-size: 30px;margin-left: 10px;cursor: pointer;position: relative;background: transparent" class="iconfont icon-fanhui"></el-button></div>
    <div class="test">

      <el-row>
        <el-col :span="17" >
          <el-row class="btn">
         <!--<button @click="collect" class="iconfont icon-xin"> 收藏</button>-->
           <!--<button @click="Delete" class="iconfont icon-shanchu"> 删除</button>-->
           <!--<button @click="clearAll" class="iconfont icon-qingkong"> 清空列表</button>-->
          </el-row>
          <el-table
            ref="multipleTable"
            :data="musicData"
            tooltip-effect="dark"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            @select="selectMusic"
            @row-click="rowClick"
            type="index"
            :row-style="getRowClass" :header-row-style="getHeaderClass" :header-cell-style="getRowClass"
          >
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
                  <span v-for="(item,index) in scope.row.artist"><span v-if="index>0?true:false">/</span>{{item.name}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              label="时长"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="7" style="height: 400px">
          <div class="Canvas">
            <!--<canvas id="live2d" height="400" ></canvas>-->
            <div>
              <el-row class="playBtn">
                <el-col :span="8"><button @click="PrePlay" class="iconfont play icon-shangyishou "></button></el-col>
                <el-col :span="8"><button @click="Play" ref="playBtn" class="iconfont play icon-bofang "></button></el-col>
                <el-col :span="8"><button @click="NextPlay" class="iconfont play icon-xiayishou "></button></el-col>
              </el-row>

            </div>
          </div>
        </el-col>

      </el-row>
    </div>
    <div class="aplayer" id="aplayer" ref="abc"></div>
  </div>

</template>
<script>
  import 'aplayer/dist/APlayer.min.css';

  import APlayer from 'aplayer';
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
  var ap ='';
  export default {
    name: "musicPlay",
    data(){
      return {
        music:'',
        multipleSelection: [],
        tableData:[],
        musicData:[],
        collectMusic:[]

      };
    },
    methods: {
      back(){
        this.$router.go(-1)
      },
      tableRowClassName ({row, rowIndex}) {
        // 把每一行的索引放进row
        row.index = rowIndex;
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {
        return "background:transparent;color:#000;border: 0.1px solid #fff";
      },
      getHeaderClass({ row, column, rowIndex, columnIndex }) {
        return "background:white;opacity: 0.5;border: 0.1px solid #fff";
      },
      rowClick(row){
        console.log(row)
        ap.list.switch(row.index);
        ap.play()
      },
      selectMusic(row){
        this.collectMusic=row
        // console.log(row)
      },
      // collect(){
      //   // var da=JSON.parse(JSON.stringify(this.collectMusic));
      //   for(var i=0;i<this.collectMusic.length;i++){
      //     // console.log(this.collectMusic[i])
      //     let txt=this.collectMusic[i].url;
      //     let re1='.*?';	// Non-greedy match on filler
      //     var re2='(\\d+)';	// Integer Number 1
      //
      //     let p = new RegExp(re1+re2,["i"]);
      //     let m = p.exec(txt);
      //     if (m != null)
      //     {
      //       let int=m[1];
      //       let storage=window.localStorage;
      //       let MusicList=storage.getItem("musicCollect");
      //       let MusicListObj=JSON.parse(MusicList);
      //       if(MusicListObj){
      //         if(MusicListObj.musicIdCollect.indexOf(int)==-1){
      //           MusicListObj.musicIdCollect.unshift(int);
      //         }else {
      //           MusicListObj.musicIdCollect.splice(MusicListObj.musicIdCollect.indexOf(int),1);
      //           MusicListObj.musicIdCollect.unshift(int);
      //         }
      //         let MusicIdObj=JSON.stringify(MusicListObj);
      //         storage.setItem("musicCollect",MusicIdObj);
      //       }else {
      //         let MusicDataCollect={
      //           musicIdCollect:[]
      //         };
      //         MusicDataCollect.musicIdCollect.unshift(int);
      //         let musicIdList=JSON.stringify(MusicDataCollect);
      //         storage.setItem("musicCollect",musicIdList);
      //       }
      //     }
      //   }
      // },
      // Delete(){
      //   let deleteMusicList=[];
      //   for(let val of this.collectMusic) {
      //     deleteMusicList.push(val.index);
      //     // console.log(val.index)
      //   }
      //   deleteMusicList.sort((a,b)=>{
      //     return b-a
      //   });
      //   let storage=window.localStorage;
      //   let isMusicId=storage.getItem("musicId");
      //   let isMusicIdObj=JSON.parse(isMusicId);
      //   console.log(deleteMusicList);
      //   for(let v of deleteMusicList) {
      //     isMusicIdObj.musicId.splice(v,1);
      //     this.musicData.splice(v, 1);
      //     ap.list.remove(v);
      //   }
      //
      //   let MusicIdObj=JSON.stringify(isMusicIdObj);
      //   storage.setItem("musicId",MusicIdObj);
      // },
      // clearAll(){
      //   let storage=window.localStorage;
      //   let isMusicId=storage.getItem("musicId");
      //   let isMusicIdObj=JSON.parse(isMusicId);
      //
      //   isMusicIdObj.musicId=[];
      //   this.musicData=[];
      //   ap.list.clear();
      //   let MusicIdObj=JSON.stringify(isMusicIdObj);
      //   storage.setItem("musicId",MusicIdObj);
      //
      // },
      PrePlay(){
        ap.skipBack()
      },
      Play(){
        if(this.$refs.playBtn.classList[2]=='icon-bofang'){
          this.$refs.playBtn.classList.remove("icon-bofang");
          this.$refs.playBtn.classList.add("icon-zanting1")
        }else {
          this.$refs.playBtn.classList.remove("icon-zanting1");
          this.$refs.playBtn.classList.add("icon-bofang");
        }
        ap.toggle()
      },
      NextPlay(){
        ap.skipForward()
      }
    //  **************
    },
    mounted() {
      ap = new APlayer({
        container: document.getElementById('aplayer'),
        autoplay: true,
        theme: '#FADFA3',
        loop: 'all',
        preload: 'auto',
        volume: 0.7,
        listFolded: true,
        listMaxHeight:5,
        lrcType: 3,
        mutex:true,
        storageName:'aplayer-setting',
        audio:[],
      });
      // console.log(this.$route.query.id)
      // 先把所有的歌曲ID拿到
      // let id=this.$route.query.id;
      var storage=window.localStorage;
      var isMusicId=storage.getItem("musicId");
      var isMusicIdObj=JSON.parse(isMusicId);
      // console.log(isMusicId,isMusicIdObj);
      var th=this;
      let muList=[];
      for(var val of isMusicIdObj.musicId) {
        muList.push(val)
      }
      this.axios.get('https://v1.itooi.cn/netease/song?id='+muList).then((res)=>{
        let result = res.data.code;
        if(result === 200){
          console.log(res)
          let musicList=res.data.data.songs.map(val=>({
            name:val.name,
            artist:val.ar,
            url:"https://v1.itooi.cn/netease/url?id="+val.id+"&quality=flac",
            cover:val.al.picUrl,
            lrc:"https://v1.itooi.cn/netease/lrc?id="+val.id,
            time: sec_to_time(val.dt),
            theme: '#ebd0c2',
            musicId:val.id
          }))
          console.log(musicList)
          this.musicData=musicList
          ap.list.add(musicList);
        }
      });
      // ap.list.hide()
      ap.on('loadeddata', function () {
        var txt=ap.audio.src;
        var re1='.*?';	// Non-greedy match on filler
        var re2='(\\d+)';	// Integer Number 1

        var p = new RegExp(re1+re2,["i"]);
        var m = p.exec(txt);
        if (m != null)
        {
          var int1=m[1];
          console.log(int1);
          $.ajax({
            async: false,
            type : "get",
            url :'/music/netease/song?key=579621905&id='+int1,
            dataType : 'json',
            success : function(data) {
              // console.log(data)
              th.music= data.data.pic
            }
          });
        }
      });
      ap.on('play', function () {
        th.$refs.playBtn.classList.remove("icon-bofang");
        th.$refs.playBtn.classList.add("icon-zanting1");
      });
      ap.on('pause', function () {
        th.$refs.playBtn.classList.remove("icon-zanting1");
        th.$refs.playBtn.classList.add("icon-bofang");
      });
    },
    destroyed(){
      // ap.destroy()
    }


  //
  //

  }
</script>

<style scoped lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  .max_box{
    position: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    filter: blur(65px);
    opacity: .8;
    /*color: transparent;*/
  }
  .aplayer{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
  }
  .test{
    width: 100%;
    /*position: absolute;*/
    top: 35px;
    left: 0;
  }
  .btn{
    /*position: fixed;*/
    margin-left: 10px;
    button{
      background: transparent;
      outline: none;
      border: 1px solid #c9c9c9;
      font-size: 15px;
      color: black;
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
      border: 1px solid white;
    }
  }
  .el-table{
    background: transparent;
    thead{
      background-color: white;
      opacity: 0.5;
    }
  }
  .Canvas{
    position: fixed;
    right: 10px;
    top: 10px;
    z-index: 222;
  }
  .play{
    font-size: 25px;
    background: transparent;
    outline: none;
    cursor: pointer;
  }
  .playBtn{
    text-align: center;
  }




</style>
