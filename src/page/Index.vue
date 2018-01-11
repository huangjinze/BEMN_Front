/*

*/
<template>
    <!--<div>-->
        <!--<div class="nav">-->
            <!--<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">-->
                <!--<el-menu-item index="1">处理中心</el-menu-item>-->
                <!--<el-menu-item index="3"><a>订单管理</a></el-menu-item>-->
            <!--</el-menu>-->
        <!--</div>-->
        <!--<div class="line"></div>-->
    <!--</div>-->
    <div id="box" ref="mybox">asrvar</div>

</template>

<script>
  import * as THREE from 'three'
  var camera, scene, renderer
  var geometry, material, mesh
  export default {
    data () {
      return {

      }
    },
    mounted () {
      this.init()
    },
    created: function () {
      this.init1()
      this.animate()
    },
    methods: {
      init () {
        const self = this
        this.$refs.mybox.style.color = 'red'
        // console.log(this.$refs.mybox)
        setTimeout(() => {
          self.$refs.mybox.style.color = 'blue'
        }, 2000)
      },
      init1 () {
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
        camera.position.z = 1

        scene = new THREE.Scene()

        geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
        material = new THREE.MeshNormalMaterial()

        mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        renderer = new THREE.WebGLRenderer({antialias: true})
        renderer.setSize(window.innerWidth, window.innerHeight)
//    container.appendChild(renderer.domElement)
        document.body.appendChild(renderer.domElement)
      },
      animate () {
        requestAnimationFrame(this.animate)
        mesh.rotation.x += 0.01
        mesh.rotation.y += 0.02

        renderer.render(scene, camera)
      }
    }
  }

  /* var container
  container = document.getElementById('container') */
  //  console.log(container)
//  console.log(this.$refs.mybox.innerHTML)
</script>