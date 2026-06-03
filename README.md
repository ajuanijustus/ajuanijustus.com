# 1. Delete your current node_modules folder
rm -rf node_modules

# 2. Clear out your npm cache to remove any corrupted files
npm cache clean --force

# 3. Do a fresh install based strictly on your package-lock.json
npm ci

OR

# 1. Wipe out everything local again
rm -rf node_modules package-lock.json

# 2. Try a clean install WITHOUT the special flag
npm install