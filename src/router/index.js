import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewEmployee from '@/components/NewEmployee'
import ViewEmployee from '@/components/ViewEmployee'
import EditEmployee from '@/components/EditEmployee'
import Login from '@/components/Login'
import Reginster from '@/components/Register'
import firebase from 'firebase'


Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard, 
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Reginster,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// Nav Guard
router.beforeEach((to, from, next) => {
  //Check For RequiresAuth Guard
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // Chaeck if Not Logged In
    if(!firebase.auth().currentUser) {
      // Go to Login page
      next({
        path: '/login',
        query: {
          redirect: to.path
        }
      });
    }
    else{
      //Procced to route
      next();
    }
  }
  else if(to.matched.some(record => record.meta.requiresGuest)) {
    // Chaeck if Logged In
    if(firebase.auth().currentUser) {
      // Go to Login page
      next({
        path: '/',
        query: {
          redirect: to.path
        }
      });
    }
    else{
      //Procced to route
      next();
    }
  }
  else {
    //Procced to route
    next();
  }
})

export default router