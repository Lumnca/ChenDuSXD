axios.get(host+'/active')
.then(function (response) {
   app.actives = response.data;
})
.catch(function (error) {
    console.log(error);
});
axios.get(host+ '/enrollM/'+app.user.id)
.then(function (response) {

   response.data.forEach(element => {
        if(element.state>0){
            app.active1.push(element); 
        }
        else{
            app.active2.push(element); 
        }
   });
})
.catch(function (error) {
    console.log(error);
});





