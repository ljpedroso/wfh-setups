const sqlite3 = require("sqlite3").verbose();

export default (req, res) => {
  switch (req.method) {
    case "GET":
      {
        const db = new sqlite3.Database(
          "./mydb.db",
          sqlite3.OPEN_READWRITE,
          (err) => {
            if (err) {
              console.error("Error conecting");
            }
          }
        );

        db.all(
          "SELECT id, nickname, image_url, thumbnail_url FROM setups ",
          [],
          (err, rows) => {
            if (err) {
              res.statusCode = 500;
              res.send(err.message);
            } else {
              res.statusCode = 200;
              res.json(rows);
            }
          }
        );

        db.close();

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
          {
            id: 5,
            nickname: "The Rocker",
            imgUrl:
              "https://images-projectx.nyc3.digitaloceanspaces.com/the-rocker.jpeg",
          },
        ];
      }
      break;
    case "POST":
      {
      }
      break;

    default:
      break;
  }
};
