<template>
    <v-footer
        dark
        padless
    >
        <v-card
            flat
            tile
            width="100%"
            class="primary text--white text-center"
        >
            <v-card-text class="white--text">
                This website is coded using Vue for the frontend and Flask for the server.
                <br>
                Page routing - Vue Router
                <br>
                Vue component framework - Vuetify
                <br>
                To learn more, visit the contact us page.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="white--text">
                {{ new Date().getFullYear() }} — <strong>Daily Innovation</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
    export default {
        name: "VueFooter",

    }
</script>

<style scoped>
    .v-footer {
        z-index: 5;
    }
</style>