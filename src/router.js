import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signin",
      name: "signin",
      component: () => import("./views/SignIn.vue"),
    },
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/SignUp.vue"),
    },
    {
      path: "/edit-profile",
      name: "edit-profile",
      component: () => import("./views/EditProfile.vue"),
    },
    {
      path: "/home",
      redirect: "/",
    },
    {
      path: "/create-resume",
      name: "create-resume",
      component: () => import("./views/CreateResume.vue"),
    },
    {
      path: "/view-resume-details/:id",
      name: "view-resume-details",
      component: () => import("./views/ViewResume.vue"),
    },
    {
      path: "/my-resumes/",
      name: "my-resumes",
      component: () => import("./views/AllResumes.vue"),
    },
  ],
});

export default router;
