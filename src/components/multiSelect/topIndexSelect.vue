<!-- 该模块为:可复用的面包屑多选导航模块-->
<template>
    <div :class="className" :id="id">
        <div id="currentList">
            <span>当前选择：</span>
            <el-tag closable
                    v-for="tag in topPartTags"
                    :key="tag.text"
                    @close="handlePartClose(tag.text)"
            >{{tag.text}}</el-tag>
            <el-tag closable
                    v-for="tag in topSiteTags"
                    :key="tag.text"
                    @close="handleSiteClose(tag.text)"
            >{{tag.text}}</el-tag>
            <el-tag closable
                    v-for="tag in topIndexTags"
                    :key="tag.text"
                    @close="handleIndexClose(tag.text)"
            >{{tag.text}}</el-tag>
            <li class="station_cookie" style="display: none;"></li>
            <li class="region_cookie" style="display: none;"></li>
        </div>
        <indexSelect v-if="indices[0].flag < 4" :indices="indices" :indexTags="indexTags" @ClickIndexClass="ClickIndexClassListen" @ClickIndex="ChooseTag"></indexSelect>
    </div>

</template>

<script>
    import indexSelect from './indexSelect'
    export default {
      components: {indexSelect},
      data () {
        return {
          topPartTags: [],
          topSiteTags: [],
          topIndexTags: []
        }
      },
      props: {
        initTopPartTags: {
          type: Array,
          required: true
        },
        initTopSiteTags: {
          type: Array,
          required: true
        },
        initTopIndexTags: {
          type: Array,
          required: true
        },
        indices: {
          type: Array,
          required: true
        },
        indexTags: {
          type: Array,
          required: true
        }
      },
      mounted: function () {
        this.$nextTick(function () {
//      this.$on('childMethod', function () {
//        console.log('监听成功')
//      })
          this.topPartTags.push({ text: this.initTopPartTags[0] })
          this.topSiteTags.push({ text: this.initTopSiteTags[0] })
        })
      },
      methods: {
        handlePartClose (tag) {
          this.topPartTags.splice(this.topPartTags.indexOf(tag), 1)
          this.topSiteTags.pop()
          this.topIndexTags.pop()
          this.$emit('CloseStation')
        },
        handleSiteClose (tag) {
          this.topSiteTags.splice(this.topSiteTags.indexOf(tag), 1)
          this.topIndexTags.pop()
          this.$emit('CloseClass', this.topPartTags[0].text)
        },
        handleIndexClose (tag) {
          this.topIndexTags.splice(this.topIndexTags.indexOf(tag), 1)
        },
        ChooseTag (id) {
          let temp = this.indexTags.find(function (value, index, stations) { return value.id === id })
          let flag = this.indices[0].flag
          if (flag === 1) {
            this.topPartTags.pop()
            this.topPartTags.push({ text: temp.text })
            this.topSiteTags.pop()
            this.topIndexTags.pop()
            this.$emit('ClickTower', id)
          } else if (flag === 2) {
            this.topSiteTags.pop()
            this.topIndexTags.pop()
            this.topSiteTags.push({ text: temp.text })
            this.$emit('ClickClass', id)
          } else if (flag === 3) {
            this.topIndexTags.pop()
            this.topIndexTags.push({ text: temp.text })
            this.$emit('ClickIndex', id)
          }
        },
        ClickIndexClassListen (id) {
          this.$emit('ClickIndexClass', id)
        }
      },
      name: 'topIndexSelect'
    }
</script>
<style scoped>
    .el-tag{
        font-size: 16px;
    }
    [class*=" el-icon-"]{
        line-height:48px;
    }
    .link{
        margin-bottom: 10px;
    }
    #currentList{
        text-align:left;
        margin-bottom: 20px;
    }
    #collapseOne ul li a{
        font-size: 16px;
    }
    .portlet.box> .portlet-body{padding-top:0px!important;}
    #example_length label{
        display:none;
    }
    #example_filter label{

        padding-bottom:10px;
    }
    .pagination li{
        padding:2px!important;
    }
    .modal-footer button{
        width: 100px;
    }
    .laydate_body .laydate_bottom{
        height: 32px;
    }

    .btn-group>.dropdown-menu:before, .dropdown-toggle>.dropdown-menu:before, .dropdown>.dropdown-menu:before{
        left: 34px;
    }
    .btn-group>.dropdown-menu:after, .dropdown-toggle>.dropdown-menu:after, .dropdown>.dropdown-menu:after{
        left: 34px;
    }
    .daoru li {
        text-align: center;
    }
    .daoru li a{
        width:120px!important;
        text-align: center;
    }
    .dropdown-menu>li>a{
        width: 88px;
        cursor: pointer;
    }
</style>

