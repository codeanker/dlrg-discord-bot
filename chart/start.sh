#!/bin/sh
kubectl delete namespace praecura
kubectl create namespace praecura
helm install praecura ./praecura/ --namespace praecura --debug