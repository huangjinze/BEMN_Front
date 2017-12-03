<!-- 该模块为:点击导航栏的“数据展示”->“森林领域”->“水文”时，显示的页面内容-->
<<template>
    <BasePage>
        <div slot="header">header</div>
        <div slot="aside"><navi></navi></div>
        <div slot="main">
            <headGuider :partTags="partTags" :siteTags="siteTags" @ClickPart="parentPartListen" @ClickSite="parentSiteListen"></headGuider>
        </div>
    </BasePage>
</template>
<script>
    import navi from '../../components/layout/navi'
    import BasePage from '../../components/BasePage'
    import headGuider from '../../components/headGuider'
    export default {
      components: {navi, BasePage, headGuider},
      data () {
        return {
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
