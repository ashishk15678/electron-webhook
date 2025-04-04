import { handlePr } from "./functions";
import express from 'express';

const app = express();

// Ensure JSON parsing middleware is properly configured
app.use(express.json({ 
  verify: (req, res, buf) => {
    // Store raw body for verification if needed
    (req as any).rawBody = buf;
  }
}));

app.post('/', async(request, response) => {
  try {
    // console.log('Received webhook with headers:', request.headers);
    // console.log('Received webhook body:', request.body);

    const githubEvent = request.headers['x-github-event'];
    
    if (!request.body) {
      console.error('No request body received');
      return response.status(400).send('No request body');
    }

    if(githubEvent === "pull_request"){
      console.log('Processing pull request event with body:', request.body && "request body available");
      await handlePr(request.body); // Pass the body directly, not the whole request
    }

    if (githubEvent === 'issues') {
      const data = request.body;
      console.log("Processing issues event with data:", data);
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

    response.status(202).send('Accepted');
  } catch (error) {
    console.error('Error processing webhook:', error);
    response.status(500).send('Internal Server Error');
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
