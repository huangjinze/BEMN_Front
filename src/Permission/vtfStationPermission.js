let permissions = {
  '13': true,  //  tower-add-user
  '14': true,  //  tower-delete-user
  '15': true,  //  tower-show-user
  '16': true,  //  tower-change-user
  '17': true,  //  tower-add
  '18': true, //  tower-delete
  '19': true, //  tower-show
  '20': true  //  tower-change
}
function listPermission (msg) {
  let per
  console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 19) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function addTowerPermission (msg) {
  let per
  console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 17) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function changeTowerPermission (msg) {
  let per
  console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 20) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function deleteTowerPermission (msg) {
  let per
  console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 18) {
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
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 13) {
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
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 13) {
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
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 14) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
export {listPermission, addTowerPermission, changeTowerPermission, deleteTowerPermission, addAdminPermission, changeAdminPermission, deleteAdminPermission}
