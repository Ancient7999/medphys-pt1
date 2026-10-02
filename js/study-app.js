/* Study chapter loader + lightweight markdown renderer */
(function () {
  'use strict';

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderMarkdown(md) {
    const lines = md.replace(/\r\n/g, '\n').split('\n');
    const out = [];
    let i = 0;
    let inCode = false;
    let codeBuf = [];
    let listType = null;
    let inHtmlBlock = false;
    let htmlBuf = [];

    function closeList() {
      if (listType) {
        out.push(listType === 'ol' ? '</ol>' : '</ul>');
        listType = null;
      }
    }

    function inline(t) {
      t = escapeHtml(t);
      t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
      t = t.replace(/~~([^~]+)~~/g, '<del>$1</del>');
      t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
      return t;
    }

    while (i < lines.length) {
      const line = lines[i];

      // Pass through HTML blocks (phase diagram etc.)
      if (!inCode && !inHtmlBlock && /^\s*<div[\s>]/.test(line)) {
        closeList();
        inHtmlBlock = true;
        htmlBuf = [line];
        if (/<\/div>\s*$/.test(line)) {
          out.push(htmlBuf.join('\n'));
          htmlBuf = [];
          inHtmlBlock = false;
        }
        i++;
        continue;
      }
      if (inHtmlBlock) {
        htmlBuf.push(line);
        if (/<\/div>\s*$/.test(line)) {
          // only close when nesting depth returns — simple: count opens/closes in buf
          const joined = htmlBuf.join('\n');
          const opens = (joined.match(/<div\b/gi) || []).length;
          const closes = (joined.match(/<\/div>/gi) || []).length;
          if (closes >= opens) {
            out.push(joined);
            htmlBuf = [];
            inHtmlBlock = false;
          }
        }
        i++;
        continue;
      }

      if (line.startsWith('```')) {
        if (inCode) {
          out.push('<pre><code>' + escapeHtml(codeBuf.join('\n')) + '</code></pre>');
          codeBuf = [];
          inCode = false;
        } else {
          closeList();
          inCode = true;
        }
        i++;
        continue;
      }
      if (inCode) {
        codeBuf.push(line);
        i++;
        continue;
      }

      if (/^\s*\|/.test(line) && i + 1 < lines.length && /^\s*\|?\s*[-:| ]+\|/.test(lines[i + 1])) {
        closeList();
        const rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) {
          const cells = lines[i]
            .trim()
            .replace(/^\|/, '')
            .replace(/\|$/, '')
            .split('|')
            .map(function (c) { return c.trim(); });
          rows.push(cells);
          i++;
          if (i < lines.length && /^\s*\|?\s*[-:| ]+\|/.test(lines[i]) && rows.length === 1) {
            i++;
          } else if (rows.length > 1 && i < lines.length && /^\s*\|?\s*[-:| ]+\|/.test(lines[i])) {
            i++;
          } else if (!/^\s*\|/.test(lines[i] || '')) {
            break;
          }
        }
        if (rows.length) {
          let html =
            '<table><thead><tr>' +
            rows[0].map(function (c) { return '<th>' + inline(c) + '</th>'; }).join('') +
            '</tr></thead><tbody>';
          for (let r = 1; r < rows.length; r++) {
            html +=
              '<tr>' +
              rows[r].map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') +
              '</tr>';
          }
          html += '</tbody></table>';
          out.push(html);
        }
        continue;
      }

      if (/^---+\s*$/.test(line)) {
        closeList();
        out.push('<hr>');
        i++;
        continue;
      }

      if (/^>\s?/.test(line)) {
        closeList();
        const quote = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) {
          quote.push(lines[i].replace(/^>\s?/, ''));
          i++;
        }
        out.push('<blockquote><p>' + inline(quote.join(' ')) + '</p></blockquote>');
        continue;
      }

      const hm = /^(#{1,4})\s+(.*)$/.exec(line);
      if (hm) {
        closeList();
        const level = hm[1].length;
        out.push('<h' + level + '>' + inline(hm[2]) + '</h' + level + '>');
        i++;
        continue;
      }

      const ul = /^\s*[-*]\s+(.*)$/.exec(line);
      if (ul) {
        if (listType !== 'ul') {
          closeList();
          out.push('<ul>');
          listType = 'ul';
        }
        out.push('<li>' + inline(ul[1]) + '</li>');
        i++;
        continue;
      }
      const ol = /^\s*\d+\.\s+(.*)$/.exec(line);
      if (ol) {
        if (listType !== 'ol') {
          closeList();
          out.push('<ol>');
          listType = 'ol';
        }
        out.push('<li>' + inline(ol[1]) + '</li>');
        i++;
        continue;
      }

      if (!line.trim()) {
        closeList();
        i++;
        continue;
      }

      closeList();
      out.push('<p>' + inline(line) + '</p>');
      i++;
    }
    closeList();
    if (inCode) out.push('<pre><code>' + escapeHtml(codeBuf.join('\n')) + '</code></pre>');
    if (inHtmlBlock && htmlBuf.length) out.push(htmlBuf.join('\n'));
    return out.join('\n');
  }

  const CHAPTERS = [
    {
      id: 'ch1',
      src: 'content/chapter-1.md',
      title: 'Chapter 1 · Matter & mechanics',
      meta: 'Units · phases · Hooke · moduli · bone'
    },
    {
      id: 'ch2',
      src: 'content/chapter-2.md',
      title: 'Chapter 2 · Fluids at rest',
      meta: 'Density · pressure · Pascal · buoyancy'
    },
    {
      id: 'ch3',
      src: 'content/chapter-3.md',
      title: 'Chapter 3 · Flow → Bernoulli',
      meta: 'Continuity · Bernoulli · clinical'
    }
  ];

  const cache = Object.create(null);
  const listEl = document.getElementById('chapterList');

  async function loadMd(src) {
    if (!cache[src]) {
      const res = await fetch(src, { cache: 'no-store' });
      if (!res.ok) throw new Error(src + ' → ' + res.status);
      cache[src] = await res.text();
    }
    return cache[src];
  }

  function buildCards() {
    listEl.innerHTML = '';
    CHAPTERS.forEach(function (ch) {
      const card = document.createElement('article');
      card.className = 'chapter-card';
      card.dataset.id = ch.id;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chapter-toggle';
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML =
        '<span class="chev" aria-hidden="true">›</span>' +
        '<span class="title">' +
        ch.title +
        '</span>' +
        '<span class="meta">' +
        ch.meta +
        '</span>';

      const body = document.createElement('div');
      body.className = 'chapter-body';
      body.innerHTML = '<article class="md"><p style="color:var(--col-text-muted)">Closed — click to load.</p></article>';

      btn.addEventListener('click', async function () {
        const open = card.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (!open) return;
        if (body.dataset.loaded === '1') return;
        body.querySelector('.md').innerHTML = '<p style="color:var(--col-text-muted)">Loading…</p>';
        try {
          const md = await loadMd(ch.src);
          body.querySelector('.md').innerHTML = renderMarkdown(md);
          body.dataset.loaded = '1';
        } catch (err) {
          body.querySelector('.md').innerHTML =
            '<p><strong>Could not load chapter.</strong> Serve over http(s).</p><pre><code>' +
            escapeHtml(String(err)) +
            '</code></pre>';
        }
      });

      card.appendChild(btn);
      card.appendChild(body);
      listEl.appendChild(card);
    });
  }

  buildCards();
  document.body.style.opacity = '1';
})();
