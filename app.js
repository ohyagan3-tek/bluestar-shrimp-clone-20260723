const state = {
  token: localStorage.getItem("bluestar_token"),
  view: "tutorials",
  cache: {},
  skillFilter: "全部",
  skillQuery: ""
};

const root = document.querySelector("#view-root");
const toast = document.querySelector("#toast");
const modalRoot = document.querySelector("#modal-root");
const staticData = window.BLUESTAR_STATIC_DATA || null;
let staticMode = location.protocol === "file:" || location.hostname.endsWith("github.io");

const researchedModules = [
  { icon: "💬", title: "LINE 深度整合", detail: "把官方帳號訊息、客戶問題與任務入口接到蝦妹，適合客服、銷售與社群營運。", tag: "通訊" },
  { icon: "🗓️", title: "Google 日曆", detail: "讀取行程、建立提醒、安排會議與每日待辦，和蝦排程一起自動提醒。", tag: "行程" },
  { icon: "📄", title: "Notion / 文件庫", detail: "把 SOP、課程、會議紀錄與品牌資料整理成可搜尋知識庫。", tag: "知識" },
  { icon: "📊", title: "Sheets / Excel", detail: "處理表格、報表、庫存、點數與訂單資料，輸出圖表與摘要。", tag: "資料" },
  { icon: "☁️", title: "Google Drive", detail: "集中存放任務成品、圖片、影片、PDF 與文件，保留可追溯資料來源。", tag: "檔案" },
  { icon: "🧠", title: "RAG 記憶", detail: "讓蝦妹依你的固定規則、角色、素材與工作流回答，不混入舊任務。", tag: "記憶" },
  { icon: "🎨", title: "圖片生成", detail: "支援海報、商品圖、教學圖、封面與社群圖，走確認、生成、驗證、回傳流程。", tag: "創作" },
  { icon: "🎬", title: "影片生成與剪輯", detail: "支援分鏡、Seedance / ComfyUI 影片、短影音字幕、封面、配樂與成片輸出。", tag: "影片" },
  { icon: "🤖", title: "多模型代理", detail: "依任務路由 GPT、Gemini、Claude、圖片模型與影片模型，保留執行紀錄。", tag: "模型" },
  { icon: "🛡️", title: "安全沙箱", detail: "限制任務權限、交付對象、敏感資訊與外部連線，避免錯傳或外洩。", tag: "安全" },
  { icon: "🛒", title: "購物與賣家工作流", detail: "支援蝦皮 / EasyBoss 流程研究、商品採集檢查、繁中化與上架前合規提醒。", tag: "商務" },
  { icon: "🧾", title: "多格式輸出", detail: "依任務產出 PNG、MP4、MP3、PDF、DOCX、PPT、ZIP、網站與公開網址。", tag: "交付" }
];

const quickActions = [
  { icon: "😤", title: "客訴回覆", detail: "整理客戶訊息、判斷情緒、生成可直接回覆的繁體中文版本。", message: "客訴回覆任務已建立" },
  { icon: "📊", title: "每日日報", detail: "彙整指定資料來源，產出每日營運、行銷或市場摘要。", message: "每日日報排程已準備" },
  { icon: "✏️", title: "自訂任務", detail: "把你的目標、素材、限制與交付格式交給蝦妹執行。", message: "自訂任務入口已開啟" },
  { icon: "🎨", title: "海報做圖", detail: "文案轉圖、參考圖改版、教學圖與社群圖設計。", message: "海報做圖流程已準備" },
  { icon: "🎬", title: "短影音", detail: "上字幕、封面、背景音樂、直式輸出與驗證。", message: "短影音工作流已準備" },
  { icon: "🌐", title: "網站部署", detail: "修改網站、提交版本、公開部署並驗證最新網址。", message: "網站部署工作流已準備" }
];

const railwayStages = [
  { title: "接收任務", detail: "來源可以是網站、Telegram、LINE、檔案、圖片、影片或語音。", status: "已研究" },
  { title: "拆解步驟", detail: "依任務決定是否需要搜尋、登入、生成、剪輯、轉檔、部署或回傳。", status: "已做進去" },
  { title: "選擇工具", detail: "依指定路由使用 image2、ComfyUI、Seedance、NotebookLM、GitHub Pages 等。", status: "已做進去" },
  { title: "執行與驗證", detail: "完成後檢查尺寸、格式、可讀性、頁數、時長、公開網址或傳檔狀態。", status: "已做進去" },
  { title: "交付回報", detail: "有檔案就同源文件模式回傳；網站就提供公開網址與本機路徑。", status: "已做進去" }
];

const lessons = [
  { title: "第一堂：如何交代任務", detail: "目標、素材、限制、比例、交付格式一次講清楚。", progress: 100 },
  { title: "第二堂：圖片與海報", detail: "image2、ComfyUI 與藍星圖片路由差異。", progress: 72 },
  { title: "第三堂：影片與字幕", detail: "分鏡、圖生影片、短影音剪輯與封面。", progress: 58 },
  { title: "第四堂：網站部署", detail: "本機修改、GitHub Pages、公開網址驗證。", progress: 44 },
  { title: "第五堂：蝦皮賣家流程", detail: "EasyBoss、採集、認領、繁中化、合規與上架。", progress: 36 }
];

