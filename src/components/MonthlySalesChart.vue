<template>
  <v-container>
    <apexchart ref="realtimeChart" type="line" height="200" :options="chartOptions" :series="series" />
  </v-container>
</template>

<script>
export default {
  name: 'MonthlySalesChart',
  data: () => ({
    // monthlySales: [0, 0, 0],
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
        categories: ['3', '2', '1'],
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

      this.$http.get('orders/week1', options).then(response => {
        this.series[0].data[0] = response.body.totalSales
      }, response => {
        console.log('error')
      })
      this.$http.get('orders/week2', options).then(response => {
        this.series[0].data[1] = response.body.totalSales
      }, response => {
        console.log('error')
      })
      this.$http.get('orders/week3', options).then(response => {
        this.series[0].data[2] = response.body.totalSales
      }, response => {
        console.log('error')
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
