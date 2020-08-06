const express = require('express');
const cors= require('cors');
const {graphqlHTTP} = require('express-graphql');
const app = express();
const path=require('path')
const schema= require('./schema');


app.use(cors());
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true
}));

app.use(express.static('public'))

app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

const PORT= process.env.PORT || 5000;

app.listen(PORT, ()=> console.log("logged at port"+PORT));