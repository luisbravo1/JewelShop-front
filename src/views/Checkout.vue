<template>
  <div>
    <v-container fluid>
      <v-layout row wrap py-4>
        <v-flex xs12 md6 :class="{'px-4': $vuetify.breakpoint.smAndDown, 'px-8': $vuetify.breakpoint.mdAndUp}">
          <v-flex xs12>
            <v-breadcrumbs :items="links" divider="/" large></v-breadcrumbs>
          </v-flex>
          <!-- Shipping Info -->
          <v-flex xs12 px-4 pb-4>
            <h2>Dirección de Envío</h2>
          </v-flex>
          <v-form v-model="valid">
            <v-layout row wrap px-3>
              <v-flex xs12 px-4>
                <place-autocomplete-field
                  v-model="field1"
                  placeholder="Escribe una dirección, código postal o lugar"
                  name="field1"
                  label="Busca tu dirección"
                  api-key="AIzaSyDkmwMIVAdI6mZQF2KkqKVa7dl2pGThDXk"
                  v-place-autofill:street="shipping.address"
                  v-place-autofill:city="shipping.city"
                  v-place-autofill:zipcode="shipping.zipcode"
                  v-place-autofill:state="shipping.state"
                >
                </place-autocomplete-field>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12 md6 px-4>
                <v-text-field
                  v-model="shipping.firstName"
                  outlined
                  label="Nombre"
                  :rules="[() => shipping.firstName.length > 2 || 'Este campo es requerido']"
                  :loading="loadingAddress"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6 px-4>
                <v-text-field
                  v-model="shipping.lastName"
                  outlined
                  label="Apellido"
                  :rules="[() => shipping.lastName.length > 2 || 'Este campo es requerido']"
                  :loading="loadingAddress"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-flex xs12 px-4>
              <v-text-field
                v-model="shipping.address"
                outlined
                label="Dirección de Envío"
                :rules="[() => shipping.address.length > 2 || 'Este campo es requerido']"
                :loading="loadingAddress"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 px-4>
              <v-text-field
                v-model="shipping.city"
                outlined
                label="Ciudad"
                :rules="[() => shipping.city.length > 2 || 'Este campo es requerido']"
                :loading="loadingAddress"
                required
              ></v-text-field>
            </v-flex>
            <v-layout row wrap px-3>
              <v-flex xs12 md4 px-4>
                <v-select
                  v-model="shipping.country"
                  :items="countries"
                  outlined
                  label="País"
                  :rules="[() => shipping.country.length > 2 || 'Este campo es requerido']"
                  :loading="loadingAddress"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 md4 px-4>
                <v-select
                  v-model="shipping.state"
                  :items="states"
                  outlined
                  menu-props="auto"
                  label="Estado"
                  :rules="[() => shipping.state.length > 2 || 'Este campo es requerido']"
                  :loading="loadingAddress"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 md4 px-4>
                <v-text-field
                  v-model="shipping.zipcode"
                  outlined
                  label="Código Postal"
                  :rules="[() => shipping.zipcode.length === 5 || 'Este campo es requerido']"
                  :loading="loadingAddress"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-flex xs12 px-4>
              <v-text-field
                v-model="shipping.phone"
                outlined
                label="Teléfono"
                hint="Ingresa un número de teléfono válido"
                persistent-hint
                :rules="[() => shipping.phone.length > 2 || 'Este campo es requerido']"
                :loading="loadingAddress"
                required
              ></v-text-field>
            </v-flex>
          </v-form>
          <v-flex xs6 py-4 :class="{'hidden': $vuetify.breakpoint.smAndDown, '': $vuetify.breakpoint.mdAndUp}">
            <v-btn text color="primary" @click="pushAndResetNav('/cart')">Regresar al carrito</v-btn>
          </v-flex>
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
                    <v-img
                      aspect-ratio="1"
                      min-width="90px"
                      max-width="60%"
                      :src="product.image"
                    ></v-img>
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
              <span>
                <b>${{ shippingCost }}</b>
              </span>
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
            <v-flex xs6 py-8 :class="{'': $vuetify.breakpoint.smAndDown, 'hidden': $vuetify.breakpoint.mdAndUp}">
              <v-btn text color="primary" @click="pushAndResetNav('/cart')">Regresar</v-btn>
            </v-flex>
            <v-flex xs6 md12 py-8 text-right>
              <v-btn
                color="accent"
                :disabled="loginDialog || !valid || subtotal < 1 || isLoadingShipping"
                :loading="loading"
                @click="postOrder"
              >Confirmación</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- Login -->
    <v-dialog v-model="loginDialog" max-width="600" persistent>
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

