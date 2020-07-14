<template>
    <div class="mt-14">
        <VueScrollspy
            :sections="sections"
        />
        <v-container>
            <v-row>
                <v-col>
                    <div>
                        <span class="text-h4 mt-4 section-header"> {{ title }} <span class="section-anchor" id="header1"></span> </span>
                        <span class="text-subtitle-2"> {{ subtitle }} </span>
                    </div>
                    <div
                        v-for="(part, index) in tutorialParts"
                        :key="index"
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
                            class="ml-8 mb-4"
                        >
                            <v-img
                                :src='require("../assets/" + part.text)'
                                width="50%"
                                class="ml-0"
                            ></v-img>
                            <span class="text-caption">
                                {{ part.description }}
                            </span>
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

<style scoped>
    span {
        display: block;
    }
    .container div {
        margin-left: 8px
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
</style>