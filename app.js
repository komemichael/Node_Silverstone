const http = require('http');
const fs = require('fs');
const path = require('path');
const exp_hbars = require('express-handlebars');
const express = require('express');
const logger = require('./middleware/logger');
const app = express();
const PORT = process.env.PORT || 5555;

app.engine('handlebars', exp_hbars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
 
app.use(express.static(path.join(__dirname, "html")));
app.get('/', (req, res) => {
	res.render('index');
});


app.use('/api/persons', require('./routes/api/persons'));

app.listen(PORT, () => 
	{console.log('server started on port ' + PORT);}
);

