import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {RequestType} from './types';
import {connect} from 'net';
import {MessageEventEmitterClient} from './eventEmitterClient';

const client = connect({port: 60300});
const emitter = new MessageEventEmitterClient(client);

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
        console.log(chalk.bgWhite.black('## NOTAS ENCONTRADAS ##'));
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
        console.log(chalk.keyword(notaObj.color)('>> TITULO -> ' +
          notaObj.title));
        console.log(chalk.keyword(notaObj.color)(notaObj.body));
      } else {
        console.log(chalk.red('No se pudo leer la nota'));
      }
      break;
  }
});
/**
 * Configuración del comando add mediante yargs
 */
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

/**
 * Configuración del comando remove mediante yargs
 */

yargs.command({
  command: 'remove',
  describe: 'Eliminar una nota',
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
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      const entrada: RequestType = {
        type: 'remove',
        user: argv.user,
        title: argv.title,
      };
      console.log('Eliminando nota');
      client.write(`${JSON.stringify(entrada)}\n`);
    } else {
      console.log(chalk.red('Argumentos no validos'));
    }
  },
});

/**
 * Configuración del comando edit mediante yargs
 */

yargs.command({
  command: 'edit',
  describe: 'Modifica una nota',
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
        type: 'edit',
        user: argv.user,
        title: argv.title,
        body: argv.body,
        color: argv.color,
      };
      console.log('Modificando una nota');
      client.write(`${JSON.stringify(entrada)}\n`);
    } else {
      console.log(chalk.red('Argumentos no validos'));
    }
  },
});

/**
 * Configuración del comando read mediante yargs
 */

yargs.command({
  command: 'read',
  describe: 'Leer una nota',
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
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      const entrada: RequestType = {
        type: 'read',
        user: argv.user,
        title: argv.title,
      };
      console.log('Leyendo una nota');
      client.write(`${JSON.stringify(entrada)}\n`);
    } else {
      console.log(chalk.red('Argumentos no validos'));
    }
  },
});

/**
 * Configuración del comando list mediante yargs
 */

yargs.command({
  command: 'list',
  describe: 'Listar las notas de un usuario',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      const entrada: RequestType = {
        type: 'list',
        user: argv.user,
      };
      console.log('Listando las notas');
      client.write(`${JSON.stringify(entrada)}\n`);
    } else {
      console.log(chalk.red('Argumentos no validos'));
    }
  },
});

yargs.parse();
