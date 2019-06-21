<template>
  <div>
    <div class="container-fluid">
      <div class="row mt-5">
        <div class="col-sm-6">
          <b-table
            class="waifu"
            responsive
            striped
            hover
            :fields="fields"
            :items="items"
            id="productos"
          >
            <template slot="image" slot-scope="data">
              <b-img width="300" :src="data.item.image"></b-img>
              <b-button
                class="view"
                variant="success"
                v-if="user && user.emailVerified"
                :href="`/${data.item.id}`"
              >Ver Producto</b-button>
            </template>
          </b-table>
        </div>
        <div class="col-sm-5" id="text">
          <b-img width="600px" src="https://cdn.pixabay.com/photo/2016/07/01/09/05/space-1490668_960_720.png"></b-img>

          <h1 style="margin-top:40px" class="text-center" v-if="!user">Si ya te registraste recuerda verificar tu dirección de correo electronico</h1><h1 class="text-center" style="margin-top:40px" v-else>Has iniciado sesión</h1>
         
          <p  class="text-center" v-if="!user">No aparecera la bolsa de compras ni podras visualizar los productos.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase, { db } from "../services/firebase";
import { auth } from "../services/firebase";

export default {
  asyncData() {
    let perPage = 10;
    return db
      .collection("productos")
      .get()
      .then(async res => {
        let items = [];
        res.forEach(value => {
          items.push({
            id: value.id,

            ...value.data()
          });
        });

        return {
          items
        };
      });
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.user = user;
    });
  },
  data() {
    return {
      user: false,
      fields: [
        {
          key: "nombre",
          sortable: false
        },
        {
          key: "image",
          sortable: true
        }
      ]
    };
  }
};
</script>

<style>
#text {
  margin-left: 20px;
}
</style>
