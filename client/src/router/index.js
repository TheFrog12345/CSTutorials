import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

let allTutorials = {
    git: {
        title: "Git: Version Control Software",
        subtitle: "The basics",
        tutorialParts: [
            {
                group: 'header',
                text: `What is git?`,
                number: 1
            },
            {
                group: 'paragraph',
                text: `Git is a version control software that keeps track of changes in a project. Git provides many benefits; mainly it combines changes from all collaborators when working on a group project and it can revert changes if it is causing problems. For example, if two people edit the same file in a project from their respective computers, git can merge and save both changes onto the file. Sometimes certain changes could prevent a project from working. Git can fix this problem by rolling back to a previous version of a project without the faulty change.`
            },
            {
                group: 'paragraph',
                text: `As a result, git should be used in any large project or any project with more than one collaborator. It is also good practice to use git in any project.`
            },
            {
                group: 'paragraph',
                text: `This tutorial will teach you the basics of git from the command line.`
            },
            {
                group: 'header',
                text: `Setting up`,
                number: 2
            },
            {
                group: 'paragraph',
                text: `When using git to collaborate with other users, you will have to tell git your information so it can display who is making the changes:`
            },
            {
                group: 'command',
                text: `git config --global user.name "your name"`
            },
            {
                group: 'command',
                text: `git config --global user.email "your email"`
            },
            {
                group: 'command',
                text: `git config --list`
            },
            {
                group: 'paragraph',
                text: `First, when using git, you must create a git repository by running the following command in your project's root folder:`
            },
            {
                group: 'command',
                text: `git init`
            },
            {
                group: 'paragraph',
                text: `This activates git functionality for your project.`
            },
            {
                group: 'header',
                text: `Using git to track changes`,
                number: 3
            },
        ]
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/tutorials/:tutorialName',
        name: 'Tutorial',
        // lazy loading
        component: () => import('../views/Tutorial.vue'),
        props: {
            title: allTutorials[window.location.pathname.split('/')[2]]['title'],
            subtitle: allTutorials[window.location.pathname.split('/')[2]]['subtitle'],
            tutorialParts: allTutorials[window.location.pathname.split('/')[2]]['tutorialParts']
        }
    },
    {
        path: '/contact',
        name: 'Contact',
        // lazy loading
        component: () => import('../views/Contact.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router