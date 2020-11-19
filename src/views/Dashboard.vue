<template>
  <v-container v-if="user.role === 'admin'">
    <v-row class="px-3 py-5">
      <v-col cols="12" lg="6">
        <v-container>
        <h3>Ventas totales en el último mes</h3>
          <total-sales> </total-sales>
        </v-container>
      </v-col>
      <v-col cols="12" lg="6">
        <v-container class="mt-3">
          <h3>Productos más vendidos</h3>
          <product-sales> </product-sales>
        </v-container>
      </v-col>
        <h3>Ventas mensuales</h3>
        <monthly-sales-chart> </monthly-sales-chart>
      <v-row>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import TotalSales from '../components/TotalSalesChart.vue'
import ProductSales from '../components/ProductChart.vue'
import MonthlySalesChart from '../components/MonthlySalesChart.vue'
export default {
  name: 'Dashboard',
  components: {
    TotalSales,
    ProductSales,
    MonthlySalesChart
  },
  data () {
    return {}
  },
  methods: {
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
li {
  list-style-type: disc;
}
</style>
