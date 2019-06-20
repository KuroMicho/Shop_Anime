<template>
  <b-navbar variant="dark" type="dark" toggleable="lg">
    <b-navbar-brand class="c5e-logo-lockup" href="/">
      <img
        class="c5e-logo-lockup-icon"
        fb-logo
        fb-size="28"
        alt
        src="https://animeflv.net/assets/animeflv/img/logo.png?v=2.3"
        role="presentation"
      >
    </b-navbar-brand>
    <b-navbar-toggle target="menu"/>

    <b-collapse is-nav id="menu">
      <b-navbar-nav>
        <b-nav-item href="/contacto">Contacto</b-nav-item>
        <b-nav-item href="/productos" v-if="user && user.emailVerified">Productos</b-nav-item>
        <b-nav-item href="/categorias" v-if="user && user.emailVerified">Categoria</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/login" v-if="!user">Iniciar Sesion</b-nav-item>
        <b-nav-item href="/registro" v-if="!user">Registro</b-nav-item>
        <img :src="user.photoURL" v-if="user && user.emailVerified" width="80px" height="80px">
        <h1 v-else></h1>

        <b-nav-item href="/bag" v-if="user && user.emailVerified">
          <b-button>
            <i class="material-icons">shopping_cart</i>
          </b-button>
        </b-nav-item>
      </b-navbar-nav>

      <b-dropdown
        :text="user.displayName"
        variant="outline-danger"
        class="m-md-3"
        v-if="user && user.emailVerified"
      >
        <b-dropdown-item @click="cerrar()" href="/login">Salir</b-dropdown-item>
      </b-dropdown>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { auth } from "../services/firebase";
export default {
  data() {
    return {
      user: false
    };
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.user = user;
    });
  },
  methods: {
    cerrar() {
      auth
        .signOut()
        .then(function() {
          this.$router.push({ path: "/" });
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  }
};
</script>

