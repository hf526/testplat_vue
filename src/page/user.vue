<template>
  <div>
    <!--导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>用户管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!--导航区域-->
      <!--<div slot="header" >-->
      <!--</div>-->
      <!--查询内容区域-->
      <el-row :gutter="20">
        <!--查询框-->
        <el-col :span="6">
          <div class="text item">
            <el-input placeholder="请输入要查询的内容" v-model="queryinfo.query" clearable >
              <el-button slot="append" icon="el-icon-search" @click="getuserlist()"></el-button>
            </el-input>
          </div>
        </el-col>
        <!--添加按钮-->
        <el-col :span="6"> <el-button type="primary" @click="dialogFormVisible=true">添加</el-button></el-col>
      </el-row>
      <!--表格区域-->
      <el-table :data="userdata" width="120px" >
        <el-table-column label="ID" type="index" width="120px"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
        <el-table-column label="更新时间" prop="updatedate"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"
            @change="chargestatus(scope.row)"  active-color="#13ce66">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域，layout需要显示的组件，page-sizes查询分页的值 page-size每页显示的个数,current-page.sync当前页-->
      <el-pagination    :page-sizes="[10,50,100]" :page-size="100" current-page.sync="10" :total=100
                        @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        layout="total, sizes, prev, pager, next, jumper"></el-pagination>

      <!--添加用户-->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible" class="addupdialog">
        <el-form ref="form" :rules="userrules" :model="userform"  label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userform.username" ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="userform.password"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="userform.role" placeholder="请选择角色权限">
              <el-option label="管理员" value="admin"></el-option>
              <el-option label="普通用户" value="user"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'user',
  // 组件创造初始化方法，
  created () {
    this.getuserlist()
  },
  data () {
    return {
      queryinfo: {
        page: 1,
        count: 10,
        query: ''
      },
      userform: {
        role: '',
        password: '',
        username: ''
      },
      userrules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择角色权限', trigger: 'change' }
        ]
      },
      userdata: [],
      dialogFormVisible: false
    }
  },
  methods: {
    // 查询获取用户列表
    async getuserlist () {
      await this.$http.get(this.$apilist.userlist, { params: this.queryinfo })
        .then(response => {
          if (response.data.status === 200) {
            this.userdata = response.data.data
          }
        })
        .catch(error => {
          this.$message.error('网络异常或服务器异常，请重试！')
          console.log(error)
        })
    },
    // 修改用户状态
    async chargestatus (userinfo) {
      await this.$http.post(this.$apilist.upuserstatus, { id: userinfo.id, status: userinfo.status })
        .then(response => {
          if (response.data.status === 200) {
            this.$message.success('用户状态更新成功！')
          } else {
            userinfo.status = !userinfo.status
            this.$message.error('用户状态更新失败！')
          }
        })
        .catch(error => {
          this.$message.error('网络异常或服务器异常，请重试！')
          console.log(error)
        })
    },
    async handleSizeChange () {
      await this.$http.get(this.$apilist.userlist, { params: this.queryinfo })
        .then(response => {
          if (response.data.status === 200) {
            this.userdata = response.data.data
          }
        })
        .catch(error => {
          this.$message.error('网络异常或服务器异常，请重试！')
          console.log(error)
        })
    },
    handleCurrentChange () {

    }
  }
}
</script>

<style scoped>
.el-pagination{
  margin-top: 10px;
}
  .el-card{
    margin-top: 15px;
  }
  /*.addupdialog{*/
    /*width: 50%;*/
    /*text-align: center;*/
  /*}*/
</style>
