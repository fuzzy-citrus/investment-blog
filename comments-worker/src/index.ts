export interface Env {
	DB: D1Database;
	ALLOWED_ORIGIN: string;
}

const CORS = (origin: string) => ({
	'Access-Control-Allow-Origin': origin,
	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
});

function json(data: unknown, status = 200, origin = '*') {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS(origin) },
	});
}

function sanitize(s: string): string {
	return s.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const origin = env.ALLOWED_ORIGIN || '*';

		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: CORS(origin) });
		}

		if (url.pathname !== '/comments') {
			return new Response('Not found', { status: 404 });
		}

		// GET: fetch comments for a page
		if (request.method === 'GET') {
			const page = url.searchParams.get('page');
			if (!page) return json({ error: 'page required' }, 400, origin);

			const { results } = await env.DB.prepare(
				'SELECT id, author, body, created_at FROM comments WHERE page = ? ORDER BY created_at ASC LIMIT 200'
			).bind(page).all();

			return json(results, 200, origin);
		}

		// POST: submit a comment
		if (request.method === 'POST') {
			let body: Record<string, string>;
			try {
				body = await request.json();
			} catch {
				return json({ error: 'invalid JSON' }, 400, origin);
			}

			// Honeypot: bots fill this field, humans don't
			if (body.website) return json({ ok: true }, 200, origin);

			const page = (body.page ?? '').trim();
			const author = sanitize((body.author ?? '').slice(0, 80));
			const text = sanitize((body.body ?? '').trim().slice(0, 2000));

			if (!page) return json({ error: 'page required' }, 400, origin);
			if (!text || text.length < 2) return json({ error: 'body required' }, 400, origin);

			await env.DB.prepare(
				'INSERT INTO comments (page, author, body) VALUES (?, ?, ?)'
			).bind(page, author || '名無しさん', text).run();

			return json({ ok: true }, 201, origin);
		}

		return new Response('Method not allowed', { status: 405 });
	},
} satisfies ExportedHandler<Env>;
