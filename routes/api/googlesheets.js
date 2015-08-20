var async = require('async'),
	keystone = require('keystone');
var request = require("request");
var GoogleSpreadsheet = require("google-spreadsheet");
var my_sheet = new GoogleSpreadsheet('10Ky6T0EkQ4Ssk78ROcoK8DqqMSOmaMbG5-DT9F5YsZU');


function run(req, res) {
	var creds = {
		client_email: '825404926656-fd4j9frs0gqlgkrkmb6famt0ljhq1ctc@developer.gserviceaccount.com',
		private_key: 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRbkAdr+6DIMUE\nhV34O40X0zSM+cEYNPT84EUxYoMZVoOzTn9mu4RQ4s+Im6hre+Zs/BmU7QUhnFqc\nLLWDfo1mpg6GZFB7ejK8rJpnD5VIdhXTejGGulpjoKkBdqNf9ysU/CpFhGV1wkVJ\no6/sgy+AWqI8qsxZ6YUVHdqg+B0VoK66LtezPBsXk3y+4C1Q0m2iaHEDZ21De+GH\ngloBtuqlTtBrkTBb1a6YzDLUlZ/RIDYp/hOxUAXGrMTL6LJ18Cftm7rvMbRDJ9wJ\nolqRnnm+NdD3/bjuT2x++bBG3jtH76loNxmqTSFwTrFb/eQVezis+lsEw3UaAGqj\npjz0nfhRAgMBAAECggEAXAlokeNcHTJMgvUdW9bH5b2CraWgr0Oummbw4Ygadwsn\nK6iGop4rwuQ6Mh2+ASZdGG4dy+3xwFiXFWUsi9IU0BSP842oNOt52qK75CjcAREr\n/FkJ5NyGlpvnSeZaW/UicMF0zkIl2H98taUCzhzExlKOU7z3u1e9jY8mInGHTpYY\nAD5Pv1W7V4DYizOfVUVxvAWLYGvUwjpSjDFRBy5GGNAa4UO/udVJ9zq6FjSrv15v\nVn7Erbyxa93FfOOror8uCdrvPIP6c22WU4zTIVHLuJmsMKDwAQVJ1pdqP9q8RmQh\nIpA/pXUOd3v2ArDlcBVBAXwO+miHVR4I48ZsOgESAQKBgQD0qyyqLAkaHoOT4tcJ\n6F+paHEZ8aQvHU7qUdEusEg3K3AtoDbUyDt3B8ywrGPD/wwwGrfJnX8XwfSI+yic\nYCX5JJ+WnEdwXhgPp9NpFk24ec5W0C/sY8xYJZaie3iOrXLh9E0d+YUjVUx55Nz3\nA+OrJD+kNKgeXzjl+N/MiSLt4QKBgQDbIUofQZaoE3x5bEcxkYZADtheZxvlV8Fj\noMhrdmpFqCjbuPBqMW/SADk+7us9RAl+SYeFZ3jegwQKjI5FHqmHLD5zK6S4pIV5\n+Y2I+jWga5372t9CabOhUrfewPZMloByBwH4uXD7o3iig3wM9gyNbgTCwUj3Vyux\nRYyZ4+H4cQKBgHt0yCPR9oHMdd4wbwtbyrFjtvY9XPg9FK3dvOyPHNFhxMfw+Nnj\nc0X7lIhtZCXo0xCO2sAMDa5COw7HlNVbGq4dkb1gfBeyEvgLWfzDuVHlfH2HrTbd\noKW1yc2Q+eMcmER1jlgaqNiMWPuExQ6LUtzvfIFx5Ib2y3IXY24EoLBhAoGBAItT\nJjKrXCPvh9QYIUgF8+rkxXN4cYcnfcFfqC6TcsxpN9lERC/w0N0f4UX/WLhyeuq9\ny5npiTNI8BfY+FhAP5+/ZNGLbUcs6+T645+1HsWpxyAsMImkdV7cHiZWYAOgKXjW\ntc0z8v88F+aUXRpMkvyVeBdwF3mUBibHRrdN6g4xAoGABv1Gj2AiPRjlsc40A7y5\nM1CBLRNe/+TYNQgfttOACQR7naLPc09BJ+wJoIwTv20b+zpVAmnZkdy2YzIOj2gZ\n0ID2uhkoG7LXJOrkGPOSdr4sIqp+ob7hjG1uVuixjJYZxsaRhFmmReQ7Mpp2P06H\n2/Ua2KWurjFRtT2eOBzZIvk\u003d'
	}
	console.log(creds);
	my_sheet.useServiceAccountAuth(creds, function(err){
	    // getInfo returns info about the sheet and an array or "worksheet" objects 
	    my_sheet.getInfo( function( err, sheet_info ){
	        console.log( sheet_info.title + ' is loaded' );
	        // use worksheet object if you want to stop using the # in your calls 
	 
	    });
	});
};


