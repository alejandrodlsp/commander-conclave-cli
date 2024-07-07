<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="h-8 mr-2"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Modern_Times_Group_logo.svg/1200px-Modern_Times_Group_logo.svg.png"
          alt="logo">
        Commander Conclave
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="signin">
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
              <input v-model="username" type="text" name="username" id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="username" required="">
            </div>
            <div>
              <label for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="">
            </div>
            <div class="flex items-center justify-between">
              <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
                password?</a>
            </div>
            <button type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              style="background-color: rgb(13 148 136);"
              >
              Sign in
            </button>
            <router-link :to="{ name: 'signup' }" class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <a href="#"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { plainHttp } from '@/axios/index'
import { mapMutations } from 'vuex'

export default {
  name: 'SignIn',

  data() {
    return {
      username: '',
      password: '',
    }
  },

  created() {
    this.checkSignedIn()
  },

  updated() {
    this.checkSignedIn()
  },

  methods: {
    ...mapMutations('alerts', ['setGlobalAlert', 'clearGlobalAlerts']),

    signin() {
      plainHttp.post('/auth/', { username: this.username, password: this.password })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },

    signinSuccessful(response) {
      if (!response.data.token) {
        this.signinFailed(response)
        return
      }

      localStorage.token = response.data.token
      localStorage.signedIn = true
      this.clearGlobalAlerts()
      this.$router.go({ name: 'roomSelection' })
    },

    signinFailed(error) {
      const message = (error.response && error.response.data && error.response.data.message) || 'Failed to sign in'
      console.log(message)
      this.setGlobalAlert(error.message)
      delete localStorage.token
      delete localStorage.signedIn
    },

    checkSignedIn() {
      if (localStorage.signedIn) {
        this.$router.go({ name: 'roomSelection' })
      }
    }
  }
}
</script>
