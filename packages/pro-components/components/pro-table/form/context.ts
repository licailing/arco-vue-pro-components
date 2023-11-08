import type { InjectionKey } from 'vue';
import { ProTableContext } from '../interface';

export const proTableInjectionKey: InjectionKey<ProTableContext> =
  Symbol('ProTable');
