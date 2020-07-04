<template>
    <v-footer
        dark
        app
        padless
        absolute
    >
        <v-card
            flat
            tile
            width="100%"
            class="primary text--white text-center"
        >
            <v-card-text>
                <v-btn color="white" :style="{color: '#1976d2'}">
                    Contact Us!
                    <v-icon class="ml-2">mdi-account-supervisor</v-icon>
                </v-btn>
            </v-card-text>

            <v-card-text class="white--text pt-0">
                Tutorials are peer edited and written by both Yang and Fred
                <br>
                Website frontend designed and coded by Fred Liu
                <br>
                Backend functions coded by Yang Lu
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