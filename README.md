# Bring application to live:

git clone https://github.com/volodymyr-volynets/docupet-symfony-code-test-project.git

composer install

php bin/console make:migration
php bin/console doctrine:migrations:migrate

npm install

npm run dev

php bin/console tailwind:build

symfony server:start

Navigate to http://127.0.0.1:8000/pet


#---Other-Commands-----------------------------------------------------------------------------//

## install framework
Install with brew:
brew install symfony-cli/tap/symfony-cli

Start service:
brew services start symfony-cli/tap/symfony-cli

## install TWIG
composer require symfony/twig-bundle

## install tailwind
composer require symfony/webpack-encore-bundle

## create controller
symfony console make:controller PetController

 created: src/Controller/PetController.php
 created: templates/pet/index.html.twig
 created: tests/Controller/PetControllerTest.php

## install orm
composer require symfony/orm-pack
composer require --dev symfony/maker-bundle

.env:
DATABASE_URL="sqlite:///%kernel.project_dir%/var/data_%kernel.environment%.db"

php bin/console doctrine:database:create

SQLite db in:
/Users/Development/domains/symfony-app-v2/var/data_dev.db

## create model
php bin/console make:entity

## run migration
php bin/console make:migration
php bin/console doctrine:migrations:migrate

## add tailwind
composer require symfonycasts/tailwind-bundle
php bin/console tailwind:init

php bin/console tailwind:build --watch

## install react
composer require symfony/ux-react

npm install -D @babel/preset-react --force
npm install -D @babel/preset-react --force

## run application
symfony server:start

