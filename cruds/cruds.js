let title=document.querySelector('#title')
let price=document.querySelector('#price')
let taxes=document.querySelector('#taxes')
let ads=document.querySelector('#ads')
let discount=document.querySelector('#discount')
let total=document.querySelector('#total')
let category=document.querySelector('#category')
let count=document.querySelector('#count')
let submet=document.querySelector('#submet')
let mood = 'create'
let tmp;

//get total
//
// (+) + string = number : +string=number
//
function getTotal(){
 if(price.value !=''){
    let result = (+price.value + +taxes.value + +ads.value) 
    - +discount.value;
    total.innerHTML = result;
    total.style.background='#040'
}
else{
    total.innerHTML = '';
    total.style.background='rgb(184, 26, 78)'
}
}

//creat product + //save localstorage
//
//push=add an elemant in the end of the array
//
let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro= [];
}

submet.onclick=function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        category:category.value.toLowerCase(),
        count:count.value,
    }
    //clean data
if(title.value != ''&& price.value !=''&&category.value !=''&&
newpro.count <= 100){
    if(mood === 'create'){
if(newpro.count > 1){
    for(let i = 0; i < newpro.count;i++){
         datapro.push(newpro)
         showdata()

    }
}else{
    datapro.push(newpro)
    showdata()

}
   }else{
    datapro[tmp]= newpro
    mood = 'create';
    submet.innerHTML = 'create';
    count.style.display ="block"
   }
   caleardata()
}



    localStorage.setItem('product', JSON.stringify(datapro))
    showdata()
}

//clear input
function caleardata(){
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
}

//read
function showdata(){
    getTotal()
    let table=''
for( let i = 0 ; i < datapro.length ;i++){
    table +=` <tr>
    <td>${i+1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="updatedata(${i})" id="update">update</button></td>
    <td><button onclick="deletdata(${i})" id="delete">delete</button></td>
    </tr>
`
    //count
}

    document.querySelector('#tbody').innerHTML=table;
    let btnDelete = document.querySelector('#deleatAll')
    if(datapro.length > 0){
        btnDelete.innerHTML =`
        <button onclick='deleatAll()'>delete All (${datapro.length})</button>
        `
        
    }else{
        btnDelete.innerHTML = ''
    }
}
showdata()

//delet
function deletdata(i){
    datapro.splice(i,1)
    localStorage.product = JSON.stringify(datapro)
    showdata()
}
showdata()

function deleatAll(){
    localStorage.clear()
    datapro.splice(0)
    showdata()
}

//update

function updatedata(i){
    title.value = datapro[i].title
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    ads.value = datapro[i].ads
    discount.value = datapro[i].discount
    getTotal()
count.style.display ="none"
    category.value = datapro[i].category
    submet.innerHTML='update'
   mood = 'update'
tmp = i;
scroll({
    top : 0,
    behavior:"smooth"
})

}

//seartch
let seartchmode = 'title';
function getsearchmode(id){
    let search=document.querySelector('#search')
   if(id === 'searchTitle'){
    seartchmode = 'title'
   }else{
    seartchmode = "category"
   }
   search.placeholder= 'search by '+ seartchmode;
    search.focus()
    search.value = ''
    showdata()
}
function searchdata(value){
    let table='';
    for(let i =0;i < datapro.length;i++){
    if(seartchmode == 'title'){  

        
    if(datapro[i].title.includes(value.toLowerCase())){
        table +=` <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updatedata(${i})" id="update">update</button></td>
        <td><button onclick="deletdata(${i})" id="delete">delete</button></td>
        </tr>
    `;
    
}

}else{
   
        if(datapro[i].category.includes(value.toLowerCase())){
            table +=` <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updatedata(${i})" id="update">update</button></td>
            <td><button onclick="deletdata(${i})" id="delete">delete</button></td>
            </tr>
        `;
        }
}
}
document.querySelector('#tbody').innerHTML=table;
}