async function api(path, options = {}) {
  if (staticMode) return staticApi(path, options);
  const headers = { "content-type": "application/json", ...(options.headers || {}) };
  if (state.token) headers.authorization = `Bearer ${state.token}`;
  try {
    const response = await fetch(path, { ...options, headers });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "請求失敗");
    return payload;
  } catch (error) {
    if (staticData) {
      staticMode = true;
      return staticApi(path, options);
    }
    throw error;
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

async function staticApi(path, options = {}) {
  if (!staticData) throw new Error("公開展示資料尚未載入");
  const method = options.method || "GET";
  if (path === "/api/auth/me") return { user: clone(staticData.user) };
  if (path === "/api/auth/login") return { token: "static-demo-token", user: clone(staticData.user) };
  if (path === "/api/auth/logout") return { ok: true };
  if (path === "/api/dashboard") {
    const tasks = staticData.tasks || [];
    const schedules = staticData.schedules || [];
    const skills = staticData.skills || [];
    return {
      user: clone(staticData.user),
      stats: {
        totalTasks: tasks.length,
        runningTasks: tasks.filter((x) => x.status === "running").length,
        installedSkills: skills.length,
        schedules: schedules.filter((x) => x.enabled).length
      },
      recentTasks: clone(tasks.slice(0, 6)),
      activity: clone(staticData.activity || [])
    };
  }
  if (path === "/api/tasks") return { tasks: clone(staticData.tasks || []) };
  if (path === "/api/skills") return { skills: clone(staticData.skills || []) };
  if (path.startsWith("/api/skills/") && method === "PATCH") {
    const id = path.split("/").pop();
    const skill = (staticData.skills || []).find((item) => item.id === id);
    if (skill) skill.installed = !skill.installed;
    return { skill: clone(skill || {}) };
  }
  if (path === "/api/schedules") return { schedules: clone(staticData.schedules || []) };
  if (path === "/api/files") return { files: clone(staticData.files || []) };
  if (path === "/api/credits") {
    return {
      balance: staticData.user.credits,
      usage: [
        { label: "GPT 對話", value: 3460, color: "teal" },
        { label: "圖片創作", value: 1870, color: "pink" },
        { label: "影片與剪輯", value: 1480, color: "gold" },
        { label: "研究與檔案", value: 920, color: "teal" }
      ]
    };
  }
  if (path === "/api/admin/overview") {
    const feedback = staticData.feedback || [];
    return {
      users: 184,
      activeUsers: 72,
      revenue: "US$ 8,460",
      pendingFeedback: feedback.filter((x) => x.status === "待處理").length,
      feedback: clone(feedback)
    };
  }
  if (path === "/api/settings") return { settings: { language: "繁體中文", timezone: "Asia/Taipei", notifications: true, compactMode: false } };
  return { ok: true };
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" }[char]));
}

function statusLabel(status) {
  return { completed: "已完成", running: "執行中", queued: "排隊中" }[status] || status;
}

function layout(title, subtitle, action = "") {
  return `<div class="view-header"><div><div class="view-kicker">BLUESTAR WORKSPACE</div><h1>${title}</h1><p>${subtitle}</p></div>${action}</div>`;
}

function stat(label, value, hint) {
  return `<div class="stat-card"><small>${label}</small><strong>${value}</strong><small>${hint}</small></div>`;
}

function syncShell(user) {
  if (!user) return;
  document.querySelector("#credit-pill").textContent = `蝦飼料：${Number(user.credits || 0).toLocaleString()}`;
  document.querySelector("#profile-name").textContent = user.name;
  document.querySelector("#avatar").textContent = user.name.slice(0, 1);
  document.querySelector("#sidebar-user-name").textContent = user.name;
  document.querySelector("#sidebar-user-plan").textContent = user.plan || "免費版";
}

function moduleGrid(items) {
  return `<div class="module-grid">${items.map((item) => `<article class="module-card"><div class="module-card-top"><span class="module-icon">${item.icon}</span><span class="tag">${esc(item.tag || "功能")}</span></div><h3>${esc(item.title)}</h3><p>${esc(item.detail)}</p></article>`).join("")}</div>`;
}

function quickActionGrid() {
  return `<div class="quick-grid">${quickActions.map((item) => `<button class="quick-card" data-message="${esc(item.message)}"><span>${item.icon}</span><strong>${esc(item.title)}</strong><small>${esc(item.detail)}</small></button>`).join("")}</div>`;
}

function bindQuickCards() {
  document.querySelectorAll(".quick-card").forEach((button) => {
    button.onclick = () => notify(button.dataset.message || "功能入口已準備");
  });
}

async function renderTasks() {
  const data = await api("/api/dashboard");
  state.cache.dashboard = data;
  syncShell(data.user);
  root.innerHTML = layout("蝦任務", "把想完成的結果交代給蝦妹，工作區會留下每一步紀錄。", `<button class="button button-primary" id="new-task">＋ 新增任務</button>`) +
    `<div class="dashboard-grid">${stat("全部任務", data.stats.totalTasks, "累積任務")}${stat("執行中", data.stats.runningTasks, "正在處理")}${stat("已安裝技能", data.stats.installedSkills, "可直接使用")}${stat("啟用排程", data.stats.schedules, "自動執行中")}</div>` +
    `<section class="panel launch-panel"><div class="panel-heading"><h2>常用任務啟動台</h2><span class="tag">研究後補齊</span></div>${quickActionGrid()}</section>` +
    `<div class="content-grid"><section class="panel"><div class="panel-heading"><h2>最近任務</h2><button class="text-button" id="refresh-tasks">重新整理</button></div>${data.recentTasks.map((task) => `<div class="task-row"><div><div class="task-title">${esc(task.title)}</div><div class="task-meta">${esc(task.model)} · ${new Date(task.createdAt).toLocaleString("zh-TW", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div></div><span class="status status-${task.status}">${statusLabel(task.status)}</span></div>`).join("")}</section><section class="panel"><div class="panel-heading"><h2>活動紀錄</h2></div><div class="panel-body">${data.activity.map((item) => `<div class="activity-item"><span class="activity-dot"></span><div>${esc(item.text)}<small>${esc(item.time)}</small></div></div>`).join("")}</div></section></div>`;
  document.querySelector("#new-task").onclick = showTaskModal;
  document.querySelector("#refresh-tasks").onclick = () => renderTasks().catch(handleError);
  bindQuickCards();
}

async function renderSkills() {
  const data = await api("/api/skills");
  const skills = data.skills || [];
  const categories = ["全部", ...Array.from(new Set(skills.map((skill) => skill.tag))).sort((a, b) => a.localeCompare(b, "zh-Hant"))];
  const query = state.skillQuery.trim().toLowerCase();
  const filtered = skills.filter((skill) => {
    const inCategory = state.skillFilter === "全部" || skill.tag === state.skillFilter;
    const text = `${skill.name} ${skill.folder} ${skill.tag} ${skill.detail}`.toLowerCase();
    return inCategory && (!query || text.includes(query));
  });
  const categoryButtons = categories.map((category) => `<button class="segmented-button ${state.skillFilter === category ? "active" : ""}" data-category="${esc(category)}">${esc(category)}</button>`).join("");
  root.innerHTML = layout("蝦技能", `完整收錄 ${skills.length} 個技能模組，可依任務啟用圖片、影片、網站、Telegram、文件、語音、研究與自動化流程。`) +
    `<section class="panel skill-toolbar"><div class="skill-search"><label>搜尋技能</label><input id="skill-search" value="${esc(state.skillQuery)}" placeholder="輸入技能名稱、用途或分類" /></div><div class="segmented">${categoryButtons}</div></section>` +
    `<div class="skill-summary">${stat("全部技能", skills.length, "已匯入")}${stat("目前顯示", filtered.length, "符合條件")}${stat("技能分類", categories.length - 1, "工作流類型")}${stat("交付規則", "同源", "完成後驗證")}</div>` +
    `<div class="skill-grid skill-grid-detailed">${filtered.map((skill) => `<article class="skill-card skill-card-detailed"><div class="skill-card-top"><span class="skill-icon">${skill.icon}</span><div><div class="skill-order">#${String(skill.order).padStart(2, "0")} · ${esc(skill.folder)}</div><h3>${esc(skill.name)}</h3></div></div><p>${esc(skill.bestFor || skill.detail)}</p><div class="skill-section"><strong>標準流程</strong><ol>${(skill.flow || []).map((step) => `<li>${esc(step)}</li>`).join("")}</ol></div><div class="skill-section"><strong>注意事項</strong><ul>${(skill.guardrails || []).map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div><div class="skill-footer"><span class="tag">${esc(skill.tag)}</span><button class="text-button skill-toggle" data-id="${skill.id}">${esc(skill.status || (skill.installed ? "已安裝" : "安裝技能"))}</button></div></article>`).join("")}</div>`;
  document.querySelector("#skill-search").oninput = (event) => {
    state.skillQuery = event.target.value;
    renderSkills().catch(handleError);
  };
  document.querySelectorAll(".segmented-button").forEach((button) => button.onclick = () => {
    state.skillFilter = button.dataset.category;
    renderSkills().catch(handleError);
  });
  document.querySelectorAll(".skill-toggle").forEach((button) => button.onclick = async () => {
    try { await api(`/api/skills/${button.dataset.id}`, { method: "PATCH" }); notify("技能狀態已更新"); renderSkills(); } catch (error) { handleError(error); }
  });
}

async function renderSchedules() {
  const data = await api("/api/schedules");
  root.innerHTML = layout("蝦排程", "設定固定時間的任務，讓日常工作自動往前走。", `<button class="button button-primary" id="new-schedule">＋ 新增排程</button>`) + `<section class="panel">${data.schedules.map((item) => `<div class="list-row"><div><div class="task-title">${esc(item.title)}</div><div class="task-meta">${esc(item.detail)} · ${esc(item.cadence)} · ${esc(item.channel)}</div></div><button class="toggle ${item.enabled ? "on" : ""}" title="切換排程狀態" data-id="${item.id}"></button></div>`).join("")}</section>`;
  document.querySelector("#new-schedule").onclick = showScheduleModal;
  document.querySelectorAll(".toggle").forEach((button) => button.onclick = async () => { try { await api(`/api/schedules/${button.dataset.id}`, { method: "PATCH" }); renderSchedules(); } catch (error) { handleError(error); } });
}

async function renderFiles() {
  const data = await api("/api/files");
  root.innerHTML = layout("龍蝦小包包", "集中查看這個工作區的報告、簡報、文件、圖片、影片與素材來源。", `<button class="button button-primary" id="new-file">＋ 登錄檔案</button>`) +
    `<div class="dashboard-grid">${stat("文件", "PDF / DOCX", "合約與報告")}${stat("影音", "MP4 / MP3", "成片與配音")}${stat("圖片", "PNG / JPG", "海報與素材")}${stat("資料", "XLSX / CSV", "表格與名單")}</div>` +
    `<section class="panel source-panel"><div class="panel-heading"><h2>可接入資料來源</h2><span class="tag">Drive / Notion / Sheets</span></div>${moduleGrid([
      { icon: "☁️", title: "Google Drive", detail: "存放任務成品、素材與公開交付檔案。", tag: "雲端" },
      { icon: "📄", title: "Notion 知識庫", detail: "整理 SOP、腳本、客戶問答與教學資料。", tag: "知識" },
      { icon: "📊", title: "Google Sheets", detail: "接住報表、名單、用量與商品資料。", tag: "表格" }
    ])}</section>` +
    `<section class="panel table-wrap"><table class="data-table"><thead><tr><th>檔案</th><th>類型</th><th>大小</th><th>更新日期</th><th>操作</th></tr></thead><tbody>${data.files.map((file) => `<tr><td><strong>${esc(file.name)}</strong></td><td>${esc(file.type)}</td><td>${esc(file.size)}</td><td>${esc(file.updatedAt)}</td><td><button class="text-button" onclick="notify('檔案預覽入口已準備')">查看</button></td></tr>`).join("")}</tbody></table></section>`;
  document.querySelector("#new-file").onclick = showFileModal;
}

async function renderCredits() {
  const data = await api("/api/credits");
  const total = data.usage.reduce((sum, item) => sum + item.value, 0);
  root.innerHTML = layout("蝦飼料", "透明查看點數餘額、充值方案與近期使用方向。", `<button class="button button-primary" onclick="notify('充值流程已準備')">＋ 充值積分</button>`) +
    `<div class="dashboard-grid">${stat("目前餘額", data.balance.toLocaleString(), "點")}${stat("本月使用", total.toLocaleString(), "點")}${stat("方案", "專業版", "每月自動更新")}${stat("用量趨勢", "穩定", "近 30 天")}</div>` +
    `<div class="content-grid"><section class="panel"><div class="panel-heading"><h2>使用分布</h2><span class="tag">近 30 天</span></div><div class="panel-body">${data.usage.map((item) => `<div class="list-row" style="padding:14px 0"><div><strong>${esc(item.label)}</strong><div class="task-meta">${item.value.toLocaleString()} 點</div></div><div style="width:45%"><div class="progress-track"><div class="progress-bar" style="width:${Math.round(item.value / total * 100)}%"></div></div></div></div>`).join("")}</div></section><section class="panel"><div class="panel-heading"><h2>充值包</h2><span class="tag">展示版</span></div><div class="panel-body"><div class="credit-pack"><strong>5,000 點</strong><button class="text-button" onclick="notify('5,000 點方案已選取')">選取</button></div><div class="credit-pack"><strong>20,000 點</strong><button class="text-button" onclick="notify('20,000 點方案已選取')">選取</button></div><div class="credit-pack"><strong>企業自訂</strong><button class="text-button" onclick="notify('企業點數洽詢已準備')">洽詢</button></div></div></section></div>`;
}

function renderMeeting() {
  genericView("蝦會議", "錄音、逐字稿、會議摘要、待辦與匯出會集中在這裡。",
    `<div class="dashboard-grid">${stat("逐字稿", "即時", "語音轉文字")}${stat("重點摘要", "自動", "決議與待辦")}${stat("匯出", "PDF / DOCX", "會議紀錄")}${stat("同步", "日曆", "Google / Outlook")}</div>` +
    `<div class="content-grid"><section class="panel panel-body"><div class="eyebrow">MEETING INPUT</div><h2>上傳錄音或貼上會議連結</h2><p class="soft-text">支援會議錄音、影片檔、逐字稿與線上會議連結。蝦妹會整理摘要、行動項目、負責人與截止時間。</p><div class="form-inline"><input placeholder="貼上會議連結或檔名" /><button class="button button-primary" onclick="notify('會議分析入口已準備')">開始分析</button></div></section><section class="panel"><div class="panel-heading"><h2>會議模板</h2><span class="tag">研究後補齊</span></div><div class="panel-body"><div class="check-row">客戶需求訪談<span>摘要＋需求表</span></div><div class="check-row">內部週會<span>待辦＋風險</span></div><div class="check-row">課程諮詢<span>重點＋回覆稿</span></div></div></section></div>`);
}

function renderRailway() {
  genericView("蝦鐵路", "把任務從接收、研究、執行、驗證到交付，整理成可追蹤的工作流軌道。",
    `<section class="panel railway-panel">${railwayStages.map((stage, index) => `<div class="railway-step"><div class="railway-node">${index + 1}</div><div><h3>${esc(stage.title)}</h3><p>${esc(stage.detail)}</p><span class="status status-completed">${esc(stage.status)}</span></div></div>`).join("")}</section>` +
    `<section class="panel"><div class="panel-heading"><h2>常用軌道</h2><span class="tag">可直接套用</span></div>${moduleGrid([
      { icon: "🎨", title: "文案到海報", detail: "確認清單、image2 / ComfyUI 路由、原圖驗證與文件模式回傳。", tag: "圖片" },
      { icon: "🎬", title: "素材到短影音", detail: "分析影片、轉字幕、封面、背景音樂、直式 MP4 輸出。", tag: "影片" },
      { icon: "🌐", title: "網站更新部署", detail: "修改真實檔案、本機驗證、提交 GitHub、驗證公開網址。", tag: "網站" },
      { icon: "🛒", title: "蝦皮賣家", detail: "申請、EasyBoss 授權、商品採集、繁中化、合規與上架檢查。", tag: "商務" }
    ])}</section>`);
}

function renderPricing() {
  genericView("訂閱方案", "依照使用量升級你的工作能力。",
    `<div class="pricing-grid"><article class="price-card"><div class="price-label">目前可展示</div><h3>免費版</h3><div class="price">$0 <small>/ 月</small></div><ul><li>基礎任務與教學</li><li>少量蝦飼料</li><li>單人工作區</li><li>核心技能體驗</li></ul><button class="button button-ghost" onclick="notify('免費版已選取')">使用免費版</button></article><article class="price-card price-card-featured"><div class="price-label">推薦</div><h3>專業版</h3><div class="price">$25 <small>/ 月</small></div><ul><li>完整技能市集</li><li>較高並行任務</li><li>圖片、影片與網站工作流</li><li>優先任務追蹤</li></ul><button class="button button-primary" onclick="notify('專業版升級入口已準備')">升級專業版</button></article><article class="price-card"><div class="price-label">團隊</div><h3>企業版</h3><div class="price">客製</div><ul><li>多人座席</li><li>集中計費</li><li>權限控管</li><li>企業流程客製</li></ul><button class="button button-ghost" onclick="notify('企業洽詢入口已準備')">聯繫我們</button></article></div>` +
    `<section class="panel table-wrap plan-table"><table class="data-table"><thead><tr><th>功能</th><th>免費版</th><th>專業版</th><th>企業版</th></tr></thead><tbody><tr><td>蝦任務</td><td>基礎</td><td>完整</td><td>團隊管理</td></tr><tr><td>蝦技能</td><td>體驗</td><td>完整市集</td><td>客製技能</td></tr><tr><td>蝦排程</td><td>少量</td><td>多排程</td><td>集中監控</td></tr><tr><td>資料整合</td><td>手動</td><td>Drive / Notion / Sheets</td><td>企業系統串接</td></tr></tbody></table></section>`);
}

function renderUnlock() {
  genericView("功能解鎖", "把原站研究到的能力整理成可啟用模組，方便後續逐步接 API。",
    `<div class="dashboard-grid">${stat("已整理功能", researchedModules.length, "核心能力")}${stat("通訊整合", "LINE / TG", "可擴充")}${stat("資料整合", "Drive / Notion", "展示入口")}${stat("交付格式", "8 類", "檔案與網址")}</div>` +
    moduleGrid(researchedModules));
}

function renderEnterprise() {
  genericView("企業／團隊", "管理團隊座席、集中計費、權限控管與企業客製流程。",
    `<div class="content-grid"><section class="panel panel-body"><div class="eyebrow">TEAM WORKSPACE</div><h2>把藍星蝦妹帶進團隊</h2><p class="soft-text">可設定成員角色、限制可用技能、分配蝦飼料、建立共同知識庫，並保留任務交付紀錄。</p><div class="form-inline"><input placeholder="輸入企業名稱" /><button class="button button-primary" onclick="notify('企業工作區建立流程已準備')">建立工作區</button></div></section><section class="panel"><div class="panel-heading"><h2>企業控管</h2><span class="tag">細節已補</span></div><div class="panel-body"><div class="check-row">成員與角色<span>Owner / Admin / Member</span></div><div class="check-row">技能權限<span>依角色開放</span></div><div class="check-row">集中計費<span>點數與訂閱</span></div><div class="check-row">交付稽核<span>任務與檔案紀錄</span></div></div></section></div>`);
}

function renderTutorials() {
  genericView("蝦教室", "從入門到建立自己的 AI 工作流，完成教學可得蝦飼料獎勵。",
    `<div class="dashboard-grid">${stat("教學單元", lessons.length, "已整理")}${stat("完成獎勵", "蝦飼料", "完成教學可得")}${stat("新手路線", "5 步", "任務到交付")}${stat("支援形式", "圖文 / 影片", "可擴充")}</div>` +
    `<section class="panel lesson-list">${lessons.map((item) => `<article class="lesson-row"><div><h3>${esc(item.title)}</h3><p>${esc(item.detail)}</p><div class="progress-track"><div class="progress-bar" style="width:${item.progress}%"></div></div></div><button class="button button-ghost button-small" onclick="notify('教學單元已開啟')">開始</button></article>`).join("")}</section>`);
}

function renderOnboarding() {
  genericView("教學引導", "把新使用者帶完帳號、任務、技能、排程與交付設定。",
    `<section class="panel onboarding-steps"><div class="onboarding-step done"><strong>1. 建立帳號</strong><span>電子郵件、Google 或 FaceID 入口</span></div><div class="onboarding-step done"><strong>2. 選擇語言</strong><span>繁體中文為預設顯示</span></div><div class="onboarding-step"><strong>3. 建立第一個任務</strong><span>指定結果、限制與交付格式</span></div><div class="onboarding-step"><strong>4. 啟用技能</strong><span>做圖、影片、網站、文件、語音</span></div><div class="onboarding-step"><strong>5. 綁定通道</strong><span>Telegram、LINE、Google、Notion</span></div></section>` +
    `<div class="empty-state panel">完成全部引導後，可解鎖新手蝦飼料獎勵。<br><button class="button button-primary" style="margin-top:18px" onclick="notify('教學獎勵領取入口已準備')">領取獎勵</button></div>`);
}

function renderSupport() {
  genericView("Iris 客服", "把使用上的問題、建議與需求交給客服助理整理。",
    `<div class="support-grid"><section class="panel iris-panel"><div class="iris-avatar">Iris</div><h2>客服助理已待命</h2><p class="soft-text">可處理客訴回覆、功能問題、訂閱方案、交付遺漏、權限開通與網站部署問題。</p><div class="quick-grid compact"><button class="quick-card" onclick="notify('客訴回覆模板已準備')"><span>😤</span><strong>客訴回覆</strong></button><button class="quick-card" onclick="notify('缺檔補送流程已準備')"><span>📎</span><strong>缺檔補送</strong></button><button class="quick-card" onclick="notify('方案諮詢流程已準備')"><span>👑</span><strong>方案諮詢</strong></button></div></section><section class="panel panel-body"><div class="field"><label>主旨</label><input id="support-subject" placeholder="例如：我想了解企業版" /></div><div class="field"><label>內容</label><textarea id="support-message" placeholder="請描述你的問題或需求"></textarea></div><button class="button button-primary" id="send-support">送出訊息</button></section></div>`);
  document.querySelector("#send-support").onclick = () => notify("客服訊息已送出");
}

function genericView(title, subtitle, body) {
  root.innerHTML = layout(title, subtitle) + body;
}

async function renderView(view) {
  state.view = view;
  document.querySelectorAll(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  try {
    if (view === "tasks") return renderTasks();
    if (view === "skills") return renderSkills();
    if (view === "schedules") return renderSchedules();
    if (view === "files") return renderFiles();
    if (view === "credits") return renderCredits();
    if (view === "pricing") return renderPricing();
    if (view === "admin") return renderAdmin();
    if (view === "settings") return renderSettings();
    if (view === "meeting") return renderMeeting();
    if (view === "tracking" || view === "railway") return renderRailway();
    if (view === "unlock") return renderUnlock();
    if (view === "enterprise") return renderEnterprise();
    if (view === "tutorials") return renderTutorials();
    if (view === "onboarding") return renderOnboarding();
    if (view === "support") return renderSupport();
  } catch (error) { handleError(error); }
}

async function renderAdmin() {
  const data = await api("/api/admin/overview");
  genericView("管理總覽", "查看整個藍星蝦妹工作區的使用概況與待處理事項。", `<div class="dashboard-grid">${stat("註冊使用者", data.users, "累積帳號")}${stat("目前活躍", data.activeUsers, "近 24 小時")}${stat("本月營收", data.revenue, "訂閱與點數")}${stat("待處理回饋", data.pendingFeedback, "需要回覆")}</div><section class="panel table-wrap"><table class="data-table"><thead><tr><th>使用者</th><th>主旨</th><th>狀態</th><th>日期</th></tr></thead><tbody>${data.feedback.map((item) => `<tr><td>${esc(item.name)}</td><td>${esc(item.subject)}</td><td><span class="status ${item.status === "已回覆" ? "status-completed" : "status-queued"}">${esc(item.status)}</span></td><td>${esc(item.createdAt)}</td></tr>`).join("")}</tbody></table></section>`);
}

async function renderSettings() {
  const data = await api("/api/settings");
  genericView("蝦設定", "管理顯示、通知、模型偏好、頻道整合與安全交付規則。",
    `<div class="settings-grid"><section class="setting-block"><h3>基本偏好</h3><div class="field"><label>顯示語言</label><select id="setting-language"><option ${data.settings.language === "繁體中文" ? "selected" : ""}>繁體中文</option><option>English</option><option>日本語</option></select></div><div class="field"><label>時區</label><select id="setting-timezone"><option>Asia/Taipei</option><option>Asia/Shanghai</option></select></div><div class="field"><label>預設模型</label><select><option>GPT-5.6</option><option>GPT-5.5</option><option>Gemini</option><option>Claude</option></select></div><button class="button button-primary" id="save-settings">儲存設定</button></section><section class="setting-block"><h3>通知與工作區</h3><div class="toggle-row">任務完成通知<button class="toggle ${data.settings.notifications ? "on" : ""}" id="toggle-notifications"></button></div><div class="toggle-row">緊湊列表模式<button class="toggle ${data.settings.compactMode ? "on" : ""}" id="toggle-compact"></button></div><div class="toggle-row">交付前驗證<button class="toggle on"></button></div><div class="toggle-row">同源回傳鎖定<button class="toggle on"></button></div></section></div>` +
    `<section class="panel integration-panel"><div class="panel-heading"><h2>通道與資料整合</h2><span class="tag">原站功能已補</span></div>${moduleGrid([
      { icon: "💬", title: "LINE 官方帳號", detail: "接收客戶訊息、客服回覆與任務通知。", tag: "待綁定" },
      { icon: "✈️", title: "Telegram", detail: "同源收件、文件模式回傳與任務追蹤。", tag: "已支援" },
      { icon: "🗓️", title: "Google 日曆", detail: "排程、會議與提醒同步。", tag: "待綁定" },
      { icon: "📄", title: "Notion", detail: "知識庫、SOP 與任務紀錄同步。", tag: "待綁定" },
      { icon: "☁️", title: "Google Drive", detail: "成果檔案與素材備份。", tag: "待綁定" },
      { icon: "✉️", title: "Outlook / Email", detail: "通知、報告與客戶回覆寄送。", tag: "待綁定" }
    ])}</section>`);
  document.querySelector("#save-settings").onclick = async () => { await api("/api/settings", { method: "POST", body: JSON.stringify({ language: document.querySelector("#setting-language").value }) }); notify("設定已儲存"); };
  document.querySelectorAll(".setting-block .toggle").forEach((button) => button.onclick = () => button.classList.toggle("on"));
}

function modal(title, content, onSubmit) {
  modalRoot.innerHTML = `<div class="modal-backdrop"><div class="modal"><div class="modal-heading"><h2>${title}</h2><button class="modal-close" aria-label="關閉">×</button></div><div class="modal-body">${content}</div></div></div>`;
  modalRoot.querySelector(".modal-close").onclick = () => modalRoot.innerHTML = "";
  modalRoot.querySelector(".modal-backdrop").onclick = (event) => { if (event.target.classList.contains("modal-backdrop")) modalRoot.innerHTML = ""; };
  onSubmit(modalRoot.querySelector(".modal-body"));
}

function showTaskModal() {
  modal("新增 AI 任務", `<div class="field"><label>任務標題</label><input id="task-title" placeholder="例如：整理本週市場研究資料" /></div><div class="field"><label>交代內容</label><textarea id="task-prompt" placeholder="描述你希望蝦妹完成的結果、格式與限制"></textarea></div><div class="field"><label>模型</label><select id="task-model"><option>GPT-5.5</option><option>Gemini 3.1 Pro</option><option>Claude Opus</option><option>gpt-image-2</option><option>Seedance 2.0</option></select></div><div class="modal-actions"><button class="button button-ghost modal-cancel">取消</button><button class="button button-primary" id="submit-task">建立任務</button></div>`, (body) => {
    body.querySelector(".modal-cancel").onclick = () => modalRoot.innerHTML = "";
    body.querySelector("#submit-task").onclick = async () => {
      try { await api("/api/tasks", { method: "POST", body: JSON.stringify({ title: body.querySelector("#task-title").value, prompt: body.querySelector("#task-prompt").value, model: body.querySelector("#task-model").value }) }); modalRoot.innerHTML = ""; notify("任務已建立"); renderTasks(); } catch (error) { handleError(error); }
    };
  });
}

function showScheduleModal() {
  modal("新增排程", `<div class="field"><label>排程名稱</label><input id="schedule-title" placeholder="例如：每日早報" /></div><div class="field"><label>執行內容</label><input id="schedule-detail" placeholder="例如：台股、AI 產業與天氣摘要" /></div><div class="field"><label>頻率</label><select id="schedule-cadence"><option>每天 08:00</option><option>每天 18:00</option><option>每週一 09:00</option></select></div><div class="modal-actions"><button class="button button-ghost modal-cancel">取消</button><button class="button button-primary" id="submit-schedule">建立排程</button></div>`, (body) => {
    body.querySelector(".modal-cancel").onclick = () => modalRoot.innerHTML = "";
    body.querySelector("#submit-schedule").onclick = async () => { try { await api("/api/schedules", { method: "POST", body: JSON.stringify({ title: body.querySelector("#schedule-title").value, detail: body.querySelector("#schedule-detail").value, cadence: body.querySelector("#schedule-cadence").value }) }); modalRoot.innerHTML = ""; notify("排程已建立"); renderSchedules(); } catch (error) { handleError(error); } };
  });
}

function showFileModal() {
  modal("登錄檔案", `<div class="field"><label>檔案名稱</label><input id="file-name" placeholder="例如：品牌簡報.pdf" /></div><div class="field"><label>檔案類型</label><select id="file-type"><option>PDF</option><option>DOCX</option><option>XLSX</option><option>PNG</option><option>MP4</option></select></div><div class="field"><label>大小</label><input id="file-size" placeholder="例如：1.2 MB" /></div><div class="modal-actions"><button class="button button-ghost modal-cancel">取消</button><button class="button button-primary" id="submit-file">登錄檔案</button></div>`, (body) => {
    body.querySelector(".modal-cancel").onclick = () => modalRoot.innerHTML = "";
    body.querySelector("#submit-file").onclick = async () => { try { await api("/api/files", { method: "POST", body: JSON.stringify({ name: body.querySelector("#file-name").value, type: body.querySelector("#file-type").value, size: body.querySelector("#file-size").value }) }); modalRoot.innerHTML = ""; notify("檔案已登錄"); renderFiles(); } catch (error) { handleError(error); } };
  });
}

function handleError(error) {
  if (error.message === "請先登入") return showLogin();
  notify(error.message || "操作失敗");
}

function showLogin() {
  modalRoot.innerHTML = `
    <div class="login-screen">
      <section class="login-card" aria-label="登入藍星蝦妹">
        <div class="login-logo-panel">
          <div class="login-logo-rings"><span>🦐</span></div>
          <div class="login-logo-title">藍星蝦妹</div>
          <div class="login-logo-subtitle">BLUESTAR CLAW</div>
        </div>
        <form class="login-form" id="login-form">
          <h1>登入</h1>
          <div class="login-field">
            <label for="login-email">電子郵件</label>
            <input id="login-email" type="email" autocomplete="email" placeholder="your@email.com" required />
          </div>
          <div class="login-field">
            <label for="login-password">密碼</label>
            <input id="login-password" type="password" autocomplete="current-password" placeholder="至少 8 個字元" required minlength="8" />
          </div>
          <button class="login-primary" id="submit-login" type="submit">登入</button>
          <div class="login-divider"><span></span><small>或</small><span></span></div>
          <button class="login-provider" type="button" id="google-login"><strong>G</strong><span>用 Google 登入</span></button>
          <button class="login-provider login-provider-accent" type="button" id="face-login"><strong>🔐</strong><span>用 FaceID 登入</span></button>
          <button class="login-link" type="button" id="forgot-password">忘記密碼？</button>
          <button class="login-register" type="button" id="register-account">還沒有帳號？註冊</button>
        </form>
      </section>
    </div>`;
  const form = modalRoot.querySelector("#login-form");
  form.onsubmit = async (event) => {
    event.preventDefault();
      try {
        const data = await api("/api/auth/login", { method: "POST", body: JSON.stringify({ email: form.querySelector("#login-email").value, password: form.querySelector("#login-password").value }) });
        state.token = data.token; localStorage.setItem("bluestar_token", state.token); syncShell(data.user); modalRoot.innerHTML = ""; notify("登入成功"); renderView(state.view);
      } catch (error) { notify(error.message); }
  };
  modalRoot.querySelector("#google-login").onclick = () => notify("Google 登入入口已準備");
  modalRoot.querySelector("#face-login").onclick = () => notify("FaceID 登入入口已準備");
  modalRoot.querySelector("#forgot-password").onclick = () => notify("密碼重設入口已準備");
  modalRoot.querySelector("#register-account").onclick = () => notify("註冊入口已準備");
}

document.querySelectorAll(".nav-item").forEach((button) => button.onclick = () => {
  document.querySelector(".sidebar").classList.remove("open");
  renderView(button.dataset.view);
});
document.querySelector("#mobile-menu").onclick = () => document.querySelector(".sidebar").classList.toggle("open");
document.querySelector("#language-select").onchange = (event) => notify(`顯示語言已切換為 ${event.target.value}`);
document.querySelector("#logout").onclick = async () => { try { await api("/api/auth/logout", { method: "POST" }); } catch {} localStorage.removeItem("bluestar_token"); state.token = null; showLogin(); };
document.querySelector("#profile-button").onclick = () => renderView("settings");

async function boot() {
  try {
    if (!state.token) return showLogin();
    const data = await api("/api/auth/me");
    syncShell(data.user);
    await renderView(state.view);
  } catch {
    localStorage.removeItem("bluestar_token");
    state.token = null;
    showLogin();
  }
}

boot();
