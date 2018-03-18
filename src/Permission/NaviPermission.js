let permissions = {
  '1': true,  //  role-list
  '2': true,  //  role-create
  '3': true,  //  role-edit
  '4': true,  //  role-delete
  '5': true,  //  station-add-user
  '6': true,  //  station-delete-user
  '7': true,  //  station-show-user
  '8': true,  //  station-change-user
  '9': true,  //  station-add
  '10': true, //  station-delete
  '11': true, //  station-show
  '12': true,  //  station-change
  '13': true,  //  tower-add-user
  '14': true,  //  tower-delete-user
  '15': true,  //  tower-show-user
  '16': true,  //  tower-change-user
  '17': true,  //  tower-add
  '18': true,  //  tower-delete
  '19': true,  //  tower-show
  '20': true,  //  tower-change
  '21': true,  //  data-add
  '22': true,  //  data-delete
  '23': true,  //  data-show
  '24': true,  //  data-operation
  '25': true,  //  text-add
  '26': true,  //  text-delete
  '27': true,  //  text-show
  '28': true,  //  text-operation
  '29': true,  //  user-list
  '30': true,  //  user-create
  '31': true,  //  user-edit
  '32': true   //  user-delete
}
// user
function userListPermission (msg) {
  let per
  // console.log(msg)
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
function userCreatePermission (msg) {
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
function userEditPermission (msg) {
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
function userDeletePermission (msg) {
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

// role
function roleListPermission (msg) {
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
function roleCreatePermission (msg) {
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
function roleEditPermission (msg) {
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
function roleDeletePermission (msg) {
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

// station
function stationAddUserPermission (msg) {
  let per
  // console.log(msg)
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
function stationDeleteUserPermission (msg) {
  let per
  // console.log(msg)
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
function stationShowUserPermission (msg) {
  let per
  // console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 7) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function stationChangeUserPermission (msg) {
  let per
  // console.log(msg)
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
function stationAddPermission (msg) {
  let per
  // console.log(msg)
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
function stationDeletePermission (msg) {
  let per
  // console.log(msg)
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
function stationShowPermission (msg) {
  let per
  // console.log(msg)
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
function stationChangePermission (msg) {
  let per
  // console.log(msg)
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

// tower
function towerAddUserPermission (msg) {
  let per
  // console.log(msg)
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
function towerDeleteUserPermission (msg) {
  let per
  // console.log(msg)
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
function towerShowUserPermission (msg) {
  let per
  // console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 15) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function towerChangeUserPermission (msg) {
  let per
  // console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 16) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function towerAddPermission (msg) {
  let per
  // console.log(msg)
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
function towerDeletePermission (msg) {
  let per
  // console.log(msg)
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
function towerShowPermission (msg) {
  let per
  // console.log(msg)
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
function towerChangePermission (msg) {
  let per
  // console.log(msg)
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

// data
function dataAddPermission (msg) {
  let per
  // console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 21) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function dataDeletePermission (msg) {
  let per
  // console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 22) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function dataShowPermission (msg) {
  let per
  // console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 23) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function dataOperationPermission (msg) {
  let per
  // console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 24) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
// user
function textAddPermission (msg) {
  let per
  // console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 25) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function textDeletePermission (msg) {
  let per
  // console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 26) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function textShowPermission (msg) {
  let per
  // console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 27) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
function textOperationPermission (msg) {
  let per
  // console.log(msg)
  for (let i = 0; i < msg[0].length; i++) {
    if (permissions[msg[0][i].permission_id] && msg[0][i].permission_id === 28) {
      per = true
      break
    } else {
      per = false
    }
  }
  return per
}
export {
  userListPermission, userCreatePermission, userEditPermission, userDeletePermission,
  roleListPermission, roleCreatePermission, roleEditPermission, roleDeletePermission,
  stationAddUserPermission, stationDeleteUserPermission, stationShowUserPermission, stationChangeUserPermission,
  stationAddPermission, stationDeletePermission, stationShowPermission, stationChangePermission,
  towerAddUserPermission, towerDeleteUserPermission, towerShowUserPermission, towerChangeUserPermission,
  towerAddPermission, towerDeletePermission, towerShowPermission, towerChangePermission,
  dataAddPermission, dataDeletePermission, dataShowPermission, dataOperationPermission,
  textAddPermission, textDeletePermission, textShowPermission, textOperationPermission
}
