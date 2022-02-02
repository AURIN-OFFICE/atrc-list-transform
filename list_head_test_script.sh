#!/bin/bash

docker build -t list-transform .

mkdir data
mkdir data/inputs
mkdir data/outputs
cp test_inputs/* data/inputs/
cp test_parameters.yaml data/parameters.yaml


docker run \
    --mount type=bind,source="$(pwd)"/data,target=/data \
    list-transform