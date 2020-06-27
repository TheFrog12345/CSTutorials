<template>
    <v-hover
        v-slot:default="{ hover }"
    >
        <v-card
            :elevation="hover ? elevation+6:elevation"
            hover
            ripple
        >
            <v-list-item>
                <v-list-item-title class="headline">
                    {{ title }}
                </v-list-item-title>
            </v-list-item>
            <v-card-text>
                {{ text }}
            </v-card-text>
        </v-card>
    </v-hover>
</template>

<script>
    export default {
        name: "QACard",
        props: {
            elevation: {
                type: Number,
                default: 6
            },
            title: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }
    }
</script>