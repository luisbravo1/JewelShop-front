<template>
  <div>
    <v-container fluid>
      <v-layout row wrap py-4>
        <v-flex xs12 md6 :class="{'px-4': $vuetify.breakpoint.smAndDown, 'px-8': $vuetify.breakpoint.mdAndUp}">
          <v-flex xs12>
            <v-breadcrumbs :items="links" divider="/" large></v-breadcrumbs>
          </v-flex>
          <v-flex pb-4>
            <v-card outlined>
              <div>
                <GoogleMap :shipping="shipping"></GoogleMap>
              </div>
            </v-card>
          </v-flex>
          <!-- Shipping Info -->
          <v-card outlined>
            <v-flex xs12 pa-5>
              <h2>Información del cliente</h2>
            </v-flex>
            <v-layout row wrap px-8>
              <v-flex xs12 md6 pb-4>
                <h4>Información de contacto</h4>
                <div>{{ user.name }}</div>
                <div>{{ user.email }}</div>
              </v-flex>
              <v-flex xs12 md6 pb-4>
                <h4 v-if="!pickup">Información de envío</h4>
                <h4 v-else>Punto de entrega</h4>
                <div>{{ shipping.firstName }} {{ shipping.lastName }}</div>
                <div>{{ shipping.address }}</div>
                <div>{{ shipping.city }}, {{ shipping.state }}, {{ shipping.country }}</div>
                <div>{{ shipping.zipcode }}</div>
                <div>{{ shipping.phone }}</div>
              </v-flex>
            </v-layout>
            <v-flex v-if="!pickup" xs6 py-4 :class="{'hidden': $vuetify.breakpoint.smAndDown, '': $vuetify.breakpoint.mdAndUp}">
              <v-btn text color="primary" @click="pushAndResetNav('/checkout')">Modificar Dirección</v-btn>
            </v-flex>
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
              <span><b>${{ subtotal }}</b></span>
            </v-flex>
            <v-flex xs6 py-4>
              <span>Costo de envío</span>
            </v-flex>
            <v-flex xs6 py-4 text-right>
              <span><b>${{ shippingCost }}</b></span>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>

          <v-layout row wrap pa-4>
            <v-flex xs6 py-4>
              <span style="font-size: 1.5em;">Total</span>
            </v-flex>
            <v-flex xs6 py-4 text-right>
              <span style="font-size: 1.5em;"><b>${{ total }}</b></span>
            </v-flex>
            <v-flex v-if="!pickup" xs6 py-8 :class="{'': $vuetify.breakpoint.smAndDown, 'hidden': $vuetify.breakpoint.mdAndUp}">
              <v-btn text color="primary" @click="pushAndResetNav('/checkout')">Modificar</v-btn>
            </v-flex>

            <!-- <v-flex xs6 md4 py-4 text-center>
              <div v-if="!loadPP && (subtotal > 0) && !isLoadingShipping && paypalCost" class="pt-1">
                <v-btn color="accent">
                  Tarjeta Crédito
                </v-btn>
              </div>
              <div v-else>
                <v-progress-circular color="accent" indeterminate></v-progress-circular>
              </div>
            </v-flex>
            <v-divider vertical></v-divider> -->
            <v-flex xs12 md12 pt-5>
              <div v-if="!loadPP && (subtotal > 0) && paypalCost" class="pt-1">
                <!-- <v-btn @click="payWithStripe" class="text-none text-center" block large dark color="black">Pagar con Tarjeta</v-btn> -->
                <br>
                <v-divider></v-divider>
                <div class="text-center">
                  <span style="color:gray;" class="text-center .font-italic font-weight-light">Paga con tarjeta o con PayPal</span>
                  <br><br>
                  <PayPal
                    style="margin:auto;"
                    :amount="paypalCost"
                    currency="MXN"
                    :client="credentials"
                    env="sandbox"
                    :notify-url="paypalIpn"
                    @payment-completed="message"
                    :button-style="style"
                    :invoice-number="JSON.stringify(customPaypal)"
                  >
                  </PayPal>
                </div>
              </div>
              <div v-else>
                <v-progress-circular color="accent" indeterminate></v-progress-circular>
              </div>
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
import PayPal from 'vue-paypal-checkout'
import Login from './Login.vue'
import GoogleMap from '../components/GoogleMap'

