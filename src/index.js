document.addEventListener('DOMContentLoaded', () => {

    getDogs()
    editDog()
    
})

function getDogs(){
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(data => data.forEach(dog => allDogInfo(dog)))
}

function allDogInfo(dog){
    const dogList = document.querySelector('#table-body')
    dogList.innerHTML += `<tr id=row-${dog.id}><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button id='edit' data-id=${dog.id} data-name=${dog.name} data-breed=${dog.breed}
    data-sex=${dog.sex}>Edit</button></td></tr>`
    
}

function editDog(){
    const dogList = document.querySelector('#table-body')
    dogList.addEventListener('click', function(event){
        if (event.target.tagName === 'BUTTON'){
            console.log('im a button')
            const dogID = event.target.dataset.id
            console.log(dogID)
            const form = document.querySelector('#dog-form')
            form.name.value = event.target.dataset.name
            form.breed.value = event.target.dataset.breed
            form.sex.value = event.target.dataset.sex
            submitListener(dogID)
        } else{
            console.log(event.target)
        }
    })
}

function submitListener(dogID){
const form = document.querySelector('#dog-form')
   form.addEventListener('submit', function(event){
        event.preventDefault()
        console.log('i work')
        const editInformation = {
            "name": event.target.name.value,
            "breed": event.target.breed.value,
            "sex": event.target.sex.value
        }

        console.log(editInformation)
   
    const reqObj = {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(editInformation)
   }

   fetch(`http://localhost:3000/dogs/${dogID}`, reqObj)
    .then(resp => {
        return resp.json()
        })
        .then(dogData => 
            {const row = document.getElementById(`row-${dogID}`)
            row.innerHTML = `<td>${dogData.name}</td> <td>${dogData.breed}</td> <td>${dogData.sex}</td> <td><button id='edit' data-id=${dogData.id} data-name=${dogData.name} data-breed=${dogData.breed}
            data-sex=${dogData.sex}>Edit</button></td></tr>`
            })
})
}
