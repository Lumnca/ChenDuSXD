axios.get(host+'/users/'+app.user.id)
    .then(function (response) {
         app.form = response.data;
    })
    .catch(function (error) {
        console.log(error);
    });


    axios.get(host+'/user/'+app.user.id)
    .then(function (response) {
         app.user.name = response.data.name;
    })
    .catch(function (error) {
        console.log(error);
    });