const apiKey = '&apikey=bc476bc7';
const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios').default;
const app = express();
app.listen(process.env.PORT);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.render('search')
})

app.get('/results', function(req, res){
    //value of input text field with the name of search
    let search = req.query.search;
    axios.get(`http://www.omdbapi.com/?s=${search}${apiKey}`)
        .then(function (response) {
        // handle success
        let data = response['data'];
        res.render('results', {data: data});
    })
        .catch(function (error) {
        // handle error
        console.log(error);
    });
});

app.get('/info/:name', function(req, res){
    //value of input text field with the name of title
    let name = req.params.name;
    axios.get(`http://www.omdbapi.com/?t=${name}${apiKey}`)
        .then(function (response) {
        // handle success
        let data = response['data'];
        res.render('info', {data: data});
    })
        .catch(function (error) {
        // handle error
        console.log(error);
    });
});
