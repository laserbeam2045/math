<template>
  <button
    class="app-button"
    v-on="listeners"
  >
    <div class="container">
      <slot>Submit</slot>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup(_, { attrs }) {
    const listeners = attrs.listeners ?? {}

    return { listeners }
  },
})
</script>

<style lang="scss" scoped>
.app-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px 16px;
  overflow: hidden;
  font-size: 1rem;
  font-weight: inherit;
  line-height: 1rem;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  border: 1px solid currentColor;
  border-radius: 500px;
  outline: none;
  // transition: all 0.3s;
  -webkit-tap-highlight-color: transparent;

  // 通常時は白ベースのボタンになります
  &:not(.-fill) {
    background: white;
  }
  &:not(.-fill) > .container {
    color: currentColor;
  }

  // -fillクラスを付与すると色が反転します
  &.-fill {
    color: currentColor;
    background: currentColor;
  }
  &.-fill > .container {
    color: white;
  }

  // 色のバリアント
  &.-pink {
    color: #FB436F;
  }

  &.-night {
    color: #446479;
  }

  &.-bold {
    font-weight: bold;
    border-width: 2px;
  }
}
</style>
