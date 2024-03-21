<template>
  <div class="bg-light">
    <section class="container-sm my-auto mt-0">
      <div
        class="text-center d-flex justify-content-center h-100 align-items-center mt-0"
        cz-shortcut-listen="true"
      >
        <router-view />
      </div>
    </section>

    <global-alert />
  </div>
</template>

<script>
import GlobalAlert from '@/components/GlobalAlert.vue'
export default {
  name: 'AuthRouter',
  components: {
    GlobalAlert
  }
}
</script>
