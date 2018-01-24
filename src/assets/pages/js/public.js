//  面积图————————————————————————————————————————————————————————————————————————————————————————————————
import echarts from 'echarts'
var myChart = echarts.init(document.getElementById('areaChart'))
var option1
var date = []

var dataa = []
var data2 = []
var max = []
var min = []
//  12个月的平均值
var data_yue1
var data_yue2
var data_yue3
var data_yue4
var data_yue5
var data_yue6
var data_yue7
var data_yue8
var data_yue9
var data_yue10
var data_yue11
var data_yue12
var data_yueall
function createChart () {
  option1 = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%']
      }
    },
    animationDuration: 12000,
    title: {
      left: 'center',
      text: '2015年 ' + indexXiao + '指标分析面积图',
      // subtext:'—'+startTime+'到'+endTime,
      textStyle: {
        color: 'white',
        fontSize: 22
      }
    },
    grid: {
      right: '4%',
      left: '4%',
      bottom: '6%'
    },
    legend: {
      top: 'bottom',
      data: ['意向']
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: 'white'
        }},
      data: date
    },
    yAxis: {
      name: danwei,
      nameTextStyle: {
        color: 'white'
      },
      min: 'dataMin',
      max: 'dataMax',
      type: 'value',
      scale: true,
      splitLine: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: 'white'
        }},
      boundaryGap: [0, '100%']
    },
    series: [
      {
        name: '清洗数据',
        type: 'line',
        smooth: true,
        large: true,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          normal: {
            color: 'rgb(1, 169, 255)'
          }
        },
        markPoint: {
          data: [
                    // {type: 'max', name: '最大值',label:{normal:{show:false}}},
                    // {type: 'min', name: '最小值',label:{normal:{show:false}}}
          ]
        },
            // markLine: {
            //     label:{
            //             normal:{show:false}
            //         },
            //     data: [
            //         {type: 'average', name: '平均值',itemStyle: {
            //             normal: {
            //                 color: 'white'

            //             }
            //         },lineStyle:{
            //             normal:{
            //                 width:0.5
            //             }
            //         }
            //     }
            // ]
            // },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(1, 169, 255,1)'
            }, {
              offset: 1,
              color: 'rgba(1, 169, 255,0.7)'
            }])
          }
        },
        data: dataa
      }
    ]
  }
  window.onresize = myChart.resize
// 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option1, true)
}
//  createChart();
//  地图————————————————————————————————————————————————————————————————————————————————————————————————
var myChart2 = echarts.init(document.getElementById('map'))
//  获取站点经纬度
var data1 = []
var data = []
var geoCoordMap = {}
var geoCoordMap1 = {}
var convertData = function (data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}
//  森林站点
var convertData2 = function (data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap1[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}
function createMap () {
  var option = {
    // backgroundColor: 'rgba(1,1,1,0)',
    backgroundColor: 'rgb(0, 0, 17,0)',
    title: {
      text: tongliangta,
      textStyle: {
        fontSize: 22,
        fontWeight: 'bolder',
        color: 'white'
      },
      x: 'center',
      y: '1%'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}'
    },
    legend: {
      show: true,
      left: '3%',
      top: '90%',
      data: [ '通量塔', '生态站' ],
      textStyle: {
        fontSize: 14,
        color: '#fff'
      }
    },
    geo: {
      map: 'china',
      label: {
        emphasis: {
          show: false
        }
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#1078B6',
          borderColor: 'rgba(100,149,237,1)'
        },
        emphasis: {
          // areaColor: '#1b1b1b'
          areaColor: '#080111'
        }
      }
    },
    series: [
      {
        name: '通量塔',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        symbolSize: function (val) {
          return 4
        },
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        itemStyle: {
          normal: {
            color: '#f4e925',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data: convertData(data.sort(function (a, b) {
          return b.value - a.value
        }).slice(0, 7))
      },
      {
        name: '生态站',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        symbolSize: 4,
        rippleEffect: {
          brushType: 'fill'
        },
        label: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#C1EFCB',
            shadowBlur: 8,
            shadowColor: '#333'
          },
          emphasis: {
            borderColor: '#fff',
            borderWidth: 1
          }
        },
        data: convertData2(data1)
      }
    ]
  }
// 使用刚指定的配置项和数据显示图表。
  window.onresize = myChart2.resize
  myChart2.setOption(option)
}

 //  pie11————————————————————————————————————————————————————————————————————————————————————————————————
var myChart3 = echarts.init(document.getElementById('pie11'))

function createPie11 () {
  var option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    animationDuration: 1000,
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['72%', '100%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: '{b}\n\n{c}',
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{
          value: data_yue1,
          name: '一月',
          itemStyle: {
            normal: {
              //  color:'#7CE6D8'
              //  color:'#FF9000'
              color: '#FEC504'
            }
          }
        }, {
          value: data_yueall,
          name: '',
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {color: '#085591'}}}
        ]
      }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  window.onresize = myChart3.resize;
  myChart3.setOption(option);
}

