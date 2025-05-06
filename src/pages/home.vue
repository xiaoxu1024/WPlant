<template>
  <div class="home">
    <PlantView />
    <StatusPanel />
  </div>
</template>

<script>
import PlantView from '@/components/plantView.vue'
import StatusPanel from '@/components/statusPanel.vue'

export default {
  name: 'homePage',
  components: {
    PlantView,
    StatusPanel,
  }
}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  background: #c0d8e0;
  min-height: 540px;
  transition: background 1s ease;
  padding: 20px;
  gap: 30px;
  box-sizing: border-box;
  height: 100vh;
}
</style>
