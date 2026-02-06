const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

function searchPlace() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('api.json')
    .then(response => response.json())
    .then(data => {
        switch(input) {
            case 'sydney': {
                findCity(data, 'Australia', 'Sydney'); break;
            }
            case 'melbourne': {
                findCity(data, 'Australia', 'Melbourne'); break;
            }
            case 'tokyo': {
                findCity(data, 'Japan', 'Tokyo'); break;
            }
            case 'kyoto': {
                findCity(data, 'Japan', 'Kyoto'); break;
            }
            case 'rio de janeiro': {
                findCity(data, 'Brazil', 'Rio de Janeiro'); break;
            }
            case 'sao paulo': {
                findCity(data, 'Brazil', 'São Paulo'); break;
            }
            case 'são paulo': {
                findCity(data, 'Brazil', 'São Paulo'); break;
            }
            default: {
                var search = data.countries.find(item => item.name.toLowerCase() === input);
                search.cities.forEach(city => {
                console.log(city.name);
                console.log(city.imageUrl);
                console.log(city.description);
                });
                break;
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

function findCity(data, countryName, cityName) {
    var search = data.countries.find(c => c.name === countryName).cities.find(city => city.name.includes(cityName));
    console.log(search.name);
    console.log(search.imageUrl);
    console.log(search.description);
}

function clearAll() {
    document.getElementById('searchBar').value = '';
    console.clear();
}

searchBtn.addEventListener("click",searchPlace);
clearBtn.addEventListener("click", clearAll);