const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Basic client CRUD endpoints
app.get('/clients', async (req, res) => {
  const clients = await prisma.client.findMany();
  res.json(clients);
});

app.post('/clients', async (req, res) => {
  const client = await prisma.client.create({ data: req.body });
  res.json(client);
});

app.put('/clients/:id', async (req, res) => {
  const { id } = req.params;
  const client = await prisma.client.update({ where: { id: Number(id) }, data: req.body });
  res.json(client);
});

app.delete('/clients/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.client.delete({ where: { id: Number(id) } });
  res.json({ success: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
