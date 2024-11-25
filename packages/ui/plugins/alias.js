export function HlUIAlias() {
  return {
    name: 'my-plugin',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('src/style.js')) {
        return
      }

      return code.replace(/@hl\/theme-chalk/g, '@hl/h5/theme-chalk')
    },
  }
}
