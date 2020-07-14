<template>
    <v-container class="card-replicate">
        <v-row class="information-row">
            <v-col
                class="container-col"
                lg="1"
                cols="2"
            >
                <v-img
                    height="100%"
                    width="100%"
                    :src='require("../assets/" + photo)'
                />
            </v-col>
            <v-col
                class="container-col"
                lg="9"
                cols="8"
            >
                <span class="text-h6">
                    {{ name }}
                </span>
                <span class="text-subtitle-1">
                    {{ role }}
                </span>
            </v-col>
            <v-col
                class="icon-col container-col"
                cols="2"
            >
                <div class="icon-container">
                    <v-tooltip
                        bottom
                        v-for="(contact, index) in contactIcons"
                        :key="index"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                icon
                                v-on="on"
                                v-bind="attrs"
                                :href="contact.link"
                                target="_blank"
                            >
                                <v-icon size="24px"> {{ contact.icon }} </v-icon>
                            </v-btn>
                        </template>
                        <span> {{ contact.info }} </span>
                    </v-tooltip>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="10">
                <p
                    class="px-4"
                    v-for="(paragraph, index) in description"
                    :key="index"
                >
                    {{ paragraph }}
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "PersonalProfile",
        props: {
            photo: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            role: {
                type: String,
                required: true
            },
            description: {
                type: Array,
                required: false
            },
            contactIcons: {
                type: Array,
                required: true,
                icon: {
                    type: String,
                    required: true
                },
                info: {
                    type: String,
                    required: false
                },
                link: {
                    type: String,
                    required: true
                }
            }
        }
    }
</script>

<style scoped>
    .container {
        padding: 0 16px
    }
    .information-row {
        /*background-color: #00C853;*/
        height: 125px;
    }
    .container-col {
        height: 100%;
    }
    .card-replicate {
        border-radius: 4px;
        border: thin solid rgba(0, 0, 0, 0.12);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    }
    span {
        display: block;
    }
    .icon-col {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    .icon-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
</style>