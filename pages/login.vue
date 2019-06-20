
<template>
  <div class="container-fluid">
    <div class="login-box">
      <img src="../img/logo.png" class="avatar" alt="Avatar Image">
      <h1>Ingresa Aqui</h1>
      <b-form @submit.prevent="login">
        <div class="col-sm-12">
          <b-form-group label="Email:" label-for="email">
            <b-input type="email" placeholder="Ingrese su Email" v-model="form.email"/>
          </b-form-group>
        </div>

        <div class="col-sm-12">
          <!-- <label for="password">Password</label> -->
          <b-form-group label="Contraseña:" label-for="password">
            <b-input placeholder="Ingrese su contraseña" type="password" v-model="form.password"/>
          </b-form-group>
        </div>
        <input type="submit" id="hola" :src="user.emailVerified" v-if="!user" value="Ingresar">
        <div>
          <a v-b-modal.Model-email>Olvidaste tu Contraseña?</a>

          <b-modal
            id="Model-email"
            ref="modal"
            title="Recuperar Contraseña"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            ok-title="Guardar"
            cancel-title="Cancelar"
          >
            <form ref="form" @submit.prevent="recuperar">
              <b-form-group
                :state="name"
                label="Email"
                label-for="email-input"
                invalid-feedback="Email is required"
              ></b-form-group>
              <b-form-input
                id="email"
                placeholder="Ingresa el correo electronico"
                :state="name"
                v-model="form.newpass"
                required
              ></b-form-input>
            </form>
          </b-modal>
        </div>

        <a href="/registro">No tienes una cuenta?</a>
      </b-form>
    </div>
  </div>
</template>

<script>
import { auth } from "../services/firebase";

export default {
  data() {
    return {
      name: null,
      form: {
        newpass: "",
        email: "",
        password: ""
      },
      guardando: false,
      user: false
    };
  },
  methods: {
    login() {
      var user = auth.currentUser;
      if (user == null) {
        auth
          .signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(res => {
            alert("Ha iniciado sesion.");
            this.$router.push({ path: "/contacto" });
          })
          .catch(function(error) {
            // Handle Errors here.
            alert(error.message);
            // ...
          });
      } else {
        auth.onAuthStateChanged(function(user) {
          alert("El usuario tiene la cuenta en estado: " + user.emailVerified);
          if (user.emailVerified == false) {
            user = auth.currentUser;
            user.sendEmailVerification().then(function() {
              alert("Verifique nuevamente su correo.");
            });
          } else if (user.emailVerified == true) {
            alert("Ya ha iniciado sesión");
          }
        });
      }
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.name = valid ? "valid" : "invalid";
      return valid;
    },
    resetModal() {
      /* this.nombre = '' */
      this.name = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.recuperar();
    },
    recuperar() {
      if (!this.checkFormValidity()) {
        return;
      }

      auth
        .sendPasswordResetEmail(this.form.newpass)
        .then(function() {
          alert("Correo de restablecimiento enviado.");
        })
        .catch(function(error) {
          alert("Error", error);
        });
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    }
  }
};
</script>
<style>
.container-fluid {
  margin: 0;
  padding: 0;
  background: url(../img/login3.jpg) no-repeat center top;
  background-size: cover;
  font-family: sans-serif;
  height: 100vh;
  width: 90%
}

.login-box {
  width: 320px;
  height: 420px;
  background: #000;
  color: #fff;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding: 70px 30px;
}

.login-box .avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  top: -50px;
  left: calc(50% - 50px);
}

.login-box h1 {
  margin: 0;
  padding: 0 0 20px;
  text-align: center;
  font-size: 22px;
}

.login-box label {
  margin: 0;
  padding: 0;
  font-weight: bold;
  display: block;
}

.login-box input {
  width: 100%;
  margin-bottom: 20px;
}

.login-box input[type="email"],
.login-box input[type="password"] {
  border: none;
  border-bottom: 1px solid #fff;
  background: transparent;
  outline: none;
  height: 40px;
  color: #fff;
  font-size: 16px;
}

.login-box input[type="submit"] {
  border: none;
  outline: none;
  height: 40px;
  background: #b80f22;
  color: #fff;
  font-size: 18px;
  border-radius: 20px;
}

.login-box input[type="submit"]:hover {
  cursor: pointer;
  background: #ffc107;
  color: #000;
}

.login-box a {
  text-decoration: none;
  font-size: 12px;
  line-height: 20px;
  color: darkgrey;
}

.login-box a:hover {
  color: #fff;
}
</style>