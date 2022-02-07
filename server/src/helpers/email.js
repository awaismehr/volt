import AWS from 'aws-sdk';

const awsConfig = {
  accessKeyId: 'AKIAYFMFKW4YSKSFYBEF',
  secretAccessKey: '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',
  region: 'us-east-1',
};

const ses = new AWS.SES(awsConfig);

export const sendForgetPassEmail = async (data) => {
  let params = {
    Source: 'testf7070@gmail.com',
    Destination: {
      ToAddresses: ['hashlogics6@gmail.com'],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `Here is Your Reset Password Link, Please Click: <strong><a href='${data}'>Here</a></strong> Which is only valid for 2 minutes `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `'Link To Reset Password'`,
      },
    },
  };

  await ses.sendEmail(params).promise();
};

export const sendPinCodeEmail = async (email, bayNumber, location) => {
  const pinCode = Math.floor(1000 + Math.random() * 9000);
  let params = {
    Source: 'testf7070@gmail.com',
    Destination: {
      ToAddresses: ['hashlogics6@gmail.com'],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `Here is Your Pin code:${pinCode} of bay ${bayNumber} at ${location}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `'Your locker pin code'`,
      },
    },
  };

  await ses.sendEmail(params).promise();
};
