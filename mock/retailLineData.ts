import faker from 'faker'
import { Response, Request } from 'express'
import { LoanBalanceType } from '../src/api/types'

const citys: string[] = ['上海', '杭州', '南京', '深圳', '苏州', '北京', '无锡', '温州', '金华', '绍兴', '台州', '嘉兴', '丽水', '湖州', '衢州']
let loanBalanceList: LoanBalanceType[] = []

// 贷款余额数据
export const getLoanBalance = (req: Request, res: Response) => {
  loanBalanceList = []
  citys.forEach(city => {
    loanBalanceList.push({
      cityName: city,
      amount: Number.parseInt(faker.finance.amount(1000, 9999))
    })
  })
  return res.json({
    code: 0,
    data: loanBalanceList
  })
}