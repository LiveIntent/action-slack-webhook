/**
 * The MIT License
 *
 * Copyright 2021 LiveIntent, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const core = require('@actions/core')
const { IncomingWebhook } = require('@slack/webhook')

// Look for a string that matches base URL of a Slack webhook but not ending.
// This will eliminate most cases of fundamentally invalid webhook URLs.
const validWebhookUrlPattern = /^https:\/\/hooks\.slack\.com\/(?!$)/

try {
    // 1. Grab the webhook and validate
    const webhookUrl = process.env.SLACK_WEBHOOK_URL
    if (!webhookUrl) throw new Error('The `SLACK_WEBHOOK_URL` environment variable is required')
    if (!validWebhookUrlPattern.test(webhookUrl)) throw new Error('Webhook must be a Slack webhook URL')

    // 2. Pick up the payload and validate
    const payload = core.getInput('payload')
    if (payload.length < 1) throw new Error('The payload input must be supplied')

    // 3. Parse the payload into an object
    let data

    try {
        data = JSON.parse(payload)
    } catch (_) {
        throw new Error('The payload input must be valid JSON')
    }

    // 4. Send our data to the webhook
    const webhook = new IncomingWebhook(webhookUrl)
    webhook
        .post(webhookUrl, data)
        .then(() => {})
        .catch((err) => {
            throw new Error(`Webhook request failed\n${data}\n${err}`)
        })
} catch (err) {
    core.setFailed(err.message)
}
