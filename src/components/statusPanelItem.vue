<template>
  <div class="status_panel_item">
    <div>{{ title }}</div>
    <div class="progress_bar">
      <div class="progress" :style="{ width: value }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'statusPanelItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: '0%'
    }
  }
}
</script>

<style scoped lang="scss">
.status_panel_item {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.progress_bar {
  height: 20px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;

  .progress {
    height: 100%;
    background: linear-gradient(90deg, #81c784, #4caf50);
    transition: width 0.5s ease;
  }
}
</style>