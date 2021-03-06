const apiKey = '&apikey=bc476bc7';
const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios').default;
const app = express();
app.listen(process.env.PORT || 3000);
//app.listen(3000);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  //res.render('search')
  let fetchData = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=f2e1db77c8ae74a5c21ae7b7d5630dfb`
    );

    const tvData = res['data'];
    const res2 = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=f2e1db77c8ae74a5c21ae7b7d5630dfb`
    );

    const movieData = res2['data'];
    return [tvData, movieData];
  };

  (async () => {
    allData = await fetchData();
    tvData = allData[0];
    movieData = allData[1];
    res.render('search', { tvData: tvData, movieData: movieData });
  })();
});

app.get('/results', function (req, res) {
  //value of input text field with the name of search
  let search = req.query.search;
  axios
    .get(
      `https://api.themoviedb.org/3/search/multi?api_key=f2e1db77c8ae74a5c21ae7b7d5630dfb&language=en-US&page=1&query=${search}`
    )
    .then(function (response) {
      // handle success
      let data = response['data'];
      res.render('results', { data: data });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get('/info/:name', function (req, res) {
  //value of input text field with the name of title
  let name = req.params.name;
  axios
    .get(`http://www.omdbapi.com/?t=${name}${apiKey}`)
    .then(function (response) {
      // handle success
      let data = response['data'];
      res.render('info', { data: data });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});
