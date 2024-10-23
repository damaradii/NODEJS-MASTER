const fs = require("node:fs");
const readline = require("node:readline");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = {};

// contoh script pembuatan folder
app.makeFolder = () => {
  rl.question("Masukan Nama Folder : ", (folderName) => {
    fs.mkdir(__dirname + `/${folderName}`, () => {
      console.log("success created new folder");
    });
    rl.close();
  });
};

app.makeFile = () => {
  rl.question("Masukan Nama File : ", (fileName) => {
    fs.writeFile(__dirname + `/${fileName}`, "", () => {
      console.log("Berhasil membuat file baru");
    });
    rl.close();
  });
};

app.readFile = () => {
  const image = [".png", ".jpg", ".jpeg"];

  rl.question("Masukan Nama File : ", (fileName) => {
    const fileExtension = path.extname(fileName);
    if (image.includes(fileExtension)) {
      console.log("format file tidak di dukung");
      rl.close();
      return;
    }
    try {
      const filePath = path.join(__dirname, `/${fileName}`);
      const data = fs.readFileSync(filePath, "utf8");
      console.log(data);
    } catch (err) {
      console.error(err);
    }
    rl.close();
  });
};

module.exports = app;
