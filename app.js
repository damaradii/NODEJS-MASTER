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
  rl.question("Masukan nama folder yang sudah tersedia  : ", (folderName) => {
    rl.question("Masukan Nama File : ", (fileName) => {
      rl.question("Masukan Nama Extensi : ", (ExtName) => {
        fs.writeFile(folderName + `/${fileName}.${ExtName}`, "", () => {
          console.log("Berhasil membuat file baru");
        });
        rl.close();
      });
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

app.readFolder = () => {
  rl.question("Masukan Nama Folder: ", (folderName) => {
    const res = fs.readdirSync(folderName);
    const output = [];

    for (let i = 0; i < res.length; i++) {
      const element = res[i];
      const fileExtensi = path.extname(element);
      const namaFile = path.basename(element, fileExtensi);
      const stat = fs.statSync(__dirname + `/${folderName}/` + element);
      // untuk jenis gambar
      let jenis;
      if (image.includes(fileExtensi)) {
        jenis = "gambar";
      } else if (text.includes(fileExtensi)) {
        jenis = "text";
      }
      // untuk ukuran file
      let ukuran;
      if (stat.size < 1000000) {
        ukuran = `${stat.size / 1000} kb`;
      } else {
        ukuran = `${stat.size / 1000000} mb`;
      }
      try {
        output.push({
          namaFile: namaFile,
          extensi: fileExtensi,
          jenisFile: jenis,
          tanggalDibuat: stat.birthtime,
          ukuranFile: ukuran,
        });
      } catch (error) {}
    }
    console.log(output);
    rl.close();
  });
};

module.exports = app;
