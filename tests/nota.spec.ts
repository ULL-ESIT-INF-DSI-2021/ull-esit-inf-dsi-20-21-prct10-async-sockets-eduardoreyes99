import 'chai';
import {expect} from 'chai';
import {Nota} from '../src/nota';

describe('Comprobación de la clase Nota', () => {
  const nota1 = new Nota("Prueba", "Prueba constructor", "Azul");
  const nota2 = new Nota("Prueba2", "Prueba setters", "Verde");
  const nota3 = new Nota("Prueba2", "Prueba setters", "Rojo");
  const nota4 = new Nota("Prueba2", "Prueba setters", "Amarillo");
  it('Comprobación que se crea un objeto de la clase nota', () => {
    expect(new Nota("Prueba", "Prueba constructor", "Azul")).instanceOf(Nota);
  });
  describe('Comprobación de los getters', () => {
    it('Comprobación de getColor()', () => {
      expect(nota1.getColor()).to.be.equal('Azul');
    });
    it('Comprobación de getCuerpo()', () => {
      expect(nota1.getCuerpo()).to.be.equal('Prueba constructor');
    });
    it('Comprobación de getTitulo()', () => {
      expect(nota1.getTitulo()).to.be.equal('Prueba');
    });
  });
  describe('Comprobación de los setters', () => {
    it('Comprobación de setColor()', () => {
      nota2.setColor('Rojo');
      expect(nota2.getColor()).to.be.equal('Rojo');
    });
    it('Comprobación de setCuerpo()', () => {
      nota2.setCuerpo('Funciona');
      expect(nota2.getCuerpo()).to.be.equal('Funciona');
    });
    it('Comprobación de setTitulo()', () => {
      nota2.setTitulo('Cambio de nombre');
      expect(nota2.getTitulo()).to.be.equal('Cambio de nombre');
    });
  });
  describe('Comprobación de los métodos de impresión', () => {
    it('Comprobación de showTitulo() Azul', () => {
      expect(nota1.showTitulo()).not.to.be.equal(null);
    });
    it('Comprobación de showTitulo() Verde', () => {
      expect(nota2.showTitulo()).not.to.be.equal(null);
    });
    it('Comprobación de showTitulo() Rojo', () => {
      expect(nota3.showTitulo()).not.to.be.equal(null);
    });
    it('Comprobación de showTitulo() Amarillo', () => {
      expect(nota4.showTitulo()).not.to.be.equal(null);
    });
    it('Comprobación de showCuerpo() Azul', () => {
      expect(nota1.showCuerpo()).not.to.be.equal(null);
    });
    it('Comprobación de showCuerpo() Verde', () => {
      expect(nota2.showCuerpo()).not.to.be.equal(null);
    });
    it('Comprobación de showCuerpo() Rojo', () => {
      expect(nota3.showCuerpo()).not.to.be.equal(null);
    });
    it('Comprobación de showCuerpo() Amarillo', () => {
      expect(nota4.showCuerpo()).not.to.be.equal(null);
    });
  });
});

