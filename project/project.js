// get URL
function getUrl(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function(){
    requestApi();
    $("#hide").hide();
    $("#hideImgFooter").hide();
    $('#recipe').on('change', () => {
        var recipeId = $('#recipe').val();
        getRecipe(recipeId);
        $("#hide").show();
        $('#hideFooter').hide();
        $("#hideImg").hide();
        $("#hideImgFooter").show();
    });
    /// increment the number of guest
    $('#sum').on("click",function(){
        var persons = $("#show").val();
        addMember(persons);
    });
    // decriment the number of guest
    $('#min').on("click", function(){
        var persons = $("#show").val();
        minMember(persons);
    });
});

// Request API
function requestApi(){
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Can not get data"),
    });
}

// Show Option of API
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

// Show data of API when user click option
var oldGuest = 0;
var getQuantities = [];
function getRecipe(id){
    allData.forEach(item => {
        if(item.id == id){
            eachRecipe(item.name, item.iconUrl);
            eachIngredient(item.ingredients);
            getInsration(item.instructions);
            getGuest(item.nbGuests);
            oldGuest = item.nbGuests;
            getQuantities = item.ingredients;
        }
    })
}

// get name and image of recipe
function eachRecipe(name, img){
    var result = "";
    result += `
        <img src="${img}" width="170" >
        <h3 class="text-primary">${name}</h3>
    `;
    $('#recipe-result').html(result); 
}

// get value of guest
function  getGuest(guest){
    var guests = "";
    guests+=`
    <input type="number" class="form-control text-center" id="show" disabled
    value="${guest}">
    `;
    $('#showGuest').html(guests);
}

// Get Ingredients
function eachIngredient( ing){
    var result = "";
    ing.forEach(item => {
    result += `
        <tr>
            <td><img src="${item.iconUrl}" width="60" height="60px" class="rounded-circle"></td>
            <td>${item.quantity}</td>
            <td>${item.unit[0]}</td>
            <td>${item.name}</td>
        </tr>
    `;
    });
    $('#ingredient-result').html(result);
   
}

// Get Instructions or step
function getInsration(step){
    var getStep = "";
    var data = step.split('<step>');
    for(let i=1; i<data.length;i++){
        getStep+=`
            <h5 class="text-primary">Step:${i}</h5>
            <p  style=" font-size: 20px;">${data[i]}</p>
        `;
        $('#instruction').html(getStep);
    }
}

// sum function 
function addMember(member){
    var add = parseInt(member) + 1;
    if(add <= 15){
        $("#show").val(add);
        getPerson($("#show").val());
    }
}
// min function
function minMember(member){
    var min = parseInt(member) - 1;
    if(min >= 1){
        $("#show").val(min);
        getPerson($("#show").val());
    }
}

// get quantity of new person from guest
function getPerson(person){
    var result = "";
    var quantities;
    var newQuantity;
    getQuantities.forEach(item =>{
       quantities = item.quantity / oldGuest;
       newQuantity = quantities * person;
       console.log(newQuantity);
       result += `
            <tr>
                <td><img src="${item.iconUrl}" width="60" height="60px" class="rounded-circle"></td>
                <td>${newQuantity}</td>
                <td>${item.unit[0]}</td>
                <td>${item.name}</td>
            </tr>
       `;
    } );
    $('#ingredient-result').html(result);
}