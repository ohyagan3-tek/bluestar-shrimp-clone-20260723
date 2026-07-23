window.BLUESTAR_STATIC_DATA = {
  "generatedAt": "2026-07-23T05:44:19.046Z",
  "user": {
    "id": "usr_demo",
    "name": "藍星主人",
    "email": "demo@bluestar.local",
    "role": "owner",
    "plan": "專業版",
    "credits": 12880,
    "createdAt": "2026-07-23T08:00:00.000Z"
  },
  "tasks": [
    {
      "id": "task_demo_001",
      "title": "整理 AI 產業市場研究",
      "prompt": "輸出重點、來源與可執行建議。",
      "model": "GPT-5.6",
      "status": "completed",
      "credits": 860,
      "createdAt": "2026-07-22T09:30:00.000Z"
    },
    {
      "id": "task_demo_002",
      "title": "製作藍星平台功能海報",
      "prompt": "繁體中文 9:16 科技風平台介紹海報。",
      "model": "gpt-image-2",
      "status": "running",
      "credits": 420,
      "createdAt": "2026-07-23T02:10:00.000Z"
    },
    {
      "id": "task_demo_003",
      "title": "短影音字幕與封面剪輯",
      "prompt": "抖音短影音節奏、字幕、配樂與封面。",
      "model": "ai-auto-short-video-workflow",
      "status": "queued",
      "credits": 220,
      "createdAt": "2026-07-23T04:20:00.000Z"
    }
  ],
  "schedules": [
    {
      "id": "sch_001",
      "title": "每日早報",
      "detail": "市場、天氣與任務摘要",
      "cadence": "每天 08:00",
      "channel": "Telegram",
      "enabled": true
    },
    {
      "id": "sch_002",
      "title": "每週任務整理",
      "detail": "整理成果、待辦與風險",
      "cadence": "每週一 09:00",
      "channel": "站內",
      "enabled": true
    },
    {
      "id": "sch_003",
      "title": "平台登入檢查",
      "detail": "檢查藍星與自動化服務狀態",
      "cadence": "每 2 小時",
      "channel": "系統",
      "enabled": false
    }
  ],
  "files": [
    {
      "id": "file_001",
      "name": "藍星平台功能總覽.pdf",
      "type": "PDF",
      "size": "2.4 MB",
      "updatedAt": "2026-07-22"
    },
    {
      "id": "file_002",
      "name": "蝦妹品牌文案.docx",
      "type": "DOCX",
      "size": "384 KB",
      "updatedAt": "2026-07-20"
    },
    {
      "id": "file_003",
      "name": "短影音成品.mp4",
      "type": "MP4",
      "size": "18.6 MB",
      "updatedAt": "2026-07-23"
    }
  ],
  "skills": [
    {
      "id": "imagegen-1",
      "order": 1,
      "icon": "◎",
      "name": "imagegen",
      "folder": "imagegen",
      "tag": "網站與部署",
      "installed": true,
      "status": "已安裝",
      "detail": "Generate or edit raster images when the task benefits from AI-created bitmap visuals such as photos, illustrations, textures, sprites, mockups, or transparent-background cutouts. Use when Codex should create a brand-new image, transform an existing image, or derive visual variants from references, and the output should be a bitmap asset rather than repo-native code or vector. Do not use when the task is better handled by editing existing SVG/vector/code-native assets, extending an established icon or logo system, or building the visual directly in HTML/CSS/canvas.",
      "bestFor": "Generate or edit raster images when the task benefits from AI-created bitmap visuals such as photos, illustrations, textures, sprites, mockups, o...",
      "flow": [
        "編輯真實網站檔案",
        "本機桌面與手機檢查",
        "提交版本",
        "公開部署",
        "驗證公開網址"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "openai-docs-2",
      "order": 2,
      "icon": "⌕",
      "name": "openai-docs",
      "folder": "openai-docs",
      "tag": "研究與資料",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the user asks how to build with OpenAI products or APIs, asks about Codex itself or choosing Codex surfaces, needs up-to-date official documentation with citations, help choosing the latest model for a use case, latest/current/default-model prompting guidance, or model upgrade and prompt-upgrade guidance; use OpenAI docs MCP tools for non-Codex docs questions, use the Codex manual helper first for broad Codex self-knowledge, and restrict fallback browsing to official OpenAI domains.",
      "bestFor": "Use when the user asks how to build with OpenAI products or APIs, asks about Codex itself or choosing Codex surfaces, needs up-to-date official d...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "plugin-creator-3",
      "order": 3,
      "icon": "✦",
      "name": "plugin-creator",
      "folder": "plugin-creator",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Create and scaffold plugin directories for Codex with a required `.codex-plugin/plugin.json`, optional plugin folders/files, valid manifest defaults, and personal-marketplace entries by default. Use when Codex needs to create a new personal plugin, add optional plugin structure, generate or update marketplace entries for plugin ordering and availability metadata, or update an existing local plugin during development with the CLI-driven cachebuster and reinstall flow.",
      "bestFor": "Create and scaffold plugin directories for Codex with a required `.codex-plugin/plugin.json`, optional plugin folders/files, valid manifest defau...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "review-agent-4",
      "order": 4,
      "icon": "◇",
      "name": "review-agent",
      "folder": "review-agent",
      "tag": "系統與工具",
      "installed": true,
      "status": "已安裝",
      "detail": "Perform a read-only, defect-first review of a specified code change and return every actionable finding. Use when another agent delegates review of uncommitted changes, a base-branch diff, a commit, or custom review instructions.",
      "bestFor": "Perform a read-only, defect-first review of a specified code change and return every actionable finding. Use when another agent delegates review ...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "skill-creator-5",
      "order": 5,
      "icon": "✦",
      "name": "skill-creator",
      "folder": "skill-creator",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Codex's capabilities with specialized knowledge, workflows, or tool integrations.",
      "bestFor": "Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends C...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "skill-installer-6",
      "order": 6,
      "icon": "✦",
      "name": "skill-installer",
      "folder": "skill-installer",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Install Codex skills into $CODEX_HOME/skills from a curated list or a GitHub repo path. Use when a user asks to list installable skills, install a curated skill, or install a skill from another repo (including private repos).",
      "bestFor": "Install Codex skills into $CODEX_HOME/skills from a curated list or a GitHub repo path. Use when a user asks to list installable skills, install ...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "acs-7",
      "order": 7,
      "icon": "⌁",
      "name": "acs",
      "folder": "acs",
      "tag": "瀏覽器與自動化",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the user says acs, nms, asks for 剪映自動剪輯, 對標剪輯, CapCut/Jianying editing automation, video reference analysis, storyboard-to-edit workflows, or wants Codex to operate 剪映專業版 to assemble, match, caption, export, or prepare short videos.",
      "bestFor": "Use when the user says acs, nms, asks for 剪映自動剪輯, 對標剪輯, CapCut/Jianying editing automation, video reference analysis, storyboard-to-edit workflow...",
      "flow": [
        "開啟指定頁面",
        "沿用登入狀態",
        "操作與擷取",
        "驗證結果",
        "回報可交付內容"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "acs2-8",
      "order": 8,
      "icon": "✦",
      "name": "acs2",
      "folder": "acs2",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the operator says acs2 or asks to replicate a reference short video in Jianying/CapCut.",
      "bestFor": "Use when the operator says acs2 or asks to replicate a reference short video in Jianying/CapCut.",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "ai-auto-short-video-workflow-9",
      "order": 9,
      "icon": "⌕",
      "name": "ai-auto-short-video-workflow",
      "folder": "ai-auto-short-video-workflow",
      "tag": "研究與資料",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the owner asks for AI 自動剪短影音、長影音切短影音、照這個工作流剪 3 支、短影音最小閉環、Claude Code 剪短影音，或 wants a long video converted into multiple 9:16 short MP4 clips with transcript-first selection, silence cleanup, Traditional Chinese captions, validation, and same-origin Telegram delivery.",
      "bestFor": "Use when the owner asks for AI 自動剪短影音、長影音切短影音、照這個工作流剪 3 支、短影音最小閉環、Claude Code 剪短影音，或 wants a long video converted into multiple 9:16 short MP4 cl...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "ans-10",
      "order": 10,
      "icon": "✦",
      "name": "ans",
      "folder": "ans",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the operator says ans, asks to run the WeChat mini-program AI video workflow, opens WeChat to create or download a generated video, or needs the completed WeChat digital-human/AI mini-program video verified, renamed safely, and returned to Telegram.",
      "bestFor": "Use when the operator says ans, asks to run the WeChat mini-program AI video workflow, opens WeChat to create or download a generated video, or n...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "auto-reasoning-router-11",
      "order": 11,
      "icon": "⌁",
      "name": "auto-reasoning-router",
      "folder": "auto-reasoning-router",
      "tag": "瀏覽器與自動化",
      "installed": true,
      "status": "已安裝",
      "detail": "Route Telegram/Codex requests to the appropriate reasoning effort. Use when deciding whether a request should run fast with low reasoning for daily chat, lookup, translation, summaries, and simple answers, or with xhigh reasoning for skill creation/update, coding, website work, debugging, deployment, automation, file operations, image/video workflows, and multi-step tasks.",
      "bestFor": "Route Telegram/Codex requests to the appropriate reasoning effort. Use when deciding whether a request should run fast with low reasoning for dai...",
      "flow": [
        "開啟指定頁面",
        "沿用登入狀態",
        "操作與擷取",
        "驗證結果",
        "回報可交付內容"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "bb-browser-12",
      "order": 12,
      "icon": "⌁",
      "name": "bb-browser",
      "folder": "bb-browser",
      "tag": "瀏覽器與自動化",
      "installed": true,
      "status": "已安裝",
      "detail": "强大的信息获取与浏览器自动化工具。通过浏览器 + 用户登录态，获取公域和私域信息。可访问任意网页、内部系统、登录后页面，执行表单填写、信息提取、页面操作。支持 site 系统（36 平台 103 命令一键调用）、带登录态的 fetch、网络请求拦截与 mock、操作录制等高级功能。",
      "bestFor": "强大的信息获取与浏览器自动化工具。通过浏览器 + 用户登录态，获取公域和私域信息。可访问任意网页、内部系统、登录后页面，执行表单填写、信息提取、页面操作。支持 site 系统（36 平台 103 命令一键调用）、带登录态的 fetch、网络请求拦截与 mock、操作录制等高级功能。",
      "flow": [
        "開啟指定頁面",
        "沿用登入狀態",
        "操作與擷取",
        "驗證結果",
        "回報可交付內容"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "binance-coin-research-13",
      "order": 13,
      "icon": "⌕",
      "name": "binance-coin-research",
      "folder": "binance-coin-research",
      "tag": "研究與資料",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the owner says 幣安coin, 幣安 coin, Binance coin, 查詢coin, 查詢 coin, 查coin, 查詢call in, or asks for crypto/token/meme coin research, Binance/OKX hot coin monitoring, Ave.ai contract checking, or a coin report with IMS poster.",
      "bestFor": "Use when the owner says 幣安coin, 幣安 coin, Binance coin, 查詢coin, 查詢 coin, 查coin, 查詢call in, or asks for crypto/token/meme coin research, Binance/OK...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "character-memory-manager-14",
      "order": 14,
      "icon": "✦",
      "name": "character-memory-manager",
      "folder": "character-memory-manager",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Manage reusable character memory for AI images, SD videos, short dramas, voice identity, face references, clothing, personality, and negative constraints. Use when Codex needs to remember, update, or apply fixed characters such as 庫裡, 嵐熙, 蝦妹 across prompts and productions.",
      "bestFor": "Manage reusable character memory for AI images, SD videos, short dramas, voice identity, face references, clothing, personality, and negative con...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "cls-15",
      "order": 15,
      "icon": "⌕",
      "name": "cls",
      "folder": "cls",
      "tag": "研究與資料",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the owner says cls, asks for Claude analysis, or requests scripts, screenplays, video shooting plans, short-video planning, storyboards, SD/SDF/SDV/Dreamina pre-analysis, prompt planning, material lists, or video production content that must first be analyzed through the aggregation platform Claude model at Claude 4.8 or newer.",
      "bestFor": "Use when the owner says cls, asks for Claude analysis, or requests scripts, screenplays, video shooting plans, short-video planning, storyboards,...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "cmsd-16",
      "order": 16,
      "icon": "⌕",
      "name": "cmsd",
      "folder": "cmsd",
      "tag": "研究與資料",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the owner says cmsd, cmde, or asks for the Claude-script-to-IMS-storyboard-to-SD-video workflow. This skill coordinates owner material/copy analysis through aggregation-platform Claude Opus 4.8 first, then IMS 3x3 storyboard image generation, then SD/Dreamina/Seedance video generation from the storyboard with an explicit confirmation checklist before video generation.",
      "bestFor": "Use when the owner says cmsd, cmde, or asks for the Claude-script-to-IMS-storyboard-to-SD-video workflow. This skill coordinates owner material/c...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "codex-skill-handoff-17",
      "order": 17,
      "icon": "✦",
      "name": "codex-skill-handoff",
      "folder": "codex-skill-handoff",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the operator wants to copy, export, package, transfer, or hand off Codex skills/memories to another Codex, OpenClaw, or Telegram bot, including detailed one-pass teaching instructions for the receiver.",
      "bestFor": "Use when the operator wants to copy, export, package, transfer, or hand off Codex skills/memories to another Codex, OpenClaw, or Telegram bot, in...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "codex-zuotu-lanxin-18",
      "order": 18,
      "icon": "✉",
      "name": "codex-zuotu-lanxin",
      "folder": "codex-zuotu-lanxin",
      "tag": "Telegram 與客服",
      "installed": true,
      "status": "已安裝",
      "detail": "Codex 專用做圖技能。當使用者要求做圖、生圖、生成圖片、產圖、做海報、產海報、海報設計、圖片設計、商品圖、行銷圖、社群圖、廣告圖、文案轉圖、PPT轉海報、PDF轉海報、Lanxin AI、蘭心AI、聚合平台做圖時啟用。包含：登入/已登入檢查、聚合平台功能巡檢、確認清單、等待使用者確認、提交生成、自動檢查狀態、下載原始圖片、驗證檔案、回傳 Telegram 文件模式。不得包含或保存帳號密碼、cookie、token、API key。",
      "bestFor": "Codex 專用做圖技能。當使用者要求做圖、生圖、生成圖片、產圖、做海報、產海報、海報設計、圖片設計、商品圖、行銷圖、社群圖、廣告圖、文案轉圖、PPT轉海報、PDF轉海報、Lanxin AI、蘭心AI、聚合平台做圖時啟用。包含：登入/已登入檢查、聚合平台功能巡檢、確認清單、等待使用者確認、...",
      "flow": [
        "判斷來源 bot",
        "執行任務",
        "驗證檔案或狀態",
        "同源回傳",
        "記錄可復用規則"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "codex-bot-zip-vc7x-ta1-19",
      "order": 19,
      "icon": "✉",
      "name": "ims",
      "folder": "codex_bot_zip_vc7x_ta1",
      "tag": "Telegram 與客服",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the owner says ims or asks to generate, create, design, revise, resend, or deliver images/posters/visual designs. This is the single authoritative IMS workflow: Blue Star/Lanxin-only generation, material-first analysis, confirmation before spending credits, fixed profile login continuity, fast stuck detection, original file validation, and same-origin Telegram document delivery.",
      "bestFor": "Use when the owner says ims or asks to generate, create, design, revise, resend, or deliver images/posters/visual designs. This is the single aut...",
      "flow": [
        "判斷來源 bot",
        "執行任務",
        "驗證檔案或狀態",
        "同源回傳",
        "記錄可復用規則"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "control-in-app-browser-20",
      "order": 20,
      "icon": "⌁",
      "name": "control-in-app-browser",
      "folder": "control-in-app-browser",
      "tag": "瀏覽器與自動化",
      "installed": true,
      "status": "已安裝",
      "detail": "Control the in-app Browser. Use to open, navigate, inspect, test, click, type, screenshot, or verify local targets such as localhost, 127.0.0.1, ::1, file://, the current in-app browser tab, and websites shown side by side inside Codex.",
      "bestFor": "Control the in-app Browser. Use to open, navigate, inspect, test, click, type, screenshot, or verify local targets such as localhost, 127.0.0.1, ...",
      "flow": [
        "開啟指定頁面",
        "沿用登入狀態",
        "操作與擷取",
        "驗證結果",
        "回報可交付內容"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "douyin-peipao-21",
      "order": 21,
      "icon": "▶",
      "name": "douyin-peipao",
      "folder": "douyin-peipao",
      "tag": "影片與剪輯",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the owner says 抖音陪跑, Douyin Peipao, 抖音日報, 抖音腳本, 對標影片, or asks for daily Douyin coaching, benchmark topics, short-video scripts, or account-operation follow-up.",
      "bestFor": "Use when the owner says 抖音陪跑, Douyin Peipao, 抖音日報, 抖音腳本, 對標影片, or asks for daily Douyin coaching, benchmark topics, short-video scripts, or accou...",
      "flow": [
        "檢查素材",
        "拆解分鏡或逐幀分析",
        "生成或剪輯影片",
        "驗證時長畫面音訊",
        "輸出 MP4 交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "dreamina-cli-22",
      "order": 22,
      "icon": "✦",
      "name": "dreamina-cli",
      "folder": "dreamina-cli",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the operator says 做sd, sd, sdf, sdv, Dreamina, Seedance, 即夢, 生成影片, or asks to submit, query, download, verify, or deliver AI video jobs through Dreamina CLI.",
      "bestFor": "Use when the operator says 做sd, sd, sdf, sdv, Dreamina, Seedance, 即夢, 生成影片, or asks to submit, query, download, verify, or deliver AI video jobs ...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "dreamina-sd-video-workflow-23",
      "order": 23,
      "icon": "▶",
      "name": "dreamina-sd-video-workflow",
      "folder": "dreamina-sd-video-workflow",
      "tag": "影片與剪輯",
      "installed": true,
      "status": "已安裝",
      "detail": "Run SD/Dreamina/Seedance AI video workflows. Use when Codex needs to analyze materials, prepare 5-15 second SD/SDF/SDV prompts, confirm cost, submit jobs, monitor status, download videos, verify outputs, and deliver results.",
      "bestFor": "Run SD/Dreamina/Seedance AI video workflows. Use when Codex needs to analyze materials, prepare 5-15 second SD/SDF/SDV prompts, confirm cost, sub...",
      "flow": [
        "檢查素材",
        "拆解分鏡或逐幀分析",
        "生成或剪輯影片",
        "驗證時長畫面音訊",
        "輸出 MP4 交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "find-skill-24",
      "order": 24,
      "icon": "⌕",
      "name": "find-skill",
      "folder": "find-skill",
      "tag": "研究與資料",
      "installed": true,
      "status": "已安裝",
      "detail": "Find and install Claude Code skills for a project.",
      "bestFor": "Find and install Claude Code skills for a project.",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "github-pages-deploy-25",
      "order": 25,
      "icon": "◎",
      "name": "github-pages-deploy",
      "folder": "github-pages-deploy",
      "tag": "網站與部署",
      "installed": true,
      "status": "已安裝",
      "detail": "Deploy static websites to GitHub Pages. Use when Codex needs to prepare a static site folder, initialize or update a Git repository, create or update a GitHub repo, push changes, enable GitHub Pages, verify the public github.io URL, and return the final long-term website URL.",
      "bestFor": "Deploy static websites to GitHub Pages. Use when Codex needs to prepare a static site folder, initialize or update a Git repository, create or up...",
      "flow": [
        "編輯真實網站檔案",
        "本機桌面與手機檢查",
        "提交版本",
        "公開部署",
        "驗證公開網址"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "hfsw-26",
      "order": 26,
      "icon": "✦",
      "name": "hfsw",
      "folder": "hfsw",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the owner says hfsw, asks for a Claude-first Hyperframes story video, asks to make a Guan Yu/Zhang Fei style story video, or asks for script-first images-second Hyperframes final video production.",
      "bestFor": "Use when the owner says hfsw, asks for a Claude-first Hyperframes story video, asks to make a Guan Yu/Zhang Fei style story video, or asks for sc...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "html-ppt-27",
      "order": 27,
      "icon": "✦",
      "name": "html-ppt",
      "folder": "html-ppt",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "HTML PPT Studio — author professional static HTML presentations in many styles, layouts, and animations, all driven by templates. Use when the user asks for a presentation, PPT, slides, keynote, deck, slideshow, \"幻灯片\", \"演讲稿\", \"做一份 PPT\", \"做一份 slides\", a reveal-style HTML deck, a 小红书 图文, or any kind of multi-slide pitch/report/sharing document that should look tasteful and be usable with keyboard navigation. Triggers include keywords like \"presentation\", \"ppt\", \"slides\", \"deck\", \"keynote\", \"reveal\", \"slideshow\", \"幻灯片\", \"演讲稿\", \"分享稿\", \"小红书图文\", \"talk slides\", \"pitch deck\", \"tech sharing\", \"technical presentation\".",
      "bestFor": "HTML PPT Studio — author professional static HTML presentations in many styles, layouts, and animations, all driven by templates. Use when the us...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "hyperframes-28",
      "order": 28,
      "icon": "◉",
      "name": "hyperframes",
      "folder": "hyperframes",
      "tag": "語音與轉錄",
      "installed": true,
      "status": "已安裝",
      "detail": "Create video compositions, animations, title cards, overlays, captions, voiceovers, audio-reactive visuals, and scene transitions in HyperFrames HTML. Use when asked to build any HTML-based video content, add captions or subtitles synced to audio, generate text-to-speech narration, create audio-reactive animation (beat sync, glow, pulse driven by music), add animated text highlighting (marker sweeps, hand-drawn circles, burst lines, scribble, sketchout), or add transitions between scenes (crossfades, wipes, reveals, shader transitions). Covers composition authoring, timing, media, and the full video production workflow. For CLI commands (init, lint, preview, render, transcribe, tts) see the hyperframes-cli skill.",
      "bestFor": "Create video compositions, animations, title cards, overlays, captions, voiceovers, audio-reactive visuals, and scene transitions in HyperFrames ...",
      "flow": [
        "檢查音檔或文字",
        "轉錄或配音",
        "校正語言與節奏",
        "驗證格式時長",
        "回傳音檔"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "imagegen-29",
      "order": 29,
      "icon": "✉",
      "name": "imagegen-disabled-use-lanxin",
      "folder": "imagegen",
      "tag": "Telegram 與客服",
      "installed": false,
      "status": "停用保險",
      "detail": "已停用的舊內建 imagegen 技能。遇到做圖、生圖、生成圖片、產圖、海報、圖片設計、改圖、修圖、商品圖、行銷圖、社群圖、封面、縮圖等圖片相關任務時，不可使用 Codex 內建 imagegen，也不可使用本機腳本、Canvas、PPT、PS、ImageMagick、其他網站或替代工具；必須改用 Lanxin AI / 聚合平台 https://lx.lanxinai.com/ 的做圖流程，且先給確認清單，等主人確認後才提交，完成後下載平台原始圖片並用 Telegram 文件模式回傳。",
      "bestFor": "已停用的舊內建 imagegen 技能。遇到做圖、生圖、生成圖片、產圖、海報、圖片設計、改圖、修圖、商品圖、行銷圖、社群圖、封面、縮圖等圖片相關任務時，不可使用 Codex 內建 imagegen，也不可使用本機腳本、Canvas、PPT、PS、ImageMagick、其他網站或替代工具；...",
      "flow": [
        "判斷來源 bot",
        "執行任務",
        "驗證檔案或狀態",
        "同源回傳",
        "記錄可復用規則"
      ],
      "guardrails": [
        "保留為防誤觸保險",
        "圖片任務改走藍星或指定 image2／ComfyUI 路由",
        "不可把停用技能當正式生成路線"
      ]
    },
    {
      "id": "imagegen-poster-telegram-30",
      "order": 30,
      "icon": "✉",
      "name": "imagegen-disabled-use-lanxin",
      "folder": "imagegen-poster-telegram",
      "tag": "Telegram 與客服",
      "installed": false,
      "status": "停用保險",
      "detail": "已停用的舊內建 imagegen 技能。遇到做圖、生圖、生成圖片、產圖、海報、圖片設計、改圖、修圖、商品圖、行銷圖、社群圖、封面、縮圖等圖片相關任務時，不可使用 Codex 內建 imagegen，也不可使用本機腳本、Canvas、PPT、PS、ImageMagick、其他網站或替代工具；必須改用 Lanxin AI / 聚合平台 https://lx.lanxinai.com/ 的做圖流程，且先給確認清單，等主人確認後才提交，完成後下載平台原始圖片並用 Telegram 文件模式回傳。",
      "bestFor": "已停用的舊內建 imagegen 技能。遇到做圖、生圖、生成圖片、產圖、海報、圖片設計、改圖、修圖、商品圖、行銷圖、社群圖、封面、縮圖等圖片相關任務時，不可使用 Codex 內建 imagegen，也不可使用本機腳本、Canvas、PPT、PS、ImageMagick、其他網站或替代工具；...",
      "flow": [
        "判斷來源 bot",
        "執行任務",
        "驗證檔案或狀態",
        "同源回傳",
        "記錄可復用規則"
      ],
      "guardrails": [
        "保留為防誤觸保險",
        "圖片任務改走藍星或指定 image2／ComfyUI 路由",
        "不可把停用技能當正式生成路線"
      ]
    },
    {
      "id": "imagegen-new-31",
      "order": 31,
      "icon": "✉",
      "name": "imagegen-disabled-use-lanxin",
      "folder": "imagegen_new",
      "tag": "Telegram 與客服",
      "installed": false,
      "status": "停用保險",
      "detail": "已停用的舊內建 imagegen 技能。遇到做圖、生圖、生成圖片、產圖、海報、圖片設計、改圖、修圖、商品圖、行銷圖、社群圖、封面、縮圖等圖片相關任務時，不可使用 Codex 內建 imagegen，也不可使用本機腳本、Canvas、PPT、PS、ImageMagick、其他網站或替代工具；必須改用 Lanxin AI / 聚合平台 https://lx.lanxinai.com/ 的做圖流程，且先給確認清單，等主人確認後才提交，完成後下載平台原始圖片並用 Telegram 文件模式回傳。",
      "bestFor": "已停用的舊內建 imagegen 技能。遇到做圖、生圖、生成圖片、產圖、海報、圖片設計、改圖、修圖、商品圖、行銷圖、社群圖、封面、縮圖等圖片相關任務時，不可使用 Codex 內建 imagegen，也不可使用本機腳本、Canvas、PPT、PS、ImageMagick、其他網站或替代工具；...",
      "flow": [
        "判斷來源 bot",
        "執行任務",
        "驗證檔案或狀態",
        "同源回傳",
        "記錄可復用規則"
      ],
      "guardrails": [
        "保留為防誤觸保險",
        "圖片任務改走藍星或指定 image2／ComfyUI 路由",
        "不可把停用技能當正式生成路線"
      ]
    },
    {
      "id": "ims-32",
      "order": 32,
      "icon": "✉",
      "name": "ims",
      "folder": "ims",
      "tag": "Telegram 與客服",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the owner says ims or asks to generate, create, design, revise, resend, or deliver images/posters/visual designs. This is the single authoritative IMS workflow: Blue Star/Lanxin-only generation, material-first analysis, confirmation before spending credits, fixed profile login continuity, fast stuck detection, original file validation, and same-origin Telegram document delivery.",
      "bestFor": "Use when the owner says ims or asks to generate, create, design, revise, resend, or deliver images/posters/visual designs. This is the single aut...",
      "flow": [
        "判斷來源 bot",
        "執行任務",
        "驗證檔案或狀態",
        "同源回傳",
        "記錄可復用規則"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "lanxin-image-workflow-33",
      "order": 33,
      "icon": "◈",
      "name": "lanxin-image-workflow",
      "folder": "lanxin-image-workflow",
      "tag": "圖片與海報",
      "installed": true,
      "status": "已安裝",
      "detail": "Run the user's Lanxin/藍星 AI image generation workflow. Use when Codex needs to generate images on lanxinai.com, check UID/VIP/credits, preserve user prompts without rewriting, submit image jobs, download original images, save outputs, and deliver generated images back to the user.",
      "bestFor": "Run the user's Lanxin/藍星 AI image generation workflow. Use when Codex needs to generate images on lanxinai.com, check UID/VIP/credits, preserve u...",
      "flow": [
        "確認需求與素材",
        "整理提示詞與確認清單",
        "生成原始圖片",
        "驗證尺寸與文字",
        "文件模式交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "lobster-working-style-34",
      "order": 34,
      "icon": "✦",
      "name": "lobster-working-style",
      "folder": "lobster-working-style",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when operating for 石頭人/主人 in Telegram, when the owner mentions 龍蝦/藍星龍蝦/lobster, or when handling OpenClaw/Codex handoff tasks. Covers reply style, task completion discipline, automatic Telegram delivery, Dreamina/SD safeguards, Lanxin image workflow, memory syncing, and known model-routing status.",
      "bestFor": "Use when operating for 石頭人/主人 in Telegram, when the owner mentions 龍蝦/藍星龍蝦/lobster, or when handling OpenClaw/Codex handoff tasks. Covers reply s...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "mcdesign-image2-35",
      "order": 35,
      "icon": "◈",
      "name": "mcdesign-image2",
      "folder": "mcdesign-image2",
      "tag": "圖片與海報",
      "installed": true,
      "status": "已安裝",
      "detail": "Use automatically whenever the user asks to create, generate, make, design, or render an image, poster, cover, thumbnail, visual, illustration, product image, social image, 做圖, 生圖, 生成圖片, 產圖, 海報, 封面, 縮圖, or 圖片設計 in the isolated Codex API2 channel. Routes image generation to the MCDesign IMAGE2 model instead of treating it as a text-only request.",
      "bestFor": "Use automatically whenever the user asks to create, generate, make, design, or render an image, poster, cover, thumbnail, visual, illustration, p...",
      "flow": [
        "確認需求與素材",
        "整理提示詞與確認清單",
        "生成原始圖片",
        "驗證尺寸與文字",
        "文件模式交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "mininew-bridge-handoff-36",
      "order": 36,
      "icon": "✉",
      "name": "mininew-bridge-handoff",
      "folder": "mininew-bridge-handoff",
      "tag": "Telegram 與客服",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when setting up, copying, or handing off the MiniNew Telegram Codex bridge to another Codex/tgbot environment, including creating a new bridge instance, installing bundled or future skills, preserving Traditional Chinese/Taiwan assistant behavior, indexing task files, and avoiding secret leakage.",
      "bestFor": "Use when setting up, copying, or handing off the MiniNew Telegram Codex bridge to another Codex/tgbot environment, including creating a new bridg...",
      "flow": [
        "判斷來源 bot",
        "執行任務",
        "驗證檔案或狀態",
        "同源回傳",
        "記錄可復用規則"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "monthly-course-site-updater-37",
      "order": 37,
      "icon": "◎",
      "name": "monthly-course-site-updater",
      "folder": "monthly-course-site-updater",
      "tag": "網站與部署",
      "installed": true,
      "status": "已安裝",
      "detail": "Update the recurring Blue Star AI course registration/check-in website each month. Use when Codex needs to replace course information, dates, city sessions, attendee lists, waitlists, Google Sheet tabs, and redeploy the GitHub Pages site.",
      "bestFor": "Update the recurring Blue Star AI course registration/check-in website each month. Use when Codex needs to replace course information, dates, cit...",
      "flow": [
        "編輯真實網站檔案",
        "本機桌面與手機檢查",
        "提交版本",
        "公開部署",
        "驗證公開網址"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "nbps-38",
      "order": 38,
      "icon": "◉",
      "name": "nbps",
      "folder": "nbps",
      "tag": "語音與轉錄",
      "installed": false,
      "status": "停用保險",
      "detail": "Deprecated alias. Use the unified nbs skill for NotebookLM audio summary work.",
      "bestFor": "Deprecated alias. Use the unified nbs skill for NotebookLM audio summary work.",
      "flow": [
        "檢查音檔或文字",
        "轉錄或配音",
        "校正語言與節奏",
        "驗證格式時長",
        "回傳音檔"
      ],
      "guardrails": [
        "保留為防誤觸保險",
        "圖片任務改走藍星或指定 image2／ComfyUI 路由",
        "不可把停用技能當正式生成路線"
      ]
    },
    {
      "id": "nbs-39",
      "order": 39,
      "icon": "✦",
      "name": "nbs",
      "folder": "nbs",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the operator says nbs, NotebookLM, 簡報, 影片摘要, 語音摘要, audio summary, video summary, presentation deck, or asks to turn websites, YouTube links, files, images, posters, PDFs, or text into NotebookLM deliverables. This is the single authoritative workflow for complete NBS packages: PPTX presentation, MP4 video summary, and MP3 audio summary.",
      "bestFor": "Use when the operator says nbs, NotebookLM, 簡報, 影片摘要, 語音摘要, audio summary, video summary, presentation deck, or asks to turn websites, YouTube li...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "nbs-media-summary-pack-40",
      "order": 40,
      "icon": "◉",
      "name": "nbs-media-summary-pack",
      "folder": "nbs-media-summary-pack",
      "tag": "語音與轉錄",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the owner asks to teach or package NBS video summary and audio summary behavior while keeping the existing successful presentation flow unchanged.",
      "bestFor": "Use when the owner asks to teach or package NBS video summary and audio summary behavior while keeping the existing successful presentation flow ...",
      "flow": [
        "檢查音檔或文字",
        "轉錄或配音",
        "校正語言與節奏",
        "驗證格式時長",
        "回傳音檔"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "nbs-skill-41",
      "order": 41,
      "icon": "✉",
      "name": "nbs-skill",
      "folder": "nbs-skill",
      "tag": "Telegram 與客服",
      "installed": false,
      "status": "停用保險",
      "detail": "Deprecated for live NBS generation. Use the unified nbs skill for NotebookLM deliverables; use this only when the owner explicitly asks to package, hand off, install, or update the old NBS skill for another Codex/tgbot.",
      "bestFor": "Deprecated for live NBS generation. Use the unified nbs skill for NotebookLM deliverables; use this only when the owner explicitly asks to packag...",
      "flow": [
        "判斷來源 bot",
        "執行任務",
        "驗證檔案或狀態",
        "同源回傳",
        "記錄可復用規則"
      ],
      "guardrails": [
        "保留為防誤觸保險",
        "圖片任務改走藍星或指定 image2／ComfyUI 路由",
        "不可把停用技能當正式生成路線"
      ]
    },
    {
      "id": "nbvs-42",
      "order": 42,
      "icon": "▦",
      "name": "nbvs",
      "folder": "nbvs",
      "tag": "文件與簡報",
      "installed": false,
      "status": "停用保險",
      "detail": "Deprecated alias. Use the unified nbs skill for NotebookLM video summary work.",
      "bestFor": "Deprecated alias. Use the unified nbs skill for NotebookLM video summary work.",
      "flow": [
        "讀取來源",
        "整理結構",
        "產出文件或簡報",
        "驗證頁數與格式",
        "回傳成品"
      ],
      "guardrails": [
        "保留為防誤觸保險",
        "圖片任務改走藍星或指定 image2／ComfyUI 路由",
        "不可把停用技能當正式生成路線"
      ]
    },
    {
      "id": "new-customer-bot-base-43",
      "order": 43,
      "icon": "✦",
      "name": "new-customer-bot-base",
      "folder": "new-customer-bot-base",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when working on the new customer BOT handoff, onboarding a new customer bot, transferring bot memory/skills, or applying the handoff document `new_customer_bot_base_v0.md`.",
      "bestFor": "Use when working on the new customer BOT handoff, onboarding a new customer bot, transferring bot memory/skills, or applying the handoff document...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "nms-digital-human-44",
      "order": 44,
      "icon": "✦",
      "name": "nms-digital-human",
      "folder": "nms-digital-human",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the operator says nms, 數字人, 數字人skill, AI網紅, 搖錢樹AI, asks to create a digital human from audio/script/image/video, make an AI presenter read a script, clone/use a voice for a script, assemble a digital-human video, or operate the WeChat mini-program digital-human workflow.",
      "bestFor": "Use when the operator says nms, 數字人, 數字人skill, AI網紅, 搖錢樹AI, asks to create a digital human from audio/script/image/video, make an AI presenter re...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "notebooklm-brief-to-deck-workflow-45",
      "order": 45,
      "icon": "▦",
      "name": "notebooklm-brief-to-deck-workflow",
      "folder": "notebooklm-brief-to-deck-workflow",
      "tag": "文件與簡報",
      "installed": false,
      "status": "停用保險",
      "detail": "Deprecated live NotebookLM deck workflow. Use the unified nbs skill for actual NotebookLM deliverables; use this only when explicitly maintaining the legacy brief-to-deck workflow.",
      "bestFor": "Deprecated live NotebookLM deck workflow. Use the unified nbs skill for actual NotebookLM deliverables; use this only when explicitly maintaining...",
      "flow": [
        "讀取來源",
        "整理結構",
        "產出文件或簡報",
        "驗證頁數與格式",
        "回傳成品"
      ],
      "guardrails": [
        "保留為防誤觸保險",
        "圖片任務改走藍星或指定 image2／ComfyUI 路由",
        "不可把停用技能當正式生成路線"
      ]
    },
    {
      "id": "notebooklm-presentation-prompt-46",
      "order": 46,
      "icon": "✦",
      "name": "notebooklm-presentation-prompt",
      "folder": "notebooklm-presentation-prompt",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Build prompt-only instruction packs for NotebookLM presentations. Use only when the owner explicitly asks for NotebookLM prompt text or style instructions; for actual NBS deliverables use the unified nbs skill.",
      "bestFor": "Build prompt-only instruction packs for NotebookLM presentations. Use only when the owner explicitly asks for NotebookLM prompt text or style ins...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "notebooklm-source-builder-47",
      "order": 47,
      "icon": "▦",
      "name": "notebooklm-source-builder",
      "folder": "notebooklm-source-builder",
      "tag": "文件與簡報",
      "installed": true,
      "status": "已安裝",
      "detail": "Prepare source-only material for NotebookLM. Use only when the owner explicitly asks to organize or clean source documents; for actual NBS deliverables use the unified nbs skill.",
      "bestFor": "Prepare source-only material for NotebookLM. Use only when the owner explicitly asks to organize or clean source documents; for actual NBS delive...",
      "flow": [
        "讀取來源",
        "整理結構",
        "產出文件或簡報",
        "驗證頁數與格式",
        "回傳成品"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "notion-knowledge-capture-48",
      "order": 48,
      "icon": "⌕",
      "name": "notion-knowledge-capture",
      "folder": "notion-knowledge-capture",
      "tag": "研究與資料",
      "installed": true,
      "status": "已安裝",
      "detail": "Capture conversations and decisions into structured Notion pages; use when turning chats/notes into wiki entries, how-tos, decisions, or FAQs with proper linking.",
      "bestFor": "Capture conversations and decisions into structured Notion pages; use when turning chats/notes into wiki entries, how-tos, decisions, or FAQs wit...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "openai-docs-49",
      "order": 49,
      "icon": "⌕",
      "name": "openai-docs",
      "folder": "openai-docs",
      "tag": "研究與資料",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the user asks how to build with OpenAI products or APIs, asks about Codex itself or choosing Codex surfaces, needs up-to-date official documentation with citations, help choosing the latest model for a use case, or model upgrade and prompt-upgrade guidance; use OpenAI docs MCP tools for non-Codex docs questions, use the Codex manual helper first for broad Codex self-knowledge, and restrict fallback browsing to official OpenAI domains.",
      "bestFor": "Use when the user asks how to build with OpenAI products or APIs, asks about Codex itself or choosing Codex surfaces, needs up-to-date official d...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "openclaw-browser-automation-50",
      "order": 50,
      "icon": "⌁",
      "name": "openclaw-browser-automation",
      "folder": "openclaw-browser-automation",
      "tag": "瀏覽器與自動化",
      "installed": true,
      "status": "已安裝",
      "detail": "Imported OpenClaw browser automation rules; adapt them to Codex browser/in-app browser tools when controlling web pages.",
      "bestFor": "Imported OpenClaw browser automation rules; adapt them to Codex browser/in-app browser tools when controlling web pages.",
      "flow": [
        "開啟指定頁面",
        "沿用登入狀態",
        "操作與擷取",
        "驗證結果",
        "回報可交付內容"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "openclaw-desktop-control-51",
      "order": 51,
      "icon": "⌁",
      "name": "openclaw-desktop-control",
      "folder": "openclaw-desktop-control",
      "tag": "瀏覽器與自動化",
      "installed": true,
      "status": "已安裝",
      "detail": "Imported OpenClaw desktop control notes; use only when local desktop automation is explicitly needed and safe.",
      "bestFor": "Imported OpenClaw desktop control notes; use only when local desktop automation is explicitly needed and safe.",
      "flow": [
        "開啟指定頁面",
        "沿用登入狀態",
        "操作與擷取",
        "驗證結果",
        "回報可交付內容"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "operator-principles-52",
      "order": 52,
      "icon": "✦",
      "name": "operator-principles",
      "folder": "operator-principles",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Operator-facing working principles for response timing, Chinese-only reporting, and non-spam delivery.",
      "bestFor": "Operator-facing working principles for response timing, Chinese-only reporting, and non-spam delivery.",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "owner-reply-style-telegram-53",
      "order": 53,
      "icon": "✦",
      "name": "owner-reply-style-telegram",
      "folder": "owner-reply-style-telegram",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when replying to the owner on Telegram/Codex/OpenClaw, especially for reply style, emoji behavior, task progress, blocker reporting, file delivery, handoff packages, and avoiding internal/debug leakage.",
      "bestFor": "Use when replying to the owner on Telegram/Codex/OpenClaw, especially for reply style, emoji behavior, task progress, blocker reporting, file del...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "pdf-54",
      "order": 54,
      "icon": "◎",
      "name": "pdf",
      "folder": "pdf",
      "tag": "網站與部署",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when tasks involve reading, creating, or reviewing PDF files where rendering and layout matter; prefer visual checks by rendering pages (Poppler) and use Python tools such as `reportlab`, `pdfplumber`, and `pypdf` for generation and extraction.",
      "bestFor": "Use when tasks involve reading, creating, or reviewing PDF files where rendering and layout matter; prefer visual checks by rendering pages (Popp...",
      "flow": [
        "編輯真實網站檔案",
        "本機桌面與手機檢查",
        "提交版本",
        "公開部署",
        "驗證公開網址"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "playwright-55",
      "order": 55,
      "icon": "⌁",
      "name": "playwright",
      "folder": "playwright",
      "tag": "瀏覽器與自動化",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the task requires automating a real browser from the terminal (navigation, form filling, snapshots, screenshots, data extraction, UI-flow debugging) via `playwright-cli` or the bundled wrapper script.",
      "bestFor": "Use when the task requires automating a real browser from the terminal (navigation, form filling, snapshots, screenshots, data extraction, UI-flo...",
      "flow": [
        "開啟指定頁面",
        "沿用登入狀態",
        "操作與擷取",
        "驗證結果",
        "回報可交付內容"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "playwright-interactive-56",
      "order": 56,
      "icon": "⌁",
      "name": "playwright-interactive",
      "folder": "playwright-interactive",
      "tag": "瀏覽器與自動化",
      "installed": true,
      "status": "已安裝",
      "detail": "Persistent browser and Electron interaction through `js_repl` for fast iterative UI debugging.",
      "bestFor": "Persistent browser and Electron interaction through `js_repl` for fast iterative UI debugging.",
      "flow": [
        "開啟指定頁面",
        "沿用登入狀態",
        "操作與擷取",
        "驗證結果",
        "回報可交付內容"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "plugin-creator-57",
      "order": 57,
      "icon": "✦",
      "name": "plugin-creator",
      "folder": "plugin-creator",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Create and scaffold plugin directories for Codex with a required `.codex-plugin/plugin.json`, optional plugin folders/files, valid manifest defaults, and personal-marketplace entries by default. Use when Codex needs to create a new personal plugin, add optional plugin structure, generate or update marketplace entries for plugin ordering and availability metadata, or update an existing local plugin during development with the CLI-driven cachebuster and reinstall flow.",
      "bestFor": "Create and scaffold plugin directories for Codex with a required `.codex-plugin/plugin.json`, optional plugin folders/files, valid manifest defau...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "screenshot-58",
      "order": 58,
      "icon": "⌁",
      "name": "screenshot",
      "folder": "screenshot",
      "tag": "瀏覽器與自動化",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the user explicitly asks for a desktop or system screenshot (full screen, specific app or window, or a pixel region), or when tool-specific capture capabilities are unavailable and an OS-level capture is needed.",
      "bestFor": "Use when the user explicitly asks for a desktop or system screenshot (full screen, specific app or window, or a pixel region), or when tool-speci...",
      "flow": [
        "開啟指定頁面",
        "沿用登入狀態",
        "操作與擷取",
        "驗證結果",
        "回報可交付內容"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "shamie-owner-reply-style-59",
      "order": 59,
      "icon": "✦",
      "name": "shamie-owner-reply-style",
      "folder": "shamie-owner-reply-style",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Use for all owner-facing Telegram/Codex/OpenClaw replies in this handoff package. It teaches clean Traditional Chinese, soft direct tone, progress reporting, file delivery, blockers, and secret-safe behavior.",
      "bestFor": "Use for all owner-facing Telegram/Codex/OpenClaw replies in this handoff package. It teaches clean Traditional Chinese, soft direct tone, progres...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "skill-60",
      "order": 60,
      "icon": "▦",
      "name": "做圖",
      "folder": "SKILL",
      "tag": "文件與簡報",
      "installed": true,
      "status": "已安裝",
      "detail": "必須在使用者要求做圖、生圖、生成圖片、產圖、圖片生成、產海報、做海報、海報設計、圖片設計、製作圖片、文案轉圖、PPT轉海報、PDF轉海報、繁體中文海報、商品圖、行銷圖、社群圖、廣告圖、Lanxin AI、蘭心AI、聚合平台圖片生成時啟用。此技能專門負責整理確認清單、等待明確確認、到 Lanxin/聚合平台生成圖片、下載原始成品、驗證圖片有效，並用文件模式回傳。",
      "bestFor": "必須在使用者要求做圖、生圖、生成圖片、產圖、圖片生成、產海報、做海報、海報設計、圖片設計、製作圖片、文案轉圖、PPT轉海報、PDF轉海報、繁體中文海報、商品圖、行銷圖、社群圖、廣告圖、Lanxin AI、蘭心AI、聚合平台圖片生成時啟用。此技能專門負責整理確認清單、等待明確確認、到 Lan...",
      "flow": [
        "讀取來源",
        "整理結構",
        "產出文件或簡報",
        "驗證頁數與格式",
        "回傳成品"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "skill-creator-61",
      "order": 61,
      "icon": "✦",
      "name": "skill-creator",
      "folder": "skill-creator",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Codex's capabilities with specialized knowledge, workflows, or tool integrations.",
      "bestFor": "Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends C...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "skill-installer-62",
      "order": 62,
      "icon": "✦",
      "name": "skill-installer",
      "folder": "skill-installer",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Install Codex skills into $CODEX_HOME/skills from a curated list or a GitHub repo path. Use when a user asks to list installable skills, install a curated skill, or install a skill from another repo (including private repos).",
      "bestFor": "Install Codex skills into $CODEX_HOME/skills from a curated list or a GitHub repo path. Use when a user asks to list installable skills, install ...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "speech-63",
      "order": 63,
      "icon": "⌕",
      "name": "speech",
      "folder": "speech",
      "tag": "研究與資料",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the user asks for text-to-speech narration or voiceover, accessibility reads, audio prompts, or batch speech generation via the OpenAI Audio API; run the bundled CLI (`scripts/text_to_speech.py`) with built-in voices and require `OPENAI_API_KEY` for live calls. Custom voice creation is out of scope.",
      "bestFor": "Use when the user asks for text-to-speech narration or voiceover, accessibility reads, audio prompts, or batch speech generation via the OpenAI A...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "spreadsheet-processor-64",
      "order": 64,
      "icon": "⌕",
      "name": "spreadsheet-processor",
      "folder": "spreadsheet-processor",
      "tag": "研究與資料",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the owner asks to read, clean, merge, analyze, create, edit, format, validate, or convert Excel, CSV, TSV, XLSX, or spreadsheet files, including formulas, charts, summaries, reconciliation, and export.",
      "bestFor": "Use when the owner asks to read, clean, merge, analyze, create, edit, format, validate, or convert Excel, CSV, TSV, XLSX, or spreadsheet files, i...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "taiwan-stock-ims-65",
      "order": 65,
      "icon": "⌕",
      "name": "taiwan-stock-ims",
      "folder": "taiwan-stock-ims",
      "tag": "研究與資料",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the owner says 台股ims, 台股 IMS, 台股研究, 台股圖卡, 今天台股怎麼看, 幫我看台股個股 such as 2330 台積電, or asks for a 台股 AI 伺服器圖卡. This workflow produces both a Taiwan stock research report and a 9:16 Blue Star/Lanxin IMS card; both must be completed and returned for the workflow to be complete.",
      "bestFor": "Use when the owner says 台股ims, 台股 IMS, 台股研究, 台股圖卡, 今天台股怎麼看, 幫我看台股個股 such as 2330 台積電, or asks for a 台股 AI 伺服器圖卡. This workflow produces both a Ta...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "teaching-step-images-66",
      "order": 66,
      "icon": "◎",
      "name": "teaching-step-images",
      "folder": "teaching-step-images",
      "tag": "網站與部署",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when the owner asks to create, optimize, generate, revise, package, or prompt 教學步驟圖片, SOP 分鏡圖, 手機操作教學圖, 截圖式教學圖, 紅框步驟圖, app/website/tutorial instruction images, Telegram BotFather SOP images, Lanxin/藍星 AI teaching images, or any multi-step visual guide that should become clear vertical instructional images.",
      "bestFor": "Use when the owner asks to create, optimize, generate, revise, package, or prompt 教學步驟圖片, SOP 分鏡圖, 手機操作教學圖, 截圖式教學圖, 紅框步驟圖, app/website/tutorial i...",
      "flow": [
        "編輯真實網站檔案",
        "本機桌面與手機檢查",
        "提交版本",
        "公開部署",
        "驗證公開網址"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "telegram-bot-manager-67",
      "order": 67,
      "icon": "✦",
      "name": "telegram-bot-manager",
      "folder": "telegram-bot-manager",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Manage Telegram bot workflows, delivery, media sending, audio transcription setup, file forwarding, and user-facing automation rules. Use when Codex needs to troubleshoot Telegram bot replies, send generated images/files back through a bot, explain Telegram delivery errors, configure bot access, or plan bot backend memory and automation.",
      "bestFor": "Manage Telegram bot workflows, delivery, media sending, audio transcription setup, file forwarding, and user-facing automation rules. Use when Co...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "telegram-two-stage-reply-68",
      "order": 68,
      "icon": "✦",
      "name": "telegram-two-stage-reply",
      "folder": "telegram-two-stage-reply",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Enforce the owner's Telegram two-stage reply workflow. Use when handling Telegram-origin tasks, Telegram bot response style, ACK-first replies, deliverable return rules, clean Traditional Chinese owner replies, fixed/lazy reply complaints, or teaching another Codex/OpenClaw/TGBOT to reply first with \"主人我收到了💗，思考中，預計 x 分鐘。\" and later return a concrete result.",
      "bestFor": "Enforce the owner's Telegram two-stage reply workflow. Use when handling Telegram-origin tasks, Telegram bot response style, ACK-first replies, d...",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "tg123-daily-self-upgrade-69",
      "order": 69,
      "icon": "✦",
      "name": "tg123-daily-self-upgrade",
      "folder": "tg123-daily-self-upgrade",
      "tag": "記憶與系統",
      "installed": true,
      "status": "已安裝",
      "detail": "Use when applying the owner's daily TG1/TG2/TG3 conversation learning, cross-skill corrections, Telegram delivery rules, and self-upgrade memory.",
      "bestFor": "Use when applying the owner's daily TG1/TG2/TG3 conversation learning, cross-skill corrections, Telegram delivery rules, and self-upgrade memory.",
      "flow": [
        "判斷觸發情境",
        "讀取必要資料",
        "執行專用流程",
        "驗證結果",
        "保存或交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "transcribe-70",
      "order": 70,
      "icon": "◉",
      "name": "transcribe",
      "folder": "transcribe",
      "tag": "語音與轉錄",
      "installed": true,
      "status": "已安裝",
      "detail": "Transcribe audio files to text with optional diarization and known-speaker hints. Use when a user asks to transcribe speech from audio/video, extract text from recordings, or label speakers in interviews or meetings.",
      "bestFor": "Transcribe audio files to text with optional diarization and known-speaker hints. Use when a user asks to transcribe speech from audio/video, ext...",
      "flow": [
        "檢查音檔或文字",
        "轉錄或配音",
        "校正語言與節奏",
        "驗證格式時長",
        "回傳音檔"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "video-frame-analysis-71",
      "order": 71,
      "icon": "◉",
      "name": "video-frame-analysis",
      "folder": "video-frame-analysis",
      "tag": "語音與轉錄",
      "installed": true,
      "status": "已安裝",
      "detail": "Use whenever the owner sends a video, asks to analyze a video, asks for teaching-video settings, speech speed, editing rhythm, subtitles, shot timing, benchmark replication, or any conclusion that depends on video content.",
      "bestFor": "Use whenever the owner sends a video, asks to analyze a video, asks for teaching-video settings, speech speed, editing rhythm, subtitles, shot ti...",
      "flow": [
        "檢查音檔或文字",
        "轉錄或配音",
        "校正語言與節奏",
        "驗證格式時長",
        "回傳音檔"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "video-spec-builder-72",
      "order": 72,
      "icon": "▶",
      "name": "video-spec-builder",
      "folder": "video-spec-builder",
      "tag": "影片與剪輯",
      "installed": true,
      "status": "已安裝",
      "detail": "Build AI video production specs from story outlines, scripts, shot lists, or user-provided scenes.",
      "bestFor": "Build AI video production specs from story outlines, scripts, shot lists, or user-provided scenes.",
      "flow": [
        "檢查素材",
        "拆解分鏡或逐幀分析",
        "生成或剪輯影片",
        "驗證時長畫面音訊",
        "輸出 MP4 交付"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    },
    {
      "id": "wbs-73",
      "order": 73,
      "icon": "◎",
      "name": "wbs",
      "folder": "wbs",
      "tag": "網站與部署",
      "installed": true,
      "status": "已安裝",
      "detail": "Website build and GitHub Pages deployment workflow for this owner. Use when the owner says wbs, asks to build, rebuild, update, add to, test, publish, publicly deploy, open-source, connect GitHub, create a shareable website link, or handle no-computer phone GitHub authorization for website work.",
      "bestFor": "Website build and GitHub Pages deployment workflow for this owner. Use when the owner says wbs, asks to build, rebuild, update, add to, test, pub...",
      "flow": [
        "編輯真實網站檔案",
        "本機桌面與手機檢查",
        "提交版本",
        "公開部署",
        "驗證公開網址"
      ],
      "guardrails": [
        "依最新任務啟用",
        "不混入舊素材",
        "有成品時需驗證後交付"
      ]
    }
  ],
  "feedback": [
    {
      "id": "fb_001",
      "name": "王小姐",
      "subject": "想了解企業版",
      "status": "待處理",
      "createdAt": "2026-07-23"
    },
    {
      "id": "fb_002",
      "name": "陳先生",
      "subject": "技能市集建議",
      "status": "已回覆",
      "createdAt": "2026-07-22"
    }
  ],
  "activity": [
    {
      "text": "已載入 73 個技能模組",
      "time": "剛剛",
      "tone": "success"
    },
    {
      "text": "任務「整理 AI 產業市場研究」已完成",
      "time": "今天 09:42",
      "tone": "success"
    },
    {
      "text": "每日早報排程已啟用",
      "time": "昨天 08:00",
      "tone": "info"
    }
  ]
};
