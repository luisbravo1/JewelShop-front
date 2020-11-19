<template>
  <div>
    <v-container v-if="user.role === 'admin'">
      <v-layout row wrap>
        <v-flex xs12 pa-8>
          <v-card outlined>
            <v-card-title>
              Pedidos
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :items-per-page="20"
              :headers="headers"
              :items="orders"
              :search="search"
              :loading="loading"
              :sort-by="['createdAt']"
              :sort-desc="[true]"
              loading-text="Loading... Please wait"
            >
              <template v-slot:item.total="{ item }">
                <span>${{ item.total }}</span>
              </template>
              <template v-slot:item.createdAt="{ item }">
                <span>{{ moment(item.createdAt).format('lll')}}</span>
              </template>
              <template v-slot:item.typeDelivery="{ item }">
                <span v-if="item.shippingCost > 0">{{ 'Envío' }}</span>
                <span v-else>{{ 'Tienda' }}</span>
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

    <v-dialog v-model="dialogSuccess" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Éxito</v-card-title>
        <v-card-text>Action successful.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="green" @click="dialogSuccess = false">Aceptar</v-btn>
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
    orders: [],
    isLoading: false,
    dialogSuccess: false,
    loginDialog: false,
    loading: true,
    search: '',
    headers: [
      { text: 'id', value: 'id' },
      { text: 'User', value: 'createdBy.name' },
      { text: 'items', value: 'totalQuantity' },
      { text: 'Type', value: 'typeDelivery' },
      { text: 'Total', value: 'total' },
      { text: 'Date', value: 'createdAt' },
      { text: 'Action', value: 'action', align: 'center' }
    ]
  }),
  computed: {
  },
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
      this.$http.get('orders/', options).then(response => {
        this.loading = false
        this.orders = response.data
      }, response => {
        console.log('error', response.data)
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
</style>
