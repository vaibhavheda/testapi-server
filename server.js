const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");

const app = express();

const db = {
	users: [
		{
			id: "1",
			name: "vai",
			email: "vai@gmail.com",
			pass: "cookies"
		},
		{
			id: "2",
			name: "Sri",
			email: "sri@gmail.com",
			pass: "hello"
		},
		{
			id: "3",
			name: "Aish",
			email: "Aish@gmail.com",
			pass: "hello"
		}
	]
};

app.use(cors());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
// app.use((req, res, next) => {
// 	console.log("hello");
// 	next();
// });
//root
app.get("/", (req, res) => {
	res.json(db.users);
});

app.post("/signin", (req, res) => {
	for (var i = 0; i < db.users.length; i++) {
		if (
			req.body.email === db.users[i].email &&
			req.body.pass === db.users[i].pass
		) {
			res.json(db.users[i]);
		} else res.json("fail");
		console.log(req.body);
	}
});

app.post("/register", (req, res) => {
	const { email, name, pass } = req.body;
	db.users.push({
		id: "5",
		name: name,
		email: email,
		pass: pass
	});
	res.json(db.users[db.users.length - 1]);
	console.log(req.body);
});

app.get("/card/:id", (req, res) => {
	var { id } = req.params;
	var found = false;
	db.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	});
});

app.listen(5000),
	() => {
		console.log("Server Running");
	};

/*
	/  --> root says hello
	/signin --> POST = success/fail
	/register --> POST = user
	/card --> Get = results.
	*/
