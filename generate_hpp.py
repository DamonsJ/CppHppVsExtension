import os

if __name__ == '__main__':
    with open("hpp_template.hpp","r") as f:
        content = f.read()
        print(type(content))
        print(content)
        replaced = content.replace("TEMPLATE", "${fileName}")
        print(repr(replaced))

