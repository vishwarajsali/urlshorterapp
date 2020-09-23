const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const yup = require('yup')
const monk = require('monk');
const { nanoid } = require('nanoid')

require('dotenv').config();

const db = monk("mongodb+srv://vish:Vish@123@cluster0.ix80s.mongodb.net/URLDB?retryWrites=true&w=majority")
const urls = db.get('urls');
urls.createIndex({slug : 1} , {unique: true})

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));


// app.post('/url/:id', (req, res)=> {
//     // TODO: Get the specific URL 

// })

app.get('/:id', async (req, res, next) => {

    //TODO: redirect to URL
    const {id: slug} = req.params;

    try {
        const url = await urls.findOne({slug});
        if(url){
            res.redirect(url.url)
        }
        res.redirect(`/?error=${slug} Not Found`)
    } catch (error) {
        
        res.redirect(`/?error=Link Not Found`)

    }
});

app.get('/url', async (req, res, next) => {
    
    //TODO: redirect to URL 
 
    const existing = await urls.find();
    console.log(existing);
    res.json(existing)
       
});


const schema = yup.object().shape({
    slug: yup.string().trim().matches(/[\w\-]/i),
    url: yup.string().trim().url().required(),
})

app.post('/url', async (req, res, next) => {

    // TODO : Create a Url 

    let { slug, url } = req.body;
    try {

        await schema.validate({
            slug,
            url,
        });

        if (!slug) {
            slug = nanoid(5);

        }
        else {
            const existing = await urls.findOne({slug});
            if(existing){
                throw new Error("slug taken 🍔")
            }
        }
        slug = slug.toLowerCase();
        const newUrl = {
            url,
            slug,
        }

        const created = await urls.insert(newUrl);
        res.json(created)

    } catch (error) {
       
        next(error)
    }
})


app.use((error, req, res, next) => {
    if (error.status) {
        res.status(error.status)
    } else {
        res.status(500)
    }
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
    })
})

const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);

})