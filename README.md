# mongo_db_react_rails_app: A Simple Rails Crud App With React and MongoDB

I took https://medium.com/quick-code/simple-rails-crud-app-with-react-frontend-using-react-rails-gem-b708b89a9419

https://github.com/nothingisfunny/fruits-crud-react-rails-app

and found it was the best simple introduction to React I've seen, so I cloned it, then replaced SQL with MongoDB.

I also added the ability to add arbitrary new colums to the table, 'articles'.

Install MongoDB from here https://docs.mongodb.com/manual/installation/

Run it by issuing the command

`mongod --config /usr/local/etc/mongod.conf`

In a separate window, run this app by cd-ing into the folder containing it and typing

`bundle`

`npm install`

`rails s`

Then in a browser, navigate to http://localhost:3000

It's pretty obvious what to do after that

There's no pretty CSS - it's just supposed to demo Rails, React and MongoDB
