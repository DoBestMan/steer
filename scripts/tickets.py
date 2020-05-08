from jira import JIRA
import re
from datetime import datetime
import json
import os
import requests
from collections import defaultdict
from github import Github
from github.Repository import Repository
from github.Organization import Organization
from github.Comparison import Comparison
from github.Commit import Commit


class VercelSteer:
    def __init__(self):
        self.vercel_headers = {
            'Authorization': 'Bearer '+os.environ.get('VERCEL_TOKEN')}

    def write_build_url(self, url):
        filename = open('notification.txt', 'w')
        filename.write("A build is available here: https://%s\n" % url)
        filename.close()

    def get_build_url(self):
        query = "?teamId="+os.environ.get(
            'VERCEL_TEAM_ID')+"&limit=1&meta-githubCommitRef=qa"
        response = requests.get(os.environ.get(
            'VERCEL_URL')+query, headers=self.vercel_headers)

        if (response.status_code != 200):
            print('Request failed')
            return
        else:
            deployment = response.json()['deployments'][0]
            url = deployment['url']
            return url


class GithubSteer:
    def __init__(self):
        self.github = Github(os.environ.get('GITHUB_TOKEN'))
        org: Organization = self.github.get_organization('SimpleTire')
        repo: Repository = org.get_repo('steer')
        commits = repo.get_commits(sha="qa")
        head = ''
        base = ''
        self.version_re = re.compile('v[0-9]+.[0-9]+.[0-9]+')
        for c in commits:
            if self.version_re.match(c.commit.message):
                if not head:
                    head = c.commit.sha
                else:
                    base = c.commit.sha
                    break
        self.compare = repo.compare(base=base, head=head)

    def find_commits_add_to_json(self):
        filename = open('notification.txt', 'a+')
        commits = []
        build = ""
        for commit in self.compare.commits:
            if self.version_re.match(commit.commit.message):
                build = "Build version: %s\n" % commit.commit.message
            else:
                commits.append("%s\n" % commit.commit.message)
        filename.write(build+"\n")
        filename.write("Commits:\n")
        for c in commits:
            filename.write(c)
        filename.close()

############################################################


class JiraSteer:
    def __init__(self):
        self.jiraclient = JIRA({'server': "https://simpletire.atlassian.net"}, basic_auth=(
            os.environ.get("JIRA_USERNAME"), os.environ.get("JIRA_TOKEN")))

    def get_issues_with_jql(self, jql="project='WCS' and key='WCS-135' or key='WCS-232'"):
        return self.jiraclient.search_issues(jql, maxResults=200)

    def comment_build(self, issue_to_mod):
        comment = open('notification.txt', 'r')
        self.jiraclient.add_comment(issue_to_mod, comment.read())

    def change_issue_state(self, issue_to_mod, state):
        self.jiraclient.transition_issue(issue_to_mod, state)

    def bulk_update_deployed(self, data, status):
        for key in data:
            issue_to_mod = self.jiraclient.search_issues("key="+key)[0]
            self.comment_build(issue_to_mod)
            self.change_issue_state(issue_to_mod, status)

    def bulk_update_done(self, data, status):
        for key in data:
            issue_to_mod = self.jiraclient.search_issues("key="+key)[0]
            self.change_issue_state(issue_to_mod, status)

    def get_issue_keys(self, issues):
        keys = dict(done=[], deploy=[])
        for issue in issues:
            issuetype_id = issue.raw['fields']['issuetype']['id']
            # task (3) or subtask (5)
            if (issuetype_id == '3') or (issuetype_id == '5'):
                keys['done'].append(issue.key)
            # story (10001) or bug (1)
            if (issuetype_id == '10001') or (issuetype_id == '1'):
                keys['deploy'].append(issue.key)
        return keys


jirawc = JiraSteer()
githubwc = GithubSteer()
vercelwc = VercelSteer()

url = vercelwc.get_build_url()
vercelwc.write_build_url(url)
githubwc.find_commits_add_to_json()

keys = jirawc.get_issue_keys(jirawc.get_issues_with_jql())
jirawc.bulk_update_done(keys['done'], 'QA Not Required')
jirawc.bulk_update_deployed(keys['deploy'], 'Deployed to QA')
