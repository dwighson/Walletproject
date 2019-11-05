<template>
  <div class="container stampcard">
    <div class="cards">
      <div class="card" v-for="i in 5" v-bind:key="i">
        <div class="loyalty">
          <canvas id="suprise" height="500px" width="200px"></canvas>
          <h1>dwighson</h1>
          <div class="stampbox">
            <div
              v-bind:class="{'stamp': true, 'checked': stamps <= i -1}"
              v-for="i in 10"
              v-bind:key="i"
            >{{i}}</div>
          </div>
          <p>Save ups for rewards!</p>
          <div class="qrbox">
            <div class="content"></div>
          </div>
        </div>
      </div>
    </div>
    <button class="colapse hidden">Collapse</button>
    <ul>
      <li>card 1</li>
      <li>card</li>
      <li>card 10</li>
      <li>card 10</li>

      <li>card 10</li>

      <li>card 10</li>
    </ul>
  </div>
</template>
<script>
import qrcode from "qrcode-generator";
import slick from "slick-carousel";
import $ from "jquery";
var gun = window.Gun(["https://dwilo.herokuapp.com/gun"]);

export default {
  data() {
    return {
      fetched: false,
      currentUser: "",
      users: [],
      stamps: 0
    };
  },
  mounted() {
    this.fetchDynamicUI();

    $(document).ready(function() {
      let top = $(window).height() - 90;
      let z = 99;
      let o = 1;
      let w = $(window).width() - 20;
      $("li").each(function(e) {
        $(this).css({
          top: top,
          "z-index": z,
          opacity: o,
          // transform; 'translateX(50%)',
          // left: '50%' - $(this).width + 'px' ,
          width: w
          // "max-width": "400px"
        });
        z--;
        o = o - 0.2;
        w = w - 20;
        top = top + 10;
      });
      $("li:nth-child(n+4)").css({
        opacity: 0
      });

      $("body").on("click", "li", function() {
        let top = $(window).height() - 20;
      let w = $(window).width() - 20;
         
        $("button").css({
          display: "block"
        });
        if ($("li").attr("class") == "open") {
          //something heree
        } else {
          $("li").each(function() {
            $(this).addClass("open");
            $(this).css({
              width: w,
              opacity: 1,
              // position: 'relative',
              // transform: 'none'
              top: top
              // "max-width": "400px"
            });
            top = top + 60;
          });
        }
      });
      $("button.colapse").click(function() {
        let top = $(window).height() - 90;
        let z = 99;
        let o = 1;
        let w = $(window).width() - 20;
        $("button").css({
          display: "none"
        });
        $("li").each(function(e) {
          $(this).css({
            top: top,
            "z-index": z,
            opacity: o,
            // transform; 'translateX(50%)',
            // left: '50%' - $(this).width + 'px' ,
            width: w
          });

          $(this).removeClass("open");
          z--;
          o = o - 0.2;
          w = w - 20;
          top = top + 10;
        });
        $("li:nth-child(n+4)").css({
          opacity: 0
        });
      });
      $(".cards").slick({
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        // swipeToSlide: true,
        // infinite: true,
        // focusOnSelect: true,
        // speed: 500,
        // fade: true,
        variableWidth: true,
        // cssEase: 'linear'
      });
      $(window).resize(function() {
        // alert("check");
        let top = $(window).height() - 90;
        let z = 99;
        let o = 1;
        let w = $(window).width() - 20;
        $("li").each(function(e) {
          $(this).css({
            top: top,
            "z-index": z,
            opacity: o,
            // transform; 'translateX(50%)',
            // left: '50%' - $(this).width + 'px' ,
            width: w
            // "max-width": "400px"
          });
          z--;
          o = o - 0.2;
          w = w - 20;
          top = top + 10;
        });
        $("li:nth-child(n+4)").css({
          opacity: 0
        });
      });
    });
  },
  methods: {
    async fetchDynamicUI() {
      gun.get("user-dwighson@gmail.com").on(user => {
        //   alert("new stamp added!");
        this.stamps = user["stamp-poke"];
        //   alert(this.stamps);

        if (this.stamps >= 10) {
          let canvas = document.querySelector("canvas");
          let container = document.querySelector(".loyalty");
          canvas.setAttribute("width", container.offsetWidth);
          canvas.setAttribute("height", container.offsetHeight);
          this.start();
          window.onresize = () => {
            let canvas = document.querySelector("canvas");
            let container = document.querySelector(".loyalty");
            canvas.setAttribute("width", container.offsetWidth);
            canvas.setAttribute("height", container.offsetHeight);
            this.start();
          };
          // this.start();
        }
        if (this.stamps >= 11) {
          this.stop();
        }
      });
      // this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      // console.log(this.currentUser);
      // console.log(this.currentUser);
      var typeNumber = 4;
      var errorCorrectionLevel = "L";
      var qr = qrcode(typeNumber, errorCorrectionLevel);
      qr.addData("dwighson@gmail.com");
      // console.log(qr);
      qr.make();
      document.querySelector(".content").innerHTML = qr.createSvgTag();
    },
    start() {
      this.$confetti.start({
        canvasId: "suprise",
        defaultDropRate: 5,
        defaultSize: 5
      });
    },

    stop() {
      this.$confetti.stop({
        canvasId: "suprise"
      });
    }
  }
};
</script>

