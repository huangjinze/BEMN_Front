let permissions = {
  '29': true,
  '30': true,
  '31': true,
  '32': true
}
function listPermission (msg) {
  let per
  // console.log('', msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 29) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function addPermission (msg) {
  let per
  // console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 30) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function changePermission (msg) {
  let per
  // console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 31) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function deletePermission (msg) {
  let per
  // console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 32) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
export {listPermission, addPermission, changePermission, deletePermission}
