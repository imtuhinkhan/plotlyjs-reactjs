pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
                sh "sudo npm install"
                sh "sudo npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "sudo rm -rf /var/www/samle-react-app"
                sh "sudo cp -r ${WORKSPACE}/react-test/build/ /var/www/samle-react-app/"
            }
        }
    }
}