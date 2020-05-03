axios.get(host+'/articles')
    .then(function (response) {
        app.pages = response.data.page.totalElements;
        app.articles = response.data._embedded.articles;
    })
    .catch(function (error) {
        console.log(error);
    });