//  pie12————————————————————————————————————————————————————————————————————————————————————————————————
var myChart4 = echarts.init(document.getElementById('pie12'));

function createPie12 () {
  var option = {
    animationDuration: 1000,
    animationDelay: 1000,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['72%', '100%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: '{b}\n\n{c}',
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '16',
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
          {value: data_yue2, name: '二月', itemStyle: {normal: {color: '#FEC504'}}},
          //     {value:data_yue2, name:'二月',itemStyle:{normal:{color:'#FF9000'}}},
          {value: data_yueall, name: '', label: {normal: {show: false}}, itemStyle: {normal: {color: '#085591'}}}
        ]
      }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  window.onresize = myChart4.resize;
  myChart4.setOption(option);
}

//  pie13————————————————————————————————————————————————————————————————————————————————————————————————
var myChart5 = echarts.init(document.getElementById('pie13'));

function createPie13 () {
  var option = {
    animationDuration: 1000,
    animationDelay: 2000,
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['72%', '100%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: '{b}\n\n{c}',
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '16',
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
          // {value:data_yue3, name:'三月',itemStyle:{normal:{color:'#FEC504'}}},
          {value: data_yue3, name: '三月', itemStyle: {normal: {color: '#42DCA3'}}},
          {value: data_yueall, name: '', label: {normal: {show: false}}, itemStyle: {normal: {color: '#085591'}}}
        ]
      }
    ]
  }
    // 使用刚指定的配置项和数据显示图表。
  window.onresize = myChart5.resize;
  myChart5.setOption(option);
}
//  pie14————————————————————————————————————————————————————————————————————————————————————————————————
var myChart6 = echarts.init(document.getElementById('pie14'));
function createPie14 () {
  var option = {
    animationDuration: 1000,
    animationDelay: 3000,
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['72%', '100%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: '{b}\n\n{c}',
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '16',
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
          // {value:data_yue4, name:'四月',itemStyle:{normal:{color:'#FEC504'}}},
          {value: data_yue4, name: '四月', itemStyle: {normal: {color: '#42DCA3'}}},
          {value: data_yueall, name: '', label: {normal: {show: false}}, itemStyle: {normal: {color: '#085591'}}}
        ]
      }
    ]
  }
// 使用刚指定的配置项和数据显示图表。
  window.onresize = myChart6.resize;
  myChart6.setOption(option);
}

//  pie15————————————————————————————————————————————————————————————————————————————————————————————————
var myChart7 = echarts.init(document.getElementById('pie15'))
function createPie15 () {
  var option = {
    animationDuration: 1000,
    animationDelay: 4000,
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['72%', '100%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: '{b}\n\n{c}',
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '16',
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
          {value: data_yue5, name: '五月', itemStyle: {normal: {color: '#FF9000'}}},
          {value: data_yueall, name: '', label: {normal: {show: false}}, itemStyle: {normal: {color: '#085591'}}}
        ]
      }
    ]
  }
    // 使用刚指定的配置项和数据显示图表。
  window.onresize = myChart7.resize;
  myChart7.setOption(option);
}
//  pie14————————————————————————————————————————————————————————————————————————————————————————————————
var myChart8 = echarts.init(document.getElementById('pie16'))

function createPie16 () {
  var option = {
    animationDuration: 1000,
    animationDelay: 5000,
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['72%', '100%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: '{b}\n\n{c}',
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '16',
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
          {value: data_yue6, name: '六月', itemStyle: {normal: {color: '#FF9000'}}},
          {value: data_yueall, name: '', label: {normal: {show: false}}, itemStyle: {normal: {color: '#085591'}}}
        ]
      }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  window.onresize = myChart8.resize
  myChart8.setOption(option)
}
 //  pie21————————————————————————————————————————————————————————————————————————————————————————————————
var myChart21 = echarts.init(document.getElementById('pie21'));

function createPie21 () {
  var option = {
    animationDuration: 1000,
    animationDelay: 6000,
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['72%', '100%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: '{b}\n\n{c}',
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '16',
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
          {value: data_yue8, name: '七月', itemStyle: {normal: {color: '#FEC504'}}},
          //  {value:data_yue7, name:'七月',itemStyle:{normal:{color:'#FF9000'}}},
          {value: data_yueall, name: '', label: {normal: {show: false}}, itemStyle: {normal: {color: '#085591'}}}
        ]
      }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  window.onresize = myChart21.resize
  myChart21.setOption(option)
}
//  pie22————————————————————————————————————————————————————————————————————————————————————————————————
var myChart22 = echarts.init(document.getElementById('pie22'))

