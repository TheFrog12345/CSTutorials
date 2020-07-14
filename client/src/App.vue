<template>
    <div id="CreatingMergeConflict" class="primary">
        <v-app>
            <VueNavbar/>
            <v-main class="mb-16">
                <router-view/>
            </v-main>
            <VueFooter/>
        </v-app>
    </div>
</template>

<script>
    import VueNavbar from "@/components/VueNavbar.vue"
    import VueFooter from "@/components/Footer.vue"
    export default {
        name: "App",
        components: {
            VueNavbar,
            VueFooter
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