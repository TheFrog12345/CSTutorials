from mongoengine import *
import db_uri

connect(host=db_uri.uri)


class TutorialPart(EmbeddedDocument):
    group = StringField(required=True, choices=("paragraph", "header", "image", "command", "subheader", "list", "table"))
    customStyles = StringField(required=False)
    text = StringField(required=True)
    description = StringField(required=False)
    showDetails = BooleanField(required=False, default=False)
    number = IntField(required=False)


def create_tutorial_part(group, text, description, number, customStyles):
    part = TutorialPart(group=group, text=text)
    if description:
        part.description = description
    if group == 'image':
        part.showDetails = False
    else:
        part.showDetails = None
    if number:
        part.number = number
    if customStyles:
        part.customStyles = customStyles

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


def create_tutorial(title, name, subtitle, date, description, favorite, tutorialParts, order):
    tutorial = Tutorial(title=title, name=name,date=date, description=description, favorite=favorite, tutorialParts=tutorialParts,order=order)
    if subtitle:
        tutorial.subtitle = subtitle

    return tutorial


class Section(Document):
    name = StringField(required=True)
    items = EmbeddedDocumentListField(required=True, document_type=Tutorial)
    order = IntField(required=True)


def create_section(name, items, order):
    section = Section(name=name, items=items,order=order)
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
            items.append({'name': t.name, 'order': t.order, 'active': ""})
        sections.append({'name': s.name, 'items': sorted(items, key=lambda k: k['order']), 'order': s.order, 'active': "", 'display': False})
        
    return sorted(sections, key=lambda k: k['order'])


def get_favorites():
    tutorials = []
    for s in Section.objects:
        for t in s.items:
            if t.favorite == True:
                tutorials.append({"name": t.name, "subtitle": t.date})

    return sorted(tutorials, key=lambda k: k['subtitle'], reverse=True)


def get_recent_posts():
    posts = []
    for s in Section.objects:
        for t in s.items:
            posts.append({'date': t.date, 'name': t.name, 'section': s.name,
                          'description': t.description})

    return sorted(posts, key=lambda k: k['date'], reverse=True)
