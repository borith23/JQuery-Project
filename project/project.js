function getUrl(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function(){
    requestApi();
    $("#hide").hide();
    $('#recipe').on('change', () => {
        var recipeId = $('#recipe').val();
        getRecipe(recipeId);
        $("#hide").show();
    });

    ///////
    $('#sum').on("click",function(){
        var persons = $("#show").val();
        addMember(persons);
    });
    $('#min').on("click", function(){
        var persons = $("#show").val();
        minMember(persons);
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
//

function eachRecipe(name, img){
    var result = "";
    result += `
        <img src="${img}" width="170">
        <h3>${name}</h3>
    `;
    $('#recipe-result').html(result);
    
}

function  getGuest(guest){
    var guests = "";
    guests+=`
    <input type="number" class="form-control text-center" id="show" disabled
    value="${guest}">
    `;
    $('#showGuest').html(guests);
}

//
function eachIngredient( ing){
    var result = "";
    ing.forEach(item => {
    result += `
        <tr>
            <td><img src="${item.iconUrl}" width="80"></td>
            <td>${item.quantity}</td>
            <td>${item.unit[0]}</td>
            <td>${item.name}</td>
        </tr>
    `;
    });
    $('#ingredient-result').html(result);
}


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




// counter
$(document).ready(function(){
    $('#sum').on("click",function(){
        var person = $("#show").val();
        addMember(person);
    });
    $('#min').on("click", function(){
        var person = $("#show").val();
        minMember(person);
    });
    
});
// sum function 
function addMember(member){
    var add = parseInt(member) + 1;
    if(add <= 15){
        $("#show").val(add);
        // compute(add);
        getPerson(add);
    }
}
// min function
function minMember(member){
    var min = parseInt(member) - 1;
    if(min >= 1){
        $("#show").val(min);
        // compute(min);
        getPerson(min);
    }
}

//
function getPerson(person){
    console.log(person);
    var result = "";
    var quantities;
    var newQuantity;
    getQuantities.forEach(item =>{
       quantities = item.quantity / oldGuest;
       newQuantity = quantities * person;
       result += `
            <tr>
                <td><img src="${item.iconUrl}" width="100"></td>
                <td>${newQuantity}</td>
                <td>${item.unit[0]}</td>
                <td>${item.name}</td>
            </tr>
       `;
    } );
    $('#ingredient-result').html(result);
}