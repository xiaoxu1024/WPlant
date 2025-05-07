<template>
  <div class="model_bar">
    <div
      v-for="item in Models"
      class="model_bar_item"
      :class="{ isSelected: curModel && curModel.id === item.id, isMobile: isMobile }"
      :key="item.id"
      @click="onSelect(item)"
    >
      <img :src="item.imageUrl" />
    </div>
  </div>
</template>

<script>
import { Models } from '@/lib/constants'
import basetool from '@/lib/basetool'
export default {
  name: 'modelBar',
  props: {
    curModel: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      Models
    }
  },
  computed: {
    isMobile() {
      return basetool.isMobile()
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
  $size: 217px;
  width: $size;
  min-height: $size;
  border-radius: 20px;
  background: white;
  overflow: hidden;
  vertical-align: text-bottom;
  box-sizing: border-box;

  img {
    width: 100%;
    object-fit: cover;
    vertical-align: middle;
  }

  &.isMobile {
    $size: 60px;
    width: $size;
    min-height: $size;
  }

  &.isSelected {
    box-shadow: 0 12px 20px -6px #5252521f;
  }
}
</style>