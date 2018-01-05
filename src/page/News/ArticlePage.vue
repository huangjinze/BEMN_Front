<template>
  <BasePage>
    <div slot="header">header</div>
    <div slot="aside">
      <navi></navi>
    </div>
    <div slot="main">
      <articles :leftItems="leftItems" :rightBnts="rightBnts" :news="news"></articles>
    </div>
  </BasePage>
</template>

<script>
  import navi from '../../components/layout/navi'
  import BasePage from '../../components/BasePage'
  import articles from '../../components/newsPublic/Article'
  export default {
    components: {
      navi,
      BasePage,
      articles
    },
    data () {
      return {
        leftItems: [{
          label: '新闻编辑',
          linkto: '/#/article'
        }],
        rightBnts: [{
          bnt: '媒体聚焦' // 标签按钮的名字
        },
        {
          bnt: '生态信息'
        },
        {
          bnt: '统计信息'
        },
        {
          bnt: '商务信息'
        }],
        news: [{
          titile: 'One!!!!',
          no: '1'
        },
        {
          titile: 'two!!!!',
          no: '2'
        },
        {
          titile: 'three!!!!',
          no: '3'
        },
        {
          titile: 'Mac n Cheese (live mashup)',
          no: '4'
        }]
      }
    },
    methods: {
    }
  }
</script>
