import { defineStore } from 'pinia';
import {ObjectDeck} from '@/types/deck';
import {ObjectBushing} from '@/types/bushing'
import {ObjectWheel} from '@/types/wheel';
import {ObjectTruck} from '@/types/truck';
import {ObjectItem} from '@/types/item';

export type RootState = {
  item:ObjectDeck|null,
  ch : {
    deck    : ObjectDeck|null,
    truck   : ObjectTruck|null,
    Wheel   : ObjectWheel|null,
    Bushing : ObjectBushing|null
  }
};

export const useItemStore = defineStore({
  id: 'item',
  state: () => ({
 
  } as RootState),
  getters: {
    
  },
  actions: {

  },
});