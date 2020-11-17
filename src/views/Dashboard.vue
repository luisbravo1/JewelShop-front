<template>
  <v-container>
    <v-row class="px-3 py-5">
      <v-col cols="12" lg="6">
        <v-container>
        <h3>Ventas totales en el último mes</h3>
          <total-sales> </total-sales>
        </v-container>
      </v-col>
      <v-col cols="12" lg="6">
        <v-container class="mt-3">
          <h3>Prodcutos más vendidos</h3>
          <product-sales> </product-sales>
        </v-container>
      </v-col>
        <h3> Usuarios registrados </h3>
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
  }
}

</script>

<style scoped>
li {
  list-style-type: disc;
}
</style>
