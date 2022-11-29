import { createRouter, createWebHistory } from "vue-router";
import { NewsView, SingleView, FavoritedNewsView } from "@/views";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: NewsView,
    },
    {
      path: "/:id",
      name: "single-new",
      component: SingleView,
    },
    {
      path: "/fav",
      name: "favorite",
      component: FavoritedNewsView,
    },
  ],
});

export default router;
