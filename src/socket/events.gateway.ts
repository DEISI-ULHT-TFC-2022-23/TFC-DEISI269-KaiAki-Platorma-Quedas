import { Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('Socket.io server initialized');
  }

  
}

@Injectable()
export class EventsService {
  constructor(private eventsGateway: EventsGateway) {}
  
  emit(event: string, data: any) {
    console.log(`Emitting event '${event}' with data:`, data);

    // Try to stringify data
    try {
        JSON.stringify(data);
    } catch (error) {
        console.error('Failed to serialize data:', error);
    }
    this.eventsGateway.server.emit(event, data);
  }

  afterInit(server: Server) {
    console.log('Socket.io server initialized');
  
    server.on('error', (error) => {
      console.log('Socket error:', error);
    });
  }
}