// imports


let uiFunc = (() => {

    class UiController {
        constructor() {
            this.alert_elem = document.querySelector('.card .alert');
            this.itemsInfo_elem = document.querySelector('#show-details .items-info');
            this.btn_add = document.querySelector('.buttons .left .btn-add');
            this.btn_update = document.querySelector('.buttons .left .btn-update');
            this.btn_delete = document.querySelector('.buttons .left .btn-delete');
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

        // buttons state
        buttonsState(state) {
            if (state == 'add') {
                this.btn_delete.style.display = 'none';
                this.btn_update.style.display = 'none';
            } else if (state == 'edit') {
                this.btn_add.style.display = 'none';
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
        },
        buttonsState: function(state) {
            return ui.buttonsState(state);
        }
    }

})()

export default uiFunc;