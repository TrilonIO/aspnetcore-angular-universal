@echo off
pushd
cd %~dp0..\Angular2Spa
npm install
node node_modules/webpack/bin/webpack.js --config webpack.config.vendor.js --env.prod
node node_modules/webpack/bin/webpack.js --env.prod
popd