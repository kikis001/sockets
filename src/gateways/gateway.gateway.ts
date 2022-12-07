import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// 80 número del puerto elegido
// @WebSocketGateway(80, {
//   cors: {
//     origin: '*'
//   },
// })
// export class GatewayGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
// @SubscribeMessage('message')
// handleMessage(client: any, payload: any): string {
//   return 'Hello world!';
// }
// }

// 80 -> puerto que escucha las conexiones
@WebSocketGateway(80, {
  cors: {
    // origenes que solo se podrán conectar los sockets
    // origin: ['http:localhost:3000'],
    // cualquier mundo
    origin: '*',
  },
})

/*
ciclos de vida (métodos)
OnGatewayInit -> se ejecuta cuando se inicia
OnGateWayConnection -> cuando un cliente se conecta
OnGateWayDisconnect -> cuando un cliente se desconecta
*/
export class GatewayGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  // método que se ejecuta cuando inicia el servicio
  afterInit(server: any) {
    console.log('Init websocket');
  }

  handleConnection(client: any, ...args: any[]) {
    // throw new Error('Method not implemented.');
    console.log('Hola alguien se conecto al socket');
  }

  handleDisconnect(client: any) {
    console.log('Se desconecto');
    throw new Error('Method not implemented.');
  }

  // eventos
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: { room: string; message: string }) {
    const { room, message } = payload;
    console.log(payload);
    this.server.to(`room_${room}`).emit('new_message', message);
  }
}
