import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from'three/examples/jsm/geometries/TextGeometry.js'


document.addEventListener('DOMContentLoaded', () => {
   initApp()
})

const initApp = () => {
   const canvas = document.querySelector('.webgl')

   const textureLoader = new THREE.TextureLoader
   const matcapTexture = textureLoader.load('../matcaps/1.png')

   /**
    * Scene
    */
   const Scene = new THREE.Scene()

   const fontLoader = new FontLoader()
  fontLoader.load(
   '../node_modules/three/examples/fonts/helvetiker_regular.typeface.json',
   (font) => {
      const textGeometry = new TextGeometry('Ajibade Abdulmatin \nFrontend Developer', {
         font: font,
         size: 0.5,
         height: 0.2,
         curveSegments: 5,
         bevelEnabled:true,
         bevelThickness: 0.03,
         bevelSize: 0.02,
         bevelOffset: 0,
         bevelSegments: 4
      })

      
      textGeometry.center()
      const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture})
      const text = new THREE.Mesh(textGeometry, material)
      Scene.add(text)

      const donutGeometry = new THREE.TorusGeometry(0.3,0.2,20,45)

      for (let index = 0; index < 150; index++) {
         const donut = new THREE.Mesh(donutGeometry, material)

         donut.position.x = (Math.random() - 0.5) * 10
         donut.position.y = (Math.random() - 0.5) * 10
         donut.position.z = (Math.random() - 0.5) * 10

         donut.rotation.x = Math.random() * Math.PI
         donut.rotation.y = Math.random() * Math.PI

         const scale = Math.random()
         donut.scale.set(scale, scale, scale)

         Scene.add(donut)
         
      }

   }
  )

   /**
    * Size
    */
   const Sizes = {
      width: window.innerWidth,
      height: window.innerHeight
   }

   /**
    * Camera
    */
   const camera = new THREE.PerspectiveCamera(75, Sizes.width / Sizes.height)
   camera.position.z = 7;
   Scene.add(camera)

   /**
    * Control
    */
   const controls = new OrbitControls(camera, canvas)
   controls.enableDamping = true

   // updates the sizes
   window.addEventListener('resize', () => {
      Sizes.width = window.innerWidth
      Sizes.height = window.innerHeight

      // updates camera
      camera.aspect = Sizes.width / Sizes.height
      camera.updateProjectionMatrix()

      // updates renderer
      renderer.setSize(Sizes.width, Sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
   })

   /**
    * Renderer
    */
   const renderer = new THREE.WebGLRenderer({
      canvas
   })

    /**
    * Animation
    */

    const tick = () => {

      // update camera
      controls.update()

      //Render
      renderer.render(Scene, camera)

      window.requestAnimationFrame(tick)
   }
   tick()

   renderer.setSize(Sizes.width, Sizes.height)
   renderer.render(Scene, camera)

}