const http = require("http");

const printData = (parsedData) => {
  const {
    observation_time,
    temperature,
    weather_descriptions,
    wind_speed,
    wind_dir,
    pressure,
    humidity,
    cloudcover,
    feelslike,
  } = parsedData.current;
  return {
    time: observation_time,
    temperature: `${temperature} Celsius`,
    "weather descriptions": weather_descriptions.join(","),
    wind: `${wind_speed} km/h, ${wind_dir}`,
    pressure: `${pressure} MB`,
    humidity: `${humidity} %`,
    cloudcover: `${cloudcover} %`,
    feelslike: `${feelslike} Celsius`,
  };
};

const getHTTPRes = (URL) =>
  http
    .get(URL, (res) => {
      const statusCode = res.statusCode;
      if (statusCode !== 200) {
        console.error(`Status Code: ${statusCode}`);
        return;
      }
      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", (chunk) => (rawData += chunk));
      res.on("end", () => {
        let parsedData = JSON.parse(rawData);
        console.log(
          `Info about ${parsedData.location.name}, ${parsedData.location.country} weather`
        );
        console.table(printData(parsedData));
      });
    })
    .on("error", (e) => {
      console.error(`Got error: ${e.message}`);
    });

module.exports = getHTTPRes;
