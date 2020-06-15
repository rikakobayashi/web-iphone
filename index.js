'use strict'
const express = require('express')

app.use(express.static(path.join(__dirname, 'dist')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), {})
})