import subprocess

class Node:
    def __init__(self, name, next_node):
        self.name = name
        self.next = next_node

    def set_next(self, node):
        self.next = node




