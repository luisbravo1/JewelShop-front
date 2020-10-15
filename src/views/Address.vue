<template>
  <div>
    <v-container>
      <v-layout row wrap px-4>
        <v-flex xs12 px-6 py-2>
          <h1>Mis Direcciónes</h1>
        </v-flex>
        <!-- Add new address -->
        <v-flex xs12 sm6 md4 px-2 pb-4>
          <v-card outlined height="215px" class="align_center">
            <v-flex class="align_center" text-center>
              <v-icon x-large @click="newAddress">add_box</v-icon>
              <div>Agregar nueva dirección</div>
            </v-flex>
          </v-card>
        </v-flex>

        <!-- Addresses -->
        <v-flex
          xs12 sm6 md4 px-2 pb-4
          v-for="(address, index) in addresses"
          :key="index"
        >
          <v-card
            outlined
            height="215px"
          >
            <v-flex pa-4>
              <v-layout>
                <v-flex><b>{{ address.firstName }} {{ address.lastName }}</b></v-flex>
                <v-flex text-right>
                  <v-btn icon @click="changeDefault(index)">
                    <v-icon :color="address.default ? 'red' : 'grey'">mdi-heart</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
              <div>{{ address.address }}</div>
              <div>{{ address.city }}, {{ address.state }}, {{ address.country }}</div>
              <div>{{ address.zipcode }}</div>
              <div>{{ address.phone }}</div>
            </v-flex>
            <v-layout>
              <v-flex xs6 px-4>
                <v-btn small color="accent" @click="editAddress(address, index)">Editar</v-btn>
              </v-flex>
              <v-flex xs6 px-4 text-right>
                <v-btn small text color="primary" @click="deleteAddress(index)">Eliminar</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>

        <!-- Loaders -->
        <v-flex v-if="loading" xs12 sm6 md4 px-2 pb-4>
          <v-skeleton-loader
            class="mx-auto"
            type="list-item, list-item-three-line, actions"
          ></v-skeleton-loader>
        </v-flex>
        <v-flex v-if="loading" xs12 sm6 md4 px-2 pb-4>
          <v-skeleton-loader
            class="mx-auto"
            type="list-item, list-item-three-line, actions"
          ></v-skeleton-loader>
        </v-flex>
        <v-flex v-if="loading" xs12 sm6 md4 px-2 pb-4>
          <v-skeleton-loader
            class="mx-auto"
            type="list-item, list-item-three-line, actions"
          ></v-skeleton-loader>
        </v-flex>
        <v-flex v-if="loading" xs12 sm6 md4 px-2 pb-4>
          <v-skeleton-loader
            class="mx-auto"
            type="list-item, list-item-three-line, actions"
          ></v-skeleton-loader>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- Edit Address -->
    <v-dialog v-model="editDialog" max-width="600px">
      <v-card>
        <v-flex pa-4>
          <v-flex xs12 px-4 pb-4>
            <h2>Dirección de Envío</h2>
          </v-flex>
          <v-form v-model="valid">
            <v-layout row wrap px-3>
              <v-flex xs12 md6 px-4>
                <v-text-field
                  v-model="selectedAddress.firstName"
                  outlined
                  label="Nombre"
                  :rules="[() => selectedAddress.firstName.length > 2 || 'Este campo es requerido']"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6 px-4>
                <v-text-field
                  v-model="selectedAddress.lastName"
                  outlined
                  label="Apellido"
                  :rules="[() => selectedAddress.lastName.length > 2 || 'Este campo es requerido']"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-flex xs12 px-4>
              <v-text-field
                v-model="selectedAddress.address"
                outlined
                label="Dirección de Envío"
                :rules="[() => selectedAddress.address.length > 2 || 'Este campo es requerido']"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 px-4>
              <v-text-field
                v-model="selectedAddress.city"
                outlined
                label="Ciudad"
                :rules="[() => selectedAddress.city.length > 2 || 'Este campo es requerido']"
                required
              ></v-text-field>
            </v-flex>
            <v-layout row wrap px-3>
              <v-flex xs12 md4 px-4>
                <v-select
                  v-model="selectedAddress.country"
                  :items="countries"
                  outlined
                  label="País"
                  :rules="[() => selectedAddress.country.length > 2 || 'Este campo es requerido']"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 md4 px-4>
                <v-select
                  v-model="selectedAddress.state"
                  :items="states"
                  outlined
                  menu-props="auto"
                  label="Estado"
                  :rules="[() => selectedAddress.state.length > 2 || 'Este campo es requerido']"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 md4 px-4>
                <v-text-field
                  v-model="selectedAddress.zipcode"
                  outlined
                  label="Código Postal"
                  :rules="[() => selectedAddress.zipcode.length > 2 || 'Este campo es requerido']"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-flex xs12 px-4>
              <v-text-field
                v-model="selectedAddress.phone"
                outlined
                label="Teléfono"
                hint="Ingresa un número de teléfono válido"
                persistent-hint
                :rules="[() => selectedAddress.phone.length > 2 || 'Este campo es requerido']"
                required
              ></v-text-field>
            </v-flex>
            <v-layout>
              <v-flex pa-4 text-left>
                <v-btn text color="primary" @click="closeEditDialog">Cancelar</v-btn>
              </v-flex>
              <v-flex pa-4 text-right>
                <v-btn color="accent" :disabled="!valid" @click="saveAddress">Guardar</v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
      </v-card>
    </v-dialog>

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
    loading: true,
    loginDialog: false,
    editDialog: false,
    user: '',
    valid: false,
    selectedAddress: {},
    selectedIndex: null,
    addresses: [],
    countries: ['México'],
    states: ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Ciudad de México', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Edo. México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas']
  }),
  methods: {
    editAddress (address, index) {
      this.selectedIndex = index
      this.selectedAddress = Object.assign({}, address)
      this.editDialog = true
    },
    closeEditDialog () {
      this.editDialog = false
      this.selectedAddress = {}
    },
    newAddress () {
      this.selectedIndex = null
      this.selectedAddress = {}
      this.editDialog = true
    },
    saveAddress () {
      if (this.selectedIndex !== null) {
        this.addresses[this.selectedIndex] = this.selectedAddress
      } else {
        this.addresses.push(this.selectedAddress)
      }
      this.putAddresses()
      this.editDialog = false
    },
    deleteAddress (index) {
      if (confirm('Estas seguro que deseas eliminar esta dirección?')) {
        if (this.addresses[index].default === true) {
          this.addresses.splice(index, 1)
          if (this.addresses.length > 0) {
            this.addresses[0].default = true
          }
        } else {
          this.addresses.splice(index, 1)
        }
        this.putAddresses()
      }
    },
    changeDefault (index) {
      this.addresses.forEach(address => {
        address.default = false
      })
      this.addresses[index].default = true
      this.putAddresses()
    },
    getAddresses () {
      var options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      this.$http.get('users/getAddresses/' + this.user.id, options).then(response => {
        this.addresses = response.data
        this.loading = false
      }, response => {
        this.loading = false
      })
    },
    putAddresses () {
      var options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$cookies.get('authToken')
        }
      }
      var body = {
        addresses: this.addresses
      }
      this.$http.put('users/updateAddresses/' + this.user.id, body, options).then(response => {
      }, response => {
        console.log(response)
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
        this.getAddresses()
      }, response => {
        this.loginDialog = true
      })
    }
  },
  created () {
    if ('user' in window.localStorage) {
      this.user = JSON.parse(window.localStorage.user)
      this.getAddresses()
    } else {
      this.getMe()
    }
  }
}
</script>

<style scoped>
.img {
  height: 100vh;
  width: 100vh;
}
.align_center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
