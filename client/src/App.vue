<template>
    <div id="TestMergeConflict" class="primary">
        <v-app>
            <VueNavbar/>
            <v-main>
                <router-view/>
            </v-main>
            <VueFooter class="mt-16"/>
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
    html {
        scroll-behavior: smooth;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: rgb(44, 44, 44);
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: rgb(44, 44, 44);

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>