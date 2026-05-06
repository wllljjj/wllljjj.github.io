import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// ================= 场景 =================
const scene = new THREE.Scene()
scene.background = null

// ================= 相机 =================
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(2, 2, 4)

// ================= 渲染器 =================
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas3d'),
  antialias: true,
  alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 0)

// ================= 光 =================
const light = new THREE.DirectionalLight(0xffffff, 1.5)
light.position.set(5, 5, 5)
scene.add(light)

const ambient = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambient)

// ================= 控制器 =================
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// ================= 模型相关 =================
const loader = new GLTFLoader()

const models = [
  'model/girl3.glb',
  'model/girl4.glb',
  'model/girl8.glb',
  'model/girl9.glb',
  'model/girl10.glb',
  'model/girl11.glb',
  'model/girl12.glb',
  'model/girl13.glb',
  'model/girl5.glb',
]

const names = [
  '性感刺客',
  '初恋女友',
  '火辣少妇',
  '丝袜忍者',
  '不知火舞',
  '性感小三',
  '反差人妻',
  '家教老师',
  '东北雨姐'
]

let currentIndex = 0
let currentModel = null

function loadModel(index) {

  // 删除旧模型
  if (currentModel) {
    scene.remove(currentModel)
    currentModel.traverse((child) => {
      if (child.isMesh) {
        child.geometry.dispose()
        if (child.material.map) child.material.map.dispose()
        child.material.dispose()
      }
    })
  }

  loader.load(models[index], (gltf) => {
    currentModel = gltf.scene
    scene.add(currentModel)
  })
  
  document.getElementById('name').innerHTML = names[currentIndex];
  
  
}

// 初始加载
loadModel(currentIndex)

// ================= 按钮控制 =================
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')
let canClick = true;

leftBtn.onclick = () => {
  if (!canClick) return;   // ❌ 冷却中直接无效
  canClick = false;

  currentIndex--;
  if (currentIndex < 0) currentIndex = models.length - 1;

  loadModel(currentIndex);

  setTimeout(() => {
    canClick = true;       // ⭐ 0.5秒后解锁
  }, 500);
};

rightBtn.onclick = () => {
  if (!canClick) return;
  canClick = false;

  currentIndex++;
  if (currentIndex >= models.length) currentIndex = 0;

  loadModel(currentIndex);

  setTimeout(() => {
    canClick = true;
  }, 500);
};

// ================= 渲染循环 =================
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
animate()

// ================= 自适应 =================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// ================= 弹窗 =================
window.addEventListener('load', () => {
  const popup = document.getElementById('popup')

  setTimeout(() => {
    popup.classList.add('hide')

    setTimeout(() => {
      popup.style.display = 'none'
    }, 500)

  }, 500)
})