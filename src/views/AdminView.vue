<template>
  <div class="layout-container">
    <div class="admin-title">
      <h1>Administracion</h1>
    </div>
    <div style="min-width: 1000px">
      <v-data-table :headers="headers" :items="courses" sort-by="seats" class="elevation-1">
        <template v-slot:[`item.price`]="{ item }">
          <v-chip color="green" dark> ${{ item.price }} </v-chip>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="getColor(item.status)" dark>
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:[`item.registrationDate`]="{ item }">
          <v-chip color="green" dark>
            {{ item.registrationDate }}
          </v-chip>
        </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Cursos Alfaweb</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                  Agregar Curso
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.title"
                          label="Nombre del curso"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.seats" label="Cupos"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.seatsUsed"
                          label="Inscritos"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.duration" label="Duración"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.price" label="Costo"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.status" label="Terminado"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.registrationDate"
                          label="Fecha"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.courseID" label="ID"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.image"
                          label="URL de la imagen"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </div>

    <div class="alerts-style mt-4">
      <v-alert dense outlined color="purple">
        <v-icon class="mr-4" color="purple">mdi-account-multiple</v-icon>
        <span>Cantidad de alumnos permitidos: <strong>outlined</strong></span>
      </v-alert>
      <v-alert dense outlined color="blue">
        <v-icon class="mr-4" color="blue">mdi-account-check</v-icon>
        <span>Cantidad de alumnos inscritos:<strong>outlined</strong></span>
      </v-alert>
      <v-alert dense outlined color="red">
        <v-icon class="mr-4" color="red">mdi-account-clock</v-icon>
        <span>Cantidad de cupos restantes: <strong>outlined</strong></span>
      </v-alert>
      <v-alert dense outlined color="pink">
        <v-icon class="mr-4" color="pink">mdi-cancel</v-icon>
        <span>Cantidad de cursos terminados: <strong>outlined</strong></span>
      </v-alert>
      <v-alert dense outlined color="brown">
        <v-icon class="mr-4" color="brown">mdi-bell-ring</v-icon>
        <span>Cantidad total de cursos activos: <strong>outlined</strong></span>
      </v-alert>
      <v-alert dense outlined color="red">
        <v-icon class="mr-4" color="red">mdi-bell-ring</v-icon>
        <span>Cantidad total de cursos: <strong>{{this.totalCourses}}</strong></span>
      </v-alert>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';


export default {
  name: 'AdminView',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Curso',
        align: 'start',
        sortable: false,
        value: 'title'
      },
      { text: 'Cupos', value: 'seats' },
      { text: 'Inscritos', value: 'seatsUsed' },
      { text: 'Duración', value: 'duration' },
      { text: 'Costo', value: 'price' },
      { text: 'Terminado', value: 'status' },
      { text: 'Fecha', value: 'registrationDate' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    courses: [],
    editedIndex: -1,
    editedItem: {
      title: '',
      seats: 0,
      seatsUsed: 0,
      duration: '',
      price: 0,
      status: '',
      registrationDate: '',
      courseID: '',
      image: ''
    },
    defaultItem: {
      title: '',
      seats: 0,
      seatsUsed: 0,
      duration: '',
      price: 0,
      status: '',
      registrationDate: '',
      courseID: '',
      image: ''
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Agregando Curso' : `Editar: ${this.editedItem.title}`
    },
    ...mapState('courses', ['list']),
    addCoursesToState() {
      this.courses = this.list
    },
    ...mapGetters('courses', ['totalCourses'])
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },

  created() {
    this.initialize()
    this.getAllCourses()
    console.log(this.courses[0])
    
  },

  methods: {
    ...mapActions('courses', {
      getAllCourses: 'getAll'
    }),
    getColor(status) {
      if (status === 'si') return 'blue'
      else return 'grey'
    },
    initialize() {

      this.courses = this.list
    },

    editItem(item) {
      this.editedIndex = this.courses.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.courses.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.courses.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.courses[this.editedIndex], this.editedItem)
      } else {
        this.courses.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style>
.admin-title {
  flex-direction: row;
  display: flex;
  align-items: center;
  gap: 20px;
}
.alerts-style {
  width: 100%;
  max-width: 1000px;
}
</style>
