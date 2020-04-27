import request from '@/utils/request'

export const getLoanBalance = (params: any) => 
  request({
    url: '/loanBalance',
    method: 'get',
    params
  })
  