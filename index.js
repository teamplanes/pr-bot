const { createProbot } = require('probot');

const loadProbot = (appFn) => {
	const probot = createProbot({
		id: process.env.APP_ID,
		secret: process.env.SECRET,
		cert: Buffer.from(process.env.PRIVATE_KEY, 'base64')
	});

	probot.load(appFn);

	return probot;
};

const appFn = (app) => {
	app.on(
		[ 'pull_request.opened', 'pull_request.edited', 'pull_request.synchronize', 'pull_request.reopened' ],
		async (context) => {
			const title = context.payload.pull_request.title;
			const body = context.payload.pull_request.body;
			const isUnChecked = /-\s\[\s\]/g.test(body);
			const status = isUnChecked ? 'failure' : 'success';

			context.log(`Updating PR "${title}" (${context.payload.pull_request.html_url}): ${status}`);

			const repo = {
				owner: context.payload.pull_request.head.repo.owner.login,
				repo: context.payload.pull_request.head.repo.name,
				sha: context.payload.pull_request.head.sha
			};

			await context.github.repos.createStatus({
				...repo,
				state: status,
				target_url: context.payload.pull_request.url,
				description: status ? 'task list not completed yet' : 'task list complete',
				context: 'Planes Task List Checker'
			});

			const statuses = (await context.github.repos.getCombinedStatusForRef(repo)).data.statuses;

			if (statuses) {
				const nowStatus = statuses.find((status) => status.context === 'now');
				if (nowStatus && nowStatus.state === 'success') {
					console.log(`> ${nowStatus.target_url}`);
				}
			}
		}
	);
};

module.exports = (req, res) => {
	const probot = loadProbot(appFn);
	return probot.server(req, res);
};
