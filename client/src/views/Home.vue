<template>
    <v-container>
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
    </v-container>
</template>

<script>
    import QACard from "@/components/QACard.vue";
    export default {
        name: 'Home',
        data: () => {
            return {
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
        }
    }
</script>