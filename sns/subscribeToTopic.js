'use strict';

const AWS = require('aws-sdk');

const sns = new AWS.SNS();

exports.handler = async function(event) {
  console.log(event);

  const topicName = JSON.parse(event.body).topicName;
  const emailAddress = JSON.parse(event.body).emailAddress;

  const topicArnArrayData = await sns.listTopics().promise();
  //get the full topicArn that matches out of all possible topics
  const topicArn = topicArnArrayData.Topics.find(topic => RegExp(topicName, 'g').test(topic.TopicArn)).TopicArn;

  const params = {
      Protocol: 'EMAIL',
      TopicArn: topicArn,
      Endpoint: emailAddress
  };

  const subscribeArnData = await sns.subscribe(params).promise();

  // create a response
  const response = {
    statusCode: 200,
    body: JSON.stringify('Subscribed'),
    isBase64Encoded: false
  };
  return response;
};