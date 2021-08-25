import { NextApiRequest, NextApiResponse } from "next";

let fs = require("fs");
const path = require("path");

let data: any;
export default async (req: NextApiRequest, res: NextApiResponse) => {
  data = req.body;
    handle();
    res.json("started");
};

const handle = () => {
  const directoryPath1 = path.join(process.cwd(), "assetsonline/" + data.id);
  try {
    data.ss.forEach(function(d){
      fs.unlinkSync(directoryPath1+"/"+d)
    })
  } catch(err) {
    console.error(err)
  }
};
