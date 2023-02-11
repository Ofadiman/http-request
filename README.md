# Http request docker action

This actions sends a http request to selected endpoint.

## Inputs

| input   | description                                                  |
| ------- | ------------------------------------------------------------ |
| url     | The HTTP method (get or options) used when sending request.  |
| method  | The URL to which HTTP request will be sent.                  |
| timeout | The maximum time (ms) to wait for a successful HTTP request. |

## Example

```yaml
uses: ofadiman/http-request@v1
with:
  url: https://jsonplaceholder.typicode.com/todos/1
  timeout: 1000
  method: get
```
