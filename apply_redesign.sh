#!/bin/bash

set -e

echo "AxivoraX redesign deployment started"

DATE=$(date +"%Y-%m-%d_%H-%M-%S")

mkdir -p deployment_logs

cp index.html backup/redesign_phase1_before_modify/index_before_deploy_$DATE.html
cp style.css backup/redesign_phase1_before_modify/style_before_deploy_$DATE.css

cp index_redesign_draft.html index.html
cp style_redesign_draft.css style.css

echo "Deployment completed: $DATE" > deployment_logs/redesign_$DATE.log

echo "AxivoraX redesign deployment finished"
