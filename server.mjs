import http from "node:http";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, "public");
const dataDir = path.join(root, "data");
const dataFile = path.join(dataDir, "store.json");
const port = Number(process.env.PORT || 4173);
const configuredEmail = process.env.APP_ADMIN_EMAIL || "admin@bluestar.local";
const configuredPassword = process.env.APP_ADMIN_PASSWORD || "demo12345";
const sessions = new Map();

const seed = {
  users: [
    {
      id: "usr_owner",
      name: "藍星主人",
      email: configuredEmail,
      role: "owner",
      plan: "專業版",
      credits: 12880,
      createdAt: "2026-07-23T08:00:00.000Z"
    }
  ],
  tasks: [
    {
      id: "task_001",
      title: "整理本週市場研究資料",
      prompt: "整理本週 AI 產業市場趨勢，輸出重點、引用來源與可執行建議。",
      model: "GPT-5.5",
      status: "completed",
      credits: 860,
      createdAt: "2026-07-22T09:30:00.000Z"
    },
    {
      id: "task_002",
      title: "製作藍星平台功能海報",
      prompt: "產出繁體中文 9:16 科技風平台介紹海報。",
      model: "gpt-image-2",
      status: "running",
      credits: 420,
      createdAt: "2026-07-23T02:10:00.000Z"
    }
  ],
  schedules: [
    {
      id: "sch_001",
      title: "每日早報",
      detail: "台股、AI 產業與天氣摘要",
      cadence: "每天 08:00",
      channel: "Telegram",
      enabled: true
    },
    {
      id: "sch_002",
      title: "每週工作整理",
      detail: "整理任務成果與待辦",
      cadence: "每週一 09:00",
      channel: "站內",
      enabled: false
    }
  ],
  files: [
    { id: "file_001", name: "藍星平台功能總覽.pdf", type: "PDF", size: "2.4 MB", updatedAt: "2026-07-22" },
    { id: "file_002", name: "蝦妹品牌文案.docx", type: "DOCX", size: "384 KB", updatedAt: "2026-07-20" }
  ],
  skills: [
    { id: "skill_research", icon: "⌕", name: "深度研究 Pro", detail: "多查詢搜尋、去重與引用整理", installed: true, tag: "研究" },
    { id: "skill_copy", icon: "✎", name: "文案撰寫", detail: "廣告、社群、產品與品牌內容", installed: true, tag: "內容" },
    { id: "skill_image", icon: "◈", name: "AI 圖片創作", detail: "海報、商品圖與風格視覺", installed: true, tag: "視覺" },
    { id: "skill_sheet", icon: "▦", name: "Excel 進階分析", detail: "公式、樞紐分析與圖表", installed: false, tag: "資料" },
    { id: "skill_seo", icon: "⌁", name: "SEO 審計", detail: "網站結構、內容與關鍵字檢查", installed: false, tag: "成長" },
    { id: "skill_travel", icon: "✈", name: "旅遊規劃", detail: "行程、交通、預算與景點安排", installed: false, tag: "生活" }
  ],
  feedback: [
    { id: "fb_001", name: "王小姐", subject: "想了解企業版", status: "待處理", createdAt: "2026-07-23" },
    { id: "fb_002", name: "陳先生", subject: "技能市集建議", status: "已回覆", createdAt: "2026-07-22" }
  ],
  activity: [
    { text: "任務「整理本週市場研究資料」已完成", time: "今天 09:42", tone: "success" },
    { text: "已安裝技能「AI 圖片創作」", time: "昨天 18:20", tone: "info" },
    { text: "每日早報排程已啟用", time: "昨天 08:00", tone: "warning" }
  ]
};

async function loadStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    return JSON.parse(await fs.readFile(dataFile, "utf8"));
  } catch {
    await saveStore(seed);
    return structuredClone(seed);
  }
}

async function saveStore(store) {
  await fs.writeFile(dataFile, JSON.stringify(store, null, 2), "utf8");
}

