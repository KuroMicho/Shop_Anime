<template>
  <div class="container-fluid">
    <b-button class="btn_back" href="/">
      <i class="material-icons">arrow_back</i>
    </b-button>

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <b-form @submit.prevent="comprarProducto">
      <div class="row mt-3">
        <div id="titulo" class="col-xs-6 col-sm-5 col-md-6">
          <h4 style="color:white">Detalle del Producto</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <b-img width="400" height="300" :src="imageProduct.image"></b-img>
        </div>

        <div class="col-sm-2">
          <b-button-group class="carrito" vertical>
            <b-button variant="primary" type="submit" :disabled="guardando">
              <i class="material-icons">add_shopping_cart</i>
            </b-button>
            <br>
            <b-button variant="danger">
              <i class="material-icons">view_carousel</i>
            </b-button>
            <br>
            <b-button variant="warning">
              <i class="material-icons" @click="popToast">help_outline</i>
            </b-button>
          </b-button-group>
        </div>
        <div id="detalles" class="col-sm-5">
          <b-form-group class="preciotxt" label="Nombre:" label-for="nombre">
            <!--    <b-form-input
              id="nombre"
              type="text"
              required
              v-model="producto.nombre"
              placeholder="Ingresa el nombre del producto"
            />-->
            <h1 class="preciovalue">{{producto.nombre}}</h1>
          </b-form-group>

          <b-form-group class="preciotxt" label="Precio:" label-for="precio">
            <h1 class="preciovalue">$ {{producto.precio}}</h1>
            <!--   <b-form-input
              id="precio"
              v-model="producto.precio"
              type="number"
              required
              placeholder="Ingresa el precio del producto"
            />-->
          </b-form-group>

          <b-form-group label="Descripcion:" label-for="descripcion">
            <!-- <b-form-input
              id="descripcion"
              type="text"
              required
              v-model="producto.cantidad"
              placeholder="Ingresa la cantidad disponible del producto"
            />-->
            <h1 class="preciovalue">{{producto.descripcion}}</h1>
            <!--             <b-form-text class="preciovalue">{{producto.descripcion}}</b-form-text>
            -->
          </b-form-group>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 offset-sm-5">
          <b-spinner variant="primary" v-if="guardando"></b-spinner>
        </div>
      </div>
    </b-form>
  </div>
</template>
<script>
import { db, storage } from "../services/firebase";
import { async } from "q";

export default {
  asyncData({ params }) {
    return db
      .collection("productos")
      .doc(params.id)
      .get()
      .then(res => {
        return {
          producto: res.data(),
          imageProduct: res.data(),
          id: params.id
        };
      });
  },
  data() {
    return {
      form: {
        image: "",
        nombre: "",
        precio: "",
        descripcion: ""
      },
      guardando: false,
      imageProduct: null,
      count: 0
    };
  },
  methods: {
    comprarProducto() {
      this.guardando = true;
      db.collection("items")
        .doc(this.$route.params.id)
        .set(this.producto)
        .then(res => {
          this.producto.image = producto.image;
          this.key = key;
          this.producto.nombre = producto.nombre;
          this.producto.precio = producto.precio;
          this.producto.descripcion = producto.descripcion;
        })
        .catch(rs => {
          alert("AGREGADO");
          this.$router.push({ path: "/bag" });
        });
    },
    popToast() {
      // Use a shorter name for this.$createElement
      const h = this.$createElement;
      // Increment the toast count
      this.count++;
      // Create the message
      const vNodesMsg = h("p", { class: ["text-center", "mb-0"] }, [
        h("b-spinner", { props: { type: "grow", small: true } }),
        " Los pagos se realizarán mediante tarjeta de crédito o débito, (forma de pago recomendada) con el sistema de pago seguro STRIPE. (https://stripe.com/about) que cuenta  ",
        h("strong", {}, "con"),
        `
las máximas medidas de seguridad comercialmente disponibles en el sector. #${
          this.count
        } `,
        h("b-spinner", { props: { type: "grow", small: true } })
      ]);
      // Create the title
      const vNodesTitle = h(
        "div",
        { class: ["d-flex", "flex-grow-1", "align-items-baseline", "mr-2"] },
        [
          h("strong", { class: "mr-2" }, "Información de Compra"),
          h("small", { class: "ml-auto text-italics" }, "1 seconds ago")
        ]
      );
      // Pass the vNodes as an array for message and title
      this.$bvToast.toast([vNodesMsg], {
        title: [vNodesTitle],
        solid: true,
        variant: "info"
      });
    }
  }
};
</script>

<style>
.preciotxt {
  font-size: 20px;
}
.preciovalue {
  font-size: 25px;
  color: black;
  background-color: white;
  padding: 5px;
  margin: 5px;
}

#detalles {
  padding: 10px;
  background-color: lightseagreen;
  margin-bottom: 60px;
  margin-right: 10px;
}

.btn_back {
  margin-left: 20px;
  margin-top: 10px;
  background-color: blueviolet;
}

.container-fluid {
  margin: 0;
  padding: 0;
  background: url(../img/cosmos.jpg) no-repeat center top;
  background-size: cover;
  font-family: sans-serif;
  height: auto;
  width: auto;
}

.col-sm-4 {
  margin-left: 20px;
}

.col-sm-2 {
  margin-top: 40px;
  margin-left: 40px;
  padding-left: 40px;
  position: relative;
}

#titulo {
  margin-left: 20px;
}
.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 12px; /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: "liga";
}
</style>
