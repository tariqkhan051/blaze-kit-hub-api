const os = require('os');
const { getSearchMessages, submitSearchJob } = require("./helpers");
const { trackUserHit } = require("../helpers/track-user-hits");

const searchLogs = async (req, res, next) => {

  await trackUserHit(req);
  
  let { from, to, query, team } = req.body;
  //query = query.replace(/"/g, '\\"').replace(/'/g, '\\"').replace(/\\\\/g, "\\");
  try {
    const jobId = await submitSearchJob(from, to, query, team);
    console.log(jobId);
    setTimeout(async () => {
      const messages = await getSearchMessages(jobId, 0, 30, team);
      res.json({ jobId, messages });
    }, 5000);

  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
};

const getMessagesForJob = async (req, res) => {
  const { id } = req.params;
  const { offset = 0, limit = 10 } = req.query;

  try {
    const messages = await getSearchMessages(
      id,
      parseInt(offset),
      parseInt(limit)
    );
    res.json(messages);
  } catch (error) {
    res.status(404).json({ error: "Job not found" });
  }
};

module.exports = {
  searchLogs,
  getMessagesForJob
};
