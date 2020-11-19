<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 px-8 py-2>
          <h1>Mi cuenta</h1>
        </v-flex>
        <v-flex xs12 sm6 md4 px-4 pb-4>
          <v-card outlined @click="pushAndResetNav('account')">
            <v-layout row wrap text-center py-8>
              <v-flex xs12>
                <v-icon x-large color="primary">person</v-icon>
              </v-flex>
              <v-flex xs12>
                <v-btn text x-large @click="pushAndResetNav('account')">Información Contacto</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4 px-4 pb-4>
          <v-card outlined @click="pushAndResetNav('address')">
            <v-layout row wrap text-center py-8>
              <v-flex xs12>
                <v-icon x-large color="primary">room</v-icon>
              </v-flex>
              <v-flex xs12>
                <v-btn text x-large @click="pushAndResetNav('address')">Mis direcciónes</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4 px-4 pb-4>
          <v-card outlined @click="pushAndResetNav('orders')">
            <v-layout row wrap text-center py-8>
              <v-flex xs12>
                <v-icon x-large color="primary">local_shipping</v-icon>
              </v-flex>
              <v-flex xs12>
                <v-btn text x-large @click="pushAndResetNav('orders')">Mis pedidos</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4 px-4 pb-4 v-if="user && user.role === 'admin'" >
          <v-card outlined @click="pushAndResetNav('adminOrders')">
            <v-layout row wrap text-center py-8>
              <v-flex xs12>
                <v-icon x-large color="primary">admin_panel_settings</v-icon>
              </v-flex>
              <v-flex xs12>
                <v-btn text x-large @click="pushAndResetNav('adminOrders')">Admin Pedidos</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4 px-4 pb-4 v-if="user && user.role === 'admin'">
          <v-card outlined @click="pushAndResetNav('profitReport')">
            <v-layout row wrap text-center py-8>
              <v-flex xs12>
                <v-icon x-large color="primary">monetization_on</v-icon>
              </v-flex>
              <v-flex xs12>
                <v-btn text x-large @click="pushAndResetNav('profitReport')">Reporte de Ingresos</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4 px-4 pb-4 v-if="user && user.role === 'admin'">
          <v-card outlined @click="pushAndResetNav('dashboard')">
            <v-layout row wrap text-center py-8>
              <v-flex xs12>
                <v-icon x-large color="primary">dashboard</v-icon>
              </v-flex>
              <v-flex xs12>
                <v-btn text x-large @click="pushAndResetNav('dashboard')">Dashboard</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4 pa-4>
          <v-btn block color="accent" @click="logout">Cerrar Sesión</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

     <!-- Login -->
    <v-dialog v-model="loginDialog" max-width="600" persistent>
      <v-card>
        <Login></Login>
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
    loginDialog: false,
    dialogSuccess: false,
    user: ''
  }),
  methods: {
    pushAndResetNav (route) {
      this.drawer = false
      if (this.$route.path !== route) {
        this.$router.push(route)
      }
    },
    logout () {
      localStorage.clear()
      this.$cookies.remove('authToken')
      this.$router.push('/')
      this.$router.go(0)
    },
    getMe () {
      var options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.get('users/me', options).then(response => {
        window.localStorage.setItem('user', JSON.stringify(response.data))
        this.user = JSON.parse(window.localStorage.user)
      }, response => {
        this.loginDialog = true
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
