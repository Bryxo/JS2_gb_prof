const express = require('express');
const fs = require('fs');
const app = express(); // app - это объект, с помощью которого можно обрабатывать запросы на сервер
const cart = require('./cartRouter');//обработчик всех запросов корзины

app.use(express.json());
app.use('/', express.static('public')); //
app.use('/api/cart', cart);

// app.get();
// app.post();
// app.put();
// app.delete();

app.get('/api/products', (req, res) => { //req - это объект для получения данных от нашего клиента; res - объект используемый для ответа клиенту)
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    })
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}....`));