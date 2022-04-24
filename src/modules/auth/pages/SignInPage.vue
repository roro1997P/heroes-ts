<template>
  <q-page padding>
    <div class="absolute-center vertical-middle">
      <SignInForm />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import SignInForm from '../components/SignInForm.vue'

export default defineComponent({
  name: 'SignInPage',
  components: { SignInForm }
})
</script>
