import type { InjectionKey } from 'vue';
import { ProTableContext, ProFormSearchContext } from '../interface';

export const proTableInjectionKey: InjectionKey<ProTableContext> =
  Symbol('ProTable');

export const proFormSearchInjectionKey: InjectionKey<ProFormSearchContext> =
  Symbol('ProFormSearch');
