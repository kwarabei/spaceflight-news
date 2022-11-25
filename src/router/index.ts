import { createRouter, createWebHistory } from "vue-router";
import { NewsView, SingleView } from "@/views";

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
  ],
});

export default router;
