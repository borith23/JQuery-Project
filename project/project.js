$(document).ready(function(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    $.ajax({
        dataType: "json",
        url: url,
        success: function(data){
            data.recipes.forEach(element => {
                console.log(element.ingredients);
            });
        },
        error: function(){
            console.error("Can not get data!");
        }  
    });
});