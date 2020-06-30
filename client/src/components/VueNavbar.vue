<template>
    <div>
        <v-app-bar
            fixed
            :color="appBarColor"
            dark
            v-scroll="fadeImage"
        >
            <div class="d-flex align-center">
                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                    transition="scale-transition"
                    width="40"
                />

                <v-toolbar-title
                    class="mt-1"
                >DAILY INNOVATION</v-toolbar-title>
            </div>

            <v-spacer></v-spacer>

            <v-menu
                offset-y
                transition="slide-y-transition"
                open-on-hover
                dark
                close-delay="50"
                nudge-bottom="10"
                v-for="(section, index1) in menuContent"
                :key="index1"
                v-model="section.display"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        class="hidden-sm-and-down mr-1"
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
                        to="/about"
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
            >
                Contact Us!
                <v-icon class="ml-2">mdi-account-supervisor</v-icon>
            </v-btn>
        </v-app-bar>
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
                        <v-list-item>
                            <v-list-item-title class="text--white">
                                {{ section.name }}
                            </v-list-item-title>
                        </v-list-item>
                    </template>
                    <v-list-item
                        v-for="(item, index2) in section.items"
                        :key="index2"
                        to="/test"
                        :class="item.active"
                    >
                        <v-list-item-title> {{ item.name }} </v-list-item-title>
                    </v-list-item>
                </v-list-group>
                
                <v-list-item
                    to="/test"
                >
                    <v-list-item-title>
                        Contact Us!
                        <v-icon class="ml-2">mdi-account-supervisor</v-icon>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    export default {
        name: "VueNavbar",
        data: () => {
            return {
                showSide: false,
                appBarColor: "rgb(0, 0, 0, 0)",
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
                        display: false,
                        temporary: false
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
                        display: false,
                        temporary: false
                    },
                    {
                        name: "Algorithms",
                        items: [
                            {
                                name: "Syntax",
                                active: ""
                            }
                        ],
                        display: false,
                        temporary: false
                    }
                ],
                searchString: ""
            }
        },
        methods: {
            fadeImage: function() {
                if (document.documentElement.scrollTop != 0) {
                    this.appBarColor = "primary"
                } else {
                    this.appBarColor = "rgb(0, 0, 0, 0)"
                }
            },
            search: function() {
                setTimeout(() => {
                    for (let i = 0; i < this.menuContent.length; i++) {
                        let section = this.menuContent[i]
                        section.display = false
                        for (let j = 0; j < section.items.length; j++) {
                            if (this.searchString == "") {
                                section.items[j].active=""
                            } else {
                                let regex = new RegExp(this.searchString, "i")
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
            }
        }
    }
</script>

<style scoped>
    .v-app-bar .v-text-field {
        max-width: 200px;
    }

    .search-result:not(.v-list-item--active):before {
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