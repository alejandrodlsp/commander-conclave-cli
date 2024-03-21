<template>
  <form
    class="form-signin"
    data-bitwarden-watching="1"
    @submit.prevent="resetPassword"
  >
    <img
      class="mb-4"
      src="https://newyorkspaces.com/wp-content/uploads/2021/10/What-Is-a-Key-Difference-between-Online-Casino-and-Sports-Betting.png"
      alt=""
      width="72"
      height="72"
    >
    <h1 class="h3 mb-3 font-weight-normal">
      Restablecimiento de contrasena para <i>{{ queryEmail }}</i>
    </h1>
    
    <label
      for="password"
      class="mt-1 sr-only"
    >Contraseña</label>
    <input
      id="password"
      v-model="password"
      type="password"
      class="mt-1 form-control"
      placeholder="••••••••"
      required=""
    >
    
    <label
      for="password_confirmation"
      class="mt-1 sr-only"
    >Repite Contraseña</label>
    <input
      id="password_confirmation"
      v-model="password_confirmation"
      type="password"
      class="mt-1 form-control"
      placeholder="••••••••"
      required=""
    >

    <button
      class="mt-3 btn btn-lg btn-primary btn-block"
      type="submit"
    >
      Restablecer contraseña
    </button>
  </form>
</template>

<script>
import { plainHttp } from '@/axios/index'
import { mapMutations } from 'vuex'

export default {
  name: 'PasswordReset',

  data () {
    return {
      password: '',
      password_confirmation: '',
    }
  },

  computed: {
    queryEmail () {
      return this.$route.query.email
    },

    queryToken () {
      return this.$route.query.token
    }
  },

  methods: {
    ...mapMutations('alerts', ['setGlobalAlert']),

    resetPassword () {
      const payload = {
        email: this.queryEmail,
        token: this.queryToken,
        password: this.password
      }

      plainHttp.post('/password/reset', payload)
        .then(() => {
          this.$router.replace('/')
        })
        .catch(error => {
          const message = (error.response && error.response.data && error.response.data.error) || 'Something went wrong'
          this.setGlobalAlert(message)
        })
    }
  }
}
</script>
