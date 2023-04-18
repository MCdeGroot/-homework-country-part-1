import axios from "axios";

//verwijzing naar een countrylist
const countryList = document.getElementById('countries');

//verwijzing naar error
const errorMessage = document.getElementById('error');
// vervolgens vullen.


async function fetchCountries(){
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all')

        // maken een variable aan waarin we de response kunnen sorteren
        const countries = response.data;
        countries.map((country)=>{

        })

        console.log(countries);


        // eerst willen we de array met landen sorteren op
        countryList.innerHTML = `
        <li>${response.data[1].name.common}</li>
        `
// op bovenstaande manier kunnen we uit een endpoint data weergeven in een applicatie//

    } catch(error){
        //errors afvangen in de consol
        console.error(error);

        //errors communiceren in de UI
        if (error.response.status === 404){
            errorMessage.textContent = "Page not found | error 404"
        } else if ( error.response.status === 500){
            errorMessage.textContent = "Internal server error | error 500"
        }
    }
}

void fetchCountries();