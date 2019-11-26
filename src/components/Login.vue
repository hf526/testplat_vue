<template>

  <!--登陆盒子-->
  <div class="hf_login_class">
    <!--中部登陆盒子-->
    <div class="hf_login_box">
      <!--登陆头像log-->
      <!--表单区域-->
      <div class="hf_login_form">
        <div class="hf_login_name">自动化测试平台</div>
        <el-form ref="login_forms" :model="login_form"  :rules="login_formRules"  class="hf_login_elform" label-width="1px">
          <!--用户名-->
          <el-form-item prop="username" label=" ">
            <el-input v-model="login_form.username">
              <i slot="prefix" class="iconfont icon-account"></i>
            </el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item prop="password"  label=" ">
            <el-input v-model="login_form.password" type="password">
              <i slot="prefix" class="iconfont  icon-password"></i>
            </el-input>
          </el-form-item>
          <!--登陆按钮-->
          <el-form-item class="hf_login_button" >
            <el-button type="primary" @click="loginmethods" >登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      // 登陆表单属性
      login_form: {
        username: 'admin',
        password: '123456'
      },
      // 验证规则
      login_formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginmethods () {
      this.$refs.login_forms.validate((valid) => {
        if (valid) {
          this.$message('测试')
        } else {
          console.log('吊毛，账号密码都不输入还想登陆，吃屎去吧')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  /*主区域*/
  .hf_login_class{
    background: aquamarine;
    height: 100%;
  }
  /*登陆盒子区域*/
  .hf_login_box{
    background:white;
    width: 450px;
    height: 300px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%)
  }
  /*表单区域*/
  .hf_login_form{
    padding: 35px;

  }
  .el-input{
    width: 95%;
  }
  /*.hf_login_elform{*/
    /*margin-left: 20px;*/
    /*margin-right: 20px;*/
  /*}*/
  /*登陆log*/
  .hf_login_name{
    padding: 30px;
    text-align: center;
  }
  /*登陆按钮区域*/
  .hf_login_button{
    text-align: center;
  }
  .hf_login_button button{
      width: 30%;
  }
</style>
