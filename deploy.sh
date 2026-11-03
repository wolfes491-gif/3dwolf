echo "Switching to branch master"
git checkout master

echo "Building app ...."
npm run build

echo "Deploying files to server..."
scp -r * es491@192.168.0.86:/var/www/192.168.0.86/

echo "Done!"