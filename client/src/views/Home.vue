<template>
    <div>
        <v-img
            v-resize="resize"
            :width="windowWidth"
            :height="windowHeight"
            src="@/assets/calabogie.jpg"
        >
            <v-row
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
        <span class="text-sm-caption">Developer Fred Liu staring out into the vast expanse of hills at Eagle's Nest, Calabogie</span>
        <v-container class="mt-4">
            <v-row class="text-center">
                <v-col
                    v-for="(card, index1) in textInformation"
                    :key="index1"
                    col="4"
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
    </div>
</template>

<script>
    import QACard from "@/components/QACard.vue"
    export default {
        name: 'Home',
        data: () => {
            return {
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
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
                ]
            }
        },
        components: {
            QACard,
        },
        methods: {
            resize: function() {
                this.windowWidth = window.innerWidth
                this.windowHeight = window.innerHeight
            }
        }
    }
</script>