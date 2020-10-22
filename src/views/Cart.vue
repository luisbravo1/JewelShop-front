<template>
  <div>
    <v-container fluid>
      <v-layout row wrap px-4 py-4>
        <v-flex xs12>
          <v-breadcrumbs :items="links" divider="/" large></v-breadcrumbs>
        </v-flex>
        <!-- Shopping Cart -->
        <v-flex xs12 md8>
          <v-flex xs12 px-4 pb-2>
            <h2>Mi Carrito ({{ items }})</h2>
          </v-flex>
          <div v-if="!loading">
            <!-- Shopping Cart Desktop -->
            <div v-if="cartProducts.length > 0 && windowSize > 2">
              <v-flex
                v-for="(product, index) in cartProducts"
                :key="product.id"
                xs12 px-4 py-2
              >
                <v-card outlined>
                  <v-layout align-center>
                    <!-- Erase -->
                    <v-flex xs1 text-center>
                      <v-btn icon @click="deleteProduct(index)">
                        <v-icon>cancel</v-icon>
                      </v-btn>
                    </v-flex>

                    <!-- Picture -->
                    <v-flex xs2 pa-2>
                      <v-img aspect-ratio="1" max-width="60%" :src="product.image"></v-img>
                    </v-flex>

                    <!-- Info -->
                    <v-flex xs2>
                      <div><b>{{ product.name }}</b></div>
                      <div>{{ product.typeProduct }}</div>
                    </v-flex>

                    <!-- Stock -->
                    <v-flex xs2>
                      <span v-if="product.stock >= product.quantity" style="color: green;"> Disponible</span>
                      <span v-else style="color: red;"> No disponible</span>
                    </v-flex>

                    <!-- Price -->
                    <v-flex xs1>
                      <div>c/u</div>
                      <div><b>${{ product.price.toFixed(2) }}</b></div>
                    </v-flex>

                    <!-- Controls -->
                    <v-flex xs2 px-4>
                      <number-input
                        v-model="product.quantity"
                        :value="product.quantity"
                        :min="1"
                        :max="9"
                        inline
                        center
                        controls
                        size="small"
                        v-on:change="modifyCart(product)"
                      ></number-input>
                    </v-flex>

                    <!-- Total -->
                    <v-flex xs1>
                      <div>Total</div>
                      <div><b>${{ (product.price * product.quantity).toFixed(2) }}</b></div>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </div>

            <!-- Shopping Cart Mobile -->
            <div v-else-if="cartProducts.length > 0 && windowSize <= 2">
              <v-list three-line>
                <template v-for="(product, index) in cartProducts">
                  <v-divider
                    v-if="index !== 0"
                    :key="index"
                  ></v-divider>

                  <v-list-item
                    :key="product.id"
                  >
                    <v-flex xs5 pa-2>
                      <v-img aspect-ratio="1" class="image" min-width="90px" max-width="50%" :src="product.image"></v-img>
                    </v-flex>

                    <v-list-item-content>
                      <v-list-item-title>{{ product.name}}</v-list-item-title>
                      <v-list-item-subtitle class="text--primary">${{ product.price.toFixed(2) }}</v-list-item-subtitle>
                      <v-list-item-subtitle>{{ product.typeProduct }}</v-list-item-subtitle>
                      <v-list-item-subtitle>
                        <v-flex xs12 pt-4>
                          <number-input
                            v-model="product.quantity"
                            :value="product.quantity"
                            :min="1"
                            :max="9"
                            center
                            inline
                            controls
                            size="small"
                            v-on:change="modifyCart(product)"
                          ></number-input>
                        </v-flex>
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn icon @click="deleteProduct(index)">
                        <v-icon>cancel</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </v-list>
            </div>
            <!-- Shopping Cart Empty -->
            <v-flex v-else xs12 md8 py-8 px-4>
              <h2>Tu carrito está vacío :(</h2>
            </v-flex>
          </div>

          <!-- Skeleton Loaders -->
          <div v-else>
            <v-flex :class="{'py-4': $vuetify.breakpoint.smAndDown, 'pa-4': $vuetify.breakpoint.mdAndUp}">
              <v-skeleton-loader
                class="mx-auto"
                width="100%"
                type="article"
              ></v-skeleton-loader>
              <v-skeleton-loader
                class="mx-auto"
                type="article"
              ></v-skeleton-loader>
              <v-skeleton-loader
                class="mx-auto"
                type="article"
              ></v-skeleton-loader>
            </v-flex>
          </div>
        </v-flex>

        <v-divider vertical></v-divider>

        <!-- Subtotal -->
        <v-flex xs12 md3 px-4 pt-8>
          <v-layout row wrap pa-4>
            <v-flex xs6>
              <span>Subtotal</span>
            </v-flex>
            <v-flex xs6 text-right>
              <span><b>${{ subtotal }}</b></span>
            </v-flex>
            <v-flex xs6 py-4>
              <span>Envío</span>
            </v-flex>
            <v-flex xs6 py-4 text-right>
              <span>En el siguiente paso</span>
            </v-flex>
            <v-flex xs12 pa-4>
              <v-btn
                block
                large
                color="accent"
                :disabled="cartProducts.length < 1 || outOfStock"
                :loading="loading"
                @click="pushAndResetNav('/checkout')"
              >Envío a domicilio</v-btn>
              <div v-if="outOfStock" style="color: red;">Uno de los productos seleccionados no se encuentra disponible</div>
            </v-flex>
            <v-flex xs12 py-5 text-center>
              <v-divider></v-divider>
              <span style="color:gray;" class="text-center .font-italic font-weight-light">Envío a domicilio o Recoger en tienda</span>
            </v-flex>
            <v-flex px-4>
              <v-btn
                block
                large
                color="primary"
                :disabled="cartProducts.length < 1 || outOfStock"
                :loading="loading"
                @click="pickupStore"
              >Recoger en tienda</v-btn>
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
  </div>
</template>

<script>
import Login from './Login.vue'

export default {
  components: {
    Login
  },
  data: () => ({
    loginDialog: false,
    outOfStock: false,
    loading: true,
    user: '',
    cartProducts: '',
    pickupAddress: {
      firstName: '',
      address: 'address',
      city: 'Tijuana',
      country: 'México',
      state: 'Baja California Norte',
      zipcode: '66220',
      phone: '8123424672'
    },
    links: [
      {
        text: 'Carrito',
        disabled: false
      },
      {
        text: 'Dirección de Envío',
        disabled: true
      },
      {
        text: 'Confirmación',
        disabled: true
      },
      {
        text: 'Pago',
        disabled: true
      }
    ]
  }),
  computed: {
    subtotal () {
      var vm = this
      var totalPrice = 0
      this.cartProducts.forEach(product => {
        totalPrice += product.price * product.quantity
        if (product.stock < 1) {
          vm.outOfStock = true
        }
      })
      return totalPrice
    },
    items () {
      var items = this.cartProducts.length
      if (items === 1) {
        return items + ' artículo'
      } else {
        return items + ' artículos'
      }
    },
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
  methods: {
    pushAndResetNav (route) {
      if (this.$route.path !== route) {
        this.$router.push(route)
      }
    },
    deleteProduct (index) {
      this.cartProducts.splice(index, 1)
      this.modifyCart()
    },
    modifyCart (selectedProduct) {
      if (selectedProduct) {
        if (selectedProduct.stock < selectedProduct.quantity) {
          this.outOfStock = true
          return
        } else {
          this.outOfStock = false
        }
      }
      const ids = []
      this.cartProducts.forEach(product => {
        const tempProduct = {
          product: product.id,
          quantity: product.quantity,
          variation: product.variation,
          typeProduct: product.typeProduct
        }
        ids.push(tempProduct)
      })

      const cartItems = JSON.stringify(ids)

      this.$cookies.remove('cart')
      this.$cookies.set('cart', cartItems, '30d')
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
    // Only works when selecting 'Pick Up at Store' Option
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
          productType: product.productType
        }
        ids.push(tempProduct)
      })

      const order = {
        type: 'product',
        subtotal: subtotalProducts,
        shippingCost: 0,
        total: subtotalProducts,
        shippingInfo: this.pickupAddress,
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
    },
    pickupStore () {
      const shipAddress = JSON.stringify(this.pickupAddress)

      this.$cookies.remove('shipping')
      this.$cookies.set('shipping', shipAddress, '30d')
      this.postOrder()
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
        this.pickupAddress.firstName = this.user.name
      }, response => {
        this.loginDialog = true
      })
    }
  },
  created () {
    this.getMe()
    this.showCart()
  }
}
</script>

<style scoped>
.image {
  position: relative;
  margin: auto;
}
</style>
