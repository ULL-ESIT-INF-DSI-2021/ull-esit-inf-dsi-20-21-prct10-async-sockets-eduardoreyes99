import * as net from 'net';
import {Nota} from './nota';
import {ResponseType, RequestType} from './types';
import {GestorNota} from './gestorNota';
import * as chalk from 'chalk';
import {MessageEventEmitterServer} from './eventEmitterServer';

const gestor = new GestorNota();

const server = net.createServer({allowHalfOpen: true}, (connection) => {
  console.log(chalk.green('Cliente conectado'));

  const emitter = new MessageEventEmitterServer(connection);

  emitter.on('request', (data) => {
    console.log(chalk.green('Petición recibida desde el cliente'));
    const request: RequestType = data;
    let status: boolean = false;
    switch (request.type) {
      case 'add':
        const nota: Nota = new Nota(request.title as string,
          request.body as string, request.color as string);

        status = gestor.addNota(nota, request.user);
        const respuesta1: ResponseType = {
          type: 'add',
          success: status,
        };
        connection.write(`${JSON.stringify(respuesta1)}\n`, (err) => {
          if (err) {
            console.error(err);
          } else {
            connection.end();
          }
        });
        break;
      case 'remove':
        status = gestor.removeNota(request.user, request.title as string);
        const respuesta2: ResponseType = {
          type: 'remove',
          success: status,
        };
        connection.write(`${JSON.stringify(respuesta2)}\n`, (err) => {
          if (err) {
            console.error(err);
          } else {
            connection.end();
          }
        });
        break;
      case 'list':
        status = gestor.listNotas(request.user);
        const respuesta3: ResponseType = {
          type: 'list',
          success: status,
        };
        connection.write(`${JSON.stringify(respuesta3)}\n`, (err) => {
          if (err) {
            console.error(err);
          } else {
            connection.end();
          }
        });
        break;
      case 'read':
        status = gestor.readNota(request.user, request.title as string);
        const respuesta4: ResponseType = {
          type: 'read',
          success: status,
        };
        connection.write(`${JSON.stringify(respuesta4)}\n`, (err) => {
          if (err) {
            console.error(err);
          } else {
            connection.end();
          }
        });
        break;
      case 'edit':
        status = gestor.editNota(request.user, request.title as string,
          request.body as string, request.color as string);
        const respuesta5: ResponseType = {
          type: 'edit',
          success: status,
        };
        connection.write(`${JSON.stringify(respuesta5)}\n`, (err) => {
          if (err) {
            console.error(err);
          } else {
            connection.end();
          }
        });
        break;
    }
  });

  connection.on('close', () => {
    console.log('Se ha desconectado un cliente');
  });
});

server.listen(60300, () => {
  console.log('Esperando clientes');
});
