import request from '@/utils/request'

export function findServicerMonthly(data) {
  return request({
    url: '/wash/servicerMonth/findServicerMonthly',
    method: 'post',
    data
  })
}

export function findServiceOrderByMonth(data) {
  return request({
    url: '/wash/servicerMonth/findServiceOrderByMonth',
    method: 'post',
    data
  })
}

