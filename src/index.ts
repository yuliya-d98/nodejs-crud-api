import * as http from "http";
import { TUser } from "./interfaces/interfaces";
import ApiError from "./exceptions/api-error";
import UserController from "./controllers/user-controller";

http
  .get("http://localhost:8000/", (res) => {
    const { statusCode } = res;
    const contentType = res.headers["content-type"];

    let error;
    // Any 2xx status code signals a successful response but
    // here we're only checking for 200.
    if (statusCode !== 200) {
      error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
    } else if (contentType && !/^application\/json/.test(contentType)) {
      error = new Error(
        "Invalid content-type.\n" +
          `Expected application/json but received ${contentType}`
      );
    }
    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      res.resume();
      return;
    }

    res.setEncoding("utf8");
    let rawData = "";
    res.on("data", (chunk) => {
      rawData += chunk;
    });
    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
      } catch (e) {
        console.error((e as Error).message);
      }
    });
  })
  .on("error", (e) => {
    console.error(`Got error: ${e.message}`);
  });

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  // res.writeHead(200, { "Content-Type": "application/json" });
  // res.end(
  //   JSON.stringify({
  //     data: "Hello World!",
  //   })
  // );

  console.log("req.url", req.url);

  try {
    const [api, users, userId] = req.url!.split("/");
    switch (req.method) {
      case "GET":
        if (userId) {
          UserController.getUserById(userId);
        } else {
          UserController.getAllUsers();
        }
        break;
      case "POST":
        UserController.createUser({});
        break;
      case "PUT":
        UserController.editUser({});
        break;
      case "DELETE":
        UserController.deleteUser(userId);
        break;
      default:
        throw ApiError.NonExistingEndpointError;
    }
  } catch (e) {
    console.log(e);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: "Hello World!",
      })
    );
  }
});

server.listen(8000);

console.log("index.ts");
