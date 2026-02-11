const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const resultDiv = document.getElementById('result');

function searchPlace() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    var result, single = true, cities = false;
    fetch('api.json')
    .then(response => response.json())
    .then(data => {
        switch(input) {
            case 'sydney': {
                result =  find(data, 'Australia', 'Sydney', single); break;
            }
            case 'melbourne': {
                result =  find(data, 'Australia', 'Melbourne', single); break;
            }
            case 'tokyo': {
                result =  find(data, 'Japan', 'Tokyo', single); break;
            }
            case 'kyoto': {
                result =  find(data, 'Japan', 'Kyoto', single); break;
            }
            case 'rio de janeiro': {
                result =  find(data, 'Brazil', 'Rio de Janeiro', single); break;
            }
            case 'sao paulo': {
                result =  find(data, 'Brazil', 'São Paulo', single); break;
            }
            case 'são paulo': {
                result =  find(data, 'Brazil', 'São Paulo', single); break;
            }
            case 'beaches': {
                single = false; result =  find(data, 'beaches', '' ,single); break;
            }
            case 'beach': {
                single = false; result =  find(data, 'beaches', '' ,single); break;
            }
            case 'temples': {
                single = false; result =  find(data, 'temples', '' ,single); break;
            }
            case 'temple': {
                single = false; result =  find(data, 'temples', '' ,single); break;
            }
            default: {
                cities = true; single = false; result = find(data, '', '', single, input); break;
            }
        }
        createResultCard(result, single, cities);
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

function find(data, word, cityName, single, input) {
    if(single) {
        var search = data.countries.find(c => c.name === word).cities.find(city => city.name.includes(cityName));
        return search;
    }
    else {
        if(word === 'temples'){
            search = data.temples
            return search;
        }
        else if (word === 'beaches') {
            search = data.beaches;
            return search;
        }else {
            search = data.countries.find(item => item.name.toLowerCase() === input);
            return search;
        }
    }
}

function createResultCard(result, single, cities) {
    if(single){
        resultDiv.innerHTML += `<img id="resultImg" src="${result.imageUrl}">`;
        resultDiv.innerHTML += 
        `<div id="innerResultDiv">
            <h4 id="resultTitle">${result.name}</h4>
            <br>
            <p id="resultDescription">${result.description}</p>
        </div>`;
    } else if(cities) {
        result.cities.forEach(r => {
            resultDiv.innerHTML += `<img id="resultImg" src="${r.imageUrl}">`;
            resultDiv.innerHTML += 
            `<div id="innerResultDiv">
                <h4 id="resultTitle">${r.name}</h4>
                <br>
                <p id="resultDescription">${r.description}</p>
            </div>`;
        });
    } else {
        result.forEach(r => {
            resultDiv.innerHTML += `<img id="resultImg" src="${r.imageUrl}">`;
            resultDiv.innerHTML += 
            `<div id="innerResultDiv">
                <h4 id="resultTitle">${r.name}</h4>
                <br>
                <p id="resultDescription">${r.description}</p>
            </div>`;
        });
    }
}

function clearAll() {
    resultDiv.innerHTML = ``;
}

searchBtn.addEventListener("click",searchPlace);
clearBtn.addEventListener("click", clearAll);