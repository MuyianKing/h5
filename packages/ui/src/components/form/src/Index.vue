<script setup>
import { Form as VanForm } from 'vant'
import { computed, provide, ref } from 'vue'

const props = defineProps({
  model: {
    type: Object,
    default: null,
  },
  labelWidth: {
    type: String,
    default: '70px',
  },
})

const _model = computed(() => props.model)
provide('model', _model)

const formRef = ref(null)
defineExpose({
  async validate() {
    try {
      await formRef.value.validate()
      return true
    } catch {
      return false
    }
  },
  resetValidation: () => formRef.value.resetValidation(),
})
</script>

<template>
  <van-form ref="formRef" :style="{ '--label-width': labelWidth }">
    <slot />
  </van-form>
</template>
