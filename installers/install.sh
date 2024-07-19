#!/bin/sh
NOW_DIR=$(pwd)
JUDGELIGHT_DIR=${NOW_DIR%/installers}

chmod a+x $JUDGELIGHT_DIR/abd
ln -si $JUDGELIGHT_DIR/abd /usr/local/bin

cd $JUDGELIGHT_DIR
echo "Setup docker-compose"
docker compose build
echo "Install complete!"
echo "Thank you for installing! Welcome to Judgelight!"
