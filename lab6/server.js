const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let items = [
    { id: 1, name: 'Item1' },
    { id: 2, name: 'Item2' },
    {id :3,name:'Item3'},
];
 
app.get('/', (req, res) => {
    res.send('Welcome ');
});
 
app.get('/items', (req, res) => {
    res.json(items);
});
app.get('/items/:name', (req, res) => {
    const item = items.find(i => i.name ===  req.params.name);
    if (!item) { res.send('Item not found');}
    res.json(item.name);
});
 
app.post('/items', (req, res) => {
    const newItem = { id: items.length + 1, name:  req.body.name };
    items.push(newItem);
    res.status(201).json(newItem);
});
 
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    item.name = req.body.name;
    res.json(item);
});
app.delete('/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id)); 
    if (index === -1) {
        return res.status(404).send('Item not found');
    }
    items.splice(index, 1);
    res.send('Item deleted');
})



app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
