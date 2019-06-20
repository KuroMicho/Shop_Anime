<template>
  <div class="cart container">
    <!--     <h2 @click="checkItems">{{user.id}}'s Cart</h2>
    -->
    <p class="item_quantity">
      N° Productos en el Carrito:
      <span>{{cartitems.length}}</span>
    </p>

    <b-table responsive striped hover :fields="fields" :items="cartitems" id="cartitems">
      <input
        slot="cantidad"
        slot-scope="data"
        type="number"
        class="form-control text-center"
        :value="data.item.cantidad"
        @input="updateQuantity"
        min="0"
      >

      <b-button-group slot="acciones" slot-scope="data">
        <b-button v-b-modal.Model-recibo variant="success">
          <i class="material-icons">check</i>
        </b-button>
        <b-button variant="danger" @click="deleteCartitem(data.item.id, data.index)">
          <i class="material-icons">clear</i>
        </b-button>
      </b-button-group>
    </b-table>

    <div>
      <b-modal
        id="Model-recibo"
        ref="modal"
        title="Animeflv"
        @ok="handleOk"
        ok-title="Imprimir"
        cancel-title="Cancelar"
      >
        <form ref="form" @submit.prevent="pdf">
          <h1 class="text-center">CHECKOUT:</h1>
          <br>
          <br>
          <table v-for="cartitem in cartitems" :key="cartitem.id">
            <tr>
              <th>Producto id:</th>
              <td class="text-center">{{cartitem.id}}</td>
            </tr>
            <br>
            <tr>
              <th>Nombre Articulo:</th>
              <td class="text-center">{{cartitem.nombre}}</td>
            </tr>
            <br>
            <tr>
              <th>Producto Cantidad:</th>
              <td class="text-center">{{cartitem.cantidad}}</td>
            </tr>
            <br>
            <tr>
              <th>Precio Unitario:</th>
              <td class="text-center">{{addComma(cartitem.precio)}}</td>
            </tr>
            <br>
            <tr>
              <th>SubTotal:</th>
              <td data-th="Subtotal" class="text-center">${{ subtotal }}</td>
            </tr>
            <tr>
              <th th></th>
              <td class="text-center">>-----------------------------------------------</td>
            </tr>
          </table>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import firebase, { db } from "../services/firebase";
import moment from "moment";

export default {
  data() {
    return {
      moment: moment,
      fields: ["id", "nombre", "precio", "descripcion", "cantidad", "acciones"],
      cartitems: []
    };
  },
  computed: {
    subtotal() {
      return this.cartitems.cantidad * this.cartitems.precio;
    }
  },
  created() {
    //fetch data from the firestore
    db.collection("items")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          //문서목록중 doc 하나하나에 실행하기.
          //console.log(doc.data(), doc.id);
          let cartitem = doc.data();
          cartitem.id = doc.id;
          this.cartitems.push(cartitem);
        });
        console.table(this.cartitems);
      });
  },
  methods: {
    quantitySum() {
      return this.cartitems.reduce((prev, cur) => prev + cur.cantidad, 0);
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.pdf();
    },
    pdf() {
      /* var doc = new jsPDF();

      doc.text(20, 20, "TEST Message!!");
      doc.addPage();
      doc.text(20, 20, "TEST Page 2!");
      doc.save("Test.pdf"); */

      alert("ERROR 404");
    },
    updateQuantity(event) {
      this.cartitems.cantidad = parseInt(event.target.value);
    },
    /*  checkItems() {
      for (var i = 0; i <= this.cartitems.length; i++) {
        if (this.cartitem.user == this.user.alias) {
          this.matchitems.push(this.cartitem);
          console.log(this.matchitems);
        }
      }
    }, */

    deleteCartitem(id, index) {
      var result = confirm("Desea eliminar este producto de la bolsa?");
      if (result) {
        db.collection("items")
          .doc(id)
          .delete()
          .then(() => {
            this.cartitems.splice(index, 1);
            alert("Producto eliminado");
          });
      }
    },
    addComma(num) {
      var regexp = /\B(?=(\d{3})+(?!\d))/g;
      return num.toString().replace(regexp, ",");
    }
  }
};
</script>

<style>
body {
  margin: 0;
  background: #fdca40;
  padding: 30px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  text-transform: uppercase;
  font-size: 110%;
  font-weight: normal;
}

.language {
  margin: 0 2px;
  font-size: 60%;
  color: rgba(#333a45, 0.6);
  text-decoration: underline;
  cursor: pointer;
}

.items {
  margin: 0;
  padding: 0;
  list-style: none;
}

.cart {
  background: #fff;
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  color: #333a45;
  border-radius: 3px;
  padding: 30px;
}
.cart-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 0 0;
  font-size: inherit;
  font-weight: normal;
  color: rgba(51, 58, 69, 0.8);
}
.cart-price {
  color: #333a45;
}
.cart-total {
  font-size: 130%;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 2px solid rgba(51, 58, 69, 0.1);
}
.item-preview {
  display: flex;
  align-items: center;
}
.item-thumbnail {
  margin-right: 20px;
  border-radius: 3px;
}
.item-nombre {
  margin: 0 0 10px 0;
  font-size: inherit;
}
.item-description {
  margin: 0;
  color: rgba(51, 58, 69, 0.6);
}
.item-quantity {
  max-width: 30px;
  padding: 8px 12px;
  font-size: inherit;
  color: rgba(51, 58, 69, 0.8);
  border: 2px solid rgba(51, 58, 69, 0.1);
  border-radius: 3px;
  text-align: center;
}
.item-price {
  margin-left: 20px;
}
</style>
