(function () {
  'use strict';
  var D = JSON.parse(document.getElementById('data').textContent);
  var byId = {};
  D.skills.forEach(function (s) { byId[s.id] = s; });
  var swLabel = {}, swGroup = {}, roleById = {}, motionById = {};
  D.switches.forEach(function (s) { swLabel[s.k] = s.short; swGroup[s.k] = s.group; });
  D.roles.forEach(function (r) { roleById[r.k] = r; });
  D.motions.forEach(function (m) { motionById[m.k] = m; });

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  // a, b and c. A serial comma only when an item itself contains "and" or "or".
  function join(list, word) {
    word = word || 'and';
    if (list.length < 2) { return list.join(''); }
    var compound = list.some(function (t) { return / (and|or) /.test(t); });
    return list.slice(0, -1).join(', ') + (compound ? ', ' : ' ') + word + ' ' + list[list.length - 1];
  }
  var WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen'];
  function focusQuiet(el) { try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); } }
  function jump(el) { try { el.scrollIntoView({ behavior: 'instant', block: 'start' }); } catch (e) { el.scrollIntoView(); } }

  // Remembered in this browser only: role, sales motion, readiness switches and ticked facts. The page works without it.
  var store = {
    get: function (k) { try { return JSON.parse(window.localStorage.getItem('mg.' + k)); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem('mg.' + k, JSON.stringify(v)); } catch (e) { /* storage is optional */ } }
  };

  var state = { role: 'all', motion: 'ent', kinds: {}, q: '' };

  function kind(s) { return 'k-' + s.cls; }
  // The marking in words too, for anyone who cannot see outline and fill.
  var KIND_WORDS = { 'k-R': 'reads and proposes', 'k-P': 'can share its output', 'k-C': 'writes for customers', 'k-W': 'changes records', 'k-S': 'the first run' };
  function chip(s, dim) {
    return '<a class="chip ' + kind(s) + (dim ? ' dim' : '') + '" href="#skill-' + s.id + '">' + s.id + '<span class="vh">, ' + KIND_WORDS[kind(s)] + (dim ? ', outside the chosen role' : '') + '</span></a>';
  }

  /* ---------------------------------------------------------------- views */
  // With scripts, a view is found by its name and gives up its id. The browser then has nothing of its own to
  // scroll to when the address names a view, so a view always opens at its top. Without scripts the ids stay,
  // and the same links jump down one long page.
  var views = $$('[data-view]');
  var viewByName = {};
  views.forEach(function (v) { viewByName[v.getAttribute('data-view')] = v; v.removeAttribute('id'); });
  var tabLinks = $$('.tabs .tl:not([data-nav="all"]) a');
  var navEl = $('#nav'), hereEl = $('#here');

  // The one navigation row follows the page: on the front door it lists the page's parts, inside a plugin
  // it names the plugin, offers the way back and shows that plugin's sections.
  function show(view, el, user) {
    views.forEach(function (v) { v.classList.toggle('on', v === view); });
    var name = view.getAttribute('data-view');
    navEl.setAttribute('data-group', view.getAttribute('data-group') || 'page');
    hereEl.textContent = view.getAttribute('data-title') || '';
    tabLinks.forEach(function (a) {
      if (a.getAttribute('href') === '#' + name) {
        a.setAttribute('aria-current', 'page');
        var list = a.closest('.tl');
        if (list) { list.scrollLeft = Math.max(0, a.offsetLeft - 24); }
      } else {
        a.removeAttribute('aria-current');
      }
    });
    if (el === view) { window.scrollTo(0, 0); } else { jump(el); }
    if (user) {
      var target = el === view ? $('h1', view) : (el.tagName === 'DETAILS' ? $('summary', el) : el);
      if (target) {
        if (target.tagName !== 'SUMMARY' && !target.hasAttribute('tabindex')) { target.tabIndex = -1; }
        focusQuiet(target);
      }
    }
  }

  function route(user) {
    var id = '';
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch (e) { id = ''; }
    var el = id ? (viewByName[id] || document.getElementById(id)) : null;
    if (!el) { show(views[0], views[0], user); return null; }
    var view = el.closest('[data-view]');
    if (!view) { return null; }
    if (el.classList.contains('sk')) {
      if (el.hidden) { clearFilters(); }
      el.open = true;
    } else if (el.classList.contains('gsk')) {
      el.open = true;
    }
    show(view, el, user);
    return el === view ? null : el;
  }

  window.addEventListener('hashchange', function () { route(true); });
  // A link to the address already showing fires no hashchange, so go there by hand.
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (a && a.getAttribute('href') === window.location.hash) { route(true); }
  });

  /* ---------------------------------------------------------------- one choice of role and sales motion */
  function setRole(k) {
    if (k !== 'all' && !roleById[k]) { k = 'all'; }
    state.role = k;
    store.set('role', k);
    $$('[data-pick="role"]').forEach(function (s) { s.value = k; });
    applyFilters(); renderRoles(); renderMatrix(); renderWeek(); renderFacts();
  }
  function setMotion(k) {
    if (!motionById[k]) { k = 'ent'; }
    state.motion = k;
    store.set('motion', k);
    $$('[data-pick="motion"]').forEach(function (s) { s.value = k; });
    applyFilters(); renderMatrix(); renderWeek();
  }
  $$('[data-pick]').forEach(function (s) {
    s.addEventListener('change', function () {
      if (s.getAttribute('data-pick') === 'role') { setRole(s.value); } else { setMotion(s.value); }
    });
  });

  /* ---------------------------------------------------------------- the skills list */
  var rows = $$('details.sk');
  var statusEl = $('#sk-count');
  var clearBtn = $('#sk-clear');
  var emptyEl = $('#sk-empty');
  var kindBtns = $$('[data-kind]');

  function visibleRows() { return rows.filter(function (el) { return !el.hidden; }); }

  function fitText(s) {
    var parts = [];
    if (state.role !== 'all' && s.roles[state.role] > 0) { parts.push(s.roles[state.role] === 2 ? 'Built for this role' : 'Also useful'); }
    if (s.seg) {
      var v = s.seg[state.motion][0], f = s.seg[state.motion][1];
      parts.push(v === 0 ? D.value['0'] : D.value[String(v)] + ', ' + D.freq[String(f)].toLowerCase());
    } else {
      parts.push('First run, and again as needed');
    }
    return parts.join('. ');
  }

  // Each skill's foot names the skill before and after it among the rows now showing.
  function labelFeet() {
    var vis = visibleRows();
    vis.forEach(function (el, i) {
      $$('[data-step]', el).forEach(function (b) {
        var t = vis[i + Number(b.getAttribute('data-step'))];
        var word = b.getAttribute('data-step') === '1' ? 'Next' : 'Previous';
        b.disabled = !t;
        b.textContent = t ? word + ': ' + t.getAttribute('data-id') : word;
      });
    });
  }

  function applyFilters() {
    var shown = 0;
    var q = state.q.trim().toLowerCase();
    var anyKind = Object.keys(state.kinds).some(function (k) { return state.kinds[k]; });
    rows.forEach(function (el) {
      var s = byId[el.getAttribute('data-id')];
      var ok = (state.role === 'all' || s.roles[state.role] > 0) &&
        (!anyKind || state.kinds[kind(s)]) &&
        (!q || el.getAttribute('data-text').indexOf(q) !== -1);
      el.hidden = !ok;
      if (ok) { shown += 1; }
      $('.fitm', el).textContent = fitText(s);
      $$('[data-m]', el).forEach(function (t) { t.style.fontWeight = t.getAttribute('data-m') === state.motion ? '800' : ''; });
    });
    $$('.grp').forEach(function (g) { g.hidden = !$$('details.sk', g).some(function (el) { return !el.hidden; }); });
    var active = state.role !== 'all' || anyKind || q !== '';
    statusEl.innerHTML = 'Showing <b>' + shown + '</b> of <b>' + rows.length + '</b> skills' +
      (state.role !== 'all' ? ' for ' + esc(roleById[state.role].name) : '') + ', rated for ' + esc(motionById[state.motion].name.toLowerCase());
    clearBtn.hidden = !active;
    emptyEl.hidden = shown !== 0;
    labelFeet();
  }

  function clearFilters() {
    state.kinds = {}; state.q = '';
    $('#q').value = '';
    kindBtns.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
    if (state.role !== 'all') { setRole('all'); } else { applyFilters(); }
  }

  kindBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-kind');
      state.kinds[k] = !state.kinds[k];
      b.setAttribute('aria-pressed', state.kinds[k] ? 'true' : 'false');
      applyFilters();
    });
  });
  $('#q').addEventListener('input', function (e) { state.q = e.target.value; applyFilters(); });
  $('#q-form').addEventListener('submit', function (e) { e.preventDefault(); });
  clearBtn.addEventListener('click', clearFilters);
  $('#sk-empty-clear').addEventListener('click', clearFilters);
  $('#sk-open').addEventListener('click', function () { rows.forEach(function (el) { if (!el.hidden) { el.open = true; } }); });
  $('#sk-close').addEventListener('click', function () { rows.forEach(function (el) { el.open = false; }); });

  // The foot of an open skill: step to the one before or after, or close it. Either way the reader keeps
  // their place: the row they land on is put at the top and handed the focus.
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-step],[data-shut]') : null;
    if (!b) { return; }
    var el = document.getElementById('skill-' + (b.getAttribute('data-of') || b.getAttribute('data-shut')));
    if (!el) { return; }
    var land = el;
    if (b.hasAttribute('data-step')) {
      var vis = visibleRows();
      land = vis[vis.indexOf(el) + Number(b.getAttribute('data-step'))];
      if (!land) { return; }
      land.open = true;
      try { window.history.replaceState(null, '', '#' + land.id); } catch (err) { /* the address is a convenience */ }
    }
    el.open = false;
    var sum = $('summary', land);
    focusQuiet(sum);
    try { sum.scrollIntoView({ behavior: 'instant', block: b.hasAttribute('data-step') ? 'start' : 'center' }); } catch (err2) { sum.scrollIntoView(); }
  });

  // The same foot on a ChatGPT for Sales skill: its list has no filters, so the neighbours are fixed.
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-gstep],[data-gshut]') : null;
    if (!b) { return; }
    var el = document.getElementById('gpt-' + (b.getAttribute('data-of') || b.getAttribute('data-gshut')));
    if (!el) { return; }
    var land = el;
    if (b.hasAttribute('data-gstep')) {
      land = document.getElementById('gpt-' + b.getAttribute('data-gstep'));
      if (!land) { return; }
      land.open = true;
      try { window.history.replaceState(null, '', '#' + land.id); } catch (err) { /* the address is a convenience */ }
    }
    el.open = false;
    var sum = $('summary', land);
    focusQuiet(sum);
    try { sum.scrollIntoView({ behavior: 'instant', block: b.hasAttribute('data-gstep') ? 'start' : 'center' }); } catch (err2) { sum.scrollIntoView(); }
  });

  /* ---------------------------------------------------------------- the skills list: the run card */
  // Three conditions change what to say and what to hand over: whether Claude can reach the skill's tools,
  // whose book the request covers, and whether it runs on request or on a schedule.
  var runCards = $$('.run');
  var atEls = $$('[data-at]');
  var LEVEL_NAME = { 3: 'Inputs in place', 2: 'Works, with gaps', 1: 'From files', 0: 'Little to read' };
  var TOOL_SWITCHES = D.switches.filter(function (x) { return x.group === 'tools'; }).map(function (x) { return x.k; });

  function markSlots(text) { return esc(text).replace(/\[([^\]]+)\]/g, '<span class="slot">[$1]</span>'); }
  function setRun(card, name, v) {
    $$('[data-set="' + name + '"]', card).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-v') === v ? 'true' : 'false'); });
  }
  function renderRun(card) {
    var st = {};
    $$('[data-set][aria-pressed="true"]', card).forEach(function (b) { st[b.getAttribute('data-set')] = b.getAttribute('data-v'); });
    var say = $('.sayt[id]', card);
    var key = (st.scope === 'team' && st.time === 'sched') ? 'both' : (st.scope === 'team' ? 'team' : (st.time === 'sched' ? 'sched' : 'base'));
    var html = markSlots(say.getAttribute('data-' + key) || say.getAttribute('data-base'));
    if (say.innerHTML !== html) { say.innerHTML = html; }
    $$('[data-when]', card).forEach(function (el) {
      var w = el.getAttribute('data-when');
      el.hidden = w === 'sched' ? st.time !== 'sched' : w !== st.src;
    });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.run [data-set]') : null;
    if (!b) { return; }
    var card = b.closest('.run');
    setRun(card, b.getAttribute('data-set'), b.getAttribute('data-v'));
    if (b.getAttribute('data-set') === 'src') { card.setAttribute('data-touched', '1'); }
    renderRun(card);
  });
  // Each card starts from the reader's readiness settings: on files when Claude cannot reach the skill's tools.
  function syncRun(match) {
    var anyTool = TOOL_SWITCHES.some(function (k) { return sw[k]; });
    var sketch = match ? D.presets.filter(function (x) { return x.k === match; })[0].name : '';
    var from = sketch ? 'These are the settings of the sketch \u201C' + esc(sketch) + '\u201D.' : 'These are your own settings.';
    runCards.forEach(function (card) {
      var s = byId[card.getAttribute('data-run')], r = evalSkill(s);
      if (!card.hasAttribute('data-touched')) { setRun(card, 'src', (s.tool.length ? r.toolOk : anyTool) ? 'conn' : 'files'); }
      renderRun(card);
    });
    atEls.forEach(function (el) {
      var s = byId[el.getAttribute('data-at')], r = evalSkill(s);
      el.innerHTML = '<strong>' + LEVEL_NAME[r.lvl] + '.</strong> ' + esc(reason(s, r)) + ' <span class="note">' + from + ' <a href="#readiness">Change them</a>.</span>';
    });
  }

  /* ---------------------------------------------------------------- fit: the role rows */
  var roleRows = $$('.rolerow');
  function renderRoles() {
    if (state.role === 'all') { return; }
    roleRows.forEach(function (r) { r.open = r.getAttribute('data-role') === state.role; });
  }
  // "What to configure first for this role" carries the row's role into the guide.
  roleRows.forEach(function (r) {
    var a = $('.go a', r);
    if (a) { a.addEventListener('click', function () { setRole(r.getAttribute('data-role')); }); }
  });

  /* ---------------------------------------------------------------- fit: the grid */
  function renderMatrix() {
    var m = state.motion;
    var cells = {};
    $$('.mx .cell').forEach(function (c) {
      $$('.chip', c).forEach(function (x) { x.parentNode.removeChild(x); });
      cells[c.getAttribute('data-v') + '-' + c.getAttribute('data-f')] = c;
    });
    var counts = [0, 0, 0, 0];
    var start = [], fallback = [], rule = [];
    D.skills.forEach(function (s) {
      if (!s.seg) { return; }
      var v = s.seg[m][0], f = s.seg[m][1];
      var off = state.role !== 'all' && s.roles[state.role] === 0;
      cells[v + '-' + f].insertAdjacentHTML('beforeend', chip(s, off));
      counts[v] += 1;
      if (off) { return; }
      if (v === 3 && f >= 3 && s.cls === 'R') { start.push(s); }
      if (v === 2 && f >= 3 && s.cls === 'R') { fallback.push(s); }
      if (v >= 2 && s.ov === 2) { rule.push(s); }
    });
    $$('.mx .cell').forEach(function (c) { c.classList.toggle('e', !$('.chip', c)); });
    $$('.mx .ql').forEach(function (q) {
      var any = $$('.mx .cell.q-' + q.getAttribute('data-q')).some(function (c) { return !c.classList.contains('e'); });
      $('.none', q).hidden = any;
    });
    // Where nothing marked Reads and proposes is core for the motion, fall back to what is useful, and say so.
    var startNote = 'Core for this motion, used weekly or daily and marked Reads and proposes.';
    if (!start.length && fallback.length) {
      start = fallback;
      startNote = 'No skill marked Reads and proposes is core here. These are useful, used weekly or daily and carry that marking.';
    }
    $('#pilot-start-note').textContent = startNote;
    var mo = motionById[m];
    $('#mo-name').textContent = mo.name;
    $('#mo-note').textContent = mo.note;
    $('#mo-eg').textContent = mo.desc + ' ' + mo.eg + '.';
    $('#mx-sum').textContent = mo.name + ': ' + counts[3] + ' core, ' + counts[2] + ' useful, ' + counts[1] + ' occasional and ' + counts[0] + ' a poor fit.' +
      (state.role !== 'all' ? ' Skills outside the chosen role, ' + roleById[state.role].name + ', are muted.' : '');
    var none = 'None at this setting.';
    $('#pilot-start').innerHTML = start.length ? start.map(function (s) { return chip(s, false); }).join('') : none;
    $('#pilot-rule').innerHTML = rule.length ? rule.map(function (s) { return chip(s, false); }).join('') : none;
  }

  /* ---------------------------------------------------------------- fit: through the week */
  var cadEls = $$('[data-cad]'), routineEls = $$('.routine');
  function renderWeek() {
    var m = state.motion, lists = { 1: [], 2: [], 3: [], 4: [], ev: [] }, n = 0;
    D.skills.forEach(function (s) {
      if (!s.seg || s.seg[m][0] < 2 || (state.role !== 'all' && s.roles[state.role] === 0)) { return; }
      lists[s.ev ? 'ev' : s.seg[m][1]].push(chip(s, false));
      n += 1;
    });
    cadEls.forEach(function (el) {
      var l = lists[el.getAttribute('data-cad')];
      el.innerHTML = l.length ? l.join('') : 'None at this setting.';
    });
    $('#cad-sum').textContent = n + ' skills rated core or useful for ' + motionById[m].name.toLowerCase() +
      (state.role !== 'all' ? ', for the role ' + roleById[state.role].name : ', across every role') + '.';
    var shown = 0;
    routineEls.forEach(function (el) {
      var ok = state.role === 'all' || (' ' + el.getAttribute('data-roles') + ' ').indexOf(' ' + state.role + ' ') !== -1;
      el.hidden = !ok;
      if (ok) { shown += 1; }
    });
    $('#rt-sum').textContent = state.role === 'all' ? '' : 'Showing ' + shown + ' of ' + routineEls.length + ' routines for the role ' + roleById[state.role].name + '.';
  }

  /* ---------------------------------------------------------------- before rollout: the readiness check */
  var boxes = $$('.sw input');
  var sw = {};
  var LEVELS = [3, 2, 1, 0];
  var LEVEL_SAY = { 3: 'with inputs in place', 2: 'with gaps', 1: 'from files', 0: 'with little to read' };

  function readSwitches() { boxes.forEach(function (b) { sw[b.getAttribute('data-k')] = b.checked; }); }

  function evalSkill(s) {
    var missCore = s.core.filter(function (k) { return !sw[k]; });
    var gaps = s.adds.filter(function (k) { return !sw[k]; });
    var toolOk = s.tool.length === 0 || s.tool.some(function (k) { return sw[k]; });
    var lvl = missCore.length ? 0 : (!toolOk ? 1 : (gaps.length ? 2 : 3));
    return { lvl: lvl, missCore: missCore, gaps: gaps, toolOk: toolOk };
  }

  function reason(s, r) {
    var labels = function (keys) { return join(keys.map(function (k) { return (s.as && s.as[k]) || swLabel[k]; })); };
    if (r.lvl === 0) { return 'Built around ' + labels(r.missCore) + ', which you do not keep.'; }
    if (r.lvl === 3) { return 'The kinds of input you ticked are in place.'; }
    var needed = r.gaps.filter(function (k) { return s.must.indexOf(k) !== -1; });
    var quiet = s.quiet || [];
    var decisions = r.gaps.filter(function (k) { return swGroup[k] === 'decisions' && s.must.indexOf(k) === -1 && quiet.indexOf(k) === -1; });
    var others = r.gaps.filter(function (k) { return (swGroup[k] !== 'decisions' || quiet.indexOf(k) !== -1) && !(r.lvl === 1 && s.tool.indexOf(k) !== -1); });
    var out = [];
    if (r.lvl === 1) {
      out.push('Claude cannot reach ' + join(s.tool.map(function (k) { return swLabel[k]; }), 'or') + '. It works from an export or from what you paste.');
    }
    if (others.length) { out.push('Would also use ' + labels(others) + '.'); }
    if (needed.length) { out.push('Needs ' + labels(needed) + ', and will ask once.'); }
    if (decisions.length) { out.push('Without ' + labels(decisions) + ', it reads what it can from your tools or uses a labeled default, and asks only if the answer changes the result.'); }
    return out.join(' ');
  }

  function renderFit() {
    readSwitches();
    var buckets = { 0: [], 1: [], 2: [], 3: [] };
    D.skills.forEach(function (s) {
      var r = evalSkill(s);
      buckets[r.lvl].push(r.lvl === 3 ? '<li>' + chip(s, false) + '</li>'
        : '<li>' + chip(s, false) + '<span>' + esc(reason(s, r)) + '</span></li>');
    });
    var say = [];
    LEVELS.forEach(function (l) {
      $('#t' + l).textContent = buckets[l].length;
      $('#p' + l).textContent = buckets[l].length;
      $('#lv' + l).innerHTML = buckets[l].length ? buckets[l].join('') : '<li class="nil">None at these settings.</li>';
      say.push(buckets[l].length + ' ' + LEVEL_SAY[l]);
    });
    $('#rd-say').textContent = 'Skills at these settings: ' + join(say) + '.';
    var match = null;
    D.presets.forEach(function (p) {
      var same = Object.keys(p.on).every(function (k) { return p.on[k] === !!sw[k]; });
      if (same && !match) { match = p.k; }
    });
    $$('[data-preset]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-preset') === match ? 'true' : 'false'); });
    store.set('sw', sw);
    syncRun(match);
  }

  function applyPreset(key) {
    var p = D.presets.filter(function (x) { return x.k === key; })[0];
    if (!p) { return; }
    boxes.forEach(function (b) { b.checked = !!p.on[b.getAttribute('data-k')]; });
    renderFit();
  }

  boxes.forEach(function (b) { b.addEventListener('change', renderFit); });
  $$('[data-preset]').forEach(function (b) { b.addEventListener('click', function () { applyPreset(b.getAttribute('data-preset')); }); });

  // On a narrow screen the results sit below the switches. A small bar keeps the four counts in view
  // while the switches are on screen and the results are not.
  var pin = $('#rdpin'), swEl = $('#switches'), resEl = $('#rd-results');
  if (pin && swEl && resEl && 'IntersectionObserver' in window) {
    var seen = { sw: false, res: false };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.target === swEl) { seen.sw = en.isIntersecting; } else { seen.res = en.isIntersecting; } });
      var on = seen.sw && !seen.res;
      pin.classList.toggle('on', on);
      pin.setAttribute('aria-hidden', on ? 'false' : 'true');
      $('a', pin).tabIndex = on ? 0 : -1;
    });
    io.observe(swEl); io.observe(resEl);
  }

  /* ---------------------------------------------------------------- configure: facts, copy buttons, film, contents */
  var factList = $('#fact-list');
  var factRows = $$('.fact', factList);
  var factNote = $('#fact-note');
  function renderFacts() {
    var g = state.role === 'all' ? null : roleById[state.role].guide;
    $$('.rolecard').forEach(function (c) { c.classList.toggle('on', !!g && c.getAttribute('data-grole') === g); });
    if (!g || g === 'ops') {
      factList.classList.remove('pick');
      factRows.forEach(function (r) { r.classList.remove('hit'); });
      factNote.textContent = g === 'ops' ? 'Revenue operations owns every row.' : '';
      return;
    }
    var n = 0;
    factRows.forEach(function (r) {
      var hit = (' ' + r.getAttribute('data-roles') + ' ').indexOf(' ' + g + ' ') !== -1;
      r.classList.toggle('hit', hit);
      if (hit) { n += 1; }
    });
    factList.classList.add('pick');
    factNote.textContent = (WORDS[n] || n) + ' of the ' + factRows.length + ' facts come first for the role you chose, ' + roleById[state.role].name + '. They carry a lime mark.';
  }

  // Checklist: ticks are a convenience kept in this browser, and the page works without them.
  var ticks = store.get('facts') || {};
  var tickBoxes = $$('input[type="checkbox"]', factList), doneCount = $('#done-count');
  function tally() { doneCount.textContent = tickBoxes.filter(function (b) { return b.checked; }).length; }
  tickBoxes.forEach(function (b) {
    b.checked = !!ticks[b.id];
    b.addEventListener('change', function () { ticks[b.id] = b.checked; store.set('facts', ticks); tally(); });
  });
  tally();

  // Copy buttons. If the browser refuses, select the text so the reader can copy it by hand.
  function flash(btn, word) {
    if (!btn.getAttribute('data-label')) { btn.setAttribute('data-label', btn.textContent); }
    btn.textContent = word; btn.classList.add('is-done');
    window.setTimeout(function () { btn.textContent = btn.getAttribute('data-label'); btn.classList.remove('is-done'); }, 1900);
  }
  function selectNode(node) {
    try { var r = document.createRange(); r.selectNodeContents(node); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); } catch (e) { /* nothing to select with */ }
  }
  $$('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = document.getElementById(btn.getAttribute('data-copy')), text;
      try { text = src.tagName === 'SCRIPT' ? JSON.parse(src.textContent) : src.textContent; } catch (e) { text = src.textContent; }
      text = text.replace(/\s+$/, '') + '\n';
      var fallback = function () {
        var box = btn.getAttribute('data-fallback') && document.getElementById(btn.getAttribute('data-fallback'));
        if (box) { box.hidden = false; box.value = text; box.focus(); box.select(); } else { selectNode(src); }
        flash(btn, 'Selected: now copy');
      };
      try { navigator.clipboard.writeText(text).then(function () { flash(btn, 'Copied'); }, fallback); } catch (e) { fallback(); }
    });
  });

  // If the film cannot load, say so instead of leaving a dead player.
  var film = $('#film');
  if (film) { film.addEventListener('error', function () { film.classList.add('failed'); }, true); }

  // Contents for the guide: mark the section being read, and fold the narrow-screen list after a choice.
  var cfg = viewByName.configure;
  var tocLinks = $$('.toc a'), heads = $$('.art > h2[id], .art > .hand[id]', cfg);
  if (tocLinks.length && heads.length) {
    var tick = false, cur = '';
    var mark = function () {
      tick = false;
      if (!cfg.classList.contains('on')) { return; }
      var id = heads[0].id;
      for (var i = 0; i < heads.length; i += 1) { if (heads[i].getBoundingClientRect().top <= 150) { id = heads[i].id; } else { break; } }
      if (id === cur) { return; }
      cur = id;
      tocLinks.forEach(function (a) { if (a.getAttribute('href') === '#' + id) { a.setAttribute('aria-current', 'true'); } else { a.removeAttribute('aria-current'); } });
    };
    window.addEventListener('scroll', function () { if (!tick) { tick = true; window.requestAnimationFrame(mark); } }, { passive: true });
    window.addEventListener('hashchange', function () { window.requestAnimationFrame(mark); });
    mark();
  }
  $$('.tocm a').forEach(function (a) { a.addEventListener('click', function () { a.closest('details').open = false; }); });

  /* ---------------------------------------------------------------- start */
  var savedRole = store.get('role'), savedMotion = store.get('motion');
  if (typeof savedMotion === 'string' && motionById[savedMotion]) { state.motion = savedMotion; }
  if (typeof savedRole === 'string' && roleById[savedRole]) { state.role = savedRole; }
  $$('[data-pick="role"]').forEach(function (s) { s.value = state.role; });
  $$('[data-pick="motion"]').forEach(function (s) { s.value = state.motion; });
  var savedSw = store.get('sw');
  if (savedSw && typeof savedSw === 'object') {
    boxes.forEach(function (b) { var k = b.getAttribute('data-k'); if (typeof savedSw[k] === 'boolean') { b.checked = savedSw[k]; } });
  }
  applyFilters(); renderRoles(); renderMatrix(); renderWeek(); renderFacts();
  if (savedSw && typeof savedSw === 'object') { renderFit(); } else { applyPreset('ent'); }

  // Links that carry #section. The host can show this page narrow at first and then widen it, which leaves the
  // first jump far off. Go to the section again while the layout settles, unless the reader has started to scroll.
  var landed = route(false);
  if (landed) {
    var moved = false, until = Date.now() + 3000;
    ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (ev) {
      window.addEventListener(ev, function () { moved = true; }, { passive: true });
    });
    var settle = function () { if (!moved && Date.now() <= until && landed.isConnected) { jump(landed); } };
    window.addEventListener('load', settle);
    window.addEventListener('resize', settle);
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(settle); }
    [300, 900, 1800, 2600].forEach(function (ms) { window.setTimeout(settle, ms); });
  }
}());
