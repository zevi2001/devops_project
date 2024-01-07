<!-- install -->
helm install my-mongodb bitnami/mongodb --version 14.3.0 -f values.yaml

docker buildx build  -t simhastern/banner-front:0.0.3 --load .
docker push simhastern/banner-back:0.0.3

rm ~/.docker/config.json

docker login -u simhastern -p simhastern docker.io/


simha@DESKTOP:~/ClassFinalProject/Apps/banner/class-6-banner-front$ helm status my-mongodb
NAME: my-mongodb
LAST DEPLOYED: Wed Nov 22 11:39:49 2023
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
CHART NAME: mongodb
CHART VERSION: 14.3.0
APP VERSION: 7.0.3

** Please be patient while the chart is being deployed **

MongoDB&reg; can be accessed on the following DNS name(s) and ports from within your cluster:

    my-mongodb-0.my-mongodb-headless.default.svc.cluster.local:27017
    my-mongodb-1.my-mongodb-headless.default.svc.cluster.local:27017
    my-mongodb-2.my-mongodb-headless.default.svc.cluster.local:27017

To get the root password run:

    export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace default my-mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 -d)

To connect to your database, create a MongoDB&reg; client container:

    kubectl run --namespace default my-mongodb-client --rm --tty -i --restart='Never' --env="MONGODB_ROOT_PASSWORD=$MONGODB_ROOT_PASSWORD" --image docker.io/bitnami/mongodb:7.0.3-debian-11-r6 --command -- bash

Then, run the following command:
    mongosh admin --host "my-mongodb-0.my-mongodb-headless.default.svc.cluster.local:27017,my-mongodb-1.my-mongodb-headless.default.svc.cluster.local:27017,my-mongodb-2.my-mongodb-headless.default.svc.cluster.local:27017" --authenticationDatabase admin -u $MONGODB_ROOT_USER -p $MONGODB_ROOT_PASSWORD