const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

// app.get('/', (req, res) => {
//     //TODO: redirect to URL
//     res.json({
//         mess: "test"
//     })
// });

// app.post('/url/:id', (req, res)=> {
//     //TODO: Get the specific URL 
    
// })

// app.get('/:id', (req, res) => {
//     //TODO: redirect to URL

// });
app.get('/url', (req, res)=> {
    //TODO: Create a short URL 
    res.json({
        messagag: "HI"
    })
})

// app.post('/url', (req, res)=> {
//     //TODO: Create a short URL 
     
// })

const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
    
})