import { useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clipboard,
  Code2,
  ExternalLink,
  HeartPulse,
  Menu,
  Scale,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Weight,
  X,
} from "lucide-react";
import "../brand.css";

const REPO = "https://github.com/Umarjaum/clinical-calc-mcp";
const HERO_IMAGE = "/site-hero.webp";
const installCommand =
  "uvx --from git+https://github.com/Umarjaum/clinical-calc-mcp.git clinical-calc-mcp";

const tools = [
  {
    number: "01",
    icon: Activity,
    title: "Vital sign arithmetic",
    name: "vital_signs_summary",
    detail: "Pulse pressure, estimated MAP, and shock index—returned as calculations, never a risk judgment.",
    equation: "MAP ≈ DBP + ⅓(SBP − DBP)",
    tint: "mint",
  },
  {
    number: "02",
    icon: HeartPulse,
    title: "Parkland formula",
    name: "parkland_formula",
    detail: "Reproducible 24-hour fluid arithmetic with first-eight-hour and remaining-volume breakdowns.",
    equation: "4 mL × kg × %TBSA",
    tint: "coral",
  },
  {
    number: "03",
    icon: Scale,
    title: "BSA & BMI",
    name: "bsa_mosteller",
    detail: "Mosteller body-surface-area arithmetic and BMI output, without category or diagnosis.",
    equation: "√((cm × kg) / 3600)",
    tint: "lavender",
  },
  {
    number: "04",
    icon: Activity,
    title: "Infusion rate",
    name: "drip_rate_calculator",
    detail: "mL/hour and drops/minute with explicit units and documented half-up whole-drop rounding.",
    equation: "mL ÷ hours · gtt/min",
    tint: "gold",
  },
  {
    number: "05",
    icon: Thermometer,
    title: "Temperature",
    name: "temperature_converter",
    detail: "Celsius ↔ Fahrenheit conversion with absolute-zero validation.",
    equation: "°C ↔ °F",
    tint: "coral",
  },
  {
    number: "06",
    icon: Weight,
    title: "Weight",
    name: "weight_converter",
    detail: "Kilogram ↔ pound conversion with positive-value and finite-number checks.",
    equation: "kg ↔ lb",
    tint: "mint",
  },
];

const clients = [
  { name: "Claude Desktop", kind: "Local MCP", className: "claude" },
  { name: "Cursor", kind: "Editor · MCP", className: "cursor" },
  { name: "VS Code", kind: "Workspace MCP", className: "vscode" },
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <Activity size={20} strokeWidth={2.25} />
    </span>
  );
}

