import axios from 'axios';
import { GetToken } from './jwt';

interface PullRequestPayload {
  action: string;
  number: number;
  pull_request: {
    html_url: string;
    title: string;
    user: {
      login: string;
    };
  };
  repository: {
    full_name: string;
  };
}

/**
 * Handles GitHub pull request webhook events
 * @param payload - The webhook payload containing PR data
 * @returns Promise<void>
 */
export async function handlePr(payload: any) {
  const DEBUG = process.env.DEBUG_MODE === 'true';
  const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

  const log = {
    debug: (message: string, data?: any) => {
      if (DEBUG && LOG_LEVEL === 'debug') {
        console.debug(`[DEBUG][PR Handler] ${message}`, data ? JSON.stringify(data, null, 2) : '');
      }
    },
    info: (message: string, data?: any) => {
      if (DEBUG || LOG_LEVEL === 'info') {
        console.info(`[INFO][PR Handler] ${message}`, data ? JSON.stringify(data, null, 2) : '');
      }
    },
    error: (message: string, error?: any) => {
      console.error(`[ERROR][PR Handler] ${message}`, error ? JSON.stringify(error, null, 2) : '');
    }
  };

  try {
    log.debug('Processing raw payload:', payload);

    // Validate payload
    if (!payload || typeof payload !== 'object') {
      log.error('Invalid payload received:', payload);
      throw new Error('Invalid payload format');
    }

    const data = payload as PullRequestPayload;
    
    // log.debug('Parsed PR webhook payload:', data);
    
    if (!data.action) {
      log.error('Missing action in payload:', data);
      throw new Error('Missing action in payload');
    }

    log.info(`Processing PR action: ${data.action}`);
    
    if (data.action === "opened") {
      const prNumber = data.number;
      const repoFullName = data.repository.full_name;
      
      log.debug('PR Details', {
        number: prNumber,
        title: data.pull_request.title,
        author: data.pull_request.user.login,
        repo: repoFullName
      });

      // Validate token
      const token =await GetToken();
      console.log({token})
      if (!token) {
        throw new Error('GITHUB_TOKEN is not set');
      }

      // Create comment on the PR
      try {
        const response = await axios.post(
          `https://api.github.com/repos/${repoFullName}/issues/${prNumber}/comments`,
          {
            body: `Thanks for opening this pull request! I'll review it shortly.

PR Details:
- Title: ${data.pull_request.title}
- Author: @${data.pull_request.user.login}
- PR URL: ${data.pull_request.html_url}`
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json',
            }
          }
        );
        
        log.info(`Successfully commented on PR #${prNumber}`);
        log.debug('API Response:', response.data);
      } catch (apiError: any) {
        log.error('GitHub API Error:', {
          status: apiError.response?.status,
          statusText: apiError.response?.statusText,
          data: apiError.response?.data
        });
        throw new Error(`GitHub API Error: ${apiError.message}`);
      }
    } else {
      log.debug(`Ignoring PR action: ${data.action}`);
    }
  } catch (error) {
    log.error('Error in PR handler:', error);
    throw error;
  }
}
