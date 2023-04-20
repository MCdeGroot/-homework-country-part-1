import axios from "axios";

//verwijzing naar een countrylist
const countryList = document.getElementById('countries');

//verwijzing naar error
const errorMessage = document.getElementById('error');

async function fetchCountries() {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data;
        console.log(countries);
        countries.sort((a, b) => {
            return a.population - b.population;
        });
        mapCountryListInnerHTML(countries);

        const test = response.data.region;
        console.log(test);

    } catch (error) {
        //errors afvangen in de consol
        console.error(error);

        //errors communiceren in de UI
        if (error.response.status === 404) {
            errorMessage.textContent = "Page not found | error 404"
        } else if (error.response.status === 500) {
            errorMessage.textContent = "Internal server error | error 500"
        }
    }
}

void fetchCountries();

function mapCountryListInnerHTML(array) {
    array.map((country) => {
        countryList.innerHTML += `

<li>
        <img class="flag" src="${country.flags.png}" alt="Vlag van ${country.name.common}">
        <span class="${setRegionColor(country.region)}">${country.name.common}</span>
        <p>Has a population of ${country.population} people</p>
</li>
       `
    });
}

function setRegionColor(region) {
    switch (region) {
        case 'Africa':
            return 'blue';
        case 'Americas':
            return 'green';
        case 'Antarctic':
            return 'white';
        case 'Asia':
            return 'red';
        case 'Europe':
            return 'yellow';
        case 'Oceania':
            return 'purple';
        default:
            return 'default';
    }
}