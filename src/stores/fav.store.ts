import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useFavStore = defineStore("fav", {
  state: () => ({ ids: useStorage("ids", new Map<string, string>()) }),
  getters: {
    getArticles(): Map<string, string> {
      return this.ids;
    },
    getAmount(): number {
      return this.ids.size;
    },
  },
  actions: {
    toggleById(id: string, title: string) {
      const isIdStored = this.ids.has(id);

      if (isIdStored) {
        this.ids.delete(id);
      } else {
        this.ids.set(id, title);
      }
    },
    // perhaps this function could be defined as a getter but
    // then more complicated store setup will be required
    isFav(id: string): boolean {
      return this.ids.has(id);
    },
    deleteById(id: string) {
      this.ids.delete(id);
    },
  },
});
