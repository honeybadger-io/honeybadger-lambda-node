# Lambda/Node/Honeybadger template

An AWS Lambda function which reports exceptions to the :zap: [Honeybadger.io error
notifier for Node.js](https://www.honeybadger.io/for/node).

## Lambda setup

Before starting, install the required node packages (these are vendored during
the build process): `npm install`.

Then, to build a zip file for Lambda, run `make build`. After that just create a
new function and chose the "Upload a .ZIP file" option along with the following
config:

- Runtime: NodeJS
- Handler: index.handler
- Role: Basic Execution Role
- Memory: 128mb
- Timeout: 3

## Running the tests

```sh
make
```
