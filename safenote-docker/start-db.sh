#!/usr/bin/env bash

docker ps | grep safenotedb &> /dev/null
if [ $? == 0 ]; then
    echo "Ja iniciou"
else
    echo "Parado"
    echo "Iniciando..."
    docker start safenotedb
fi