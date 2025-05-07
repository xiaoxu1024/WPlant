<template>
  <div class="plant_view">
    <ModelBar class="bar_view" :curModel="curModel" @select="onSelect" />
    <div class="canvas_view">
      <div v-if="isLoading" class="loading"></div>
    </div>
  </div>
</template>

<script>
import ModelBar from '@/components/modelBar.vue'
import RenderMode from '@/core/renderModel.js'
export default {
  name: 'plantView',
  components: {
    ModelBar
  },
  data() {
    return {
      model: null,
      curModel: null,
      isLoading: false,
    }
  },
  mounted() {
    this.model = new RenderMode('.canvas_view')
  },
  methods: {
    async onSelect(item) {
      if (this.curModel && this.curModel.id === item.id) return
      this.isLoading = true
      await this.model.init(item.modelPath)
      this.isLoading = false
      this.curModel = item
    }
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
  display: flex;
  gap: 20px;
}

.canvas_view {
  flex: 1;
  width: 0;
  position: relative;
}

.loading {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: #000;

  animation: ball-scale infinite linear 0.75s;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}

@keyframes ball-scale {
  0% {
    transform: translate(-50%, -50%) scale(0.1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}
</style>
