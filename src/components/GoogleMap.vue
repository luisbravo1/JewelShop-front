<template>
  <div>
    <gmap-map
      :center="center"
      :zoom="zoom"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
const creds = require('../../creds.json')
const API_KEY = creds.gmaps_key

export default {
  name: 'GoogleMap',
  props: ['shipping'],
  data () {
    return {
      zoom: 11,
      center: { lat: 25.6541299, lng: -100.370209 },
      markers: [
        {
          position: {
            lat: 25.6541299,
            lng: -100.370209
          }
        }
      ],
      places: [],
      currentPlace: null
    }
  },
  computed: {
    windowSize () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 0
        case 'sm': return 1
        case 'md': return 2
        case 'lg': return 3
        case 'xl': return 4
        default: return 0
      }
    }
  },
  mounted () {
    this.centerMap()
    this.getCoordinates()
  },
  methods: {
    centerMap () {
      if (this.windowSize < 2) {
        this.zoom = 14
      } else {
        this.zoom = 14
      }
    },
    getCoordinates () {
      const shippingAddress = this.shipping.address + ' ' + this.shipping.city + ' ' + this.shipping.state + ' ' + this.shipping.country + ' ' + this.shipping.zipcode
      const link = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + shippingAddress + `&key=${API_KEY}`
      this.$http.get(link).then(response => {
        const results = response.body.results

        if (results.length === 0) {
          console.log('error')
        } else {
          const coordinates = results[0].geometry.location
          this.markers[0].position.lng = coordinates.lng
          this.markers[0].position.lat = coordinates.lat
          this.center.lng = coordinates.lng
          this.center.lat = coordinates.lat
        }
        this.loadingCoordinates = false
      }, error => {
        console.log(error)
      })
    }
  }
}
</script>
