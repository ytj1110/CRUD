let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let totle =document.getElementById('totle');
let count =document.getElementById('count');
let catagory =document.getElementById('catagory');
let submit =document.getElementById('submit');


let mood = 'Create'


let tmp;
// console.log(title,price,taxes,ads,discount,totle,count,catagory,submit);

function getTotle(){
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        totle.innerHTML = result;
        totle.style.background = '#040';
    }else{
        totle.style.background = '#bd0707bd'
        totle.innerHTML = ''
    }
}

let datepro;
if(localStorage.product != null){
    datepro = JSON.parse(localStorage.product)
}else{
     datepro = []
}

submit.onclick = function(){
    let newpro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        totle:totle.innerHTML,
        count:count.value,
        catagory:catagory.value.toLowerCase(),
    }
if (title.value != ''&& price.value != ''&& catagory.value !='' && newpro.count <100) {
    if (mood === 'Create') {
    if (newpro.count > 1) {
        for (let x = 0; x < newpro.count; x++) {
            datepro.push(newpro);
        }
    }else{
            datepro.push(newpro);
    }
}else{
    datepro[tmp] = newpro;
    mood = 'Create';
    submit.innerHTML = 'Create';
    count.style.display = 'block';
}
    clearDate()
}

    

        //save localstorage
    localStorage.setItem('product' ,  JSON.stringify(datepro))
    // console.log(datepro)
    
    showDate()
}


function clearDate(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    totle.innerHTML = '';
    count.value = '';
    catagory.value = '';
}



function showDate(){
    getTotle();
    let table = '';
    for (let i = 0; i < datepro.length; i++) {
        table += `
        <tr>
                <td>${i+1}</td>
                <td>${datepro[i].title}</td>
                <td>${datepro[i].price}</td>
                <td>${datepro[i].taxes}</td>
                <td>${datepro[i].ads}</td>
                <td>${datepro[i].discount}</td>
                <td>${datepro[i].totle}</td>
                <td>${datepro[i].catagory}</td>
                <td><button onclick="updateDate(${i})" id="update">Update</button></td>
                <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
        </tr>
        `
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelte = document.getElementById('deleteAll')
    if (datepro.length > 0) {
        btnDelte.innerHTML = `
            <button onclick="deleteAll()">Delete All (${datepro.length})</button>
        `
        
    }else{
         btnDelte.innerHTML = '';
    }
}
  showDate()
 

 //delte
function deleteDate(i){
    datepro.splice(i,1)
    localStorage.product = JSON.stringify(datepro)
    showDate()
}


function deleteAll(){
    let deleteConfirmation = confirm('Are you sure you want to delete all data?');
    
    if (deleteConfirmation) {
        localStorage.clear()
    datepro.splice(0)
    showDate()   
    }
    
}



// update
function updateDate(i){
    title.value = datepro[i].title;
    price.value = datepro[i].price;
    taxes.value = datepro[i].taxes;
    ads.value = datepro[i].ads;
    discount.value = datepro[i].discount;
    getTotle();
    count.style.display = 'none'
    catagory.value = datepro[i].catagory;
    submit.innerHTML = 'Update'
    mood = 'Update'
    tmp = i;
    scroll({
        top : 0,
        behavior:"smooth"
    })
}


// search

let searchmood = 'title';

function getSearchMood(id){
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchmood = 'title';
        search.placeholder = 'Search By Title'
    }else{
        searchmood = 'catagory'
        search.placeholder = 'Search By Category'
    }
    search.focus()
    search.value = '';
    showDate()
    // console.log(searchmood)
}


function searchDate(value){
    let table = '';
     if(searchmood == 'title'){
        for(let i=0 ; i<datepro.length ; i++){
            if (datepro[i].title.includes(value.toLowerCase())) {

                     table += `
         <tr>
                 <td>${i}</td>
                 <td>${datepro[i].title}</td>
                 <td>${datepro[i].price}</td>
                 <td>${datepro[i].taxes}</td>
                 <td>${datepro[i].ads}</td>
                 <td>${datepro[i].discount}</td>
                 <td>${datepro[i].totle}</td>
                 <td>${datepro[i].catagory}</td>
                 <td><button onclick="updateDate(${i})" id="update">Update</button></td>
                 <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
         </tr>
         `       
            }
        }

     }else{
        for(let i=0 ; i<datepro.length ; i++){
            if (datepro[i].catagory.includes(value.toLowerCase())) {
                     table += `
        <tr>
                <td>${i}</td>
                <td>${datepro[i].title}</td>
                <td>${datepro[i].price}</td>
                <td>${datepro[i].taxes}</td>
                <td>${datepro[i].ads}</td>
                <td>${datepro[i].discount}</td>
                <td>${datepro[i].totle}</td>
                <td>${datepro[i].catagory}</td>
                <td><button onclick="updateDate(${i})" id="update">Update</button></td>
                <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
        </tr>
        `       
            }
        }
     }
    document.getElementById('tbody').innerHTML = table;
    }