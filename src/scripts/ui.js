// imports


let uiFunc = (() => {

    class UiController {
        constructor() {
            this.alert_elem = document.querySelector('.card .alert');
            this.itemsInfo_elem = document.querySelector('#show-details .items-info');
        }

        // show message
        showAlert(text, color) {
            // dynamic alert
            this.alert_elem.textContent = text;
            this.alert_elem.classList.add(`alert-${color}`);

            // visible alert
            this.alert_elem.style.opacity = '1';
            this.alert_elem.style.visibility = 'visible';

            // hide alert
            setTimeout(() => {
                this.alert_elem.style.opacity = '0';
                this.alert_elem.style.visibility = 'hidden';
            }, 2000);
        }

        // get meals from local storage
        getMealsFromLocalStorage() {
            let array;
            if (localStorage.getItem('Meals') == null) {
                array = [];
            } else {
                let parsedKey = JSON.parse(localStorage.getItem('Meals'));

                parsedKey.forEach(item => {
                    // create card elem
                    const div = document.createElement('div');
                    div.classList = 'card';

                    div.innerHTML = `
                            <div class="card-body">
                                <span class="meal-name">${item.meal}</span>
                                <span class="calorie badge badge-danger ml-3">Calorie : ${item.calorie}</span>
                                <a href="#!">
                                    <span class="edit float-right"><i class="fas fa-pencil-alt"></i></span>
                                </a>
                            </div>
                            `

                    this.itemsInfo_elem.appendChild(div);
                });
            }
        }

    }

    // class instance
    let ui = new UiController();

    return {
        showAlert: function(text, color) {
            return ui.showAlert(text, color);
        },
        getMealsFromLocalStorage: function() {
            return ui.getMealsFromLocalStorage();
        }
    }

})()

export default uiFunc;