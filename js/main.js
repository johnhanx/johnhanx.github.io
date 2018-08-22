(function () {
  require.config({
    baseUrl: './js/',
    paths: {
      'typing': 'typing'
    }
  })

  require(['typing'], function (typing) {
    var banners = [
      {
        pinyin: 'jishi taoshang lajidai , yebuhuiyouren , juede lajitong henganjing',
        value: '即使 套上 垃圾袋，也不會有人，覺得 垃圾桶 很乾淨',
        delete: {}
      },
      {
        pinyin: 'xianyoufengjing , gailefangzi , caiyouchuanghu',
        value: '先有風景 ， 蓋了房子 ， 才有窗戶',
        delete: {}
      },
      {
        pinyin: 'women shi miaozhen , dan renmen douzhidingzhe fenzhen he shizhen kan',
        value: '我們 是 秒針 ， 但 人們 都只盯著 分針 和 時針 看',
        delete: {}
      },
      {
        pinyin: 'guantou gaosu yu , zheli henanquan',
        value: '罐頭 告訴 魚 ， 這裏 很安全',
        delete: {}
      },
      {
        pinyin: 'tongshi hanwo heshui , wo wudongyuzhong',
        value: '不要 因为 一点错 ， 就 忘记 对方 所有的 好',
        delete: {}
      },
      {
        pinyin: 'luoji fangqi luoji , xiangfa chengquan xiangfa',
        value: '逻辑 放弃 逻辑 ， 想法 成全 想法',
        delete: {}
      },
    ]

    function copy(arr) {
      arr = arr ? arr : []
      var rst = []
      for (var i = 0; i < arr.length; i++) {
        rst.push(arr[i])
      }
      return rst
    }

    function print () {
      document.getElementById('context').innerText = ''
      var text = document.getElementById('container').innerText.split('') || []
      var interval = setInterval(function () {
        document.querySelector('.cursor').classList.remove('blink')
        text.pop()
        var tempArr = copy(text)
        document.getElementById('container').innerText = tempArr.join('')
        if (document.getElementById('container').innerText.trim() == '') {
          clearInterval(interval)
          document.querySelector('.cursor').classList.add('blink')
          setTimeout(function () {
            _print()
          }, 1000);
        }
      }, 100)
    }

    function _print () {
      var index = Math.floor((Math.random() * banners.length))

      typing.init({
        target: '#container',
        output: '#context',
        context: banners[index]
      })
      console.log(banners[index].value.replace(/ /g, ''))
      document.querySelector('.cursor').classList.remove('blink')
      typing.start(function () {
        document.querySelector('.cursor').classList.add('blink')
        setTimeout(print, 4000)
      })
    }
    print()
    
  })
})()
