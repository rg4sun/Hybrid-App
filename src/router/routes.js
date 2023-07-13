const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/map",
    component: () => import("pages/TestMap.vue"),
  },
  {
    path: "/camera",
    component: () => import("pages/TestCamera.vue"),
  },
  {
    path: "/scanner",
    component: () => import("pages/TestScanner.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
