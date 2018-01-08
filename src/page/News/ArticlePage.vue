<template>
  <BasePage>
    <div slot="header">header</div>
    <div slot="aside">
      <navi></navi>
    </div>
    <div slot="main">
      <articles :options="options" :leftItems="leftItems" :rightBnts="rightBnts" :news="news"
      @Submit="onSubmitW" @changeCategory="dataSource" @delete="deleteNews"></articles>
    </div>
  </BasePage>
</template>

<script>
  import navi from '../../components/layout/navi'
  import BasePage from '../../components/BasePage'
  import articles from '../../components/newsPublic/Article'
  import {getNewsTitle} from '../../model/articleDate'
  import {deleteNews} from '../../model/articleDate'
  export default {
    mounted () {
      this.dataSource()
    },
    components: {
      navi,
      BasePage,
      articles
    },
    data () {
      return {
        options: [{
          value: '1',
          label: '财务信息'
        }, {
          value: '2',
          label: '双皮奶'
        }, {
          value: '3',
          label: '蚵仔煎'
        }, {
          value: '4',
          label: '龙须面'
        }, {
          value: '5',
          label: '北京烤鸭'
        }],
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
        news: []
      }
    },
    methods: {
      onSubmitW () {
        console.log('提交文章')
      },
      deleteNews (tab) {
        deleteNews({'id': tab})
      },
      dataSource (tab) {
        if (!tab) {
          tab = '媒体聚焦'
        }
        getNewsTitle({category: tab}).then(resp => {
          console.log(resp)
          this.news.splice(0, this.news.length)
          for (let k in resp.data.data) {
            this.news.push({'title': resp.data.data[k].title, 'no': resp.data.data[k].id})
          }
        }).catch(resp => {
          this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
        })
      }
    }
  }
</script>