function json(res, status, payload) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "access-control-allow-origin": "*"
  });
  res.end(JSON.stringify(payload));
}

function html(res, file) {
  fs.readFile(path.join(publicDir, file))
    .then((body) => {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(body);
    })
    .catch(() => json(res, 404, { error: "找不到頁面" }));
}

async function body(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return {};
  }
}

function token() {
  return crypto.randomBytes(24).toString("hex");
}

function userFrom(req, store) {
  const header = req.headers.authorization || "";
  const current = sessions.get(header.replace(/^Bearer\s+/i, ""));
  return current ? store.users.find((u) => u.id === current) : null;
}

function requireUser(req, res, store) {
  const user = userFrom(req, store);
  if (!user) {
    json(res, 401, { error: "請先登入" });
    return null;
  }
  return user;
}

function id(prefix) {
  return `${prefix}_${crypto.randomBytes(4).toString("hex")}`;
}

async function handleApi(req, res, store, url) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "content-type, authorization",
      "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS"
    });
    return res.end();
  }

  if (url.pathname === "/api/auth/login" && req.method === "POST") {
    const input = await body(req);
    const email = String(input.email || "").trim().toLowerCase();
    const password = String(input.password || "");
    if (email !== configuredEmail.toLowerCase() || password !== configuredPassword) {
      return json(res, 401, { error: "電子郵件或密碼不正確" });
    }
    const user = store.users[0];
    const accessToken = token();
    sessions.set(accessToken, user.id);
    return json(res, 200, { token: accessToken, user });
  }

  if (url.pathname === "/api/auth/logout" && req.method === "POST") {
    sessions.delete((req.headers.authorization || "").replace(/^Bearer\s+/i, ""));
    return json(res, 200, { ok: true });
  }

  if (url.pathname === "/api/auth/me" && req.method === "GET") {
    const user = requireUser(req, res, store);
    return user ? json(res, 200, { user }) : undefined;
  }

  const user = requireUser(req, res, store);
  if (!user) return;

  if (url.pathname === "/api/dashboard" && req.method === "GET") {
    return json(res, 200, {
      user,
      stats: {
        totalTasks: store.tasks.length,
        runningTasks: store.tasks.filter((x) => x.status === "running").length,
        installedSkills: store.skills.filter((x) => x.installed).length,
        schedules: store.schedules.filter((x) => x.enabled).length
      },
      recentTasks: store.tasks.slice(0, 6),
      activity: store.activity
    });
  }

  if (url.pathname === "/api/tasks" && req.method === "GET") return json(res, 200, { tasks: store.tasks });
  if (url.pathname === "/api/tasks" && req.method === "POST") {
    const input = await body(req);
    const task = {
      id: id("task"),
      title: String(input.title || "未命名任務").trim(),
      prompt: String(input.prompt || "").trim(),
      model: String(input.model || "GPT-5.5"),
      status: "queued",
      credits: Number(input.credits || 120),
      createdAt: new Date().toISOString()
    };
    store.tasks.unshift(task);
    store.activity.unshift({ text: `已建立任務「${task.title}」`, time: "剛剛", tone: "info" });
    await saveStore(store);
    return json(res, 201, { task });
  }
  if (url.pathname.startsWith("/api/tasks/") && req.method === "PATCH") {
    const task = store.tasks.find((x) => x.id === url.pathname.split("/").pop());
    if (!task) return json(res, 404, { error: "找不到任務" });
    const input = await body(req);
    if (input.status) task.status = input.status;
    await saveStore(store);
    return json(res, 200, { task });
  }

  if (url.pathname === "/api/skills" && req.method === "GET") return json(res, 200, { skills: store.skills });
  if (url.pathname.startsWith("/api/skills/") && req.method === "PATCH") {
    const skill = store.skills.find((x) => x.id === url.pathname.split("/").pop());
    if (!skill) return json(res, 404, { error: "找不到技能" });
    skill.installed = !skill.installed;
    await saveStore(store);
    return json(res, 200, { skill });
  }

  if (url.pathname === "/api/schedules" && req.method === "GET") return json(res, 200, { schedules: store.schedules });
  if (url.pathname === "/api/schedules" && req.method === "POST") {
    const input = await body(req);
    const schedule = {
      id: id("sch"),
      title: String(input.title || "新排程"),
      detail: String(input.detail || "自動執行任務"),
      cadence: String(input.cadence || "每天 09:00"),
      channel: String(input.channel || "站內"),
      enabled: true
    };
    store.schedules.unshift(schedule);
    await saveStore(store);
    return json(res, 201, { schedule });
  }
  if (url.pathname.startsWith("/api/schedules/") && req.method === "PATCH") {
    const schedule = store.schedules.find((x) => x.id === url.pathname.split("/").pop());
    if (!schedule) return json(res, 404, { error: "找不到排程" });
    schedule.enabled = !schedule.enabled;
    await saveStore(store);
    return json(res, 200, { schedule });
  }

  if (url.pathname === "/api/files" && req.method === "GET") return json(res, 200, { files: store.files });
  if (url.pathname === "/api/files" && req.method === "POST") {
    const input = await body(req);
    const file = {
      id: id("file"),
      name: String(input.name || "新檔案"),
      type: String(input.type || "FILE"),
      size: String(input.size || "0 KB"),
      updatedAt: new Date().toISOString().slice(0, 10)
    };
    store.files.unshift(file);
    await saveStore(store);
    return json(res, 201, { file });
  }

  if (url.pathname === "/api/credits" && req.method === "GET") {
    return json(res, 200, {
      balance: user.credits,
      usage: [
        { label: "GPT 對話", value: 3460, color: "teal" },
        { label: "圖片創作", value: 1870, color: "pink" },
        { label: "研究與檔案", value: 920, color: "gold" }
      ]
    });
  }

  if (url.pathname === "/api/admin/overview" && req.method === "GET") {
    return json(res, 200, {
      users: 184,
      activeUsers: 72,
      revenue: "US$ 8,460",
      pendingFeedback: store.feedback.filter((x) => x.status === "待處理").length,
      feedback: store.feedback
    });
  }

  if (url.pathname === "/api/settings" && req.method === "GET") {
    return json(res, 200, { settings: { language: "繁體中文", timezone: "Asia/Taipei", notifications: true, compactMode: false } });
  }

  if (url.pathname === "/api/settings" && req.method === "POST") {
    return json(res, 200, { ok: true, message: "設定已更新" });
  }

  return json(res, 404, { error: "找不到 API" });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const store = await loadStore();
  if (url.pathname.startsWith("/api/")) {
    try {
      return await handleApi(req, res, store, url);
    } catch {
      return json(res, 500, { error: "服務暫時無法完成請求" });
    }
  }

  if (url.pathname === "/" || url.pathname === "/index.html") return html(res, "index.html");
  if (url.pathname === "/app" || url.pathname === "/app.html") return html(res, "app.html");
  if (url.pathname.startsWith("/assets/")) {
    try {
      const file = await fs.readFile(path.join(publicDir, url.pathname));
      res.writeHead(200, { "content-type": "application/octet-stream" });
      return res.end(file);
    } catch {
      return json(res, 404, { error: "找不到檔案" });
    }
  }
  try {
    const filePath = path.join(publicDir, url.pathname);
    const file = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    const type = { ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png" }[ext] || "text/plain";
    res.writeHead(200, { "content-type": `${type}; charset=utf-8` });
    res.end(file);
  } catch {
    html(res, "index.html");
  }
});

server.listen(port, () => {
  console.log(`藍星蝦妹已啟動：http://localhost:${port}`);
  console.log(`登入帳號由啟動環境變數 APP_ADMIN_EMAIL / APP_ADMIN_PASSWORD 提供`);
});
