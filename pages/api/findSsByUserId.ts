import { NextApiRequest, NextApiResponse } from "next";

let fs = require("fs");
const path = require("path");

let data: any;
export default async (req: NextApiRequest, res: NextApiResponse) => {
  data = req.body;
  const directoryPath1 = path.join(process.cwd(), "assetsonline/" + data.id);
  fs.readdir(directoryPath1, function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    
    res.send({ directory: process.cwd(), file: files });
    let senddata = []

    files.forEach(function (file) {
      let timestamp = file.split("¥")[1];
      let windowTitle = file.split("¥")[2];
      senddata.push({
        userId: data.id,
        projectId:data.id,
        screenShot: [
          {
            timeStamp: timestamp,
            windowTitle: windowTitle,
            mouseClick: [],
            keyboardclick: [],
            WorkTitle: "workTitle",
          }
        ]
      })
    });
    console.log(senddata);
    
    // res.send({
    //   datasend: senddata,
    // });
  });
};
