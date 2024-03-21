<template>
  <form
    class="form-signin"
    data-bitwarden-watching="1"
    @submit.prevent="sendPasswordEmail"
  >
    <img
      class="mb-4"
      src="https://newyorkspaces.com/wp-content/uploads/2021/10/What-Is-a-Key-Difference-between-Online-Casino-and-Sports-Betting.png"
      alt=""
      width="72"
      height="72"
    >
    <h1 class="h3 mb-3 font-weight-normal">
      Olvidaste tu contraseña?
    </h1>
    
    <label
      for="email"
      class="sr-only"
    >Direccion Email</label>
    <input
      id="email"
      v-model="email"
      type="email"
      class="form-control"
      placeholder="name@company.com"
      required=""
    >

    <button
      class="mt-3 btn btn-lg btn-primary btn-block"
      type="submit"
    >
      Enviar email de restablecimiento de contraseña
    </button>

    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      Ya tienes cuenta?
      <router-link
        :to="{ name: 'signin' }"
        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
      >
        Accede al portal
      </router-link>
    </p>
  </form>
</template>

<script>
import { plainHttp } from '@/axios/index'
import { mapMutations } from 'vuex'
export default {
  name: 'ForgotPassword',

  data () {
    return {
      email: '',
    }
  },

  computed: {
    resetAbsoluteUrl () {
      const route = this.$router.resolve({ name: 'passwordreset' })
      const absoluteURL = new URL(route.href, window.location.origin).href
      return absoluteURL
    }
  },

  methods: {
    ...mapMutations('alerts', ['setGlobalAlert']),

    sendPasswordEmail () {
      plainHttp.post('/password/forgot', { email: this.email, reset_url: this.resetAbsoluteUrl })
        .then(() => {
          this.setGlobalAlert(`An email was sent to ${this.email} with instructions on how to recover your password.`)
          this.$router.replace('/')
        })
        .catch(error => {
          const message = (error.response && error.response.data && error.response.data.error) || ''
          this.setGlobalAlert(message)
        })
    }
  }
}
</script>
