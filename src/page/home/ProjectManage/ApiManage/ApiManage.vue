<template>
  <div>
    <!--导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>接口管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!--查询内容区域-->
      <el-form ref="form" :inline="true"  :model="selform" label-position="left" label-width="80px">
        <el-form-item>
          <el-select v-model="selform.status" placeholder="选择查询的项目">
            <el-option label="网上商城" value="0"></el-option>
            <el-option label="购物搜索" value="1"></el-option>
            <el-option label="所有项目" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!--查询框-->
        <el-form-item>
          <div class="text item">
            <el-input placeholder="请输入要查询的内容" v-model="queryinfo.query" clearable>
              <el-button slot="append" icon="el-icon-search" @click="getmessage()"></el-button>
            </el-input>
          </div>
        </el-form-item>

      </el-form>
      <el-tabs v-model="activeName">
        <el-tab-pane label="接口信息" name="second">
          <api/>
        </el-tab-pane>
        <el-tab-pane label="接口配置" name="third">
          <config/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import config from '@/page/home/ProjectManage/ApiManage/config'
import api from '@/page/home/ProjectManage/ApiManage/api'
export default {
  name: 'ApiManage',
  // 组件创造初始化方法，
  components: {
    config,
    api
  },
  watch: {
    dialogFormVisible (newfrom, oldform) {
      if (newfrom === false) {
        this.$refs.form.resetFields()
      }
    },
    edituser (newfrom, oldform) {
      if (newfrom === false) {
        this.$refs.editform.resetFields()
      }
    }
  },
  created () {
    this.getmessage()
  },
  data () {
    return {
      activeName: 'second',
      // 分页字段
      queryinfo: {
        total: 1,
        page: 1,
        pagesize: 10,
        query: ''
      },
      selform: {
        status: '2',
        role: '1',
        password: '',
        name: '',
        method: '0'
      }
    }
  },
  methods: {
    // 查询获取用户列表
    getmessage () {
      this.$get(this.$apilist.userlist, this.queryinfo)
        .then(res => {
          this.tabledata = res.data
          this.queryinfo.total = res.total
          this.queryinfo.page = res.page
        })
    }
  }
}
</script>

<style scoped>
  .el-pagination {
    margin-top: 10px;
  }

  .el-card {
    margin-top: 15px;
  }

  .size-full {
    width: 100%;
  }

</style>
