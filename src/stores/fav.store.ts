import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useFavStore = defineStore("fav", {
  state: () => ({ ids: new Set<string>() }),
  getters: {
    getIds(): Set<string> {
      return this.ids;
    },
    getAmount(): number {
      return this.ids.keys.length;
    },
  },
  actions: {
    toggleId(id: string) {
      const isIdStored = this.ids.has(id);

      if (isIdStored) {
        this.ids.delete(id);
      } else {
        this.ids.add(id);
      }
    },
    // perhaps this function could be defined as a getter but
    // then more complicated store setup will be required
    isFav(id: string): boolean {
      return this.ids.has(id);
    },
  },
});
