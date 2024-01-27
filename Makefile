export SERV_NAME=s
# run:
# 	docker run --rm --name ss -p 1337:1337 -d s
# run-e:
# 	docker run --env-file .env --rm --name ss -p 1337:1337 s
# run-dev:
# 	docker	run	-d	-p	3000:3000 -v "H:\web\2024\docker\logs-app:/app" -v /app/node_modukes -v logs:/app/data	--rm	--name	logsapp	logsapp:volumes
# stop:
# 	docker stop logsapp

up:
	docker-compose up -d
down:
	docker-compose down

