import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Todo from '../views/Todo.vue'
import Calendar from '../views/Calendar.vue'
import Budget from '../views/Budget.vue'

//import Budgets routers
import Januari from '../views/budget/Januari.vue'
import Februari from '../views/budget/Februari.vue'
import Mars from '../views/budget/Mars.vue'
import April from '../views/budget/April.vue'
import Maj from '../views/budget/Maj.vue'
import Juni from '../views/budget/Juni.vue'
import Juli from '../views/budget/Juli.vue'
import Augusti from '../views/budget/Augusti.vue'
import September from '../views/budget/September.vue'
import Oktober from '../views/budget/Oktober.vue'
import November from '../views/budget/November.vue'
import December from '../views/budget/December.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
}, {
  path: '/todo',
  name: 'Todo',
  component: Todo
}, {
  path: '/calendar',
  name: 'Kalender',
  component: Calendar
}, {
  path: '/budget',
  name: 'Budget',
  component: Budget,
  children: [{
    path: 'Januari',
    component: Januari
  }, {
    path: 'Februari',
    component: Februari
  }, {
    path: 'Mars',
    component: Mars
  }, {
    path: 'April',
    component: April
  }, {
    path: 'Maj',
    component: Maj
  }, {
    path: 'Juni',
    component: Juni
  }, {
    path: 'Juli',
    component: Juli
  }, {
    path: 'Augusti',
    component: Augusti
  }, {
    path: 'September',
    component: September
  }, {
    path: 'Oktober',
    component: Oktober
  }, {
    path: 'November',
    component: November
  }, {
    path: 'December',
    component: December
  }]

}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
