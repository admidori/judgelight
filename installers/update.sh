#!/bin/sh
(git pull origin master | grep "Already up to date.") &> /dev/null

if [ $? -eq 0 ]; then
    echo "abd: [ERROR] Already up to date."
    exit 0
else
    NOW_DIR=$(pwd)
    JUDGELIGHT_DIR=${NOW_DIR%/installers}
    source $JUDGELIGHT_DIR/.env

    echo "Auto-build update..."
    docker-compose build
    echo ""
    echo "######### Update complete! #########"
    echo "Update complete!"
    echo "Welcome to Auto-build Version:$VERSION!"
    echo "Check release notes -> https://github.com/rp-agota/auto-build/releases/tag/$VERSION"
fi
