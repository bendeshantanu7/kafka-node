const {Kafka} = require('kafkajs')

async function init() {
    const kafka = new Kafka({
        "clientId": "myKafkaApp",
        "brokers": ["192.168.1.3:9092"]
    })

    const consumer = kafka.consumer({groupId: "secondgrp"})

    await consumer.connect()

    await consumer.subscribe({
        topics: ["Users"],
        fromBeginning: true,
        
    })
    console.log('Subscribed')

    await consumer.run({
        "eachMessage": async result => {
            console.log(`Received ${result.message.value} from partition ${result.partition}`)
        }
    })
}

init()