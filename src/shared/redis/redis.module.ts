import { Module } from '@nestjs/common';
import { RedisClientOptions, createClient } from 'redis';

// @Module({
//   imports: [
//     {
//       provide: 'REDIS_CLIENT',
//       async useFactory() {
//         const client = createClient({
//           socket: {
//             host: '127.0.0.1',
//             port: 6379,
//           },
//         });
//         await client.connect();
//         return client;
//       },
//     },
//   ],
// })
// export class RedisModule {}
