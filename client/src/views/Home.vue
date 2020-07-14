<template>
    <div>
        <v-img
            v-resize="resize"
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
                    <label class="text-sm-h2 white--text" style="display: block">Coding is a freedom</label>
                    <br>
                    <label class="text-sm-h6 white--text" style="display: block">Learn about this freedom of design</label>
                    <br>
                    <br>
                    <br>
                </v-col>
            </v-row>
        </v-img>
        <v-row style="justify-content: center">
            <span class="text-subtitle-1">Developer Fred Liu staring out into the vast expanse of hills at Eagle's Nest, Calabogie</span>
        </v-row>
        <v-container class="mt-4">
            <v-row class="text-center">
                <v-col
                    v-resize="checkNumCols"
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
                <span class="text-sm-h2">Check out our posts!</span>
            </v-row>
            <v-row class="mt-8">
                <RecommendationsBar
                    icon="mdi-star"
                    iconColor="yellow"
                    title="Personal Favorites"
                    subtitle="See our list of favorites below!"
                    :listItems="recommendationsList"
                    class="mt-4"
                />
                <v-col>
                    <ListItems
                        theme="green accent-4"
                        :items="timelineItems"
                    />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
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
                        answer: "We are two developers who are passionate about coding. Read more about us in the contact us page! We would love to hear from you."
                    },
                    {
                        question: "What",
                        answer: "This is a website containing many computer science tutorials, written so that those with little experience can understand. Check the menu for available tutorials!"
                    },
                    {
                        question: "Why",
                        answer: "Here at Daily Innovation, we want to share our knowledge to educate and inspire future innovators"
                    }
                ],
                recommendationsList: [
                    {
                        title: "Set",
                        subtitle: "July 2 2020",
                        link: "about"
                    },
                    {
                        title: "Dictionary",
                        subtitle: "July 3 2020",
                        link: "about"
                    }
                ],
                timelineItems: [
                    {
                        date: "July 3 2020",
                        title: "Dictionary",
                        subtitle: "Data Structures",
                        description: "Dictionaries are a powerful tool"
                    },
                    {
                        date: "July 1 2020",
                        title: "LinkedLists",
                        subtitle: "Data Structures",
                        description: "Linked lists are a nodal way to show an array"
                    }
                ]
            }
        },
        methods: {
            resize: function() {
                this.windowWidth = window.innerWidth
                this.windowHeight = window.innerHeight
            },
            checkNumCols: function() {
                if (this.windowWidth <= 600) {
                    this.cardCols = 12
                } else {
                    this.cardCols = 4
                }
            }
        }
    }
</script>