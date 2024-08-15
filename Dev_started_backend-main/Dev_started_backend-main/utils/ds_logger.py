import logging


class DSLogger(logging.Logger):
    def __init__(self, name):
        super().__init__(name)

    def print_red(self, message):
        print(f"\033[91m{message}\033[0m")

    def print_blue(self, message):
        print(f"\033[94m{message}\033[0m")

    def print_pink(self, message):
        print(f"\033[95m{message}\033[0m")
