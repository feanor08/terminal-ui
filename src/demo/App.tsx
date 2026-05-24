import React, { useState } from 'react';
import { TerminalPanel }      from '../components/TerminalPanel.js';
import { TerminalStatusTag }  from '../components/TerminalStatusTag.js';
import { TerminalMetric }     from '../components/TerminalMetric.js';
import { TerminalTable }      from '../components/TerminalTable.js';
import { TerminalTabs }       from '../components/TerminalTabs.js';
import { TerminalCommandBar } from '../components/TerminalCommandBar.js';
import { TerminalToast }      from '../components/TerminalToast.js';
import { TerminalProgressBar }from '../components/TerminalProgressBar.js';
import { TerminalKbd }        from '../components/TerminalKbd.js';
import { TerminalButton }     from '../components/TerminalButton.js';
import { TerminalSelectCard } from '../components/TerminalSelectCard.js';

function DashboardAscii() {
  const B  = (t: string) => <span className="t-blue">{t}</span>;
  const G  = (t: string) => <span className="t-green">{t}</span>;
  const Y  = (t: string) => <span className="t-yellow">{t}</span>;
  const R  = (t: string) => <span className="t-red">{t}</span>;
  const M  = (t: string) => <span className="t-muted">{t}</span>;
  const Yb = (t: string) => <span className="t-yellow t-bold">{t}</span>;
  return (
    <div className="demo-ascii">
      {'╭─ '}{Yb('WORKBENCH CONTROL')}{' ────────────────────────────────────────────────╮\n'}
      {'│ '}{B('ACTIVE')}{' worker processing → queue drain → confirmation flow          │\n'}
      {'├──────────────────────────────────────────────────────────────────────┤\n'}
      {'│ '}{G('✓')}{' API server live           '}{Y('!')}{' Queue confirmation pending           │\n'}
      {'│ '}{G('✓')}{' Worker pool healthy       '}{R('!')}{' DB replica blocked                  │\n'}
      {'│ '}{B('↗')}{' Collecting status report  '}{M('logs:')}{' /tmp/workbench-status.md         │\n'}
      {'├──────────────────────────────────────────────────────────────────────┤\n'}
      {'│ proc '}{B('[=============>......] 72%')}{' queue '}{Y('[=========>..........] 45%')}{' done '}{G('[================>...] 88%')}{' │\n'}
      {'╰──────────────────────────────────────────────────────────────────────╯'}
    </div>
  );
}

type ServiceRow = { system: string; state: string; node: string; action: string };

const SERVICES: ServiceRow[] = [
  { system: 'API Server',  state: 'OK',      node: 'web-01', action: 'monitor' },
  { system: 'Worker',      state: 'ACTIVE',  node: 'wk-01',  action: 'watch'   },
  { system: 'Queue',       state: 'PENDING', node: 'wk-02',  action: 'confirm' },
  { system: 'DB replica',  state: 'BLOCKED', node: 'db-02',  action: 'fix'     },
];

const STATE_VARIANT: Record<string, 'green' | 'blue' | 'yellow' | 'red' | 'muted'> = {
  OK:      'green',
  ACTIVE:  'blue',
  PENDING: 'yellow',
  BLOCKED: 'red',
};

type TabKey = 'web' | 'terminal' | 'tokens';

