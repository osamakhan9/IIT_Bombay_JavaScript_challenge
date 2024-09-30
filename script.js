import { data } from './Json.js';


const table = document.querySelector('#table'); 


function DataGen(data) {
    const TableHade = document.createElement('tr'); 
    const checkHeadonly = document.createElement('th');
    checkHeadonly.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkHeadonly.classList.add('checkmark');
    TableHade.appendChild(checkHeadonly); 


    // Sorting functionallty Here

    const head = Object.keys(data[0]);
    head.forEach((header,index) => {
        const th = document.createElement('th');
        th.textContent = header;
        th.addEventListener('click', (e) => {   
            sortData(data, header, index);
        });
        TableHade.appendChild(th);
    });
    table.appendChild(TableHade);

    // console.log(head)

    data.forEach((item,index) => {
        const row = document.createElement('tr');
        const checkmarkCell = document.createElement('td');
        checkmarkCell.innerHTML = '<i class="fa-solid fa-check"></i>';
        checkmarkCell.classList.add('checkmark');
        row.appendChild(checkmarkCell);
        
        head.forEach(InsertingData => {
            const td = document.createElement('td');
            td.textContent = item[InsertingData]; 
           
            td.setAttribute('name', InsertingData);
            td.setAttribute('index', index+1);
            td.addEventListener('dblclick', (e) => EditEle(e, InsertingData, index));
            row.appendChild(td);
        });
        row.addEventListener('click', () => highlighRow(row,index+1));
        table.appendChild(row);
    });
};


let sortOrder = {}; 
function sortData(data, column, index) {
   
    if (!sortOrder[column]) {
        sortOrder[column] = 'ascending';
    }
    sortOrder[column] = sortOrder[column] === 'ascending' ? 'descending' : 'ascending';
    data.sort((a, b) => {
        const valA = a[column];
        const valB = b[column];

        if (typeof valA === 'number') {
            return sortOrder[column] === 'ascending' ? valA - valB : valB - valA;
        } else {
            return sortOrder[column] === 'ascending' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
    });
    table.innerHTML='';
    DataGen(data); 
    }


let HighLight = -1; 
let prevSelectedRow = null; 
function highlighRow(row, index){
    if (prevSelectedRow){
        prevSelectedRow.classList.remove("selected");
    }
    HighLight = index;
    row.classList.add("selected"); 
    prevSelectedRow = row;
    up.disabled = (HighLight === 1) ? true : false;
    down.disabled = (HighLight === (document.querySelectorAll("#table tr").length-1)) ? true : false;
};



let editContant = {}; 
let editIndex = -1; 
function EditEle(e, nameValue, rowIndex){
    const Value = e.target.textContent;
    editIndex = rowIndex;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = Value; 
                   
    e.target.innerHTML = '';
    e.target.appendChild(input); 
    input.focus();
    
    input.addEventListener('blur', () => {
        e.target.innerHTML = input.value;
        e.target.classList.remove('selected'); 
    });
    
    input.addEventListener('input', () => {
        editContant[nameValue] = input.value; 
    });
};




document.getElementById('up').addEventListener('click', () => {
    if (HighLight>=1)
    {
        HighLight--;
        const currentRow = document.querySelectorAll("#table tr")[HighLight];
        highlighRow(currentRow, HighLight);    
    }
}); 




document.getElementById('down').addEventListener('click', () => {
    const totalRows = document.querySelectorAll("#table tr").length;
    if (HighLight<(totalRows))
    {   
        HighLight++;
        const currentRow2 = document.querySelectorAll("#table tr")[HighLight];
        highlighRow(currentRow2, HighLight);    
    }
});




document.getElementById('reset').addEventListener('click', () => {
    sortOrder[""] = "decending"
    sortData(data, "", 1); 
    sortOrder = {};  

    alert("Successfully Reset 👍👍👍👍")
});




document.getElementById('delete').addEventListener('click', () => {
    if (HighLight>=0) {
        data.splice(HighLight, 1);
        table.innerHTML = '';
        DataGen(data);
        alert("Data Is Delete Successfully 😥😥😥")
    }
});



document.getElementById('save').addEventListener('click', () => {
    if (Object.keys(editContant).length > 0 && editIndex >= 0)
    {
        Object.keys(editContant).forEach(header => {
            data[editIndex][header] = editContant[header];
        });
        table.innerHTML='';
        DataGen(data);
        editContant={};
        editIndex=-1;
    }  
    
    alert("Save Successfully 👌👌👌👌👌")
});



document.getElementById('addData').addEventListener('click', () => {
    data.push({ "": '16', "Chemical name": 'Calcium hydroxide', "Vendor": 'BASF', "Density g/m³": '98.3', "Viscosity m²/s": '56.7', "Packaging": 'Barrel', "Pack size": '340.98', "Unit": 'L', "Quantity": '342.99' });
    table.innerHTML='';
    DataGen(data); 
    alert("Data Is Add Successfully ❤️❤️❤️❤️")
    
    // const prompts = [
        
    //     "Chemical name",
    //     "Vendor",
    //     "Density g/m³",
    //     "Viscosity m²/s",
    //     "Packaging",
    //     "Pack size",
    //     "Unit",
    //     "Quantity",
    //   ];

    //   prompts.forEach((promptText) => {
    //     // const newCell = newRow.insertCell();
    //     const userInput = prompt(`Enter ${promptText}:`);
    //     // newCell.textContent = userInput;
    //   });
     
    // data.push(prompts)
    // DataGen(data); 
      
    });
    
  

DataGen(data);

                              