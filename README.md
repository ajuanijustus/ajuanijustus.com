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

A bunch of vulnerabilities:
As a reminder, because your portfolio is compiled locally and hosted as a collection of static files on GitHub Pages, these packages never run on a live server. They cannot expose you or your visitors to security threats. They are just background noise from an older version of Create React App, and keeping them there is the cost of keeping your build system stable!

Guide for myself since I'm gonna be just as lost, if not more when I look at this codebase anode decade later.

git commit -m "stable updated baseline before research pivot restructuring"  --no-verify 
^to skip commit hooks