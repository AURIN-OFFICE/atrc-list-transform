#!/bin/bash

docker build -t list-transform .

mkdir data
mkdir data/inputs
mkdir data/outputs
cp test_inputs/* data/inputs/

docker run \
    -e MODE='head' \
    --mount type=bind,source="$(pwd)"/data/inputs,target=/data/inputs \
    --mount type=bind,source="$(pwd)"/data/outputs,target=/data/outputs \
    list-transform