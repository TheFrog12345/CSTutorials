<template>
    <div
        class="mt-14"
        v-scroll="checkSection"
        v-resize="resize"
    >
        <div v-if="tutorialNotFound" class="text-center">
            <span class="text-overline mt-16">Error 404: Tutorial page not found </span>
        </div>
        <div v-if="!tutorialNotFound">
            <VueScrollspy
                :sections="sections"
            />
            <v-container
                :class="this.windowWidth < 600 ? '':'px-16'"
            >
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
                                v-if="part.group=='subheader'"
                                class="mb-4 mt-6 text-body-1"
                            > {{ part.text }} </span>
                            <span
                                v-if="part.group=='paragraph'"
                                class="mb-4 text-body-2"
                                v-html="part.text"
                            ></span>
                            <span
                                v-if="part.group=='list'"
                                style="margin-top: -8px; margin-bottom: 12px"
                                class="ml-8 text-body-2"
                                v-html="part.text"
                            ></span>
                            <div
                                v-if="part.group=='command'"
                                class="ml-8 mb-4"
                            >
                                <span
                                    class="text-body-2 command"
                                    v-html="part.text"
                                ></span>
                                <span
                                    class="text-caption"
                                    v-if="part.description"
                                    v-html="part.description"
                                ></span>
                            </div>
                            <table
                                v-if="part.group=='table'"
                                class="mb-4"
                                :style="{width: windowWidth-40+'px'}"
                            >
                                <tr>
                                    <th
                                        v-for="(header, index1) in part.description.split(';')"
                                        :key="index1"
                                        v-html="header"
                                    ></th>
                                </tr>
                                <tr
                                    v-for="(row, index1) in part.text.split('/')"
                                    :key="index1"
                                >
                                    <td
                                        v-for="(col, index2) in row.split(';')"
                                        :key="index2"
                                        v-html="col"
                                    ></td>
                                </tr>
                            </table>
                            <div
                                v-if="part.group=='image'"
                                class="ml-0 mb-4"
                            >
                                <v-img
                                    :src='require("@/assets/" + loadedParameter + "/" + part.text)'
                                    :width="windowWidth < 600 ? windowWidth-104:'50%'"
                                    class="ml-8"
                                    @click="part.showDetails=true"
                                    transition="scale-transition"
                                ></v-img>
                                <span
                                    class="text-caption ml-8"
                                    v-html="part.description"
                                ></span>
                                <v-overlay
                                    v-model="part.showDetails"
                                    @click.native="part.showDetails=false"
                                    class="tutorial-overlay text-center"
                                    z-index="1000"
                                    opacity="0.9"
                                >
                                    <v-img
                                        :src='require("@/assets/" + loadedParameter + "/" + part.text)'
                                        width="100%"
                                        :style="{maxHeight: windowHeight-150+'px'}"
                                        contain
                                        transition="scale-transition"
                                    ></v-img>
                                    <span
                                        class="text-md-h5 overlay-caption mt-6"
                                        v-html="part.description"
                                    ></span>
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
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
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
            resize: function() {
                this.windowWidth = window.innerWidth
                this.windowHeight = window.innerHeight
            },
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
            convertDate: function(numbers) {
                let date = numbers.split('/')
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                date[1] = months[Number(date[1])-1]
                return date[1] + " " + Number(date[2]) + " " + date[0]
            },
            getTutorialData: function(tutorialName) {
                axios.post('http://127.0.0.1:5000/tutorials/'+tutorialName.toLowerCase())
                    .then((result) => {
                        console.log(result.data)
                        this.tutorialNotFound = false
                        this.sections = []
                        this.title = ''
                        this.subtitle = ''
                        this.date = ''
                        this.favorites = false
                        this.tutorialParts = []
                        
                        this.title = result.data.title
                        this.subtitle = result.data.subtitle
                        this.date = this.convertDate(result.data.date)
                        this.favorites = result.data.favorite
                        this.tutorialParts = result.data.tutorialParts

                        this.sections.push({name: this.title, active: false})
                        for (let i = 0; i < this.tutorialParts.length; i++) {
                            if (this.tutorialParts[i].group == 'header') {
                                this.sections.push({name: this.tutorialParts[i].text, active: false})
                            }
                        }

                        setTimeout(() => {
                            this.checkSection()
                        }, 100)

                        this.loadedParameter = tutorialName.toLowerCase()
                        console.log('success')
                    })
                    .catch((err) => {
                        console.log(err)
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
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        padding: 16px;
    }
    th {
        text-align: left;
    }
</style>