function createPie22 () {
  var option = {animationDuration: 1000,
    animationDelay: 7000,
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['72%', '100%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: '{b}\n\n{c}',
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '16',
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
          // {value:data_yue8, name:'八月',itemStyle:{normal:{color:'#7CE6D8'}}},
          {value: data_yue8, name: '八月', itemStyle: {normal: {color: '#FEC504'}}},
          // {value:data_yue8, name:'八月',itemStyle:{normal:{color:'#FF9000'}}},
          {value: data_yueall, name: '', label: {normal: {show: false}}, itemStyle: {normal: {color: '#085591'}}}
        ]
      }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  window.onresize = myChart22.resize;
  myChart22.setOption(option);
}
//  pie23————————————————————————————————————————————————————————————————————————————————————————————————
var myChart23 = echarts.init(document.getElementById('pie23'));

function createPie23 () {
  var option = {
    animationDuration: 1000,
    animationDelay: 8000,
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['72%', '100%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: '{b}\n\n{c}',
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '16',
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
          // {value:data_yue9, name:'九月',itemStyle:{normal:{color:'#FEC504'}}},
          {value: data_yue9, name: '九月', itemStyle: {normal: {color: '#42DCA3'}}},
          {value: data_yueall, name: '', label: {normal: {show: false}}, itemStyle: {normal: {color: '#085591'}}}
        ]
      }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  window.onresize = myChart23.resize
  myChart23.setOption(option)
}

//  pie24————————————————————————————————————————————————————————————————————————————————————————————————
var myChart24 = echarts.init(document.getElementById('pie24'))

function createPie24 () {
  var option = {
    animationDuration: 1000,
    animationDelay: 9000,
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['72%', '100%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: '{b}\n\n{c}',
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '16',
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
          // {value:data_yue10, name:'十月',itemStyle:{normal:{color:'#FEC504'}}},
          {value: data_yue10, name: '十月', itemStyle: {normal: {color: '#42DCA3'}}},
          {value: data_yueall, name: '', label: {normal: {show: false}}, itemStyle: {normal: {color: '#085591'}}}
        ]
      }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  window.onresize = myChart24.resize
  myChart24.setOption(option)
}
// pie25————————————————————————————————————————————————————————————————————————————————————————————————
var myChart25 = echarts.init(document.getElementById('pie25'))

function createPie25 () {
  var option = {
    animationDuration: 1000,
    animationDelay: 10000,
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['72%', '100%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: '{b}\n\n{c}',
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '16',
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
          {value: data_yue11, name: '十一月', itemStyle: {normal: {color: '#FF9000'}}},
          {value: data_yueall, name: '', label: {normal: {show: false}}, itemStyle: {normal: {color: '#085591'}}}
        ]
      }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  window.onresize = myChart25.resize
  myChart25.setOption(option)
}

// pie14————————————————————————————————————————————————————————————————————————————————————————————————
var myChart26 = echarts.init(document.getElementById('pie26'))

function createPie26 () {
  var option = {
    animationDuration: 1000,
    animationDelay: 11000,
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['72%', '100%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: '{b}\n\n{c}',
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '16',
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
          {value: data_yue12, name: '十二月', itemStyle: {normal: {color: '#FF9000'}}},
          {value: data_yueall, name: '', label: {normal: {show: false}}, itemStyle: {normal: {color: '#085591'}}}
        ]
      }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  window.onresize = myChart26.resize
  myChart26.setOption(option)
}
// barchart————————————————————————————————————————————————————————————————————————————————————————————————
var myChartBar = echarts.init(document.getElementById('bar'))

function createBar () {
  var option = {
    animationDuration: 14000,
    legend: {
      data: ['最小值', '最大值'],
      textStyle: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Microsoft YaHei',
        fontWeight: 'bolder'
      }
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '1%',
      containLabel: true
    },
    xAxis: [
      {
        show: false,
        type: 'value',
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: 'white',
            fontFamily: 'Microsoft YaHei'
          }
        }
      }
    ],
    yAxis: [
      {
        axisLabel: {
          textStyle: {
            color: 'white',
            fontFamily: 'Microsoft YaHei'
          }},
        splitLine: {
          show: false
        },
        type: 'category',
        axisTick: {show: false},
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      }
    ],
    series: [
      {
        name: '最小值',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return idx * 1000
        },
        itemStyle: {normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: 'rgba(1, 169, 255,1)'
          }, {
            offset: 1,
            color: 'rgba(1, 169, 255,0.6)'
          }])
        }},
        data: min
      },
      {
        name: '最大值',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return idx * 1000
        },
        itemStyle: {normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: 'rgba(255,144,0,1)'
          }, {
            offset: 1,
            color: 'rgba(254,197,4,1)'
          }])
        }},
        data: max
      }
    ]
  }
    // 使用刚指定的配置项和数据显示图表。
  window.onresize = myChartBar.resize
  myChartBar.setOption(option)
}
// 全部重新设置大小
$(window).resize(function () {
  myChartBar.resize()
  myChart3.resize()
  myChart.resize()
  myChart2.resize()
  myChart4.resize()
  myChart5.resize()
  myChart6.resize()
  myChart7.resize()
  myChart8.resize()
  myChart21.resize()
  myChart22.resize()
  myChart23.resize()
  myChart24.resize()
  myChart25.resize()
  myChart26.resize()
})
