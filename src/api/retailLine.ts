import request from '@/utils/request'

export const getLoanBalance = () => 
 request({
  url: '/loanBalance',
  method: 'get'
})
