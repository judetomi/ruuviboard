const {Router} = require('express')
const router = Router()
const mysql = require('mysql')

// database class
class Database {
	constructor( config ) {
		this.connection = mysql.createConnection( config );
	}
	query( sql, args ) {
		return new Promise( ( resolve, reject ) => {
			this.connection.query( sql, args, ( err, rows ) => {
				if ( err )
					return reject( err );
				resolve( rows );
			} );
		} );
	}
	close() {
		return new Promise( ( resolve, reject ) => {
			this.connection.end( err => {
				if ( err )
					return reject( err );
				resolve();
			} );
		} );
	}
}

// execute some sql
Database.execute = function( config, callback ) {
	const database = new Database( config )
	return callback( database ).then(
		result => database.close().then( () => result ),
		err => database.close().then( () => { throw err } )
	)
}

// async function to get the data from database
async function GetTagData(sql, params) {
	try {  
		var temperatures = [];
		let connectionStr = {host: 'localhost', user: 'writer', password: 'writer', database: 'ruuvitagdata'};
		let currentdate = new Date().toISOString().slice(0,10);
		let rows = await Database.execute( connectionStr,
			database => database.query(sql, params))

		for (let i = 0; i < rows.length; i++) {
	    temperatures.push(rows[i].temperature)
		}
	
		return temperatures;

	} catch(err) {
		console.log(err)
	}
}

// temp tags hardcoded :P
var tagdata = {
	"temperatures": [
		{
	    "id": 1,
	    "label": "Makuuhuone",
	    "mac": "F4:0A:9D:29:52:59",
	    "backgroundColor": "#FF0000",
	    "fill": false,
	    "data": []
		},
		{
	    "id": 2,
	    "label": "Poikien huone",
	    "mac": "F5:F9:A7:07:AE:75",
	    "backgroundColor": "#00FF00",
	    "fill": false,
	    "data": []
		},
		{
	    "id": 3,
	    "label": "Takapiha",
	    "mac": "C4:6A:A8:4A:5F:8F",
	    "backgroundColor": "#0000FF",
	    "fill": false,
	    "data": []
		}
	]
};

// router to get the tags temperatures
router.get('/tagdata', (request, response) => {
	var test = [];
	Object.keys(tagdata["temperatures"]).forEach(function(key) {
		let currentdate = new Date().toISOString().slice(0,10);
		let tag = tagdata["temperatures"][key];
		let sql = "SELECT * FROM observations WHERE ob_date = ? AND tag_mac = ? ORDER BY obtime";
		let testi = GetTagData(sql, [currentdate, tag.mac]);
		test.push(testi);
	})

	Promise.all(test).then(function(result) {
		Object.keys(result).forEach(function(key) {
	    if(result[key][0]) {
				tagdata['temperatures'][key]['data'] = result[key];
	    }
		})
		//console.log(tagdata);
		response.send(tagdata);
	});
})

module.exports = router
