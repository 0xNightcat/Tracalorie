// imports
import uiFunc from './ui';
import handleFunc from './handle';



// variables
const addMeal_button = document.querySelector('.buttons .btn-add');
const add_input = document.querySelector('#add-input');
const calorie_input = document.querySelector('#calorie-input');



// call EventListeners
allEventListeners();

function allEventListeners() {

    // add meal function
    addMeal_button.addEventListener('click', addMealFunc);

    // on load function
    document.addEventListener('DOMContentLoaded', onLoadFunc);

}


// functions //

// addMealFunc
function addMealFunc(e) {
    // get input values
    let addInputValue = add_input.value;
    let calorieInputValue = calorie_input.value;

    // check input values to start process
    if (addInputValue == '' || calorieInputValue == '') {
        uiFunc.showAlert('please fill all inputs', 'danger');
    } else {
        handleFunc.addMeal(addInputValue, calorieInputValue);

        add_input.value = '';
        calorie_input.value = '';

        handleFunc.addMealToLocalStorage(addInputValue, calorieInputValue);
    }
}

// onLoadFunc
function onLoadFunc() {
    uiFunc.getMealsFromLocalStorage();
}