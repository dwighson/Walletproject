<template>
  <div class="container">
    <div id="scanner"></div>
    <button class="startscan">scan</button>
  </div>
</template>

<script>
var gun = window.Gun(["https://dwilo.herokuapp.com/gun"]);

export default {
  mounted() {
    function onQRCodeScanned(scannedText) {
      
      gun.get("user-" + "dwighson@gmail.com").once(user => {
        let stamps = user["stamp-poke"];
        // this.stamps = stamps;
        setTimeout(() => {
         
          if (stamps >= 10) {
            console.log("reset stamps");
            // this.stop()
            gun.get("user-" + "dwighson@gmail.com").put({
              "stamp-poke": 0
            });
          } else {
            gun.get("user-" + "dwighson@gmail.com").put({
              "stamp-poke": stamps + 1
            });
            alert('stamp added!')
          }
        }, 200);
      });
      gun.get("user-" + "dwighson@gmail.com").once(user => {
        // console.log(user);
      });
    }
    function provideVideo() {
      var n = navigator;

      if (n.mediaDevices && n.mediaDevices.getUserMedia) {
        return n.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment"
          },
          audio: false
        });
      }

      return Promise.reject("Your browser does not support getUserMedia");
    }
    //funtion returning a promise with a video stream
    function provideVideoQQ() {
      return navigator.mediaDevices
        .enumerateDevices()
        .then(function(devices) {
          var exCameras = [];
          devices.forEach(function(device) {
            if (device.kind === "videoinput") {
              exCameras.push(device.deviceId);
            }
          });

          return Promise.resolve(exCameras);
        })
        .then(function(ids) {
          if (ids.length === 0) {
            return Promise.reject("Could not find a webcam");
          }

          return navigator.mediaDevices.getUserMedia({
            video: {
              optional: [
                {
                  sourceId: ids.length === 1 ? ids[0] : ids[1] //this way QQ browser opens the rear camera
                }
              ]
            }
          });
        });
    }

    //this function will be called when JsQRScanner is ready to use
    function JsQRScannerReady() {
      //create a new scanner passing to it a callback function that will be invoked when
      //the scanner succesfully scan a QR code
      var jbScanner = new JsQRScanner(onQRCodeScanned);
      //reduce the size of analyzed images to increase performance on mobile devices
      // jbScanner.setSnapImageMaxSize(300);
      var scannerParentElement = document.getElementById("scanner");
      if (scannerParentElement) {
        //append the jbScanner to an existing DOM element
        jbScanner.appendTo(scannerParentElement);
      }
    }
    document.querySelector(".startscan").addEventListener("click", function() {
      JsQRScannerReady();
    });
  }
};
</script>
<style >
.container {
  /* background: purple; */
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}
.qrPreviewVideo {
  height: 100vh;
}
.startscan {
  height: 50px;
  width: calc(100% - 20px);
  border: none;
  border-radius: 10px;
  position: absolute;
  bottom: 20px;
  background: #25ceff;
  color: white;
  left: 10px;
}
</style>