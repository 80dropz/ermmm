const AWS = require('aws-sdk');
const axios = require('axios');

// Initialize AWS SDK clients
const dynamo = new AWS.DynamoDB.DocumentClient();
const secrets = new AWS.SecretsManager();

exports.handler = async (event) => {
    // Extract the hash from the query parameters
    const hash = event.queryStringParameters?.hash;

    // Validate the hash
    if (!hash) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Hash parameter is required" })
        };
    }

    try {
        // Step 1: Retrieve the Linkvertise API key from AWS Secrets Manager
        const secret = await secrets.getSecretValue({
            SecretId: process.env.LINKVERTISE_API_SECRET
        }).promise();

        const apiKey = JSON.parse(secret.SecretString).API_KEY;

        // Step 2: Validate the hash with the Linkvertise API
        const lvResponse = await axios.get(
            `https://publisher.linkvertise.com/api/v1/redirect/link/check/${hash}`,
            { headers: { 'Authorization': `Bearer ${apiKey}` } }
        );

        // Check if the offer is completed
        if (lvResponse.data.data?.status !== "completed") {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Invalid or incomplete offer" })
            };
        }

        // Step 3: Retrieve an available key from DynamoDB
        const keyResult = await dynamo.query({
            TableName: process.env.TABLE_NAME,
            IndexName: "status-index",
            KeyConditionExpression: "#status = :avail",
            ExpressionAttributeNames: { "#status": "status" },
            ExpressionAttributeValues: { ":avail": "available" },
            Limit: 1
        }).promise();

        // Check if any keys are available
        if (keyResult.Items.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "No keys available" })
            };
        }

        // Step 4: Mark the key as used
        const key = keyResult.Items[0].key;
        await dynamo.update({
            TableName: process.env.TABLE_NAME,
            Key: { "key": key },
            UpdateExpression: "SET #status = :used",
            ExpressionAttributeNames: { "#status": "status" },
            ExpressionAttributeValues: { ":used": "used" }
        }).promise();

        // Step 5: Return the key to the user
        return {
            statusCode: 200,
            body: JSON.stringify({ key })
        };

    } catch (error) {
        console.error("Error:", error);

        // Handle specific errors
        if (error.response) {
            // Linkvertise API error
            return {
                statusCode: error.response.status,
                body: JSON.stringify({ error: "Linkvertise API error", details: error.response.data })
            };
        } else if (error.request) {
            // Network error
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Network error", details: error.message })
            };
        } else {
            // Other errors
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Server error", details: error.message })
            };
        }
    }
};
