const Events = require( '../models/events.model' )
const express = require ( 'express' )
const formData = require( 'express-form-data' );
const router = express.Router();
router.use( formData.parse() );    

// --- GET - alle
router.get( '/', async (req, res) => {
    console.log ("Events - GET/Hent")
    try {
        const event = await Events.find()
        res.status( 200 ).json( event )
    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl ved GET" } )
    }
} )

// opret
router.post('/activity', async (req, res) => {

    console.log("Events - POST/opret ny");

    
    try {
        let event = new Events(req.body);
        event = await event.save();
        res.status(201).json({ message: "Ny er oprettet", event: event });

    } catch (error) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", event: null } );
    }

});


// --- RET/PUT - admin
router.put( '/admin', async ( req, res ) => {

    console.log( "Events - PUT/ret" )

    try {

        let event = await Events.findOneAndUpdate( {}, req.body, { new: true } ); 
        res.status( 200 ).json( { message: "Der er rettet!", event: event } );

    } catch ( error ) {
        res.status( 500 ).json( { message: "Der er opstået en fejl", event: null } ); 
    }

} );


module.exports = router;
