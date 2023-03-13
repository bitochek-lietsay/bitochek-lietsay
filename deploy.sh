git add .
git commit -m "$(git log '--format=format:%H' master -1)"
git subtree push --prefix=.output/public origin index --h