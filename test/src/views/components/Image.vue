<script setup>
</script>

<template>
  <hl-main-body title="图片">
    <div class="p-4">
      <div>
        <div class="type-title">
          基础用法
        </div>
        <hl-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" height="auto" />
      </div>

      <div class="mt-8">
        <div class="type-title">
          填充模式
        </div>
        <div class="flex">
          <div v-for="fit in ['contain', 'fill', 'cover']" :key="fit" class="mr-4">
            <hl-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" :fit />
            <div class="sub-title">
              {{ fit }}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <div class="type-title">
          圆形图片
        </div>
        <div class="flex">
          <div v-for="fit in ['contain', 'fill', 'cover']" :key="fit" class="mr-4">
            <hl-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" :fit round />
            <div class="sub-title">
              {{ fit }}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center text-gray-400 text-lg">
        继承van-image所有属性
      </div>
    </div>
  </hl-main-body>
</template>

<style lang='scss' scoped>
.type-title {
  color: gray;
  margin-bottom: 10px;
}

.sub-title {
  color: gray;
  text-align: center;
}
</style>
