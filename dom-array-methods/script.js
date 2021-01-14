const main = document.getElementById('main');
const addUser_btn = document.getElementById('add-user');
const double_btn = document.getElementById('double');
const show_btn = document.getElementById('show');
const sort_btn = document.getElementById('sort');
const calculate_btn = document.getElementById('calculate-wealth');


//? add an array to declare the person and the money

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

/------Generate Random User with fetch ,Async and await------/

async function getRandomUser() {

    //! to avoid writing the promise with .then we are using the async in front of the function and then create a variable in front of the fetch  and the await attributes into a variable

    const response = await fetch(`https://randomuser.me/api`);
    const data = await response.json();

    const user = data.results[0];
    const new_user = {
        // retrieve the user data first and last name
        name: `${user.name.first} ${user.name.last}`,
        // create a math.floor to generate the decimal value multiply by a million
        money: Math.floor(Math.random() * 1000000)
    };
    // console.log(new_user);
    // console.log(data);
    addData(new_user);

};

/-------Double Money with the map array method ---/

function doubleMoney() {

    // we use the data array 

    data = data.map(user => {

        return {
            ...user,
            money: user.money * 2
        }
    });

    updateDom();

}
//* Sort user by Richest

function sortByRichest () { 

    data.sort((a,b) => b.money - a.money);
    updateDom();


 };


 //* Filter only Millionaires

 function showMillionaires() {

    data = data.filter(user => user.money >= 1000000);
    updateDom();
     
 };

 //* calculate total Wealth

 function calculateWealth(){

    const wealth = data.reduce((acc, user) => (acc += user.money),0);

    console.log(formatMoney(wealth));

    // We need to create a new DOM element for the total wealth of the person listed

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h2>Total Wealth: <strong>${formatMoney(wealth)}</strong></h2>`,

    main.appendChild(wealthElement);

   
 };

//? add new object to the data array

function addData(object) {

    data.push(object);

    updateDom() //! if nothing is declare in this function then the array data is declared in the next function
}


/------ Output User - ForEach & DOM Methods ------/

//? Update DOM

function updateDom(providedData = data) {

    // clear the main div (html)

    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`,

        // create the forEach loop 

        providedData.forEach(item => {

            // create the div tag person we have created in the css file add the item related to the name and the money.

            const element = document.createElement('div');
            element.classList.add('person');
            element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`,

                // To show the result of the element created above we need to use the appendChild Method and calling the  variable element.

                main.appendChild(element);

        });


};


//? Format the number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string : (12345.67).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');


function formatMoney(number) {

    return '€' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

}

// Event listener 

addUser_btn.addEventListener('click', getRandomUser);
double_btn.addEventListener('click', doubleMoney);
sort_btn.addEventListener('click', sortByRichest);
show_btn.addEventListener('click', showMillionaires);
calculate_btn.addEventListener('click', calculateWealth);