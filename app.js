const employeeCount = 12;

var employeeList = document.getElementsByClassName("employee-list")[0],
employeeCard = document.getElementsByClassName("employee-card")[0],
modal = document.getElementsByClassName("modal")[0],
modalCard = document.getElementsByClassName("modal-card")[0],
xbtn = document.getElementsByClassName("modal-xbutton")[0];

function populate() {
    employeeCard.onclick = function(event) { openModal(event); }
    for (i = 1; i < employeeCount; i++)
    {
        employeeList.appendChild(employeeCard.cloneNode(true));
        employeeList.lastChild.onclick = function(event) { openModal(event); }
    }
}

function randomize() {
    var url = 'https://randomuser.me/api/?results='+employeeCount;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            for (i = 0; i < employeeCount; i++) {
                var random = data.results[i];
                document.getElementsByClassName("icon")[i].src = random.picture.large;
                document.getElementsByClassName("employee-name")[i].innerText = random.name.first + ' ' + random.name.last;
                document.getElementsByClassName("employee-email")[i].innerText = random.email;
                document.getElementsByClassName("employee-city")[i].innerText = random.location.city;
                document.getElementsByClassName("employee-cell")[i].innerText = random.cell;
                document.getElementsByClassName("employee-address")[i].innerText = random.location.street.number + ' ' + random.location.street.name + ', ' + random.location.state + ' ' + random.location.postcode;
                document.getElementsByClassName("employee-birthdate")[i].innerText = 'Birthday: ' + random.dob.date.substring(5,7) + '/' + random.dob.date.substring(8,10) + '/' + random.dob.date.substring(0,4);
            }
            return data;
        })
    .catch(e => {
        console.log(e);
        return e;
    });
}

function openModal(e) {
    document.getElementsByClassName("modal-icon")[0].src = e.currentTarget.getElementsByClassName("icon")[0].src;
    var lists = e.currentTarget.getElementsByTagName("ul");
    var list1 = lists[0].cloneNode(true), list2 = lists[1].cloneNode(true);
    list1.style.textAlign = "center"; list2.style.display = "block";
    modalCard.appendChild(list1); 
    modalCard.appendChild(document.createElement("hr"));
    modalCard.appendChild(list2);
    modal.style.display = "block";
}

function closeModal() {
    modalCard.removeChild(modalCard.lastChild);
    modalCard.removeChild(modalCard.lastChild);
    modalCard.removeChild(modalCard.lastChild);
    modal.style.display = "none";
}

xbtn.onclick = function() {
    closeModal();
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

populate();
randomize();