function CopyButton({ text, label = "Copy command" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <button className="copy-button" onClick={copy} type="button" aria-label={label}>
      {copied ? <Check size={16} /> : <Clipboard size={16} />}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <p className="section-label"><span />{children}</p>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <div className="nav-wrap">
          <a className="brand" href="#top" aria-label="Clinical Calc MCP home" onClick={closeMenu}>
            <BrandMark />
            <span className="brand-name">clinical<span>calc</span><i>·</i>mcp</span>
          </a>

          <button
            className="mobile-menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <nav id="primary-navigation" className={menuOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Main navigation">
            <a href="#tools" onClick={closeMenu}>Tools</a>
            <a href="#connect" onClick={closeMenu}>Connect</a>
            <a href="#safety" onClick={closeMenu}>Safety</a>
            <a href="#contribute" onClick={closeMenu}>Contribute</a>
            <a className="nav-github" href={REPO} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={15} />
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> OPEN-SOURCE · LOCAL-FIRST · MCP</div>
            <h1>Clinical calculations.<br /><em>Callable by AI.</em></h1>
            <p className="hero-lede">Six deterministic calculation and conversion tools for AI clients that support local MCP servers. Clear inputs. Explicit units. No clinical interpretation.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#connect">Connect a client <ArrowRight size={17} /></a>
              <a className="button button-ghost" href={REPO} target="_blank" rel="noreferrer">Explore on GitHub <ArrowUpRight size={16} /></a>
            </div>
            <div className="hero-proof">
              <span><ShieldCheck size={16} /> Local stdio transport</span>
              <span className="proof-divider" aria-hidden="true" />
              <span><Code2 size={16} /> Python 3.11+</span>
              <span className="proof-divider" aria-hidden="true" />
              <span>MIT licensed</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Abstract glass calculator and medical cross illustration">
            <img src={HERO_IMAGE} alt="A glass geometric medical cross and calculator rings with a mint waveform" fetchPriority="high" />
            <div className="art-caption"><span className="live-dot" /> ONE INPUT. ONE DETERMINISTIC RESULT.</div>
            <div className="hero-float float-top"><span>mL / hr</span><b>125.00</b><small>clear units</small></div>
            <div className="hero-float float-bottom"><span>TRANSPORT</span><b>stdio</b><small>runs locally</small></div>
          </div>

          <div className="hero-scroll" aria-hidden="true"><span /> Scroll to explore</div>
        </section>

        <section className="install-strip" aria-label="Quick start">
          <div className="install-copy"><span className="install-prompt">$</span><code>{installCommand}</code></div>
          <CopyButton text={installCommand} />
          <span className="install-note">six tools from GitHub main</span>
        </section>

        <section className="tools-section section-pad" id="tools">
          <div className="section-heading">
            <div>
              <SectionLabel>THE TOOLKIT</SectionLabel>
              <h2>Small tools.<br /><em>Clear answers.</em></h2>
            </div>
            <p>Purpose-built functions that return the requested arithmetic—without silently crossing into diagnosis, triage, or treatment advice.</p>
          </div>

          <div className="tool-grid">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <article className={`tool-card tint-${tool.tint}`} key={tool.name}>
                  <div className="tool-card-top"><span className="tool-number">{tool.number} / 06</span><span className="tool-icon"><Icon size={20} strokeWidth={1.7} /></span></div>
                  <h3>{tool.title}</h3>
                  <code className="tool-name">{tool.name}</code>
                  <p>{tool.detail}</p>
                  <div className="tool-equation">{tool.equation}</div>
                </article>
              );
            })}
          </div>
          <p className="tool-footnote"><Sparkles size={15} /> Finite-number, range, physical-boundary, and unit validation are part of every calculation.</p>
        </section>

        <section className="how-section section-pad" id="how-it-works">
          <div className="how-panel">
            <div className="how-copy">
              <SectionLabel>A SIMPLE BOUNDARY</SectionLabel>
              <h2>Your client.<br /><em>Your machine.</em></h2>
              <p>The MCP server runs as a local process. Your AI client calls a named tool with structured inputs; the server returns deterministic values over stdio.</p>
              <a className="text-link" href="https://modelcontextprotocol.io/docs/learn/architecture" target="_blank" rel="noreferrer">How MCP works <ArrowUpRight size={15} /></a>
            </div>
            <div className="flow-diagram" role="img" aria-label="AI client communicates with the local MCP server over stdio, which returns deterministic calculations">
              <div className="flow-node flow-client"><span className="node-index">01</span><Code2 size={19} /><b>AI client</b><small>Claude · Cursor · VS Code</small></div>
              <div className="flow-connector"><span>JSON-RPC · stdio</span><i /></div>
              <div className="flow-node flow-server"><span className="node-index">02</span><BrandMark /><b>Local MCP server</b><small>Validated tool inputs</small></div>
              <div className="flow-connector"><span>deterministic output</span><i /></div>
              <div className="flow-node flow-result"><span className="node-index">03</span><Activity size={19} /><b>Calculation</b><small>Number + unit · no interpretation</small></div>
              <div className="flow-local-note"><ShieldCheck size={16} /> No calculation-time network calls. Client privacy policies still apply.</div>
            </div>
          </div>
        </section>

        <section className="connect-section section-pad" id="connect">
          <div className="section-heading connect-heading">
            <div><SectionLabel>MEET YOUR CLIENT WHERE IT IS</SectionLabel><h2>One server.<br /><em>Compatible clients.</em></h2></div>
            <p>Use any MCP client that can launch a local stdio process. Setup menus and configuration-file locations vary by application and version.</p>
          </div>

          <div className="client-grid">
            {clients.map((client, index) => (
              <a className={`client-card ${client.className}`} href={`${REPO}/blob/main/docs/client-setup.md#${index === 0 ? "claude-desktop" : index === 1 ? "cursor" : "visual-studio-code"}`} target="_blank" rel="noreferrer" key={client.name}>
                <span className="client-index">0{index + 1}</span>
                <span className="client-name">{client.name}</span>
                <span className="client-kind">{client.kind}</span>
                <ArrowUpRight className="client-arrow" size={17} />
              </a>
            ))}
          </div>

          <div className="connect-code">
            <div className="code-meta"><span><i /> LOCAL CONFIG</span><span>uvx · no global install</span></div>
            <pre><code><span className="code-key">"mcpServers"</span>: {'{'}<br />  <span className="code-key">"clinical-calc-mcp"</span>: {'{'}<br />    <span className="code-key">"command"</span>: <span className="code-string">"uvx"</span>,<br />    <span className="code-key">"args"</span>: [<span className="code-string">"--from"</span>, <span className="code-string">"git+https://github.com/Umarjaum/clinical-calc-mcp.git"</span>, <span className="code-string">"clinical-calc-mcp"</span>]<br />  {'}'}<br />{'}'}</code></pre>
            <div className="code-footer"><span>Install uv first · requires internet for initial install</span><CopyButton text={`{"mcpServers":{"clinical-calc-mcp":{"command":"uvx","args":["--from","git+https://github.com/Umarjaum/clinical-calc-mcp.git","clinical-calc-mcp"]}}`} label="Copy MCP configuration" /></div>
          </div>
          <p className="compatibility-note"><span>Heads up</span> This is a local stdio server, not a hosted HTTP endpoint. Remote-only AI platforms need a separately hosted, secured service to connect. We do not claim universal AI compatibility.</p>
        </section>

        <section className="truth-section section-pad" id="safety">
          <div className="truth-card">
            <div className="truth-icon"><ShieldCheck size={25} /></div>
            <div className="truth-content">
              <SectionLabel>BUILT WITH A CLEAR BOUNDARY</SectionLabel>
              <h2>Arithmetic is not<br /><em>clinical judgment.</em></h2>
              <p>This software calculates user-supplied values. It is not validated clinical decision support and does not diagnose, triage, prescribe, or determine whether a result is appropriate for an individual. Always independently verify calculations and follow current local protocols.</p>
              <div className="truth-points"><span><Check size={16} /> No diagnosis or treatment advice</span><span><Check size={16} /> Units and validation made explicit</span><span><Check size={16} /> No patient data stored by the server</span></div>
            </div>
            <a className="truth-link" href={`${REPO}/blob/main/docs/clinical-safety.md`} target="_blank" rel="noreferrer" aria-label="Read clinical safety notes"><ArrowUpRight size={19} /></a>
          </div>
        </section>

        <section className="contribute-section section-pad" id="contribute">
          <div className="contribute-card">
            <div className="contribute-orbit orbit-one" aria-hidden="true" /><div className="contribute-orbit orbit-two" aria-hidden="true" />
            <div className="contribute-copy">
              <SectionLabel>GOOD TOGETHER</SectionLabel>
              <h2>Built in the open.<br /><em>Better with you.</em></h2>
              <p>Whether you write Python, improve docs, test an MCP client, or spot an edge case, there’s room to help. Contributors are welcome from across the web.</p>
              <div className="contribute-actions">
                <a className="button button-primary" href={`${REPO}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noreferrer">Read how to contribute <ArrowRight size={17} /></a>
                <a className="button button-light-outline" href={`${REPO}/issues/new/choose`} target="_blank" rel="noreferrer">Open an issue <ExternalLink size={15} /></a>
              </div>
              <p className="contribute-privacy"><ShieldCheck size={15} /> Use synthetic examples only. Never post patient data, secrets, or confidential information.</p>
            </div>
            <div className="contribute-visual" aria-hidden="true">
              <div className="contribute-ring ring-large" /><div className="contribute-ring ring-small" />
              <div className="contribute-node node-a"><Code2 size={19} /></div>
              <div className="contribute-node node-b"><Activity size={19} /></div>
              <div className="contribute-node node-c"><HeartPulse size={19} /></div>
              <div className="contribute-center"><BrandMark /></div>
              <div className="contribute-caption">OPEN SOURCE <span>✳</span> COMMUNITY BUILT</div>
            </div>
          </div>
        </section>

        <section className="faq-section section-pad" id="faq">
          <div className="faq-heading"><SectionLabel>GOOD TO KNOW</SectionLabel><h2>Frequently<br /><em>asked.</em></h2></div>
          <div className="faq-list">
            <details><summary>Can I use it with any AI platform?<ChevronDown size={18} /></summary><p>Only AI clients that support MCP and launching a local stdio process can use this version directly. A browser-only or remote-only platform would need a separately hosted and secured MCP endpoint.</p></details>
            <details><summary>Does it give medical advice?<ChevronDown size={18} /></summary><p>No. It performs only the documented calculations from supplied numbers. It does not diagnose, triage, recommend treatment or dosing, or evaluate clinical suitability. Follow local protocols and independently verify results.</p></details>
            <details><summary>Which version is on PyPI?<ChevronDown size={18} /></summary><p>PyPI currently publishes 0.1.0 with three tools. The six-tool source is on GitHub main; the site will clearly reflect the published package version until the 0.2.0 release is live.</p></details>
            <details><summary>How do I contribute safely?<ChevronDown size={18} /></summary><p>Read the contribution guide and use the GitHub issue forms. Use made-up test values only—never include patient identifiers, real clinical narratives, credentials, or other confidential data.</p></details>
          </div>
        </section>

        <section className="last-cta">
          <div className="last-cta-inner"><div><SectionLabel>START WITH A FUNCTION</SectionLabel><h2>Make the next calculation<br /><em>less repetitive.</em></h2></div><a className="button button-dark" href="#connect">Set up your MCP client <ArrowRight size={17} /></a></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="brand footer-brand" href="#top"><BrandMark /><span className="brand-name">clinical<span>calc</span><i>·</i>mcp</span></a>
          <p>Small, deterministic tools for AI clients that run local MCP servers.</p>
          <div className="footer-links"><a href={REPO} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a><a href="https://pypi.org/project/clinical-calc-mcp/" target="_blank" rel="noreferrer">PyPI <ArrowUpRight size={14} /></a><a href={`${REPO}/blob/main/docs/clinical-safety.md`} target="_blank" rel="noreferrer">Safety notes <ArrowUpRight size={14} /></a><a href={`${REPO}/blob/main/SECURITY.md`} target="_blank" rel="noreferrer">Security <ArrowUpRight size={14} /></a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} clinical-calc-mcp contributors · MIT License</span><span>Local-first by design <span className="footer-spark">✳</span></span></div>
      </footer>
    </div>
  );
}
