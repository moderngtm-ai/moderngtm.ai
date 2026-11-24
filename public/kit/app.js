{
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safe=f=>{try{f()}catch(e){console.error(e)}};
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const usd=(x,d=0)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:d,maximumFractionDigits:d}).format(x);
const num=x=>new Intl.NumberFormat('en-US').format(Math.round(x));
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const fmtDate=d=>{const p=String(d).split('-');return p.length===3?`${MONTHS[p[1]-1]} ${+p[2]}, ${p[0]}`:String(d)};
const list=a=>a.length<2?a.join(''):a.slice(0,-1).join(', ')+' and '+a.at(-1);

/* ---------- views */
const views=$$('[data-view]');
const NAV={report:'research',contribute:'about'};
const show=(view,el,user)=>{
 views.forEach(v=>v.classList.toggle('on',v===view));
 const cur=NAV[view.dataset.view]||view.dataset.view;
 $$('.nav a').forEach(a=>{if(a.getAttribute('href')==='#'+cur)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 if(el===view)scrollTo(0,0);else el.scrollIntoView();
 if(user){const h=$('h1',view);if(h){h.tabIndex=-1;h.focus({preventScroll:true})}}
};
const route=user=>{
 let id='';try{id=decodeURIComponent(location.hash.slice(1))}catch(e){}
 const el=id&&document.getElementById(id);
 if(!el){show(views[0],views[0],user);return}
 const view=el.closest('[data-view]');
 if(view)show(view,el,user);
};
addEventListener('hashchange',()=>route(true));
route(false);

/* ---------- register data */
let REG=[];
try{REG=JSON.parse($('#regData').textContent)}catch(e){REG=[]}
const basisOf=r=>{const b=r[3].toLowerCase();return b.startsWith('observed')?'Observed':b.startsWith('forecast')?'Forecast':b.startsWith('estimated')?'Estimated':'Self-reported'};
const gcls=g=>g==='A'?'A':g==='B'?'B':g==='C'?'C':'x';

/* ---------- the score */
safe(()=>{
 const el=$('#score');if(!el)return;
 const ST=['Signal','Qualify','Meet','Close','Adopt','Renew'];
 const LN=[['Lead agent',1],['Seller',0],['Research agent',1],['Customer success',0],['Support agent',1]];
 const NT=[[0,.12,1.85,'Qualify every inbound lead','Qualify'],[2,.95,2.45,'Account brief','Brief'],[1,2.05,3.95,'Discovery to signature','Discovery'],[3,4.05,5.9,'Onboard, adopt, renew','Onboard'],[4,4.2,5.15,'Routine tickets','Tickets'],[2,4.6,5.4,'Value readout','Readout']];
 /* a tie: from lane, to lane, stage position, where the work sits when nobody owns the handoff, label on the left, the tool that is (0 CRM, 1 inbox, 2 support desk). The steps under the score walk through the first four. */
 const TI=[[0,1,1.95,'In the CRM queue',0,0],[2,1,2.65,'In an inbox',0,1],[1,3,4,'In the seller’s email',1,1],[4,3,5.35,'In the support queue',1,2],[2,3,5.6,'',0,1]];
 const CAP=['An illustration of what we expect, not a measured result. The same agents do the same work, and each leaves its result in its own tool. No one has decided who takes it next, by when or with what context.','An illustration of what we expect, not a measured result. One revenue process played by agents and people, with every handoff written down and one shared record underneath.'];
 const ARIA=['One revenue process across six stages, with agents added and nobody owning the handoffs. A lead agent, a research agent and a support agent each finish their own work and leave the result in their own tool. A qualified lead sits in the CRM queue, an account brief in an inbox, the seller’s commitments in the seller’s email and an escalation in the support queue. Each tool keeps its own record. The steps under the picture follow each handoff.','One revenue process across six stages: signal, qualify, meet, close, adopt and renew. A lead agent qualifies inbound leads and hands them to a seller. A research agent prepares account briefs and value readouts. The seller hands the customer to customer success, and a support agent handles routine tickets and escalates to the account owner, shown here in customer success. All of them work from one shared record with controls. The steps under the picture follow each handoff.'];
 const steps=$('#scSteps'),ctl=$('#scCtl'),nEl=$('#scN'),play=$('#scPlay'),BEATS=steps?steps.children.length:0,DUR=4600;
 let on=true,beat=0,playing=!reduce,timer=0;
 const draw=()=>{
  const W=el.clientWidth,H=el.clientHeight;if(!W||!H)return;
  const nar=W<600,L=nar?0:168,R=6,T=30,B=nar?46:54;
  const cw=(W-L-R)/6,lh=(H-T-B)/LN.length,bh=nar?14:28,dx=Math.min(cw*.12,22);
  const X=s=>L+s*cw,Y=i=>T+lh*(i+.5)+(nar?8:0);
  let g='',lb='',hi='',tok='',park=-1;
  for(let i=0;i<=6;i++)g+=`<line x1="${X(i)}" y1="${T-6}" x2="${X(i)}" y2="${H-B+6}" class="sc-col"/>`;
  ST.forEach((s,i)=>{g+=`<text x="${X(i+.5)}" y="${T-13}" text-anchor="middle" class="sc-stage">${s}</text>`});
  LN.forEach((l,i)=>{const y=Y(i);g+=`<line x1="${L}" y1="${y}" x2="${W-R}" y2="${y}" class="sc-lane"/><text x="0" y="${nar?y-bh/2-6:y+5}" class="sc-name ${l[1]?'a':'p'}">${l[0]}</text>`});
  const hr=bh/2,near=(lane,s)=>NT.filter(n=>n[0]===lane).map(n=>[s<n[1]?n[1]-s:s>n[2]?s-n[2]:0,n]).sort((p,q)=>p[0]-q[0])[0][1];
  /* a tie leaves the source pill on its outline (from the tip when the handoff comes at the pill's end) and lands on the flat of the target */
  const geo=(a,b,s)=>{
   const A=near(a,s),B=near(b,s),d=Y(b)>Y(a)?1:-1;
   const x2=Math.min(Math.max(X(s)+dx,X(B[1])+hr+2),X(B[2])-hr-2),y2=Y(b)-d*(hr+4);
   const tip=X(s)-dx>X(A[2])-hr-1;
   const x1=tip?X(A[2]):Math.min(X(s)-dx,X(A[2])-hr-2),y1=tip?Y(a):Y(a)+d*hr;
   const c=tip?[x1+(x2-x1)*.9,y1,x2,y1+(y2-y1)*.3]:[x1,(y1+y2)/2,x2,(y1+y2)/2];
   const mx=(x1+3*c[0]+3*c[2]+x2)/8,my=(y1+3*c[1]+3*c[3]+y2)/8;
   /* half: the first half of the same curve, for work that leaves an agent and stops short of a person */
   return {x1,y1,x2,y2,tip,B,c:`C${c[0]} ${c[1]} ${c[2]} ${c[3]} ${x2} ${y2}`,mx,my,half:`C${(x1+c[0])/2} ${(y1+c[1])/2} ${(x1+2*c[0]+c[2])/4} ${(y1+2*c[1]+c[3])/4} ${mx} ${my}`};
  };
  const ride=p=>`<animateMotion dur=".9s" fill="freeze" path="${p}" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/>`;
  TI.forEach(([a,b,s,why,left,tool],k)=>{
   const t=geo(a,b,s),p=`M${t.x1} ${t.y1} ${t.c}`,act=k===beat&&k<BEATS;
   if(on){
    g+=`<path d="${p}" class="sc-tie" marker-end="url(#sca)"/>`;
    if(act){
     /* the handoff being told: the tie lights, the work rides it and the receiving pill is ringed */
     hi+=`<path d="${p}" pathLength="1" class="sc-run"/><rect x="${X(t.B[1])-4}" y="${Y(b)-bh/2-4}" width="${X(t.B[2])-X(t.B[1])+8}" height="${bh+8}" rx="${bh/2+4}" class="sc-ring"/>`;
     if(!reduce)tok=`<circle r="6" class="sc-tok">${ride(p)}<animate attributeName="opacity" values="1;1;0" keyTimes="0;.82;1" dur="1.1s" fill="freeze"/></circle>`;
    }
   }else{
    g+=`<path d="${p}" class="sc-tie x"/>`;
    if(why&&cw>150)lb+=`<text x="${left?Math.min(t.x1,t.x2)-14:Math.max(t.x1,t.x2)+14}" y="${t.y1+(t.y2-t.y1)*(t.tip&&left?(t.y2<t.y1?.8:.72):.5)+4.5}"${left?' text-anchor="end"':''} class="sc-why">${why}</text>`;
    if(act){
     /* nobody owns this handoff: the work leaves the agent, stops halfway and waits in the agent's own tool */
     const h=`M${t.x1} ${t.y1} ${t.half}`;
     hi+=`<path d="${h}" pathLength="1" class="sc-run x"/>`;
     tok=reduce?`<circle cx="${t.mx}" cy="${t.my}" r="6" class="sc-tok park"/>`:`<circle r="6" class="sc-tok park">${ride(h)}</circle>`;
     park=tool;
    }
   }
  });
  NT.forEach(([i,a,b,t,s])=>{
   const x=X(a),w=X(b)-X(a),y=Y(i)-bh/2;
   g+=`<rect x="${x}" y="${y}" width="${w}" height="${bh}" rx="${bh/2}" class="sc-bar ${LN[i][1]?'a':'p'}"/>`;
   if(!nar){const lab=t.length*7.4+26<w?t:(s.length*7.4+26<w?s:'');if(lab)lb+=`<text x="${x+13}" y="${y+bh/2+4.5}" class="sc-in">${lab}</text>`}
  });
  const by=H-B+18,bhh=B-22,bw=W-L-R;
  if(on){
   const bt=W<780?'Shared context and controls':'Shared context and controls: accounts, commitments, permissions, evaluations, unit costs';
   g+=`<rect x="${L}" y="${by}" width="${bw}" height="${bhh}" rx="6" class="sc-bed"/><text x="${L+13}" y="${by+bhh/2+4.5}" class="sc-bedt">${bt}</text>`;
   if(beat<BEATS)hi+=`<rect x="${L}" y="${by}" width="${bw}" height="${bhh}" rx="6" class="sc-bedhi"/>`;
  }else{
   const parts=['CRM','Inbox','Support desk'],gap=12,pw=(bw-gap*2)/3;
   parts.forEach((t,i)=>{const x=L+i*(pw+gap);g+=`<rect x="${x}" y="${by}" width="${pw}" height="${bhh}" rx="6" class="sc-bed x"/><text x="${x+13}" y="${by+bhh/2+4.5}" class="sc-bedt">${t}</text>`;if(i===park)hi+=`<rect x="${x}" y="${by}" width="${pw}" height="${bhh}" rx="6" class="sc-bedhi x"/>`});
  }
  el.innerHTML=`<svg viewBox="0 0 ${W} ${H}" aria-hidden="true"><defs><marker id="sca" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" class="sc-arr"/></marker></defs>${g}${hi}${tok}${lb}</svg>`;
 };
 /* the steps: one line at a time, in step with the picture */
 const say=()=>{if(!BEATS)return;[...steps.children].forEach((li,i)=>li.classList.toggle('cur',i===beat));steps.dataset.on=on?'1':'0';nEl.textContent=`${beat+1} of ${BEATS}`};
 const go=b=>{beat=(b+BEATS)%BEATS;say();draw()};
 const run=()=>{clearInterval(timer);if(playing&&BEATS)timer=setInterval(()=>{if(el.clientWidth&&!document.hidden)go(beat+1)},DUR)};
 const setPlay=v=>{playing=v;play.textContent=v?'Pause':'Play';steps.setAttribute('aria-live',v?'off':'polite');run()};
 const set=v=>{on=v;$('#scOn').setAttribute('aria-pressed',String(v));$('#scOff').setAttribute('aria-pressed',String(!v));$('#scCap').textContent=CAP[+v];el.setAttribute('aria-label',ARIA[+v]);beat=0;say();draw();run()};
 $('#scOn').addEventListener('click',()=>set(true));
 $('#scOff').addEventListener('click',()=>set(false));
 if(BEATS){
  steps.classList.add('live');ctl.hidden=false;
  $('#scPrev').addEventListener('click',()=>{setPlay(false);go(beat-1)});
  $('#scNext').addEventListener('click',()=>{setPlay(false);go(beat+1)});
  play.addEventListener('click',()=>setPlay(!playing));
  setPlay(playing);say();
 }
 el.setAttribute('aria-label',ARIA[1]);
 const scRO=new ResizeObserver(draw);
 scRO.observe(el);
});

/* ---------- evidence strip and summary */
safe(()=>{
 if(!REG.length)return;
 const ORD=['Self-reported','Observed','Forecast','Estimated'],GO={A:0,B:1,C:2};
 const groups=ORD.map(n=>[n,REG.filter(r=>basisOf(r)===n).sort((a,b)=>(GO[a[4]]??3)-(GO[b[4]]??3))]).filter(g=>g[1].length);
 const html=groups.map(([n,rs])=>`<div class="sg"><b>${n}<span>${rs.length}</span></b><div class="cells">${rs.map(r=>`<i class="cell ${gcls(r[4])}" title="${esc(r[0]+': '+r[1])}">${'ABC'.includes(r[4])?r[4]:'–'}</i>`).join('')}</div></div>`).join('');
 $$('[data-strip]').forEach(e=>{e.innerHTML=html});
});

/* ---------- charts */
const BARRIERS=[['Gartner: 210 CSOs and senior sales leaders, fielded January to February 2026',[['Report low reinvestment of the time AI saves',72]]],['LeanData: 157 GTM practitioners in its customer survey, May 2026',[['Say poor data quality degrades GTM execution',70],['Name bad data as a root cause of AI shortfalls',45],['Name undocumented processes as a root cause',37],['Name siloed teams as a root cause',32]]],['Seismic: 353 senior leaders, March–April 2026',[['Cite poor integration as a top obstacle to using current platforms fully',56]]],['Salesforce: sales leaders using AI, State of Sales 2026',[['Say tech silos delay or limit AI initiatives',51]]]];
const RATES=[['Klarna','80%','Customer service chats handled by its assistant, 2025. Annual report'],['Fiserv','Above 40%','Containment rate in its agentic call center, Q3 2026. Earnings call'],['FactSet','Over 30%','User-initiated requests resolved by its client assist agent without a person, quarter ended August 31, 2026. Earnings call'],['HubSpot','72%','Support tickets resolved by Customer Agent without human escalation, Q2 2026. Earnings call'],['Salesforce','64%','Help agent conversations resolved autonomously, reported August 26, 2026. Earnings call'],['Fin','76%','Average resolution rate across customers, public by June 9, 2026. Company posts'],['Vercel','91%','Support tickets automated, October 2026. Company post']];
const WORK=[['Shifted agents into new roles within service and support',71],['Froze hiring',45],['Moved agents to other business units',39],['Reduced agent headcount because of AI',21],['Used forced reductions',20],['Plan to rehire within 18 months',11],['Rehired after earlier reductions',7]];
const LEAD=[['Grew revenue by double digits',60,21],['Raised AI investment by double digits',71,25],['Report improved sales effectiveness',90,55],['Use one-to-one personalization',20,5]];
const row=(lab,v,txt,sub,cls)=>`<div class="row ${cls||''}"><div class="lab">${esc(lab)}${sub?`<small>${esc(sub)}</small>`:''}</div><div class="trk"><i style="width:${v}%"></i></div><b>${txt||v+'%'}</b></div>`;
const CH={
 barriers:()=>BARRIERS.map(g=>`<div class="grp"><p class="gh">${esc(g[0])}</p><div class="rows">${g[1].map(r=>row(r[0],r[1])).join('')}</div></div>`).join(''),
 rates:()=>`<div class="rows nb">${RATES.map(r=>`<div class="row"><div class="lab">${esc(r[0])}<small>${esc(r[2])}</small></div><b>${esc(r[1])}</b></div>`).join('')}</div>`,
 workforce:()=>`<div class="rows">${WORK.map((r,i)=>row(r[0],r[1],'','',i===0||i===3?'':'q')).join('')}</div><p class="note" style="margin:14px 0 0">Among those that cut headcount, the average cut was 16.7% over 18 months.</p>`,
 leaders:()=>LEAD.map(r=>`<div class="pair"><div class="lab">${esc(r[0])}</div><div class="pr"><span>Leaders</span><div class="trk"><i style="width:${r[1]}%"></i></div><b>${r[1]}%</b></div><div class="pr q"><span>Laggards</span><div class="trk"><i style="width:${r[2]}%"></i></div><b>${r[2]}%</b></div></div>`).join(''),
 usevs:()=>`<div class="grp"><p class="gh">Salesloft, a vendor: 500 U.S. revenue leaders at companies with 200+ employees, May–June 2026</p><div class="rows">${row('Use AI somewhere in the revenue process',100,'','','q')}${row('Call it production-ready, with measurable outcomes',20.6,'20.6%')}</div></div><div class="grp"><p class="gh">LeanData, a vendor: 157 GTM practitioners in its customer survey, May 2026</p><div class="rows">${row('Have at least one AI agent deployed',93,'','','q')}<div class="row"><div class="lab">Say their infrastructure is ready</div><div class="trk st"><i style="width:31%"></i><i class="s2" style="width:63%"></i><i class="s3" style="width:5%"></i></div><b>31%</b></div></div><p class="stl"><span>31% ready</span><span class="s2">63% somewhat ready</span><span class="s3">5% not ready</span></p></div>`,
 phases:()=>`<div class="phases"><article class="phase"><h3>Days 1 to 30: choose and baseline</h3><ul><li>Pick three to five high-volume workflows, each with one owner</li><li>Write down the best performer’s process</li><li>Baseline cost and quality on the same unit of work</li><li>Decide where freed time goes</li></ul></article><div class="gate"><span><b>1</b>Gate 1: baseline set and a comparison group in place</span></div><article class="phase"><h3>Days 31 to 60: build and shadow</h3><ul><li>Build with the top performer</li><li>Review every output and log each correction</li><li>Move fixed rules into code</li><li>Add cost caps and a rollback</li></ul></article><div class="gate"><span><b>2</b>Gate 2: the predeclared quality margin held over the minimum volume</span></div><article class="phase"><h3>Days 61 to 90: scale and redeploy</h3><ul><li>Step review down to samples</li><li>Widen to the whole workflow</li><li>Redeploy capacity as planned; reset quotas and comp plans</li><li>Report verified unit costs</li></ul></article></div><p class="thru"><b>Throughout:</b> AI fluency in every role, a GTM engineer, clean and connected data, and an owner and controls for every agent.</p>`
};
$$('[data-chart]').forEach(e=>safe(()=>{e.innerHTML=CH[e.dataset.chart]()}));

/* ---------- register */
safe(()=>{
 const body=$('#reg tbody');if(!body)return;
 const GR=['All','A','B','C','Context','Not used'];
 let grade='All';
 const BO={Observed:0,'Self-reported':1,Estimated:2,Forecast:3},GO={A:0,B:1,C:2,Context:3,'Not used':4};
 const ORD=REG.map((r,i)=>[r,i]).sort((a,b)=>(GO[a[0][4]]-GO[b[0][4]])||(BO[basisOf(a[0])]-BO[basisOf(b[0])])||(/vendor/i.test(a[0][3])-/vendor/i.test(b[0][3]))||(a[1]-b[1])).map(x=>x[0]);
 $('#gradeSeg').innerHTML=GR.map(g=>`<button type="button" data-g="${g}" aria-pressed="${g==='All'}">${g==='All'?'All grades':g}</button>`).join('');
 const draw=()=>{
  const q=$('#q').value.trim().toLowerCase(),b=$('#basis').value;
  const rows=ORD.filter(r=>(grade==='All'||r[4]===grade)&&(!b||basisOf(r).toLowerCase()===b)&&(!q||r.slice(0,5).join(' ').toLowerCase().includes(q)));
  body.innerHTML=rows.map(r=>`<tr><td data-l="Organization">${esc(r[0])}${r[6]?`<small class="by">Spotted by ${esc(r[6])}${r[10]?`, ${esc(r[10][0])}, <a href="${esc(r[10][2])}">${esc(r[10][1])}</a>`:''}</small>`:''}${r[7]?`<small class="by">Corrected ${fmtDate(r[7])}</small>`:''}</td><td data-l="Finding">${esc(r[1])}</td><td data-l="Population and period">${esc(r[2])}</td><td data-l="Basis">${esc(r[3])}</td><td data-l="Grade"><span class="mk mk-${gcls(r[4])}">${esc(r[4])}</span></td><td data-l="Source">${(r[5]||[]).map(s=>`<a href="${esc(s[1])}">${esc(s[0])}</a>`).join('')}</td></tr>`).join('');
  $('#regCount').textContent=`Showing ${rows.length} of ${REG.length} records`;
  $('#regEmpty').hidden=rows.length>0;
 };
 const setGrade=g=>{grade=g;$$('#gradeSeg button').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.g===g)));draw()};
 $('#gradeSeg').addEventListener('click',e=>{const t=e.target.closest('button');if(t)setGrade(t.dataset.g)});
 $('#q').addEventListener('input',draw);
 $('#basis').addEventListener('change',draw);
 draw();
});