export default {
  components: {
    PayPal,
    Login,
    GoogleMap
  },
  data: () => ({
    loadPP: true,
    loading: true,
    paypalCost: null,
    isLoadingShipping: true,
    dialogSuccess: false,
    loginDialog: false,
    valid: false,
    pickup: false,
    shippingCost: 99,
    paypalIpn: 'https://jewel-shop-back.herokuapp.com/ipns',
    customPaypal: {},
    user: {},
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
    style: {
      size: 'medium',
      color: 'gold',
      shape: 'rect',
      label: 'checkout',
      tagline: 'true'
    },
    cartProducts: [],
    links: [
      {
        text: 'Carrito',
        disabled: false,
        href: '/#/cart'
      },
      {
        text: 'Dirección de Envío',
        disabled: false,
        href: '/#/checkout'
      },
      {
        text: 'Confirmación',
        disabled: false
      },
      {
        text: 'Pago',
        disabled: true
      }
    ],
    countries: ['México'],
    states: ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Ciudad de México', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Edo. México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'],
    credentials: {
      production: '',
      sandbox: 'AZHh6WABK6B4O6aubxj8CfMvTuEcMElcOXHoos-sZPs0hGxfoNW14jEGRlf4vj-YX6bxVNaPkaVbS99F'
    }
  }),
  computed: {
    subtotal () {
      var totalPrice = 0
      this.cartProducts.forEach(product => {
        totalPrice += product.price * product.quantity
      })
      return totalPrice
    },
    total () {
      return this.subtotal + this.shippingCost
    }
  },
  methods: {
    pushAndResetNav (route) {
      if (this.$route.path !== route) {
        this.$router.push(route)
      }
    },
    getShipping () {
      this.shipping = this.$cookies.get('shipping')
      if (this.shipping.address === 'Tijuana, Baja California') {
        this.shippingCost = 0
        this.isLoadingShipping = false
        this.pickup = true
        this.links[1].disabled = true
      }
    },
    showCart () {
      this.loading = true
      var vm = this
      var options = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const cartItems = JSON.parse(this.$cookies.get('cart'))
      if (!cartItems) {
        return
      }
      const ids = []

      cartItems.forEach(function (product) {
        ids.push(product.product)
      })

      this.cartProducts = []

      this.$http.post('products/getCart', ids, options).then(response => {
        cartItems.forEach(function (item) {
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
        this.loadPP = false
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
      }, response => {
        this.loginDialog = true
      })
    },
    getOrderPrice () {
      const orderId = this.$cookies.get('orderId')
      var options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      console.log('ola')
      this.$http.get('orders/price/' + orderId, options).then(response => {
        this.paypalCost = String(response.data.total)
        this.customPaypal = {
          oId: orderId,
          uId: this.user.id,
          t: 'p'
        }
      }, response => {
        console.log('error: ', response.data)
      })
    },
    message () {
      this.pushAndResetNav('/completedPurchase/' + this.$cookies.get('orderId'))
      console.log('success')
    },
    payWithStripe () {
      var options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      var stripe = window.Stripe('pk_test_51HkH7OKn4JRxfLpq66FPLiNvU1TTYhK6WefgpVDmpVhPTDTurnlxZH5Ktpyy6Xdni6yRbLQNPGRU9GxpZYHSVnFs00NOdLgKpJ')

      this.$http.get('orders/' + this.$cookies.get('orderId'), options).then(response => {
        stripe.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: response.data.stripeSession
        }).then(function (result) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        })
      }, response => {
        console.log(response.data)
      })
    }
  },
  mounted () {
    this.getOrderPrice()
  },
  destroyed () {
    if (this.shipping.address === 'Rio Volga 120 Ote, Del Valle') {
      this.$cookies.remove('shipping')
    }
  },
  created () {
    this.getShipping()
    this.showCart()
    if ('user' in window.localStorage) {
      this.user = JSON.parse(window.localStorage.user)
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
