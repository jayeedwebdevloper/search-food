let searchBtn = document.getElementById('searchB');
let searchBox = document.getElementById('search');
let food = document.getElementById('foodD');
let error = document.getElementById('ddd');
let searchResult = document.getElementById('search-result');

error.style.display = 'none';

const idDetail = (idM) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idM}`)
        .then(res => res.json())
        .then(data => showDetails(data))
};

const showDetails = (mealID) => {

    food.innerHTML = '';
    let div = document.createElement('div');
    div.classList.add('shadow');
    div.classList.add('border');
    div.classList.add('rounded');
    div.innerHTML = `
     <div class="row">
        <div class="col-12 col-md-4">
            <img class="img-fluid rounded-start" src="${mealID.meals[0].strMealThumb}" alt="...">
        </div>
        <div class="col-12 col-md-8 mt-0">
            <h3 class="text-primary pt-3">${mealID.meals[0].strMeal}</h3>
            <p class="text-secondary pt-2"><b class="text-black">Food Type:</b> ${mealID.meals[0].strMeal}</p>
            <p class="text-secondary"><b class="text-black">Food Category:</b> ${mealID.meals[0].strCategory}</p>
            <p class="text-secondary"><b class="text-black">Food Introduction:</b> ${mealID.meals[0].strInstructions.slice(0, 300)}</p>
            <a target="_blank" href="${mealID.meals[0].strYoutube}" class="btn btn-primary">Check Video</a>
        </div>
    </div>
    `
    food.appendChild(div);
};

searchBtn.addEventListener('click', function () {
    food.innerHTML = '';
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBox.value}`;


    if (searchBox.value == '') {
        error.style.display = 'block';
        searchResult.innerHTML = '';
    }
    else {
        const meal = () => {
            fetch(url)
                .then(res => res.json())
                .then(data => printMeal(data.meals))
        }
        meal()
        const printMeal = (meals) => {
            console.log(meals);

            if (meals == null) {
                error.style.display = 'block';
                searchResult.innerHTML = '';
            }

            searchResult.innerHTML = '';

            meals.forEach(meal => {
                let div = document.createElement('div');
                div.classList.add('col-12');
                div.classList.add('col-md-4');
                div.innerHTML = `
            <div class="card" onclick="idDetail(${meal.idMeal})">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text"><b>Food Type:</b> ${meal.strArea}</p>
                <p class="card-text">${meal.strInstructions.slice(0, 80)}</p>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-primary">Check Video</a>
            </div>
            </div>`
                searchResult.appendChild(div);
                searchBox.value = '';
                error.style.display = 'none';

            });



        }


    }
});


searchBox.addEventListener('keyup', function (e) {
    food.innerHTML = '';
    if (e.key == 'Enter') {
        let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBox.value}`;


        if (searchBox.value == '') {
            error.style.display = 'block';
            searchResult.innerHTML = '';
        }
        else {
            const meal = () => {
                fetch(url)
                    .then(res => res.json())
                    .then(data => printMeal(data.meals))
            }
            meal()
            const printMeal = (meals) => {
                console.log(meals);

                if (meals == null) {
                    error.style.display = 'block';
                    searchResult.innerHTML = '';
                }

                searchResult.innerHTML = '';

                meals.forEach(meal => {
                    let div = document.createElement('div');
                    div.classList.add('col-12');
                    div.classList.add('col-md-4');
                    div.innerHTML = `
            <div class="card" onclick="idDetail(${meal.idMeal})">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text"><b>Food Type:</b> ${meal.strArea}</p>
                <p class="card-text">${meal.strInstructions.slice(0, 80)}</p>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-primary">Check Video</a>
            </div>
            </div>`
                    searchResult.appendChild(div);
                    searchBox.value = '';
                    error.style.display = 'none';

                });



            }


        }
    }
});

