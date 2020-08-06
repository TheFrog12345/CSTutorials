<template>
    <div class="mt-14">
        <v-container>
            <v-row class="text-center">
                <v-col>
                    <v-list>
                        <v-list-item>
                            <v-list-item-title class="text-h5 text-sm-h4">
                                Meet the developers
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
            <v-divider class="mt-4 mb-8"/>
            <PersonalProfile
                v-for="(contributor, index) in contributors"
                :key="index"
                :photo="contributor.photo"
                :name="contributor.name"
                :role="contributor.role"
                :description="contributor.description"
                :contactIcons="contributor.contactIcons"
                class="mt-8"
            />
            <v-divider class="mt-8 mb-8"/>
            <span class="text-h6" v-html="'We would like to express a special thank you to <a target=_blank href=https://www.linkedin.com/in/frank-liu-2b82b5179/>Frank Liu</a> for having taught both of us data structures!'"></span>
        </v-container>
    </div>
</template>

<script>
    import PersonalProfile from "@/components/PersonalProfile.vue"
    export default {
        name: "Contact",
        components: {
            PersonalProfile
        },
        data: () => {
            return {
                contributors: [
                    {
                        photo: "fred.jpg",
                        name: 'Fred Liu',
                        role: 'Website UI designer and frontend developer. Tutorial writer.',
                        description: [
                            `
                                Hello! My name is Fred Liu and I'm going into my first year at the University of Waterloo for a Bachelor of Computer Science.
                                I'm very passionate about computer science, knowing that I can make cool, entertaining or beneficial apps from just my laptop.
                                I hope to make a positive impact using my skills on technology!
                            `,
                            `
                                When I'm not programming, I play sports, mainly racket sports.
                                I also enjoy listening to music and playing the piano.
                                Please feel free to contact me anytime!
                            `
                        ],
                        contactIcons: [
                            {
                                icon: 'mdi-github',
                                info: 'TheFrog12345',
                                link: 'https://github.com/TheFrog12345'
                            },
                            {
                                icon: 'mdi-email',
                                info: 'fredliu876@gmail.com',
                                link: 'mailto:fredliu876@gmail.com'
                            },
                            {
                                icon: 'mdi-linkedin',
                                info: 'Fred Liu',
                                link: 'https://ca.linkedin.com/in/fred-liu-a457a518a'
                            }
                        ]
                    },
                    {
                        photo: "yang.png",
                        name: 'Yang Lu',
                        role: 'Website UI designer and backend developer. Tutorial writer.',
                        description: [
                            `Hi there! My name is Yang Lu and I’ll be starting my first year of Computer Engineering at the University of Waterloo in September. I’ve always been passionate about building things and problem-solving and seeing that computer science can be used as a tool to drive my passion, it greatly motivates me to learn more about it. I will use my skills in engineering and computer science to solve problems around me and make the world a better place.`,
                            `In my free time, you can find me playing chess online, relaxing with some video games, or messing around on the piano, among other things. Contact me anytime, I’ll be happy to hear from you!`
                        ],
                        contactIcons: [
                            {
                                icon: 'mdi-github',
                                info: 'xinyanglu',
                                link: 'https://github.com/xinyanglu'
                            },
                            {
                                icon: 'mdi-email',
                                info: 'xinyanglu664@gmail.com',
                                link: 'mailto:xinyanglu664@gmail.com'
                            },
                            {
                                icon: 'mdi-linkedin',
                                info: 'Yang Lu',
                                link: 'https://www.linkedin.com/in/yang-lu-36b9281ab'
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>