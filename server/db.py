from mongoengine import *

db_uri = "mongodb+srv://xinyanglu664:PuWxicgAcLILDAck@tutorialarticles.zotql.mongodb.net/TutorialArticles?retryWrites=true&w=majority"
connect(host=db_uri)

info = {"git": ["other", "Git: Version Control Software"]
        }


class TutorialPart(EmbeddedDocument):
    group = StringField(required=True, choices=("paragraph", "header", "image", "command"))
    text = StringField(required=True)
    description = StringField(required=False)
    showDetails = BooleanField(required=False, default=False)
    number = IntField(required=False)


def create_tutorial_part(group, text, description, showDetails, number):
    part = TutorialPart(group=group, text=text)
    if description:
        part.description = description
    if showDetails is not None:
        part.showDetails = showDetails
    if number:
        part.number = number

    return part


class Tutorial(EmbeddedDocument):
    title = StringField(required=True)
    name = StringField(required=True)
    subtitle = StringField(required=False)
    date = StringField(required=True)
    description = StringField(required=True)
    favorite = BooleanField(required=True, default=False)
    tutorialParts = EmbeddedDocumentListField(required=True, document_type=TutorialPart)


def create_tutorial(title, subtitle, date, favorite, tutorialParts):
    tutorial = Tutorial(title=title, date=date, favorite=favorite, tutorialParts=tutorialParts)
    if subtitle:
        tutorial.subtitle = subtitle

    return tutorial


class Section(Document):
    name = StringField(required=True)
    items = EmbeddedDocumentListField(required=True, document_type=Tutorial)


def create_section(name, items):
    section = Section(name=name, items=items)
    return section


def get_tutorial(name):
    if name in info.keys():
        for section in Section.objects:
            if section.name == info[name][0]:
                for tutorial in section.items:
                    if tutorial.title == info[name][1]:
                        return tutorial.to_mongo().to_dict()
    else:
        return "404"


def get_all_tutorials():
    sections = []
    for s in Section.objects:
        items = []
        for t in s.items:
            items.append({'name': t.name, 'active': ""})
        sections.append({'name': s.name, 'items': items, 'active': "", 'display': False})
        
    return sections


def get_favorites():
    tutorials = []
    for s in Section.objects:
        for t in s.items:
            if t.favorite == True:
                tutorials.append({"name": t.name, "subtitle": t.date})

    return tutorials


def get_recent_posts():
    posts = []
    for s in Section.objects:
        for t in s.items:
            posts.append({'date': t.date, 'name': t.name, 'section': s.name,
                          'description': t.description})

    return sorted(posts, key=lambda k: k['date'])
