<template>
    <div
        class="mt-14"
        v-scroll="checkSection"
    >
        <div v-if="tutorialNotFound" class="text-center">
            <span class="text-overline mt-16">Error 404: Tutorial page not found </span>
        </div>
        <div v-if="!tutorialNotFound">
            <VueScrollspy
                :sections="sections"
            />
            <v-container>
                <v-row>
                    <v-col>
                        <div class="ml-2">
                            <span class="text-h4 mt-4 section-header"> {{ title }}
                                <v-tooltip
                                    v-if="favorites"
                                    bottom
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                            v-on="on"
                                            v-bind="attrs"
                                            color="green accent-4"
                                            large
                                            style="margin-top: -5px"
                                        > mdi-bookmark-multiple </v-icon>
                                    </template>
                                    <span> One of our favorites! </span>
                                </v-tooltip>
                                <span class="section-anchor" id="header1"></span>
                            </span>
                            <span class="text-subtitle-2"> {{ subtitle }} </span>
                            <span class="text-subtitle-2 mt-8"> {{ date }} </span>
                        </div>
                        <div
                            v-for="(part, index) in tutorialParts"
                            :key="index"
                            class="ml-2 tutorials"
                        >
                            <span
                                v-if="part.group=='header'"
                                class="mb-4 text-h6 mt-8 section-header"
                            > {{ part.text }} <span class="section-anchor" :id="'header'+(part.number+1)"></span> </span>
                            <span
                                v-if="part.group=='paragraph'"
                                class="mb-4 text-body-2"
                            > {{ part.text }} </span>
                            <div
                                v-if="part.group=='command'"
                                class="ml-8 mb-4"
                            >
                                <span class="text-body-2 command">
                                    {{ part.text }}
                                </span>
                                <span class="text-caption" v-if="part.description">
                                    ({{ part.description }})
                                </span>
                            </div>
                            <div
                                v-if="part.group=='image'"
                                class="ml-0 mb-4"
                            >
                                <v-img
                                    :src='require("../assets/" + loadedParameter + "/" + part.text)'
                                    width="50%"
                                    class="ml-8"
                                    @click="part.showDetails=true"
                                ></v-img>
                                <span class="text-caption ml-8">
                                    {{ part.description }}
                                </span>
                                <v-overlay
                                    v-model="part.showDetails"
                                    @click.native="part.showDetails=false"
                                    class="tutorial-overlay text-center"
                                    z-index="1000"
                                    opacity="0.9"
                                >
                                    <v-img
                                        :src='require("../assets/" + loadedParameter + "/" + part.text)'
                                        width="100%"
                                    ></v-img>
                                    <span class="text-md-h5 overlay-caption mt-6">
                                        {{ part.description }}
                                    </span>
                                </v-overlay>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import VueScrollspy from "@/components/VueScrollspy.vue"
    export default {
        name: "Tutorial",
        components: {
            VueScrollspy
        },
        data: () => {
            return {
                loadedParameter: '',
                tutorialNotFound: false,
                sections: [],
                title: '',
                subtitle: '',
                date: '',
                favorites: false,
                tutorialParts: []
            }
        },
        methods: {
            checkSection: function() {
                let targets = document.querySelectorAll('.section-header')
                let previousDistance = 10000
                for (let i = 0; i < targets.length; i++) {
                    let offsetTop = targets[i].getBoundingClientRect().top-56
                    if (offsetTop >= 0) {
                        for (let j = 0; j < this.sections.length; j++) {
                            this.sections[j].active = false
                        }
                        offsetTop < previousDistance ? this.sections[i].active = true:this.sections[i-1].active = true
                        break
                    }
                    previousDistance = offsetTop*-1
                }
            },
            getTutorialData: function(tutorialName) {
                axios.post('http://127.0.0.1:5000/tutorials/'+tutorialName.toLowerCase())
                    .then((result) => {
                        this.tutorialNotFound = false
                        this.sections = []
                        this.title = ''
                        this.subtitle = ''
                        this.date = ''
                        this.favorites = false
                        this.tutorialParts = []
                        
                        this.title = result.data.title
                        this.subtitle = result.data.subtitle
                        this.date = result.data.date
                        this.favorites = result.data.favorites
                        this.tutorialParts = result.data.tutorialParts

                        this.sections.push({name: this.title, active: false})
                        for (let i = 0; i < this.tutorialParts.length; i++) {
                            if (this.tutorialParts[i].group == 'header') {
                                this.sections.push({name: this.tutorialParts[i].text, active: false})
                            }
                        }

                        setTimeout(() => {
                            this.checkSection()
                        }, 0)

                        this.loadedParameter = tutorialName.toLowerCase()
                    })
                    .catch(() => {
                        this.tutorialNotFound = true
                        this.loadedParameter = tutorialName.toLowerCase()
                    })
            }
        },
        watch: {
            '$route' (to) {
                let tutorialName = to.params.tutorialName.toLowerCase()
                if (tutorialName != this.loadedParameter) {
                    this.getTutorialData(tutorialName)
                }
            }
        },
        mounted() {
            this.getTutorialData(this.$route.params.tutorialName)
        }
    }
</script>

<style>
    .tutorial-overlay .v-overlay__content {
        width: 90% !important;
        max-width: 960px !important;
    }
</style>

<style scoped>
    span {
        display: block;
    }
    .v-tooltip {
        display: inline;
    }
    .section-anchor {
        display: inline;
        position: relative;
        top: -64px;
        visibility: hidden;
    }
    .command {
        font-weight: bold;
        color: black;
    }
    .tutorials .v-image.ml-8:hover {
        cursor: url('../assets/magnify.png'), auto;
    }
</style>