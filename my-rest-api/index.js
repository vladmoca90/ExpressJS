const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data (In a real app, you'd use a database)
// Assuming items is an array of objects, e.g., [{ id: 1, name: 'Item 1' }, ...]
let items = require("./users"); // Ensure this is an array or replace with `let items = []`;

// Utility function to generate unique IDs
const generateId = () => {
    return items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
};

// GET route to fetch all items
app.get("/api/items", (req, res) => {
    res.json(items);
});

// GET route to fetch a single item by ID
app.get("/api/items/:id", (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send("Item not found");
    res.json(item);
});

// POST route to create a new item
app.post("/api/items", (req, res) => {
    if (!req.body.name) return res.status(400).send("Name is required");

    const newItem = {
        id: generateId(),
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT route to update an item
app.put("/api/items/:id", (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send("Item not found");

    if (!req.body.name) return res.status(400).send("Name is required");

    item.name = req.body.name;
    res.json(item);
});

// DELETE route to remove an item
app.delete("/api/items/:id", (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send("Item not found");

    const [deletedItem] = items.splice(itemIndex, 1);
    res.json(deletedItem);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
