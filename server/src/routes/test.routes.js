import express from 'express'
import testQueue from '../queues/test.queue.js'
import redis from '../config/redis.js'

const router=express.Router()

router.get('/test-redis',async(req,res)=>{
    await redis.set("pulse:test","hello redis")
    const value= await redis.get("pulse:test")

    res.json({redis:value})
})

router.post('/test-job', async(req,res)=>{
    await testQueue.add('test-job',{message:"Hello from API",createdAt:new Date().toLocaleTimeString()})
    res.json({message:"Job added"})
})

export default router