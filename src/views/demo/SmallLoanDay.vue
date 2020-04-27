<template>
  <div>
    <br>
    <van-row type="flex" justify="center">
      <van-radio-group v-model="changeAmount" direction="horizontal">
        <van-radio name="10">10万</van-radio>
        <van-radio name="30">30万</van-radio>
        <van-radio name="50">50万</van-radio>
        <van-radio name="100">100万</van-radio>
      </van-radio-group>
    </van-row>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" content-position="left">客户列表</van-divider>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
        <van-cell v-for="(item, index) in list" :key="index">
          <template #title>
            <van-row>
              <van-col span="2">{{index + 1}}</van-col>
              <van-col span="6">{{item.bank}}</van-col>
              <van-col span="12">{{item.certno}}</van-col>
              <van-col span="4">{{item.amount}}</van-col>
            </van-row>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Row, Col, List, Cell, CellGroup, Radio, RadioGroup, Divider, PullRefresh } from 'vant'

@Component({
  name: 'SmallLoanDay',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [List.name]: List,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Divider.name]: Divider,
    [PullRefresh.name]: PullRefresh
  }
})
export default class extends Vue {
  private list: object[] = []
  private loading = false
  private finished = false
  private error = false
  private refreshing = false
  private changeAmount = '10'
  

  private onLoad() {
    setTimeout(() => {
      try{
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }
        for (let i = 0; i < 20; i++) {
          this.list.push({
            bank: '南京分行',
            certno: '332010013434343433',
            amount: '20万'
          })
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      } catch(err) {
        this.error = true
      }
    }, 1000)      
  }

  private onRefresh() {
    this.list = []
    this.finished = false
    this.loading = true
    this.onLoad()
  }
}
</script>

<style lang="scss" scoped>
  .cell-title {
    padding: 0 0 0 0;
    -webkit-box-flex: 0.1 1;
    -webkit-flex: 0.1 1;
    flex: 0.1;
  }
  .cell-text {
    padding-left: 0;
    text-align: left;
  }
</style>