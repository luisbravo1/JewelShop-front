<template>
  <v-container>
    <v-row class="px-3 py-5">
      <v-col cols="12" lg="6">
        <v-container>
          <h2>Contáctanos</h2>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Nombre"
              required
            ></v-text-field>

            <v-text-field
              v-model="asunto"
              :rules="asutoRules"
              label="Asunto"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-textarea
              v-model="mensaje"
              :rules="mensajeRules"
              label="Mensaje"
              required
            ></v-textarea>

            <v-btn class="text-center" @click="submit"> Enviar </v-btn>
          </v-form>
        </v-container>
      </v-col>

      <v-col cols="12" lg="6">
        <v-container class="mt-3">
            <div class="LGC"><v-icon medium color="black" class="px-4">room</v-icon>Oaxtepec 12175, Colinas de Agua
            Caliente, 22030 Tijuana, B.C.</div>
            <div class="LGC"><v-icon medium color="black" class="px-4">phone</v-icon>664 309 5119</div>
            <div class="LGC"><v-icon medium color="black" class="px-4">mail</v-icon>joyeria@maritza.com</div>
        </v-container>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3365.4217263031614!2d-116.99876118508982!3d32.48815568106026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9377f16505023%3A0xfd843e6f4f33d1b9!2sBCA%20Showroom%20Colinas%20de%20Agua%20Caliente!5e0!3m2!1sen!2smx!4v1603950359668!5m2!1sen!2smx"
          width="100%"
          height="350"
          frameborder="0"
          style="border: 0"
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Contact',
  components: {}
}
</script>

<style scoped>
li {
  list-style-type: disc;
}
</style>
