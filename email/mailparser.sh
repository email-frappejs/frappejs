#!/bin/bash

sudo easy_install pip
pip install mail-parser

mailparser -f main.txt -j > log.json

