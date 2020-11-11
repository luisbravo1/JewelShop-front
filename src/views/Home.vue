<template>
  <div class="home">
    <div class="first_div">
      <v-container>
        <v-layout row wrap pt-6 px-1>
          <v-col md="6" lg="6">
            <v-img
              height="300px"
              src="https://images.unsplash.com/photo-1589674781759-c21c37956a44"
            ></v-img>
          </v-col>
          <v-col md="6" lg="6">
            <v-container>
              <h6>OFERTAS EXCLUSIVAS</h6>
              <h1>JOYERÍA DE PLATA</h1>
              <h4>Piezas únicas y de la más alta calidad</h4>
              <p>Compra nuestra joyería de plata y arma combinaciones tan únicas como tú!</p>
              <v-flex class="d-flex justify-start">
                <v-btn x-large color="black" dark to="/store"> Ver más </v-btn>
              </v-flex>
            </v-container>
          </v-col>
        </v-layout>
      </v-container>
    </div>

    <div class="second_div">
      <v-container>
        <v-layout row wrap pt-6 px-1>
          <h2>BEST SELLERS</h2>
        </v-layout>
        <v-layout row wrap pt-6 px-1>
        <v-col md="6" lg="3">
          <v-card class="mx-auto">
            <v-img
              src="https://images.unsplash.com/photo-1598560915864-c0e2cc41fa24"
              height="300"
            >
            </v-img>
            <v-card-actions>
              <v-btn to="/store" color="gray lighten-2" text> Anillo con diamante </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="6" lg="3">
          <v-card class="mx-auto">
            <v-img
              src="https://images.unsplash.com/photo-1598560915769-845e59236f6c"
              height="300"
            >
            </v-img>
            <v-card-actions>
              <v-btn to="/store" color="gray lighten-2" text> Collar con dije de corazón </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="6" lg="3">
          <v-card class="mx-auto">
            <v-img
              src="https://images.unsplash.com/photo-1598560915311-b8eee0af5e04"
              height="300"
            >
            </v-img>
            <v-card-actions>
              <v-btn to="/store" color="gray lighten-2" text> Arracadas con brillos </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="6" lg="3">
          <v-card class="mx-auto">
            <v-img
              src="https://content.ayanajewellery.com/wp-content/uploads/2014/11/AyanaJewellery_4343_AJ800_Silver-Twist-Bracelet-Grey-Background.jpg"
              height="300"
            >
            </v-img>
            <v-card-actions>
              <v-btn to="/store" color="gray lighten-2" text> Pulsera con grabado </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        </v-layout>
      </v-container>
    </div>

    <div class="third_div">
      <v-container>
        <v-layout row wrap pt-6 px-1>
          <v-flex class="d-flex justify-center">
            <h2>Explora nuestra joyería.</h2>
          </v-flex>
        </v-layout>
        <v-layout row wrap pt-6 px-1>
          <v-col md="6" lg="4">
            <v-card class="mx-auto">
              <v-img
                src="https://images.unsplash.com/photo-1510074229140-bdfc2ff28550"
                height="300"
              >
              </v-img>
              <v-card-actions>
                <v-btn to="/store" color="gray lighten-2" text> Collares </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col md="6" lg="4">
            <v-card class="mx-auto">
              <v-img
                src="https://images.unsplash.com/photo-1516700829972-65a01767c294"
                height="300"
              >
              </v-img>
              <v-card-actions>
                <v-btn to="/store" color="gray lighten-2" text> Pulseras </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col md="6" lg="4">
            <v-card class="mx-auto">
              <v-img
                src="https://images.unsplash.com/photo-1552334543-63c1f649eece"
                height="300"
              >
              </v-img>
              <v-card-actions>
                <v-btn to="/store" color="gray lighten-2" text> Anillos </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col md="6" lg="4">
            <v-card class="mx-auto">
              <v-img
                src="https://cdn-images.farfetch-contents.com/14/15/80/58/14158058_18996467_1000.jpg"
                height="300"
              >
              </v-img>
              <v-card-actions>
                <v-btn to="/store" color="gray lighten-2" text> Aretes </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col md="6" lg="4">
            <v-card class="mx-auto">
              <v-img
                src="https://techstory.in/wp-content/uploads/2020/08/image1-5.jpg"
                height="300"
              >
              </v-img>
              <v-card-actions>
                <v-btn to="/store" color="gray lighten-2" text>
                  Tobilleras
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col md="6" lg="4">
            <v-card class="mx-auto">
              <v-img
                src="https://images.unsplash.com/photo-1576682828571-c11467c6d621"
                height="300"
              >
              </v-img>
              <v-card-actions>
                <v-btn to="/store" color="gray lighten-2" text> Explorar </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-layout>
        <v-flex class="d-flex justify-center mt-5">
            <v-btn x-large color="black" dark to="/store"> Ver más </v-btn>
        </v-flex>
      </v-container>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {}
}
</script>

<style scoped>
  .first_div {
    min-height: 60vh;
    background: rgb(244,238,255);
    background: linear-gradient(270deg, rgba(244,238,255,1) 24%, rgba(208,209,255,1) 80%, rgba(223,231,253,1) 100%, rgba(200,231,255,1) 100%);
  }
  .second_div {
    min-height: 40vh;
    padding-bottom: 5%;
  }
  .third_div {
    min-height: 80vh;
    background: rgb(244,238,255);
    background: linear-gradient(90deg, rgba(244,238,255,1) 0%, rgba(220,214,247,1) 50%, rgba(209,211,255,1) 76%);
    padding-top: 2%;
    padding-bottom: 5%;
  }
  @media screen and (max-width: 600px) {
    .first_div {
    background: rgb(244,238,255);
    background: linear-gradient(360deg, rgba(244,238,255,1) 24%, rgba(208,209,255,1) 80%, rgba(223,231,253,1) 100%, rgba(200,231,255,1) 100%);
    }
  }
</style>
