import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: '🏋️ Fitness App API',
      version: '1.0.0',
      status: 'Running',
      endpoints: {
        users: '/users',
        profiles: '/profiles',
        routines: '/routines',
        exercises: '/exercises'
      },
      documentation: 'Check API_ENDPOINTS.md for complete documentation',
      timestamp: new Date().toISOString()
    };
  }
}
