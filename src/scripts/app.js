// imports
import uiFunc from './ui';
import handleFunc from './handle';


// variables
const addMeal_button = document.querySelector('.buttons .btn-add');
const back_button = document.querySelector('.buttons .right .btn');
const add_input = document.querySelector('#add-input');
const calorie_input = document.querySelector('#calorie-input');
const items_card = document.querySelector('.items-info');
const buttons = document.querySelector('.buttons');
const clearAll_button = document.querySelector('#clear-all');
const currentCardElement = [];


// call EventListeners
allEventListeners();

function allEventListeners() {

    // add meal function
    addMeal_button.addEventListener('click', addMealFunc);

    // on load function
    document.addEventListener('DOMContentLoaded', onLoadFunc);

    // items info card function
    items_card.addEventListener('click', editBtnFunc);

    // cancel eition
    back_button.addEventListener('click', backBtnFunc);

    // buttons delete and update function
    buttons.addEventListener('click', buttonsFunc);

    // clear all items
    clearAll_button.addEventListener('click', clearAllFunc);

}


// functions //

// addMealFunc
function addMealFunc() {
    // get input values
    let addInputValue = add_input.value;
    let calorieInputValue = calorie_input.value;

    // check input values to start process
    if (addInputValue == '' || calorieInputValue == '') {
        uiFunc.showAlert('please fill all inputs', 'danger');
    } else {
        // add meal to list
        handleFunc.addMeal(addInputValue, calorieInputValue);

        // empty inputs value
        add_input.value = '';
        calorie_input.value = '';

        // show alert for added state
        uiFunc.showAlert('Meal Successfully Added', 'info');

        // add meals into local storage
        handleFunc.addMealToLocalStorage(addInputValue, calorieInputValue, handleFunc.itemId());

        // calculate total calories
        handleFunc.totalCaloriesCalc(calorieInputValue);
    }
}

// editBtnFunc
function editBtnFunc(e) {
    if (e.target.classList.contains('fa-edit')) {
        // change button states to eition
        uiFunc.buttonsState('edit');

        // set back ifos from edited item
        handleFunc.setBackValuesToInputs(e);

        // save current card id
        handleFunc.currentCardIdSave(e);

        // get card element
        const cardElement = e.target.parentElement.parentElement.parentElement;
        currentCardElement.push(cardElement);

        // store new total calorie
        const lastCardElement = currentCardElement.slice(currentCardElement.length - 1);
        handleFunc.storeNewTotalCalorie(lastCardElement[0]);

    }
}

// onLoadFunc
function onLoadFunc() {
    // keep just add button on load
    uiFunc.buttonsState('add');

    // get meals from local storage
    uiFunc.getMealsFromLocalStorage();

    // get total calories from local storage
    handleFunc.getTotalCalFromLs();

    // get max id and store into itemId
    handleFunc.getMaxId();
}

// backBtnFunc
function backBtnFunc() {
    // empty input values
    add_input.value = '';
    calorie_input.value = '';

    // change buttons state
    uiFunc.buttonsState('add');
}

// buttonsFunc
function buttonsFunc(e) {
    if (e.target.classList.contains('btn-delete')) {
        // remove card from list
        handleFunc.deleteCard();

        // remove card from local storage
        handleFunc.removeCardFromLocalStorage();

        // change total calorie value
        handleFunc.changeTotalCalValue();
    } else if (e.target.classList.contains('btn-update')) {
        const lastCardElement = currentCardElement.slice(currentCardElement.length - 1);
        // update card values
        handleFunc.updateCard(lastCardElement[0]);

        // update locale storage values
        handleFunc.updateLocalStorage(lastCardElement[0]);

        // update total value in edited
        handleFunc.updateTotalCalorieEdited(lastCardElement[0]);
    }
}

// clearAllFunc
function clearAllFunc() {
    // clear all items
    handleFunc.clearAllItems();
}