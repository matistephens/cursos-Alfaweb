<template>
  <v-container>
    <v-row v-for="{ course, $index } in list" justify="space-around" :key="$index">
      <v-card width="400">
        <v-img
          height="200px"
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        >
        </v-img>

        <v-card-text style="background-color: lightgrey">
          <v-card-title>{{ course.title }}</v-card-title>
          <div class="font-weight-bold ml-8 mb-2">Today</div>

          <v-timeline align-top dense>
            <v-timeline-item :color="green" small>
              <div>
                <div class="font-weight-normal"><strong>Costo:</strong> {{ course.price }}</div>
                <div><strong>Duración:</strong>{{ course.duration }}</div>
              </div>
            </v-timeline-item>
            <v-timeline-item :color="green" small>
              <div>
                <div class="font-weight-normal"><strong>Cupos:</strong> {{ course.seats }}</div>
                <div><strong>Completado:</strong> {{ course.status }}</div>
              </div>
            </v-timeline-item>
            <v-timeline-item :color="green" small>
              <div>
                <div class="font-weight-normal">
                  <strong>Fecha de registro:</strong>
                </div>
                <div>{{ course.registrationDate }}</div>
              </div>
            </v-timeline-item>
            <v-timeline-item :color="green" small>
              <div>
                <div class="font-weight-normal">
                  <strong>Descripción:</strong>
                </div>
                <div>{{ course.description }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    courses: []
  }),
  computed: {
    ...mapState('courses', ['list'])
  },

}
</script>

<style></style>
