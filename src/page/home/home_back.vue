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
                 mode="horizontal" router="" >
          <!--菜单收缩栏目-->
          <el-menu-item @click="showicon"><i class='iconfont icon-zhedie' ></i></el-menu-item>
          <el-menu-item index="/home">首页</el-menu-item>
          <el-submenu >
            <template slot="title">我的待办事项</template>
            <el-menu-item @click="nosuccess1()">好句</el-menu-item>
            <el-menu-item @click="nosuccess2()">欣赏古诗</el-menu-item>
            <el-menu-item @click="nosuccess3()">欣赏英文名句</el-menu-item>
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
      <el-aside :width="iconshow ? '80px' : '200px'" style="height: 100%">
        <!--侧边栏菜单-->
        <el-menu  :collapse='iconshow' :collapse-transition=false :default-active="$route.path"
                  background-color="#EBF1F6" text-color="#606266" active-text-color="#409eff"
                  unique-opened router  >
          <!--一级菜单-->
          <el-submenu index="/one">
            <template slot="title">
              <i class="el-icon-coin"></i>
              <span>项目管理</span>
            </template>
            <!--嵌套二级菜单-->
            <el-menu-item index="/home/env">
              <i class="el-icon-coin"></i>
              <span>环境管理</span>
            </el-menu-item>
            <el-menu-item index="/home/project">
              <i class="el-icon-coin"></i>
              <span>项目信息</span>
            </el-menu-item>
            <el-menu-item index="/home/model">
              <i class="el-icon-coin"></i>
              <span>模块管理</span>
            </el-menu-item>
            <el-menu-item index="/home/api">
              <i class="el-icon-coin"></i>
              <span>接口管理</span>
            </el-menu-item>
            <el-menu-item index="/home/case">
              <i class="el-icon-coin"></i>
              <span>用例管理</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="/two">
            <template slot="title">
              <i class="el-icon-coin"></i>
              <span>报告管理</span>
            </template>
            <!--嵌套二级菜单-->
            <el-menu-item index="/home/env">
              <i class="el-icon-coin"></i>
              <span>测试报告</span>
            </el-menu-item>
            <el-menu-item index="/home/env">
              <i class="el-icon-coin"></i>
              <span>定时任务</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="/three">
            <template slot="title">
              <i class="el-icon-coin"></i>
              <span>工具管理</span>
            </template>
            <!--嵌套二级菜单-->
            <el-menu-item index="/home/env">
              <i class="el-icon-coin"></i>
              <span>工具列表</span>
            </el-menu-item>
            <el-menu-item index="/home/env">
              <i class="el-icon-coin"></i>
              <span>内置函数</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="/four">
            <template slot="title">
              <i class="el-icon-coin"></i>
              <span>用户管理</span>
            </template>
            <!--嵌套二级菜单-->
            <el-menu-item index="/home/charge">
              <i class="el-icon-coin"></i>
              <span>用户权限</span>
            </el-menu-item>
            <el-menu-item index="/home/uer">
              <i class="el-icon-coin"></i>
              <span>用户编辑</span>
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
        <!--<el-footer><p>版权所有@胡丰</p></el-footer>-->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () {
    this.getmenulist()
  },
  data () {
    return {
      iconshow: false,
      menulists: [],
      nowtitle: '',
      showmenus: {
        项目管理: false,
        环境管理: false,
        项目信息: false
        // 项目管理:false,
        // 项目管理:false,
        // 项目管理:false,
        // 项目管理:false,
        // 项目管理:false,
        // 项目管理:false,
        // 项目管理:false
      }
    }
  },
  methods: {
    // icon显示方法
    showicon () {
      this.iconshow = !this.iconshow
    },
    // 退出方法
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    // 取得菜单方法
    getmenulist () {
      this.$get(this.$apilist.getmenu).then(res => {
        this.menulists = res.data
      })
    },
    nosuccess1 () {
      this.$message.success('常言道，诗酒趁年华！')
    },
    nosuccess2 () {
      this.$message.success('莫愁前路无知己,天下谁人不识君！')
    },
    nosuccess3 () {
      this.$message.success('A day is a miniature of eternity. ( Emerson ) ')
    }
  }
}
</script>

<style scoped>
  ::-webkit-scrollbar{
    display:none;
  }
  .el-container{
    height: 100%;
    background: #f5f7fa;
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
</style>
