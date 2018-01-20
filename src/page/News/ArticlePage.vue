<template>
  <BasePage>
    <div slot="header">header</div>
    <div slot="aside">
      <navi></navi>
    </div>
    <div slot="main">
      <articles :options="options" :leftItems="leftItems" :rightBnts="rightBnts" :news="news" :totalSize="totalSize"
      @Submit="onSubmitW" @changeCategory="dataSource" @delete="dltNews" @edit="EditNews" :newContents="newContents"></articles>
    </div>
  </BasePage>
</template>

<script>
  import navi from '../../components/layout/navi'
  import BasePage from '../../components/BasePage'
  import articles from '../../components/newsPublic/Article'
  import {getNewsTitle, deleteNews, addNews, getNews, editNews} from '../../model/articleDate'
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
          label: '媒体聚焦'
        }, {
          value: '2',
          label: '生态信息'
        }, {
          value: '3',
          label: '统计信息'
        }, {
          value: '4',
          label: '商务信息'
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
        news: [],
        tab: '媒体聚焦',
        newContents: {},
        totalSize: 50
      }
    },
    methods: {
      onSubmitW (content) {
        console.log(content[0])
        if (!content[0].id) {
          addNews({'newsTitle': content[0].title, 'newsContent': content[0].content, 'category': content[0].category}).then(resp => {
            this.$alert('成功发布新闻内容', '提示', {confirmButtonText: 'ok'})
          }).catch(resp => {
            this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
          })
        } else {
          editNews({'getId': content[0].id, 'newsTitle': content[0].title, 'newsContent': content[0].content, 'category': content[0].category}).then(resp => {
            this.$alert('成功修改新闻内容', '提示', {confirmButtonText: 'ok'})
          }).catch(resp => {
            this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
          })
        }
      },
      dataSource (tab) {
        if (tab) {
          this.tab = tab
        }
        getNewsTitle({category: this.tab}).then(resp => {
          console.log(resp)
          this.news.splice(0, this.news.length)
          this.totalSize = resp.data.data.length
          for (let k in resp.data.data) {
            this.news.push({'title': resp.data.data[k].title, 'no': resp.data.data[k].id})
          }
        }).catch(resp => {
          this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
        })
      },
      dltNews (tab) {
        deleteNews({'id': tab}).then(resp => {
          this.dataSource()
        })
      },
      EditNews (id) {
        getNews({'id': id}).then(resp => {
          this.newContents = resp.data.data[0]
        })
      }
    }
  }
</script>


