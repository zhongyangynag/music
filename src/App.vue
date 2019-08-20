 <template>
  <div style="height: 100%" id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>


<style>
  *{
    margin: 0;
    padding: 0;
    border: 0;
  }
  html{
    height: 100%
  }
  body{
    position:relative;
    height: 100%;
  }
</style>