<style>
#suprise {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.stampcard {
  /* max-width: 400px; */
  margin: 0 auto;
}
.loyalty {
  min-height: 100%;
  box-sizing: border-box;
  color: white;
  text-align: center;
  font-family: arial;
  position: absolute;
  top: 0;
  left: 0;
  /* max-width: 500px; */
  /* background: #25ceff; */
  width: 100%;
  margin: 0 auto;

  /* background: rgb(205, 27, 27); */
  padding-top: 15px;
}
.stampbox {
  min-height: 90px;
  max-width: 320px;
  width: calc(100% - 30px);
  text-align: center;
  margin: 0 auto;
  /* padding */
}
.qrbox .content {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.stamp {
  height: 50px;
  width: 50px;
  margin: 2px;
  display: inline-block;
  position: relative;
  background: white;
  border-radius: 50%;
  line-height: 50px;
  color: black;
}
.stamp::after {
  content: "";
  top: 5px;
  left: 5px;
  position: absolute;
  height: calc(100% - 10px);
  box-sizing: border-box;
  width: calc(100% - 10px);
  border-radius: 50%;
  border: 1px solid #25ceff;
}
.qrbox {
  border-radius: 20px;
  width: calc(100% - 30px);
  background: white;
  overflow: hidden;
  border-radius: 20px;
  margin: 0 auto;
  position: relative;
  max-width: 320px;
}
.qrbox:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
svg {
  height: 100%;
  width: 100%;
}
.stamp.checked {
  color: white;
}

/* codepen code */

body {
  background-color: white;
  margin: 0;
  font-family: helvetica;
  padding: 0;
  min-height: 100vh;
}

.card {
  /* transform: translateZ(-100px); */
  width: calc(100vw - 30px) !important;
  max-width: 400px;
  overflow: hidden;
  /* background: purple; */
  /* max-width: 600px; */
  box-sizing: border-box;
  transition: all .5s ease;
  height: calc(100vh - 140px);
  /* border-radius: 15px; */
}

.cards {
  width: calc(100% - 0px);
  /*   border-radius: 50px; */
  overflow: hidden;
  margin: 0px auto;
  margin-top: 20px;
  min-height: 50px;
}
.slick-slide {
  margin: 10px;
  outline: none;
  transition: all 0.5s ease;
  opacity: 0.9;
  border-radius: 15px;
  overflow: hidden;
  /*   min-width: 300px; */
  background: black;
}
.slick-slide .card {
  opacity: 0;
}
.slick-current {
  opacity: 1;
  transform: translateZ(0px);

  background: #25ceff;
}
.slick-current .card {
  opacity: 1;
}
button.colapse {
  height: 40px;
  min-width: 150px;
  border-radius: 25px;
  background: #25ceff;
  float: right;
  color: white;
  display: none;
  border: none;
  font-size: 15px;
  text-transform: uppercase;
  margin-right: 10px;
}
.colapse ul {
  padding: 0;
  margin: 0;
  padding-bottom: 20px;
  width: 100%;
  height: 300px;
  /*   position: relative; */
}
.stampcard li {
  display: block;
  height: 50px;
  border-radius: 10px;
  color: white;
  border: 1px solid black;
  margin: 0px;
  position: absolute;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  width: calc(100% - 20px);
  background: black;
  line-height: 50px;
  padding: 0px 20px;
  box-sizing: border-box;
  transform: translateX(-50%);
  left: 50%;
  overflow: hidden;
  transition: all 0.4s ease;
}

#suprise {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.loyalty {
  min-height: 100%;
  box-sizing: border-box;
  color: white;
  text-align: center;
  font-family: arial;
  position: absolute;
  top: 0;
  left: 0;
  /* max-width: 500px; */
  /* background: #25ceff; */
  width: 100%;
  margin: 0 auto;

  /* background: rgb(205, 27, 27); */
  padding-top: 15px;
}
.stampbox {
  min-height: 90px;
  /* background: purple; */
  max-width: 320px;
  width: calc(100% - 30px);
  text-align: center;
  margin: 0 auto;
  /* padding */
}
.qrbox .content {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.stamp {
  height: 50px;
  width: 50px;
  margin: 2px;
  display: inline-block;
  position: relative;
  background: white;
  border-radius: 50%;
  line-height: 50px;
  color: black;
}
.stamp::after {
  content: "";
  top: 5px;
  left: 5px;
  position: absolute;
  height: calc(100% - 10px);
  box-sizing: border-box;
  width: calc(100% - 10px);
  border-radius: 50%;
  border: 1px solid #25ceff;
}
.qrbox {
  border-radius: 20px;
  width: calc(100% - 30px);
  background: white;
  overflow: hidden;
  border-radius: 20px;
  margin: 0 auto;
  position: relative;
  max-width: 220px;
}
.qrbox:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
svg {
  height: 100%;
  width: 100%;
}
.stamp.checked {
  color: white;
}

@media screen and (max-width: 320px) {
  .stamp {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
  .qrbox {
    width: 180px;
  }
}
</style>
