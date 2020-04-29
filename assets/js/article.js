axios.get('http://127.0.0.1:81/articles/')
.then(function (response) {
   app.maxIndex = response.data.page.totalElements+1;
})
.catch(function (error) {
    console.log(error);
});

axios.get('http://127.0.0.1:81/sh_article/'+app.user.id)
.then(function (response) {W
   app.sh_articles =  response.data;
})
.catch(function (error) {
    console.log(error);
});

axios.get('http://127.0.0.1:81/tg_article/'+app.user.id)
.then(function (response) {
    app.tg_articles =   response.data;
})
.catch(function (error) {
    console.log(error);
});

axios.get('http://127.0.0.1:81/er_article/'+app.user.id)
.then(function (response) {
    app.er_articles =  response.data;
})
.catch(function (error) {
    console.log(error);
});