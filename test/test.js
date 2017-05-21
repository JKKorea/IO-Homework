var request = require("request");
var assert = require("chai").assert;

var baseUrl = "https://blockchain.info/block-index/";
var hash = "000000000000000001b2f6c5ab6bf39114264f7526c1bce74d41a47ef8f2cd07";

describe('App', function(){
    if('n_tx is 2393', function(){
        request.get({url: baseUrl + hash +"?format=json"},
            function(err, res, body){
				if(err){
	            	console.log("request 시 에러 발생. 에러 : " + err);
	            	return;
       			}
            var bodyObj = JSON.parse(body);
  
            assert.equal(bodyObj.n_tx,2393);
            console.log(body);
        });
    });

    if ('check blockchain.info response statusCode is 200', function(){
    	request.get({url: baseUrl + hash +"?format=json"},
            function(err, res, body){
				if(err){
	            	console.log("request 시 에러 발생. 에러 : " + err);
	            	return;
       			}
       		assert.equal(res.statusCode,200);
    });

    if ('check btc-e.com response statusCode is 200', function(){
    	request.get({url: "https://btc-e.com/api/3/ticker/btc_usd"},
            function(err, res, body){
				if(err){
	            	console.log("request 시 에러 발생. 에러 : " + err);
	            	return;
       			}
       		assert.equal(res.statusCode,200);
    });
});