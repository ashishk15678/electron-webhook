// You installed the `express` library earlier. For more information, see [JavaScript example: Install dependencies](#javascript-example-install-dependencies).
const express = require('express');

// This initializes a new Express application.
const app = express();

// @ts-ignore
app.post('/', express.json({type: 'application/json'}), async(request, response) => {

  response.status(202).send('Accepted');

  const githubEvent = request.headers['x-github-event'];

  if (githubEvent === 'issues') {

    try{
        const newData = await request.json()
        console.log({newData})
    }catch(c){
        console.log("Error converting data to json")
    }

    const data = await request.body;
    console.log("data passed by webhook",data)
    const action = data.action;
    if (action === 'opened') {
      console.log(`An issue was opened with this title: ${data.issue.title}`);
    } else if (action === 'closed') {
      console.log(`An issue was closed by ${data.issue.user.login}`);
    } else {
      console.log(`Unhandled action for the issue event: ${action}`);
    }
  } else if (githubEvent === 'ping') {
    console.log('GitHub sent the ping event');
  } else {
    console.log(`Unhandled event: ${githubEvent}`);
  }
  console.log(await request.body)
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
