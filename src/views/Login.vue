<template>
  <div>
    <v-container v-if="isLoggingIn" pa-8>
      <h1 class="pl-4"><i>Mi Cuenta</i></h1>
      <v-layout>
        <v-flex xs12 pa-4>
          <h2 class="pb-4" style="font-weight: normal">INICIAR SESION</h2>
          <v-form
            ref="form"
            v-model="loginValid"
          >
            <v-text-field
              v-model="user.email"
              :rules="[rules.email]"
              :disabled="isSending"
              label="Correo electrónico*"
              outlined
              required
              validate-on-blur
              @keyup.enter.native="login"
            ></v-text-field>

            <v-text-field
              v-model="user.password"
              :type="show1 ? 'text' : 'password'"
              :disabled="isSending"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              outlined
              @click:append="show1 = !show1"
              label="Contraseña*"
              @keyup.enter.native="login"
            ></v-text-field>

            <center v-if=errorMessageStatus>
              <p style="color:red;">{{errorMessage}}</p>
            </center>

            <v-progress-circular
              v-if="isSending"
              indeterminate
              color="primary"
            ></v-progress-circular>
            <v-btn
              v-else
              :disabled="!loginValid"
              color="primary"
              :dark="loginValid"
              @click="login"
            >
            Iniciar Sesión
            </v-btn><br><br>

            <v-layout row wrap pl-3>
              <v-flex xs12>
                <a @click="beginPasswordRecovery">
                  ¿Olvidaste tu contraseña?
                </a>
              </v-flex>
              <v-flex xs12 pt-6>
                <a @click="beginRegister">
                  Registrarse
                </a>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-if="isRegistering" pa-12>
      <h1 class="pl-4"><i>Mi Cuenta</i></h1>
      <v-layout>
        <v-flex xs12 pa-4>
          <h2 class="pb-4" style="font-weight: normal">REGISTRARME</h2>
          <v-form v-model="registerValid">
            <v-text-field
              v-model="newUser.email"
              :rules="[rules.email]"
              label="Dirección de correo electronico"
              outlined
              required
            ></v-text-field>

            <v-text-field
              v-model="newUser.name"
              :rules="[() => newUser.name.length >= 1 || 'Nombre inválido']"
              label="Nombre"
              outlined
              required
            ></v-text-field>

            <v-text-field
              v-model="newUser.password"
              type="password"
              hint="Al menos 8 caracteres"
              :rules="[() => newUser.password.length >= 8 || 'La contraseña debe contener al menos 8 carácteres']"
              label="Contraseña"
              outlined
              required
            ></v-text-field>

            <v-text-field
              v-model="newUser.confPassword"
              :type="show1 ? 'text' : 'password'"
              hint="Al menos 8 caracteres"
              :rules="[() => newUser.confPassword.length >= 8 && newUser.password === newUser.confPassword || 'Contraseña inválida']"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              @click:append="show1 = !show1"
              label="Confirmar contraseña"
              outlined
              required
            ></v-text-field>

            <!-- <v-text-field
              v-model="newUser.phone"
              :rules="[() => newUser.phone.length >= 1 || 'Enter a valid phone number']"
              label="Phone Number"
              outlined
              required
            ></v-text-field>

            <v-text-field
              v-model="newUser.address"
              :rules="[() => newUser.address.length >= 1 || 'Enter a valid address']"
              label="Address"
              outlined
              required
            ></v-text-field> -->

            <p class="caption">Tus datos personales se usaran para ofrecerte soporte y atención sobre tu actividad en
              nuestro sitio, permitir el acceso a tu cuenta y para los propósitos descritos en nuestro <b>aviso de privacidad.</b>
            </p>

            <center v-if=errorMessageStatusSignUp>
              <p style="color:red;">{{errorMessageSignUp}}</p>
            </center>

            <v-progress-circular
              v-if="isSending"
              indeterminate
              color="#00979c"
            ></v-progress-circular>
            <v-layout pt-1 row wrap>
              <v-flex xs3 sm2 pr-4>
                <v-btn
                  v-if="!isSending"
                  @click="beginLogin"
                  text
                  color="primary"
                >
                  Atrás
                </v-btn>
              </v-flex>
              <v-flex pl-4>
                <v-btn
                  v-if="!isSending"
                  :disabled="!registerValid"
                  color="primary"
                  :dark="registerValid"
                  @click="register"
                >
                  Registrarse
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-if="isRecoveringPassword" pa-12>
      <h1 class="pl-4"><i>Mi Cuenta</i></h1>
      <v-layout>
        <v-flex xs12 pa-4>
          <h2 class="pb-4" style="font-weight: normal">RECUPERAR CONTRASEÑA</h2>
          <v-form v-model="recoverValid">
            <v-text-field
              v-model="recoverEmail"
              :rules="[rules.email]"
              label="Correo electrónico*"
              :disabled="isSending"
              outlined
              required
            ></v-text-field>

            <v-progress-circular
              v-if="isSending"
              indeterminate
              color="green"
            ></v-progress-circular>
            <v-btn
              color="primary"
              text
              v-if="!isSending"
              @click="beginLogin"
            >
              ATRAS
            </v-btn>
            <v-btn
              v-if="!isSending"
              :disabled="!recoverValid"
              color="primary"
              :dark="recoverValid"
              @click="recoverPassword"
            >
            Recuperar
            </v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="dialogRecovery" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">{{ recoveryTitle }}</v-card-title>
        <v-card-text>{{ recoveryMessage }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="primary" @click="beginLogin">Atras</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSending: false,
      isLoggingIn: true,
      isRegistering: false,
      isRecoveringPassword: false,
      errorMessage: '',
      errorMessageStatus: false,
      errorMessageSignUp: '',
      errorMessageStatusSignUp: false,
      show1: false,
      localToken: null,
      localUser: null,
      loginValid: false,
      registerValid: false,
      recoverValid: false,
      recoveryTitle: '',
      recoveryMessage: '',
      dialogRecovery: false,
      user: {
        email: '',
        password: ''
      },
      newUser: {
        name: '',
        email: '',
        password: '',
        confPassword: ''
      },
      recoverEmail: '',
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Correo electrónico inválido'
        }
      }
    }
  },
  methods: {
    reset () {
      this.user.email = ''
      this.user.password = ''
    },
    // logout () {
    //   localStorage.clear()
    //   this.$cookies.remove('authToken')
    //   this.$router.push('/')
    //   this.$router.go(0)
    // },
    login () {
      this.isSending = true
      this.errorMessageStatus = false
      var options = {
        headers: {
          Authorization: 'Basic ' + btoa(this.user.email + ':' + this.user.password)
        }
      }
      this.$http.post('auth', {}, options).then(response => {
        this.$cookies.set('authToken', response.body.token, '30d')
        this.$router.go(0)
        // this.$router.push('/')
      }, response => {
        if (response.status === 401) {
          this.errorMessage = 'The email or password do not match'
        } else {
          this.errorMessage = response.data.message
        }
        this.isSending = false
        this.errorMessageStatus = true
      })
    },
    register () {
      this.isSending = true
      this.errorMessageStatus = false
      var body = {
        name: this.newUser.name,
        email: this.newUser.email,
        password: this.newUser.password
      }
      this.$http.post('users', body).then(response => {
        this.$cookies.set('authToken', response.data.token, '30d')
        this.$router.go(0)
      }, response => {
        this.errorMessageStatusSignUp = true
        if (response.status === 409) {
          this.errorMessageSignUp = response.message
        }
        this.isSending = false
      })
    },
    recoverPassword () {
      this.isSending = true
      var options = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      var passResetBody = {
        email: this.recoverEmail
      }
      this.$http.post('password-resets', passResetBody, options).then(response => {
        this.recoveryTitle = 'Correo enviado.'
        this.recoveryMessage = 'Se te ha enviado un correo con instrucciones para recuperar tu contraseña. Asegurate de revisar en tu correo no deseado.'
        this.dialogRecovery = true
        this.isSending = false
      }, response => {
        if (response.status === 404) {
          this.recoveryTitle = 'Error'
          this.recoveryMessage = 'El correo ingresado no pertenece a ningún usuario registrado, favor de verificarlo.'
          this.dialogRecovery = true
          this.isSending = false
          return
        }
        if (response.status === 0) {
          this.recoveryTitle = 'Error'
          this.recoveryMessage = 'Error conectando con servidor'
          this.dialogRecovery = true
          this.isSending = false
        }
      })
    },
    beginRegister () {
      this.isLoggingIn = false
      this.isRegistering = true
    },
    beginPasswordRecovery () {
      this.isLoggingIn = false
      this.isRecoveringPassword = true
    },
    beginLogin () {
      this.isRegistering = false
      this.isRecoveringPassword = false
      this.isLoggingIn = true
      this.dialogRecovery = false
    }
  },
  created () {
    if (window.localStorage.user) {
      this.localToken = this.$cookies.get('authToken')
      this.localUser = JSON.parse(window.localStorage.user)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
