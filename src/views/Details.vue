<template>
  <div>
    <v-container>
      <v-breadcrumbs :items="items" divider="/" large class="LGC"></v-breadcrumbs>
      <v-layout v-if="product" row wrap pb-8>
        <v-flex xs12 sm6>
          <v-img :src="product.pictures[0].src"></v-img>
        </v-flex>
        <v-flex xs12 sm6 px-8>
          <div class="poppins_bold">{{ product.name }}</div>
          <div v-if="product.variations[selectedVariation.index].discount > 0">
            <span class="poppins_small pr-3" style="font-size: 3vh"><b>$ {{ product.variations[selectedVariation.index].price.toFixed(2) }} MXN</b></span>
            <span class="poppins_small red--text" style="font-size: 3vh"><b><s>$ {{ product.variations[selectedVariation.index].discount.toFixed(2) }} MXN</s></b></span>
          </div>
          <div>
            <span class="poppins" style="font-size: 3vh"><b>$ {{ product.variations[selectedVariation.index].price.toFixed(2) }} MXN</b></span>
          </div>

          <v-layout>
            <v-rating
              v-model="rating"
              background-color="orange lighten-3"
              color="orange"
              medium
              half-increments
            ></v-rating>
            <!-- TODO: Count number of ratings -->
            <span class="pt-2 poppins_small">{{ product.rating }} (16)</span>
          </v-layout>
          <p class="poppins_small" style="font-size: 2.5vh">{{ product.description }}</p>

          <!-- Select Controls - Available-->
          <v-flex>
            <br><a class="poppins_small">Disponible</a>
            <v-layout row wrap>
              <v-flex xs12 sm6 xl4 px-2>
                <v-select
                  v-model="selectedVariation"
                  :items="availableVariations"
                  item-text="text"
                  item-value="price"
                  label="Tamaño"
                  return-object
                  dense
                  outlined
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 xl4>
                <number-input
                  v-model="quantity"
                  :value="quantity"
                  :min="1"
                  :max="9"
                  center
                  controls
                  v-on:change="checkStock(selectedVariation.index)"></number-input>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex v-if="!outOfStock" xs12 sm6 xl8 px-2 :class="{'pt-7': $vuetify.breakpoint.smAndDown, 'pt-0': $vuetify.breakpoint.mdAndUp}">
                <v-btn @click="addToCart(product.id, product.variations[selectedVariation.index]._id, quantity)" block large color="primary">Agregar al carrito</v-btn>
              </v-flex>
              <!-- Out of Stock -->
              <v-flex v-else>
                <span style="color: #b71c1c;">Lo sentimos, esta presentación no se encuentra disponible, intenta otra presentación</span>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-flex>
      </v-layout>

      <!-- Recommendations -->
      <v-layout v-if="!loadingRecommended" row wrap px-4 py-8 mx-auto>
        <v-flex md12 lg10 xl9 :class="{'text-center': $vuetify.breakpoint.smAndDown, 'text-left': $vuetify.breakpoint.mdAndUp}">
          <div class="LGC__bold_title pl-1" style="font-size: 4vh"><b>TAMBIEN TE RECOMENDAMOS...</b></div>
          <v-layout row wrap>
            <v-flex xs12 sm4 md4 px-5 py-5 v-for="product in recommendedProducts" :key="product.name">
              <v-card @click="goDetails(product.id)" hover>
                <v-img
                  :src="product.pictures[0].src"
                  lazy-src="https://picsum.photos/id/11/10/6"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  max-width="100%"
                  max-height="150px"
                ></v-img>
                <v-card-text>
                  <p class="LGC" style="font-size: 3vh;"><b>{{ product.name }}</b></p>
                  <v-layout>
                    <span class="subtitle-2"><b>$ {{ product.variations[0].price.toFixed(2) }} MXN</b></span>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout v-else row wrap>
        <v-flex xs12 sm4 md3 px-5 py-5>
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-flex>
        <v-flex xs12 sm4 md3 px-5 py-5>
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-flex>
        <v-flex xs12 sm4 md3 px-5 py-5>
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-flex>
        <v-flex xs12 sm4 md3 px-5 py-5>
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex px-4 pt-4 pb-12>
          <v-btn color="primary" @click="goStore">Seguir Comprando</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <v-snackbar v-model="snackbar">
      Producto agregado al carrito.
      <v-btn color="accent" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  components: {
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
  data: () => ({
    snackbar: false,
    loadingRecommended: true,
    outOfStock: true,
    rating: 4.3,
    quantity: 1,
    selectedTags: [],
    product: null,
    recommendedProducts: [],
    availableVariations: [],
    selectedVariation: null,
    items: [
      {
        text: 'Inicio',
        disabled: false,
        href: '/#/'
      },
      {
        text: 'Tienda',
        disabled: false,
        href: '/#/store/'
      },
      {
        text: '',
        disabled: true
      }
    ]
  }),
  methods: {
    goStore () {
      this.$router.push('/store')
      window.scrollTo(0, 0)
    },
    goDetails (id) {
      this.$router.push('/details/' + id)
      window.scrollTo(0, 0)
    },
    checkStock (index) {
      if (this.product.stock < this.quantity) {
        this.outOfStock = true
      } else {
        this.outOfStock = false
      }
    },
    getProduct () {
      var vm = this
      const options = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      this.$http.get('products/' + this.$route.params.productId, options).then(response => {
        this.product = response.data
        this.items[2].text = this.product.name
        let index = 0
        this.product.variations.forEach(function (variation) {
          // const value
          // if (variation.discount > 0) {
          //   value = variation.discount
          // } else {
          //   value = variation.price
          // }
          const value = variation.price
          const text = variation.typeProduct
          vm.availableVariations.push({ index, value, text })
          index += 1
        })
        this.selectedVariation = this.availableVariations[0]
        this.checkStock(0)
        this.getRecommended()
      }, response => {
        console.log('error', response.data)
      })
    },
    getRecommended () {
      this.loadingRecommended = true
      const options = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      this.$http.get('products/recommended/' + this.product.id + '/' + this.product.category, options).then(response => {
        this.recommendedProducts = response.data
        this.loadingRecommended = false
      }, response => {
        console.log('error', response.data)
        this.loadingRecommended = false
      })
    },
    addToCart (productId, variationId, quantity) {
      let items = this.$cookies.get('cart')
      const item = {
        product: productId,
        variation: variationId,
        quantity: quantity
      }
      if (items) {
        items = JSON.parse(items)
      } else {
        items = []
      }
      items.push(item)
      items = JSON.stringify(items)
      this.$cookies.remove('cart')
      this.$cookies.set('cart', items, '30d')
      if (this.windowSize > 2) {
        this.$emit('openCart')
      } else {
        this.snackbar = true
      }
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>

<style scoped>
.fake__serif__title{
  font-size: 5em;
}
.fake__serif {
  font-size: 4em;
}
.LGC__light {
  font-size: 1.5em;
}
.page-title {
  font-size: 3vh;
}
.sabor {
  text-align: justify;
  text-align-last: center;
}
.product_title {
  font-size: 3vh;
  color: #1b3e38;
}
.product_description {
  text-align: justify;
}
.poppins_small {
  font-size: 1em;
}
.poppins {
  font-size: 2em;
}
.poppins_bold {
  font-size: 3em;
}
.poppins_green {
  font-size: 2em;
  color: #1b3e38;
}
</style>
