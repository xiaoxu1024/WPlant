<template>
  <div class="status_panel">
    <h2 class="status_panel_header">植物状态 🌱</h2>
    <div class="status_panel_content">
      <StatusPanelItem
        v-for="item in statusList"
        :title="item.title"
        :value="item.value"
        :key="item.type"
      />
    </div>
    <div class="status_panel_footer">
      <button class="btn">浇水 💦</button>
      <button class="btn">施肥 🌱</button>
    </div>
  </div>
</template>

<script>
import StatusPanelItem from './statusPanelItem.vue'
import { STATUS_LIST } from '@/lib/constants'

export default {
  name: 'statusPanel',
  components: {
    StatusPanelItem,
  },
  data() {
    return {
      statusList: STATUS_LIST.map((item) => {
        item.value = '50%'
        return item
      }),
    }
  }
}
</script>

<style scoped lang="scss">
.status_panel {
  width: 300px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.status_panel_content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  max-height: calc(100vh - 215px);
  min-height: calc(540px - 215px);
}

.status_panel_footer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 20px;

  .btn {
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: #81c784;
    color: white;
    cursor: pointer;
    transition: transform 0.2s, background 0.3s;

    &:hover {
      transform: scale(1.05);
      background: #4caf50;
    }
  }
}
</style>