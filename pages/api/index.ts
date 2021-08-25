import { NextApiRequest, NextApiResponse } from "next";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import Razorpay from "razorpay";

const screenshot = require("screenshot-desktop");
const activeWindows = require("active-windows");
let internetAvailable = require("internet-available");
const path = require("path");
let ioHook = require("iohook");;
let fs = require("fs");
let fs1 = require("fs-extra");
let data: any;
let dataint: any;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    data = req.body;
    handle();
    (async () => {
      const files = await imagemin(
        ["assetsonline/*.jpg", "assetsoffline/*.jpg"],
        {
          destination: "assets",
          plugins: [imageminMozjpeg({ quality: 10 })],
        }
      ).then((res) => {
        console.log("31",res);
      });
    })();
    res.json("starting image processing");
};

const handle = () => {
  let ontoogle: boolean;
  let intervals: number = 50000;
  let mouse = 0;
  let key = 0;
  let userId = "008";
  ontoogle = data.on;
  intervals = data.interval;
  console.log("47",data.on,data.interval);
  let interval: any;

  internetAvailable().then(function () {
    const directoryPath1 = path.join(process.cwd(), "assetsoffline/" + userId);
    const directoryPath2 = path.join(process.cwd(), "assetsonline/" + userId);
    let file1 = [];
    fs.readdir(directoryPath1, function (err, files) {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      files.forEach(function (file) {
        file1.push(file);
      });
      fs.readdir(directoryPath2, function (err, filess) {
        if (err) {
          return console.log("Unable to scan directory: " + err);
        }
        for (let i = 0; i < file1.length; i++) {
          for (let j = 0; j < filess.length; j++) {
            if (file1[i] != filess[j]) {
              fs1.move(
                directoryPath1 + "/" + file1[i],
                directoryPath2 + "/" + file1[i],
                (err) => {
                  if (err) return console.log(err);
                  console.log("success!");
                }
              );
            } else {
              console.log("exists");
            }
          }
        }
      });
    });
  });

  if (ontoogle) {

    interval = setInterval(() => {
      let date = new Date().getTime().toString();
      let cwindow = activeWindows.getActiveWindow().windowName.toString();
      let ss = "screenshot¥" + date + "¥" + cwindow + "¥" + userId;

      internetAvailable()
        .then(function () {
          const directoryPath1 = path.join(
            process.cwd(),
            "assetsoffline/" + userId
          );
          const directoryPath2 = path.join(
            process.cwd(),
            "assetsonline/" + userId
          );
          fs.readdir(directoryPath1, function (err, files) {
            if (err) {
              return console.log("Unable to scan directory: " + err);
            }
            files.forEach(function (file) {
              fs.readdir(directoryPath2, function (err, filess) {
                if (err) {
                  return console.log("Unable to scan directory: " + err);
                }
                filess.forEach(function (fil) {
                  if (!file === fil) {
                    fs.move(
                      directoryPath1 + "/file",
                      directoryPath2 + "/",
                      (err) => {
                        if (err) return console.error(err);
                        console.log("success!");
                      }
                    );
                  }
                });
              });
            });
          });

          if (!fs.existsSync("assetsonline/" + userId)) {
            fs.mkdirSync("assetsonline/" + userId);
          }
          screenshot({
            filename: "assetsonline/" + userId + "/" + ss + ".jpg",
          }).then((imgPath) => {
            console.log("image captured");
          });
        })

        .catch(function () {
          if (!fs.existsSync("assetsoffline/" + userId)) {
            fs.mkdirSync("assetsoffline/" + userId);
          }
          screenshot({
            filename: "assetsoffline/" + userId + "/" + ss + ".jpg",
          }).then((imgPath) => {
            console.log(imgPath);
          });
        });

      console.log("mouse5->" + mouse);
      console.log("key5->" + key);
      dataint = interval;
    }, intervals);

    ioHook.on("mouseclick", (event) => {
      mouse = mouse + 1;
    });
    ioHook.on("keyup", (event) => {
      key = key + 1;
    });
    ioHook.start();
  } else {
    ioHook = "hello there";
    console.log(dataint);
    clearInterval(dataint);
    return;
  }
  console.log("started");
};

const instantiate = () => {
  var instance = new Razorpay({
    key_id: "rzp_test_n727zonDWYrJP0",
    key_secret: "ELtr2WRgQbboZiFG5NHnXark",
  });
  var instance = new Razorpay({
    key_id: "YOUR_KEY_ID",
    key_secret: "YOUR_SECRET",
  });

  var options = {
    amount: 50000,
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  instance.orders.create(options, function (err, order) {
    console.log(order);
  });
};
