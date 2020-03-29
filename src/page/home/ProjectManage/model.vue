<template>
  <div>
    <!--导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>模块管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!--查询内容区域-->
      <el-row :gutter="20">
        <!--查询框-->
        <el-col :span="6">
          <div class="text item">
            <el-input placeholder="请输入要查询的内容" v-model="queryinfo.query" clearable>
              <el-button slot="append" icon="el-icon-search" @click="getmessage"></el-button>
            </el-input>
          </div>
        </el-col>
        <!--添加按钮-->
        <el-col :span="14">
          <el-button type="primary" @click="dialogFormVisible=true">添加</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="24">

        <el-col :span="5" style="margin-top:18px ">
          <el-scrollbar viewClass="{'scrollbar'}">
            <el-tree
              class="filter-tree"
              :data="data"
              :props="defaultProps"
              default-expand-all
              @node-contextmenu="contextmenu"
              @node-click="showtreedata"
              ref="tree">
            </el-tree>
          </el-scrollbar>
        </el-col>
        <!--表格区域-->
        <el-col :span="19">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span v-if="detailcontent.title !=''">{{ detailcontent.title }}</span>
              <span v-else>暂无数据</span>
            </div>
            <div>
              <p v-if="detailcontent.owner !='' && detailcontent.owner !=undefined">项目负责人：{{ detailcontent.owner }}</p>
              <p v-if="detailcontent.owner !='' && detailcontent.owner !=undefined">项目进度：{{ detailcontent.status}}</p>
              <p v-if="detailcontent.modelname !='' && detailcontent.modelname !=undefined">模块名称：{{
                detailcontent.modelname}}</p>
              <p v-if="detailcontent.taskname !='' && detailcontent.taskname !=undefined">任务名称：{{
                detailcontent.taskname}}</p>
              <p v-if="detailcontent.BusinessOwner !='' && detailcontent.BusinessOwner !=undefined">业务负责人：{{
                detailcontent.BusinessOwner}}</p>
              <p v-if="detailcontent.project !='' && detailcontent.project !=undefined">关联项目：{{
                detailcontent.project}}</p>
              <p v-if="detailcontent.file !='' && detailcontent.file !=undefined">相关文件：{{ detailcontent.file}}</p>
              <p v-if="detailcontent.case !='' && detailcontent.case !=undefined">相关用例：{{ detailcontent.case}}</p>

            </div>
          </el-card>
        </el-col>
      </el-row>

      <!--这个是ttree右键点击的弹出删除按钮/编辑按钮-->
      <div v-show="treemenus">
        <ul id="tree_menu" class="menu">
          <li class="menu__item" id='menu__item1' @mouseover="changecheick" @click="editdialog=true">编辑</li>
          <li class="menu__item" id='menu__item2' @mouseover="changecheick" @click="del">删除</li>
        </ul>
      </div>

      <!--添加用户-->
      <el-dialog title="添加业务" :visible.sync="dialogFormVisible" :show-close=false width="28%"
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
          <el-form-item label="负责人" prop="onwer">
            <el-select v-model="addform.onwer" placeholder="请选择负责人" class="size-full">
              <el-option label="张三" value="0"></el-option>
              <el-option label="李四" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="AssModel">
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

      <!--添加用户-->
      <el-dialog title="编辑" :visible.sync="editdialog" :show-close=false width="28%"
                 class="addupdialog">
        <el-form ref="editform" :rules="editrules" :model="editform" label-position="left" label-width="80px"
                 style="margin-bottom: -20px;margin-right: 5px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="editform.name"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="onwer">
            <el-select v-model="editform.onwer" placeholder="请选择负责人" class="size-full">
              <el-option label="张三" value="0"></el-option>
              <el-option label="李四" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="editdialog = false">取 消</el-button>
            <el-button type="primary" @click="update">确 定</el-button>
          </el-form-item>
        </el-form>
        <!--<div slot="footer" class="dialog-footer">-->
        <!--</div>-->
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
    editdialog (newfrom, oldform) {
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
      data: [],
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
        name: '1',
        owner: '1'
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
        onwer: [
          { required: true, message: '请选择负责人', trigger: 'change' }
        ]
      },
      editrules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 40, message: '长度在 3 到 40 个字符', trigger: 'blur' }
        ],
        onwer: [
          { required: true, message: '请选择负责人', trigger: 'blur' }
        ]
      },
      tabledata: [],
      dialogFormVisible: false,
      editdialog: false,
      treemenus: false,
      detailcontent: {
        title: '',
        status: '',
        owner: '',
        modelname: '',
        file: '',
        taskname: '',
        BusinessOwner: '',
        project: ''
      }
    }
  },
  methods: {
    // 获取需要显示的菜单
    getmessage () {
      this.$get(this.$apilist.userlist, this.queryinfo)
        .then(res => {
          this.data = [{
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
          }]
        })
    },
    // 当左侧菜单被左键点击则显示该项目内容信息
    showtreedata (obj, Node, self) {
      this.$post(this.$apilist.userlist, this.editform)
        .then(res => {
          this.detailcontent = {
            title: obj.label,
            status: '启动中',
            owner: '赵四'
          }
        })
    },
    // menu右键删除和编辑功能
    contextmenu (event, obj, Node, self) {
      console.log(obj.label === '模块')
      if (obj.label !== '模块' && obj.label !== '任务') {
        this.treemenus = false
        this.treemenus = true
        let treemenu = document.querySelector('#tree_menu')
        /* 菜单定位基于鼠标点击位置 */
        treemenu.style.position = 'absolute'
        treemenu.style.left = event.clientX + 'px'
        treemenu.style.padding = '5px'
        document.addEventListener('click', this.foo)
        treemenu.style.top = event.clientY - 10 + 'px'
        // 这里是为了弹出框做的处理
        this.editform.name = obj.label
      }
    },
    foo () { // 取消鼠标监听事件 菜单栏
      this.treemenus = false
      document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
    },
    // 鼠标移动到menu删除编辑按钮变小手
    changecheick () {
      document.getElementById('menu__item1').style.cursor = 'pointer'
      document.getElementById('menu__item2').style.cursor = 'pointer'
    },
    // menu删除
    del (userinfo) {
      this.$post(this.$apilist.userlist, userinfo)
        .then(res => {
          this.$message.success('删除成功！')
          this.getmessage()
        })
    },
    update () {
      this.$refs.editform.validate((valid) => {
        if (valid) {
          this.$post(this.$apilist.userlist, this.editform)
            .then(res => {
              this.$message.success('编辑成功')
              this.getmessage()
              this.editdialog = false
            })
        } else {
          return false
        }
      })
    },
    // 添加用户和编辑用户
    add () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$post(this.$apilist.userlist, this.addform)
            .then(res => {
              this.$message.success('新增成功')
              this.getmessage()
              this.dialogFormVisible = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  /*.tree{*/
  /*overflow-y: hidden;*/
  /*overflow-x: scroll;*/
  /*}*/
  .menu__item {
    display: block;
    line-height: 20px;
    text-align: center;
    margin-top: 10px;
  }

  .menu {
    height: 70px;
    width: 50px;
    position: absolute;
    border-radius: 10px;
    border: 1px solid #999999;
    background-color: #f4f4f4;
  }

  li:hover {
    background-color: #1790ff;
    color: white;
  }

  .scrollbar {
    height: 50px !important;
  }

  .el-tree {
    min-width: 100px;
    display: inline-block !important;
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
