var express = require("express");
var app = express();
var request = require("request");

var hash = "000000000000000001b2f6c5ab6bf39114264f7526c1bce74d41a47ef8f2cd07";
var out_value = 0;

// 요구사항 1. args : hash, print info(n_tx, avg_value_of_tx, avg_fee, avg_size) 
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

// 요구사항 2. args : hash, print outinfo(spend, tx_index, type, addr, value, n, script)
function bitcoin_outinfo(blockhash){
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
                var spend = item2.spent;
                var tx_index = item2.tx_index;
                var type = item2.type;
                var addr = item2.addr;
                var value = item2.value;
                var n = item2.n;
                var script = item2.script;
                
                console.log("spend : " + spend);
                console.log("tx_index : " + tx_index);
                console.log("type : " + type);
                console.log("addr : " + addr);
                console.log("value : " + value);
                console.log("n : " + n);
                console.log("script : " + script + "\n");
            });
        });
    });
};

bitcoin_outinfo(hash);

bitcoin_request(hash);

app.get("/", function(req, res){
    res.send("Bitcoin");
});

app.listen(80, function(){ 
    console.log("start");
});