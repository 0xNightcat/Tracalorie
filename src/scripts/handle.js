// imports

import uiFunc from "./ui";


let handleFunc = (() => {

    class Handle {
        constructor() {
            this.itemsInfo_elem = document.querySelector('#show-details .items-info');
            this.add_input = document.querySelector('#add-input');
            this.calorie_input = document.querySelector('#calorie-input');
            this.total_calories = document.querySelector('#total-cal');
            this.itemId = 0;
            this.currentId = 0;
            this.currentCard = [];
        }

        // add meal
        addMeal(meal, calorie) {
            // create id
            this.itemId = (this.itemId + 1);

            // create card elem
            const div = document.createElement('div');
            div.classList = 'card';
            div.id = this.itemId;

            // create card items
            div.innerHTML = `
            <div class="card-body">
                <span class="meal-name">${meal}</span>
                <span class="calorie badge badge-danger ml-3"><span>Calorie :</span><span id="cal-amount">${calorie}</span></span>
                <a href="#!" class="btn-edit">
                <i class="fas fa-edit"></i>
                </a>
            </div>
            `

            // append items into list
            this.itemsInfo_elem.appendChild(div);
        }

        // add meal to local storage
        addMealToLocalStorage(meal, calorie, id) {
            let array;
            // check if local storage is null
            if (localStorage.getItem('Meals') == null) {
                array = [];
                array.push({ meal, calorie, id });
                // fill local storage with items
                localStorage.setItem('Meals', JSON.stringify(array));
            } else {
                // parse local storage item
                let parsedKey = JSON.parse(localStorage.getItem('Meals'));

                // fill again into item
                parsedKey.push({ meal, calorie, id });

                // set new items into parsed local storage
                localStorage.setItem('Meals', JSON.stringify(parsedKey));
            }
        }

        // get biggest id
        getMaxId() {
            // get all cards
            const cards = this.itemsInfo_elem.querySelectorAll('.card');
            const cardsArray = Array.from(cards);

            // get last item of card
            const lastCard = cardsArray.slice(cardsArray.length - 1);

            // get last card id
            const parseCardId = parseInt(lastCard[0].id);

            // store max id into id keeper
            this.itemId = parseCardId;
        }

        // get infos into values
        setBackValuesToInputs(event) {
            // get meal & calorie of edited item
            const listItemBody = event.target.parentElement.parentElement;

            const mealName = listItemBody.querySelector('.meal-name').textContent;
            const calorieMount = parseInt(listItemBody.querySelector('#cal-amount').textContent);

            // set back infos into input values
            this.add_input.value = mealName;
            this.calorie_input.value = calorieMount;
        }

        // total calories calculation
        totalCaloriesCalc(calorie) {
            // get parsed values
            let totalCalories = parseInt(this.total_calories.textContent);
            let calorieValue = parseInt(calorie);

            // sum calories
            totalCalories = (totalCalories + calorieValue);

            // append sum into total calories
            this.total_calories.textContent = totalCalories;
        }

        // get total calories from local storage
        getTotalCalFromLs() {
            // get parsed key from local storage
            const parsedKey = JSON.parse(localStorage.getItem('Meals'));
            const keyArray = Array.from(parsedKey);

            keyArray.forEach(item => {
                // get parsed values
                let totalCalories = parseInt(this.total_calories.textContent);
                let calories = parseInt(item.calorie);

                // sum calories
                totalCalories = (totalCalories + calories);

                // append sum into total calories
                this.total_calories.textContent = totalCalories;
            })
        }

        // save current card id
        currentCardIdSave(event) {
            const currentCardId = event.target.parentElement.parentElement.parentElement.id;
            const parseId = parseInt(currentCardId);

            this.currentId = parseId;
        }

        // delete card
        deleteCard() {
            // get all cards
            const cards = this.itemsInfo_elem.querySelectorAll('.card');
            const cardsArray = Array.from(cards);

            // check and remove card
            cardsArray.forEach(item => {
                if (item.id == this.currentId) {
                    item.remove();
                    this.currentCard.push(item);
                }
            })
        }

        // remove card from local storage
        removeCardFromLocalStorage() {
            // remove card from local storage
            const parseKey = JSON.parse(localStorage.getItem('Meals'));
            const keyArray = Array.from(parseKey);

            keyArray.forEach((item, index) => {
                // remove item from array
                if (item.id == this.currentId) {
                    keyArray.splice(index, 1);
                }

                // set new state of cards local storage
                localStorage.setItem('Meals', JSON.stringify(keyArray));

                // change buttons state
                uiFunc.buttonsState('add');

                // show alert when deleted
                uiFunc.showAlert('meal has deleted', 'warning');

                // empty input values
                this.add_input.value = '';
                this.calorie_input.value = '';
            })
        }

        // change total calorie value
        changeTotalCalValue() {
            // get total and deleted value
            const totalCal = parseInt(this.total_calories.textContent);
            const deletedCard = this.currentCard.slice(this.currentCard.length - 1)[0];

            // get deleted value
            const deletedCalElem = deletedCard.querySelector('#cal-amount').textContent;
            const deletedCalValue = parseInt(deletedCalElem);

            // calculate total and deleted values
            this.total_calories.textContent = (totalCal - deletedCalValue);
        }

    }

    // class instance
    let handle = new Handle();

    return {
        addMeal: function(meal, calorie) {
            return handle.addMeal(meal, calorie);
        },
        addMealToLocalStorage: function(meal, calorie, id) {
            return handle.addMealToLocalStorage(meal, calorie, id);
        },
        setBackValuesToInputs: function(event) {
            return handle.setBackValuesToInputs(event);
        },
        totalCaloriesCalc: function(calorie) {
            return handle.totalCaloriesCalc(calorie);
        },
        getTotalCalFromLs: function() {
            return handle.getTotalCalFromLs();
        },
        itemId: function() {
            return handle.itemId;
        },
        getMaxId: function() {
            return handle.getMaxId();;
        },
        currentCardIdSave: function(event) {
            return handle.currentCardIdSave(event);
        },
        deleteCard: function() {
            return handle.deleteCard();
        },
        removeCardFromLocalStorage: function() {
            return handle.removeCardFromLocalStorage();
        },
        changeTotalCalValue: function() {
            return handle.changeTotalCalValue();
        },
    }

})()

export default handleFunc;