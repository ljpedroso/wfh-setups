import Formidable from "Formidable";
const fs = require("fs");
const AWS = require("aws-sdk");

const spacesEndpoint = new AWS.Endpoint("nyc3.digitaloceanspaces.com");
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadForm = (next) => (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const form = new Formidable.IncomingForm({
        multiples: false,
        keepExtensions: true,
      });
      form.on("progress", function (bytesReceived, bytesExpected) {
        console.log(
          "onprogress",
          parseInt((100 * bytesReceived) / bytesExpected),
          "%"
        );
      });

      form.once("error", console.error);
      form
        .on("fileBegin", (name, file) => {
          console.log("start uploading: ", file.name);
        })
        .on("aborted", () => console.log("Aborted..."));
      form.once("end", () => {
        console.log("Done!");
      });
      await form.parse(req, async (err, fields, files) => {
        if (err) {
          throw String(JSON.stringify(err, null, 2));
        }
        console.log("FILES", files.image);

        var params = {
          Bucket: "images-projectx",
          Key: files.image.name,
          Body: fs.createReadStream(files.image.path),
          ACL: "public-read",
        };

        s3.putObject(params, (err, data) => {
          if (err) return err;
          console.log(data);
        });

        req.form = { fields, files };
        return resolve(next(req, res));
      });
    } catch (error) {
      return resolve(res.status(403).send(error));
    }
  });
};

function handler(req, res) {
  if (req.method === "POST") {
    const image = req.form.files.image;

    res.status(200).send({ msg: "OK", image: image.name });
  } else {
    throw String("Method not allowed");
  }
}

export default uploadForm(handler);
