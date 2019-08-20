import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Banner from '@/components/Banner.vue'
import HomePageList from '@/components/HomePageList.vue'
import musicPlay from '@/components/musicPlay.vue'
import musicList from '@/components/musicList.vue'
import MvPlay from '@/components/mvPlay.vue'
import Singer from '@/components/Singer.vue'
import RankingList from '@/components/RankingList.vue'
import SongSheet from '@/components/SongSheet.vue'
import MVList from '@/components/MVList.vue'
import MyMusic from '@/components/MyMusic.vue'
import Search from '@/components/Search.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      children: [
        {
          path: '/banner',
          name: 'Banner',
          component: Banner
        },
        {
          path: '/HomePageList',
          name: 'HomePageList',
          component: HomePageList
        },
        {
          path: '/musicPlay',
          name: 'musicPlay',
          component: musicPlay
        },
        {
          path: '/musicList',
          name: 'musicList',
          component: musicList
        },
        {
          path: '/MvPlay',
          name: 'MvPlay',
          component: MvPlay
        },
        {
          path:'/Singer',
          name:'/Singer',
          component:Singer
        },{
          path:'/RankingList',
          name:'RankingList',
          component:RankingList
        },
        {
          path:'/SongSheet',
          name:'SongSheet',
          component:SongSheet
        },
        {
          path:'/MVList',
          name:'MVList',
          component:MVList
        },{
          path:'/MyMusic',
          name:'MyMusic',
          component:MyMusic
        },{
          path:'/Search',
          name:'Search',
          component:Search
        }

      ]
    },

  ]
})
