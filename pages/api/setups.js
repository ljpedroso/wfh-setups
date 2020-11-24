const AWS = require("aws-sdk");

const port = process.env.PORT;

const spacesEndpoint = new AWS.Endpoint("nyc3.digitaloceanspaces.com");
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
});

export default (req, res) => {
  switch (req.method) {
    case "GET":
      {
        const setupList = [
          {
            id: 1,
            nickname: "The Natural",
            imgUrl:
              "https://images-projectx.nyc3.digitaloceanspaces.com/the-natural.jpg",
          },
          {
            id: 2,
            nickname: "The Essential",
            imgUrl:
              "https://images-projectx.nyc3.digitaloceanspaces.com/the-essential.jpg",
          },
          {
            id: 3,
            nickname: "The Soother",
            imgUrl:
              "https://images-projectx.nyc3.digitaloceanspaces.com/the-soother.jpg",
          },
          {
            id: 4,
            nickname: "The Modern",
            imgUrl:
              "https://images-projectx.nyc3.digitaloceanspaces.com/the-modern.jpg",
          },
        ];

        res.statusCode = 200;
        res.json(setupList);
      }
      break;
    case "POST":
      {
        const image = req.files.image;
        var params = {
          Bucket: "images-projectx",
          Key: image.name,
          Body: image.data,
          ACL: "public-read",
        };

        s3.putObject(params)
          .promise()
          .then((data) => {
            const newImage = {
              url: `https://images-projectx.nyc3.digitaloceanspaces.com/${image.name}`,
              name: image.name,
            };
            res.statusCode = 200;
            res.json({ msg: "OK", image: newImage });
          })
          .catch((err) => {
            console.log(err, err.stack);
            res.statusCode = 500;
            res.json({ error: err.stack });
          });
      }
      break;

    default:
      break;
  }
};
