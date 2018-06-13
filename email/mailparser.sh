#!/bin/bash

sudo easy_install pip
pip install mail-parser

echo $MM



mailparser -f $MM -j > log.json

rm $MM