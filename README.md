## Docker

 - [Uninstall old docker](https://docs.docker.com/engine/install/ubuntu/#uninstall-old-versions) `sudo apt-get remove docker docker-engine docker.io containerd runc`
 - See the version `docker version`
 - [Uninstall properly](https://docs.docker.com/engine/install/ubuntu/#upgrade-docker-after-using-the-convenience-script) `sudo apt-get purge docker-ce docker-ce-cli containerd.io`  && `sudo rm -rf /var/lib/docker` && `sudo rm -rf /var/lib/containerd`

#### [Install docker once again](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)
 - **Setup repo** [guide](https://linuxhint.com/install_docker_linux_mint/)
 - Remove unwanted packages `sudo apt autoremove`
 - update linux system `sudo apt update`
 - setup repo `sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release`
 - Add Docker official GPG 
 for linux mint
 ```
 sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu
 bionic stable"
 ``` 
 for ubuntu 
 ```curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg```

 - Use the following command to set up the stable repository. ```echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null```


#### Docker commands

 - Check version client and server `sudo docker version`
 - 