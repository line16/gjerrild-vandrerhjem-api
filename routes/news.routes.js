const News = require( '../models/news.model' )
const express = require ( 'express' )
const formData = require( 'express-form-data' );
const router = express.Router();
router.use( formData.parse() );    

// --- GET - alle
router.get( '/', async (req, res) => {
    console.log ("News - GET/Hent")
    try {
        const news = await News.findOne()
        res.status( 200 ).json( news)
    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl ved GET" } )
    }
} )

// opret
router.post('/', async (req, res) => {

    console.log("Contactform - POST/opret ny");

    
    try {
        let news = new News(req.body);
        news = await news.save();
        res.status(201).json({ message: "Ny er oprettet", news: news });

    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", news: null } );
    }

});


// --- RET/PUT - admin
router.put( '/admin', async ( req, res ) => {

    console.log( "News - PUT/ret" )

    try {

        let news = await News.findOneAndUpdate( {}, req.body, { new: true } ); 
        res.status( 200 ).json( { message: "Der er rettet!", news: news } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", news: null } ); 
    }

} );


module.exports = router;