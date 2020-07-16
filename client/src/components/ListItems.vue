<template>
    <v-timeline
        :dense="dense"
    >
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
                <v-card-title class="title"> {{ item.name }} </v-card-title>
                <v-card-subtitle> {{ item.section }} </v-card-subtitle>
                <v-card-text class="white text--primary text-center pt-4">
                    <p> {{ item.description }} </p>
                    <v-btn
                        :color="theme"
                        class="mx-0"
                        outlined
                        :to="'/tutorials/'+item.name"
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
            dense: {
                type: Boolean,
                required: true
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
                name: {
                    type: String,
                    required: true
                },
                section: {
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
    .v-timeline {
        margin: 0 50px;
    }
</style>