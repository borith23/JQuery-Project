function getUrl(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function(){
    requestApi();
    $('#recipe').on('change', () => {
        var recipeId = $('#recipe').val();
        getRecipe(recipeId);
       
    });
});
function requestApi(){
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Can not get data"),
    });
}

// 
var allData = [];
function chooseRecipe(recipe){
    allData = recipe;
    var option = "";
    recipe.forEach(item => {
       option += `
            <option value="${item.id}">${item.name}</option>
           
       `;

    });
    $('#recipe').append(option);
}


//
function getRecipe(id){
    allData.forEach(item => {
        if(item.id == id){
            eachRecipe(item.name, item.iconUrl);
            eachIngredient(item.ingredients);
        }
    })
}
//
function eachRecipe(name, img){
    var result = "";
    result += `
        <img src="${img}" width="170">
        <h3>${name}</h3>
    `;
    $('#recipe-result').html(result);
}

//
function eachIngredient( ing){
    var result = "";
    ing.forEach(item => {
    result += `
        <tr>
            <td><img src="${item.iconUrl}" width="100"></td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.unit[0]}</td>
        </tr>
    `;
    });
    $('#ingredient-result').html(result);
}
