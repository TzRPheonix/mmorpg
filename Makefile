include .env

SSH_PORT=221

push:
	ssh -o StrictHostKeyChecking=no -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "rm -rf $(APP_PATH_BACK) && mkdir -p $(APP_PATH_BACK)"
	scp -o StrictHostKeyChecking=no -P $(SSH_PORT) -r $(APP_FILES) $(SSH_USER)@$(SSH_HOST):$(APP_PATH_BACK)
	ssh -o StrictHostKeyChecking=no -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "cd $(APP_PATH_BACK) \
		&& echo JWT_SECRET=$(JWT_SECRET) > $(APP_PATH_BACK)/.env \
		&& echo DATABASE_URL=$(DATABASE_URL) >> $(APP_PATH_BACK)/.env \
		&& npm i && systemctl restart mmorpg"