const storage = window.localStorage;

const app = {

    init() {
        // check browser compatibility
        if(!this.checkBrowser) return false;

        // declare necessary properties
        this.activities = [];
        this.cacheDOMElements();
        
        // consume local storage
        this.getActivitiesFromStorage();
        this.showActivitiesInDOM();

        // cache DOM events
        this.cacheDOMEvents();
    },

    checkBrowser() {
        if(typeof(Storage) == 'undefined') {
            console.error('Browser outdated');
            return false;
        }
        return true;
    },

    getActivitiesFromStorage() {
        const localStorageActivities = storage.getItem('activities');
        if(localStorageActivities != null) {
            this.activities = JSON.parse(localStorageActivities);
        }
    },

    updateLocalStorage() {
        const activitiesString = JSON.stringify(this.activities);
        storage.setItem('activities', activitiesString);
    },

    cacheDOMElements() {
        this.$form = document.querySelector('#coroform');
        this.$ul = document.querySelector('#activities');
    },

    cacheDOMEvents() {
        this.$form.addEventListener('submit', (e) => {
            e.preventDefault();

            // get form values and reset form
            const formData = new FormData(this.$form);
            const activity = formData.get('activity');
            this.$form.reset();

            // add activity to activities array
            this.activities.push(activity);

            // update local storage
            this.updateLocalStorage();

            // add activity to DOM
            const li = document.createElement('li');
            li.innerText = activity;
            this.$ul.appendChild(li);
        });
    },

    showActivitiesInDOM() {
        this.$ul.innerText = '';
        for(act of this.activities) {
            const li = document.createElement('li');
            li.innerText = act;
            this.$ul.appendChild(li);
        }
    }
}

app.init();


// example 2
const boodschappen = [
    1,
    'toiletpapier',
    'conserveblikkenvoedsel',
    ['mais', 'boontjes'],
    'nog meer toiletpapier'
];
window.localStorage.setItem('groceries', JSON.stringify(boodschappen));

let groceries = JSON.parse(window.localStorage.getItem('groceries'));
console.log(groceries);