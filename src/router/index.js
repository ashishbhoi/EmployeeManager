import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewEmployee from '@/components/NewEmployee'
import ViewEmployee from '@/components/ViewEmployee'
import EditEmployee from '@/components/EditEmployee'
import Login from '@/components/Login'
import Reginster from '@/components/Register'
import firebase from 'firebase'
import verefy from '@/components/Verefy'
import verefied from '@/components/Verefied'


Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard, 
      meta: {
        requiresAuth: true,
        requiresConfirm: true
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
      path: '/verefy',
      name: 'verefy',
      component: verefy,
      meta: {
        requiresAuth: true,
        realtimeVerefication: true
      }
    },
    {
      path: '/verefied',
      name: 'verefied',
      component: verefied, 
      meta: {
        requiresAuth: true,
        requiresConfirm: true
      }
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      meta: {
        requiresAuth: true,
        requiresConfirm: true
      }
    },
    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta: {
        requiresAuth: true,
        requiresConfirm: true
      }
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta: {
        requiresAuth: true,
        requiresConfirm: true
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
      })
    }
    else {
      next()
    }
  }
  if(to.matched.some(record => record.meta.requiresGuest)) {
    // Chaeck if Logged In
    if(firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.path
        }
      })
    }
    else{
      //Procced to route
      next()
    }
  }
  if(to.matched.some(record => record.meta.requiresConfirm)) {
    if(firebase.auth().currentUser){
      firebase.auth().onAuthStateChanged(user => {
        if(!user.emailVerified) {
          firebase.auth().currentUser.sendEmailVerification()
          next({
            path: '/verefy',
            query: {
              redirect: to.path
            }
          })
        }
        else {
          next()
        }
      })
    }
  }
  if(to.matched.some(record => record.meta.realtimeVerefication)) {
    firebase.auth().onAuthStateChanged(user => {
      if(!user.emailVerified) {
        next({
          path: '/verefy',
          query: {
            redirect: to.path
          }
        })
      }
      else {
        next({
          path: '/verefied',
          query: {
            redirect: to.fullPath
          }
        })
      }
    })
  }
  else {
    //Procced to route
    next()
  }
})

export default router