<template>
  <!--登陆盒子-->
  <div class="hf_login_class">
    <!--中部登陆盒子-->
    <div class="hf_login_box">
      <!--登陆头像log-->
      <!--<div class="hf_login_icon">-->
        <!--<img src="http://b-ssl.duitang.com/uploads/item/201803/31/20180331103526_Vxzch.jpeg">-->
      <!--</div>-->
      <!--表单区域-->
      <div class="hf_login_form">
        <div class="hf_login_name">自动化测试平台</div>
        <el-form class="hf_login_elform">
          <!--用户名-->
          <el-form-item>
            <el-input></el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item>
            <el-input></el-input>
          </el-form-item>
          <!--登陆按钮-->
          <el-form-item class="hf_login_button" >
            <el-button type="primary" >登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
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
