import {Queue} from 'bullmq'
import redisConnection from '../config/redis.js'

const checkQueue= new Queue("check-queue",{
    connection:redisConnection,
    concurreny:20
})

export default checkQueue