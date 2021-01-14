const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal');



//* Search meal and fetch from the API

function searchMeal(event) {
    event.preventDefault();

    //* Clear single meal

    single_mealEl.innerHTML = '';

    //* Get the search term

    const term = search.value;

    //    console.log(term);

    //* check for empty

    if (term.trim()) {

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)


            .then(response => response.json())
            .then(data => {

                console.log(data);

                resultHeading.innerHTML = `<h2> Search results for '${term}' : <h2>`;
                if (data.meal === null) {
                    resultHeading.innerHTML = `<p>There is no results. Try a different word!</p>`;

                } else {
                    mealsEl.innerHTML = data.meals.map(meal =>

                            `
            <div class='meal'>
                      <img src = '${meal.strMealThumb}' alt="${meal.strMeal}"/>
                      <div class='meal-info' data-mealID = '${meal.idMeal}'>
                      <h3>${meal.strMeal}</h3>
                      </div>
            </div>
            
            `)
                        .join('');
                }
            })

        //* Clear search value
        search.value = '';


    } else {
        alert('Please enter a search term');


    };
};

//* Fetch meal by ID

function getMealById(mealID) {

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(response => response.json())
        .then(data => {

            const meal = data.meal[0];

            addMealToDom(meal);
            // console.log(data);
        });

};

//* Add meal to DOM

function addMealToDom(meal) {

    const ingredient = [];

    for (let i = 1; i <= 20; i++) {

        if (meal[`strIngredient${i}`]) {
            ingredient.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasurement${i}`]}`)

        } else {

            break;
        }

    }

    single_mealEl.innerHTML = `
    <div> class="single-meal"

    <h1>${meal.strMeal}</h1>
    <img src=" ${meal,strMealThumb}" alt="${meal.strMeal}"/>
    
    </div>
    `
}

    //* Event listener

    submit.addEventListener('submit', searchMeal);
    mealsEl.addEventListener('click', e => {

        const mealInfo = e.path.find(item => {
            console.log(item);
            if (item.classList) {

                return item.classList.contains('meal-info');
            } else {
                return false;

            }
        });
        // console.log(mealInfo);
        if (mealInfo) {

            const mealID = mealInfo.getAttribute('data-mealId');
            getMealById(mealID);
        }

    });