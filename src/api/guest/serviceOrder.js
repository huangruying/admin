import request from '@/utils/request'

export function findYyOrderytdetail(data) {
  return request({
    url: '/orderytdetail/findYyOrderytdetail',
    method: 'post',
    data
  })
}

export function delYyOrderytdetailById(data) {
  return request({
    url: '/orderytdetail/delYyOrderytdetailById',
    method: 'post',
    data
  })
}