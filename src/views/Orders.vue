<template>
  <div>
    <v-container>
      <v-layout row wrap px-4>
        <v-flex xs12 px-6 py-2>
          <h1>Mis pedidos</h1>
        </v-flex>
      </v-layout>
      <v-layout row wrap py-4 px-5>
          <v-simple-table class="basic_table">
              <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">
                    No. Pedido
                    </th>
                    <th class="text-left">
                    Precio
                    </th>
                    <th class="text-left">
                    Status
                    </th>
                    <th class="text-left">
                    Detalles
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1234567890</td>
                    <td>$500</td>
                    <td>Enviado</td>
                    <td>Ver detalle</td>
                </tr>
                <tr>
                    <td>2345678901</td>
                    <td>$1000</td>
                    <td>En proceso</td>
                    <td>Ver detalle</td>
                </tr>
                <tr
                    v-for="order in orders"
                    :key="order.id"
                >
                    <td>{{ order.id }}</td>
                    <td>{{ order.total }}</td>
                    <td>{{ order.type }}</td>
                    <td>{{ order.createdAt }}</td>
                </tr>
                </tbody>
                </template>
          </v-simple-table>
      </v-layout>
    </v-container>

    <!-- Login -->
    <v-dialog v-model='loginDialog' max-width='600' persistent>
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
    loading: true,
    loginDialog: false,
    editDialog: false,
    user: '',
    orders: []
  }),
  methods: {
    showOrdersByUser () {
      var options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.get('orders/getOrdersByUser/' + this.user.id, options).then(
        response => {
          console.log(this.user.id)
          console.log(response.data)
          this.orders = response.data
          this.loading = false
        },
        (response) => {
          this.loading = false
        }
      )
    },
    getMe () {
      var options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.get('users/me', options).then(
        (response) => {
          window.localStorage.setItem('user', JSON.stringify(response.data))
          this.user = JSON.parse(window.localStorage.user)
        },
        (response) => {
          this.loginDialog = true
        }
      )
    }
  },
  created () {
    if ('user' in window.localStorage) {
      this.user = JSON.parse(window.localStorage.user)
      this.showOrdersByUser()
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
.align_center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.basic_table {
    width: 100%;
}
</style>
