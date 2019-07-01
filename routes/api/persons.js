const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const persons = require('../../Persons');

router.get('/',  (req, res) =>
{
	res.json(persons);
});


router.get('/:id',  (req, res) =>
{
	const found = persons.some(person => person.id
		=== parseInt(req.params.id));

	if (found)
	{
		res.json(persons.filter(person => person.id ===
			parseInt(req.params.id)));
	}
	else
	{
		res.status(400).json({msg:`Nope! not found`});
	}
});

router.post('/',  (req, res) =>
{
	const newMember = {
		id: uuid.v4(),
		fullname: req.body.fullname,
		accountType: req.body.accountType,
		status: "active"
	}

	console.log("here");
	if(!newMember.fullname || !newMember.accountType)
	{
		return res.status(400).json({msg: 'Include full name'})
	}

	persons.push(newMember);
	res.json(persons);
});

router.put('/:id',  (req, res) =>
{
	const found = persons.some(person => person.id
		=== parseInt(req.params.id));

	if (found)
	{
		const updateperson = req.body;
		persons.forEach(person => {
			if (person.id === parseInt(req.params.id))
			{
				person.fullname = updateperson.fullname ? 
					req.body.fullname : person.fullname;
				person.accountType = updateperson.accountType
				? req.body.accountType : person.accountType;

				res.json({msg: "Person update: ", person});
			}
		});
	}
	else
	{
		res.status(400).json({msg:`Nope! not found`});
	}
});


router.delete('/:id',  (req, res) =>
{
	const found = persons.some(person => person.id
		=== parseInt(req.params.id));

	if (found)
	{
		res.json({msg: 'Member deleted' , members: persons.filter(person => person.id !==
			parseInt(req.params.id))
		});
	}
	else
	{
		res.status(400).json({msg:`Nope! not found`});
	}
});


module.exports = router;
