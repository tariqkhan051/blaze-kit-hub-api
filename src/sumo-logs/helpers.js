const https = require("https");
const fs = require('fs');
const axios = require("axios");

const getSearchMessages = (id, offset, limit, TeamName) => {
  const url = `https://api.us2.sumologic.com/api/v1/search/jobs/${id}/messages?offset=${offset}&limit=${limit}`;
  const user = getUserByTeam(TeamName);
  if (!user) {
    return new Error(`Unable to find user for team ${TeamName}`);
  }
  const config = {
    headers: {
      Authorization:
        "Basic " + Buffer.from(user.username + ":" + user.password).toString("base64"),
    },
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(url, config)
        .then((res) => {
          const response = res.data;
          const rawMaps = response.messages.map((message) => message.map);
          const parsedMaps = [];
          for (let rawMap of rawMaps) {
            try {
              const parsedMap = JSON.parse(rawMap._raw.replace(/\//g, "\\/"));
              // if (
              //   parsedMap.log &&
              //   (parsedMap.log.level === "info" ||
              //     parsedMap.log.level === "debug")
              // ) {
              //   const datetime = formatDate(rawMap._messagetime);
              //   parsedMaps.push({ parsedMap, datetime });
              // }
              // else {
              const datetime = formatDate(rawMap._messagetime);
              parsedMaps.push({ parsedMap, datetime });
              // }
            } catch (error) {
              const datetime = formatDate(rawMap._messagetime);
              const rawMsg = rawMap._raw;
              parsedMaps.push({ rawMsg, datetime });
              console.error(`Error parsing map: ${rawMap}`);
            }
          }
          resolve(parsedMaps);
        })
        .catch((error) => {
          reject(new Error(`Error fetching search messages: ${error}`));
        });
    }, 5000);
  });
};

function formatDate(timestampString) {
  const timestamp = parseInt(timestampString); // convert string to number
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  const formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;
  return formattedDate;
}

function getUserByTeam(teamName) {
  const fileContents = fs.readFileSync('teamData.json', 'utf-8');
  const teamData = JSON.parse(fileContents);
  // Loop through the array and check if the "team" property matches the desired team name
  for (const team of teamData) {
    if (team.team === teamName) {
      // Return the "user" object if there is a match
      return team.user;
    }
  }
  // Return undefined if no match is found
  return undefined;
}

const submitSearchJob = async (from, to, query, TeamName) => {
  const url =
    "https://api.us2.sumologic.com/api/v1/search/jobs?from=" +
    encodeURIComponent(from) +
    "&to=" +
    encodeURIComponent(to) +
    "&timeZone&autoParsingMode&byReceiptTime=true";

  const requestData = {
    from: from,
    to: to,
    query: query
  };
  const data = JSON.stringify(requestData);
  const user = getUserByTeam(TeamName);
  if (!user) {
    return new Error(`Unable to find user for team ${TeamName}`);
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
      Authorization:
        "Basic " + Buffer.from(user.username + ":" + user.password).toString("base64")
    },
    data: data
  };

  try {
    return await new Promise((resolve, reject) => {
      const req = https.request(url, options, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          if (res.statusCode < 200 || res.statusCode > 299) {
            reject(
              `Error submitting search job: ${res.statusCode} - ${res.statusMessage}`
            );
          } else {
            const response = JSON.parse(body);
            resolve(response.id);
          }
        });
      });

      req.on("error", (err) => reject(err));
      req.write(data);
      req.end();
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getSearchMessages,
  submitSearchJob
};

