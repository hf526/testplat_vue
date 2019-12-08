<template>
    <div>
      <p>本平台，已正常运行367天</p>
      <el-divider></el-divider>
    <div>
      <el-row :gutter="20" class="mgb20">
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{padding: '0px'}">
            <div class="grid-content grid-con-1">
              <i class="fa fa-eercast" aria-hidden="true"></i>
              <div class="grid-cont-right">
                <div class="grid-num">{{ projectcount }} </div>
                <div>项目总数</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{padding: '0px'}">
            <div class="grid-content grid-con-2">
              <i class="fa fa-eercast" aria-hidden="true"></i>
              <div class="grid-cont-right">
                <div class="grid-num">{{ casecount }}</div>
                <div>用例总数</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{padding: '0px'}">
            <div class="grid-content grid-con-3">
              <i class="fa fa-eercast" aria-hidden="true"></i>
              <div class="grid-cont-right">
                <div class="grid-num">{{ apicount }}</div>
                <div>接口总数</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    </div>
</template>

<script>
export default {
  name: 'webcom',
  data () {
    return {
      projectcount: 10,
      casecount: 15,
      apicount: 20
    }
  }
}
</script>

<style  scoped>
  .el-row {
    margin-bottom: 20px;
  }

  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }

  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }

  .fa {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }

  .grid-con-1 .fa {
    background: rgb(45, 140, 240);
  }

  .grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-2 .fa {
    background: rgb(100, 213, 114);
  }

  .grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-3 .fa {
    background: rgb(242, 94, 67);
  }

  .grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
  }

</style>
