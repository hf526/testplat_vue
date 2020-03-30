<template>
  <el-form ref="form" :rules="therules" :model="form" label-position="left" label-width="80px"
           style="margin-bottom: -20px;margin-right: 5px;padding-top: 10px">
    <!--<el-row :gutter="24">-->
      <!--<el-col :span="4">-->
        <!--<el-form-item label="基础信息" prop="name">-->
          <!--<el-input v-model="form.name" placeholder="接口名称"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="20">-->
      <!--<el-form-item label="" prop="">-->
          <!--<el-select v-model="form.projectname" @change="selmodel" placeholder="请选择关联的项目">-->
          <!--<el-option v-for="project in projects" :key="project.id" :label="project.label" :value="project.value"></el-option>-->
          <!--</el-select>-->
          <!--<el-select v-model="form.model" placeholder="请选择模块类型">-->
          <!--<el-option v-for="model in models" :key="model.id" :label="model.label" :value="model.value"></el-option>-->
          <!--</el-select>-->
        <!--<el-col :span="4">-->
          <!--<el-select v-model="form.type" placeholder="请选择接口类型">-->
          <!--<el-option v-for="type in types" :key="type.id" :label="type.label" :value="type.value"></el-option>-->
          <!--</el-select>-->
        <!--</el-col>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <el-form-item label="基础信息" prop="name">
      <el-row :gutter="24">
        <el-col :span="4">
          <el-input v-model="form.name" placeholder="用例名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="form.projectname" @change="selmodel" placeholder="请选择关联的项目">
            <el-option v-for="project in projects" :key="project.id" :label="project.label" :value="project.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="form.model" placeholder="请选择模块类型">
            <el-option v-for="model in models" :key="model.id" :label="model.label" :value="model.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="form.type" placeholder="请选择接口类型">
            <el-option v-for="type in types" :key="type.id" :label="type.label" :value="type.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="PATH" prop="request_url">
      <el-row :gutter="24">
        <el-col :span="15">
          <el-input v-model="form.request_url">
            <el-select v-model="form.request_method" slot="prepend" style="width:110px!important;">
              <el-option v-for="method in methods" :key="method.id" :label="method.label" :value="method.value"></el-option>
            </el-select>
            <button class="el-button" slot="append">Params</button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="send">Send</el-button>
          <el-button @click="save">Save</el-button>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label-width="6px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="Hearders" name="second">
          <el-row :gutter="24">
            <div>
              <el-col :span="8">
                Hearder
              </el-col>
              <el-col :span="8">
                value
              </el-col>
              <el-col :span="8">
                备注
              </el-col>
            </div>
            <div v-for="hearder in hearders" :key="hearder.id">
              <el-col :span="8">
                <el-input @blur="change" v-model="hearder.key" size="mini">
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-input @blur="change" v-model="hearder.value" size="mini">
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-input @blur="change" v-model="hearder.note" size="mini">
                </el-input>
              </el-col>
            </div>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Body" name="third">
          <el-radio v-model="sel_req" label="xform" size="mini">x-www-form-urlencoded</el-radio>
          <el-radio v-model="sel_req" label="json" size="mini">json</el-radio>
          <el-radio v-model="sel_req" label="file" size="mini">fileupload</el-radio>
          <el-radio v-model="sel_req" label="pb" size="mini">protobuf</el-radio>
          <el-button v-if="sel_req!=='file'" size="mini" @click="show_req=!show_req">切换文本模式</el-button>
          <el-button v-if="sel_req==='file'" size="mini">文件上传</el-button>
          <el-button v-if="sel_req==='pb'" size="mini">关联PB文件</el-button>
          <el-button v-if="sel_req!=='file'" size="mini">格式化</el-button>
          <el-row :gutter="24" v-if="show_req && sel_req!='file'">
            <div>
              <el-col :span="8">
                Key
              </el-col>
              <el-col :span="8">
                value
              </el-col>
              <el-col :span="8">
                备注
              </el-col>
            </div>
            <div v-for="hearder in hearders" :key="hearder.id">
              <el-col :span="8">
                <el-input @blur="change" v-model="hearder.key" size="mini">
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-input @blur="change" v-model="hearder.value" size="mini">
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-input @blur="change" v-model="hearder.note" size="mini">
                </el-input>
              </el-col>
            </div>
          </el-row>
          <el-row :gutter="24" v-if="show_req===false">
            <div>
              <el-col :span="24">
                <el-input   type="textarea"  :autosize="{ minRows: 10, maxRows: 30}"></el-input>
              </el-col>
            </div>
          </el-row>
          <div style="background: #e4e7ed">
            Response
          </div>
        </el-tab-pane>
        <el-tab-pane label="断言" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'config',
  created () {
    this.get_config()
  },
  data () {
    return {
      activeName: 'second',
      sel_req: 'json',
      show_req: true,
      projects: [],
      models: [],
      types: [],
      methods: [],
      hearders: [
        {
          key: '',
          value: '',
          note: ''
        }
      ],
      form: {
        name: '',
        projectname: 0,
        type: 0,
        model: 0,
        request_url: '',
        request_method: 0
      },
      therules: {
        name: [
          { required: true, message: '请输入用例名称', trigger: 'blur' }
        ],
        request_url: [
          { required: true, message: '请输入请求的URL', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    send () {
      this.$refs.form.validateField('request_url', (valid) => {
        if (valid) {
        } else {
          return false
        }
      })
    },
    save () {
      this.$refs.form.validate((valid) => {
        if (valid) {
        } else {
          return false
        }
      })
    },
    get_config () {
      this.$get(this.$apilist.userlist, this.queryinfo)
        .then(res => {
          this.projects = [
            {
              label: '项目1',
              value: 0
            }, {
              label: '项目2',
              value: 1
            }, {
              label: '项目3',
              value: 2
            }
          ]
          this.models = [
            {
              label: '模块1',
              value: 0
            }, {
              label: '模块2',
              value: 1
            }, {
              label: '模块3',
              value: 2
            }
          ]
          this.types = [
            {
              label: 'HTTP',
              value: 0
            }, {
              label: 'DUBBO',
              value: 1
            }, {
              label: 'WEB UI',
              value: 2
            }, {
              label: '移动端 UI',
              value: 3
            }
          ]
          this.methods = [
            {
              label: 'GET',
              value: 0
            }, {
              label: 'POST',
              value: 1
            }, {
              label: 'METHOD',
              value: 2
            }
          ]
        })
    },
    selmodel () {
      this.$get(this.$apilist.userlist, this.queryinfo).then(res => {
        this.form.model = 5
        this.models = [
          {
            label: '模块5',
            value: 4
          }, {
            label: '模块6',
            value: 5
          }, {
            label: '模块7',
            value: 6
          }
        ]
      })
    },
    change () {
      let h = {
        key: '',
        value: '',
        note: ''
      }
      this.hearders.push(h)
      for (let j = 0; j < this.hearders.length; j++) {
        if ((this.hearders[j].key === undefined && this.hearders[j].value === undefined) ||
          (this.hearders[j].key === '' && this.hearders[j].value === '') ||
          (this.hearders[j].key === undefined && this.hearders[j].value === '') ||
          (this.hearders[j].key === '' && this.hearders[j].value === undefined)
        ) {
          this.hearders.splice(j, 1)
          j--
          console.log(j)
        }
      }
      this.hearders.push(h)
    }
  }
}
</script>

<style scoped>

</style>
