const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['192.168.99.100:9092'],
  retry: {
    initialRetryTime: 3000,
    retries: 10
  }
})

async function run() {
  const producer = kafka.producer()
  
  await producer.connect()
  await producer.send({
    topic: 'teste',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  })

  producer.disconnect()
}

run().catch(e => console.error(`[example/consumer] ${e.message}`, e));