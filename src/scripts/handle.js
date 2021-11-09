// imports


let handleFunc = (() => {

    class Handle {
        constructor() {
            this.itemsInfo_elem = document.querySelector('#show-details .items-info');
        }

        // add meal
        addMeal(meal, calorie) {
            // create card elem
            const div = document.createElement('div');
            div.classList = 'card';

            // create card items
            div.innerHTML = `
            <div class="card-body">
                <span class="meal-name">${meal}</span>
                <span class="calorie badge badge-danger ml-3">Calorie : ${calorie}</span>
                <a href="#!" class="btn-edit">
                <i class="fas fa-edit"></i>
                </a>
            </div>
            `

            // append items into list
            this.itemsInfo_elem.appendChild(div);
        }

        // add meal to local storage
        addMealToLocalStorage(meal, calorie) {
            let array;
            // check if local storage is null
            if (localStorage.getItem('Meals') == null) {
                array = [];
                array.push({ meal, calorie });
                // fill local storage with items
                localStorage.setItem('Meals', JSON.stringify(array));
            } else {
                // parse local storage item
                let parsedKey = JSON.parse(localStorage.getItem('Meals'));

                // fill again into item
                parsedKey.push({ meal, calorie });

                // set new items into parsed local storage
                localStorage.setItem('Meals', JSON.stringify(parsedKey));
            }
        }

    }

    // class instance
    let handle = new Handle();

    return {
        addMeal: function(meal, calorie) {
            return handle.addMeal(meal, calorie);
        },
        addMealToLocalStorage: function(meal, calorie) {
            return handle.addMealToLocalStorage(meal, calorie);
        }
    }

})()

export default handleFunc;