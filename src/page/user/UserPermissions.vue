<template>
  <div>
    <!--导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>用户权限</a></el-breadcrumb-item>
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
      <el-table :data="tabledata" >
        <el-table-column label="ID" type="index" width="120px"></el-table-column>
        <el-table-column label="角色权限" prop="role"></el-table-column>
        <el-table-column label="创建时间" prop="createdate"></el-table-column>
        <el-table-column label="更新时间" prop="updatedate"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"
                       @change="chargestatus(scope.row)" active-color="#13ce66">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="权限" width="200px">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row,'icon')">菜单</el-button>
            <el-button size="mini" @click="edit(scope.row,'api')">后台</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row,)">编辑</el-button>
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
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible" :show-close=false center width="30%"
                 class="addupdialog">
        <el-form ref="form" :rules="therules" :model="addform" label-position="left" label-width="80px"
                 style="margin-bottom: -20px;margin-right: 5px">
          <el-form-item label="角色名" prop="role">
            <el-input v-model="addform.role"></el-input>
          </el-form-item>
          <el-form-item label="菜单权限">
            <el-tree
              :data="addform.data"
              show-checkbox
              node-key="id"
              ref="addctree"
              :props="defaultProps">
            </el-tree>
          </el-form-item>
          <el-form-item label="接口权限" >
            <el-tree
              :data="addform.data"
              show-checkbox
              node-key="id"
              ref="addhtree"
              :props="defaultProps">
            </el-tree>
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
      <el-dialog title="编辑角色" :visible.sync="edituser" :show-close=false center width="30%"
                 class="addupdialog">
        <el-form ref="editform" :rules="therules" :model="editform" label-position="left" label-width="80px"
                 style="margin-bottom: -20px;margin-right: 5px">
          <el-form-item label="角色名" prop="role">
            <el-input v-model="editform.role"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="edituser = false">取 消</el-button>
            <el-button type="primary" @click="update">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--菜单权限显示 -->
      <el-dialog :title="rolename" :visible.sync="iconpermissions" :show-close=false center width="32%">
        <el-form ref="editform" :rules="therules" :model="editform" label-position="left" label-width="80px"
                 style="margin-bottom: -20px;margin-right: 5px">
          <el-form-item label="菜单权限">
            <el-tree
              :data="editform.data"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="editctree"
              :default-checked-keys="checkkey"
              :props="defaultProps">
            </el-tree>
          </el-form-item>
          <el-form-item>
            <el-button @click="iconpermissions = false">取 消</el-button>
            <el-button type="primary" @click="update">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--后台权限显示 -->
      <el-dialog :title="rolename" :visible.sync="apipermissions" :show-close=false center width="32%">
        <el-form ref="editform" :rules="therules" :model="editform" label-position="left" label-width="80px"
                 style="margin-bottom: -20px;margin-right: 5px">
          <el-form-item label="接口权限">
            <el-tree
              :data="editform.data"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="editctree"
              :default-checked-keys="checkkey"
              :props="defaultProps">
            </el-tree>
          </el-form-item>
          <el-form-item>
            <el-button @click="apipermissions = false">取 消</el-button>
            <el-button type="primary" @click="update">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'UserPermissions',
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
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      checkkey: [],
      // 分页字段
      queryinfo: {
        total: 1,
        page: 1,
        pagesize: 10,
        query: ''
      },
      addform: {
        role: '',
        data: [{
          id: 1,
          label: '项目管理',
          children: [{
            id: 1.1,
            label: '环境管理',
            children: [{
              id: '1.1.1',
              label: '新增'
            }, {
              id: '1.1.2',
              label: '删除'
            }]
          },
          {
            id: 1.2,
            label: '项目信息'
          },
          {
            id: 1.3,
            label: '模块管理'
          },
          {
            id: 1.4,
            label: '接口管理'
          },
          {
            id: 1.5,
            label: '用例管理'
          }]
        }, {
          id: 2,
          label: '报告管理',
          children: [{
            id: 2.1,
            label: '测试报告'
          }, {
            id: 2.2,
            label: '定时任务'
          }]
        }, {
          id: 3,
          label: '工具管理',
          children: [{
            id: 3.1,
            label: '工具列表'
          }, {
            id: 3.2,
            label: '内置函数'
          }]
        }, {
          id: 4,
          label: '用户管理',
          children: [{
            id: 4.1,
            label: '用户权限'
          }, {
            id: 4.2,
            label: '用户编辑'
          }]
        }]
      },
      editform: {
        role: '',
        data: [{
          id: 1,
          label: '项目管理',
          children: [{
            id: 1.1,
            label: '环境管理',
            children: [{
              id: '1.1.1',
              label: '新增'
            }, {
              id: '1.1.2',
              label: '删除'
            }]
          },
          {
            id: 1.2,
            label: '项目信息'
          },
          {
            id: 1.3,
            label: '模块管理'
          },
          {
            id: 1.4,
            label: '接口管理'
          },
          {
            id: 1.5,
            label: '用例管理'
          }]
        }, {
          id: 2,
          label: '报告管理',
          children: [{
            id: 2.1,
            label: '测试报告'
          }, {
            id: 2.2,
            label: '定时任务'
          }]
        }, {
          id: 3,
          label: '工具管理',
          children: [{
            id: 3.1,
            label: '工具列表'
          }, {
            id: 3.2,
            label: '内置函数'
          }]
        }, {
          id: 4,
          label: '用户管理',
          children: [{
            id: 4.1,
            label: '用户权限'
          }, {
            id: 4.2,
            label: '用户编辑'
          }]
        }]
      },
      therules: {
        role: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ]
      },
      tabledata: [],
      dialogFormVisible: false,
      edituser: false,
      apipermissions: false,
      iconpermissions: false,
      rolename: ''
    }
  },
  methods: {
    // 添加用户和编辑用户
    add () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$post(this.$apilist.roles, this.addform)
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
          this.$post(this.$apilist.roles, this.editform)
            .then(res => {
              this.$message.success('编辑成功')
              this.getuserlist()
              this.edituser = false
              this.iconpermissions = false
              this.apipermissions = false
            })
        } else {
          return false
        }
      })
    },
    // 查询获取用户列表
    getuserlist () {
      this.$get(this.$apilist.roles, this.queryinfo)
        .then(res => {
          this.tabledata = res.data
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
    // 编辑
    edit (userinfo, kinds) {
      if (kinds === 'icon') {
        this.iconpermissions = true
      } else if (kinds === 'api') {
        this.apipermissions = true
      } else {
        this.edituser = true
      }
      this.checkkey = userinfo.data
      this.editform.role = userinfo.role
      this.rolename = userinfo.role
      this.$refs.editctree.setCheckedKeys(this.checkkey)
    },
    // 删除用户
    del (userinfo) {
      this.$post(this.$apilist.roles, userinfo)
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
      alert(val)
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
