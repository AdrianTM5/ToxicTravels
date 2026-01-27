const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

function searchPlace() {
    debugger;
    const input = document.getElementById('searchBar').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('api.json')
    .then(response => response.json())
    .then(data => {
        const place = data.places.find(item => item.name.toLowerCase() === input);

        if(place) {
            const name = place.name.join(', ');
            const image = place.image.join(', ');
            const desc = place.desc;

            console.log(`${place.name}`);
            console.log(`${place.image}`);
            console.log(`${place.desc}`);
        } else {
            console.log('Place not found');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

searchBtn.addEventListener("click", searchPlace);
//clearBtn.addEventListener("click", );