<template>
  <div class="home">
    <v-container>
      <v-layout row wrap pt-6 px-1>
        <v-flex xs12 px-2>
          <!-- <div class="page-title afterglow"><i>Nuestra Tienda</i></div> -->
          <v-img
            height="300px"
            src="https://images.unsplash.com/photo-1589674781759-c21c37956a44"
          ></v-img>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container>
      <v-flex xs12 px-8 py-2>
        <h1>Joyería de plata</h1>
      </v-flex>
      <v-layout row wrap pt-6 px-1>
        <v-col md6 lg4>
          <v-card class="mx-auto">
            <v-img
              src="https://images.unsplash.com/photo-1510074229140-bdfc2ff28550"
              width="300px"
              height="200px"
            >
            </v-img>
            <v-card-actions>
              <v-btn to="/store" color="gray lighten-2" text> Collares </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md6 lg4>
          <v-card class="mx-auto">
            <v-img
              src="https://images.unsplash.com/photo-1516700829972-65a01767c294"
              width="300px"
              height="200px"
            >
            </v-img>
            <v-card-actions>
              <v-btn to="/store" color="gray lighten-2" text> Pulseras </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md6 lg4>
          <v-card class="mx-auto">
            <v-img
              src="https://images.unsplash.com/photo-1552334543-63c1f649eece"
              width="300px"
              height="200px"
            >
            </v-img>
            <v-card-actions>
              <v-btn to="/store" color="gray lighten-2" text> Anillos </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-layout>
      <v-layout row pt-6>
        <v-col md6 lg4>
          <v-card class="mx-auto">
            <v-img
              src="https://images.unsplash.com/photo-1475179593777-bd12fd56b85d"
              width="300px"
              height="200px"
            >
            </v-img>
            <v-card-actions>
              <v-btn to="/store" color="gray lighten-2" text> Aretes </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md6 lg4>
          <v-card class="mx-auto">
            <v-img
              src="https://techstory.in/wp-content/uploads/2020/08/image1-5.jpg"
              width="300px"
              height="200px"
            >
            </v-img>
            <v-card-actions>
              <v-btn to="/store" color="gray lighten-2" text> Tobilleras </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md6 lg4>
          <v-card class="mx-auto">
            <v-img
              src="https://images.unsplash.com/photo-1549048799-bf3b582ee17b"
              width="300px"
              height="200px"
            >
            </v-img>
            <v-card-actions>
              <v-btn
                to="/store"
                color="gray lighten-2"
                text
              >
              Explorar </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-layout>
    </v-container>

    <v-container>
      <v-flex class="d-flex justify-center">
        <v-btn x-large color="black" dark to="/store"> Ver más </v-btn>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {}
}
</script>
