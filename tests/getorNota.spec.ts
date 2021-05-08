import 'chai';
import {expect} from 'chai';
import {Nota} from '../src/nota';
import {GestorNota} from '../src/gestorNota';

describe('Comprobación de la clase Nota', () => {
  const nota1 = new Nota("Prueba", "Prueba constructor", "Azul");
  const gestor = new GestorNota();
  it('Comprobación que se crea un objeto de la clase GestorNota', () => {
    expect(new GestorNota()).instanceOf(GestorNota);
  });
  it('Comprobación del método addNota', () => {
    expect(gestor.addNota(nota1, "andres"));
  });
  it('Comprobación del método removeNota', () => {
    expect(gestor.removeNota("Prueba", "andres"));
  });
  it('Comprobación del método editNota', () => {
    expect(gestor.editNota("eduardo", "Nota1", "Cuerpo modificado", "Verde"));
  });
  it('Comprobación del método listNotas', () => {
    expect(gestor.listNotas("eduardo"));
  });
  it('Comprobación del método readNota', () => {
    expect(gestor.readNota("eduardo", "Nota2"));
  });
});
