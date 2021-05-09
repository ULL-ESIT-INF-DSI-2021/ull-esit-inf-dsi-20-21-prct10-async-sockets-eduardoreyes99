# Práctica 10. Cliente y servidor para una aplicación de procesamiento de notas de texto

Para el desarrollo de esta práctica se utilizará el código implementado para la Práctica 8 y se añadirán nuevas funcionalidades de cliente y servidor a la aplicación de procesamiento de notas de texto. [Práctica 8](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-eduardoreyes99.git)

### Types

Para el desarrollo de esta práctica he decidido definir únicamente los dos tipos de datos que se sugieren en el guión, RequestType y ResponseType:
```
export type RequestType = {
  type: 'add' | 'edit' | 'remove' | 'read' | 'list';
  user: string;
  title?: string;
  body?: string;
  color?: string;
}

export type ResponseType = {
  type: 'add' | 'edit' | 'remove' | 'read' | 'list';
  success: boolean;
  notes?: Nota[];
}

```

### EventEmitter

A continuación he desarrollado dos clases que heredan de EventEmitter, una para el cliente y otra para el servidor, estas clases se utilizarán para poder mantener la comunicación entre el servidor y el cliente. A continuación se puede ver la clase **MessageEventEmitterServer**:

```
export class MessageEventEmitterServer extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();

    let wholeData = '';
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;

      let messageLimit = wholeData.indexOf('\n');
      while (messageLimit !== -1) {
        const message = wholeData.substring(0, messageLimit);
        wholeData = wholeData.substring(messageLimit + 1);
        this.emit('request', JSON.parse(message));
        messageLimit = wholeData.indexOf('\n');
      }
    });
  }
}
```



### Parte Servidor

Para la implementación de la parte del servidor utilizaremos la función **net.createserver**, esta función crea un objeto Server que haremos que nuestro servicio publique en el puerto 60300 utilizando **server.listen**. Para controlar el tipo de comando que se inserta desde el cliente se utilizará un switch que ejecutará la orden correspondiente dependiendo del atributo type del tipo de dato RequestType.

(Código de Server)[https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-eduardoreyes99/blob/main/src/server.ts]

### Parte Cliente

Para la implementación del cliente lo primero que debemos hacer es establecer la conexión con el servidor por el puerto 60300 usando: `const client = connect({port: 60300});` posteriormente crearemos un objeto de la clase messageEmitterClient y utilizaremos un switch para controlar el tipo de comando que se ejecuta:

```
emitter.on('message', (message) => {
  switch (message.type) {
    case 'add':
      if (message.status) {
        console.log(chalk.green('Nota añadida con éxito'));
      } else {
        console.log(chalk.red('La nota no se pudo añadir'));
      }
      break;
    case 'remove':
      if (message.status) {
        console.log(chalk.green('Nota eliminada con éxito'));
      } else {
        console.log(chalk.red('La nota no se pudo eliminar'));
      }
      break;
    case 'edit':
      if (message.status) {
        console.log(chalk.green('Nota modificada con éxito'));
      } else {
        console.log(chalk.red('La nota no se pudo modificar'));
      }
      break;
    case 'list':
      if (message.status) {
        const aux: string[] = message.notas;
        aux.forEach( (elemento) => {
          const notaObj = JSON.parse(elemento);
          console.log(chalk.keyword(notaObj.color)(notaObj.title));
        });
      } else {
        console.log(chalk.red('No se pudieron listar las notas'));
      }
      break;
    case 'read':
      if (message.status) {
        const nota = message.notas[0];
        const notaObj = JSON.parse(nota);
        console.log(chalk.keyword(notaObj.color)(notaObj.title));
        console.log(chalk.keyword(notaObj.color)(notaObj.body));
      } else {
        console.log(chalk.red('No se pudo leer la nota'));
      }
      break;
  }
});
```

Ahora se implementarán los diferentes comandos para llevar a cabo las funcionalidades de la aplicación: add, remove, edit, list y read. La implementación de los comandos es prácticamente idéntica a la realizada en la práctica 8, la mayor diferencia es que se tiene que utilizar la función JSON.stringify para mostrar los resultados por consola. Muestro un ejemplo del comando **add**:

```
yargs.command({
  command: 'add',
  describe: 'Añadir una nueva nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Título de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Cuerpo de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
    typeof argv.body === 'string' && typeof argv.color === 'string') {
      const entrada: RequestType = {
        type: 'add',
        user: argv.user,
        title: argv.title,
        body: argv.body,
        color: argv.color,
      };
      console.log('Añadiendo nota');
      client.write(`${JSON.stringify(entrada)}\n`);
    } else {
      console.log(chalk.red('Argumentos no válidos'));
    }
  },
});
```
(Código de Cliente)[https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-eduardoreyes99/blob/main/src/client.ts]

### Conclusión

En esta práctica he aprendido a utilizar los paquetes yargs, chalks y la API síncrona de Node.js para gestión de ficheros para crear una aplicación interactiva que permita crear y eliminar ficheros en tiempo de ejecución, además se ha seguido el método de desarrollo TDD como viene siendo habitual y se ha incluido el cubrimiento de código utilizando GitHub Actions además de utilizar Sonar Cloud.

### Bibliografía

[Events](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#events_class_eventemitter)

[Net](https://nodejs.org/dist/latest-v16.x/docs/api/net.html#net_net_createserver_options_connectionlistener)

[Guión de la Práctica](https://ull-esit-inf-dsi-2021.github.io/prct10-async-sockets/)

[Apuntes Node.js](https://ull-esit-inf-dsi-2021.github.io/nodejs-theory/)

[FS Documentation](https://nodejs.org/api/fs.html#fs_fs_existssync_path)

[Yargs](https://www.npmjs.com/package/yargs)
