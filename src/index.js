const net = require('net')
const readline = require('readline')
const EventEmitter = require('events')

module.exports = class Soupybot extends EventEmitter {
  static connect (options) {
    return new Soupybot(options)
  }

  constructor (options) {
    super()
    if (options) {
      this.connect(options)
    }
  }

  registerEvents (connection) {
    const rl = readline.createInterface({
      input: connection
    })
    rl.on('line', (line) => {
      this.emit('raw', line)
    })
    return rl
  }

  connect (options) {
    this.connection = net.createConnection(options)
    this.stream = this.registerEvents(this.connection)
    return this
  }

  end () {
    if (this.connection) this.connection.end()
  }
}
