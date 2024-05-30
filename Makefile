include .env

SSH_USER=appdeploy
SSH_HOST=team2.bettercalldave.io
SSH_PORT=222
APP_FILES_FRONT=./FrontEnd/build/*

build:
	cd FrontEnd/ && npm i && CI=false npm run build

deploy: build
	ssh -o StrictHostKeyChecking=no -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "rm -rf $(APP_PATH) && mkdir -p $(APP_PATH_FRONT)"
	scp -o StrictHostKeyChecking=no -P $(SSH_PORT) -r build/* $(SSH_USER)@$(SSH_HOST):$(APP_PATH_FRONT)

push: build
	ssh -o StrictHostKeyChecking=no -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "rm -rf $(APP_PATH_FRONT)/* && mkdir -p $(APP_PATH_FRONT)"
	scp -o StrictHostKeyChecking=no -P $(SSH_PORT) -r $(APP_FILES_FRONT) $(SSH_USER)@$(SSH_HOST):$(APP_PATH_FRONT)
	ssh -o StrictHostKeyChecking=no -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "cd $(APP_PATH_FRONT) \
		&& echo JWT_SECRET=$(JWT_SECRET) > $(APP_PATH_BACK)/.env \
		&& echo DATABASE_URL=$(DATABASE_URL) >> $(APP_PATH_BACK)/.env \
		&& npm i && systemctl restart mmorpg"