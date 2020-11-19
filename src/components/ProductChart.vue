<template>
  <v-container>
    <apexchart v-if="isDataLoaded" type="donut" height="211" :options="chartOptions" :series="series" />
  </v-container>
</template>

<script>
export default {
  name: 'ApexColumn',
  data () {
    return {
      isDataLoaded: false,
      series: [],
      chartOptions: {
        colors: ['#008FFB', '#00E396', '#FEB019'],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        chart: {
          toolbar: {
            show: true
          }
        },
        title: {
          text: 'Donut',
          align: 'left',
          style: {
            color: '#FFF'
          }
        },
        labels: [],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 250
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        legend: {
          labels: {
            colors: '#FFF'
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
            return resolve(response.body.products)
          }, response => {
            console.log('error')
            return reject(response)
          })
      })
      const p2 = new Promise((resolve, reject) => {
        this.$http.get('orders/week2', options)
          .then(response => {
            return resolve(response.body.products)
          }, response => {
            console.log('error')
            return reject(response)
          })
      })
      const p3 = new Promise((resolve, reject) => {
        this.$http.get('orders/week3', options)
          .then(response => {
            return resolve(response.body.products)
          }, response => {
            console.log('error')
            return reject(response)
          })
      })
      const p4 = new Promise((resolve, reject) => {
        this.$http.get('orders/week4', options)
          .then(response => {
            return resolve(response.body.products)
          }, response => {
            console.log('error')
            return reject(response)
          })
      })
      Promise.all([p1, p2, p3, p4])
        .then((response) => {
          const aux = {}
          response.forEach(ordersByWeek => {
            const keys = Object.keys(ordersByWeek)
            keys.forEach(key => {
              aux[key] = aux[key] ? aux[key] + ordersByWeek[key] : ordersByWeek[key]
            })
          })
          this.series = Object.values(aux)
          this.chartOptions.labels = Object.keys(aux)
          this.isDataLoaded = true
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  created () {
    this.getMonthlySales()
  }
}
</script>
