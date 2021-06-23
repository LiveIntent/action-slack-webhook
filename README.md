# Slack Webhook Action

This action will perform a POST request to a given Slack webhook. This can be
used to push both simple messages as well as more complex Block Kit based rich
messages.

## Inputs

### `payload`

**required** The JSON payload to be sent to the webhook. Must be a string.

## Environment

### `SLACK_WEBHOOK_URL`

**required** The Slack webhook URL that the `payload` will be sent to.

## Example usage

```
uses: liveintent/action-slack-webhook@v1.0.0
with:
    payload |
        {
            "text": "Hello world"
        }
env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

## Development

In order to develop this project, simply make changes to the `action.js` file and
run `npm run build` to create the new distribution in the `dist/` folder.

## License

The MIT License

Copyright 2021 LiveIntent, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
