import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Todo from '../views/Todo.vue'
import Calendar from '../views/Calendar.vue'
import Budget from '../views/Budget.vue'

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
    path: '/calender',
    name: 'Kalender',
    component: Calendar
  }, {
    path: '/budget',
    name: 'Budget',
    component: Budget
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
