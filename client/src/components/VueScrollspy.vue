<template>
    <v-navigation-drawer
        clipped
        fixed
        app
    >
        <v-list class="mt-4">
            <v-list-item>
                <v-list-item-title class="text-overline">Sections</v-list-item-title>
            </v-list-item>
        </v-list>
        <ul>
            <li
                v-for="(section, index) in sections"
                :key="index"
                class="mb-1"
            >
                <a
                    class="text-caption"
                    :class="section.active ? 'active':''"
                    :href="'#header'+(index+1)"
                > {{ section.name }} </a>
            </li>
        </ul>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: 'VueScrollspy',
        props: {
            sections: {
                type: Array,
                required: true,
                name: {
                    type: String,
                    required: true
                },
                active: {
                    type: Boolean,
                    default: false
                }
            }
        }
    }
</script>

<style scoped>
    .v-navigation-drawer {
        height: calc(100vh - 64px);
        top: 64px !important;
        padding-left: 16px;
    }
    .v-list-item__title {
        font-size: 16px !important;
    }
    ul {
        list-style-type: none;
        margin-left: -8px;  
    }
    a {
        text-decoration: none;
        color: rgb(100, 92, 92);
    }
    a:hover {
        color: #00C853;
    }
    a.active {
        color: #00C853;
    }
</style>