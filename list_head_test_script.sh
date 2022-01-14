#!/bin/bash

docker build -t list-transform .

docker run \
    -e INPUT_ARRAY='[1,2,3]' \
    -e MODE='head' \
    --mount type=bind,source="$(pwd)"/data/outputs,target=/data/outputs \
    list-transform