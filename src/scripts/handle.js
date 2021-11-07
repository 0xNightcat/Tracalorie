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

            div.innerHTML = `
            <div class="card-body">
                <span class="meal-name">${meal}</span>
                <span class="calorie badge badge-danger ml-3">Calorie : ${calorie}</span>
                <a href="#!">
                <span class="edit float-right"><i class="fas fa-pencil-alt"></i></span>
                </a>
            </div>
            `

            this.itemsInfo_elem.appendChild(div);
        }

        // add meal to local storage
        addMealToLocalStorage(meal, calorie) {
            let array;
            if (localStorage.getItem('Meals') == null) {
                array = [];
                array.push({ meal, calorie });
                localStorage.setItem('Meals', JSON.stringify(array));
            } else {
                let parsedKey = JSON.parse(localStorage.getItem('Meals'));

                parsedKey.push({ meal, calorie });

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