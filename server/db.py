from mongoengine import *

connect("TutorialArticles", host='localhost', port=27017)


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
    subtitle = StringField(required=False)
    date = StringField(required=True)
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
    if name == "git":
        return Section.objects[0].to_json()


