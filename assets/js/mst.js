axios.get('http://127.0.0.1:81/articles')
    .then(function (response) {
        app.pages = response.data.page.totalElements;
        app.articles = response.data._embedded.articles;
    })
    .catch(function (error) {
        console.log(error);
    });