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
