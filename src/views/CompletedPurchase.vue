<template>
  <div>
    <v-container fluid>
      <v-layout v-if="order !== null" row wrap py-4>
        <v-flex xs12 md6 :class="{'px-4': $vuetify.breakpoint.smAndDown, 'px-8': $vuetify.breakpoint.mdAndUp}">
          <v-flex xs12 pb-4 px-4>
            <h1>¡Gracias por tu compra, {{ order.createdBy.name }}!</h1>
            <h3 class="subtitle-1">ID de pedido: <i>{{ this.$route.params.orderId }}</i></h3>
          </v-flex>
          <!-- Map -->
          <v-card outlined>
            <div>
              <GoogleMap :shipping="order.shippingInfo"></GoogleMap>
            </div>
            <v-flex xs12 pa-5>
              <h3>Recibirás un correo de confirmación cuando tu pedido este listo para recolección y/o haya sido enviado</h3><br>
              <div>{{ moment(order.createdAt).format('LLL') }}</div>
            </v-flex>
          </v-card>

          <br>
          <!-- Shipping Info -->
          <v-card outlined>
            <v-flex xs12 pa-5>
              <h2>Información del cliente</h2>
            </v-flex>
            <v-layout row wrap px-8>
              <v-flex xs12 md6 pb-4>
                <h4>Información de contacto</h4>
                <div>{{ order.createdBy.name }}</div>
                <div>{{ order.createdBy.email }}</div>
              </v-flex>
              <v-flex xs12 md6 pb-4>
                <h4 v-if="!pickup">Información de envío</h4>
                <h4 v-else>Punto de entrega</h4>
                <div>{{ order.shippingInfo.firstName }} {{ order.shippingInfo.lastName }}</div>
                <div>{{ order.shippingInfo.address }}</div>
                <div>{{ order.shippingInfo.city }}, {{ order.shippingInfo.state }}, {{ order.shippingInfo.country }}</div>
                <div>{{ order.shippingInfo.zipcode }}</div>
                <div>{{ order.shippingInfo.phone }}</div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>

        <v-divider vertical></v-divider>

        <!-- Cart -->
        <v-flex xs12 md5 px-8 :class="{'py-8': $vuetify.breakpoint.smAndDown, '': $vuetify.breakpoint.mdAndUp}">
          <v-layout v-if="!loading" row wrap>
            <v-flex
              v-for="product in cartProducts"
              :key="product.id"
              xs12 px-4 py-1
            >
              <v-layout>
                <!-- Picture -->
                <v-flex xs4 sm4 md4 lg3>
                  <div class="image">
                    <v-badge overlap class="badge__item">
                      <template v-slot:badge>
                        <span>{{ product.quantity }}</span>
                      </template>
                    </v-badge>
                    <v-img aspect-ratio="1" min-width="90px" max-width="60%" :src="product.image"></v-img>
                  </div>
                </v-flex>

                <!-- Info -->
                <v-flex xs4 sm4 md4 lg6>
                  <div><b>{{ product.name }}</b></div>
                  <div>{{ product.typeProduct }}</div>
                </v-flex>

                <!-- Price -->
                <v-flex xs4 sm4 md4 lg3 text-right>
                  <div><b>${{ (product.price * product.quantity) }}</b></div>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <!-- Skeleton Loaders -->
          <v-flex v-else py-4>
            <v-skeleton-loader
              class="mx-auto"
              width="100%"
              type="article"
            ></v-skeleton-loader>
            <v-skeleton-loader
              class="mx-auto"
              type="article"
            ></v-skeleton-loader>
          </v-flex>

          <v-divider></v-divider>

          <!-- Total -->
          <v-layout row wrap pa-4>
            <v-flex xs6>
              <span>Subtotal</span>
            </v-flex>
            <v-flex xs6 text-right>
              <span><b>${{ order.subtotal }}</b></span>
            </v-flex>
            <v-flex xs6 py-4>
              <span>Costo de envío</span>
            </v-flex>
            <!-- TODO: Shipping API -->
            <v-flex xs6 py-4 text-right>
              <span><b>${{ order.shippingCost }}</b></span>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>

          <v-layout row wrap pa-4>
            <v-flex xs6 py-4>
              <span style="font-size: 1.5em;">Total</span>
            </v-flex>
            <v-flex xs6 py-4 text-right>
              <!-- TODO: Shipping API -->
              <span style="font-size: 1.5em;"><b>${{ order.total }}</b></span>
            </v-flex>
            <v-flex xs12 py-8>
              <v-btn block color="accent" @click="pushAndResetNav('/store')">Volver a la tienda</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- Login -->
    <v-dialog max-width="600" persistent>
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
import GoogleMap from '../components/GoogleMap'

export default {
  components: {
    Login,
    GoogleMap
  },
  data: () => ({
    loading: true,
    paypalCost: null,
    isLoadingShipping: true,
    dialogSuccess: false,
    loginDialog: false,
    valid: false,
    pickup: false,
    shippingCost: null,
    orderId: '',
    user: {},
    order: null,
    shipping: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      country: 'México',
      state: '',
      zipcode: '',
      phone: ''
    },
    cartProducts: []
  }),
  methods: {
    pushAndResetNav (route) {
      if (this.$route.path !== route) {
        this.$router.push(route)
      }
    },
    getOrder () {
      // var vm = this
      var options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.get('orders/' + this.$route.params.orderId, options).then(response => {
        this.order = response.data
        if (this.order.shippingInfo.address === 'Baja California Norte') {
          this.pickup = true
        }
        this.showCart()
        this.loading = false
      }, response => {
        this.loading = false
      })
    },
    showCart () {
      this.loading = true
      var vm = this
      var options = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const ids = []

      this.order.items.forEach(function (product) {
        ids.push(product.product)
      })

      this.cartProducts = []

      this.$http.post('products/getCart', ids, options).then(response => {
        this.order.items.forEach(function (item) {
          const fullProduct = response.data.find(dbProduct => dbProduct.id === item.product)
          const fullVariation = fullProduct.variations.find(dbVariation => dbVariation._id === item.variation)
          vm.cartProducts.push({
            id: item.product,
            quantity: item.quantity,
            variation: item.variation,
            name: fullProduct.name,
            weight: fullVariation.weight,
            unit: fullVariation.unit,
            image: fullProduct.pictures[0].src,
            price: fullVariation.price,
            stock: fullVariation.stock,
            typeProduct: fullVariation.typeProduct
          })
        })
        this.loading = false
      }, response => {
        console.log(response.data)
        this.loading = false
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
        this.orderId = this.$cookies.get('orderId')
        this.getOrder()
      }, response => {
        this.loginDialog = true
      })
    },
    message () {
      console.log('success')
    }
  },
  beforeDestroy () {
    this.$cookies.remove('cart')
    this.$cookies.remove('orderId')
    this.$cookies.remove('shipping')
    this.$router.go(0)
  },
  mounted () {
  },
  created () {
    if ('user' in window.localStorage) {
      this.user = JSON.parse(window.localStorage.user)
      this.orderId = this.$cookies.get('orderId')
      this.getOrder()
    } else {
      this.getMe()
    }
  }
}
</script>

<style scoped>
.badge__item {
  z-index: 1;
  top: 0.5em;
  left: 0.25em;
}
.image {
  position: relative;
  bottom: 1.5em;
}
.hidden {
  display: none;
}
</style>
