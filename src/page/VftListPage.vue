<template>
  <BasePage>
    <div slot="header">header</div>
    <div slot="aside">
      <navi></navi>
    </div>
    <div slot="main">
      <dataManager :navs="navs" @changePage="dataSource">
      </dataManager>
    </div>
  </BasePage>
</template>

<script>
  import {getIndexData} from '../model/data'
  import navi from '../components/layout/navi'
  import BasePage from '../components/BasePage'
  import dataManager from '../components/dataManager'
  export default {
    mounted () {
      this.dataSource()
    },
    components: {
      navi,
      BasePage,
      dataManager
    },
    methods: {
      dataSource (tab) {
        // console.log(tab)
        // 返回tab[0]为分页组件的当前页数，tab[1]为便签页组件的当前索引
        if (!tab) {
          getIndexData({station: '八达岭', classification: '通量', domain: '水土保持', category: 'A', page: 1}).then(resp => {
            console.log(resp)
            console.log(resp.data.data)
            // 由我来生成头部！
            for (let k in resp.data.data.title) {
              this.navs[0].mcols.push({'prop': resp.data.data.title[k].factor_name, 'label': resp.data.data.title[k].factor_name + '(' + resp.data.data.title[k].unit + ')'})
            }
            // 由我来生成数据!
            for (let k in resp.data.data.data) {
              this.navs[0].tableData.push(resp.data.data.data[k])
            }
          }).catch(resp => {
            this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
          })
        } else {
          getIndexData({station: '八达岭', classification: '通量', domain: '水土保持', category: this.navs[tab[1]].label, page: tab[0]}).then(resp => {
            this.navs[tab[1]].mcols.splice(0, this.navs[tab[1]].mcols.length)
            this.navs[tab[1]].tableData.splice(0, this.navs[tab[1]].tableData.length)
            // 由我来生成头部！
            for (let k in resp.data.data.title) {
              this.navs[tab[1]].mcols.push({'prop': resp.data.data.title[k].factor_name, 'label': resp.data.data.title[k].factor_name + '(' + resp.data.data.title[k].unit + ')'})
            }
            // 由我来生成数据!
            for (let k in resp.data.data.data) {
              this.navs[tab[1]].tableData.push(resp.data.data.data[k])
            }
          }).catch(resp => {
            this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
          })
        }
      },
      changePage (val) {
        console.log(val)
      },
      changeTag (tab) {
        console.log(tab)
      }
    },
    data () {
      return {
        navs: [{
          label: 'A',
          mcols: [],
          tableData: []
        }, {
          label: 'B',
          mcols: [],
          tableData: [{
          }]
        },
        {
          label: 'C',
          mcols: [],
          tableData: [{
          }]
        }]
      }
    }
  }
</script>

<style scoped>


</style>
