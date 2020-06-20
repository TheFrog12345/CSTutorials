Vue.component('dropdown-button', {
    props: {
        link: String,
        sublinks: String
    },
    data: function() {
        return {
            showDropdown: false
        }
    },
    methods: {
        changeStatus: function() {
            this.showDropdown = !this.showDropdown
        }
    },
    template:
    `
    <div>
        <a @mouseover="changeStatus" @mouseleave="changeStatus"> Test </a>
        <div v-show="showDropdown">
            <a v-for="sublink in sublinks"> {{ sublink }} </a>
        </div>
    </div>
    `
})

Vue.component('navbar-top', {
    template:
    `
    <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="/">Daily Innovation</a>
        <div>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item" v-for="link in navLinks">
                    <a @mouseover="print()" class="nav-link"> {{link}} </a>
                </li>
            </ul>
        </div>
    </nav>
    `,
    data: function() {
        return {
            navLinks: [
                "Algorithms",
                "Data Structures",
                "Python",
                "Git",
                "Other"
            ]
        }
    },
    methods: {
        print: function() {
            console.log(this.navLinks)
        }
    }
})

var vm = new Vue({
    el: '#app',
    data: {
        message: 'Hello World!'
    },
    methods: {
        helloWorld: function() {
            console.log('Hello World')
        }
    }
})