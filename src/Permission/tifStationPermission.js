let permissions = {
  '5': true,  //  station-add-user
  '6': true,  //  station-delete-user
  '7': true,  //  station-show-user
  '8': true,  //  station-change-user
  '9': true,  //  station-add
  '10': true, //  station-delete
  '11': true, //  station-show
  '12': true  //  station-change
}
function listPermission (msg) {
  let per
  console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 11) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function addStationPermission (msg) {
  let per
  console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 9) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function changeStationPermission (msg) {
  let per
  console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 12) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function deleteStationPermission (msg) {
  let per
  console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 10) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function addAdminPermission (msg) {
  let per
  console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 5) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function changeAdminPermission (msg) {
  let per
  console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 8) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function deleteAdminPermission (msg) {
  let per
  console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 6) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
export {listPermission, addStationPermission, changeStationPermission, deleteStationPermission, addAdminPermission, changeAdminPermission, deleteAdminPermission}
