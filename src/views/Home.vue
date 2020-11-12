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
              <h6 class="mt-5">OFERTAS EXCLUSIVAS</h6>
              <h1>JOYERÍA DE PLATA</h1>
              <h4>Piezas únicas y de la más alta calidad</h4>
              <p>Compra nuestra joyería de plata y arma combinaciones tan únicas como tú!</p>
              <v-flex class="d-flex justify-start mt-5 pt-5">
                <v-btn x-large color="black" dark to="/store"> Ver más </v-btn>
              </v-flex>
            </v-container>
          </v-col>
        </v-layout>
      </v-container>
    </div>

    <div class="second_div">
      <v-container>
        <v-layout row wrap pt-6 px-auto class="justify-center">
            <h2 class="text-decoration-underline">BEST SELLERS</h2>
        </v-layout>
        <v-layout row wrap pt-6 px-1>
        <v-col md="6" lg="3">
          <v-card class="mx-auto pb-4">
            <v-img
              src="https://images.unsplash.com/photo-1598560915864-c0e2cc41fa24"
              height="300"
            >
            </v-img>
            <v-card-title class="justify-center">
              Anillo con diamante
              </v-card-title>
              <v-card-subtitle>
                <p class="text-center">Anilllo de plata con brillo de diamante</p>
                <h5 class="text-center">$350.00</h5>
              </v-card-subtitle>
              <v-card-actions class="justify-center">
                <v-btn color="black" dark to="/store"> Agregar al carrito </v-btn>
              </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="6" lg="3">
          <v-card class="mx-auto pb-4">
            <v-img
              src="https://images.unsplash.com/photo-1598560915769-845e59236f6c"
              height="300"
            >
            </v-img>
            <v-card-title class="justify-center">
              Collar con dije de corazón
            </v-card-title>
            <v-card-subtitle>
                <p class="text-center">Collar de plata con dije de corazón</p>
                <h5 class="text-center">$550.00</h5>
              </v-card-subtitle>
              <v-card-actions class="justify-center">
                <v-btn color="black" dark to="/store"> Agregar al carrito </v-btn>
              </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="6" lg="3">
          <v-card class="mx-auto pb-4">
            <v-img
              src="https://images.unsplash.com/photo-1598560915311-b8eee0af5e04"
              height="300"
            >
            </v-img>
            <v-card-title class="justify-center">
              Arracadas con brillos
            </v-card-title>
            <v-card-subtitle>
              <p class="text-center">Arracadas de plata con brillos</p>
              <h5 class="text-center">$450.00</h5>
            </v-card-subtitle>
            <v-card-actions class="justify-center">
              <v-btn color="black" dark to="/store"> Agregar al carrito </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="6" lg="3">
          <v-card class="mx-auto pb-4">
            <v-img
              src="https://content.ayanajewellery.com/wp-content/uploads/2014/11/AyanaJewellery_4343_AJ800_Silver-Twist-Bracelet-Grey-Background.jpg"
              height="300"
            >
            </v-img>
            <v-card-title class="justify-center">
              Pulsera con grabado
              </v-card-title>
            <v-card-subtitle>
              <p class="text-center">Pulsera de plata con grabado</p>
              <h5 class="text-center">$330.00</h5>
            </v-card-subtitle>
            <v-card-actions class="justify-center">
              <v-btn color="black" dark to="/store"> Agregar al carrito </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        </v-layout>
      </v-container>
    </div>

    <div class="third_div">
      <v-container>
         <v-layout row wrap pt-6 px-auto class="justify-center">
            <h2 class="text-decoration-underline">Explora nuestra joyería.</h2>
        </v-layout>
        <v-layout row wrap pt-6 px-1>
          <v-col md="6" lg="4">
            <v-card>
              <v-img
                src="https://images.unsplash.com/photo-1510074229140-bdfc2ff28550"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
              >
                <v-card-title><h2>Collares</h2></v-card-title>
              </v-img>
            </v-card>
          </v-col>
          <v-col md="6" lg="4">
            <v-card>
              <v-img
                src="https://images.unsplash.com/photo-1516700829972-65a01767c294"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
              >
                <v-card-title><h2>Pulseras</h2></v-card-title>
              </v-img>
            </v-card>
          </v-col>
          <v-col md="6" lg="4">
            <v-card>
              <v-img
                src="https://images.unsplash.com/photo-1552334543-63c1f649eece"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
              >
                <v-card-title><h2>Anillos</h2></v-card-title>
              </v-img>
            </v-card>
          </v-col>
          <v-col md="6" lg="4">
            <v-card>
              <v-img
                src="https://cdn-images.farfetch-contents.com/14/15/80/58/14158058_18996467_1000.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
              >
                <v-card-title><h2>Aretes</h2></v-card-title>
              </v-img>
            </v-card>
          </v-col>
          <v-col md="6" lg="4">
            <v-card>
              <v-img
                src="https://techstory.in/wp-content/uploads/2020/08/image1-5.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
              >
                <v-card-title><h2>Tobilleras</h2></v-card-title>
              </v-img>
            </v-card>
          </v-col>
          <v-col md="6" lg="4">
            <v-card>
              <v-img
                src="https://images.unsplash.com/photo-1576682828571-c11467c6d621"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
              >
                <v-card-title><h2>Mucho más</h2></v-card-title>
              </v-img>
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
    margin-top: 30px;
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
