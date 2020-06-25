<template>
    <div id="app">
        <v-app>
            <v-app-bar
                app
                fixed
                :color="appBarColor"
                dark
                height="undefined"
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
                >
                    <template v-slot:activator="{ on, attrs}">
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
                        >
                            <v-list-item-title> {{ item }} </v-list-item-title>
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

            <v-main>
                <v-img
                    v-resize="resizeImage"
                    :width="windowWidth"
                    :height="windowHeight"
                    src="@/assets/test2.jpg"
                >
                    <v-row
                        style="height: 100%"
                    >
                        <v-col
                            cols="8"
                            offset="2"
                            align-self="center"
                        >
                            <label class="text-sm-h3 white--text" style="display: block">Coding is freedom of design</label>
                            <br>
                            <label class="text-sm-h6 white--text" style="display: block">Learn to code today</label>
                            <br>
                            <br>
                            <br>
                        </v-col>
                    </v-row>
                </v-img>
                <router-view/>
            </v-main>

            <v-navigation-drawer
                app
                v-model="showSide"
                absolute
                temporary
                right
                dark
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
                >
                    <v-list-item
                    v-for="(section, index1) in menuContent"
                    :key="index1"
                    link
                    >
                        <v-list-item-title> {{ section.name }} </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-app>
    </div>
</template>

<script>
    export default {
        name: "App",
        data: () => ({
            showSide: false,
            appBarColor: "rgb(0, 0, 0, 0)",
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            menuContent: [
                {
                    name: "Python",
                    items: ["Syntax"]
                },
                {
                    name: "Data Structures",
                    items: ["Set", "Dictionary", "Linked List"]
                },
                {
                    name: "Algorithms",
                    items: ["Syntax"]
                }
            ],
            searchString: ""
        }),
        methods: {
            fadeImage: function() {
                if (document.documentElement.scrollTop != 0) {
                    this.appBarColor = "primary"
                } else {
                    this.appBarColor = "rgb(0, 0, 0, 0)"
                }
            },
            resizeImage: function() {
                this.windowWidth = window.innerWidth
                this.windowHeight = window.innerHeight
            },
            search: function() {
                setTimeout(() => {
                    console.log(this.searchString)
                }, 75)
            },
            test: function() {
                console.log('test')
            }
        },
        mounted() {
            //action upon loading of app
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>

<style scoped>
    .v-text-field{
        max-width: 200px;
    }
</style>