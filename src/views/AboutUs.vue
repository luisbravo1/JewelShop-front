<template>
  <v-container>
    <h1 class="text-center">Sobre Nosotros</h1>
    <v-row>
        <v-col cols="12" md="6" order-md="2" >
          <div class="img">
            <img width="100%" src="https://i2.wp.com/thehappening.com/wp-content/uploads/2015/12/joyeria-mexicana.jpg?fit=1024%2C694&ssl=1"/>
          </div>
      </v-col>
      <v-col cols="12" md="6" order-sm="2" order-md="1">
        <!-- <p class="lead">
          Somos una empresa ubicada en Tijuana, Baja California que se dedica a
          la venta de joyeria. Manejamos joyeria de plata y oro.
        </p>
        <p class="lead">
          Nuestro objetivo es ser la empresa de joyeria más reconocida en
          Tijuana.
        </p> -->
        <h5>Misión</h5>
        <p class="lead">“Acompañar a nuestros clientes en sus momentos felices durante toda su vida”</p>
        <h5>Visión</h5>
        <p class="lead">
            Fidelizar a nuestros clientes a través de:
            <ul>
                <li>Atención y servicios que excedan sus expectativas.</li>
                <li>Facilidad y comodidad de compra.</li>
                <li>Variedad y calidad en nuestros productos.</li>
                <li>Gente Brillante</li>
            </ul>
        </p>
        <h5>Valores</h5>
        <p class="lead">
            <ul>
                <li>Responsabilidad</li>
                <li>Compromiso</li>
                <li>Honestidad</li>
                <li>Actitud positiva y de servicio</li>
                <li>Mejora continua</li>
            </ul>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AboutUs',
  components: {}
}
</script>

<style scoped>
    li {
        list-style-type: disc;
    }
</style>
