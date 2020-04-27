<template>
  <div>
    <div class="demo-nav">
      <span class="title">零售条线余额实况</span>
    </div>
    <van-tabs type="card" v-model="activeTableName">
      <van-tab title="贷款余额" name="LoanBalance">
        <component :is="activeTableName"></component>
      </van-tab>
      <van-tab title="单户单日" name="SingleFamilyDay">
        <component :is="activeTableName"></component>
      </van-tab>
      <van-tab title="支行单日" name="BranchBankDay">
        <component :is="activeTableName"></component>
      </van-tab>
      <van-tab title="小微贷" name="SmallLoanDay">
        <component :is="activeTableName"></component>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Tab, Tabs } from 'vant'
import LoanBalance from '@/views/demo/LoanBalance.vue'
import SingleFamilyDay from '@/views/demo/SingleFamilyDay.vue'
import BranchBankDay from '@/views/demo/BranchBankDay.vue'
import SmallLoanDay from '@/views/demo/SmallLoanDay.vue'

@Component({
  name: 'Demo',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    LoanBalance,
    SingleFamilyDay,
    BranchBankDay,
    SmallLoanDay
  }
})
export default class extends Vue {
  private activeTableName = 'LoanBalance'
}
</script>

<style lang="scss" scoped>
  .demo-nav {
      position: relative;
      height: 56px;
      line-height: 56px;
      text-align: center;
      background-color: #fff;
    .title {
      font-weight: 500;
      font-size: 1.5rem;
    }
  }
</style>