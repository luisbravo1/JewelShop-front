<template>
  <v-container>
    <apexchart v-if="isDataLoaded" type="bar" height="400" :options="chartOptions" :series="series" />
  </v-container>
</template>

<script>
export default {
  name: 'TotalSalesChart',
  data () {
    return {
      isDataLoaded: false,
      series: [{
        name: 'Ventas totales',
        data: []
      }],
      chartOptions: {
        colors: ['#17ead9', '#f02fc2'],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.5,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.8,
            stops: [0, 100]
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 0
        },
        xaxis: {
          categories: [`${new Date(new Date() - 28 * 60 * 60 * 24 * 1000).toLocaleDateString()} - ${new Date(new Date() - 21 * 60 * 60 * 24 * 1000).toLocaleDateString()}`,
            `${new Date(new Date() - 21 * 60 * 60 * 24 * 1000).toLocaleDateString()} - ${new Date(new Date() - 14 * 60 * 60 * 24 * 1000).toLocaleDateString()}`,
            `${new Date(new Date() - 14 * 60 * 60 * 24 * 1000).toLocaleDateString()} - ${new Date(new Date() - 7 * 60 * 60 * 24 * 1000).toLocaleDateString()}`,
            `${new Date(new Date() - 7 * 60 * 60 * 24 * 1000).toLocaleDateString()} - ${new Date().toLocaleDateString()}`],
          labels: {
            style: {
              colors: '#fff'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Ingresos'
          },
          labels: {
            style: {
              color: '#fff'
            }
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '$' + val
            }
          }
        }
      }
    }
  },
  methods: {
    getMonthlySales () {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      const p1 = new Promise((resolve, reject) => {
        this.$http.get('orders/week1', options)
          .then(response => {
            this.series[0].data[0] = response.body.totalSales
            return resolve()
          }, response => {
            console.log('error')
            return reject(response)
          })
      })
      const p2 = new Promise((resolve, reject) => {
        this.$http.get('orders/week2', options)
          .then(response => {
            this.series[0].data[1] = response.body.totalSales
            return resolve()
          }, response => {
            console.log('error')
            return reject(response)
          })
      })
      const p3 = new Promise((resolve, reject) => {
        this.$http.get('orders/week3', options)
          .then(response => {
            this.series[0].data[2] = response.body.totalSales
            return resolve()
          }, response => {
            console.log('error')
            return reject(response)
          })
      })
      const p4 = new Promise((resolve, reject) => {
        this.$http.get('orders/week4', options)
          .then(response => {
            this.series[0].data[3] = response.body.totalSales
            return resolve()
          }, response => {
            console.log('error')
            return reject(response)
          })
      })
      Promise.all([p1, p2, p3, p4])
        .then(() => {
          this.isDataLoaded = true
        })
        .catch((error) => {
          console.log(error)
        })
      console.log(this.series[0].data)
    }
  },
  created () {
    this.getMonthlySales()
  }
}

</script>

<style scoped>
li {
  list-style-type: disc;
}
</style>
