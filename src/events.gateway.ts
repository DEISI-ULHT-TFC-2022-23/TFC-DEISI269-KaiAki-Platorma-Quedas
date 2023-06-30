import { WebSocketGateway, WebSocketServer, OnGatewayConnection, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway(3001)  // <-- specify port here
export class EventsGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    handleConnection(client: any, ...args: any[]) {
        console.log('Client connected.');
    }

    @SubscribeMessage('events')
    handleEvent(client: any, data: any): string {
        console.log('Received message: ', data);
        return 'Hello, world!';
    }
}
