<template>
  <div>
    <div>
      <span>{{msg.name}}</span>
    </div>
  </div>

</template>

<script>
    export default {
        name: "Singer",
      data(){
          return{
            id:'',
            item:'',
            msg:''

          }
      },
      mounted() {
       this.id=this.$route.query.id;
       let SingerMsg={};
       SingerMsg.name=this.$route.query.data.name;
       SingerMsg.img=this.$route.query.data.img1v1Url;
       this.msg=SingerMsg;


        this.axios.get('https://v1.itooi.cn/netease/artist/info?id='+this.id).then((res)=>{
          let result = res.status;
          if(result === 200){
            console.log(res.data.data);
          }
        });
      }
    }
</script>

<style scoped lang="scss">

</style>
