<template>
  <v-dialog max-width="350" v-model="visible">
    <template v-slot:activator="{ on, attrs }">
      <a class="menu-link" v-bind="attrs" v-on="on">Sign In</a>
    </template>
    <v-card v-if="visible">
      <v-card-title style="font-size: 1.5rem">
        <div style="display: flex; width: 100%;">
          <div style="width: 100%; text-align: center; padding-left: 16px">Sign In</div>
          <v-icon style="height: 16px; padding-top: 16px" @click="visible = false" small>mdi-close</v-icon>
        </div>
      </v-card-title>

      <div class="text-center">
        <v-avatar size="62">
          <img src="@/assets/images/d11-avatar.png" alt="D11">
        </v-avatar>
      </div>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text style="min-height: 260px">
            <form v-on:submit.prevent="submit">

              <v-text-field label="Email*" name="email" id="email" v-model="credentials.username" @input="$v.credentials.username.$touch(); invalidPassword = false" :error-messages="emailErrors" outlined autofocus></v-text-field>
              <v-text-field label="Password*" name="password" id="password" v-model="credentials.password" @input="$v.credentials.password.$touch(); invalidPassword = false" :error-messages="passwordErrors" :type="'password'" outlined></v-text-field>

              <v-btn type="submit" style="height: 50px; width: 100%">Log In</v-btn>
            </form>

          </v-card-text>
        </v-window-item>
        <v-window-item :value="2">
          <v-card-text style="min-height: 260px">
            Logging in...
          </v-card-text>
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'LoginDialog',
  mixins: [validationMixin],
  validations: {
    credentials: {
      username: { required, email },
      password: { required }
    }
  },
  data () {
    return {
      visible: false,
      step: 1,
      credentials: {
        username: null,
        password: null,
        valid: true
      },
      token: null
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.credentials.username.$dirty) return errors
      !this.$v.credentials.username.email && errors.push('E-mail must be valid')
      !this.$v.credentials.username.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.credentials.password.$dirty) return errors
      !this.$v.credentials.password.required && errors.push('Password is required')
      if (!this.credentials.valid) errors.push('Invalid email or password')
      return errors
    }
  },
  methods: {
    submit: function () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.step = 2
        this.credentials.valid = true

        var promise = axios.post(this.endpoint('authenticate', {}), this.credentials)
        promise
          .then(response => { this.token = response.data.token })
          .catch(() => { this.credentials.valid = false })

        // It just feels a bit better if we show the "logging in" notification for at least a few seconds.
        var timer = new Promise((resolve, reject) => {
          setTimeout(() => { resolve() }, 2000)
        })

        Promise.allSettled([promise, timer]).then(() => {
          if (this.credentials.valid) {
            console.log('Logged in with token: ' + this.token)
            this.visible = false
          } else {
            this.step = 1
          }
        })
      }
    }
  },
  watch: {
    visible: function () {
      if (!this.visible) {
        this.$v.$reset()
        this.step = 1
        this.credentials.username = null
        this.credentials.password = null
        this.credentials.valid = null
        this.token = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu-link {
    color: white;
  }

  // .v-window-item {
  //   min-height: 500px;
  // }
</style>
