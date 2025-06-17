# DevTinder


    # Deployement
    - Signup on AWS
    - Launch instance
    - icacls 400 <secret>.pem
    - ssh -i "dev-tinder-secret.pem" ubuntu@ec2-13-53-170-164.eu-north-1.compute.amazonaws.com
    - install Node version on ubuntu machine(EC2 Instamce).
    - git clone <HTTPS_URL>
    - Frontend
        - npm install -> dependecies install
        - npm run build
        - sudo apt update
        - sudo apt install nginx [ install nigix bcz it provide us https server ]
        - sudo systemctl start nginx [ start nigix on ubuntu server]
        - sudo systemctl enable nginx
        - Copy code from dist(build files) to /var/www/html/
        - sudo scp -r dist/* /var/www/html/ [ scp for copying all the files from dist folder to /var/www/html/ ]
        - Enable port :80 of your instance

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
            - 


- TO exit from AWS mahine
    - exit
