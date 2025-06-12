#!/usr/bin/bash

url=$1
#echo "this is da url to clone $url"
echo "Cloning $url"

$(git clone --single-branch -b playground $url ~/.config/yogit)
echo "---Clone successful---" 
echo "Building executable..."
#$(cd ~/test_clone_ci && go build main.go)
$(cd ~/.config/yogit && go build main.go)

#cd ~/test_clone_ci
cd ~/.config/yogit
echo ""

#echo "changing directory"

#echo "cd ~/test_clone_ci"

#exec_path=$HOME/test_clone_ci/main.exe
echo "Building execution path"
exec_path=$HOME/.config/yogit/main.exe

config="alias yogit=$exec_path"
echo "---Writing to .bashrc---"
echo $config

echo $config >> ~/.bashrc
echo "Sourcing .bashrc"
source ~/.bashrc

#echo "check .bashrc file to confirm alias is successfully configured as yogit2"
echo "---Confirm setup process was successful---"
cat -n ~/.bashrc

