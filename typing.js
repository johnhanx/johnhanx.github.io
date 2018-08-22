define(function() {

  var context, pinyin, value, valueDel, pinyinDel, 
      output, target, _isTyping, _isDeleting, _isStop, _queue;
  
  function init (config) {
    config = config ? config : {}
    context = config.context
    pinyin = context.pinyin
    value = context.value
    valueDel = context.delete.value || {}
    pinyinDel = context.delete.pinyin || {}
    output = document.querySelector(config.output)
    target = document.querySelector(config.target)
    _isTyping = false
    _isDeleting = false
    _isStop = true
    _queue = []
  }

  /**
   * 初始化指令队列，开始效果
   * @function start
   * @argument callback
   * @memberOf Typing
   */
  function start (callback) {
    callback = callback ? callback : function () {}
    _isStop = false
    const pinyinList = pinyin.split(' ')
    const values = value.split(' ')
    var list = pinyinList.map(function (item, i) { return { index: i, pinyin: item } })
    for (var i = 0; i < list.length; i++) {
      var item = list[i]
      _queue.push({
        command: 'print',
        val: values[item.index],
        pinyin: item.pinyin,
        delay: Math.random() * 200 + 100
      })
      if (pinyinDel[item.index]) {
        _queue.push({
          command: 'delete',
          index: pinyinDel[item.index],
          val: pinyinDel.value,
          delay: Math.random() * 100 + 50
        })
      }
    }
    _execQueue(callback)
  }

  /**
   * 执行队列
   * @memberof Typing
   */
  function _execQueue (callback) {
    if (_queue.length === 0) {
      _isTyping = false
      _isDeleting = false
      _isStop = true
      return callback()
    }
    const exec = _queue.shift()
    switch (exec.command) {
      case 'print':
        _print(exec, callback)
        break
      case 'delete':
        _delete(exec, callback)
        break
    }
  }

  function _print (exec, callback) {
    exec = exec ? exec : {}
    if (_isStop) {
      callback()
      return
    }
    if (_isDeleting || _isTyping) {
      return setTimeout(function () {
        _print(exec, callback)
      }, 100)
    }
    _isTyping = true
    const value = exec.val
    const pinyin = exec.pinyin
    const delay = exec.delay
    const old = target.innerText
    _printWord(pinyin, delay, function () {
      target.innerText = old + value
      output.innerText = ''
      _isTyping = false
      _execQueue(callback)
    })
  }

  function _printWord (val, delay, callback) {
    const arr = val.split('')
    const interval = setInterval(function () {
      if (interval && arr.length > 0) {
        output.appendChild(document.createTextNode(arr.shift()))
      } else if (interval) {
        clearInterval(interval)
        callback()
      }
    }, delay)
  }

  return {
    init: init,
    start: start
  }
})
