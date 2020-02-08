<template>
  <div>
    <!--导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>用户编辑</a></el-breadcrumb-item>
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
            <el-input placeholder="请输入要查询的内容" v-model="queryinfo.query" clearable>
              <el-button slot="append" icon="el-icon-search" @click="getuserlist()"></el-button>
            </el-input>
          </div>
        </el-col>
        <!--添加按钮-->
        <el-col :span="6">
          <el-button type="primary" @click="dialogFormVisible=true">添加</el-button>
        </el-col>
      </el-row>
      <!--表格区域-->
      <el-table :data="userdata" width="120px">
        <el-table-column label="ID" type="index" width="120px"></el-table-column>
        <el-table-column label="环境名称" prop="username"></el-table-column>
        <el-table-column label="环境地址" prop="role"></el-table-column>
        <el-table-column label="关联项目" prop="role"></el-table-column>
        <el-table-column label="创建时间" prop="createdate"></el-table-column>
        <el-table-column label="更新时间" prop="updatedate"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"
                       @change="chargestatus(scope.row)" active-color="#13ce66">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域，layout需要显示的组件，page-sizes查询分页的值 page-size每页显示的个数,current-page.sync当前页-->
      <el-pagination :page-sizes="[10,50,100]" :page-size=queryinfo.pagesize :current-page.sync=queryinfo.page
                     :total=queryinfo.total
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     layout="total, sizes, prev, pager, next, jumper"></el-pagination>

      <!--添加用户-->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible" :show-close=false  width="28%"
                 class="addupdialog">
        <el-form ref="form" :rules="userrules" :model="userform" label-position="left" label-width="70px"
                 style="margin-bottom: -20px;margin-right: 5px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userform.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="userform.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="userform.role" placeholder="请选择角色权限" class="size-full">
              <el-option label="管理员" value="0"></el-option>
              <el-option label="测试员" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
          </el-form-item>
        </el-form>
        <!--<div slot="footer" class="dialog-footer">-->
        <!--</div>-->
      </el-dialog>

      <!--编辑用户-->
      <el-dialog title="编辑用户" :visible.sync="edituser" :show-close=false width="28%" class="addupdialog">
        <el-form ref="editform" :rules="userrules" :model="eduserform" label-position="left" label-width="70px"
                 style="margin-bottom: -20px;margin-right: 5px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="eduserform.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="eduserform.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="eduserform.role" placeholder="请选择角色权限" class="size-full">
              <el-option label="管理员" value="0"></el-option>
              <el-option label="测试员" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="edituser = false">取 消</el-button>
            <el-button type="primary" @click="update">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'EnvManage',
  // 组件创造初始化方法，
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
    this.getuserlist()
  },
  data () {
    return {
      // 分页字段
      queryinfo: {
        total: 1,
        page: 1,
        pagesize: 10,
        query: ''
      },
      userform: {
        role: '1',
        password: '',
        username: ''
      },
      eduserform: {
        role: '1',
        password: '',
        username: ''
      },
      userrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择角色权限', trigger: 'change' }
        ]
      },
      userdata: [],
      dialogFormVisible: false,
      edituser: false
    }
  },
  methods: {
    // 添加用户和编辑用户
    add () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$post(this.$apilist.userlist, this.userform)
            .then(res => {
              this.$message.success('新增成功')
              this.getuserlist()
              this.dialogFormVisible = false
            })
        } else {
          return false
        }
      })
    },
    update () {
      this.$refs.editform.validate((valid) => {
        if (valid) {
          this.$post(this.$apilist.userlist, this.eduserform)
            .then(res => {
              this.$message.success('编辑成功')
              this.getuserlist()
              this.edituser = false
            })
        } else {
          return false
        }
      })
    },
    // 查询获取用户列表
    getuserlist () {
      this.$get(this.$apilist.userlist, this.queryinfo)
        .then(res => {
          this.userdata = res.data
          this.queryinfo.total = res.total
          this.queryinfo.page = res.page
        })
    },
    // 修改用户状态
    chargestatus (userinfo) {
      this.$post(this.$apilist.upuserstatus, userinfo)
        .then(res => {
          this.$message.success('更新成功！')
        })
    },
    // 修改用户弹框
    edit (userinfo) {
      this.eduserform.role = userinfo.role
      this.eduserform.username = userinfo.username
      this.eduserform.password = userinfo.password
      this.edituser = true
    },
    del (userinfo) {
      this.$post(this.$apilist.userlist, userinfo)
        .then(res => {
          this.$message.success('删除成功！')
          this.getuserlist()
        })
    },
    // 分页查询功能,修改
    handleSizeChange (val) {
      this.queryinfo.page = val
      this.getuserlist()
    },
    handleCurrentChange (val) {
      this.getuserlist()
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
