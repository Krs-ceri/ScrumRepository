// --------------------------- Déclaration de variables  ------------------------

const port = 3012;
const express = require('express');
var multer  = require('multer')
const app = express();
var server = app.listen(port, function() { console.log("Serveur en écoute sur le port " + port)});
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const ibantools = require('ibantools');

// --------------------------Fin Déclaration de variables  ------------------------

app.use(bodyParser.urlencoded({limit:'50mb', extended:true}));
app.use(bodyParser.json({limit:'50mb'}));

// ------------------------- Définition des middleware ----------------------------

// -------------------------- Définition des chemins -----------------------------
// Definition du chemin index
app.use(express.static('CERIGame'));
// --------------------------------------------------------------------------------

app.get('/verifierIban', (req, resp) =>
{
	console.log("IBAN: " + req.query.iban);

	const iban = ibantools.electronicFormatIBAN(req.query.iban);

	if(ibantools.isValidIBAN(iban))
	{
		if(iban.substring(0,2) == "FR" || iban.substring(0,2) == "BE")
		{
			console.log("IBAN OK");
			resp.send("IBAN OK");
		}
		else
		{
			console.log("PAYS NON PRIS EN CHARGE");
			resp.send("PAYS NON PRIS EN CHARGE");
		}
		
	}	
	else
	{
		console.log("IBAN NON CONFORME");
		resp.send("IBAN NON CONFORME");
	}

});

