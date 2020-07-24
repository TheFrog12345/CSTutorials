<template>
    <div>
        <v-app-bar
            fixed
            :color="appBarColor"
            dark
            v-scroll="fadeImage"
        >
            <div class="d-flex align-center">
                <v-btn
                    class="home-button"
                    text
                    to="/"
                >
                    <v-img
                        alt="Vuetify Logo"
                        class="shrink mr-2"
                        contain
                        src="@/assets/logo.png"
                        transition="scale-transition"
                        width="60"
                    />
                    <v-toolbar-title
                        class="mt-1"
                    >DAILY INNOVATION</v-toolbar-title>
                </v-btn>
            </div>

            <v-spacer></v-spacer>

            <v-menu
                offset-y
                transition="slide-y-transition"
                open-on-hover
                dark
                close-delay="50"
                nudge-bottom="14"
                v-for="(section, index1) in menuContent"
                :key="index1"
                v-model="section.display"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        class="hidden-sm-and-down mr-1"
                        :class="section.active"
                        text
                        v-bind="attrs"
                        v-on="on"
                    >
                        {{ section.name }}
                    </v-btn>
                </template>
                <v-list
                    class="hidden-sm-and-down"
                    :color="appBarColor"
                    :outlined=true
                >
                    <v-list-item
                        v-for="(item, index2) in section.items"
                        :key="index2"
                        :to="'/tutorials/'+item.name.toLowerCase()"
                        :class="item.active"
                    >
                        <v-list-item-title> {{ item.name }} </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-text-field
                label="Search..."
                outlined
                clearable
                hide-details
                filled
                dense
                v-model="searchString"
                class="hidden-md-and-down"
                @keydown="search"
                @click:clear="search"
                autocomplete="off"
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="showSide = !showSide"></v-app-bar-nav-icon>
            <v-btn
                class="hidden-sm-and-down mr-1"
                text
                to="/contact"
            >
                Contact Us!
                <v-icon class="ml-2">mdi-account-supervisor</v-icon>
            </v-btn>
        </v-app-bar>
        <v-card>
            <v-navigation-drawer
                app
                v-model="showSide"
                v-resize="closeMenu"
                temporary
                right
                dark
                :width="windowWidth/3 > 250 ? windowWidth/3:250"
                overlay-color="primary"
                color="primary"
                class="text-center"
            >
                <v-list>
                    <v-list-item>
                        <v-list-item-title class="title">
                            Menu
                        </v-list-item-title>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>
                <v-list
                    nav
                    expand
                >
                    <v-list-item>
                        <v-text-field
                            label="Search..."
                            outlined
                            clearable
                            hide-details
                            filled
                            dense
                            v-model="searchString"
                            @keydown="search"
                            @click:clear="search"
                            autocomplete="off"
                        ></v-text-field>
                    </v-list-item>
                    <v-list-group
                        v-for="(section, index1) in menuContent"
                        :key="index1"
                        v-model="section.display"
                        color="white"
                        no-action
                    >
                        <template v-slot:activator>
                            <v-list-item :class="section.active">
                                <v-list-item-title class="text--white">
                                    {{ section.name }}
                                </v-list-item-title>
                            </v-list-item>
                        </template>
                        <v-list-item
                            v-for="(item, index2) in section.items"
                            :key="index2"
                            :to="'/tutorials/'+item.name.toLowerCase()"
                            :class="item.active"
                        >
                            <v-list-item-title> {{ item.name }} </v-list-item-title>
                        </v-list-item>
                    </v-list-group>
                    
                    <v-list-item
                        to="/contact"
                    >
                        <v-list-item-title>
                            Contact Us!
                            <v-icon class="ml-2">mdi-account-supervisor</v-icon>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-card>
    </div>
</template>

<script>
    //import axios from 'axios'
    export default {
        name: "VueNavbar",
        data: () => {
            return {
                showSide: false,
                isHomepage: true,
                appBarColor: "",
                windowWidth: window.innerWidth,
                menuContent: [
                    {
                        name: "Python",
                        items: [
                            {
                                name: "Syntax",
                                active: ""
                            }
                        ],
                        active: "",
                        display: false
                    },
                    {
                        name: "Data Structures",
                        items: [
                            {
                                name: "Set",
                                active: ""
                            },
                            {
                                name: "Dictionary",
                                active: ""
                            },
                            {
                                name: "Linked List",
                                active: ""
                            }
                        ],
                        active: "",
                        display: false
                    },
                    {
                        name: "Other",
                        items: [
                            {
                                name: "Git",
                                active: ""
                            }
                        ],
                        active: "",
                        display: false
                    }
                ],
                searchString: ""
            }
        },
        methods: {
            fadeImage: function() {
                if (this.isHomepage) {
                    document.documentElement.scrollTop != 0 ? this.appBarColor="primary":this.appBarColor="rgb(0, 0, 0, 0)"
                }
            },
            search: function() {
                setTimeout(() => {
                    for (let i = 0; i < this.menuContent.length; i++) {
                        let section = this.menuContent[i]
                        let regex = new RegExp(this.searchString, "i")
                        section.display = false
                        if (this.searchString == "") {
                            section.active=""
                        } else {
                            if (regex.test(section.name)) {
                                section.display = true
                                section.active="search-result"
                            } else {
                                section.active=""
                            }
                        }
                        
                        for (let j = 0; j < section.items.length; j++) {
                            if (this.searchString == "") {
                                section.items[j].active=""
                            } else {
                                if (regex.test(section.items[j].name)) {
                                    section.items[j].active="search-result"
                                    section.display = true
                                } else {
                                    section.items[j].active=""
                                }
                            }
                        }
                    }
                }, 75)
            },
            closeMenu: function() {
                this.windowWidth = window.innerWidth
                this.windowHeight = window.innerHeight
                if (this.windowWidth >= 960) {
                    this.showSide = false
                }
            },
            checkIfHomepage: function(path) {
                path = path.split('/')[1]
                if (path == '' || path[0] == '#') {
                    this.isHomepage = true
                    this.fadeImage()
                } else {
                    this.isHomepage = false
                    this.appBarColor = 'primary'
                }
            }
        },
        watch: {
            '$route' (to) {
                this.checkIfHomepage(to.fullPath)
            }
        },
        mounted() {
            /*
            axios.post('http://127.0.0.1:5000/getTutorials')
                .then((result) => {
                    this.menuContent = result.data
                })*/
            this.checkIfHomepage(window.location.pathname)
        }
    }
</script>

<style scoped>
    .home-button {
        padding: 4px !important;
        height: auto !important;
    }
    .home-button.v-btn--active::before {
        opacity: 0;
    }
    .home-button.v-btn--active:hover::before {
        opacity: 0.08;
    }

    .v-app-bar .v-text-field {
        max-width: 200px;
    }

    .search-result:not(.v-list-item--active)::before {
        opacity: 0.16 !important;
    }
    .search-result:not(.v-list-item--active):hover::before {
        opacity: 0.24 !important;
    }
    .v-list-item--active:not(.search-result):hover::before {
        opacity: 0.32 !important;
    }
    .v-list-item--active.search-result::before {
        opacity: 0.4 !important;
    }
    .v-list-item--active.search-result:hover::before {
        opacity: 0.48 !important;
    }
</style>