<template>
  <div>
    <v-container v-if="user.role === 'admin'">
      <v-layout row wrap px-4>
        <v-flex xs12 px-6 py-2>
          <h1>Reporte de Ingresos {{ current.period }}</h1>
        </v-flex>

        <v-flex xs12 px-6 pb-4>
          <v-menu
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-on="on" v-bind="attrs" color="primary">
                Periodo<v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="item in items"
                :key="item"
                @click="getPeriod(item)"
              >
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-flex>

        <v-flex xs12 md6 px-2 pb-4>
          <v-card outlined>
            <v-card-text>
              <v-layout align-center>
                <v-flex xs3 class="text-xs-center va-middle">
                  <v-icon style="color: #00C853; font-size: 5em;">attach_money</v-icon>
                </v-flex>

                <v-flex xs9 class="text-right">
                  <h1 class="headline">Total Utilidad</h1>
                  <p class="display-2">${{ (current.profit).toFixed(2) }}</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 md6 px-2 pb-4>
          <v-card outlined>
            <v-card-text>
              <v-layout align-center>
                <v-flex xs3 class="text-xs-center va-middle">
                  <v-icon style="color: #00C853; font-size: 5em;">addchart</v-icon>
                </v-flex>

                <v-flex xs9 class="text-right">
                  <h1 class="headline">Total Ingresos</h1>
                  <p class="display-2">${{ (current.revenue).toFixed(2) }}</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 md6 px-2 pb-4>
          <v-card outlined>
            <v-card-text>
              <v-layout align-center>
                <v-flex xs3 class="text-xs-center va-middle">
                  <v-icon style="color: #FF0000; font-size: 5em;">money_off</v-icon>
                </v-flex>

                <v-flex xs9 class="text-right">
                  <h1 class="headline">Total Gastos</h1>
                  <p class="display-2">${{ (current.expenses).toFixed(2) }}</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 md6 px-2 pb-4>
          <v-card outlined>
            <v-card-text>
              <v-layout align-center>
                <v-flex xs3 class="text-xs-center va-middle">
                  <v-icon style="color: #8000c8; font-size: 5em;">shopping_bag</v-icon>
                </v-flex>

                <v-flex xs9 class="text-right">
                  <h1 class="headline">Ordenes</h1>
                  <p class="display-2">{{ current.orderAmount }}</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout row wrap px-4>
        <v-flex xs12 px-6 py-2>
          <v-card outlined>
            <v-card-title>
              Pedidos del periodo
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
              :items="tableOrders"
              :headers="headers"
              :search="search"
              :sort-by="['createdAt']"
              :sort-desc="[true]"
            >
              <template v-slot:item.createdAt="{ item }">
                <span>{{ moment(item.createdAt).format('lll')}}</span>
              </template>
              <template v-slot:item.total="{ item }">
                <span>${{ item.total }}</span>
              </template>
              <template v-slot:item.percentage="{ item }">
                <span>{{ ((item.total/current.revenue) * 100).toFixed(0) }}%</span>
              </template>
              <template v-slot:item.shippingCost="{ item }">
                <span>${{ item.shippingCost }}</span>
              </template>
              <template v-slot:item.otherExpenses="{ item }">
                <span>${{ item.otherExpenses }}</span>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

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
export default {
  components: {
  },
  data: () => ({
    current: {
      profit: 0, revenue: 0, expenses: 0, orderAmount: 0, period: ''
    },
    search: '',
    dialogSuccess: false,
    tableOrders: [],
    allOrders: [],
    items: [
      'Semana', 'Mes', 'Año', 'Total'
    ],
    headers: [
      { text: 'Cliente', value: 'createdBy.name' },
      { text: '# de Productos', value: 'totalQuantity' },
      { text: 'Total', value: 'total' },
      { text: 'Costo de Envío', value: 'shippingCost' },
      { text: '% de Utilidad', value: 'percentage' },
      { text: 'Fecha', value: 'createdAt' }
    ]
  }),
  methods: {
    getOrders () {
      var options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.get('orders/', options).then(response => {
        this.allOrders = response.data
        this.getTotal()
        console.log(response.data)
      }, response => {
        console.log('error', response.data)
      })
    },
    getPeriod (period) {
      switch (period) {
        case 'Semana':
          this.getWeek()
          break
        case 'Mes':
          this.getMonth()
          break
        case 'Año':
          this.getYear()
          break
        default:
          this.getTotal()
          break
      }
    },
    getDate (order) {
      const date = order.createdAt.slice(0, 10)
      const newDate = new Date(date)
      return newDate
    },
    getWeek () {
      const now = new Date()
      this.tableOrders = []
      this.current.orderAmount = 0
      this.current.revenue = 0
      this.current.expenses = 0
      this.allOrders.forEach((order) => {
        if (now - this.getDate(order) < 604800000) {
          this.tableOrders.push(order)
          this.current.orderAmount += 1
          this.current.revenue += order.subtotal
          this.current.expenses += (order.total * 0.3 + order.shippingCost)
        }
      })
      this.current.profit = this.current.revenue - this.current.expenses
      this.current.period = 'Semanal'
    },
    getMonth () {
      const now = new Date()
      this.tableOrders = []
      this.current.orderAmount = 0
      this.current.revenue = 0
      this.current.expenses = 0
      this.allOrders.forEach((order) => {
        if (now - this.getDate(order) < 2628000000) {
          this.tableOrders.push(order)
          this.current.orderAmount += 1
          this.current.revenue += order.subtotal
          this.current.expenses += (order.total * 0.3 + order.shippingCost)
        }
      })
      this.current.profit = this.current.revenue - this.current.expenses
      this.current.period = 'Mensual'
    },
    getYear () {
      const now = new Date()
      this.tableOrders = []
      this.current.orderAmount = 0
      this.current.revenue = 0
      this.current.expenses = 0
      this.allOrders.forEach((order) => {
        if (now - this.getDate(order) < 31536000000) {
          this.tableOrders.push(order)
          this.current.orderAmount += 1
          this.current.revenue += order.subtotal
          this.current.expenses += (order.total * 0.3 + order.shippingCost)
        }
      })
      this.current.profit = this.current.revenue - this.current.expenses
      this.current.period = 'Anual'
    },
    getTotal () {
      this.tableOrders = []
      this.current.orderAmount = 0
      this.current.revenue = 0
      this.current.expenses = 0
      this.allOrders.forEach((order) => {
        this.tableOrders.push(order)
        this.current.orderAmount += 1
        this.current.revenue += order.subtotal
        this.current.expenses += (order.total * 0.3 + order.shippingCost)
      })
      this.current.profit = this.current.revenue - this.current.expenses
      this.current.period = 'Total'
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
  mounted () {
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
.numbers {
  font-size: 2em;
  margin-bottom: 0px;
}
</style>
