docker-compose:
	docker image prune -a -f
	docker-compose down
	docker-compose up --build