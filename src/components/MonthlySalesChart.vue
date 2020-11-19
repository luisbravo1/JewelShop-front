<template>
  <v-container>
    <apexchart v-if="isDataLoaded" ref="realtimeChart" type="line" height="200" :options="chartOptions" :series="series" />
  </v-container>
</template>

<script>
export default {
  name: 'MonthlySalesChart',
  data: () => ({
    isDataLoaded: false,
    series: [
      {
        name: 'ventas',
        data: []
      }
    ],
    chartOptions: {
      colors: ['#FCCF31', '#17ead9', '#f02fc2'],
      chart: {
        height: 350,
        type: 'line'
      },
      grid: {
        show: true,
        strokeDashArray: 0,
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      stroke: {
        curve: 'smooth'
      },
      dropShadow: {
        enabled: true,
        opacity: 0.3,
        blur: 5,
        left: -7,
        top: 22
      },
      dataLabels: {
        enabled: true
      },
      title: {
        text: 'Line',
        align: 'left',
        style: {
          color: '#FFF'
        }
      },
      xaxis: {
        categories: ['4', '3', '2', '1'],
        labels: {
          style: {
            colors: '#fff'
          },
          show: true
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#fff'
          }
        }
      }
    }
  }),
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
