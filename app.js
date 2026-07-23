const state = {
  token: localStorage.getItem("bluestar_token"),
  view: "tasks",
  cache: {},
  skillFilter: "全部",
  skillQuery: ""
};

const root = document.querySelector("#view-root");
const toast = document.querySelector("#toast");
const modalRoot = document.querySelector("#modal-root");
const staticData = window.BLUESTAR_STATIC_DATA || null;
let staticMode = location.protocol === "file:" || location.hostname.endsWith("github.io");

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

async function renderTasks() {
  const data = await api("/api/dashboard");
  state.cache.dashboard = data;
  document.querySelector("#credit-pill").textContent = `蝦飼料：${data.user.credits.toLocaleString()}`;
  document.querySelector("#profile-name").textContent = data.user.name;
  document.querySelector("#avatar").textContent = data.user.name.slice(0, 1);
  root.innerHTML = layout("蝦任務", "把想完成的結果交代給蝦妹，工作區會留下每一步紀錄。", `<button class="button button-primary" id="new-task">＋ 新增任務</button>`) +
    `<div class="dashboard-grid">${stat("全部任務", data.stats.totalTasks, "累積任務")}${stat("執行中", data.stats.runningTasks, "正在處理")}${stat("已安裝技能", data.stats.installedSkills, "可直接使用")}${stat("啟用排程", data.stats.schedules, "自動執行中")}</div>` +
    `<div class="content-grid"><section class="panel"><div class="panel-heading"><h2>最近任務</h2><button class="text-button" id="refresh-tasks">重新整理</button></div>${data.recentTasks.map((task) => `<div class="task-row"><div><div class="task-title">${esc(task.title)}</div><div class="task-meta">${esc(task.model)} · ${new Date(task.createdAt).toLocaleString("zh-TW", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div></div><span class="status status-${task.status}">${statusLabel(task.status)}</span></div>`).join("")}</section><section class="panel"><div class="panel-heading"><h2>活動紀錄</h2></div><div class="panel-body">${data.activity.map((item) => `<div class="activity-item"><span class="activity-dot"></span><div>${esc(item.text)}<small>${esc(item.time)}</small></div></div>`).join("")}</div></section></div>`;
  document.querySelector("#new-task").onclick = showTaskModal;
  document.querySelector("#refresh-tasks").onclick = () => renderTasks().catch(handleError);
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
  root.innerHTML = layout("龍蝦小包包", "集中查看這個工作區的報告、簡報、文件與素材。", `<button class="button button-primary" id="new-file">＋ 登錄檔案</button>`) + `<section class="panel table-wrap"><table class="data-table"><thead><tr><th>檔案</th><th>類型</th><th>大小</th><th>更新日期</th><th>操作</th></tr></thead><tbody>${data.files.map((file) => `<tr><td><strong>${esc(file.name)}</strong></td><td>${esc(file.type)}</td><td>${esc(file.size)}</td><td>${esc(file.updatedAt)}</td><td><button class="text-button">查看</button></td></tr>`).join("")}</tbody></table></section>`;
  document.querySelector("#new-file").onclick = showFileModal;
}

async function renderCredits() {
  const data = await api("/api/credits");
  const total = data.usage.reduce((sum, item) => sum + item.value, 0);
  root.innerHTML = layout("蝦飼料", "透明查看點數餘額與近期使用方向。") + `<div class="dashboard-grid">${stat("目前餘額", data.balance.toLocaleString(), "點")}${stat("本月使用", total.toLocaleString(), "點")}${stat("方案", "專業版", "每月自動更新")}${stat("用量趨勢", "穩定", "近 30 天")}</div><section class="panel"><div class="panel-heading"><h2>使用分布</h2><span class="tag">近 30 天</span></div><div class="panel-body">${data.usage.map((item) => `<div class="list-row" style="padding:14px 0"><div><strong>${esc(item.label)}</strong><div class="task-meta">${item.value.toLocaleString()} 點</div></div><div style="width:45%"><div class="progress-track"><div class="progress-bar" style="width:${Math.round(item.value / total * 100)}%"></div></div></div></div>`).join("")}</div></section>`;
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
    if (view === "pricing") return genericView("訂閱方案", "依照使用量升級你的工作能力。", `<div class="pricing-grid"><article class="price-card"><div class="price-label">目前方案</div><h3>專業版</h3><div class="price">$25 <small>/ 月</small></div><ul><li>50,000 蝦飼料點數</li><li>10 個並行任務</li><li>完整模型與技能</li></ul><button class="button button-primary" onclick="notify('升級流程已準備')">管理方案</button></article><article class="price-card price-card-featured"><div class="price-label">推薦</div><h3>企業版</h3><div class="price">客製</div><ul><li>多人座席</li><li>集中計費</li><li>團隊管理儀表板</li></ul><button class="button button-ghost" onclick="notify('已記錄企業諮詢需求')">聯繫我們</button></article></div>`);
    if (view === "admin") return renderAdmin();
    if (view === "settings") return renderSettings();
    if (view === "meeting") return genericView("蝦會議", "錄音、逐字稿與會議重點會集中在這裡。", `<div class="empty-state panel">目前沒有待處理的會議檔案。<br><button class="button button-primary" style="margin-top:18px" onclick="notify('會議上傳入口已準備')">上傳錄音</button></div>`);
    if (view === "tracking") return genericView("追蹤中心", "管理價格追蹤、投資追蹤與長期觀察項目。", `<div class="empty-state panel">尚未建立追蹤項目。<br><button class="button button-primary" style="margin-top:18px" onclick="notify('追蹤項目建立入口已準備')">新增追蹤</button></div>`);
    if (view === "unlock") return genericView("功能解鎖", "查看目前方案可用功能與尚未開放的能力。", `<div class="feature-grid"><article class="feature-card"><span class="feature-icon">◈</span><h3>Google Drive</h3><p>把蝦妹產出的文件整理到你的雲端硬碟。</p></article><article class="feature-card"><span class="feature-icon">◎</span><h3>Notion 工作區</h3><p>搜尋、整理與建立知識文件。</p></article><article class="feature-card"><span class="feature-icon">✉</span><h3>Email 成果寄送</h3><p>把任務結果自動寄到指定信箱。</p></article></div>`);
    if (view === "enterprise") return genericView("企業／團隊", "管理團隊座席、集中計費與企業工作流。", `<section class="panel panel-body"><div class="eyebrow">TEAM WORKSPACE</div><h2>把蝦妹帶進團隊</h2><p style="color:var(--ink-soft);line-height:1.8">目前工作區為單人模式。建立企業方案後，可邀請成員、配置技能與查看團隊用量。</p><button class="button button-primary" onclick="notify('企業邀請功能已準備')">建立企業工作區</button></section>`);
    if (view === "tutorials") return genericView("蝦教室", "從入門到建立自己的 AI 工作流。", `<div class="feature-grid"><article class="feature-card feature-card-wide"><span class="feature-icon">◎</span><h3>第一堂：交代一個清楚的任務</h3><p>學會把目標、限制與交付格式說清楚，讓蝦妹一次完成。</p><div class="feature-tags"><span>入門</span><span>尚未完成</span></div></article><article class="feature-card"><span class="feature-icon">✦</span><h3>技能安裝</h3><p>學會挑選與管理技能。</p></article></div>`);
    if (view === "support") return genericView("站內客服中心", "把使用上的問題、建議與需求交給團隊。", `<section class="panel panel-body"><div class="field"><label>主旨</label><input id="support-subject" placeholder="例如：我想了解企業版" /></div><div class="field"><label>內容</label><textarea id="support-message" placeholder="請描述你的問題或需求"></textarea></div><button class="button button-primary" id="send-support">送出訊息</button></section>`);
  } catch (error) { handleError(error); }
}

async function renderAdmin() {
  const data = await api("/api/admin/overview");
  genericView("管理總覽", "查看整個藍星蝦妹工作區的使用概況與待處理事項。", `<div class="dashboard-grid">${stat("註冊使用者", data.users, "累積帳號")}${stat("目前活躍", data.activeUsers, "近 24 小時")}${stat("本月營收", data.revenue, "訂閱與點數")}${stat("待處理回饋", data.pendingFeedback, "需要回覆")}</div><section class="panel table-wrap"><table class="data-table"><thead><tr><th>使用者</th><th>主旨</th><th>狀態</th><th>日期</th></tr></thead><tbody>${data.feedback.map((item) => `<tr><td>${esc(item.name)}</td><td>${esc(item.subject)}</td><td><span class="status ${item.status === "已回覆" ? "status-completed" : "status-queued"}">${esc(item.status)}</span></td><td>${esc(item.createdAt)}</td></tr>`).join("")}</tbody></table></section>`);
}

async function renderSettings() {
  const data = await api("/api/settings");
  genericView("蝦設定", "管理顯示、通知與工作區偏好。", `<div class="settings-grid"><section class="setting-block"><h3>基本偏好</h3><div class="field"><label>顯示語言</label><select id="setting-language"><option ${data.settings.language === "繁體中文" ? "selected" : ""}>繁體中文</option><option>简体中文</option></select></div><div class="field"><label>時區</label><select id="setting-timezone"><option>Asia/Taipei</option><option>Asia/Shanghai</option></select></div><button class="button button-primary" id="save-settings">儲存設定</button></section><section class="setting-block"><h3>通知與工作區</h3><div class="toggle-row">任務完成通知<button class="toggle ${data.settings.notifications ? "on" : ""}" id="toggle-notifications"></button></div><div class="toggle-row">緊湊列表模式<button class="toggle ${data.settings.compactMode ? "on" : ""}" id="toggle-compact"></button></div></section></div>`);
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
  modal("登入藍星蝦妹", `<div class="field"><label>電子郵件</label><input id="login-email" type="email" placeholder="your@email.com" /></div><div class="field"><label>密碼</label><input id="login-password" type="password" placeholder="至少 8 個字元" /></div><div class="modal-actions"><button class="button button-primary" id="submit-login">登入</button></div><p style="color:var(--ink-soft);font-size:12px;margin:14px 0 0">啟動服務時可用 APP_ADMIN_EMAIL 與 APP_ADMIN_PASSWORD 設定帳號。</p>`, (body) => {
    body.querySelector("#submit-login").onclick = async () => {
      try {
        const data = await api("/api/auth/login", { method: "POST", body: JSON.stringify({ email: body.querySelector("#login-email").value, password: body.querySelector("#login-password").value }) });
        state.token = data.token; localStorage.setItem("bluestar_token", state.token); modalRoot.innerHTML = ""; notify("登入成功"); renderView(state.view);
      } catch (error) { notify(error.message); }
    };
  });
}

document.querySelectorAll(".nav-item").forEach((button) => button.onclick = () => {
  document.querySelector(".sidebar").classList.remove("open");
  renderView(button.dataset.view);
});
document.querySelector("#mobile-menu").onclick = () => document.querySelector(".sidebar").classList.toggle("open");
document.querySelector("#logout").onclick = async () => { try { await api("/api/auth/logout", { method: "POST" }); } catch {} localStorage.removeItem("bluestar_token"); state.token = null; showLogin(); };
document.querySelector("#profile-button").onclick = () => renderView("settings");

async function boot() {
  try {
    if (staticMode && staticData && !state.token) {
      state.token = "static-demo-token";
      localStorage.setItem("bluestar_token", state.token);
    }
    if (!state.token) return showLogin();
    await api("/api/auth/me");
    await renderTasks();
  } catch {
    localStorage.removeItem("bluestar_token");
    state.token = null;
    showLogin();
  }
}

boot();
