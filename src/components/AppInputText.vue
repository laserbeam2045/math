<template>
  <input
    ref="inputRef"
    class="app-input-text"
    :class="{ error }"
    :type="type"
    :value="modelValue"
    :spellcheck="spellcheck"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    @input="handleInput"
  >
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
    error: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    spellcheck: {
      type: Boolean,
      required: false,
      default: false,
    },
    autocomplete: {
      type: String,
      required: false,
      default: 'on',
    },
  },
  emits: [
    'update:modelValue',
  ],
  setup(_, { emit }) {
    const handleInput = (e: Event) => {
      const element = e.target as HTMLInputElement
      emit('update:modelValue', element.value)
    }

    const inputRef = ref<HTMLInputElement | null>(null)

    const focus = () => (inputRef.value as HTMLInputElement).focus()

    return { inputRef, handleInput, focus }
  },
})
</script>

<style lang="scss" scoped>
.app-input-text {
  box-sizing: border-box;
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border-radius: 4px;
  transition: all 0.1s;

  &:disabled {
    color: gray;
  }

  &::placeholder {
    color: gray;
  }

  &:focus {
    outline: none;

    &::placeholder {
      color: transparent;
      transition: all 0.2s;
    }
  }

  &:not(.error) {
    background: white;
    border: 1px solid #C7CAD8;

    &:focus {
      border: 1px solid #9CAAE8;
    }
  }

  &.error {
    background: #FFEFF5 0% 0% no-repeat padding-box;
    border: 1px solid #E20000;

    &:focus {
      background: white;
    }
  }
}
</style>
