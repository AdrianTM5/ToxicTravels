const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

function searchPlace() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('api.json')
    .then(response => response.json())
    .then(data => {
        
        const search = data.countries.find(item => item.name.toLowerCase() === input);
        console.log(search);

        /*if(place) {
            const name = place.name.join(', ');
            const image = place.image.join(', ');
            const desc = place.desc;

            console.log(`${place.name}`);
            console.log(`${place.image}`);
            console.log(`${place.desc}`);
        } else {
            console.log(`${place.desc}`);
        }*/
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });

}

function clearAll() {
    document.getElementById('searchBar').value = '';
}

searchBtn.addEventListener("click",searchPlace);
clearBtn.addEventListener("click", clearAll);