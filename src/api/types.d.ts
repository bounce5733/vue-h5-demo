// 贷款余额
export interface LoanBalanceType {
  cityName: string
  amount: number
}

// 单户单日
export interface SinglefamilyDayType {
  bankName: string
  certno: string
  amount: number
}

// 支行单日
export interface BranchBankDayType {
  bankName: string
  amount: number
}

// 小微贷
export interface SmallLoanDayType {
  bankName: string
  certno: string
  amount: number
}