<template>
  <v-dialog max-width="350" v-model="visible">
    <template v-slot:activator="{ on, attrs }">
      <a class="menu-link" v-bind="attrs" v-on="on">Sign In</a>
    </template>
    <v-card v-if="visible">
      <v-card-title>
        <div class="dialog-title-container">
          <div class="dialog-title">Sign In</div>
          <v-icon class="close-icon" @click="visible = false" small>mdi-close</v-icon>
        </div>
      </v-card-title>

      <div class="avatar-container">
        <v-avatar size="62">
          <img src="@/assets/images/d11-avatar.png" alt="D11">
        </v-avatar>
      </div>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <form v-on:submit.prevent="submit">

              <v-text-field label="Email*" name="email" id="email" v-model="credentials.username" @input="$v.credentials.username.$touch(); credentials.valid = true" :error-messages="emailErrors" outlined autofocus></v-text-field>
              <v-text-field label="Password*" name="password" id="password" v-model="credentials.password" @input="$v.credentials.password.$touch(); credentials.valid = true" :error-messages="passwordErrors" :type="'password'" outlined></v-text-field>

              <v-btn class="dialog-btn" type="submit">Log In</v-btn>
            </form>

          </v-card-text>
        </v-window-item>
        <v-window-item :value="2">
          <v-card-text>
            Logging in...
          </v-card-text>
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>

<script>
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
      }
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
      if (!this.credentials.valid && this.step === 1) errors.push('Invalid email or password')
      return errors
    }
  },
  methods: {
    submit: function () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.step = 2
        this.credentials.valid = true

        var login = this.$store.dispatch('login', this.credentials)

        // It just feels a bit better if we show the "logging in" notification for at least a few seconds.
        var timer = new Promise((resolve, reject) => {
          setTimeout(() => { resolve() }, 2000)
        })

        Promise.allSettled([login, timer]).then(() => {
          if (this.credentials.valid) {
            console.log('Logged in with token: ' + localStorage.getItem('d11-token'))
            this.visible = false
          } else {
            console.log('Failed to login, token: ' + localStorage.getItem('d11-token'))
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
        this.credentials.valid = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu-link {
    color: white;
  }

  .v-dialog {
    .v-card {
      .v-card__title {
        font-size: 1.5rem;
      }

      .v-card__text {
        min-height: 260px;
      }
    }

    .dialog-title-container {
      display: flex;
      width: 100%;

      .dialog-title {
        width: 100%;
        text-align: center;
        padding-left: 16px
      }

      .close-icon {
        height: 16px;
        padding-top: 16px;
      }
    }

    .avatar-container {
      text-align: center;
      width: 100%;
    }

    .dialog-btn {
      height: 50px;
      width: 100%;
    }
  }
</style>
