<template>
    <div v-resize="resize">
        <v-img
            :width="windowWidth"
            :height="windowHeight"
            src="@/assets/home.jpg"
        >
            <v-row
                class="text-center"
                style="height: 100%"
            >
                <v-col
                    cols="10"
                    offset="1"
                    align-self="center"
                >
                    <label class="text-h6 text-sm-h4 text-md-h2 white--text" style="display: block">Learn the fundamentals</label>
                    <br>
                    <label class="text-body-2 text-sm-h6 white--text" style="display: block">Simple tutorials on important coding concepts</label>
                    <br><br><br><br><br>
                </v-col>
            </v-row>
        </v-img>
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
        </v-container>
        <v-container
            class="mt-4 py-4"
            fluid
            :style="{color: '#FFFFFF', backgroundColor: '#2196F3'}"
        >
            <v-row class="text-center">
                <v-col
                    offset-md="1"
                    cols="3"
                >
                    <div
                        style="display: flex; flex-direction: column; justify-content: center; height: 100%;"
                    >
                        <span
                            class="text-sm-h6 text-md-h5 text-lg-h4 font-italic"
                        >Why choose Daily Innovation tutorials?</span>
                    </div>
                </v-col>
                <v-col
                    offset="1"
                    cols="8"
                    md="6"
                >
                    <span
                        class="text-sm-body-2 text-md-body-1"
                    >While there are many tutorials out there that you can use, Daily Innovation tutorials are written by fellow students. This means we have digested the important information and simplified them for you by explaining things the way we understood them! For the most part, we avoid technical terms and use analogies to help you make sense of things.</span>
                </v-col>
            </v-row>
        </v-container>
        <v-container fluid class="mt-8">
            <v-row style="justify-content: center">
                <span class="text-h5 text-sm-h2">Check out our posts!</span>
            </v-row>
            <v-row class="mt-8">
                <RecommendationsBar
                    v-if="windowWidth >= 860"
                    icon="mdi-star"
                    iconColor="yellow"
                    title="Personal Favorites"
                    subtitle="See our list of favorites below!"
                    :listItems="recommendationsList"
                    class="mt-4"
                    style="z-index:2"
                />
                <v-col ref="recents">
                    <ListItems
                        theme="green accent-4"
                        :items="timelineItems"
                        :dense="windowWidth < 700"
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
                        answer: "We want to share our knowledge to inspire future innovators. We believe that learning coding gives you the power to create many great things."
                    }
                ],
                recommendationsList: [],
                timelineItems: []
            }
        },
        methods: {
            resize: function() {
                this.windowWidth = window.innerWidth
                this.windowHeight = window.innerHeight
                if (this.windowWidth <= 600) {
                    this.cardCols = 12
                } else {
                    this.cardCols = 4
                }
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
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
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
        }
    }
</script>