<template>
    <div class="mt-14">
        <VueScrollspy
            :sections="sections"
        />
        <v-container>
            <v-row>
                <v-col>
                    <div class="ml-2">
                        <span class="text-h4 mt-4 section-header"> {{ title }} <span class="section-anchor" id="header1"></span> </span>
                        <span class="text-subtitle-2"> {{ subtitle }} </span>
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
                                :src='require("../assets/" + part.text)'
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
                                    :src='require("../assets/" + part.text)'
                                    width="100%"
                                ></v-img>
                                <span class="text-caption overlay-caption mt-6">
                                    {{ part.description }}
                                </span>
                            </v-overlay>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import VueScrollspy from "@/components/VueScrollspy.vue"
    import Tutorials from "@/information/tutorials"
    export default {
        name: "Tutorial",
        components: {
            VueScrollspy
        },
        data: () => {
            return {
                sections: [],
                title: '',
                subtitle: '',
                tutorialParts: []
            }
        },
        methods: {
            
        },
        mounted() {
            let tutorialName = this.$route.params.tutorialName.toLowerCase()
            this.title = Tutorials[tutorialName].title
            this.subtitle = Tutorials[tutorialName].subtitle
            this.tutorialParts = Tutorials[tutorialName].tutorialParts
            
            this.sections.push({name: this.title, active: false})
            for (let i = 0; i < this.tutorialParts.length; i++) {
                if (this.tutorialParts[i].group == 'header') {
                    this.sections.push({name: this.tutorialParts[i].text, active: false})
                }
            }
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
    .overlay-caption {
        font-size: 24px !important;
    }
    .tutorials .v-image.ml-8:hover {
        cursor: url('../assets/magnify-plus.png'), auto;
    }
</style>