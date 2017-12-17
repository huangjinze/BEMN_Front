<!-- 该模块为:点击导航栏的“数据展示”->“森林领域”->“水文”等时，显示的页面内容-->
<<template>
    <BasePage>
        <div slot="header">header</div>
        <div slot="aside"><navi></navi></div>
        <div slot="main">
            <headGuider :initTopPartTags="topPartTags" :initTopSiteTags="topSiteTags" :partTags="partTags" :siteTags="siteTags" @ClickPart="parentPartListen" @ClickSite="parentSiteListen"></headGuider>
            <indexChoice :indices="index" :col_name="colName" :tableData="tableData"></indexChoice>
        </div>
    </BasePage>
</template>
<script>
    import navi from '../../components/layout/navi'
    import BasePage from '../../components/BasePage'
    import headGuider from '../../components/headGuider'
    import indexChoice from '../../components/indexChoice'
    export default {
      components: {navi, BasePage, headGuider, indexChoice},
      data () {
        return {
          topPartTags: [
            '东北地区'
          ],
          topSiteTags: [
            '山西太行山森林生态系统国家定位观测研究站'
          ],
          partTags: [
             {text: '东北地区', id: '1'},
             {text: '华北地区', id: '2'},
             {text: '西北地区', id: '3'},
             {text: '华东地区', id: '4'}
          ],
          siteTags: [
             {text: '山西太行山森林生态系统国家定位观测研究站', id: '1'},
             {text: '山东黄河三角洲森林生态系统国家定位观测研究站', id: '2'},
             {text: '山西太岳山森林生态系统国家定位观测研究站', id: '3'},
             {text: '陕西黄龙山森林生态系统国家定位观测研究站', id: '4'}
          ],
          index: [
             {text: '森林枯落物', id: '1'},
             {text: '土壤物理性质', id: '2'},
             {text: '土壤化学性质', id: '3'},
             {text: '水质', id: '4'}
          ],
          colName: [
             {text: '样地编号', id: '1', prop: 'id'},
             {text: '森林枯落物厚度', id: '2', prop: 'thickness'},
             {text: '调查时间', id: '3', prop: 'searchTime'}
          ],
          tableData: [
             {id: 'LS-Y- 854', thickness: '2.77', searchTime: '2014-03-20'},
             {id: 'LS-Y- 855', thickness: '3.59', searchTime: '2014-03-20'},
             {id: 'LS-Y- 856', thickness: '2.77', searchTime: '2014-03-20'}
          ]
        }
      },
      methods: {
        parentPartListen (id) {

        },
        parentSiteListen (id) {

        }
      }
    }
</script>
<style scoped>

</style>
