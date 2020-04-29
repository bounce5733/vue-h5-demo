<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="bankSelVal" @change="changeSubBank" :options="bankOption" />
      <van-dropdown-item v-model="subBankSelVal" :options="subBankOption" />
    </van-dropdown-menu>
    <br>
    <van-row>
      <van-col offset="5" span="10">
        <van-radio-group v-model="dateRange" direction="horizontal">
          <van-radio name="day">日</van-radio>
          <van-radio name="month">月</van-radio>
        </van-radio-group>
      </van-col>
      <van-col offset="1" span="8">
        <van-tag mark>7802万元</van-tag>
      </van-col>
    </van-row>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider>
    <van-row>
      <van-col offset="1" span="23">
        <div class="chart" style="height: 200px; width: 100%" ref="normalLoanChart" ></div>
      </van-col>
    </van-row>
    <van-row>
      <van-col offset="1" span="23">
        <div class="chart" style="height: 200px; width: 100%" ref="smallLoanChart" ></div>
      </van-col>
    </van-row>
    <van-row>
      <van-col offset="1" span="23">
        <div class="chart" style="height: 200px; width: 100%" ref="loanChart" ></div>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Row, Col, DropdownMenu, DropdownItem, Radio, RadioGroup, Divider, Tag } from 'vant'
import echarts from '@/utils/echarts'
import { getLoanBalance } from '@/api/retailLine'
import { LoanBalanceType } from '@/api/types'

@Component({
  name: 'LoanBalance',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Divider.name]: Divider,
    [Tag.name]: Tag
  }
})
export default class extends Vue {
  private dateRange = 'day'
  private fhlist = [
    { text: '分行总计', value: 'fhzj'},
    { text: '上海分行', value: 'shfh'},
    { text: '杭州分行', value: 'hzfh'},
    { text: '南京分行', value: 'njfh'},
    { text: '深圳分行', value: 'szfh'},
    { text: '苏州分行', value: 'szfh'},
    { text: '北京分行', value: 'bjfh'},
    { text: '无锡分行', value: 'wxfh'},
    { text: '温州分行', value: 'wzfh'},
    { text: '金华分行', value: 'jhfh'},
    { text: '绍兴分行', value: 'sxfh'},
    { text: '台州分行', value: 'tzfh'},
    { text: '嘉兴分行', value: 'jxfh'},
    { text: '丽水分行', value: 'lsfh'},
    { text: '湖州分行', value: 'hzfh'},
    { text: '衢州分行', value: 'qzfh'}
  ]
  private zhlist = [{ text: '支行总计', value: 'zhzj'}]
  private bankSelVal = 'fh'
  private subBankSelVal = 'fhzj'
  private bankOption = [
    { text: '分行', value: 'fh'},
    { text: '支行', value: 'zh'}
  ]
  private subBankOption = this.fhlist

  created() {
    this.fetchData()
  }

  private async fetchData() {
    try {
      const { data } = await getLoanBalance()
      const citys: Array<string> = []
      const amounts: Array<number> = []

      data.forEach((item: LoanBalanceType) => {
        citys.push(item.cityName)
        amounts.push(item.amount)
      })
      this.renderChart(citys, amounts)
     } catch (err) {
      console.error(err)
    }
  }

  private changeSubBank(val: string) {
    switch(val) {
      case 'fh':
        this.subBankOption = this.fhlist
        this.subBankSelVal = 'fhzj'
        break;
      case 'zh':
        this.subBankOption = this.zhlist
        this.subBankSelVal = 'zhzj'
    }
  }

  private renderChart(citys: Array<string>, amounts: Array<number>) {
    // 图表属性
    const normalLoanChart = echarts.init(this.$refs.normalLoanChart as HTMLDivElement)
    normalLoanChart.setOption({
      title: {
          text: '一般贷款余额'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval: 0,
          fontSize: 10,
          formatter: function(value: string) {
            return value.split('').join('\n')
          }
        },
        data: citys
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: amounts
      }]
    })
    const smallLoanChart = echarts.init(this.$refs.smallLoanChart as HTMLDivElement)
    smallLoanChart.setOption({
      title: {
          text: '小微贷款余额'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval: 0,
          fontSize: 10,
          formatter: function(value: string) {
            return value.split('').join('\n')
          }
        },
        data: citys
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: amounts
      }]
    })
    const loanChart = echarts.init(this.$refs.loanChart as HTMLDivElement)
    loanChart.setOption({
      title: {
          text: '贷款余额'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval: 0,
          fontSize: 10,
          formatter: function(value: string) {
            return value.split('').join('\n')
          }
        },
        data: citys
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: amounts
      }]
    })
  }
}
</script>