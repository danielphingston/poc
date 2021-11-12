const mqtt = require("mqtt");
var client  = mqtt.connect('mqtt://localhost:1883')

client.on('connect', function () {
  client.subscribe('mqtt-test', function (err) {
    if (!err) {
      client.publish('mqtt-test', 'Hello mqtt2')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  // client.end()
})