'use strict';

const AWS = require('aws-sdk');

const sns = new AWS.SNS();

exports.handler = async function(event) {
  const topicArnArrayData = await sns.listTopics().promise();
  //strip arns down to just the sns topic names
  const responseBody = topicArnArrayData.Topics.map(topic => topic.TopicArn.replace(/.*:/,''));

  // create a response
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),
    isBase64Encoded: false
  };
  return response;
};