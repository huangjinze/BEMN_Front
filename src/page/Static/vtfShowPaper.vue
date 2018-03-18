<template>
    <div slot="main" v-loading="loading">
      <el-row v-if="showChart" id="headchart">
        <el-col :span="20">
          <echart :options="lineMeta" style="width: 100%"></echart>
        </el-col>
      </el-row>
      <el-row v-if="showChart" id="downchart">
        <el-col :span="6">
        <echart :options="mapMeta" style="width: 100%" id="mapChart"></echart>
        </el-col>
        <el-col :span="12">
          <echart :options="pieMeta" style="width: 100%"></echart>
        </el-col>
        <el-col :span="6" >
          <echart :options="barMeta" style="width: 100%"></echart>
        </el-col>

      </el-row>
    </div>
</template>

<script>
    import navi from '../../components/layout/navi'
    import chartForm from '../../components/echart/vftShowChart'
    import echart from 'vue-echarts'
    import singleSelect from '../../components/multiSelect/singleSelect'
    import chartGrid from '../../components/echart/chartGrid'
    import ElRow from 'element-ui/packages/row/src/row'
    import chinaJSON from '../../model/china.json'

    console.log(chinaJSON)

    echart.registerMap('china', chinaJSON)

    export default {
      components: {
        ElRow, echart, navi, chartForm, singleSelect, chartGrid
      },
      name: 'vtfShowPaper',
      data () {
        return {
          loading: true,
          barMeta: {},
          pieMeta: {},
          mapMeta: {},
          lineMeta: {},
          showChart: true,
          datas: [],
          bardata: [320, 302, 301, 334, 390, 330, 320, 400, 200, 100, 200, 400],
          date: [],
          piedata: [
            {value: 335, name: '本月份'},
            {value: 310, name: '剩余月份'}
          ]
        }
      },
      mounted () {
        this.makedata()
        this.getIndexes()
      },
      methods: {
        makedata: function () {
          let base = +new Date(1968, 9, 3)
          let oneDay = 24 * 3600 * 1000

          this.data = [Math.random() * 300]

          for (let i = 1; i < 20000; i++) {
            let now = new Date(base += oneDay)
            this.date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
            this.data.push(1)
          }
        },
        getIndexes: function () {
          this.loading = true
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
            series: [
              {
                name: 'MAX',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'inside'
                  }
                },
                data: this.bardata
              },
              {
                name: 'MIN',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'inside'
                  }
                },
                data: this.bardata
              }
            ]
          }
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
                data: this.piedata
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
                data: this.piedata
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
                data: this.piedata
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
                data: this.piedata
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
                data: this.piedata
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
                data: this.piedata
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
                data: this.piedata
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
                data: this.piedata
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
                data: this.piedata
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
                data: this.piedata
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
                data: this.piedata
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
                data: this.piedata
              }
            ]
          }
          let mapmeta = {
            tooltip: {},
            geo: {
              map: 'china',
              mapType: 'china',
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
          console.log(this.date)
          console.log(this.data)
          let linemeta = {
            title: {
              left: 'center',
              text: '大数据量面积图'
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: [120, 132, 101, 134, 90, 230, 210]
              }
            ]
          }
          this.barMeta = barmeta
          this.pieMeta = piemeta
          this.mapMeta = mapmeta
          this.lineMeta = linemeta
          this.loading = false
          this.showChart = true
        }
      }
    }
</script>

<style scoped>
#mapChart {
 float: left;
}

</style>
