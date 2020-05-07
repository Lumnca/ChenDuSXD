axios.get(host+'/articles/')
.then(function (response) {
   app.maxIndex = response.data.page.totalElements+1;
})
.catch(function (error) {
    console.log(error);
});

axios.get(host+'/sh_article/'+app.user.username)
.then(function (response) {
   app.sh_articles =  response.data;
})
.catch(function (error) {
    console.log(error);
});

axios.get(host+'/tg_article/'+app.user.username)
.then(function (response) {
    app.tg_articles =   response.data;
})
.catch(function (error) {
    console.log(error);
});

axios.get(host+'/er_article/'+app.user.username)
.then(function (response) {
    app.er_articles =  response.data;
})
.catch(function (error) {
    console.log(error);
});