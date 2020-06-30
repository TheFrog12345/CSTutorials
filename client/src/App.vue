<template>
    <div id="app" class="primary">
        <v-app>
            <VueNavbar/>
            <v-main>
                <router-view/>
            </v-main>
        </v-app>
    </div>
</template>

<script>
    import VueNavbar from "@/components/VueNavbar.vue"
    export default {
        name: "App",
        components: {
            VueNavbar
        },
        data: () => ({
            
        }),
        methods: {
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