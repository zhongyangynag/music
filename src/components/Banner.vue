<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/HomePageList">首页</el-menu-item>
      <el-menu-item index="/RankingList">排行榜</el-menu-item>
      <el-menu-item index="/SongSheet" >分类歌单</el-menu-item>
      <el-menu-item index="/MVList">MV</el-menu-item>
      <el-menu-item index="/MyMusic">我的音乐</el-menu-item>
      <el-menu-item index="/Search" ref="list" >
        <el-input placeholder="搜索音乐、MV、歌单" :disabled="dis" v-model="input" class="input-with-select">
          <el-button :disabled="dis"  @click="searchMusic" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>

  import HomePageList from "@/components/HomePageList";
  import RankingList from "@/components/RankingList";
  import SongSheet from "@/components/SongSheet";
  import MVList from "@/components/MVList";
  import MyMusic from "@/components/MyMusic";
  import Search from "@/components/Search";

  export default {
    name : 'Banner',
    components: {HomePageList,RankingList,SongSheet,MVList,MyMusic,Search},
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        key:'1',
        input:'',
        dis:false
      };
    },
    methods: {
      handleSelect(key) {
        this.$emit('handle',key)
      },
      searchMusic(){
        this.$store.commit("INPUT",this.input);
        this.key=0;
        this.input='';
        this.dis=true
      }
    }
  }
</script>
<style>

</style>
