### 获取计数:
  > @/page/HomePage
  > 水保领域获取各站点的类别计数
  
  - mthod：get
  - name: getVFTCounts
  - url： /station/vft/countsShow
  - return：
    - Array:[[站点名,数量],...]

### 获取站点:
  > @/page/ImportPage.vue,
  @/page/Static/vftDataShowPage.vue,
  @/page/Device/deviceAdding.vue,
  @/page/Device/devicePage.vue,
  @/components/multiSelect/singleSelect
  > 获取站点名
  
  - mthod：get
  - name: getStation
  - url： /station/vft/countsShow
  - return：
    - Array:[站点名,站点名,...]

### 获取类别:
  >  @/page/ImportPage.vue,
  @/page/Static/vftDataShowPage.vue
  > 获取站点名
  
  - mthod：get
  - name: getClass
  - url： /station/vft/getClass
  - return：
    - Array:[类别名,类别名,...]

### 获取指标:
  >  @/page/ImportPage.vue,
  @/page/Static/vftDataShowPage.vue
  > 获取指标
  
  - mthod：get
  - name: getVFTIndex
  - url： /station/vft/getIndexes
  - return：
    - Array:[{category:A, index:[指标名,指标名,...]},{},{}...]

### 数据展示-获取表格数据:
  >@/page/Static/vftDataShowPage.vue
  > 获取表格数据
  
  - mthod：get
  - name: getIndexTableData
  - url： /fluxdata/origindata/show
  - return：
    - Object:{data:[{列名:value},{列名:value}...],title:[{factor_name:,unit:}, {factor_name:,unit:},{}...],count:1172}

### 获取设备信息:
  >@/page/Device/devicePage.vue
  > 获取设备信息
  
  - mthod：get
  - name: getDevice
  - url： /device/getDevice
  - return：
    - Array:[{className:,device:...},{className:,device:...}...]

### 根据设备获取指标信息:
  >@/page/Device/devicePage.vue
  > 根据设备获取设备信息
  
  - mthod：get
  - name: getIndexByDevice
  - url： /device/getIndexByDevice
  - return：
    - Object:{指标名：{id:,factor_name:,...}，指标名：{id:,factor_name:,...}...}

### 获取设备故障信息:
  >@/page/Device/devicePage.vue
  > 获取故障设备信息
  
  - mthod：get
  - name: getDeviceErrorInfo
  - url： /device/getErrorInfo
  - return：
    - Array:[{device_id:,occurence:,...},{}...]

