

fetch("http://localhost:3000/")
.then (res => {
     return res.json()})
.then (data => {
    console.log (data._embedded.events)})
.catch(error => console.log ('error'))