const fs = require("node:fs");
const readline = require("node:readline");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = {};
const image = [".jpg", ".png", ".jpeg"];
const text = [".txt", ".md"];

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
    rl.question("Masukan Nama Extensi : ", (ExtName) => {
      fs.writeFile(__dirname + `/${fileName}.${ExtName}`, "", () => {
        console.log("Berhasil membuat file baru");
      });
      rl.close();
    });
  });
};

app.readFile = () => {
  rl.question(
    "Masukan Nama Folder (kosongkan jika tidak berada di sub-folder): ",
    (folderName) => {
      rl.question("Masukan Nama File : ", (fileName) => {
        const fileExtensi = path.extname(fileName);
        if (image.includes(fileExtensi)) {
          console.log("format file tidak di dukung");
          rl.close();
          return;
        }
        try {
          const filePath = path.join(__dirname, folderName + `/${fileName}`);
          const data = fs.readFileSync(filePath, "utf8");
          console.log(data);
        } catch (err) {
          console.error(err.message);
        }
        rl.close();
      });
    }
  );
};

app.extSorter = () => {
  const folder = "unorganize_folder";
  const sorter = fs.readdirSync(folder);
  for (let i = 0; i < sorter.length; i++) {
    const file = sorter[i];
    const ext = path.extname(file);
    if (image.includes(ext)) {
      fs.mkdir(__dirname + `/image`, () => {
        console.log("Berhasil Membuat Folder");
      });
      fs.rename(
        __dirname + "/unorganize_folder/" + file,
        __dirname + "/image/" + file,
        (err) => {
          if (err) console.error("Gagal memindahkan file:", err);
        }
      );
    } else if (text.includes(ext)) {
      fs.mkdir(__dirname + `/text`, () => {
        console.log("Berhasil Membuat Folder");
      });
      fs.rename(
        __dirname + "/unorganize_folder/" + file,
        __dirname + "/text/" + file,
        (err) => {
          if (err) console.error("Gagal memindahkan file:", err);
        }
      );
    } else {
      console.log("tidak ada file");
    }
  }

  rl.close();
};

module.exports = app;
