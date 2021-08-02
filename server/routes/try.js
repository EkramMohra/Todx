// const express = require("express");
// const router = express.Router();
// const elasticsearch = require("elasticsearch");

// const client = new elasticsearch.Client({
//   hosts: "localhost:9200",
// });

// client.ping({requestTimeout: 30000},function (error) {
//     if (error) {
//       console.error("elasticsearch cluster is down!");
//     } else {
//       console.log("Everything is ok");
//     }
//   });

// router.get("/products", function (req, res) {
//   const searchText = req.query.text;
//   client.search({
//     index: "products",
//     body: {
//       query: {
//         // match: {
//         //   // name: searchText.trim(),
//         //   id:400
//         // },
//       //   term : {
//       //     id : 200
//       // },
//       //   wildcard : {
//       //     description : "the*"
//       // }
//         // bool:{
//         //   must:
//         // }
//       // }
//         bool: {
//           must:[
//             {
//               match:{
//               name: searchText.trim()}},
//             {
//               range : {
//               price: {
//                   gte: 1000,
//                   lte: 3000
//               }

//             }
//           }
//           ]
//         },
//         // range: {
//         //   "price": {
//         //     "gte": "1000",
//         //     "lt": "5000"
//         //   }
//         // }
//       },
//     },
//   }).then((response) => {
//       return res.json(response);
//     }).catch((err) => {
//       return res.status(500).json({ message: "Error" });
//     });
// });

// router.post("/products", function (req, res) {
//   client
//     .index({
//       index: "products",
//       body: {
//         id: req.body.id,
//         name: req.body.name,
//         price: req.body.price,
//         description: req.body.description,
//       },
//     })
//     .then((response) => {
//       return res.json({ message: "Indexing successful" });
//     })
//     .catch((err) => {
//       return res.status(500).json({ message: "Error" });
//     });
// });

// router.post("/shop", function (req, res) {
//   client
//     .index({
//       index: "shop",
//       body: {
//         name: req.body.name,
//         price: req.body.price,
//         color:req.body.color
//       },
//     })
//     .then((response) => {
//       return res.json({ message: "Indexing successful" });
//     })
//     .catch((err) => {
//       return res.status(500).json({ message: "Error" });
//     });
// });

// module.exports = router;

let arr = ['aa','bb','cc']
arr[0] = arr[0]+arr[1]

console.log(arr)