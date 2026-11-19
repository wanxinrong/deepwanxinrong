const UPSTREAM = 'https://bedtime-book-video.app.workbuddy.host';
const SHARECODE = '3VW7NJYK2W';

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    const target = new URL(incoming.pathname + incoming.search, UPSTREAM);
    target.searchParams.set('sharecode', SHARECODE);

    const headers = new Headers(request.headers);
    headers.set('Host', new URL(UPSTREAM).host);
    const init = { method: request.method, headers, redirect: 'follow' };
    if (!['GET', 'HEAD'].includes(request.method)) init.body = request.body;

    let resp;
    try {
      resp = await fetch(target.toString(), init);
    } catch (e) {
      return new Response('Upstream error: ' + (e && e.message ? e.message : e), { status: 502 });
    }

    const out = new Headers(resp.headers);
    out.delete('content-encoding');
    out.delete('transfer-encoding');
    const ct = resp.headers.get('content-type') || '';
    if (ct.includes('text/html')) {
      let html = await resp.text();
      html = html.split(UPSTREAM).join(incoming.origin);
      out.delete('content-length');
      return new Response(html, { status: resp.status, headers: out });
    }
    return new Response(resp.body, { status: resp.status, statusText: resp.statusText, headers: out });
  },
};
