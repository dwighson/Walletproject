<template>
  <div class="login">
    <div class="steps">
      <div class="content">
        <p>Hey there! What's your name?</p>
        <input type="text" v-model="name" v-on:keyup.enter="nextstep">
        <button v-on:click="nextstep">next</button>
      </div>
    </div>
    <div class="steps">
      <div class="content">
        <p>
          Hi
          <span class="name">{{name}}</span>, fill in your email address to start using the Poke Box loyalty card!
        </p>
        <input type="email" v-on:keyup.enter="createAccount()" v-model="email">
        <button v-on:click="createAccount()">to the loyalty card!</button>
      </div>
    </div>
  </div>
</template>
<script>
var gun = window.Gun(["https://dwilo.herokuapp.com/gun"]);

export default {
  data() {
    return {
      name: "",
      email: "",
      users: [],
      founduser: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      // const pokeUsers = await gun.get("pokeusers");
      // pokeUsers.map().once(user => this.users.push(user));
      // console.log(this.users);
    },
    async checkExistingUser() {
      const user = await gun.get("user-" + this.email);
      user.once(v => {
        if (typeof v === "undefined") {
        //   console.log("user not found");
          this.founduser = "";
        } else {
          this.founduser = v;
          // console.log(this.founduser);
        }
      });
    },
    nextstep() {
      let container = document.querySelector(".login");
      container.style.overflowX = "scroll";
      container.scrollLeft = 500;
    },
    goto(url) {
      this.$router.push("/" + url);
    },
    createAccount() {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: this.name,
          email: this.email
        })
      );
      this.checkExistingUser();
      setTimeout(() => {
        if (this.founduser === "") {
        //   console.log("not found");
          gun.get("user-" + this.email).put({
            "stamp-poke": 0
          });
          this.goto("loyaltycard");
        } else {
        //   console.log("found");
          gun.get("user-" + this.email).once(v => {
            if (v["stamp-poke"] >= 0) {
              // console.log('pokestamp exists')
              this.goto("loyaltycard");
            } else {
              gun.get("user-" + this.email).put({
                "stamp-poke": 0
              });
              this.goto("loyaltycard");
            }
          });
          // console.log(this.founduser);
        }
      }, 1000);

      // gun.get("user-" + this.email).once(v => console.log(v));
      // console.log(localStorage.getItem('currentUser'))
      // if(this.checkExistingUser() === true) {
      //   console.log('user exists!')
      //   // alert('welcome back!')
      //   // this.goto('loyaltycard')
      // } else {
      //   // const newPokeUser = gun.get('pokeusers').set({
      //   //   username: this.name,
      //   //   email: this.email,
      //   //   stamps: 0
      //   // })

      // }
    }
  }
};
</script>

<style scoped>
.login {
  color: white;
  box-sizing: border-box;
  height: 100vh;
  margin: 0 auto;
  -ms-scroll-snap-type: x mandatory;
  scroll-snap-type: x mandatory;
  display: flex;
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  width: 100%;
  max-width: 900px;
  scroll-behavior: smooth;
  -webkit-scroll-behavior: smooth;
  background: #25ceff;
}
.steps {
  height: 300px;
  min-width: 100%;
  max-width: 500px;
  color: black;
  padding: 20px;
  font-size: 20px;
  box-sizing: border-box;
  scroll-snap-align: center;
}
.name {
  text-transform: Capitalize;
}
.content {
  background: white;
  min-height: 200px;
  padding: 20px;
  border-radius: 10px;
}
input {
  width: calc(100% - 0px);
  height: 40px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  font-size: 20px;
  box-sizing: border-box;
  margin: 0 auto;
  text-align: center;
  border-radius: 10px;
}
button {
  height: 40px;
  width: 100%;
  background: #25ceff;
  border: none;
  margin-top: 10px;
  box-sizing: border-box;
  font-size: 20px;
  border-radius: 10px;
  color: white;
}
</style>
