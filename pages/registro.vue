<template>
  <div class="container-fluid">
    <div class="row">
      <div class="login-box">
        <img src="../img/logo2.png" class="avatar" alt="Avatar Image">
        <h1>Registrarse aqui</h1>
        <b-form @submit.prevent="registrarUsuario">
          <div class="col-sm-12">
            <b-form-group label="Nombre:" label-for="nombre">
              <b-input type="text" required placeholder="Ingrese su nombre" v-model="form.name"/>
            </b-form-group>
          </div>
          <div class="col-sm-12">
            <b-form-group label="Email:" label-for="email">
              <b-input type="email" required placeholder="Ingrese su Email" v-model="form.email"/>
            </b-form-group>
          </div>

          <div class="col-sm-12">
            <!-- <label for="password">Password</label> -->
            <b-form-group label="Contraseña:" label-for="password">
              <b-input
                placeholder="Ingrese su contraseña"
                required
                type="password"
                v-model="form.password"
              />
            </b-form-group>
          </div>
          <input type="submit" value="Registrarse">
        </b-form>
      </div>
    </div>
  </div>
</template>  


<script>
import { auth } from "../services/firebase";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        name: ""
      },
      photoURL: null,
    };
  },
  methods: {
    registrarUsuario() {
      if (this.form.password.length >= 6) {
        var user;
        user = auth
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(res => {
            res.user.updateProfile({
              displayName: this.form.name,
              photoURL:
                "https://http2.mlstatic.com/llavero-tokyo-ghoul-kaneki-ken-anteiku-kawaii-envio-gratis-D_NQ_NP_866853-MLM29011339098_122018-F.jpg"
            });
            user = auth.currentUser;
            user.sendEmailVerification().then(function() {
              alert("Usuario Registrado. Verifique su correo.");
            });
          })
          .catch(function(error) {
            alert("!!!Usuario Existente!!!" + error);
          });
        this.$router.push({ path: "/" });
      } else {
        alert("Contraseña debil");
      }
    }
  }
};
</script>

<style>
.container-fluid {
  margin: 0;
  padding: 0;
  background: url(../img/login41.jpg) no-repeat center top;
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
.login-box input[type="text"],
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