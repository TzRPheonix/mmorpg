include .env

SSH_USER=appdeploy
SSH_HOST=team2.bettercalldave.io
SSH_PORT=222
APP_FILES_FRONT=./FrontEnd/dist/*

build:
	cd FrontEnd/ && npm i && CI=false npm run build

push: build
	ssh -o StrictHostKeyChecking=no -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "rm -rf $(APP_PATH_FRONT)/* && mkdir -p $(APP_PATH_FRONT)"
	scp -o StrictHostKeyChecking=no -P $(SSH_PORT) -r $(APP_FILES_FRONT) $(SSH_USER)@$(SSH_HOST):$(APP_PATH_FRONT)