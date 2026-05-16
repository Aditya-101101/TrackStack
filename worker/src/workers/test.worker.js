import { Worker } from 'bullmq';
import redisConnection from '../config/redis.js';

const testworker = new Worker(
  'test-queue',
  async (job) => {
    // Will print { foo: 'bar'} for the first job
    // and { qux: 'baz' } for the second.
    console.log('job-received',job.data);
  },
  { connection:redisConnection },
);

testworker.on('completed', job => {
  console.log(`${job.id} has completed!`);
});

testworker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});

export default testworker