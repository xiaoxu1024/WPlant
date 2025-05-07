<template>
  <div class="model_bar">
    <div v-for="item in Models" class="model_bar_item" :key="item.id" @click="onSelect(item)">
      <img :src="item.imageUrl" />
    </div>
  </div>
</template>

<script>
import { Models } from '@/lib/constants'
export default {
  name: 'modelBar',
  data() {
    return {
      Models
    }
  },
  methods: {
    onSelect(item) {
      this.$emit('select', item)
    }
  }
}
</script>

<style scoped lang="scss">
.model_bar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
}

.model_bar_item {
  border-radius: 20px;
  background: white;
  overflow: hidden;
  vertical-align: text-bottom;
  box-sizing: border-box;
  min-height: 217px;

  img {
    width: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
}
</style>