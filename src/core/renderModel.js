import * as THREE from 'three' //导入整个 three.js核心库
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader' 
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class RenderModel {
  constructor(selector) {
    this.container = document.querySelector(selector)
    this.camera = null
    this.scene = null
    this.renderer = null
    this.controls = null
    this.model = null
    this.fileLoaderMap = {
			'glb': new GLTFLoader(),
			'fbx': new FBXLoader(),
			'gltf': new GLTFLoader(),
			'obj': new OBJLoader(),
      'stl': new STLLoader(),
    }
  }

  init(filePath) {
    // eslint-disable-next-line
    return new Promise(async resolve => {
      // 初始化场景
      this.initScene()
      // 初始化相机
      this.initCamera()
      // 初始化渲染器
      this.initRender()
      // 初始化控制器
      this.initControls()
      // 初始化模型
      const load = await this.setModel({
        filePath: filePath,
        scale: 1,
      })
      window.addEventListener("resize", this.onWindowResize.bind(this))
      // 场景渲染
      this.sceneAnimation()
      resolve(load)
    })
  }

  initScene() {
    this.scene = new THREE.Scene()
    // this.scene.background = new THREE.Color(0xa0a0a0)
    // 添加环境光（柔和全局光）
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 颜色, 强度
    this.scene.add(ambientLight);

    // 添加平行光（模拟太阳光）
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5); // 调整光源位置
    this.scene.add(directionalLight);
  }

  initCamera() {
    const { clientHeight, clientWidth } = this.container
		this.camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 0.25, 100)
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false; // 禁用鼠标滚轮缩放
    this.controls.enableDamping = true; // 启用阻尼效果（更平滑的交互）
    this.controls.dampingFactor = 0.25; // 阻尼系数
  }

  initRender() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }) 
    //设置屏幕像素比
		this.renderer.setPixelRatio(window.devicePixelRatio)
		//渲染的尺寸大小
		const { clientHeight, clientWidth } = this.container
		this.renderer.setSize(clientWidth, clientHeight)
		//色调映射
		this.renderer.toneMapping = THREE.ACESFilmicToneMapping
		//曝光
		this.renderer.toneMappingExposure = 3
		this.renderer.shadowMap.enabled = true
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
		this.container.appendChild(this.renderer.domElement)
  }

  sceneAnimation() {
    this.renderer.setAnimationLoop(this.render.bind(this))
  }

	render(){
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
	}

  setModel({ filePath, scale }) {
    return new Promise((resolve) => {
      const fileType = filePath?.match(/\.([a-zA-Z0-9]+)$/)?.[1]
      const loader = this.fileLoaderMap[fileType]
      loader.load(filePath, (result) => {
        switch (fileType) {
					case 'glb':
						this.model = result.scene		
						break;
					case 'fbx':
						this.model = result
						break;
					case 'gltf':
						this.model = result.scene
						break;
					case 'obj':
						this.model = result
						break;
          case 'stl':
            // eslint-disable-next-line
						const material = new THREE.MeshStandardMaterial()
            // eslint-disable-next-line
						const mesh = new THREE.Mesh(result, material)
						this.model = mesh
						break;
					default:
						break;
				}

        // 设置相机位置
				this.camera.position.set(0, 0, 2)
				// 设置相机坐标系
				this.camera.lookAt(0, 0, 0)
        // 将模型添加到场景中去
        this.model.scale.set(scale, scale, scale)
				this.scene.add(this.model)
				resolve(true)
      })
    })
  }

  onWindowResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
  }
}

export default RenderModel
