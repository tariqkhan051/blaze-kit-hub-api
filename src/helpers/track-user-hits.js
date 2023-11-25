const fs = require("fs");
const childProcess = require("child_process");
const fileName = "tracked-data.json";

async function trackUserHit(req) {
  const now = new Date();
  const ipAddress =
    (
      req.headers["X-Forwarded-For"] ||
      req.headers["x-forwarded-for"] ||
      ""
    ).split(",")[0] || req.socket.remoteAddress;

  const pcName = await getPCName(ipAddress.split(':').pop());

  console.log(
    `User with IP ${ipAddress} and PC name ${pcName} accessed the API.`
  );

  const date = now.toISOString().substring(0, 10);
  const userHitRecord = {
    datetime: now.toISOString(),
    pcName,
    ipAddress
  };

  const records = loadRecordsFromFile();
  const index = records.findIndex((record) => record.date === date);
  if (index === -1) {
    records.push({ date, hits: [userHitRecord] });
  } else {
    records[index].hits.push(userHitRecord);
  }
  saveRecordsToFile(records);
}

function loadRecordsFromFile() {
  try {
    const data = fs.readFileSync(fileName, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveRecordsToFile(records) {
  const data = JSON.stringify(records, null, 2);

  fs.writeFileSync(fileName, data, { flag: "w" });
}

async function getPCName(ip) {
  if (!ip) {
    return "";
  }

  const names = [];
  try {
    //execute command to get PC name
    const statsOutput = await execute("nbtstat -a " + ip);

    //filter output to get PC name
    const regexp =
      /(?<=NetBIOS Remote Machine Name Table)([\s\S]*)(?=MAC Address)/g;
    const matches = statsOutput.matchAll(regexp);

    if (matches) {
      var lines = "";
      for (const match of matches) {
        if (match) {
          //console.log(match);
          //console.log(match.index);
          lines += match + "\n";
        }
      }

      const rows = lines.toString().split("\n");

      for (let i = 1; i < rows.length; i++) {
        var row = rows[i];
        if (row && row.toString().trim()) {
          if (
            row.toString().trim().startsWith("Name") ||
            row.toString().trim().startsWith("-")
          ) {
            continue;
          }
          const pcNames = row.toString().split(" ");
          pcNames.forEach((element) => {
            if (element) {
              names.push(element);
            }
          });
        }
      }
      //fs.writeFileSync("info.txt", names[0]?.toString());
    } else {
      //fs.writeFileSync("info.txt", "Console Output : " + statsOutput);
    }
  } catch (error) {
    //console.error(error.toString());
    //fs.writeFileSync("info.txt", "Error : " + error);
  }

  return names[0]?.toString();
}

/**
 * @param {string} command A shell command to execute
 * @return {Promise<string>} A promise that resolve to the output of the shell command, or an error
 * @example const output = await execute("ls -alh");
 */
async function execute(command) {
  /**
   * @param {Function} resolve A function that resolves the promise
   * @param {Function} reject A function that fails the promise
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
   */
  return new Promise(function (resolve, reject) {
    /**
     * @param {Error} error An error triggered during the execution of the childProcess.exec command
     * @param {string|Buffer} standardOutput The result of the shell command execution
     * @param {string|Buffer} standardError The error resulting of the shell command execution
     * @see https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
     */
    childProcess.exec(command, function (error, standardOutput, standardError) {
      if (error) {
        reject();

        return;
      }

      if (standardError) {
        reject(standardError);

        return;
      }

      resolve(standardOutput);
    });
  });
}

module.exports = {
  trackUserHit
};
