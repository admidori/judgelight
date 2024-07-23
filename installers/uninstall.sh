#!/bin/sh
NOW_DIR=$(pwd)
JUDGELIGHT_DIR=${NOW_DIR%/installers}

sudo unlink /usr/local/bin/abd

cd $JUDGELIGHT_DIR
echo "Delete docker cache"
docker-compose down --rmi all --volumes --remove-orphans
echo "Uninstall complete!"
echo "Thank you for using! Good-bye!"
