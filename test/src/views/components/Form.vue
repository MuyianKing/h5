<script setup>
import { reactive, ref } from 'vue'

const options = [
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 2,
  },
]

const form = reactive({
  name: '',
  age: 1,
  sex: '',
})

const form_ref = ref()
function submit() {
  form_ref.value.validate((valid) => {
    console.log(valid)
  })
}
</script>

<template>
  <hl-main-body title="表单">
    <div class="p-4">
      <hl-form ref="form_ref" :model="form">
        <hl-form-item label="姓名" prop="name" required>
          <hl-input v-model="form.name" />
        </hl-form-item>
        <hl-form-item label="年龄" prop="age" id-card>
          <hl-input v-model="form.age" />
        </hl-form-item>
        <hl-form-item label="性别">
          <hl-radio v-model="form.sex" :options />
        </hl-form-item>
      </hl-form>

      <hl-button class="w-full mt-4" @click="submit">
        提交
      </hl-button>
    </div>
  </hl-main-body>
</template>
