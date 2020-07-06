import request from '@/utils/request'

export function findVehicleChannelPrice(data) {
  return request({
    url: '/vcp/findVehicleChannelPrice',
    method: 'post',
    data
  })
}

export function modifyVehicleChannelPrice(data) {
    return request({
      url: '/vcp/modifyVehicleChannelPrice',
      method: 'post',
      data
    })
  }

  export function saveVehicleChannelPrice(data) {
    return request({
      url: '/vcp/saveVehicleChannelPrice',
      method: 'post',
      data
    })
  }

  export function delVehicleChannelPriceById(data) {
    return request({
      url: '/vcp/delVehicleChannelPriceById',
      method: 'post',
      data
    })
  }