Notes From Jordan:

Create MySQL database named: `jordan_polling`
Run `mysql -u root`
  `mysql> create database jordan_polling;`
  `mysql> exit`
run `npm install`
run `grunt`

go to localhost:3000 in Chrome or an inferior browser if you want

If you want to become an admin user, go to `http://localhost:3000/users/admin?jordan=rules`
If you want to remove admin previledges, go to `http://localhost:3000/users/unadmin?jordan=rules`
Make sure it is those url's, without the `#!`, and don't forget the params/ It's a minor security thing, obviously nothing special, I would want to set that manually not automate it. But it also helps you remember who rules ;)

If you don't have grunt on your computer, either install it via: `npm install -g grunt-cli`
Or run `node app.js` from the folder on your console/terminal