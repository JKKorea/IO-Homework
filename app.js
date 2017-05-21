var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");
var bitcore = require("bitcore-lib");

var hash = "000000000000000001b2f6c5ab6bf39114264f7526c1bce74d41a47ef8f2cd07";

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set("view engine", "ejs");

function Wallet(uinput, cb){

    var input = new Buffer(uinput);
    var hash = bitcore.crypto.Hash.sha256(input);
    var bn = bitcore.crypto.BN.fromBuffer(hash);
    var pk = new bitcore.PrivateKey(bn).toWIF(); // wallet import format
    var addy = new bitcore.PrivateKey(bn).toAddress();
    
    cb(pk, addy);
}

function getPrice(returnPrice){
    request({
    url: "https://btc-e.com/api/3/ticker/btc_usd",
    json: true
    }, function(err, res, body){
        returnPrice(body.btc_usd.last);
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

// 요구사항 1. args : hash, print info(n_tx, avg_value_of_tx, avg_fee, avg_size) 
function bitcoin_request(blockhash, returnPrice){
    request({
        url: "https://blockchain.info/block-index/" + blockhash +"?format=json",
        json: true
}, function(err, response, body){
        if(err){
            console.log("request 시 에러 발생. 에러 : " + err);
            return;
        }    
        var out_value = 0;
        body.tx.forEach(function(item1){
            item1.out.forEach(function(item2){
                out_value += item2.value;
            })
        });
        returnPrice(out_value, body.n_tx, body.fee, body.size);
});
}

app.get("/", function(req, res){
    bitcoin_request(hash, function(out_value, n_tx, fee, size, item3){
        res.render("index", {
        out_value : out_value,
        n_tx: n_tx,
        fee: fee,
        size: size
        });
    bitcoin_outinfo(hash);
    });  
});

app.get("/wallet", function(req, res){
    getPrice(function(lastPrice){
        res.render("wallet", {
            lastPrice: lastPrice
        });
    });
});

app.get("/converter", function(req, res){
    getPrice(function(lastPrice){
        res.render("converter", {
            lastPrice: lastPrice
        });
    });
});

app.post("/wallet", function(req, res){
    var src = req.body.src;
    console.log(src);
    Wallet(src, function(priv, addr){
        res.send("The My wallet of: " + src + "<br>Addy: " + addr + "<br>Private Key: " + priv);
    });
    
});

app.listen(80, function(){
    console.log("go");
});