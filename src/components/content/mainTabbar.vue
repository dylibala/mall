<template>
  <div>
    <tab-bar>
      <tab-bar-items path="/home" >
        <!-- 这里想向子组件传递的就是/home,所以不用加v-bind -->
        <!-- src="~assets/img/tarbar/home.png" 这里是在webpack.base.conf.js中为assets文件夹起了个别名 -->
        <img slot="icon" src="~assets/img/tarbar/home.png" alt="" />
        <img
          slot="icon_active"
          src="~assets/img/tarbar/home_active.svg"
          alt=""
        />
        <div slot="text">首页</div>
      </tab-bar-items>
      <tab-bar-items path="/category" >
        <img slot="icon" src="~assets/img/tarbar/category.png" alt="" />
        <img
          slot="icon_active"
          src="~assets/img/tarbar/category_active.svg"
          alt=""
        />
        <div slot="text">分类</div>
      </tab-bar-items>
      <tab-bar-items path="/cart" >
        <img slot="icon" src="~assets/img/tarbar/cart.png" alt="" />
        <img
          slot="icon_active"
          src="~assets/img/tarbar/cart_active.svg"
          alt=""
        />
        <div slot="text">购物车</div>
      </tab-bar-items>
      <tab-bar-items path="/mine" >
        <img slot="icon" src="~assets/img/tarbar/mine.png" alt="" />
        <img
          slot="icon_active"
          src="~assets/img/tarbar/mine_active.svg"
          alt=""
        />
        <div slot="text">我的</div>
      </tab-bar-items>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "../common/tarbar/tabbar.vue";
import TabBarItems from "../common/tarbar/tabbar-items.vue";

export default {
  name:'MainTabbar',
  components: {
    TabBar,
    TabBarItems,
  },
}
</script>

<style scoped>
</style>