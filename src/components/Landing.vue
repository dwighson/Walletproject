<template>
  <div class="landing">
    <nav>
      <h3>Dwilo Cards</h3>
      <ul>
        <li>Business</li>
        <li>pricing</li>
        <li>Sign up</li>
      </ul>
    </nav>
    <div class="header">
      <div class="explanation">
        <h1>
          Dwilo Cards.
          <br />A
          <span style="color: #25ceff;">simple stamp card system</span> for your customers.
        </h1>
        <p>
          In 4 steps exactly what you need, to
          <span style="color: #25ceff;">gain</span> and
          <span style="color: #25ceff;">reward</span> returning customers.
        </p>
        <button v-on:click="goto('login')">Try it out for free</button>
      </div>
      <div class="demoscreen">
        <!-- <loyalty /> -->
      </div>
    </div>
    <div class="info">
      <h2>A simple online stamp card for startups that can’t afford to hire a software developer / Graphic Designer</h2>
      <div class="block">
        <img
          src="https://media.discordapp.net/attachments/638664672714686465/638794953023160320/bar-chart.png"
          alt
        />
        <div class="info">
          <h3>Hassle free</h3>
          <p>In 4 steps or less a custom stamp card that can be shared through social media and works for IOS, Android and the Web with no additional app required (iOS Wallet/PWA).</p>
        </div>
      </div>

      <div class="block">
        <img
          src="https://media.discordapp.net/attachments/638664672714686465/638794953023160320/bar-chart.png"
          alt
        />
        <div class="info">
          <h3>Real Time Analytics</h3>
          <p>Keep track of every stamp added to your customer’s loyaltycard, see how much revenue earned per month and more to come.</p>
        </div>
      </div>
      <div class="block">
        <img
          src="https://media.discordapp.net/attachments/638664672714686465/638794711171203073/hand.png"
          alt
        />
        <div class="info">
          <h3>Affordable</h3>
          <p>We use cutting edge technology to make sure that the development time and maintenance stay low at all cost, enabling us to make a tool this powerfull, affordable to anyone.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loyalty from "@/components/Loyaltycard";
export default {
  components: {
    Loyalty
  },
  methods: {
    goto(url) {
      this.$router.push("/" + url);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");

body,
html {
  margin: 0;
  padding: 0;
}
/* * {
  outline: 1px solid red;
} */
nav ul {
  padding: 0;
  height: 100%;
  display: flex;
  margin: 0;
  text-transform: uppercase;
  flex: 1;
}
nav li {
  display: block;
  color: black;
  padding: 0;
  margin: 0;
  height: 100%;
  min-width: 100px;
  text-align: center;
  line-height: 60px;
  /* background: green; */
}
.block {
  min-height: 200px;
  width: 30%;
  padding-top: 100px;
  margin: 0 10px;
  display: inline-block;
  vertical-align: top;
  /* background: green; */
}
.block img {
  width: 90px;
}
.block .info {
  display: inline-block;
  /* background: purple; */
  max-width: 590px;
  text-align: center;
  vertical-align: top;
}
.landing {
  width: 900px;
  margin: 0 auto;
  text-align: center;
  font-family: Open sans;
  min-height: 100vh;
}
.header {
  min-height: 100vh;
  /* background: purple; */
  padding: 20px;

  box-sizing: border-box;
  width: 100%;
}
.info {
  min-height: 300px;
  width: calc(100% - 50px);
  /* text-align: left; */

  /* background: blue; */
}
.info p {
  /* line-height: 35px; */
}
nav h3 {
  margin: 0;
  margin-right: 20px;
  height: 60px;
  line-height: 60px;
}
nav {
  height: 60px;
  width: 100%;
  padding: 0 20px;
  text-align: left;
  display: flex;
  color: #25ceff;
  box-sizing: border-box;
  position: sticky;
  flex-direction: row;
  top: 0;
  margin: 0;
  left: 0;
  /* line-height: 60px; */
}
.header .explanation {
  max-width: 500px;
  vertical-align: top;
}
.header h1,
.header p {
  width: 100%;
  text-align: left;
}
.header .explanation,
.header .demoscreen {
  float: left;
}
.explanation p {
  font-size: 20px;
}
.demoscreen {
  width: 300px;
  /* position: sticky; */
  vertical-align: top;
  position: relative;
  /* top: 80px; */
  height: 600px;
  margin: 0 20px;
  background: #25ceff;
  transition: background 0.1s ease;
  border-radius: 20px;
  overflow: hidden;
}
button {
  height: 50px;
  border: 0;
  background: #25ceff;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  float: left;
  padding: 0 30px;
  border-radius: 5px;
  min-width: 200px;
}

.demoscreen {
  animation: colorchange 5s; /* animation-name followed by duration in seconds*/
  /* you could also use milliseconds (ms) or something like 2.5s */
  -webkit-animation: colorchange 5s; /* Chrome and Safari */
}

@keyframes colorchange {
  0% {
    background: #25ceff;
  }
  25% {
    background: yellow;
  }
  50% {
    background: blue;
  }
  75% {
    background: green;
  }
  100% {
    background: red;
  }
}

@-webkit-keyframes colorchange /* Safari and Chrome - necessary duplicate */ {
  0% {
    background: #25ceff;
  }
  25% {
    background: yellow;
  }
  50% {
    background: blue;
  }
  75% {
    background: green;
  }
  100% {
    background: red;
  }
}
</style>
