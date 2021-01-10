build-all:
	cd frontend && docker build -t ts-frontend-container .
	cd backend && docker build -t ts-backend-container .
	cd backend/db && docker build -t ts-mongo-seed-container .

build-backend:
	cd backend && docker build -t ts-backend-container .

build-frontend:
	cd frontend && docker build -t ts-frontend-container .

build-mongo-seed:
	cd backend/db && docker build -t ts-mongo-seed-container .

run:
	docker-compose up
