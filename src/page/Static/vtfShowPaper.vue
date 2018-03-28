<template>
  <div  id="main-container">
    <div slot="main" v-loading="loading">
      <el-row v-if="showChart" id="headchart">
        <el-col :span="15">
          <echart :options="lineMeta" style="width: 100%" :theme="'dark'"></echart>
        </el-col>
        <el-col :span="7">
          <indexList v-model="chooseIndex" :index-elements="indexesOptions" id="index_list_card" ></indexList>
        </el-col>
      </el-row>
      <el-row v-if="showChart" id="downchart">
        <el-col :span="6">
          <echart :options="mapMeta" style="width: 100%" id="mapChart" :theme="'dark'"></echart>
        </el-col>
        <el-col :span="12">
          <echart :options="pieMeta" style="width: 100%" :theme="'dark'"></echart>
        </el-col>
        <el-col :span="6" >
          <echart :options="barMeta" style="width: 100%" :theme="'dark'"></echart>
        </el-col>

      </el-row>
    </div>
  </div>

</template>

<script>
    import navi from '../../components/layout/navi'
    import chartForm from '../../components/echart/vftShowChart'
    import echart from 'vue-echarts'
    import {getVTFData, getVFTIndex} from '../../model/data'
    import singleSelect from '../../components/multiSelect/singleSelect'
    import chartGrid from '../../components/echart/chartGrid'
    import ElRow from 'element-ui/packages/row/src/row'
    import chinaJSON from '../../model/china.json'
    import indexList from '../../components/echart/indexList'

    console.log(chinaJSON)

    echart.registerMap('china', chinaJSON)

    export default {
      components: {
        ElRow, echart, navi, chartForm, singleSelect, chartGrid, indexList
      },
      name: 'vtfShowPaper',
      data () {
        return {
          loading: false,
          element_name: 'es',
          barMeta: {},
          pieMeta: {},
          mapMeta: {},
          lineMeta: {},
          showChart: true,
          datas: [],
          station: '奥林匹克',
          indexesOptions: [],
          bardata: [320, 302, 301, 334, 390, 330, 320, 400, 200, 100, 200, 400],
          date: [],
          piedata: [
            {value: 335, name: '本月份'},
            {value: 310, name: '剩余月份'}
          ],
          chooseIndex: ''
        }
      },
      mounted () {
        this.getIndex()
        this.makedata()
        this.getIndexes()
      },
      watch: {
        chooseIndex: {
          handler: function (val) {
            this.getLineData()
            this.getBarData()
            this.getPieData()
          }
        }
      },
      methods: {
        getLineData: function () {
          getVTFData({
            domain: '通量数据',
            station: this.station,
            classification: '通量',
            index: this.chooseIndex,
            start_time: '2012-01-30',
            end_time: '2012-12-10',
            num: 5,
            time_interval: 'day',
            model: 'mean',
            draw_type: 'line'
          }).then((resp) => {
            if (resp.data.status !== 'success') {
              alert(resp.data.reason)
              this.loading = false
              return
            }
            let data = resp.data.data
            let linemeta = {

              xAxis: [
                {
                  type: 'category',
                  boundaryGap: false,
                  data: this.date
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              animationDuration: 6000,
              animationDurationUpdate: 6000,
              dataZoom: [
                {show: true, type: 'inside'}
              ],
              series: []
            }
            linemeta.xAxis[0].data = data[0].data.map((item) => {
              return item.x
            })
            linemeta.series.push({
              name: data.name,
              type: 'line',
              areaStyle: {
                normal: {}
              },
              data: data[0].sum_data.map((dataItem) => { return dataItem.y })
            })
            this.lineMeta = linemeta
            this.loading = false
            console.log(data)
          })
        },
        getBarData: function () {
          let barmeta = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data: ['MAX', 'MIN']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value'
            },
            yAxis: {
              type: 'category',
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
            },
            series: []
          }
          getVTFData({
            domain: '通量数据',
            station: this.station,
            classification: '通量',
            index: this.chooseIndex,
            start_time: '2012-01-01',
            end_time: '2012-12-31',
            num: 30,
            time_interval: 'day',
            model: 'max',
            draw_type: 'line'
          }).then((resp) => {
            if (resp.data.status !== 'success') {
              alert(resp.data.reason)
              this.loading = false
              return
            }
            let maxdata = resp.data.data
            console.log(maxdata)
            barmeta.series.push({
              name: 'MAX',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data: maxdata[0].data.map((dataItem) => { return dataItem.y })
            })
            this.loading = false
          })
          getVTFData({
            domain: '通量数据',
            station: this.station,
            classification: '通量',
            index: this.chooseIndex,
            start_time: '2012-01-01',
            end_time: '2012-12-31',
            num: 30,
            time_interval: 'day',
            model: 'min',
            draw_type: 'line'
          }).then((resp) => {
            if (resp.data.status !== 'success') {
              alert(resp.data.reason)
              this.loading = false
              return
            }
            let minxdata = resp.data.data
            console.log(minxdata)
            barmeta.series.push({
              name: 'MIN',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: false,
                  position: 'inside'
                }
              },
              data: minxdata[0].data.map((dataItem) => { return dataItem.y })
            })
            this.loading = false
          })
          this.barMeta = barmeta
        },
        getPieData: function () {
          getVTFData({
            domain: '通量数据',
            station: this.station,
            classification: '通量',
            index: this.chooseIndex,
            start_time: '2012-01-30',
            end_time: '2012-12-10',
            num: 5,
            time_interval: 'day',
            model: 'mean',
            draw_type: 'line'
          }).then((resp) => {
            if (resp.data.status !== 'success') {
              alert(resp.data.reason)
              this.loading = false
              return
            }
            let getdata = resp.data.data
            console.log('mmmmmm', getdata[0].data[11].y)
            let piemeta = {
              title: [{
                text: 'Jan',
                textAlign: 'center',
                x: '9.3%',
                y: '35%',
                textStyle: {
                  fontSize: 12
                }
              }, {
                text: 'Feb',
                textAlign: 'center',
                x: '24.3%',
                y: '35%',
                textStyle: {
                  fontSize: 12
                }
              }, {
                text: 'Mar',
                textAlign: 'center',
                x: '39.3%',
                y: '35%',
                textStyle: {
                  fontSize: 12
                }
              }, {
                text: 'Apr',
                textAlign: 'center',
                x: '54.3%',
                y: '35%',
                textStyle: {
                  fontSize: 12
                }
              }, {
                text: 'May',
                textAlign: 'center',
                x: '69.3%',
                y: '35%',
                textStyle: {
                  fontSize: 12
                }
              }, {
                text: 'Jun',
                textAlign: 'center',
                x: '84.3%',
                y: '35%',
                textStyle: {
                  fontSize: 12
                }
              }, {
                text: 'Jul',
                textAlign: 'center',
                x: '9.3%',
                y: '65%',
                textStyle: {
                  fontSize: 12
                }
              }, {
                text: 'Aug',
                textAlign: 'center',
                x: '24.3%',
                y: '65%',
                textStyle: {
                  fontSize: 12
                }
              }, {
                text: 'Sep',
                textAlign: 'center',
                x: '39.3%',
                y: '65%',
                textStyle: {
                  fontSize: 12
                }
              }, {
                text: 'Oct',
                textAlign: 'center',
                x: '54.3%',
                y: '65%',
                textStyle: {
                  fontSize: 12
                }
              }, {
                text: 'Nov',
                textAlign: 'center',
                x: '69.3%',
                y: '65%',
                textStyle: {
                  fontSize: 12
                }
              }, {
                text: 'Dec',
                textAlign: 'center',
                x: '84.3%',
                y: '65%',
                textStyle: {
                  fontSize: 12
                }
              }],
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
              },
              series: [
                {
                  name: 'Jan',
                  type: 'pie',
                  center: ['10%', '40%'],
                  radius: ['15%', '21%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {value: getdata[0].data[0].y, name: '本月份'},
                    {value: getdata[0].sum_data[11].y - getdata[0].data[0].y, name: '剩余月份'}
                  ]
                },
                {
                  name: 'Feb',
                  type: 'pie',
                  center: ['25%', '40%'],
                  radius: ['15%', '21%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {value: getdata[0].data[1].y, name: '本月份'},
                    {value: getdata[0].sum_data[11].y - getdata[0].data[1].y, name: '剩余月份'}
                  ]
                },
                {
                  name: 'Ma',
                  type: 'pie',
                  center: ['40%', '40%'],
                  radius: ['15%', '21%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {value: getdata[0].data[2].y, name: '本月份'},
                    {value: getdata[0].sum_data[11].y - getdata[0].data[2].y, name: '剩余月份'}
                  ]
                },
                {
                  name: '访问来源',
                  type: 'pie',
                  center: ['55%', '40%'],
                  radius: ['15%', '21%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {value: getdata[0].data[3].y, name: '本月份'},
                    {value: getdata[0].sum_data[11].y - getdata[0].data[3].y, name: '剩余月份'}
                  ]
                },
                {
                  name: 'mmm',
                  type: 'pie',
                  center: ['70%', '40%'],
                  radius: ['15%', '21%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {value: getdata[0].data[4].y, name: '本月份'},
                    {value: getdata[0].sum_data[11].y - getdata[0].data[4].y, name: '剩余月份'}
                  ]
                },
                {
                  name: 'mmm',
                  type: 'pie',
                  center: ['85%', '40%'],
                  radius: ['15%', '21%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {value: getdata[0].data[5].y, name: '本月份'},
                    {value: getdata[0].sum_data[11].y - getdata[0].data[5].y, name: '剩余月份'}
                  ]
                }, {
                  name: '访问来源',
                  type: 'pie',
                  center: ['10%', '70%'],
                  radius: ['15%', '21%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {value: getdata[0].data[6].y, name: '本月份'},
                    {value: getdata[0].sum_data[11].y - getdata[0].data[6].y, name: '剩余月份'}
                  ]
                },
                {
                  name: 'mmm',
                  type: 'pie',
                  center: ['25%', '70%'],
                  radius: ['15%', '21%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {value: getdata[0].data[7].y, name: '本月份'},
                    {value: getdata[0].sum_data[11].y - getdata[0].data[7].y, name: '剩余月份'}
                  ]
                },
                {
                  name: 'mmm',
                  type: 'pie',
                  center: ['40%', '70%'],
                  radius: ['15%', '21%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {value: getdata[0].data[8].y, name: '本月份'},
                    {value: getdata[0].sum_data[11].y - getdata[0].data[8].y, name: '剩余月份'}
                  ]
                },
                {
                  name: '访问来源',
                  type: 'pie',
                  center: ['55%', '70%'],
                  radius: ['15%', '21%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {value: getdata[0].data[9].y, name: '本月份'},
                    {value: getdata[0].sum_data[11].y - getdata[0].data[9].y, name: '剩余月份'}
                  ]
                },
                {
                  name: 'mmm',
                  type: 'pie',
                  center: ['70%', '70%'],
                  radius: ['15%', '21%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {value: getdata[0].data[10].y, name: '本月份'},
                    {value: getdata[0].sum_data[11].y - getdata[0].data[10].y, name: '剩余月份'}
                  ]
                },
                {
                  name: 'mmm',
                  type: 'pie',
                  center: ['85%', '70%'],
                  radius: ['15%', '21%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {value: getdata[0].data[11].y, name: '本月份'},
                    {value: getdata[0].sum_data[11].y - getdata[0].data[11].y, name: '剩余月份'}
                  ]
                }
              ]
            }
            console.log('data', getdata[0].data)
            this.pieMeta = piemeta
            this.loading = false
          })
        },
        getIndex: function () {
          getVFTIndex({
            station: this.station,
            classification: '通量',
            domain: '通量数据'
          }).then((resp) => {
            if (resp.data.status !== 'success') {
              alert('ail')
              return
            }
            let indexes = []

            for (let catI in resp.data.data) {
              console.log('t', resp.data.data[catI].index)
              indexes = indexes.concat(resp.data.data[catI].index)
            }
            console.log('j', indexes)
            this.indexesOptions = indexes.slice(0, 12)

            console.log('idnex', resp)
          }).catch((e) => {
            this.loading = false
            alert(e)
          })
          console.log(this.indexesOptions)
        },
        makedata: function () {
          let base = +new Date(1968, 9, 3)
          let oneDay = 24 * 3600 * 1000

          this.data = [Math.random() * 300]

          for (let i = 1; i < 20000; i++) {
            let now = new Date(base += oneDay)
            this.date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
            this.data.push(Math.round((Math.random() - 0.5) * 20 + this.data[i - 1]))
          }
        },
        getIndexes: function () {
          this.loading = true
          let mapmeta = {
            tooltip: {},
            geo: {
              map: 'china',
              mapType: 'china',
              layoutSize: 3000,
              layoutCenter: ['30%', '30%'],
              roam: true,
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: 'F06C00'
                  }
                }
              },
              itemStyle: {
                normal: {
                  borderColor: 'rgba(0, 0, 0, 0.2)'
                },
                emphasis: {
                  areaColor: 'e0ffff',
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: 'e0ffff'
                }
              }
            }
          }
          this.mapMeta = mapmeta
          this.loading = false
          this.showChart = true
        }
      }
    }
</script>

<style scoped>
#mapChart {
 float: left;
  height: 300px;
}

#main-container {
  background-color: rgba(51,51,51,1)
}

#index_list_card {
  margin-top: 50px;
}

</style>
