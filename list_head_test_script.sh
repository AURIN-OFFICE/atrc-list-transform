#!/bin/bash

docker build -t list-transform .

mkdir data
mkdir data/inputs
mkdir data/outputs
cp test_inputs/* data/inputs/
cp test_inputs.yaml data/inputs/inputs.yaml


docker run \
    --mount type=bind,source="$(pwd)"/data/inputs,target=/data/inputs \
    --mount type=bind,source="$(pwd)"/data/outputs,target=/data/outputs \
    list-transform