<template>
  <v-container>
    <v-row class="px-3 py-5">
      <v-col cols="12" md="8">
        <v-container>
          <h1>Sobre Nosotros</h1>
          <p>
            Somos una marca mexicana de joyería de plata y queremos que tengas
            piezas únicas y de gran calidad.
          </p>
          <p>
            Todas nuestras piezas son de plata de alta calidad y hechas en
            México.
          </p>
          <p>
            Después de hacer tu orden, recibiras un correo electrónico con la
            confirmación de tu compra. Cuando tu pieza haya sido enviada, te
            enviaremos el número de guía de tu paquete.
          </p>
          <p>Tu pieza debería llegar en aproximadamente 5-7 días hábiles.</p>
          <p>Cualquier duda puedes mandarnos un mensaje.</p>
        </v-container>
      </v-col>
      <v-col cols="12" md="4">
        <div class="img">
          <img
            width="100%"
            src="https://images.unsplash.com/photo-1596944924616-7b38e7cfac36"
          />
        </div>
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
