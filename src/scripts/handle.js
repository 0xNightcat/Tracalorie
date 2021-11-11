// imports


let handleFunc = (() => {

    class Handle {
        constructor() {
            this.itemsInfo_elem = document.querySelector('#show-details .items-info');
            this.add_input = document.querySelector('#add-input');
            this.calorie_input = document.querySelector('#calorie-input');
            this.total_calories = document.querySelector('#total-cal');
            this.itemId = 0;
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
        }
    }

})()

export default handleFunc;