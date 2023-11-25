const rrag = require("real-random-address");
rrag.random(); // => address.json  Get random cities from list!

// Countries
rrag.uk();
rrag.de();
rrag.fr();
rrag.it();
rrag.pl();
rrag.ua();
rrag.nl();

//Language options. Look 'Accept-Language'
rrag.random("en");
rrag.de("us");
rrag.pl("ru");
