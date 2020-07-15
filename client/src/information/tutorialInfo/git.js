let git = {
    title: "Git: Version Control Software",
    subtitle: "The basics",
    tutorialParts: [
        {
            group: 'header',
            text: `What is Git?`,
            number: 1
        },
        {
            group: 'paragraph',
            text: `Git is a version control software that keeps track of changes in a project. Git provides many benefits; most importantly it combines changes from all collaborators when working on a group project and it can revert changes if they are causing problems.`
        },
        {
            group: 'paragraph',
            text: `As a result, Git should be used in any large project or any project with more than one collaborator. It is also good practice to use Git in any project.`
        },
        {
            group: 'paragraph',
            text: `This tutorial will teach you the basics of Git from the command line.`
        },
        {
            group: 'header',
            text: `Setting up`,
            number: 2
        },
        {
            group: 'paragraph',
            text: `When using Git to collaborate with other users, you will have to tell Git your information so it can display who is making the changes:`
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
            text: `git config --list`,
            description: `Returns your configuration values`
        },
        {
            group: 'paragraph',
            text: `First, when using Git, you must create a Git repository using:`
        },
        {
            group: 'command',
            text: `git init`,
            description: `Run inside your project folder`
        },
        {
            group: 'paragraph',
            text: `This activates Git functionalities for the project.`
        },
        {
            group: 'header',
            text: `Using Git to track changes`,
            number: 3
        },
        {
            group: 'paragraph',
            text: `Whenever you create a new file or make changes to an existing file, you must tell Git which changes you want to save. This is called adding changes to the “staging area”, which prepares which changes to save.`
        },
        {
            group: 'paragraph',
            text: `To see the filenames and which changes can be added or have already been added, you can use:`
        },
        {
            group: 'command',
            text: `git status`
        },
        {
            group: 'paragraph',
            text: `To add files and changes:`
        },
        {
            group: 'command',
            text: `git add .`,
            description: `Adds all changes and new files to staging area`
        },
        {
            group: 'command',
            text: `git add filename`,
            description: `Adds filename if it is new or adds changes in filename to the staging area`
        },
        {
            group: 'paragraph',
            text: `If you add an unwanted file or change to the staging area, you can use the following commands to remove it from the staging area:`
        },
        {
            group: 'command',
            text: `git reset`,
            description: `Removes everything from staging area`
        },
        {
            group: 'command',
            text: `git reset filename`,
            description: `Removes filename changes from staging area`
        },
        {
            group: 'paragraph',
            text: `After adding files and changes to the staging file, you make a commit to save them to the Git directory.  When you commit, you must have a commit message stating what changes were made. The message is important if you want to revert a problematic change later. It will help you find which commit you need to revert.`
        },
        {
            group: 'command',
            text: `git commit -m "commit message"`,
            description: `If you use git commit without -m "commit message", Git will automatically open your default code editor for you to type your commit message.`
        },
        {
            group: 'paragraph',
            text: `A good practice is to break your commits into smaller and more specific groups of changes. Instead of adding all and committing all changes at once, add specific files that were relevant to a change and commit them.`
        },
        {
            group: 'header',
            text: `Reverting changes`,
            number: 4
        },
        {
            group: 'paragraph',
            text: `Often, during development, there will be changes that cause problems in a project that was working before the change. As a result, you will want to revert this problematic change. With more specific commit messages, it will be much easier to find the commit that is causing problems. With more specific commits, you will not have to revert as much progress.`
        },
        {
            group: 'paragraph',
            text: `First, you will have to use the following command to show all your commits and their id/hash:`
        },
        {
            group: 'command',
            text: `git log`
        },
        {
            group: 'image',
            text: `gitlog.png`,
            description: `4e99...b508 is the commit id of the commit at the top`
        },
        {
            group: 'paragraph',
            text: `Using these logs, you can have several options:`
        },
        {
            group: 'command',
            text: `git revert id`,
            description: `Revert one specific commit`
        },
        {
            group: 'command',
            text: `git revert --no-commit id..HEAD`,
            description: `Reverts all commits from commit id to the currently used git repository`
        },
        {
            group: 'header',
            text: `Using Git for collaboration`,
            number: 5
        },
        {
            group: 'paragraph',
            text: `When using Git to collaborate with others, you will need to move the Git repository online. This is called a remote repository. A popular website to host remote repositories is GitHub.`
        },
        {
            group: 'paragraph',
            text: `First, you will need to set up this remote repository. After you make a new remote repository on Github or other Git hosting websites, use the following command to connect your project with the repository online:`
        },
        {
            group: 'command',
            text: `git remote add origin URL_of_remote_repository`
        },
        {
            group: 'paragraph',
            text: `If you want to contribute to a project that is already online:`
        },
        {
            group: 'command',
            text: `git clone URL_of_remote_repository`
        },
        {
            group: 'paragraph',
            text: `This will create a copy of the Git repository online into your local file system. It also automatically sets the remote repository as the origin, so it is already linked to the project online.`
        },
        {
            group: 'paragraph',
            text: `When working with a remote repository, you have one more step after you commit. You need to use the following command to push your commited changes to the remote repository:`
        },
        {
            group: 'command',
            text: `git push origin master`
        },
        {
            group: 'paragraph',
            text: `After your changes are pushed online, other collaborators can get these changes onto their local repository by using:`
        },
        {
            group: 'command',
            text: `git pull origin master`,
            description: `Merges all other changes from collaborators with your local project files`
        },
        {
            group: 'paragraph',
            text: `Before you push, you will be required to pull if other collaborators pushed changes to the remote repository that you do not have on your local repository. This is to help you keep your local repository similar to the remote repository. You will not need to commit when you pull because the changes have already been committed by other collaborators.`
        },
        {
            group: 'paragraph',
            text: `Whenever you pull, Git automatically merges your local changes with the changes on the remote repository. However, it can fail, which results in a merge conflict. This happens when two changes are made to the same line. In this case, Git is unable to merge the changes automatically, and you will have to open your code editor to manually choose which change to keep. In this case, you need to commit after solving merge conflicts.`
        },
        {
            group: 'image',
            text: 'mergeconflict.png'
        },
        {
            group: 'paragraph',
            text: `When working with other collaborators, there will also be files that you don’t want Git to track. For example, these would be setting files that vary for each computer. Since the setting files are usually different for each computer, having Git combine the two different settings would cause the settings to be incorrect.`
        },
        {
            group: 'paragraph',
            text: `To tell Git to ignore files that you don't want to be tracked, create a file called .gitignore in the project’s root folder. In the file, you want to put in the names of the files you want Git to ignore. You always want to add and commit changes to your .gitignore files so that Git will know the files you want to be ignored with each commit.`
        }
    ]
}

export default git