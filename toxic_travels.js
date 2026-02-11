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
        resultDiv.innerHTML += 
        `<div class="animar" id="innerResultDiv">
            <img id="resultImg" src="imgs/404.jpeg">
            <h3 id="resultTitle">Destination not found</h4>
            <br>
            <p id="resultDescription">Try with another place or keyword</p>
        </div>`;
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
    resultDiv.style.display = 'block';
    if(single){
        resultDiv.innerHTML += 
        `<a id="aCard" class="animar" href="#">
            <div id="innerResultDiv">
                <img id="resultImg" src="${result.imageUrl}">
                <h3 id="resultTitle">${result.name}</h4>
                <br>
                <p id="resultDescription">${result.description}</p>
            </div>
        </a>`;
    } else if(cities) {
        result.cities.forEach(r => {
            resultDiv.innerHTML += 
            `<a id="aCard" class="animar" href="#">
                <div id="innerResultDiv">
                    <img id="resultImg" src="${r.imageUrl}"></img>
                    <h3 id="resultTitle">${r.name}</h4>
                    <br>
                    <p id="resultDescription">${r.description}</p>
                </div>
            </a>`;
        });
    } else {
        result.forEach(r => {
            resultDiv.innerHTML += 
            `<a id="aCard" class="animar" href="#">
                <div id="innerResultDiv">
                    <img id="resultImg" src="${r.imageUrl}"></img>
                    <h3 id="resultTitle">${r.name}</h4>
                    <br>
                    <p id="resultDescription">${r.description}</p>
                </div>
            </a>`;
        });
    }
}

function clearAll() {
    document.getElementById('searchBar').value = '';
    resultDiv.innerHTML = ``;
    resultDiv.style.display = 'none';
}

searchBtn.addEventListener("click",searchPlace);
clearBtn.addEventListener("click", clearAll);