import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'
import AdminView from '../views/AdminView.vue'

import Store from '@/store/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      accessLevel: 'private'
    }
  },
  {
    path: '/sign-in',
    name: 'sign in',
    component: SignInView,
    meta: {
      accessLevel: 'public'
    }
  },
  {
    path: '/sign-up',
    name: 'sign up',
    component: SignUpView,
    meta: {
      accessLevel: 'public'
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: {
      accessLevel: 'private'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const accessLevel = to.meta.accessLevel;
  const activeLogin = Store.getters["session/activeLogin"];

  if (accessLevel === "public") {
    next();
  } else if (accessLevel === "private") {
    if (activeLogin) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router
