npm run build

connStr='DefaultEndpointsProtocol=https;AccountName=qwirkle;AccountKey=Jo0xXlvPql6KKA7yE7R8keIE0M5QzpC/qJJNw8BqwhjLlkQTUeT3WW0CAfnAb277XqSysjm5R/bG+ASt2Txgug==;EndpointSuffix=core.windows.net'

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