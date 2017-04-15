function identity (x) {
  return x
}

module.exports = {
  name: 'AnimatedNumber',
  props: {
    number: Number,
    formatter: {
      type: Function,
      required: false,
      default: function () {
        return identity
      }
    }
  },
  data: function () {
    return {
      display: this.number,
      interval: false
    }
  },
  render: function (h) {
    return h('span', this.formatter(this.display))
  },
  watch: {
    number: function (val, old) {
      const $vm = this
      $vm.interval && clearInterval($vm.interval)

      $vm.interval = setInterval(function () {
        if ($vm.display !== $vm.number) {
          const diff = ($vm.number - $vm.display) / 10
          $vm.display += diff >= 0 ? Math.ceil(diff) : Math.floor(diff)
        } else {
          clearInterval($vm.interval)
        }
      }, 20)
    }
  }
}
