<template>
    <v-timeline>
        <v-timeline-item
            v-for="(item, index) in items"
            :key="index"
            :color="theme"
            :icon="item.icon"
            fill-dot
        >
            <span slot="opposite"> {{ item.date }} </span>
            <v-card
                :color="theme"
                dark
            >
                <v-card-title class="title"> {{ item.title }} </v-card-title>
                <v-card-text class="white text--primary">
                    <p> {{ item.description }} </p>
                    <v-btn
                        :color="theme"
                        class="mx-0"
                        outlined
                    >
                        Read More
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-timeline-item>
    </v-timeline>
</template>

<script>
    export default {
        name: "ListItems",
        props: {
            theme: {
                type: String,
                required: true,
                default: "primary"
            },
            items: {
                type: Array,
                required: true,
                icon: {
                    type: String,
                    required: false,
                    default: ""
                },
                date: {
                    type: String,
                    required: false,
                    default: ""
                },
                title: {
                    type: String,
                    required: true
                },
                description: {
                    type: String,
                    required: false
                }
            }
        }
    }
</script>

<style scoped>

</style>