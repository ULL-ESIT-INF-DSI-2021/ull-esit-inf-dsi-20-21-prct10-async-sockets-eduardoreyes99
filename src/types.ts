import {Nota} from './nota';

/**
 * Tipo de dato para las peticiones de la aplicación
 */
export type RequestType = {
  type: 'add' | 'edit' | 'remove' | 'read' | 'list';
  user: string;
  title?: string;
  body?: string;
  color?: string;
}

/**
 * Tipo de dato para las respuestas de la aplicación
 */
export type ResponseType = {
  type: 'add' | 'edit' | 'remove' | 'read' | 'list';
  success: boolean;
  notes?: Nota[];
}

