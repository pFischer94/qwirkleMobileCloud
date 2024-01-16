npm run build

connStr='xxx'

az storage blob delete-batch \
    --account-name qwirkle \
    --connection-string $connStr \
    --source '$web' \

az storage blob upload-batch \
    --account-name qwirkle \
    --connection-string $connStr \
    --destination '$web' \
    --source ./dist \
    --overwrite \
    # --destination-path ./assets \

# az storage blob upload \
#     --account-name qwirkle \
#     --connection-string $connStr \
#     --container-name '$web' \
#     --file ./dist/index.html \
#     --name index.html \
#     --overwrite \
#     --auth-mode key \