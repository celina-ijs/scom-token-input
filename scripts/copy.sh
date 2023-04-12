rm -rf src/scom-token-modal &&
rm -rf src/scom-token-list &&
mkdir src/scom-token-modal &&
mkdir src/scom-token-list &&
cp -r node_modules/@scom/scom-token-modal/src/* src/scom-token-modal &&
cp -r node_modules/@scom/scom-token-list/src/* src/scom-token-list
if [ ! -d "src/img" ]; then mkdir src/img; fi
cp -r src/scom-token-list/img/* src/img &&
rm -rf src/scom-token-modal/img
rm -rf src/scom-token-list/img