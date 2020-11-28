#!/bin/sh
kubectl delete namespace dlrg
kubectl create namespace dlrg
helm install praecura ./praecura/ --namespace praecura --debug