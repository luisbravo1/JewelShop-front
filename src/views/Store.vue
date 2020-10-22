<template>
  <div>
    <!-- Filters -->
    <v-navigation-drawer
      v-model="drawer"
      right
      app
      persistent
      clipped
      disable-resize-watcher
      color="primary"
    >
      <br>
      <p class="white--text LGC" style="font-size: 3vh;"><b>CATEGORÍAS</b></p>
      <v-divider style="background: white;"></v-divider>
      <br>

      <div v-for="category in categories" :key="category.name">
        <p class="white--text LGC"><b>{{ category.name }}</b></p>
        <v-checkbox
          v-for="tag in category.tags"
          dark
          :key="tag.id"
          :label="tag.name"
          class="LGC"
          v-model="category.selected"
          :value="tag.value"
          hide-details
        >
        </v-checkbox>
        <br>
        <v-divider style="background: white;"></v-divider>
        <br>
      </div>
    </v-navigation-drawer>

    <v-container>
      <v-layout row wrap pt-6 px-1>
        <v-flex xs12 px-2>
          <!-- <div class="page-title afterglow"><i>Nuestra Tienda</i></div> -->
          <v-img height="300px" src="https://i.ytimg.com/vi/AHlGFIq292k/maxresdefault.jpg"></v-img>
        </v-flex>
      </v-layout>

      <v-container>
        <v-layout row wrap pt-2>
          <v-spacer></v-spacer>
          <v-flex xs12 md3>
            <v-text-field
              append-icon="search"
              outlined
              rounded
              clearable
              class="LGC"
              label="¿Qué buscas?"
              v-model="search"
              @keydown="searchProducts"
              @blur="searchProducts"
              @click:clear="resetProducts"
            >
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-layout v-if="windowSize < 2" row wrap pt-2>
          <v-btn color="primary" fab fixed bottom right open-on-hover @click="drawer = true">
            <v-icon>filter_list</v-icon>
          </v-btn>
        </v-layout>

        <v-layout row wrap>
          <v-flex v-if="windowSize >= 2" md2 pr-5>
            <p class="LGC" style="font-size: 3vh;"><b>CATEGORÍAS</b></p>
            <v-divider></v-divider>
            <br>

            <div v-for="category in categories" :key="category.name">
              <p class="LGC"><b>{{ category.name }}</b></p>
              <v-divider></v-divider>
              <v-checkbox
                v-for="tag in category.tags"
                :key="tag.id"
                :label="tag.name"
                v-model="category.selected"
                :value="tag.value"
                hide-details
                class="LGC"
                @change="filterProducts"
              >
              </v-checkbox>
              <br>
            </div>
          </v-flex>

          <v-flex md10 xs12>
            <v-layout v-if="filteredProducts.length > 0" row wrap>
              <v-flex sm12 md6 lg4 px-4 py-12 v-for="product in filteredProducts" :key="product.name">
                <v-card @click="goDetails(product.id)" hover @mouseover="product.indexPictures = 1" @mouseleave="product.indexPictures = 0">
                  <v-img
                    :src="product.pictures[product.indexPictures].src"
                    lazy-src="https://i.pinimg.com/originals/06/7e/f9/067ef929f34b75d61f7e492b0f0ec387.jpg"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="100%"
                    max-height="350px"
                  ></v-img>
                  <v-card-text>
                    <p class="LGC" style="font-size: 3vh;"><b>{{ product.name }}</b></p>
                    <v-layout>
                      <div v-if="product.variations[0].discount > 0">
                        <span class="subtitle-1 LGC__bold_title pr-3">$ {{ product.variations[0].price.toFixed(2) }} MXN</span>
                        <span class="subtitle-1 LGC__bold_title red--text"><s>$ {{ product.variations[0].discount.toFixed(2) }} MXN</s></span>
                      </div>
                      <div v-else>
                        <span class="subtitle-1 LGC__bold_title">$ {{ product.variations[0].price.toFixed(2) }} MXN</span>
                      </div>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout v-else>
              <v-flex pa-8>
                Lo sentimos, no existen productos que coincidan con su búsqueda
              </v-flex>
            </v-layout>
          </v-flex>

        </v-layout>
      </v-container>
    </v-container>

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
    dialogSuccess: false,
    drawer: false,
    search: '',
    index: 0,
    selectedTags: [],
    categories: [
      {
        selected: [],
        name: 'Tipo',
        tags: [
          {
            id: 1,
            name: 'Anillos',
            value: 'Anillos'
          },
          {
            id: 2,
            name: 'Collares',
            value: 'Collares'
          }
        ]
      }
    ],
    products: [],
    filteredProducts: []
  }),
  methods: {
    // Temporal Filter function, only works with category
    filterProducts () {
      if (this.categories[0].selected.length < 1) {
        this.filteredProducts = this.products
        return
      }
      this.filteredProducts = []
      this.products.forEach(product => {
        if (this.categories[0].selected.includes(product.category)) {
          this.filteredProducts.push(product)
        }
      })
    },
    searchProducts () {
      this.categories[0].selected = []
      if (this.search === null) {
        this.resetProducts()
      } else {
        this.filteredProducts = []
        this.products.forEach(product => {
          if (product.name.toUpperCase().includes(this.search.toUpperCase())) {
            this.filteredProducts.push(product)
          }
        })
      }
    },
    resetProducts () {
      this.search = ''
      this.filteredProducts = this.products
      this.categories[0].selected = []
    },
    goDetails (id) {
      window.scrollTo(0, 0)
      this.$router.push('/details/' + id)
    },
    getProducts () {
      const options = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      this.$http.get('products/getProducts', options).then(response => {
        console.log(response.data)
        this.products = response.data
        this.filteredProducts = this.products
        if (this.$store.state.selectedFilter !== '') {
          this.filterProducts()
        }
      }, response => {
        console.log('error')
      })
    }
  },
  mounted () {
    this.getProducts()
  },
  beforeDestroy () {
    this.$store.commit('filter', '')
  },
  created () {
    if (this.$store.state.selectedFilter !== '') {
      this.categories[0].selected.push(this.$store.state.selectedFilter)
    }
  }
}
</script>

<style scoped>
</style>
