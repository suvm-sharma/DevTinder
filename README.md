# DevTinder


    # Deployement
    - Signup on AWS
    - Launch instance
    - icacls 400 <secret>.pem
    - ssh -i "dev-tinder-secret.pem" ubuntu@ec2-13-53-170-164.eu-north-1.compute.amazonaws.com
    - install Node version on ubuntu machine(EC2 Instamce).
    - git clone <HTTPS_URL>
    - Backend
        - Allowed EC2 instance public IP on mongodb server
        - To keep our server running forever in the server
            - PM2 is a daemon process manager that will help you manage and keep your apllication online 24/7
            - sudo npm install pm2 -g
            - pm2 start npm -- start [ To start project ]
            - pm2 logs to check the status of pm2
            - pm2 flush [ to clear the pm2 logs ]
            - pm2 list [ check how many process are started in pm2 manager ]
            - pm2 stop <name of the process> [ to stop the running process ]
            - pm2 delete <name of the process> [ to delete the running process ]
            - pm2 start npm --name "dev-tinder-backend" -- start [ custom name of the process ]
            - config nginx - /etc/nginx/sites-available/default
            - sudo systemctl [ to restart nginx ]
