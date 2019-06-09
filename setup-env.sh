#!/bin/bash

echo $BASE_API_URL >> .env
echo $BASE_API_URL_SERVERSIDE >> .env
echo $LOCAL_API >> .env
echo $IS_HTTPS >> .env
echo $WEBSOCKET_URL >> .env
echo $AUTH_TOKEN_COOKIE_KEY >> .env
echo $AUTH_TOKEN_COOKIE_EXPIRY_DAYS >> .env
echo $GOOGLE_RECAPTCHA_SITE_KEY >> .env
echo $RECAPTCHA_REQUIRED >> .env
echo $DEBUG >> .env