export function App() {
  const [activeTab, setActiveTab]     = useState<TabKey>('web');
  const [selectedCard, setSelectedCard] = useState<string>('Deferred');
  const [toasts, setToasts]           = useState<Array<{ id: number; variant: 'blue'|'green'|'yellow'|'red'; title: string; msg: string }>>([
    { id: 0, variant: 'yellow', title: 'Review pending', msg: 'Open items need a human decision.' },
  ]);
  const [toastCount, setToastCount]   = useState(1);
  const [cmd, setCmd]                 = useState('');

  function addToast(v: 'blue'|'green'|'yellow'|'red', title: string, msg: string) {
    setToasts(prev => {
      const next = [{ id: toastCount, variant: v, title, msg }, ...prev].slice(0, 4);
      setToastCount(c => c + 1);
      return next;
    });
  }

  function dismissToast(id: number) {
    setToasts(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div className="demo-page">

      {/* ── Hero ─────────────────────────────────────────── */}
      <TerminalPanel className="demo-hero">
        <div className="demo-eyebrow">terminal-ui</div>
        <h1>Terminal workbench design system.</h1>
        <p>
          React + CSS components built on exportable design tokens.
          Four semantic colors — blue, green, yellow, red — consistent across
          components, iTerm2 themes, and CSS palettes.
        </p>
        <div className="demo-actions">
          <TerminalButton variant="blue"   onClick={() => addToast('blue',   'Action started', 'Blue: active process or selected state.')}>Blue action</TerminalButton>
          <TerminalButton variant="green"  onClick={() => addToast('green',  'Saved',          'Green: confirmed, healthy, complete.')}>Green action</TerminalButton>
          <TerminalButton variant="yellow" onClick={() => addToast('yellow', 'Needs attention','Yellow: pending, caution, needs review.')}>Yellow action</TerminalButton>
          <TerminalButton variant="red"    onClick={() => addToast('red',    'Blocked',        'Red: stop, failed, destructive.')}>Red action</TerminalButton>
        </div>
      </TerminalPanel>

      {/* ── Tab Nav ──────────────────────────────────────── */}
      <nav className="demo-tabnav" aria-label="View switcher">
        {(['web', 'terminal', 'tokens'] as TabKey[]).map(tab => (
          <button
            key={tab}
            className={`demo-navbtn${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'web' ? 'Web components' : tab === 'terminal' ? 'Terminal components' : 'Shared tokens'}
          </button>
        ))}
      </nav>

      {/* ── Web Tab ──────────────────────────────────────── */}
      <div className={`demo-tabpanel${activeTab === 'web' ? ' active' : ''}`}>
        <div className="demo-grid">

          {/* Live action demo */}
          <div className="s7">
            <TerminalPanel title="Component demo"
              headerRight={<TerminalStatusTag variant="yellow" dot>Click the actions</TerminalStatusTag>}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    <TerminalButton variant="blue"   onClick={() => addToast('blue',   'Process started',    'Active process running.')}>Run</TerminalButton>
                    <TerminalButton variant="green"  onClick={() => addToast('green',  'Saved',              'Categorization applied.')}>Save</TerminalButton>
                    <TerminalButton variant="yellow" onClick={() => addToast('yellow', 'Deferred',           'Added to ask-later queue.')}>Later</TerminalButton>
                    <TerminalButton variant="red"    onClick={() => addToast('red',    'Blocked',            'Duplicate conflict found.')}>Block</TerminalButton>
                    <TerminalButton loading>Working…</TerminalButton>
                  </div>
                  <TerminalProgressBar label="Processing" value={72} variant="blue" />
                  <TerminalProgressBar label="Reviewed"   value={88} variant="green" />
                  <TerminalProgressBar label="Pending"    value={45} variant="yellow" />
                  <TerminalProgressBar label="Risk"       value={34} variant="red" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {toasts.map(t => (
                    <TerminalToast
                      key={t.id}
                      variant={t.variant}
                      title={t.title}
                      message={t.msg}
                      onClose={() => dismissToast(t.id)}
                    />
                  ))}
                </div>
              </div>
            </TerminalPanel>
          </div>

          {/* Select cards */}
          <div className="s5">
            <TerminalPanel title="State cards"
              headerRight={<TerminalStatusTag variant="green" dot>Select one</TerminalStatusTag>}>
              <div className="demo-cards">
                {([
                  { id: 'Active',   variant: 'blue'   as const, num: '01', label: 'Active: process running.' },
                  { id: 'Done',     variant: 'green'  as const, num: '02', label: 'Confirmed: saved and clean.' },
                  { id: 'Deferred', variant: 'yellow' as const, num: '03', label: 'Pending: ask-later queue.' },
                  { id: 'Blocked',  variant: 'red'    as const, num: '04', label: 'Blocked: needs a fix.' },
                ]).map(c => (
                  <TerminalSelectCard
                    key={c.id}
                    variant={c.variant}
                    number={c.num}
                    label={c.label}
                    selected={selectedCard === c.id}
                    onClick={() => setSelectedCard(c.id)}
                  />
                ))}
              </div>
            </TerminalPanel>
          </div>

          {/* Form states */}
          <div className="s4">
            <TerminalPanel title="Form states">
              <div className="demo-form">
                <div className="demo-field-group">
                  <input className="demo-input" defaultValue="Merchant: Corner Café" />
                  <div className="demo-helper">Neutral field.</div>
                </div>
                <div className="demo-field-group">
                  <input className="demo-input ok" defaultValue="Category: Food & Drink" />
                  <div className="demo-helper ok">Saved successfully.</div>
                </div>
                <div className="demo-field-group">
                  <input className="demo-input warn" defaultValue="Meaning: Ask later" />
                  <div className="demo-helper warn">Deferred for review.</div>
                </div>
                <div className="demo-field-group">
                  <input className="demo-input err" defaultValue="Duplicate detected" />
                  <div className="demo-helper err">Needs correction before continuing.</div>
                </div>
              </div>
            </TerminalPanel>
          </div>

          {/* Button gallery */}
          <div className="s4">
            <TerminalPanel title="Button variants">
              <div className="col">
                <TerminalButton variant="blue">Primary action</TerminalButton>
                <TerminalButton variant="green">Confirm / save</TerminalButton>
                <TerminalButton variant="yellow">Defer / caution</TerminalButton>
                <TerminalButton variant="red">Destructive / block</TerminalButton>
                <TerminalButton disabled>Disabled</TerminalButton>
              </div>
            </TerminalPanel>
          </div>

          {/* Loading buttons */}
          <div className="s4">
            <TerminalPanel title="Loading states">
              <div className="col">
                <TerminalButton variant="blue"   loading>Syncing data</TerminalButton>
                <TerminalButton variant="green"  loading>Saving rule</TerminalButton>
                <TerminalButton variant="yellow" loading>Waiting review</TerminalButton>
                <TerminalButton variant="red"    loading>Retrying failure</TerminalButton>
              </div>
            </TerminalPanel>
          </div>

          {/* Metrics */}
          <div className="s12">
            <TerminalTabs
              tabs={[
                {
                  id: 'metrics',
                  label: 'Metrics',
                  content: (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
                      <TerminalMetric label="Requests / min" value="2,840" delta="▲ 120" deltaDirection="up" />
                      <TerminalMetric label="Error rate"     value="0.4%"  delta="▼ 0.1%" deltaDirection="down" />
                      <TerminalMetric label="Uptime"         value="99.9%" delta="— stable" deltaDirection="flat" />
                      <TerminalMetric label="Queue depth"    value="14"    delta="▲ 3" deltaDirection="up" />
                    </div>
                  ),
                },
                {
                  id: 'services',
                  label: 'Services',
                  content: (
                    <TerminalTable<ServiceRow>
                      columns={[
                        { key: 'system', header: 'System' },
                        { key: 'state',  header: 'State', render: (r) => (
                          <TerminalStatusTag variant={STATE_VARIANT[r.state] ?? 'muted'} dot>{r.state}</TerminalStatusTag>
                        )},
                        { key: 'node',   header: 'Node' },
                        { key: 'action', header: 'Action' },
                      ]}
                      rows={SERVICES}
                      getRowKey={(r) => r.system}
                    />
                  ),
                },
                {
                  id: 'kbd',
                  label: 'Shortcuts',
                  content: (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                      {[
                        { label: 'Save',       keys: ['⌘', 'S'] },
                        { label: 'Palette',    keys: ['⌘', '⇧', 'P'] },
                        { label: 'Terminal',   keys: ['⌃', '`'] },
                        { label: 'Close tab',  keys: ['⌘', 'W'] },
                        { label: 'New window', keys: ['⌘', 'N'] },
                      ].map(({ label, keys }) => (
                        <span key={label} style={{ color: 'var(--tui-text-muted)', fontSize: 'var(--tui-font-size-sm)', display: 'flex', alignItems: 'center', gap: 8 }}>
                          {label}: <TerminalKbd keys={keys} />
                        </span>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
          </div>

          {/* Command bar */}
          <div className="s12">
            <TerminalCommandBar
              prompt="$"
              placeholder="enter a command…"
              value={cmd}
              onChange={setCmd}
              onSubmit={(v) => { if (v) { addToast('blue', 'Command', v); } setCmd(''); }}
            />
          </div>

        </div>
      </div>

      {/* ── Terminal Tab ─────────────────────────────────── */}
      <div className={`demo-tabpanel${activeTab === 'terminal' ? ' active' : ''}`}>
        <div className="demo-terminal-frame">
          <div className="demo-term-titlebar">
            <div className="demo-traffic"><span className="r"/><span className="y"/><span className="g"/></div>
            <div>workbench — terminal component system</div>
            <div><span className="t-green">●</span> online</div>
          </div>
          <div className="demo-terminal">
            <div className="demo-term-grid">

              {/* ASCII banner */}
              <div className="ts12">
                <div className="demo-tblock yellow">
                  <div className="demo-section-caption">01. Startup banner</div>
                  <div className="demo-ascii">{`╭──────────────────────────────────────────────────────────────────────╮
│  `}<span className="t-yellow t-bold">terminal-ui workbench v0.1</span>{`              `}<span className="t-green">● ONLINE</span>{`             │
│                                                                      │
│   `}<span className="t-yellow">node:</span>{` `}<span className="t-bright">web-01</span>{`   `}<span className="t-yellow">env:</span>{` `}<span className="t-bright">production</span>{`    `}<span className="t-yellow">uptime:</span>{` `}<span className="t-bright">14d 6h</span>{`             │
╰──────────────────────────────────────────────────────────────────────╯`}</div>
                </div>
              </div>

              {/* Segmented prompt */}
              <div className="ts12">
                <div className="demo-tblock blue">
                  <div className="demo-section-caption">02. Segmented shell prompt</div>
                  <div className="demo-prompt">
                    <span className="demo-segment host">web-01</span>
                    <span className="demo-segment path">/srv/app</span>
                    <span className="demo-segment warn">needs-review</span>
                    <span className="t-bright"> ❯ ./scripts/sanity_check.sh</span>
                    <span className="demo-cursor"/>
                  </div>
                  <div className="demo-prompt" style={{ marginTop: 8 }}>
                    <span className="demo-segment host">worker-01</span>
                    <span className="demo-segment path">~/jobs</span>
                    <span className="demo-segment err">blocked</span>
                    <span className="t-red"> ❯ attach requires confirmation</span>
                  </div>
                </div>
              </div>

              {/* Confirm prompt */}
              <div className="ts6">
                <div className="demo-tblock">
                  <div className="demo-section-caption">03. Confirm prompt</div>
                  <div className="demo-line"><span className="t-green">?</span> Run destructive job? <span className="t-green">(yes/no)</span> [<span className="t-yellow">no</span>]:</div>
                  <div className="demo-line">› <span className="t-yellow">Waiting for explicit confirmation.</span></div>
                  <br/>
                  <div className="demo-line"><span className="t-red">!</span> Type <span style={{ display:'inline-block', padding:'0 6px', background:'var(--tui-terminal-raised)', border:'1px solid var(--tui-terminal-line)', borderRadius:5, fontWeight:900, fontSize:'0.82rem', color:'var(--tui-text-bright)', boxShadow:'inset 0 -2px 0 rgba(0,0,0,0.4)' }}>DEPLOY</span> to confirm:</div>
                </div>
              </div>

              {/* Command palette */}
              <div className="ts6">
                <div className="demo-tblock">
                  <div className="demo-section-caption">04. Command palette</div>
                  <div className="demo-menu">
                    <div className="demo-menu-item active"><span className="t-blue">›</span><span>Run sanity report</span><span className="demo-tag info">ENTER</span></div>
                    <div className="demo-menu-item warn">  <span className="t-yellow">!</span><span>Open review queue</span><span className="demo-tag warn">REVIEW</span></div>
                    <div className="demo-menu-item ok">    <span className="t-green">✓</span><span>Deploy from main</span><span className="demo-tag ok">OK</span></div>
                    <div className="demo-menu-item danger"> <span className="t-red">!</span><span>Stop worker job</span><span className="demo-tag err">ESC</span></div>
                  </div>
                </div>
              </div>

              {/* Status metrics */}
              <div className="ts4">
                <div className="demo-tblock green">
                  <div className="demo-section-caption">05. Status metrics</div>
                  <div className="demo-stat-grid">
                    <div className="demo-stat blue">  <div className="num t-blue">72%</div>  <div className="lbl">running</div></div>
                    <div className="demo-stat green"> <div className="num t-green">18</div>   <div className="lbl">done</div></div>
                    <div className="demo-stat yellow"><div className="num t-yellow">09</div>  <div className="lbl">pending</div></div>
                    <div className="demo-stat red">   <div className="num t-red">03</div>     <div className="lbl">blocked</div></div>
                  </div>
                </div>
              </div>

              {/* Spinners */}
              <div className="ts4">
                <div className="demo-tblock">
                  <div className="demo-section-caption">06. Spinner / waiting</div>
                  <div className="demo-line"><span className="t-blue" style={{ display:'inline-block', animation:'tui-spin 1.2s linear infinite', width:'1ch' }}>◜</span> <span className="t-blue">running</span> background sync</div>
                  <div className="demo-line"><span className="t-green" style={{ display:'inline-block', animation:'tui-spin 1.2s linear infinite', width:'1ch' }}>◝</span> <span className="t-green">saving</span> config change</div>
                  <div className="demo-line"><span className="t-yellow" style={{ display:'inline-block', animation:'tui-spin 1.2s linear infinite', width:'1ch' }}>◟</span> <span className="t-yellow">waiting</span> for confirmation</div>
                  <div className="demo-line"><span className="t-red" style={{ display:'inline-block', animation:'tui-spin 1.2s linear infinite', width:'1ch' }}>◞</span> <span className="t-red">retrying</span> failed request</div>
                </div>
              </div>

              {/* Kbd hints */}
              <div className="ts4">
                <div className="demo-tblock yellow">
                  <div className="demo-section-caption">07. Keyboard hints</div>
                  <div className="demo-line"><span style={{ display:'inline-block', padding:'0 6px', background:'var(--tui-terminal-raised)', border:'1px solid var(--tui-terminal-line)', borderRadius:5, fontWeight:900, fontSize:'0.82rem', color:'var(--tui-text-bright)', boxShadow:'inset 0 -2px 0 rgba(0,0,0,0.4)' }}>↑</span> <span style={{ display:'inline-block', padding:'0 6px', background:'var(--tui-terminal-raised)', border:'1px solid var(--tui-terminal-line)', borderRadius:5, fontWeight:900, fontSize:'0.82rem', color:'var(--tui-text-bright)', boxShadow:'inset 0 -2px 0 rgba(0,0,0,0.4)' }}>↓</span> move</div>
                  <div className="demo-line"><span style={{ display:'inline-block', padding:'0 6px', background:'var(--tui-terminal-raised)', border:'1px solid var(--tui-terminal-line)', borderRadius:5, fontWeight:900, fontSize:'0.82rem', color:'var(--tui-text-bright)', boxShadow:'inset 0 -2px 0 rgba(0,0,0,0.4)' }}>Enter</span> select</div>
                  <div className="demo-line"><span style={{ display:'inline-block', padding:'0 6px', background:'var(--tui-terminal-raised)', border:'1px solid var(--tui-terminal-line)', borderRadius:5, fontWeight:900, fontSize:'0.82rem', color:'var(--tui-text-bright)', boxShadow:'inset 0 -2px 0 rgba(0,0,0,0.4)' }}>Esc</span> cancel</div>
                </div>
              </div>

              {/* Progress bars */}
              <div className="ts6">
                <div className="demo-tblock">
                  <div className="demo-section-caption">08. ASCII progress bars</div>
                  <div className="demo-line t-blue">Processing    <span className="t-muted">72%</span></div>
                  <div className="demo-bar blue">{'[=============>......] 72%'}</div>
                  <div className="demo-line t-green">Reviewed      <span className="t-muted">88%</span></div>
                  <div className="demo-bar green">{'[================>...] 88%'}</div>
                  <div className="demo-line t-yellow">Pending queue <span className="t-muted">45%</span></div>
                  <div className="demo-bar yellow">{'[=========>..........] 45%'}</div>
                  <div className="demo-line t-red">Error rate    <span className="t-muted">34%</span></div>
                  <div className="demo-bar red">{'[======>............] 34%'}</div>
                </div>
              </div>

              {/* Logs */}
              <div className="ts6">
                <div className="demo-tblock">
                  <div className="demo-section-caption">09. Log stream</div>
                  <div className="demo-log">
                    <div><span className="demo-tag info">INFO</span> <span className="t-muted">12:44:01</span> server listening on :3000</div>
                    <div><span className="demo-tag ok">OK</span>   <span className="t-muted">12:44:02</span> database connection established</div>
                    <div><span className="demo-tag warn">WAIT</span> <span className="t-muted">12:44:04</span> confirmation required before attach</div>
                    <div><span className="demo-tag err">ERR</span>  <span className="t-muted">12:44:05</span> upstream timeout after 5000ms — retrying</div>
                    <div><span className="demo-tag info">INFO</span> <span className="t-muted">12:44:06</span> retry succeeded</div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="ts6">
                <div className="demo-tblock">
                  <div className="demo-section-caption">10. Data table</div>
                  <div className="demo-term-table">
                    <div className="demo-cell hdr">system</div><div className="demo-cell hdr">state</div><div className="demo-cell hdr">node</div><div className="demo-cell hdr">action</div>
                    <div className="demo-cell">API Server</div> <div className="demo-cell t-green">OK</div>      <div className="demo-cell">web-01</div>  <div className="demo-cell">monitor</div>
                    <div className="demo-cell">Worker</div>     <div className="demo-cell t-blue">ACTIVE</div>  <div className="demo-cell">wk-01</div>   <div className="demo-cell">watch</div>
                    <div className="demo-cell">Queue</div>      <div className="demo-cell t-yellow">PENDING</div><div className="demo-cell">wk-02</div>   <div className="demo-cell">confirm</div>
                    <div className="demo-cell last">DB replica</div><div className="demo-cell t-red last">BLOCKED</div><div className="demo-cell last">db-02</div><div className="demo-cell last">fix</div>
                  </div>
                </div>
              </div>

              {/* File tree + diff */}
              <div className="ts6">
                <div className="demo-tblock">
                  <div className="demo-section-caption">11. File tree &amp; diff</div>
                  <div className="demo-tree"><span className="t-blue">/srv/app</span>{`
├── `}<span className="t-green">src/</span>{`
│   ├── index.ts
│   └── config.ts
├── `}<span className="t-green">scripts/</span>{`
│   └── deploy.sh
├── `}<span className="t-yellow">docker-compose.yml</span>{`
└── `}<span className="t-red">.env</span>{` `}<span className="t-muted">never commit</span></div>
                  <br/>
                  <div className="demo-diff">
                    <span className="demo-diff-file">diff --git a/config.ts b/config.ts</span>{'\n'}
                    <span className="demo-diff-hunk">@@ -12,4 +12,4 @@</span>{'\n'}
                    <span className="demo-diff-rem">- retries: 3</span>{'\n'}
                    <span className="demo-diff-add">+ retries: 5</span>{'\n'}
                    <span className="demo-diff-add">+ timeout: 10_000</span>
                  </div>
                </div>
              </div>

              {/* Tabs + Toasts */}
              <div className="ts6">
                <div className="demo-tblock">
                  <div className="demo-section-caption">12. Tabs / banners</div>
                  <div className="demo-term-tabs">
                    <span className="demo-term-tab active">overview</span>
                    <span className="demo-term-tab">workers</span>
                    <span className="demo-term-tab ok">api</span>
                    <span className="demo-term-tab">queue</span>
                    <span className="demo-term-tab err">db</span>
                  </div>
                  <div className="demo-term-toast blue"><span className="t-blue">↗</span> Background sync running. Press <span style={{ display:'inline-block', padding:'0 5px', background:'var(--tui-terminal-raised)', border:'1px solid var(--tui-terminal-line)', borderRadius:4, fontSize:'0.78rem', color:'var(--tui-text-bright)', boxShadow:'inset 0 -2px 0 rgba(0,0,0,0.4)' }}>Esc</span> to cancel.</div>
                  <div className="demo-term-toast green"><span className="t-green">✓</span> Deploy completed in 38s.</div>
                  <div className="demo-term-toast yellow"><span className="t-yellow">!</span> Confirmation required before attaching.</div>
                  <div className="demo-term-toast red"><span className="t-red">!</span> Deploy blocked — working tree dirty.</div>
                </div>
              </div>

              {/* Full dashboard */}
              <div className="ts12">
                <div className="demo-tblock yellow">
                  <div className="demo-section-caption">13. Full terminal dashboard</div>
                  <DashboardAscii />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Tokens Tab ───────────────────────────────────── */}
      <div className={`demo-tabpanel${activeTab === 'tokens' ? ' active' : ''}`}>
        <div className="demo-grid">
          <div className="s12">
            <TerminalPanel title="Shared color semantics"
              headerRight={<TerminalStatusTag variant="yellow" dot>Design language</TerminalStatusTag>}>
              <div className="demo-cards">
                {([
                  { variant: 'blue'   as const, num: 'Blue',   label: 'Active, running, selected process, focused input, current command.' },
                  { variant: 'green'  as const, num: 'Green',  label: 'Healthy, saved, confirmed, reviewed, reachable, complete.' },
                  { variant: 'yellow' as const, num: 'Yellow', label: 'Pending, caution, ask-later, needs review, selected tab, safe-but-pay-attention.' },
                  { variant: 'red'    as const, num: 'Red',    label: 'Blocked, failed, destructive, duplicate conflict — stop before continuing.' },
                ]).map(c => (
                  <TerminalSelectCard key={c.variant} variant={c.variant} number={c.num} label={c.label} selected />
                ))}
              </div>
            </TerminalPanel>
          </div>

          <div className="s6">
            <TerminalPanel title="Core token values">
              <p className="note">
                Outside background: <strong>#30302E</strong>. Interior surfaces: <strong>#272726</strong>, <strong>#242423</strong>, <strong>#20201F</strong>.<br/><br/>
                Accent base values:&nbsp;
                <strong style={{ color:'var(--tui-blue)' }}>#0898F8</strong>&nbsp;
                <strong style={{ color:'var(--tui-green)' }}>#38D848</strong>&nbsp;
                <strong style={{ color:'var(--tui-yellow)' }}>#F8C838</strong>&nbsp;
                <strong style={{ color:'var(--tui-red)' }}>#F82848</strong><br/><br/>
                Each color expands to 6 derived tokens: <code>base · bright · dark · soft · border · glow</code>.
              </p>
            </TerminalPanel>
          </div>

          <div className="s6">
            <TerminalPanel title="Usage rules" variant="red"
              headerRight={<TerminalStatusTag variant="red">Important</TerminalStatusTag>}>
              <p className="note">
                <strong style={{ color:'var(--tui-text-bright)' }}>Do not use red for "needs review."</strong><br/>
                Use yellow. Red should be reserved for true failure, unsafe actions, dirty deploys,
                broken services, or data corruption risk.<br/><br/>
                Yellow means the system can continue carefully. Red means stop and fix.
              </p>
            </TerminalPanel>
          </div>
        </div>
      </div>

    </div>
  );
}
