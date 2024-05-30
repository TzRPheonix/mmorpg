include .env

ifndef ENV
ENV=dev
endif

ifeq ($(ENV),dev)
SSH_PORT=221
endif

ifeq ($(ENV),prod)
SSH_PORT=222
endif

push:
    ssh -o StrictHostKeyChecking=no -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "rm -rf $(APP_PATH) && mkdir -p $(APP_PATH)"
    scp -o StrictHostKeyChecking=no -P $(SSH_PORT) -r $(APP_FILES) $(SSH_USER)@$(SSH_HOST):$(APP_PATH)
    ssh -o StrictHostKeyChecking=no -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "cd $(APP_PATH) \
        && echo JWT_SECRET=$(JWT_SECRET) > $(APP_PATH)/.env \
        && echo DATABASE_URL=$(DATABASE_URL) >> $(APP_PATH)/.env \
        && npm i && systemctl restart mmorpg"