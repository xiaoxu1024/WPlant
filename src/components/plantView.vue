<template>
  <div class="plant_view"></div>
</template>

<script>
import RenderMode from '@/core/renderModel.js'
export default {
  name: 'plantView',
  data() {
    return {
    }
  },
  async mounted() {
    const model = new RenderMode('.plant_view')
    // filePath: '/models/crab.glb',
    const load = await model.init('/models/bunny.glb')
    console.log('======model', model, load)
  }
}
</script>

<style scoped lang="scss">
.plant_view {
  flex: 1;
  background: rgba(255,255,255,0.2);
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
