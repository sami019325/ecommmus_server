const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');


// middleware
app.use(cors());
app.use(express.json());






const uri = "mongodb+srv://ecoms:qYUPec5lTIoni6WY@cluster0.mmeqena.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {

    const collection = client.db("ecommerce").collection("products");
    try {
        app.get('/a', async (req, res) => {
            console.log(uri)
            res.send(uri);
        })
        // get category 
        app.get('/products', async (req, res) => {
            const query = {};
            const productList = await collection.find(query).toArray();
            res.send(productList);
        });
        app.get('/products/:id', async (req, res) => {
            // console.log(req.params);
            const category = req.params['id']
            const query = { _id: new ObjectId(category) };
            const productList = await collection.findOne(query);
            console.log(productList)
            res.send(productList);
        })
        // app.get('/advertise', async (req, res) => {
        //     // console.log(req.params);
        //     const query = { IsAdvertised: true };
        //     const productList = await products.find(query).toArray();
        //     console.log(productList)
        //     res.send(productList);
        // })
        // app.post('/product/:id', async (req, res) => {
        //     // console.log(req.params);
        //     const category = req.params['id']
        //     const filter = { _id: ObjectId(category) };
        //     // this option instructs the method to create a document if no documents match the filter
        //     // const options = { upsert: true };
        //     // // create a document that sets the plot of the movie
        //     // const updateDoc = {
        //     //     $set: {
        //     //         IsSold: true
        //     //     },
        //     // };
        //     const result = await products.updateOne(filter);
        //     console.log(
        //         result
        //     );
        //     res.send(result)
        // })
        // app.post('/add', async (req, res) => {
        //     const productData = req.body;
        //     console.log(productData);
        //     const result = await products.insertOne(productData);
        //     res.send(result);
        // });
        // // app.delete('/delete/:id', async (req, res) => {
        // //     const category = req.params.id
        // //     const filter = { _id: ObjectId(category) };
        // //     const result = await products.deleteOne(filter)
        // //     res.send(result)
        // // })
        // app.get('/delete/:id', async (req, res) => {
        //     const category = req.params.id
        //     const filter = { _id: ObjectId(category) };
        //     const result = await products.deleteOne(filter)
        //     res.send('result')
        // })

    }
    finally { err => console.error(err); }
}
run().catch(console.dir);












app.use(cors())
app.get('/', (request, response) => {
    response.send('Hello, world')
});

app.listen(port, () => {
    console.log('listening on port ' + port);
});

// ecoms
// qYUPec5lTIoni6WY