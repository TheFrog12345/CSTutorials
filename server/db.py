from mongoengine import *

db_uri = "mongodb+srv://xinyanglu664:PuWxicgAcLILDAck@tutorialarticles.zotql.mongodb.net/TutorialArticles?retryWrites=true&w=majority"
connect(host=db_uri)


class TutorialPart(EmbeddedDocument):
    group = StringField(required=True, choices=("paragraph", "header", "image", "command", "subheader", "list"))
    text = StringField(required=True)
    description = StringField(required=False)
    showDetails = BooleanField(required=False, default=False)
    number = IntField(required=False)


def create_tutorial_part(group, text, description, number):
    part = TutorialPart(group=group, text=text)
    if description:
        part.description = description
    if group == 'image':
        part.showDetails = False
    else:
        part.showDetails = None
    if number:
        part.number = number

    return part


class Tutorial(EmbeddedDocument):
    title = StringField(required=True)
    name = StringField(required=True)
    order = IntField(required=True)
    subtitle = StringField(required=False)
    date = StringField(required=True)
    description = StringField(required=True)
    favorite = BooleanField(required=True, default=False)
    tutorialParts = EmbeddedDocumentListField(required=True, document_type=TutorialPart)


def create_tutorial(title, name, subtitle, date, description, favorite, tutorialParts):
    tutorial = Tutorial(title=title, name=name,date=date, description=description, favorite=favorite, tutorialParts=tutorialParts)
    if subtitle:
        tutorial.subtitle = subtitle

    return tutorial


class Section(Document):
    name = StringField(required=True)
    items = EmbeddedDocumentListField(required=True, document_type=Tutorial)
    order = IntField(required=True)


def create_section(name, items):
    section = Section(name=name, items=items)
    return section


def get_tutorial(name):
    for section in Section.objects:
        for tutorial in section.items:
            if tutorial.name == name:
                return tutorial.to_mongo().to_dict()

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

    return sorted(posts, key=lambda k: k['date'], reverse=True)
