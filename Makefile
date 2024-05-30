include .env

SSH_USER=appdeploy
SSH_HOST=team2.bettercalldave.io
SSH_PORT=222
APP_PATH_FRONT=/opt/mmorpg-front
APP_PATH_BACK=/opt/mmorpg-back
APP_FILES_FRONT=./FrontEnd/build/*
APP_FILES_BACK=./BackEnd/*


build:
	cd FrontEnd/ && npm i && CI=false npm run build

deploy: build
	ssh -o StrictHostKeyChecking=no -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "rm -rf $(APP_PATH_FRONT) && mkdir -p $(APP_PATH_FRONT)"
	scp -o StrictHostKeyChecking=no -P $(SSH_PORT) -r $(APP_FILES_FRONT) $(SSH_USER)@$(SSH_HOST):$(APP_PATH_FRONT)

push: build
	ssh -o StrictHostKeyChecking=no -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "rm -rf $(APP_PATH_FRONT)/* && mkdir -p $(APP_PATH_FRONT) && rm -rf $(APP_PATH_BACK)/* && mkdir -p $(APP_PATH_BACK)"
	scp -o StrictHostKeyChecking=no -P $(SSH_PORT) -r $(APP_FILES_FRONT) $(SSH_USER)@$(SSH_HOST):$(APP_PATH_FRONT)
	scp -o StrictHostKeyChecking=no -P $(SSH_PORT) -r $(APP_FILES_BACK) $(SSH_USER)@$(SSH_HOST):$(APP_PATH_BACK)
	ssh -o StrictHostKeyChecking=no -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "\
		cd $(APP_PATH_BACK) && \
		echo JWT_SECRET=$(JWT_SECRET) > $(APP_PATH_BACK)/.env && \
		echo DATABASE_URL=$(DATABASE_URL) >> $(APP_PATH_BACK)/.env && \
		cd $(APP_PATH_BACK) && \
		npm i && \
		sudo systemctl restart mmorpg"

debug:
	@echo "ENV=$(ENV)"
	@echo "SSH_PORT=$(SSH_PORT)"
	@echo "APP_FILES_FRONT=$(APP_FILES_FRONT)"
	@echo "SSH_USER=$(SSH_USER)"
	@echo "SSH_HOST=$(SSH_HOST)"
	@echo "APP_PATH_FRONT=$(APP_PATH_FRONT)"
	@echo "APP_PATH_BACK=$(APP_PATH_BACK)"