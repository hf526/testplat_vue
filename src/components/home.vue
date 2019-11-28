<template>
  <el-container>
    <!--头部区域-->
    <el-header>
      <div class="hf_header">
        <!--<img src="../assets/logo.png">-->
        <span>自动化测试平台</span>
        <el-button @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!--左侧区域-->
      <el-aside width="200px">
        <!--侧边栏菜单-->
        <el-menu background-color="#EBF1F6" text-color="#606266" active-text-color="#409eff">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1"> <i class="el-icon-location"></i>选项1</el-menu-item>
              <el-menu-item index="1-2"> <i class="el-icon-location"></i>选项2</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title"> <i class="el-icon-location"></i>选项4</template>
              <el-menu-item index="1-4-1"> <i class="el-icon-location"></i>选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!--主体区域-->
        <el-main>Main</el-main>
        <!--底部区域-->
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/')
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
  padding-left: 30px;
}
  .el-aside{
    background:#EBF1F6;
  }
.el-footer{
    background:#D4D4D4;
  }
</style>
