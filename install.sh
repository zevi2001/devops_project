#!/bin/bash

declare -a objects=(
    "store mongodb ./store/deployment"
    "oms mongodb ./OMS/deployment"
    "erp pgsql ./ERP/deployment"
    "banner mongodb ./banners/deployment"
)

# Install the manifest found in the specified path
files=("front-deployment.yaml" "back-deployment.yaml" "configMap.yaml" "secretes.yaml" "front-service.yaml" "back-service.yaml")

for obj in "${objects[@]}"; do
    # Splitting the string into three different variables using commas
    IFS=' ' read -r -a fields <<< "$obj"
    NAMESPACE=${fields[0]}
    DB_TYPE=${fields[1]}
    MANIFEST_PATH=${fields[2]}

    echo "installing: NAMESPACE: $NAMESPACE, DB_TYPE: $DB_TYPE, MANIFEST_PATH: $MANIFEST_PATH"

    # Checking and installing the namespace
    if [[ ! -z "$NAMESPACE" ]]; then
        if kubectl get namespace "$NAMESPACE" &> /dev/null; then
            kubectl create namespace "$NAMESPACE"
        fi
    fi

    if [[ ! -z "$MANIFEST_PATH" ]]; then
        for file in "${files[@]}"; do
            if [ -f "$MANIFEST_PATH/$file" ]; then
                kubectl apply -f "$MANIFEST_PATH/$file" -n "$NAMESPACE"
            else
                echo "$file not found in $MANIFEST_PATH"
            fi
        done
    else
        echo "No manifest path specified"
    fi

    # Testing and installing the service externalName to the service from the manifest
    SERVICE_NAME=$(kubectl get service -n "$NAMESPACE" -o=jsonpath='{.items[0].metadata.name}')

    if [[ ! -z "$SERVICE_NAME" ]]; then
        kubectl apply -n default -f - <<EOF
            apiVersion: v1
            kind: Service
            metadata:
            name: $SERVICE_NAME-external-service
            namespace: default
            spec:
            type: ExternalName
            externalName: $SERVICE_NAME
EOF
    else
        echo "No service found in the specified namespace"
    fi
    # Validate MongoDB repository
    if helm repo list | grep -q "bitnami"; then
        echo "Bitnami repository for MongoDB already exists"
    else
        # Add MongoDB Helm repository
        helm repo add bitnami https://charts.bitnami.com/bitnami
        echo "Bitnami repository for MongoDB added"
    fi

    # Validate PostgreSQL repository
    if helm repo list | grep -q "postgresql"; then
        echo "PostgreSQL repository already exists"
    else
        # Add PostgreSQL Helm repository
        helm repo add bitnami https://charts.bitnami.com/bitnami
        echo "PostgreSQL repository added"
    fi
    # Installing the requested DB (mongodb or pgsql)
    if [[ "$DB_TYPE" == "mongodb" ]]; then
        helm install mongodb bitnami/mongodb -f "$MANIFIST_PATH/mdb_values.yaml -n $NAMESPACE"
    elif [[ "$DB_TYPE" == "pgsql" ]]; then
        helm install postgresql bitnami/postgresql -f "$MANIFIST_PATH/pg_values.yaml -n $NAMESPACE"
    elif [[ "$DB_TYPE" == "mongodb_pgsql" ]]; then
        helm install pgsql bitnami/postgresql -f "$MANIFIST_PATH/pg_values.yaml -n $NAMESPACE"
        helm install mongodb bitnami/mongodb -f "$MANIFIST_PATH/mdb_values.yaml -n $NAMESPACE"
    else
        echo "Please specify the type of DB to install: mongodb or pgsql"
    fi
done

# Check if the repository exists
if helm repo list | grep -q "ingress-nginx"; then
    echo "Ingress Nginx repository already exists"
else
    # Add the Ingress Nginx Helm repository
    helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
    echo "Ingress Nginx repository added"
fi

# Install Ingress Nginx controller in the 'ingress' namespace
helm install -n ingress --create-namespace controller ingress-nginx/ingress-nginx --set controller.ingressClassResource.default=true