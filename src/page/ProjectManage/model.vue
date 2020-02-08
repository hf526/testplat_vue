<template>
  <div>
    <!--导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>模块管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!--&lt;!&ndash;导航区域&ndash;&gt;-->
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
        <el-col :span="14">
          <el-button type="primary" @click="dialogFormVisible=true">添加</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="24" >

        <el-col :span="5" style="margin-top:18px ">
           <el-scrollbar  viewClass="{'scrollbar'}">
             <el-tree
               class="filter-tree"
               :data="data"
               :props="defaultProps"
               default-expand-all
               @node-contextmenu="contextmenu"
               ref="tree">
             </el-tree>
           </el-scrollbar>
        </el-col>
      <!--表格区域-->
        <el-col :span="19">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>搜索业务项目</span>
            </div>
            <div>
              <p>项目负责人：赵军</p>
              <p>项目进度：未开始</p>
            </div>
          </el-card>
      <!--<el-table :data="tabledata" width="120px">-->
        <!--<el-table-column label="ID" type="index" width="60px"></el-table-column>-->
        <!--<el-table-column label="模块名称" prop="name"></el-table-column>-->
        <!--<el-table-column label="所属项目" prop="project"></el-table-column>-->
        <!--<el-table-column label="负责人" prop="role"></el-table-column>-->
        <!--<el-table-column label="创建时间" prop="createdate"></el-table-column>-->
        <!--<el-table-column label="操作">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button size="mini" @click="edit(scope.row)">编辑</el-button>-->
            <!--<el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
        </el-col>
      </el-row>
      <!--&lt;!&ndash;分页区域，layout需要显示的组件，page-sizes查询分页的值 page-size每页显示的个数,current-page.sync当前页&ndash;&gt;-->
      <!--<el-pagination :page-sizes="[10,50,100]" :page-size=queryinfo.pagesize :current-page.sync=queryinfo.page-->
                     <!--:total=queryinfo.total-->
                     <!--@size-change="handleSizeChange" @current-change="handleCurrentChange"-->
                     <!--layout="total, sizes, prev, pager, next, jumper"></el-pagination>-->

      <!--添加用户-->
      <el-dialog title="添加业务" :visible.sync="dialogFormVisible" :show-close=false  width="28%"
                 class="addupdialog">
        <el-form ref="form" :rules="therules" :model="addform" label-position="left" label-width="80px"
                 style="margin-bottom: -20px;margin-right: 5px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="addform.name"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="role">
            <el-select v-model="addform.role" placeholder="请选择新增类型" class="size-full">
              <el-option label="模块" value="0"></el-option>
              <el-option label="任务" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联项目" prop="role">
            <el-select v-model="addform.status" placeholder="请关联项目类型" class="size-full">
              <el-option label="网上购物商城" value="0"></el-option>
              <el-option label="搜狗" value="1"></el-option>
              <el-option label="奥特曼吃饭项目" value="2"></el-option>
              <el-option label="谷歌接入" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人" prop="role">
            <el-select v-model="addform.role" placeholder="请选择负责人" class="size-full">
              <el-option label="张三" value="0"></el-option>
              <el-option label="李四" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  prop="AssModel">
            <div slot="label" style="margin-left:10px;">关联模块</div>
            <el-select v-model="addform.AssModel" placeholder="请选择模块" class="size-full">
              <el-option label="A模块" value="0"></el-option>
              <el-option label="B模块" value="1"></el-option>
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
        <el-form ref="editform" :rules="therules" :model="editform" label-position="left" label-width="80px"
                 style="margin-bottom: -20px;margin-right: 5px">
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="editform.name"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="role">
            <el-select v-model="editform.status" placeholder="项目状态" class="size-full">
              <el-option label="未开始" value="0"></el-option>
              <el-option label="进行中" value="1"></el-option>
              <el-option label="暂停中" value="2"></el-option>
              <el-option label="已结束" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人" prop="role">
            <el-select v-model="editform.role" placeholder="请选择负责人" class="size-full">
              <el-option label="张三" value="0"></el-option>
              <el-option label="李四" value="1"></el-option>
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
  name: 'model',
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
      data: [{
        id: 1,
        label: '网上商城项目',
        children: [{
          id: 4,
          label: '模块',
          children: [{
            id: 9,
            label: '登陆菜单'
          }, {
            id: 10,
            label: '购物车'
          }]
        }, {
          id: 19,
          label: '任务',
          children: [{
            id: 29,
            label: '2020任务中间页关联'
          }, {
            id: 13,
            label: '2019任务活动'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 分页字段
      queryinfo: {
        total: 1,
        page: 1,
        pagesize: 10,
        query: ''
      },
      addform: {
        status: '1',
        role: '1',
        password: '',
        name: '',
        AssModel: ''
      },
      editform: {
        role: '1',
        password: '',
        name: ''
      },
      therules: {
        name: [
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
      tabledata: [],
      dialogFormVisible: false,
      edituser: false
    }
  },
  methods: {
    contextmenu (event, data, Node, self) {
      console.log(event)
      console.log(data)
      console.log(Node)
      console.log(self)
    },
    // 添加用户和编辑用户
    add () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$post(this.$apilist.userlist, this.addform)
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
          this.$post(this.$apilist.userlist, this.editform)
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
    // 修改用户弹框
    edit (userinfo) {
      this.editform.role = userinfo.role
      this.editform.name = userinfo.name
      this.editform.password = userinfo.password
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
  /*.tree{*/
    /*overflow-y: hidden;*/
    /*overflow-x: scroll;*/
  /*}*/
  .scrollbar{
    height: 50px!important;
  }
  .el-tree {
    min-width: 100px;
    display:inline-block !important;
  }
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
