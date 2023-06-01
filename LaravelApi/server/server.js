
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require("axios");

app.use(cors());

// Definicja tras i logika obsługi żądań
app.get("/publications/", async (req, res) => {
    try {
        var data;
        axios.get("http://localhost/example-app/api/publications/").then(res =>{
            try {
                data = res.data
            } catch (error) {
                console.log(data)
            }
        })
      res.json({ publications: data });
    } catch (error) {
      console.log(error);
    }
  });



app.listen(5000, () => {
  console.log('Serwer nasłuchuje na porcie 3000');
});
