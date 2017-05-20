var express = require("express");
var app = express();
var request = require("request");

var hash = "000000000000000001b2f6c5ab6bf39114264f7526c1bce74d41a47ef8f2cd07";
var out_value = 0;

function bitcoin_request(blockhash){
request({
        url: "https://blockchain.info/block-index/" + blockhash +"?format=json",
        json: true
}, function(err, response, body){
        if(err){
            console.log("request 시 에러 발생. 에러 : " + err);
            return;
        }
        var d_tx = body.tx.forEach(function(item1){
            var out = item1.out.forEach(function(item2){
                out_value += item2.value;
            });
        });
      
        var n_tx = body['n_tx'];
    
        var fee = body['fee'];
        var avg_fee = fee / n_tx;
        
        var size = body['size'];
        var avg_size = size / n_tx;
        
        var avg_value_of_tx = out_value / n_tx;
    
        console.log("n_tx : " + n_tx);
        console.log("avg_value_of_tx : " + avg_value_of_tx);
        console.log("avg_fee : " + avg_fee);
        console.log("avg_size : " + avg_size);
    });
};

bitcoin_request(hash);

app.get("/", function(req, res){
    res.send("Bitcoin");
});

app.listen(80, function(){ 
    console.log("start");
});