
//  get total
// create products
// save localstorage
// clear inputs
// read
// delete
// count
// update
// search


let title    = document.getElementById('title');
let price    = document.getElementById('price');
let taxes    = document.getElementById('taxes');
let ads      = document.getElementById('ads');
let discount = document.getElementById('discount');
let total    = document.getElementById('total');
let count    = document.getElementById('count');
let category = document.getElementById('category')
let submit   = document.getElementById('submit');

let mood = 'create';           //This is change  button to create or update
let tmp;                       // To make parameter i in function update To Global -> To use it in function create

// console.log(title,ads,category,price);

//  Get Total                       -> 1

function getTotal(){
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;        // + -> Convert String To Number
        total.innerHTML = result;
        total.style.background ='#040';
        total.style.padding = '10px';
    }else {
        total.style.background='#a00d02';

    }
}

// create products                       ->2
// save localstorage                     ->3

let dataPro;                                        //dataPro -> Array of Data
if(localStorage.product != null){                  //LocalStorage -> To Save Data

    dataPro = JSON.parse(localStorage.product);   // Json.parse -> Convert String To Array

}else {
    dataPro = [];
}

submit.onclick = function (){
    let newPro= {                                 // This is Object
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    // console.log(newPro);
    if(title.value != '' && price.value != '' && category.value != '' && count.value < 100){
        if(mood === 'create'){
            if(newPro.count > 1){
                for (let i = 0; i < newPro.count ; i++) {
                    dataPro.push(newPro);                                           //Push -> To Add Data From Object To Array
                }
            }else{
                dataPro.push(newPro);                                           //Push -> To Add Data From Object To Array
            }
        }else{
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }

        clearData()

    }

    //Save Date To Local Storage
    localStorage.setItem('product', JSON.stringify(dataPro) );     //Json.stringify -> Convert Array To string

    showData()

}

// clear inputs              ->4

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read                        ->5

function showData(){

    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length ; i++) {
        table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
`;
    }

    let tbody = document.getElementById('tbody').innerHTML = table;

    let btnDeleteAll = document.getElementById('deleteAll');
    if (dataPro.length > 0){
        btnDeleteAll.innerHTML = `

        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        
      `
    }else {
        btnDeleteAll.innerHTML = '';
    }
}

showData();


// delete                          ->6

//Delete one Product
function  deleteData(i){

    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();

}
//Delete All Products

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

// count                             ->7

// Update Product                    ->8

function updateData(i) {
    title.value    = dataPro[i].title;
    price.value    = dataPro[i].price;
    taxes.value    = dataPro[i].taxes;
    ads.value      = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display ='none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth",
    })

}

// search                                 ->9

let searchMood = 'title';

function  getSearchMood(id){

    let search = document.getElementById('search');

    if (id == 'searchTitle'){

        searchMood = 'title';
        search.Placeholder = 'Search By Title';                  //Not Work

    }else{

        searchMood ='category';
        search.Placeholder ='Search By Category';               //Not Work

    }
    search.focus();
    search.value = '';
    showData();
}

function searchData(value){

    let table = '';
    if(searchMood == 'title'){

        for (let i = 0; i <dataPro.length ; i++) {
            if(dataPro[i].title.includes(value.toLowerCase())){

                table += `                  <!--      //      -->
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
                        `                    // ---------------------


            }
        }

    }else {

        for (let i = 0; i <dataPro.length ; i++) {
            if(dataPro[i].category.includes(value.toLowerCase())){

                table += `                  <!--      //      -->
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
                        `                    // ---------------------


            }
        }


    }

    let tbody = document.getElementById('tbody').innerHTML = table;

}