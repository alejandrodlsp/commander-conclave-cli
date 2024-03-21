import AuthRouter from '@/views/auth/AuthRouter'
import Signin from '@/views/auth/Signin'
import Signup from '@/views/auth/Signup'
import ForgotPassword from '@/views/auth/ForgotPassword'
import PasswordReset from '@/views/auth/PasswordReset'

export const AUTH =   {
  path: '/auth',
  component: AuthRouter,
  children: [
    {
      path: '/',
      name: 'signin',
      component: Signin,
      meta: {
        redirectIfAuthorized: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: {
        redirectIfAuthorized: true
      }
    },
    {
      path: '/passwords/recovery',
      name: 'forgotpassword',
      component: ForgotPassword,
      meta: {
        redirectIfAuthorized: true
      }
    },
    {
      path: '/passwords/update',
      name: 'passwordreset',
      component: PasswordReset,
      params: true,
      meta: {
        redirectIfAuthorized: true
      }
    }
  ]
}