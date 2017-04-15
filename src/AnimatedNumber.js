module.exports = {
  name: 'AnimatedNumber',
  functional: true,
  props: {
    number: Number,
    formatter: {
      type: Function,
      required: false,
      default: function () {
        return function (x) {
          return x
        }
      }
    }
  },
  data: function () {
    return {
      display: 0,
      interval: false
    }
  },
  render (h, context) {
    return h('span', context.props.formatter(context.data.display))
  },
  watch: {
    number: function (val, old) {
      const $vm = this
      $vm.interval && clearInterval($vm.interval)

      let speed = 10
      if (val < old) {
        speed = 4
      }

      $vm.interval = setInterval(function () {
        if ($vm.display !== $vm.number) {
          const diff = ($vm.number - $vm.display) / speed
          $vm.display += diff >= 0 ? Math.ceil(diff) : Math.floor(diff)
        } else {
          clearInterval($vm.interval)
        }
      }, 20)
    }
  }
}
