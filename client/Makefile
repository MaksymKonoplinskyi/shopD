export APP_NAME=c
run:
	docker run --rm --name cc -p 3000:5000 -d c
build-docker:
	docker run --rm --name cc -p 3000:5000 -d ${APP_NAME}
run-dev:
	docker	run	-d	-p	3000:3000 -v "H:\web\2024\docker\logs-app:/app" -v /app/node_modukes -v logs:/app/data	--rm	--name	logsapp	logsapp:volumes
stop:
	docker stop logsapp