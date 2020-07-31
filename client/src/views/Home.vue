<template>
    <div v-resize="resize">
        <v-img
            :width="windowWidth"
            :height="windowHeight"
            src="@/assets/calabogie.jpg"
        >
            <v-row
                class="text-center"
                style="height: 100%"
            >
                <v-col
                    cols="8"
                    offset="2"
                    align-self="center"
                >
                    <label class="text-sm-h2 white--text" style="display: block">Coding is a freedom of design</label>
                    <br>
                    <label class="text-sm-h6 white--text" style="display: block">Learn about coding on this website!</label>
                </v-col>
            </v-row>
        </v-img>
        <v-row style="justify-content: center">
            <span class="text-subtitle-1" style="padding: 0 50px;">Developer Fred Liu staring out into the vast expanse of hills at Eagle's Nest, Calabogie</span>
        </v-row>
        <v-container class="mt-4">
            <v-row class="text-center">
                <v-col
                    v-for="(card, index1) in textInformation"
                    :key="index1"
                    :cols="cardCols"
                >
                    <QACard
                        :title="card.question"
                        :text="card.answer"
                        :elevation="6"
                    />
                </v-col>
            </v-row>
            <v-divider class="mt-8"></v-divider>
        </v-container>
        <v-container fluid class="mt-8">
            <v-row style="justify-content: center">
                <span class="text-h5 text-sm-h2">Check out our posts!</span>
            </v-row>
            <v-row class="mt-8">
                <RecommendationsBar
                    v-if="timelineWidth >= 900"
                    icon="mdi-star"
                    iconColor="yellow"
                    title="Personal Favorites"
                    subtitle="See our list of favorites below!"
                    :listItems="recommendationsList"
                    class="mt-4"
                    style="z-index:2"
                />
                <v-col class="recents">
                    <ListItems
                        theme="green accent-4"
                        :items="timelineItems"
                        :dense="timelineWidth < 900"
                    />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios'
    import QACard from "@/components/QACard.vue"
    import RecommendationsBar from "@/components/RecommendationsBar.vue"
    import ListItems from "@/components/ListItems.vue"
    export default {
        name: 'Home',
        components: {
            QACard,
            RecommendationsBar,
            ListItems
        },
        data: () => {
            return {
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
                cardCols: 4,
                timelineWidth: 0,
                textInformation: [
                    {
                        question: "Who",
                        answer: "We are two developers with a passion for coding. Read more about us by clicking contact us in the navigation bar! We would love to hear from you."
                    },
                    {
                        question: "What",
                        answer: "This is a website containing many computer science tutorials, written specifically so that those with little experience can understand. Check the menu for available tutorials!"
                    },
                    {
                        question: "Why",
                        answer: "Here at Daily Innovation, we want to share our knowledge to inspire future innovators. We believe that learning coding gives you many freedoms."
                    }
                ],
                recommendationsList: [],
                timelineItems: []
            }
        },
        methods: {
            getTimelineWidth: function() {
                this.timelineWidth = getComputedStyle(document.querySelector('.recents').parentNode).width
                this.timelineWidth = Number(this.timelineWidth.substring(0, this.timelineWidth.length-2))
            },
            resize: function() {
                this.windowWidth = window.innerWidth
                this.windowHeight = window.innerHeight
                if (this.windowWidth <= 600) {
                    this.cardCols = 12
                } else {
                    this.cardCols = 4
                }
                this.getTimelineWidth()
            },
            capitalize: function(string) {
                let words = string.split(" ")
                for (let i = 0; i < words.length; i++) {
                    words[i] = words[i][0].toUpperCase() + words[i].substring(1)
                }
                let newString = words.join(" ")
                return newString
            },
            convertDate: function(numbers) {
                let date = numbers.split('/')
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                date[1] = months[Number(date[1])-1]
                return date[1] + " " + Number(date[2]) + " " + date[0]
            }
        },
        mounted() {
            axios.post('http://127.0.0.1:5000/getRecents')
                .then((result) => {
                    console.log(result.data)
                    this.timelineItems = result.data
                    for (let i = 0; i < this.timelineItems.length; i++) {
                        this.timelineItems[i].date = this.convertDate(this.timelineItems[i].date)
                        this.timelineItems[i].section = this.capitalize(this.timelineItems[i].section)
                        this.timelineItems[i].name = this.capitalize(this.timelineItems[i].name)
                    }
                    console.log('success')
                })
                .catch((err) => {
                    console.log(err)
                })
            axios.post('http://127.0.0.1:5000/getFavorites')
                .then((result) => {
                    console.log(result.data)
                    this.recommendationsList = result.data
                    for (let i = 0; i < this.recommendationsList.length; i++) {
                        this.recommendationsList[i].name = this.capitalize(this.recommendationsList[i].name)
                        this.recommendationsList[i].subtitle = this.convertDate(this.recommendationsList[i].subtitle)
                    }
                    console.log('success')
                })
                .catch((err) => {
                    console.log(err)
                })
            this.getTimelineWidth()
        }
    }
</script>