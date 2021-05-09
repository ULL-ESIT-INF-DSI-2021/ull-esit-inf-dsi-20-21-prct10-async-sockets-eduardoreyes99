import {Nota} from './nota';

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

