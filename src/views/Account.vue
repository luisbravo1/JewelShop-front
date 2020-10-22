<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 offset-md3 px-8 py-2>
          <h1>Mi cuenta</h1>
        </v-flex>
        <v-flex xs12 md6 offset-md3 px-4 pb-4>
          <v-card outlined>
            <v-form v-model="validContact">
              <v-flex pa-4>
                <h2>Información de contacto</h2><br>
                <v-text-field
                  v-model="user.name"
                  outlined
                  :rules="[() => user.name.length >= 1 || 'Nombre inválido']"
                  label="Nombre"
                  :loading="loading"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="user.email"
                  outlined
                  disabled
                  label="Correo"
                  :loading="loading"
                  required
                ></v-text-field>
                </v-flex>
                <v-flex text-right px-4 py-4>
                  <v-btn color="accent" :loading="loading" :disabled="!validContact" @click="updateUser">Guardar</v-btn>
                </v-flex>
            </v-form>
          </v-card>
        </v-flex>
        <v-flex xs12 md6 offset-md3 px-4 pb-4>
          <v-card outlined>
            <v-form v-model="validPassword">
              <v-flex pa-4>
                <h2>Cambiar contraseña</h2><br>
                <v-text-field
                  v-model="currentPassword"
                  outlined
                  label="Contraseña"
                  :rules="[() => currentPassword.length >= 6 || 'La contraseña debe contener al menos 6 carácteres']"
                  :loading="loading"
                  type="password"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newPassword"
                  outlined
                  hint="Al menos 6 caracteres"
                  :rules="[() => newPassword.length >= 6 || 'La contraseña debe contener al menos 6 carácteres']"
                  label="Nueva Contraseña"
                  :loading="loading"
                  type="password"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="confPassword"
                  outlined
                  :rules="[() => confPassword.length >= 6 && newPassword === confPassword || 'Contraseña inválida']"
                  label="Nueva Contraseña"
                  :loading="loading"
                  type="password"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex text-right px-4 py-4>
                <v-btn color="accent" :loading="loading" :disabled="!validPassword" @click="updatePassword">Guardar</v-btn>
              </v-flex>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

     <!-- Login -->
    <v-dialog v-model="loginDialog" max-width="600" persistent>
      <v-card>
        <Login></Login>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogSuccess" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Atención</v-card-title>
        <v-card-text>{{ dialogMessage }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="accent" @click="dialogSuccess = false">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Login from './Login.vue'

export default {
  components: {
    Login
  },
  data: () => ({
    validContact: false,
    validPassword: false,
    loading: false,
    loginDialog: false,
    dialogMessage: '',
    dialogSuccess: false,
    currentPassword: '',
    newPassword: '',
    confPassword: '',
    user: {
      name: '',
      email: ''
    }
  }),
  methods: {
    updatePassword () {
      this.loading = true
      var body = {
        password: this.newPassword
      }
      var options = {
        headers: {
          Authorization: 'Basic ' + btoa(this.user.email + ':' + this.currentPassword)
        }
      }
      this.$http.put('users/' + this.user.id + '/password', body, options).then(response => {
        this.newPassword = ''
        this.currentPassword = ''
        this.confPassword = ''
        this.loading = false
        this.dialogSuccess = true
        this.dialogMessage = 'El usuario se ha actualizado exitósamente.'
      }, response => {
        this.newPassword = ''
        this.currentPassword = ''
        this.confPassword = ''
        this.dialogSuccess = true
        this.dialogMessage = 'Error actualizando la contraseña del usuario.'
        this.loading = false
        console.log('error:', response.data)
      })
    },
    updateUser () {
      this.loading = true
      var options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.put('users/' + this.user.id, this.user, options).then(response => {
        window.localStorage.setItem('user', JSON.stringify(this.user))
        this.loading = false
        this.dialogSuccess = true
        this.dialogMessage = 'El usuario se ha actualizado exitósamente.'
      }, response => {
        this.dialogMessage = 'Error actualizando el usuario.'
        this.loading = false
      })
    },
    getMe () {
      this.loading = true
      var options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.get('users/me', options).then(response => {
        window.localStorage.setItem('user', JSON.stringify(response.data))
        this.user = JSON.parse(window.localStorage.user)
        this.loading = false
      }, response => {
        this.loginDialog = true
        this.loading = false
      })
    }
  },
  created () {
    if ('user' in window.localStorage) {
      this.user = JSON.parse(window.localStorage.user)
    } else {
      this.getMe()
    }
  }
}
</script>

<style scoped>
.img {
  height: 100vh;
  width: 100vh;
}
</style>
