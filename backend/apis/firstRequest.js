var request = require('request');
request('https://michael-scott-quotes.herokuapp.com/quote', function (error, response, body) {
    if(!error && response.statusCode == 200){
        var parsedData = JSON.parse(body);
        console.log(parsedData.quote," - ",parsedData.author); 
    }
});