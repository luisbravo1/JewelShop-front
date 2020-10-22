<template>
  <v-app>
    <v-navigation-drawer
      v-model="cartDrawer"
      app
      temporary
      right
      disable-resize-watcher
      width="512"
    >
      <v-list-item>
        <v-list-item-content class="text-center">
          <v-list-item-title class="title">
            Mi Carrito
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-layout row>
        <v-flex xs12 v-if="cartProducts.length > 0">
          <v-container>
            <v-layout v-for="(product, index) in cartProducts" :key="product.name" align-center>
              <v-flex xs4 px-5 py-3>
                <v-img height="120px" width="120px" :src="product.image"></v-img>
              </v-flex>
              <v-flex xs5>
                <p class="title font-weight-regular">{{ product.name }}</p>
                <p>${{ product.price }} c/u</p>
                <number-input
                  v-model="product.quantity"
                  :value="product.quantity"
                  :min="1"
                  :max="9"
                  center
                  inline
                  size="small"
                  controls
                  v-on:change="modifyCart(product)"></number-input>
              </v-flex>
              <v-flex xs2 class="text-center">
                <span>${{ product.price * product.quantity }}</span>
              </v-flex>
              <v-flex xs1>
                <v-btn icon @click="deleteProduct(index)">
                  <v-icon>cancel</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>

            <v-divider></v-divider>
            <v-layout row>
              <v-flex xs12 px-5 py-2>
                <p class="text-right title">Subtotal</p>
                <p class="text-right title">$ {{ total }}.00 MXN</p>
              </v-flex>
              <v-flex xs12 px-5 py-2>
                <v-btn block color="accent" @click="pushAndResetNav('/cart')" :disabled="outOfStock || cartProducts.length < 1">Checkout</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>

        <v-flex xs12 v-else>
          <v-container>
            <v-layout align-center>
              <v-flex xs12 px-5 py-3>
                <span>Tu carrito esta vacio :(</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>

    </v-navigation-drawer>

    <div v-if="windowSize < 2">
      <v-app-bar
        app
        color="primary"
        dark
        clipped-left
      >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <img class="mr-3" width="60vw" src=""/>
        <v-toolbar-title class="logo">JEWELSHOP</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        app
        persistent
        clipped
        disable-resize-watcher
        color="primary"
      >
        <v-list-item dark>
          <v-list-item-content class="text-center">
            <v-list-item-title class="title">
              <v-img
                alt="Cadataza logo"
                class="shrink"
                contain
                src=""
                transition="scale-transition"
                width="100%"
                @click="pushAndResetNav('/')"
              />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
          dark
          nav
        >
          <v-list-item
            v-for="item in linksMobile"
            :key="item.text"
            link
            @click="pushAndResetNav(item.to)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </v-navigation-drawer>
    </div>

    <div v-else>
      <v-app-bar
        app
        color="primary"
        dark
        clipped-left
      >
        <div class="d-flex align-center clickable">
          <!-- <v-img
            alt="JewelShop logo"
            class="shrink mr-2"
            contain
            src="./assets/logo.png"
            transition="scale-transition"
            width="200"
            @click="pushAndResetNav('/')"
          /> -->
          JewelShop
        </div>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn
            class="font-weight-regular"
            v-for="link in links"
            :key="link.text"
            text
            @click="pushAndResetNav(link.to)"
          >
            <span>{{ link.text }}</span>
          </v-btn>

          <v-menu bottom offset-y dark open-on-hover color="red">
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                text
                v-on="on"
                class="font-weight-regular"
              >
                Mi Cuenta
              </v-btn>
            </template>

            <v-list v-if="user === null">
              <v-list-item @click="loginDialog = true">
                <v-list-item-title>Iniciar Sesión</v-list-item-title>
              </v-list-item>
            </v-list>

            <v-list v-else>
              <v-list-item @click="pushAndResetNav('/account')">
                <v-list-item-title>Contacto</v-list-item-title>
              </v-list-item>
              <v-list-item @click="pushAndResetNav('/address')">
                <v-list-item-title>Direcciónes</v-list-item-title>
              </v-list-item>
              <v-list-item @click="pushAndResetNav('/orders')">
                <v-list-item-title>Pedidos</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="user.role === 'admin'" @click="pushAndResetNav('/adminOrders')">
                <v-list-item-title>Admin Pedidos</v-list-item-title>
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-title>Cerrar Sesión</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn text @click="openCart" :disabled="['cart', 'checkout', 'confirmation', 'completedPurchase'].indexOf($route.name) > -1 ? true : false">
            <v-badge color="accent">
              <template v-slot:badge>{{ items }}</template>
              <v-icon>shopping_cart</v-icon>
            </v-badge>
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>
    </div>

    <v-main>
      <router-view :key="$route.fullPath" @openCart="openCart"/>
    </v-main>

    <v-footer padless>
      <v-card
        flat
        tile
        width="100%"
        absolute
        class="lighten-1 white--text text-center"
        color="primary"
      >
        <v-layout row wrap pa-12>
          <v-flex xs11 sm6 md3 offset-xs1 offset-sm4 offset-md1 text-left pt-6 pb-4>
            <div class="LGC"><v-icon medium color="accent" class="px-4">phone</v-icon>81 3456 7890</div>
            <div class="LGC"><v-icon medium color="accent" class="px-4">room</v-icon>Tijuana, Baja California</div>
            <div class="LGC"><v-icon medium color="accent" class="px-4">mail</v-icon>INFO@JEWELSHOP.COM</div>
          </v-flex>
          <v-flex xs12 md5 offset-md1>
            <div>
              <v-btn
                v-for="media in socialMedia"
                :key="media.link"
                class="mx-4 white--text"
                fab
                target="_blank"
                :href="media.link"
                color="accent"
                rounded
                depressed
                small
              >
                <v-icon size="24px">{{ media.icon }}</v-icon>
              </v-btn>
            </div>

            <div class="white--text py-4 LGC">
              Métodos de pago:
            </div>
            <v-img max-width="40%" style="margin: auto;" src="https://s3.amazonaws.com/ct.image/creditcards.png"></v-img>
            <div class="white--text LGC pt-4">
              COPYRIGHT © {{ new Date().getFullYear() }} - JewelShop
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-footer>

    <!-- Login -->
    <v-dialog v-model="loginDialog" max-width="600">
      <v-card>
        <Login></Login>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Login from './views/Login.vue'

export default {
  name: 'App',
  components: {
    Login
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
    },
    items () {
      let items = 0
      this.cartProducts.forEach(product => {
        items += product.quantity
      })
      return items
    },
    total () {
      let value = 0
      this.cartProducts.forEach(function (product) {
        value += product.price * product.quantity
      })
      return value
    }
  },
  data: () => ({
    loginDialog: false,
    outOfStock: false,
    drawer: false,
    cartDrawer: false,
    user: null,
    cartProducts: [],
    links: [
      {
        to: '/about',
        text: 'Quiénes somos',
        icon: 'info'
      },
      {
        to: '/store',
        text: 'Tienda',
        icon: 'store'
      }
    ],
    linksMobile: [
      {
        to: '/',
        text: 'Inicio',
        icon: 'home'
      },
      {
        to: '/about',
        text: 'Quiénes somos',
        icon: 'info'
      },
      {
        to: '/store',
        text: 'Tienda',
        icon: 'store'
      },
      {
        to: '/profile',
        text: 'Mi cuenta',
        icon: 'account_circle'
      },
      {
        to: '/cart',
        text: 'Mi carrito',
        icon: 'shopping_cart'
      }
    ],
    socialMedia: [
      {
        link: 'https://instagram.com/',
        icon: 'fab fa-instagram'
      },
      {
        link: 'https://facebook.com/',
        icon: 'fab fa-facebook-f'
      },
      {
        link: '',
        icon: 'fab fa-whatsapp'
      }
    ]
  }),
  methods: {
    pushAndResetNav (route) {
      this.drawer = false
      if (this.$route.path !== route) {
        this.$router.push(route)
      }
    },
    logout () {
      localStorage.clear()
      this.$cookies.remove('authToken')
      this.$cookies.remove('shipping')
      this.$cookies.remove('cart')
      this.$router.push('/')
      this.$router.go(0)
    },
    getMe () {
      this.isSending = true
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
      })
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
          coffeeType: product.coffeeType
        }
        ids.push(tempProduct)
      })
      const cartItems = JSON.stringify(ids)

      this.$cookies.remove('cart')
      this.$cookies.set('cart', cartItems, '30d')
    },
    openCart () {
      this.cartDrawer = !this.cartDrawer
      this.showCart()
    },
    showCart () {
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
            variation: item.variation,
            name: fullProduct.name + ' - ' + fullVariation.typeProduct,
            image: fullProduct.pictures[0].src,
            quantity: item.quantity,
            price: fullVariation.price,
            stock: fullVariation.stock,
            typeProduct: fullVariation.typeProduct
          })
        })
      }, response => {
        console.log(response.data)
      })
    }
  },
  created () {
    if ('user' in window.localStorage) {
      this.user = JSON.parse(window.localStorage.user)
    } else {
      this.getMe()
    }
    this.showCart()
  }
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
.footer_bg {
  background-size: cover;
  background-position: center;
}
</style>
