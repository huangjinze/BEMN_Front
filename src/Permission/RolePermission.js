let permissions = {
  '1': true,
  '2': true,
  '3': true,
  '4': true
}
function listPermission (msg) {
  let per
  // console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 1) {
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
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 2) {
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
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 3) {
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
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 4) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
export {listPermission, addPermission, changePermission, deletePermission}