/* ---------- contributions ledger */
safe(()=>{
 const el=$('#ledger');if(!el||!REG.length)return;
 let L={};try{L=JSON.parse($('#ledgerData').textContent)}catch(e){}
 const n=REG.length,by={},short=k=>k.replace(/ \(.*\)$/,'');REG.forEach(r=>{const k=r[6]||'Claude';by[k]=(by[k]||0)+1});
 const spot=Object.entries(by).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${v} by ${k==='Claude'?'Claude in research':/AI model/.test(k)?short(k)+' in an outside review':k+' in the field'}`);
 const rc=REG.filter(r=>r[8]).length,co=REG.filter(r=>r[7]).length,late=REG.filter(r=>r[7]&&L.rechecked&&r[7]>L.rechecked.on).length;
 const pr=(L.proposals||[]).map(p=>`${p.corrections+p.new_findings} from ${p.from} on ${fmtDate(p.on)}, `+(p.waiting?`of which ${p.accepted} were accepted and ${p.waiting} ${p.waiting===1?'waits on its source':'wait on their sources'}`:(p.accepted===p.corrections+p.new_findings?'all accepted':`of which ${p.accepted} were accepted`)));
 el.textContent=`${n} records. Spotted: ${list(spot)}. Compiled and checked against sources: all ${n} by Claude. `+(rc&&L.rechecked?`Rechecked: ${rc} by ${short(L.rechecked.by)} on ${fmtDate(L.rechecked.on)}. Corrected: ${co} rows in all${late?`, ${late} of them after that recheck`:''}. `:'')+`Edited: all ${n} by Nathan Fierley. Proposals from outside: ${pr.length?pr.join('; '):'none yet'}.`;
});

/* ---------- unit cost */
safe(()=>{
 const out=$('#uOut');if(!out)return;
 const EX={uN:10000,uC:6300,uV:88,uH:7.5,uR:6500,uI:4000,uRH:120,uRR:45};
 const ids=Object.keys(EX);
 const load=v=>ids.forEach(k=>{$('#'+k).value=v[k]});
 const calc=()=>{
  const v={};ids.forEach(k=>{const x=parseFloat($('#'+k).value);v[k]=isFinite(x)&&x>0?x:0});
  const N=v.uN,C=Math.min(v.uC,N),ver=Math.min(v.uV,100)/100,h=v.uH;
  if(!N||!h){out.innerHTML='<h3>Fully loaded cost per verified completion</h3><p class="warn">Enter the cases assigned and the cost for a person to handle one.</p>';return}
  const review=v.uRH*v.uRR,people=(N-C)*h,rework=C*(1-ver)*h;
  const total=v.uR+v.uI+review+people+rework,base=N*h,per=total/N,save=base-total,pct=save/base;
  const agent=v.uR+v.uI+review,r1=v.uR?C*h/v.uR:null,r1v=v.uR?C*ver*h/v.uR:null,r2=agent?C*ver*h/agent:null;
  const parts=[['Agent run cost',v.uR,'k1'],['Implementation',v.uI,'k2'],['Review',review,'k3'],['People, on cases the agent did not close',people,'k4'],['Rework, on closures that failed verification',rework,'k5']];
  const x=r=>r===null?'n/a':(r>=10?Math.round(r):r.toFixed(1))+'x';
  out.innerHTML=`<h3>Fully loaded cost per verified completion</h3><p class="note" style="margin:6px 0 0">Assumes every case is completed in the end, that closures failing verification are redone by a person and that review time is charged at the reviewer rate.</p>${v.uC>N?'<p class="warn">Agent closures cannot exceed cases assigned, so they are capped at that number.</p>':''}
  <div class="big"><div><span>With the agent</span><b>${usd(per,2)}</b></div><div><span>People only</span><b>${usd(h,2)}</b></div></div>
  <p class="delta"><b>${Math.abs(pct*100).toFixed(0)}% ${save>=0?'lower':'higher'}</b> modeled cost with the agent: ${usd(Math.abs(save))} a month${save>=0?'':' more'}.${save>=0?' It becomes cash only if the freed capacity is redeployed or removed.':''}</p>
  <div class="cbar" role="img" aria-label="Monthly cost with the agent, by component">${parts.filter(p=>p[1]>0).map(p=>`<i class="${p[2]}" style="flex:${p[1]}"></i>`).join('')}</div>
  <ul class="keyl">${parts.map(p=>`<li><i class="${p[2]}"></i><span>${p[0]}</span><b>${usd(p[1])}</b></li>`).join('')}</ul>
  <h3>Why headline numbers differ</h3>
  <ul class="why"><li><b>${x(r1)}</b>return on reported closures, run cost alone, as a headline would count it</li><li><b>${x(r1v)}</b>return on verified closures, run cost alone</li><li><b>${x(r2)}</b>return on verified closures, fully loaded</li><li><b>${(C/N*100).toFixed(0)}%</b>closed by the agent, as reported</li><li><b>${(C*ver/N*100).toFixed(0)}%</b>of assigned cases verified complete by the agent</li></ul>
  <p class="note" style="margin:0">Return is handling cost avoided, divided by what the agent costs. Published returns can count run cost only: Fiserv’s 5–10x is a return on token costs.</p>`;
 };
 load(Object.assign({},EX,store.get('mgtm-unit',{})));
 $('#uForm').addEventListener('input',()=>{const v={};ids.forEach(k=>{v[k]=$('#'+k).value});store.set('mgtm-unit',v);calc()});
 $('#uReset').addEventListener('click',()=>{load(EX);store.set('mgtm-unit',EX);calc()});
 calc();
});

/* ---------- agent charter */
safe(()=>{
 const form=$('#cForm');if(!form)return;
 const F=[['Agent','Inbound lead agent'],['Unit of work','One inbound demo request'],['Owner','Head of sales development'],['Approver','Chief revenue officer, for any change to scope, permissions or the cost cap'],['Freed capacity goes to','Outbound to target accounts'],['In scope','Research the company and contact, sort the lead into four routes (book a meeting, pass to a seller, nurture or decline), draft the reply',1],['Out of scope','Pricing, discounts, contract terms',1],['Never','Send without review during shadow mode; contact an account with an open support escalation',1],['Context','CRM account and contact records, product usage, approved messaging, routing rules',1],['Permissions','Read the CRM, write drafts and notes; no send rights until gate 2',1],['Escalate to a person when','The account is a named account or in an open opportunity, or the request is unclear',1],['Evaluation set','200 past requests with the route and reply the top SDR chose',1],['Quality margin','Meetings per eligible lead within 2 points of the human baseline',1],['Review','Every output until 2 weeks pass without a correction, then a 10% sample',1],['Cost cap','$600 a month in run costs, with an alert at $480',1],['Decision rule','Scale if the margin holds over 4 weeks and 1,000 leads. If the volume is short at day 90, hold and keep measuring. If the margin fails, stop',1]];
 const saved=store.get('mgtm-charter',null);
 form.innerHTML=F.map((f,i)=>`<label class="f${f[2]?' w':''}"><span>${f[0]}</span>${f[2]?`<textarea id="c${i}" rows="2"></textarea>`:`<input id="c${i}" type="text">`}</label>`).join('');
 const fill=vals=>F.forEach((f,i)=>{$('#c'+i).value=vals&&typeof vals[i]==='string'?vals[i]:f[1]});
 const text=()=>F.map((f,i)=>`${f[0]}: ${$('#c'+i).value.trim()||'(to decide)'}`).join('\n');
 const draw=()=>{$('#cText').textContent=text()};
 fill(Array.isArray(saved)&&saved.length===F.length?saved:null);draw();
 form.addEventListener('input',()=>{store.set('mgtm-charter',F.map((f,i)=>$('#c'+i).value));draw()});
 $('#cReset').addEventListener('click',()=>{fill(null);store.set('mgtm-charter',null);draw();$('#cMsg').textContent='Reset to the example.'});
});

/* ---------- forms have nowhere to submit */
$$('form').forEach(f=>f.addEventListener('submit',e=>e.preventDefault()));

/* ---------- copy buttons */
$$('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{
 const src=$(b.dataset.copy),msg=$(b.dataset.msg||'#cMsg');
 try{await navigator.clipboard.writeText(src.textContent);if(msg)msg.textContent='Copied.'}
 catch(e){const r=document.createRange();r.selectNodeContents(src);const s=getSelection();s.removeAllRanges();s.addRange(r);if(msg)msg.textContent='Selected. Press Ctrl or Cmd and C to copy.'}
}));

/* ---------- checklist */
safe(()=>{
 const boxes=$$('#kList input');if(!boxes.length)return;
 const pre=boxes.filter(b=>!('during' in b.dataset)),dur=boxes.filter(b=>'during' in b.dataset);
 const saved=store.get('mgtm-check',null),start=Array.isArray(saved)&&saved.length===boxes.length?saved:[1,1,1,0,1,1,0,0,0,0,0,0,0,0,0];
 boxes.forEach((b,i)=>{b.checked=!!start[i]});
 if(saved)$('#kNote').textContent='Your ticks are kept in this browser. They are your own report, and nothing checks them.';
 const upd=()=>{const a=pre.filter(b=>b.checked).length,d=dur.filter(b=>b.checked).length;$('#kBar').style.width=((a+d)/boxes.length*100)+'%';$('#kCount').textContent=a===pre.length?`All ${a} in place before shadow mode, by your own ticks; ${d} of ${dur.length} holding during it`:`${a} of ${pre.length} in place before shadow mode`};
 boxes.forEach(b=>b.addEventListener('change',()=>{store.set('mgtm-check',boxes.map(x=>x.checked?1:0));$('#kNote').textContent='Your ticks are kept in this browser. They are your own report, and nothing checks them.';upd()}));
 $('#kReset').addEventListener('click',()=>{boxes.forEach(b=>{b.checked=false});store.set('mgtm-check',boxes.map(()=>0));upd()});
 upd();
});

/* ---------- maturity check */
safe(()=>{
 const rub=$('#rubric');if(!rub)return;
 const LV=['Manual','Assisted','Redesigned','Orchestrated'];
 const D=[
  ['Workflows',['People use AI tools on their own; no workflow is owned.','AI assists people inside existing workflows; pilots have sponsors but no defined unit of work.','Three to five workflows are rebuilt, each with a unit of work and one owner.','Workflows run end to end across agents and people, with designed handoffs.'],['Name three to five high-volume workflows and give each one owner.','Define the unit of work for each pilot: a lead, a ticket, a renewal.','Map the handoffs between agents and people and design them on purpose.']],
  ['Context and data',['Agents and people work from different, partial records.','Key fields are cleaned by hand for each pilot.','A shared record of accounts, history and permissions feeds every agent.','Commitments and outcomes are kept current and read by every agent and person.'],['Pick the records each pilot needs and fix their quality first.','Build one shared context layer on top of the systems of record.','Add commitments and outcomes to the shared record so every handoff carries them.']],
  ['Agent enablement',['Agents run on vendor defaults.','Instructions are written, but not from the best performer’s process.','Each agent has a charter, instructions from the top performer and an evaluation set.','Review steps down to sampling by rule, and agents are retrained or retired by rule.'],['Write a charter for each agent: unit of work, scope and what it must never do.','Rewrite instructions with your best performer and build an evaluation set.','Step review down only after a predeclared quality margin holds.']],
  ['Handoffs',['No defined handoffs; people chase agents’ output.','Handoffs are defined inside single pilots.','Routing, approvals and escalation are written down across workflows.','One layer routes work, enforces approvals and logs every handoff.'],['Write down who receives each agent’s output and when a person steps in.','Standardize routing, approval and escalation rules across pilots.','Centralize routing and logging so every handoff is visible.']],
  ['Measurement',['Adoption and activity are counted.','Results are before-and-after anecdotes.','Verified completions and quality are tracked against a baseline.','Fully loaded cost per verified completion, against a comparison group, drives scale decisions.'],['Measure a baseline on the same unit of work before launch.','Add a comparison group and count eligible, attempted, handed-off and verified units.','Price every completion fully loaded and declare the scale rule in advance.']],
  ['Governance and roles',['No named owners or controls for agents.','Owners are named for pilots; controls vary.','Every agent has an owner, evaluations, a cost cap and a rollback.','Roles, incentives and hiring assume a mixed team of people and agents.'],['Name an owner for every agent in production.','Give every agent evaluations, a cost cap and a tested rollback.','Redesign roles, pay and hiring around supervising and improving agents.']]
 ];
 const EX=[3,2,2,1,2,1];
 const saved=store.get('mgtm-maturity',null);
 let ans=Array.isArray(saved)&&saved.length===D.length?saved.slice():EX.slice();
 const build=()=>{rub.innerHTML=`<div class="hd">Dimension</div>${LV.map((l,i)=>`<div class="hd">${i+1}. ${l}</div>`).join('')}`+D.map((d,i)=>`<div class="dim" id="dim${i}">${esc(d[0])}</div>`+d[1].map((t,j)=>`<label class="opt"><input type="radio" name="m${i}" value="${j+1}" aria-describedby="dim${i}"${ans[i]===j+1?' checked':''}><b>${j+1}. ${LV[j]}</b>${esc(t)}</label>`).join('')).join('')};
 const showM=()=>{
  const low=Math.min(...ans),weak=D.map((d,i)=>i).filter(i=>ans[i]===low),names=weak.map(i=>D[i][0].toLowerCase());
  $('#mLevel').textContent=`Level ${low}: ${LV[low-1]}`;
  $('#mWhy').textContent=low<4?`You are at level ${low} because ${list(names)} ${names.length>1?'are your lowest dimensions':'is your lowest dimension'}.`:'Every dimension is at level 4.';
  $('#mNext').innerHTML=low<4?(weak.length>1?'<b>Next moves.</b>'+weak.map(i=>`<span class="nm"><b>${esc(D[i][0])}:</b> ${esc(D[i][2][low-1])}</span>`).join(''):`<b>Next move.</b> ${esc(D[weak[0]][2][low-1])}`):'<b>Next move.</b> Keep the measures honest as volume grows.';
  $('#mProf').innerHTML=D.map((d,i)=>`<div><span>${esc(d[0])}</span><div class="trk"><i style="width:${ans[i]*25}%"></i></div><b>${ans[i]}</b></div>`).join('');
 };
 rub.addEventListener('change',e=>{const m=/^m(\d)$/.exec(e.target.name||'');if(!m)return;ans[+m[1]]=+e.target.value;store.set('mgtm-maturity',ans);showM()});
 $('#mReset').addEventListener('click',()=>{ans=EX.slice();store.set('mgtm-maturity',null);build();showM()});
 build();showM();
});

/* ---------- report contents: mark the section in view */
safe(()=>{
 const links=$$('.toc a'),heads=$$('.art>h2[id]'),rep=$('#report');if(!links.length||!heads.length)return;
 let tick=false,cur='';
 const mark=()=>{
  tick=false;if(!rep.classList.contains('on'))return;
  let id=heads[0].id;for(const h of heads){if(h.getBoundingClientRect().top<=140)id=h.id;else break}
  if(id===cur)return;cur=id;
  links.forEach(a=>{if(a.getAttribute('href')==='#'+id)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
 };
 addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(mark)}},{passive:true});
 addEventListener('hashchange',()=>requestAnimationFrame(mark));
 mark();
});
}
