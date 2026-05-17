import {Queue} from 'bullmq'
import redisConnection from '../config/redis.js'

const checkQueue= new Queue("check-queue",{
    connection:redisConnection
})

export default checkQueue