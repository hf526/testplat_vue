<template>
  <el-container>
    <!--头部区域-->
    <el-header>
      <div class="hf_header">
        <!--<img src="../assets/logo.png">-->
        <span class="hf_item1">自动化测试平台</span>
        <!--水平菜单，默认可登陆用户均有此菜单-->
        <el-menu class="hf_item2"
                 background-color="#EBF1F6" text-color="#606266" active-text-color="#409eff"
                 mode="horizontal"  >
          <!--菜单收缩栏目-->
          <el-menu-item @click="showicon" index="661"><i class='iconfont icon-zhedie' ></i></el-menu-item>
          <el-menu-item index="111">首页</el-menu-item>
          <el-submenu index="211">
            <template slot="title">我的工作台</template>
            <el-menu-item index="211-1">选项1</el-menu-item>
            <el-menu-item index="211-2">选项2</el-menu-item>
            <el-menu-item index="211-3">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
        <el-dropdown class="hf_item3">
          <span class="el-dropdown-link">
            您好! 管理员
          </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item ><a @click="logout">注销</a></el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <!--左侧区域-->
      <el-aside :width="iconshow ? '80px' : '200px'">
        <!--侧边栏菜单-->
        <el-menu  :collapse='iconshow' :collapse-transition=false :default-active="default_menu"
                  background-color="#EBF1F6" text-color="#606266" active-text-color="#409eff"
                  unique-opened router  >
          <!--一级菜单-->
          <el-submenu v-for="item in menulists" :key="item.id" :index="item.path">
              <template slot="title">
                <i :class='item.icon'></i>
                <span>{{item.title}}</span>
              </template>
              <!--嵌套二级菜单-->
              <el-menu-item v-for="childitem in item.childmenu"
                            :index="childitem.path"  @click="chargedeafult()" :key="childitem.id">
                <i :class='childitem.icon'></i>
                <span>{{childitem.title}}</span>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!--主体区域-->
        <el-main>
          <!--路由占位符-->
          <router-view></router-view>
        </el-main>
        <!--底部区域-->
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () {
    this.getmenulist()
    // this.chargedeafult()
  },
  data () {
    return {
      iconshow: false,
      menulists: [],
      default_menu: ''
    }
  },
  methods: {
    // icon显示方法
    showicon () {
      console.log('x1')
      this.iconshow = !this.iconshow
    },
    // 退出方法
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    // 取得菜单方法
    getmenulist () {
      this.$http.get('showmenu').then(response => {
        if (response.data.status === 200) {
          this.menulists = response.data.data
        } else {
          this.$message.error(JSON.stringify(response.data.data))
        }
      }).catch(function (error) {
        console.log(error)
        this.$message.error('网络异常或服务器异常，请重试')
      })
    },
    // 用来存储当前激活的菜单
    chargedeafult () {
      // this.$message(window.location.pathname)
      // console.log(window.location.href)
      // this.default_menu = window.location.pathname
    }
  }
}
</script>

<style scoped>
  .el-container{
    height: 100%;
  }
.el-header{
  background:#EBF1F6;

}
/*头部样式*/
.hf_header{
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  align-items:center;
}
/*将头部item左移，230是左边的宽度，*/
  .hf_item1 {
    text-align: center;
    width: 180px;
  }
  .hf_item2 {
    margin-right: auto;
  }

  .el-aside{
    background:#EBF1F6;
  }
.el-footer{
    background:#D4D4D4;
  }
</style>
