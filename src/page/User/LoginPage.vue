<template>
  <div style="margin: 0;padding: 0">
    <div ref="mybox" style="position:absolute;left:0;top:0;margin: 0;padding: 0"></div>
    <login v-model="loginForm" :CodeUrl="codeUrl" @refreshCode="onRefreshCode" @loginClick="onLoginClick"></login>
  </div>
</template>

<script>
  import login from '../../components/user/login.vue'
  import {mapActions} from 'vuex'
  import { host } from '../../model/data'
//  import {loginUser} from '../../model/user'
  import * as THREE from 'three'
  import nx from '../../assets/pages/textures/nx.jpg'
  import ny from '../../assets/pages/textures/ny.jpg'
  import nz from '../../assets/pages/textures/nz.jpg'
  import px from '../../assets/pages/textures/px.jpg'
  import py from '../../assets/pages/textures/py.jpg'
  import pz from '../../assets/pages/textures/pz.jpg'
  var camera
  var scene
  var renderer
  var textureplaceholder
  var isUserInteracting = false
  var lon = 90
  var lat = 0
  var phi = 0
  var theta = 0
  var onPointerDownPointerX
  var onPointerDownPointerY
  var onPointerDownLon
  var onPointerDownLat
  var target = new THREE.Vector3()

  export default {
    name: 'LoginPage',
    components: {login},
    data () {
      return {
        loginForm: {
        },
        codeUrl: host + '/captcha/mews?r=' + Math.random()
      }
    },
    mounted: function () {
      this.init()
      this.animate()
    },
    methods: {
      onRefreshCode () {
        console.log('refresh code')
        this.codeUrl = host + '/captcha/mews?r=' + Math.random()
      },
      onLoginClick () {
        console.log('on login')
        this.LoginUser(this.loginForm).then((resp) => {
          console.log('after', resp)
          if (resp.status === 'success') {
            this.$store.commit('SET_STATUS', resp)
            this.$router.push({path: '/'})
          }
        })
      },
      ...mapActions({LoginUser: 'Login'}),
      init () {
        var container, mesh
        container = this.$refs.mybox
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100)
        scene = new THREE.Scene()
        textureplaceholder = document.createElement('canvas')
        textureplaceholder.width = 128
        textureplaceholder.height = 128
        var context = textureplaceholder.getContext('2d')
        context.fillStyle = 'rgb( 200, 200, 200 )'
        context.fillRect(0, 0, textureplaceholder.width, textureplaceholder.height)
        var materials = [
          this.loadTexture(px), // right
          this.loadTexture(nx), // left
          this.loadTexture(py), // top
          this.loadTexture(ny), // bottom
          this.loadTexture(pz), // back
          this.loadTexture(nz)  // front
        ]
        var geometry = new THREE.BoxGeometry(300, 300, 300, 7, 7, 7)
        geometry.scale(-1, 1, 1)
        mesh = new THREE.Mesh(geometry, materials)
        scene.add(mesh)
        for (var i = 0, l = mesh.geometry.vertices.length; i < l; i++) {
          var vertex = mesh.geometry.vertices[ i ]
          vertex.normalize()
          vertex.multiplyScalar(550)
        }
//        renderer = new THREE.CanvasRenderer()
        renderer = new THREE.WebGLRenderer({antialias: true})
//        console.log(renderer)
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)
        container.appendChild(renderer.domElement)
        document.addEventListener('mousedown', this.onDocumentMouseDown, false)
        document.addEventListener('mousemove', this.onDocumentMouseMove, false)
        document.addEventListener('mouseup', this.onDocumentMouseUp, false)
        document.addEventListener('mousewheel', this.onDocumentMouseWheel, false)
        document.addEventListener('touchstart', this.onDocumentTouchStart, false)
        document.addEventListener('touchmove', this.onDocumentTouchMove, false)
        //
        window.addEventListener('resize', this.onWindowResize, false)
      },
      onWindowResize () {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      },
      loadTexture (path) {
        var texture = new THREE.Texture(textureplaceholder)
        var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 })
        var image = new Image()
        image.onload = function () {
          texture.image = this
          texture.needsUpdate = true
        }
        image.src = path
        return material
      },
      onDocumentMouseDown (event) {
//        event.preventDefault()
        isUserInteracting = true
        onPointerDownPointerX = event.clientX
        onPointerDownPointerY = event.clientY
        onPointerDownLon = lon
        onPointerDownLat = lat
      },
      onDocumentMouseMove (event) {
        if (isUserInteracting === true) {
          lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon
          lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat
        }
      },
      onDocumentMouseUp (event) {
        isUserInteracting = false
      },
      onDocumentMouseWheel (event) {
        // WebKit
        var fov = camera.fov + event.deltaY * 0.05
        camera.fov = THREE.Math.clamp(fov, 10, 75)
        camera.updateProjectionMatrix()
      },
      onDocumentTouchStart (event) {
        if (event.touches.length === 1) {
          event.preventDefault()
          onPointerDownPointerX = event.touches[ 0 ].pageX
          onPointerDownPointerY = event.touches[ 0 ].pageY
          onPointerDownLon = lon
          onPointerDownLat = lat
        }
      },
      onDocumentTouchMove (event) {
        if (event.touches.length === 1) {
          event.preventDefault()
          lon = (onPointerDownPointerX - event.touches[0].pageX) * 0.1 + onPointerDownLon
          lat = (event.touches[0].pageY - onPointerDownPointerY) * 0.1 + onPointerDownLat
        }
      },
      animate () {
        requestAnimationFrame(this.animate)
        this.update()
      },
      update () {
        if (isUserInteracting === false) {
          lon += 0.1
        }
        lat = Math.max(-85, Math.min(85, lat))
        phi = THREE.Math.degToRad(90 - lat)
        theta = THREE.Math.degToRad(lon)
        target.x = 500 * Math.sin(phi) * Math.cos(theta)
        target.y = 500 * Math.cos(phi)
        target.z = 500 * Math.sin(phi) * Math.sin(theta)
        camera.lookAt(target)
        renderer.render(scene, camera)
      }
    }
  }
</script>

<style scoped>

</style>
