import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Items from "../components/Items.vue"; // Protected route

// Define routes
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true }, // Only accessible for guests
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresGuest: true }, // Only accessible for guests
  },
  {
    path: "/items",
    name: "Items",
    component: Items,
    meta: { requiresAuth: true }, // Protected route, accessible only for logged-in users
  },
  {
    path: "/:pathMatch(.*)*", // Catch-all route for undefined paths
    redirect: "/login",
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for route protection
router.beforeEach((to, from, next) => {
  const auth = getAuth();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // For routes requiring authentication
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next(); // User is authenticated, allow access
      } else {
        next({ name: "Login" }); // Redirect unauthenticated users to Login
      }
    });
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    // For routes only accessible by guests
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next({ name: "Items" }); // Redirect authenticated users to Items
      } else {
        next(); // Proceed if user is not authenticated
      }
    });
  } else {
    next(); // If no auth requirements, proceed
  }
});

export default router;
