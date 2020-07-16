<template>
    <v-card
        height="fit-content"
    >
        <v-navigation-drawer
            permanent
            expand-on-hover
            hide-overlay
            color="green accent-4"
            height="auto"
        >
            <v-list
                dark
            >
                <v-list-item class="px-2">
                    <v-list-item-avatar>
                        <v-icon
                            :color="iconColor"
                        >
                            {{ icon }}
                        </v-icon>
                    </v-list-item-avatar>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="title">
                            {{ title }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ subtitle }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider/>
            <v-list
                nav
                dark
                two-line
                dense
            >
                <v-list-item
                    v-for="(item, index) in listItems"
                    :key="index"
                    :to="'/tutorials/'+item.name"
                >
                    <v-list-item-content>
                        <v-list-item-title> {{ item.name }} </v-list-item-title>
                        <v-list-item-subtitle> {{ item.section }} </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-card>
</template>

<script>
    export default {
        name: "RecommendationsBar",
        props: {
            icon: {
                type: String,
                required: true
            },
            iconColor: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            subtitle: {
                type: String,
                required: false
            },
            listItems: {
                type: Array,
                required: true,
                name: {
                    type: String,
                    required: true
                },
                section: {
                    type: String,
                    required: false
                }
            }
        }
    }
</script>

<style scoped>
    .v-navigation-drawer:hover {
        cursor: pointer;
    }
</style>