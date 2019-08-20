<template>
  <div>
    <el-row >
      <el-col :span="18" :offset="3" >
        <el-row>
          <el-col :span="16" :offset="4">
            <div style="margin: 20px 0">
              <el-input placeholder="搜索音乐、MV、歌单" v-model="input" class="input-with-select">
                <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <div style="color: #999;font-size: 14px">搜索"{{searchText}}"，找到<span style="color: #c20c0c">{{songCount}}</span>{{tittle}}</div>
        <el-tabs  @tab-click="handleClick" :stretch="true" type="border-card">
          <!--***********************音乐********************-->
          <el-tab-pane label="音乐">
              <el-table
              :data="tableData"
              stripe
              fit
              :show-header="false"
              style="width: 100%">
              <el-table-column width="40"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="MusicPlay(scope.row)"
                  >
                    <i class="play iconfont icon-bofang"></i>
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="props">
                  <span>{{props.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="props">
                  <span v-for="(item,index) in props.row.ar"><span v-if="index !== 0">/</span>{{item.name}}</span>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="props">
                  <span>《{{props.row.al.name}}》</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @current-change="handleCurrentChange"
              align="center"
              background
              :page-size="20"
              layout="prev, pager, next"
              :total="songCount">
            </el-pagination>
          </el-tab-pane>
          <!--***************************************歌手************************************-->
          <el-tab-pane label="歌手">
            <el-row>
              <el-col  style="margin-bottom: 5px;padding: 0 5px" :span="4" v-for="(item,index) in singerData" :key="index">
                <div @click="handelSinger(item)">
                  <img style="width: 100%;height: 120px" alt="" :src="item.img1v1Url" />
                </div>
                <div style="font-size: 13px">
                  {{item.name}}
                </div>
              </el-col>
            </el-row>
            <el-pagination
              @current-change="pageChangeSinger"
              align="center"
              background
              :page-size="24"
              layout="prev, pager, next"
              :total="songCount">
            </el-pagination>
          </el-tab-pane>
          <!--***************************************歌手*******************完*****************-->
          <!--*************************专辑****************************************************-->
          <el-tab-pane label="专辑">
            <el-row>
              <el-col style="margin-bottom: 5px;padding: 0 5px;overflow: hidden;text-overflow: ellipsis" :span="4" v-for="(item,index) in albumsData" :key="index">
                <div>
                  <img style="width: 100%;height: 120px" alt="" :src="item.blurPicUrl" />
                </div>
                <span style="font-size: 14px;width: 100%;white-space:nowrap;">
                  {{item.name}}
                </span>
                <div style="font-size: 13px">
                  {{item.artist.name}}
                </div>
              </el-col>
            </el-row>
            <el-pagination
              @current-change="pageChangeAlbums"
              align="center"
              background
              :page-size="24"
              layout="prev, pager, next"
              :total="songCount">
            </el-pagination>
          </el-tab-pane>
          <!--*************************专辑***********************完***************************-->
          <!--************************歌单*——***************************************************-->
          <el-tab-pane label="歌单">
            <el-table
              :data="musicList"
              stripe
              fit
              :show-header="false"
              :cell-style="cellStyle"
              style="width: 100%">
              <el-table-column width="70"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="MusicListPlay(scope.row)"
                  >
                   <img width="100%" alt="" :src="scope.row.coverImgUrl" />
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                width="180"
                prop="name"
              >
              </el-table-column>
              <el-table-column
                width="80"
              >
                <template slot-scope="props">
                  <span>{{ props.row.trackCount}} 首</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="creator.nickname"
              >
              </el-table-column>
              <el-table-column>
                <template slot-scope="props">
                  <span>播放：{{ props.row.playCount}}</span>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="props">
                  <span>收藏：{{ props.row.bookCount}}</span>
                </template>
              </el-table-column>

            </el-table>
            <el-pagination
              @current-change="pageChangePlayList"
              align="center"
              background
              :page-size="20"
              layout="prev, pager, next"
              :total="songCount">
            </el-pagination>
          </el-tab-pane>
          <!--**************************************歌单***************************完*******-->
          <!--*****************************视频***************************************-->
          <el-tab-pane label="视频">
            <el-row>
            <el-col style="margin-bottom: 5px;padding: 0 5px;overflow: hidden;text-overflow: ellipsis" :span="4" v-for="(item,index) in videoData" :key="index" >
              <div @click="playVideo(item)">
                <img style="width: 100%;height: 120px" alt="" :src="item.coverUrl" />
              </div>
              <span style="font-size: 14px;width: 100%;white-space:nowrap;">
                <i v-if="item.type === 0" style="color: red;" class="iconfont icon-mv"></i>
                  {{item.title}}
                </span>
              <div style="font-size: 13px">
                {{item.creator[0].userName}}
              </div>
            </el-col>
          </el-row>
            <el-pagination
              @current-change="pageChangeVideo"
              align="center"
              background
              :page-size="24"
              layout="prev, pager, next"
              :total="songCount">
            </el-pagination>
          </el-tab-pane>
          <!--*******************************视频***************8完*********************-->
          <!--*******************************歌词************************************-->
          <el-tab-pane label="歌词" type="expand" >
            <el-table
              stripe
              :show-header="false"
              :data="lrcData"
              style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <div v-for="item in props.row.lyrics">{{item}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="name">
              </el-table-column>
              <el-table-column>
                <template slot-scope="props">
                  <span v-for="(item,index) in props.row.ar"><span v-if="index !== 0">/</span>{{item.name}}</span>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="props">
                  <span>《{{ props.row.al.name}}》</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @current-change="pageChangeLrc"
              align="center"
              background
              :page-size="20"
              layout="prev, pager, next"
              :total="songCount">
            </el-pagination>
          </el-tab-pane>
          <!--*******************************歌词******************完******************-->
        </el-tabs>
      </el-col>
    </el-row>

  </div>
</template>

<script>
    export default {
        name: "Search",
      data() {
        return {
          input:this.$store.state.inputM,
          searchText:this.$store.state.inputM,
          tableData: [],
          songCount:0,
          pageNumber:0,
          singerData:[],
          albumsData:[],
          musicList:[],
          videoData:[],
          lrcData:[],
          label:'音乐',
          tittle:'首单曲'
        };
      },
      computed:{
      },
      methods:{
        handelSinger(item){
          console.log(item)
          this.$router.push({  //核心语句
            path:'/Singer',   //跳转的路径
            query:{           //路由传参时push和query搭配使用 ，作用时传递参数
              id:item.id,
              data:item
            }
          })
        },
          playVideo(item){
            console.log(item);
            this.$router.push({  //核心语句
              path:'/mvPlay',   //跳转的路径
              query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                id:item.vid,
                type:0,
                data:item
              }
            })
          },
        MusicListPlay(row){
          this.$router.push({  //核心语句
            path:'/musicList',   //跳转的路径
            query:{           //路由传参时push和query搭配使用 ，作用时传递参数
              id:row.id,
              creator:row.creator.nickname
            }
          });
          console.log(row)
        },
        MusicPlay(row){
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
        },
        //  *********
        cellStyle({row, column, rowIndex, columnIndex}){
          if(columnIndex === 2||columnIndex === 4){ //指定坐标
            return 'text-align:right'
          }else if(columnIndex === 2){
            return ''
          }
        },
          //点击搜索
          search(){
            this.$store.commit("INPUT",this.input);
            this.searchText=this.input;
            // 当前选项为音乐
            if(this.label === '音乐'){
              this.axios.get('https://v1.itooi.cn/netease/search?keyword='+this.input+'&type=song&pageSize=20&page='+this.pageNumber).then((res)=>{
                let result = res.status;
                if(result === 200){
                  console.log(res.data.data);
                  this.tableData=res.data.data.songs;
                  this.songCount=res.data.data.songCount;
                  this.tittle='首单曲'
                }
              });
            }
            // 当前选项为音乐
            if(this.label === '歌手'){
              this.axios.get('https://v1.itooi.cn/netease/search?keyword='+this.input+'&type=singer&pageSize=24&page='+this.pageNumber).then((res)=>{
                let result = res.status;
                if(result === 200){
                  this.singerData=res.data.data.artists;
                  this.tittle='个歌手';
                  this.songCount=res.data.data.artistCount;
                  console.log(res.data.data);
                }
              });
            }
            if(this.label === '专辑'){
              this.axios.get('https://v1.itooi.cn/netease/search?keyword='+this.input+'&type=album&pageSize=24&page='+this.pageNumber).then((res)=>{
                let result = res.status;
                if(result === 200){
                  this.tittle='张专辑';
                  this.songCount=res.data.data.albumCount;
                  console.log(res.data.data);
                }
              });
            }
            if(this.label === '歌单'){
              this.axios.get('https://v1.itooi.cn/netease/search?keyword='+this.input+'&type=songList&pageSize=20&page='+this.pageNumber).then((res)=>{
                let result = res.status;
                if(result === 200){
                  this.tittle='个歌单';
                  this.songCount=res.data.data.playlistCount;
                  this.musicList=res.data.data.playlists;
                  console.log(res.data.data);
                }
              });
            }
            if(this.label === '视频'){
              // https://api.itooi.cn/music/netease/search?key=579621905&s=%E6%88%91%E5%96%9C%E6%AC%A2%E4%B8%8A%E4%BD%A0%E5%86%85%E5%BF%83%E6%97%B6%E7%9A%84%E6%B4%BB%E5%8A%A8&type=video&limit=100&offset=0
              this.axios.get('https://api.itooi.cn/music/netease/search?key=579621905&s='+this.input+'&type=video&limit=24&offset='+this.pageNumber).then((res)=>{
                let result = res.status;
                if(result === 200){
                  this.tittle='个视频';
                  this.songCount=res.data.data.videoCount;
                  this.videoData=res.data.data.videos;
                  console.log(res.data.data);
                }
              });
            }
            if(this.label === '歌词'){
              this.axios.get('https://v1.itooi.cn/netease/search?keyword='+this.input+'&type=lrc&pageSize=20&page='+this.pageNumber).then((res)=>{
                let result = res.status;
                if(result === 200){
                  this.tittle='个歌词';
                  this.songCount=res.data.data.songCount;
                  this.lrcData=res.data.data.songs;
                  console.log(res.data.data);
                }
              });
            }

        },
        // 切换搜索类型***************************************************
        handleClick(tab) {
          this.label=tab.label;
          if(this.label === '音乐'){
            this.axios.get('https://v1.itooi.cn/netease/search?keyword='+this.input+'&type=song&pageSize=20&page='+this.pageNumber).then((res)=>{
              let result = res.status;
              if(result === 200){
                console.log(res.data.data);
                this.tableData=res.data.data.songs;
                this.songCount=res.data.data.songCount;
                this.tittle='首单曲'
              }
            });
          }
          if(this.label === '歌手'){
            this.axios.get('https://v1.itooi.cn/netease/search?keyword='+this.input+'&type=singer&pageSize=24&page='+this.pageNumber).then((res)=>{
              let result = res.status;
              if(result === 200){
                this.singerData=res.data.data.artists;
                this.tittle='个歌手';
                this.songCount=res.data.data.artistCount;
                console.log(res.data.data);
              }
            });
          }
          if(this.label === '专辑'){
            this.axios.get('https://v1.itooi.cn/netease/search?keyword='+this.input+'&type=album&pageSize=24&page='+this.pageNumber).then((res)=>{
              let result = res.status;
              if(result === 200){
                this.tittle='张专辑';
                this.songCount=res.data.data.albumCount;
                this.albumsData=res.data.data.albums;
                console.log(res.data.data);
              }
            });
          }
          if(this.label === '歌单'){
            this.axios.get('https://v1.itooi.cn/netease/search?keyword='+this.input+'&type=songList&pageSize=20&page='+this.pageNumber).then((res)=>{
              let result = res.status;
              if(result === 200){
                this.tittle='个歌单';
                this.songCount=res.data.data.playlistCount;
                this.musicList=res.data.data.playlists;
                console.log(res.data.data);
              }
            });
          }
          if(this.label === '视频'){
            this.axios.get('https://api.itooi.cn/music/netease/search?key=579621905&s='+this.input+'&type=video&limit=24&offset=0'+this.pageNumber).then((res)=>{
              let result = res.status;
              if(result === 200){
                this.songCount=res.data.data.videoCount;
                this.tittle='个视频';
                this.videoData=res.data.data.videos;
                console.log(res.data.data);
              }
            });
          }
          if(this.label === '歌词'){
            this.axios.get('https://v1.itooi.cn/netease/search?keyword='+this.input+'&type=lrc&pageSize=20&page='+this.pageNumber).then((res)=>{
              let result = res.status;
              if(result === 200){
                this.tittle='个歌词';
                this.songCount=res.data.data.songCount;
                this.lrcData=res.data.data.songs;
                console.log(res.data.data);
              }
            });
          }
        },
        // 翻页*******************************************************
        // 音乐翻页
        handleCurrentChange(val) {
            this.pageNumber=parseInt(val);
            this.axios.get('https://v1.itooi.cn/netease/search?keyword='+this.input+'&type=song&pageSize=20&page='+this.pageNumber).then((res)=>{
              let result = res.status;
              if(result === 200){
                console.log(res.data.data);
                this.tableData=res.data.data.songs;
                this.songCount=res.data.data.songCount;
              }
            });
        },
        //歌手翻页
        pageChangeSinger(val) {
          this.pageNumber=parseInt(val);
          this.axios.get('https://v1.itooi.cn/netease/search?keyword='+this.input+'&type=singer&pageSize=24&page='+this.pageNumber).then((res)=>{
            let result = res.status;
            if(result === 200){
              this.singerData=res.data.data.artists;
            }
          });
        },
      //  专辑翻页
        pageChangeAlbums(val) {
          this.pageNumber=parseInt(val);
          this.axios.get('https://v1.itooi.cn/netease/search?keyword='+this.input+'&type=album&pageSize=24&page='+this.pageNumber).then((res)=>{
            let result = res.status;
            if(result === 200){
              this.albumsData=res.data.data.albums
            }
          });
        },
      //  歌单翻页
        pageChangePlayList(val) {
          this.pageNumber=parseInt(val);
          this.axios.get('https://v1.itooi.cn/netease/search?keyword='+this.input+'&type=songList&pageSize=20&page='+this.pageNumber).then((res)=>{
            let result = res.status;
            if(result === 200){
              this.musicList=res.data.data.playlists;
            }
          });
        },
        // 视频翻页
        pageChangeVideo(val) {
          this.pageNumber=parseInt(val);
          this.axios.get('https://api.itooi.cn/music/netease/search?key=579621905&s='+this.input+'&type=video&limit=24&offset=0'+this.pageNumber).then((res)=>{
            let result = res.status;
            if(result === 200){
              this.videoData=res.data.data.videos;
            }
          });
        },
        // 歌词翻页
        pageChangeLrc(val) {
          this.pageNumber=parseInt(val);
          this.axios.get('      /music/netease/search?key=579621905&s='+this.input+'&type=lrc&limit=24&offset=0'+this.pageNumber).then((res)=>{
            let result = res.status;
            if(result === 200){
              this.lrcData=res.data.data.songs;
            }
          });
        },
      },
      mounted(){
        console.log(this.input);
        this.axios.get('https://v1.itooi.cn/netease/search?keyword='+this.input+'&type=song&pageSize=20&page=0').then((res)=>{
          let result = res.status;
          if(result === 200){
            this.tableData=res.data.data.songs;
            this.songCount=res.data.data.songCount;
            console.log(res.data.data);
          }
        });

      }
    }
</script>

<style scoped lang="scss">

    .play:hover{
      color: red;
      cursor: pointer;
  }

</style>
