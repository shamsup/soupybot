const expect = require('chai').expect
const net = require('net')

const soupybot = require('../src/')

describe('Soupybot', () => {
  const server = net.createServer((socket) => {
    socket.write('connected\r\n')
  })

  const options = { port: 6697 }

  before((done) => {
    server.listen(options, () => done())
  })

  after((done) => {
    server.close(() => done())
  })

  it('should connect to an unsecured server', (done) => {
    const bot = soupybot.connect(options)
    bot.on('raw', (data) => {
      expect(data).to.equal('connected')
      bot.end()
      done()
    })
  })
})
