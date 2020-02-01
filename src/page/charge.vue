<template>
 <div>
   <!--导航区域-->
   <el-breadcrumb separator="/">
     <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item><a>构造扣费</a></el-breadcrumb-item>
   </el-breadcrumb>
   <el-card class="box-card" :body-style="{ height: 'calc(100vh-40vh)' }">
      <!--扣费表单区-->
     <el-row :gutter="24">
       <el-col :span="8">
       <el-form ref="form"  :model="chargefrom" label-width="80px" label-position="left">
         <!--播放请求地址-->
         <el-form-item label="URL" >
           <el-input v-model='chargefrom.url'></el-input>
         </el-form-item>
         <!--请求输入内容-->
         <el-form-item label="请求字段" >
           <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 12}"  v-model='chargefrom.requestsdata'></el-input>
         </el-form-item>
           <!--广告id输入区-->
           <el-form-item label="广告ID" >
             <el-input v-model='chargefrom.adid'></el-input>
           </el-form-item>
         <!--扣费类型输入区-->
         <el-form-item label="扣费类型" >
           <el-select v-model="chargefrom.chagekinds"  placeholder="请选择扣费类型">
             <el-option label="商店" value="shop"></el-option>
             <el-option label="浏览器" value="browser"></el-option>
             <el-option label="自然量" value="Natural"></el-option>
             <el-option label="信息流代投" value="feedsProxy"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item >
           <el-button type="primary" @click="sendcharge()">确 定</el-button>
         </el-form-item>
       </el-form>
       </el-col>
       <el-col :span="15" class="showjson" >
         <p v-if="JSON.stringify(rteturndata)==='{}'">
           注意:广告id和播放列表只能选择一个输入请求，若两者都输入则以播放列表优先
         </p>
       </el-col>
     </el-row>
   </el-card>
 </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'charge',
  data () {
    return {
      rteturndata: {},
      chargefrom: {
        url: 'https://www.cnblogs.com/hufengTE/',
        requestsdata: '',
        adid: '',
        chagekinds: 'shop'
      }
    }
  },
  methods: {
    async sendcharge () {
      if (this.chargefrom.requestsdata !== '') {
        await axios({
          method: 'post',
          url: 'http://rap2api.taobao.org/app/mock/238069/showmenu',
          data: this.chargefrom.requestsdata,
          headers: { 'Access-Control-Allow-Origin': '*' }
        }).then(response => {
          this.rteturndata = { 'data': 6666 }
        })
      } else if (this.chargefrom.adid !== '') {
        await this.$http.post(this.$apilist.charge, this.chargefrom)
          .then(response => {
            if (response.data.status === 200) {
              this.rteturndata = response.data.data
            }
          })
          .catch(error => {
            this.$message.error('网络异常或服务器异常，请重试！')
            console.log(error)
          })
      } else {
        this.$message.error('广告播放请求参数/扣费广告ID不能为空')
      }
    }
  }
}
</script>

<style scoped>
  .el-card{
    margin-top: 15px;
  }
  .showjson{
    height: 520px;
    overflow:auto;
  }
</style>