export default {
  components: {
    Login
  },
  data: () => ({
    isLoadingShipping: false,
    isPostingOrder: false,
    loading: true,
    loadingAddress: false,
    dialogSuccess: false,
    loginDialog: false,
    valid: false,
    field1: '',
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
    shippingCost: 99,
    cartProducts: [],
    links: [
      {
        text: 'Carrito',
        disabled: false,
        href: '/#/cart'
      },
      {
        text: 'Dirección de Envío',
        disabled: false
      },
      {
        text: 'Confirmación',
        disabled: true
      },
      {
        text: 'Pago',
        disabled: true
      }
    ],
    countries: ['México'],
    states: ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Ciudad de México', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Edo. México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas']
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
    },
    shippingWeight () {
      var totalWeight = 0
      this.cartProducts.forEach(product => {
        if (product.unit === 'g') {
          totalWeight += product.weight * product.quantity * 0.001
        } else {
          totalWeight += product.weight * product.quantity
        }
      })
      return totalWeight
    }
  },
  methods: {
    pushAndResetNav (route) {
      this.confirmAddress()
      if (this.$route.path !== route) {
        this.$router.push(route)
      }
    },
    getShipping () {
      this.shipping = this.$cookies.get('shipping')
      // this.calculateShippingCost()
    },
    confirmAddress () {
      const shipAddress = JSON.stringify(this.shipping)

      this.$cookies.remove('shipping')
      this.$cookies.set('shipping', shipAddress, '30d')
    },
    getAddress () {
      this.loadingAddress = true
      var options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.get('users/getDefaultAddress/' + this.user.id, options).then(response => {
        // If there is a default address, select that one and calculate shipping cost
        if (response.data.default === true) {
          this.shipping = response.data
          // this.calculateShippingCost()
        // Else if there is a cookie with shipping info, select that one and calculate shipping cost
        } else if (this.$cookies.isKey('shipping')) {
          this.getShipping()
        }
        this.loadingAddress = false
      }, response => {
        this.loadingAddress = false
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
        this.getAddress()
      }, response => {
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
        this.getAddress()
      }, response => {
        this.loginDialog = true
      })
    },
    // calculateShippingCost () {
    //   this.isLoadingShipping = true
    //   var vm = this
    //   var options = {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   }
    //   if (this.shipping.zipcode.length === 5) {
    //     const shipment = {
    //       weight: this.shippingWeight,
    //       zipcode: this.shipping.zipcode
    //     }
    //     this.$http.post('products/shipCost', shipment, options).then(response => {
    //       vm.shippingCost = Number(response.data)
    //       vm.isLoadingShipping = false
    //     }, response => {
    //       console.log(response.data)
    //     })
    //   }
    // },
    postOrder () {
      var vm = this
      this.loading = true
      this.isPostingOrder = true
      var options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$cookies.get('authToken')
        }
      }

      const ids = []
      let totalQuantity = 0
      let subtotalProducts = 0
      this.cartProducts.forEach(product => {
        totalQuantity += product.quantity
        subtotalProducts += product.price * product.quantity
        const tempProduct = {
          product: product.id,
          quantity: product.quantity,
          variation: product.variation,
          price: product.price,
          typeProduct: product.typeProduct
        }
        ids.push(tempProduct)
      })

      const order = {
        type: 'product',
        subtotal: subtotalProducts,
        shippingCost: this.shippingCost,
        total: subtotalProducts + this.shippingCost,
        shippingInfo: this.shipping,
        items: ids,
        totalQuantity: totalQuantity
      }

      this.$http.post('orders', order, options).then(response => {
        vm.isPostingOrder = false
        vm.$cookies.set('orderId', response.data.id, '30d')
        vm.pushAndResetNav('/confirmation')
        vm.loading = false
      }, response => {
        console.log(response.data)
        vm.isPostingOrder = false
        vm.loading = false
      })
    }
  },
  mounted () {
  },
  created () {
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
