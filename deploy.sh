#1/bin/bash

set -Eo pipefail

# constants
STAGING="staging"
PRODUCTION="production"

print_building(){
  echo
  echo "============================================"
  echo "  building a new bundle"
  echo "============================================"
  echo
}

print_deploying(){
  echo
  echo "============================================="
  echo "  deploying to $1"
  echo "============================================="
  echo
}

print_success(){
  echo
  echo "============================================="
  echo "  sucessfully deployed to $1!"
  echo "============================================="
  echo
}

# deploy to stating
deploy_staging(){
  # show a message detailing what we are doing
  print_building
  # build
  npm run build
  # show a message detailing what we are doing
  print_deploying $STAGING
  # deploy build
  aws s3 sync build/ s3://staging.blackjacktrainer.info
  # this should only print on sucess due to -E flag
  print_success $STAGING
}

# deploy to production
deploy_prod(){
  # show a message detailing what we are doing
  print_building
  # todo: run tests and exit if tests fail

  # build a production build
  npm run build
  # show a message detailing what we are doing
  print_deploying $PRODUCTION
  # deploy production build
  aws s3 sync build/ s3://blackjacktrainer.info
  # this should only print on sucess due to -E flag
  print_success $PRODUCTION
}

# check for aws client
if ! which aws &> /dev/null
then
    echo "it appears the aws client is not installed, you should do that before running this script"
    exit 1
fi

# check an option was passed
if ! [ $1 ]
then
    echo "requires an option to be passed (production for production, staging for staging)"
    exit 1
fi

# determine where to deploy if a valid option was passed
case $1 in
  $STAGING)
    deploy_staging
    ;;
  $PRODUCTION)
    deploy_prod
    ;;
  *)
    echo "unknown option $1.  Type production for production, staging for staging"
    exit 1
    ;;
esac

