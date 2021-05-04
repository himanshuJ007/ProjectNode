const express = require('express');
const os = require('os');
const connectDB = require('../config/db');
const Job = require('../server/models/Job');

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/jobs', async (req, res) => {
  const data = await Job.find();
  res.send(data);
});
app.get('/api/jobs/filter', async (req, res) => {
  let filter = {};
  if (req.query.keywords) {
    filter = {
      ...filter,
      position: { $regex: req.query.keywords, $options: 'i' },
    };
  }
  if (req.query.type) {
    let types = req.query.type.split(',');
    types = types.map(type => type.replace(/-/g, ' '));
    if (types.indexOf('All') === -1) {
      filter = { type: { $in: types, } };
    }
  }
  const data = await Job.find({ $or: [filter] });
  res.send(data);
});
app.post('/api/addUser', async (req, res) => {
  // Job.create({
  //   position: 'CEO',
  //   location: 'Delhi',
  //   company: 'Amazon',
  //   logo: 'https://picsum.photos/200',
  //   type: 'Full Time',
  //   experience: '15 Years',
  //   skills: ['ReactJs', 'Javascript', 'Css', 'Html'],
  // });
  //
  // Job.create({
  //   position: 'Developer',
  //   location: 'Delhi',
  //   company: 'Amazon',
  //   logo: 'https://picsum.photos/200',
  //   type: 'Full Time',
  //   experience: '2 Years',
  //   skills: ['ReactJs', 'Javascript'],
  // });
  //
  // Job.create({
  //   position: 'UI Designer',
  //   location: 'Delhi',
  //   company: 'Amazon',
  //   logo: 'https://picsum.photos/200',
  //   type: 'Full Time',
  //   experience: '5 Years',
  //   skills: ['Css', 'Html'],
  // });
  //
  //
  // Job.create({
  //   position: 'Intern',
  //   location: 'Delhi',
  //   company: 'Amazon',
  //   logo: 'https://picsum.photos/200',
  //   type: 'Part Time',
  //   experience: '6 Months',
  //   skills: ['ReactJs', 'Javascript', 'Css', 'Html'],
  // });
  //
  // Job.create({
  //   position: 'CTO',
  //   location: 'Delhi',
  //   company: 'Amazon',
  //   logo: 'https://picsum.photos/200',
  //   type: 'Full Time',
  //   experience: '10 Years',
  //   skills: ['ReactJs', 'Javascript', 'Css', 'Html'],
  // });
  //
  // Job.create({
  //   position: 'HR',
  //   location: 'Delhi',
  //   company: 'Amazon',
  //   logo: 'https://picsum.photos/200',
  //   type: 'Full Time',
  //   experience: '5 Years',
  //   skills: ['Communication', 'English'],
  // });
  //
  // const data = await Job.find();
  // console.log(data);
  // res.send(data);
});
// Connect Database
connectDB();
app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${process.env.PORT || 3000}!`));
