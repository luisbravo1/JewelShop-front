<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 pa-8>
          <v-card outlined>
            <v-card-title>
              Mis pedidos
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="orders"
              :items-per-page="10"
            >
              <template v-slot:item.total="{ item }">
                <span>${{ item.total }}</span>
              </template>
              <template v-slot:item.createdAt="{ item }">
                <span>{{ moment(item.createdAt).format('lll')}}</span>
              </template>
              <template v-slot:item.action="{ item }">
                <v-btn small color="accent" @click="pushAndResetNav('/completedPurchase/' + item.id)">Ver más</v-btn>
              </template>
            </v-data-table>
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
    user: '',
    headers: [
      { text: 'id', value: 'id' },
      { text: 'Artículos', value: 'totalQuantity' },
      { text: 'Total', value: 'total' },
      { text: 'Fecha', value: 'createdAt' },
      { text: 'Action', value: 'action', align: 'center' }
    ],
    orders: []
  }),
  methods: {
    pushAndResetNav (route) {
      this.drawer = false
      if (this.$route.path !== route) {
        this.$router.push(route)
      }
    },
    getOrders () {
      var options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.get('orders/getOrdersByUser/' + this.user.id, options).then(response => {
        // this.orders = response.data
        var parsedobj = JSON.parse(JSON.stringify(response.data))
        this.orders = parsedobj
        this.loading = false
      }, response => {
        this.loading = false
      })
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
        this.getOrders()
      }, response => {
        this.loginDialog = true
      })
    }
  },
  created () {
    if ('user' in window.localStorage) {
      this.user = JSON.parse(window.localStorage.user)
      this.getOrders()
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
