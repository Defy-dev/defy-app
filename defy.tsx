import { useState, useRef, useEffect } from "react";

const TRACKS = [
  {
    id: "aiml", title: "AI / ML Engineer", icon: "🧠", color: "#a78bfa", accent: "#7c3aed",
    description: "Neural networks, machine learning, LLMs, prompt engineering",
    salary: "$3,000–12,000", demand: "🔥🔥🔥",
    lessons: [
      { id:"a1", title:"What is AI & ML?", level:"Basics", xp:50,
        theory:`**Artificial Intelligence (AI)** — when a computer does things only humans used to do: translate text, recognise voices, recommend movies.\n\n**Machine Learning (ML)** — a way to build AI without hard-coded rules. We show the model thousands of examples and it finds patterns on its own.\n\n**Analogy:** You don't teach a child chess through theory — you just play thousands of games. ML works the same way.\n\n**Where it's used right now:**\n• Spotify — track recommendations\n• Gmail — spam filter\n• Face ID — face recognition\n• ChatGPT, Claude — language models`,
        task:"Explain in your own words: what's the difference between AI and ML? Give 3 real examples of ML you use every day.", hint:"Think about apps you use daily — streaming, email, your phone camera..." },
      { id:"a2", title:"Neural Networks", level:"Basics", xp:75,
        theory:`**A neural network** is a mathematical model inspired by the brain.\n\nBrain: neurons pass signals → connections strengthen with repetition.\nNeural net: numbers multiply across layers → weights are adjusted during training.\n\n**Architecture:**\n• **Input layer** — receives data (pixels, numbers, tokens)\n• **Hidden layers** — extract features\n• **Output layer** — produces the result\n\n**How it learns:**\n1. Pass data forward (forward pass)\n2. Calculate the error (loss function)\n3. Adjust weights backward (backpropagation)\n4. Repeat millions of times\n\n**GPT-4 and Claude** are neural networks with hundreds of billions of parameters (weights).`,
        task:"Write a prompt for an AI that explains neural networks to a 10-year-old — no jargon, use a real-life analogy. Structure: role → audience → style → format.", hint:"Good prompt: AI role, target audience, ban on jargon, specific output format..." },
      { id:"a3", title:"Prompt Engineering", level:"Practice", xp:100,
        theory:`**Prompt engineering** — the art of talking to AI so you get the result you actually want.\n\n**Bad:** "Write about marketing"\n**Good:** "You are a startup CMO. Write 5 Instagram content ideas for a fitness studio targeting women 25–35. Each idea: title + 2 lines + 3 hashtags."\n\n**Techniques:**\n• **Role prompting** — "You are an expert in..."\n• **Few-shot** — show 2–3 examples of the desired format\n• **Chain of Thought** — "Think step by step"\n• **Constraints** — format, length, style, what NOT to do\n• **System prompt** — instruction that shapes the model's behaviour\n\n**Advanced:** RAG, function calling, structured outputs`,
        task:"Write a system prompt for an AI Python tutor for beginners. Use at least 4 techniques from the lesson. Format it as a real production system prompt.", hint:"Include: role, audience, restrictions, style, response format examples..." },
      { id:"a4", title:"Types of ML Models", level:"Practice", xp:100,
        theory:`**Three learning paradigms:**\n\n**Supervised Learning**\nLabelled data → model learns to predict labels.\nExample: email (spam/not spam), apartment price.\nAlgorithms: Linear Regression, Random Forest, XGBoost, Neural Nets.\n\n**Unsupervised Learning**\nUnlabelled data → model finds structure on its own.\nExample: customer segmentation, transaction anomalies.\nAlgorithms: K-Means, DBSCAN, PCA, Autoencoders.\n\n**Reinforcement Learning**\nAgent learns through rewards and penalties.\nExample: AlphaGo, robots, RLHF in ChatGPT.\n\n**Bonus: Foundation Models**\nGPT, Claude, Llama — pre-trained on massive data, fine-tuned for specific tasks.`,
        task:"You're building a recommendation system for a marketplace. Describe: which ML type, why, what data you need, what the output looks like. Mini-architecture in 5–7 sentences.", hint:"Do you have historical click and purchase data? Do you need real-time inference?" },
      { id:"a5", title:"Python for ML", level:"Code", xp:150,
        theory:`**The ML engineer's stack:**\n\n**Python** — the #1 language in ML.\n\n**Key libraries:**\n• **NumPy** — matrix operations\n• **Pandas** — data manipulation\n• **Matplotlib/Seaborn** — visualisation\n• **Scikit-learn** — classical ML algorithms\n• **PyTorch/TensorFlow** — neural networks\n• **Transformers (HuggingFace)** — LLMs and NLP\n\n**Basic pipeline:**\n1. Load data (pandas)\n2. Explore (EDA)\n3. Clean and prepare (feature engineering)\n4. Split train/test\n5. Train the model (fit)\n6. Evaluate (metrics)\n7. Deploy`,
        task:"Write pseudocode (or real Python) for a spam classifier. Comment every step. Specify which libraries you use and why.", hint:"Think about text vectorisation, algorithm choice, quality metrics..." },
      { id:"a6", title:"MLOps & Deployment", level:"Advanced", xp:200,
        theory:`**MLOps** — practices for reliably deploying and maintaining ML systems in production.\n\n**The problem:** 87% of ML projects never make it to prod. MLOps fixes that.\n\n**Key components:**\n• **Data & model versioning** — DVC, MLflow\n• **CI/CD for ML** — automated tests and deployment\n• **Monitoring** — data drift, model drift\n• **Feature Store** — centralised features\n• **Model Registry** — version management\n\n**Stack:** Docker, Kubernetes, MLflow, Weights & Biases, Airflow, FastAPI\n\n**Career path:** ML Engineer → Senior → ML Architect → ML Platform Lead`,
        task:"Describe the MLOps pipeline for a customer churn prediction model: from data collection to production monitoring. Which tools at each stage?", hint:"Think: data → training → validation → deployment → monitoring → retraining..." },
    ]
  },
  {
    id: "frontend", title: "Frontend Developer", icon: "💻", color: "#34d399", accent: "#059669",
    description: "HTML, CSS, JavaScript, React, modern web",
    salary: "$2,000–8,000", demand: "🔥🔥🔥",
    lessons: [
      { id:"f1", title:"HTML — The Skeleton of the Web", level:"Basics", xp:50,
        theory:`**HTML** (HyperText Markup Language) — markup language, the structure of a page.\n\nIt's not "code" in the usual sense — it describes the structure of a document.\n\n**Key tags:**\n• \`<html>\` — root element\n• \`<head>\` — metadata (not visible to user)\n• \`<body>\` — everything the user sees\n• \`<h1>–<h6>\` — headings\n• \`<p>\` — paragraph\n• \`<a href="...">\` — link\n• \`<img src="...">\` — image\n• \`<div>\` — block container\n\n**Semantic HTML:**\n\`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<footer>\`\nCritical for SEO and accessibility!`,
        task:"Write the HTML structure for an IT school landing page. Use semantic tags, navigation, sections, and a registration form. Comment why each tag is used.", hint:"Think about structure: header → nav → hero → benefits → form → footer" },
      { id:"f2", title:"CSS — Style & Beauty", level:"Basics", xp:75,
        theory:`**CSS** (Cascading Style Sheets) — the styling language. Controls the visual appearance.\n\n**Key concepts:**\n\n**Box Model:** every element is a rectangle.\ncontent → padding → border → margin\n\n**Flexbox** — for one-dimensional layouts (rows or columns):\n\`display: flex; justify-content: center; align-items: center;\`\n\n**Grid** — for two-dimensional layouts (rows AND columns):\n\`display: grid; grid-template-columns: repeat(3, 1fr);\`\n\n**Animations:**\n\`transition: all 0.3s ease;\`\n\`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }\`\n\n**CSS variables:**\n\`--primary: #6366f1; color: var(--primary);\``,
        task:"Write CSS for a course card: avatar, title, description, button. Add a hover effect, shadow, and smooth animation. Use CSS variables for colours.", hint:"Flexbox for layout, transition for animations, box-shadow for depth..." },
      { id:"f3", title:"JavaScript — Logic", level:"Practice", xp:100,
        theory:`**JavaScript** — the browser's programming language. Makes pages interactive.\n\n**Basics:**\n• Variables: \`const\`, \`let\`\n• Functions: \`function\` and arrow \`() => {}\`\n• Arrays: \`map\`, \`filter\`, \`reduce\`\n• Objects: \`{ key: value }\`\n• Conditions: \`if/else\`, ternary operator\n\n**DOM (Document Object Model):**\n\`document.querySelector('.btn')\`\n\`element.addEventListener('click', handler)\`\n\`element.innerHTML = '<p>Hello!</p>'\`\n\n**Async:**\n\`fetch('api/url').then(res => res.json()).then(data => ...)\`\n\`async/await\` — modern style\n\n**ES6+:** destructuring, spread operator, template literals`,
        task:"Write JS code for an interactive todo list: add, delete, mark as complete. No frameworks, pure JS. Explain each function.", hint:"Think: array for storage, CRUD functions, re-render the list..." },
      { id:"f4", title:"React — Component Thinking", level:"Practice", xp:125,
        theory:`**React** — a library for building UIs. Created by Facebook.\n\n**Core ideas:**\n\n**Components** — UI building blocks.\n\`function Button({ text, onClick }) { return <button onClick={onClick}>{text}</button> }\`\n\n**State (useState)** — component data:\n\`const [count, setCount] = useState(0)\`\n\n**Props** — data from parent to child.\n\n**useEffect** — side effects (API calls, subscriptions):\n\`useEffect(() => { fetchData() }, [])\`\n\n**Virtual DOM** — React diffs the virtual and real trees, updates only what changed. Fast.\n\n**Ecosystem:** React Router (navigation), Zustand/Redux (state), React Query (data).`,
        task:"Write a React product card component: photo, name, price, 'Add to cart' button with a counter. Use useState and event handlers.", hint:"Component = function + JSX + state. Button changes state → UI updates automatically..." },
      { id:"f5", title:"TypeScript & Tooling", level:"Advanced", xp:150,
        theory:`**TypeScript** — JavaScript with types. The industry standard.\n\n**Why:** catches errors before runtime, autocomplete, readability.\n\n\`const greet = (name: string): string => \`Hello, \${name}!\`\`\n\n**Interfaces:**\n\`interface User { id: number; name: string; email: string }\`\n\n**Modern frontend tooling:**\n• **Vite** — lightning-fast build tool\n• **ESLint + Prettier** — code quality\n• **Git** — version control\n• **npm/yarn/pnpm** — package manager\n• **Chrome DevTools** — debugging\n\n**Testing:** Jest, Vitest, Testing Library\n\n**Deploy:** Vercel, Netlify, GitHub Pages\n\n**Career path:** Junior → Mid → Senior → Tech Lead`,
        task:"Rewrite a function in TypeScript with correct types. Add a User interface with the right fields. Explain why each type is used.", hint:"Think about interfaces, argument types, and return value types..." },
    ]
  },
  {
    id: "backend", title: "Backend Developer", icon: "⚙️", color: "#60a5fa", accent: "#2563eb",
    description: "Python/Node.js, APIs, databases, server logic",
    salary: "$2,500–10,000", demand: "🔥🔥🔥",
    lessons: [
      { id:"b1", title:"How the Internet Works", level:"Basics", xp:50,
        theory:`**What happens when you type google.com:**\n\n1. **DNS** — translates google.com to an IP address (142.250.180.14)\n2. **TCP/IP** — establishes the connection\n3. **HTTP request** — browser asks: "GET / HTTP/1.1"\n4. **Server** — processes the request, returns HTML\n5. **Browser** — renders the page\n\n**HTTP methods:**\n• GET — read data\n• POST — create\n• PUT/PATCH — update\n• DELETE — remove\n\n**Status codes:**\n• 200 — OK\n• 201 — Created\n• 404 — Not Found\n• 500 — Server Error\n\n**Backend** — everything that happens on the server (invisible to the user).`,
        task:"Explain what happens when a user clicks 'Log In' on a website. Describe the full request journey: from click to response. Mention HTTP, server, database.", hint:"Frontend → HTTP POST → Backend → DB check → JWT token → response to client..." },
      { id:"b2", title:"Python & FastAPI", level:"Basics", xp:75,
        theory:`**Python** — the #1 language for backend and ML.\n\n**FastAPI** — a modern API framework.\n\n\`\`\`python\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/users/{user_id}")\nasync def get_user(user_id: int):\n    return {"id": user_id, "name": "Alice"}\n\n@app.post("/users")\nasync def create_user(user: UserSchema):\n    db.save(user)\n    return user\n\`\`\`\n\n**Why FastAPI:**\n• Auto-generated docs (Swagger)\n• Validation via Pydantic\n• Async out of the box\n• Very fast\n\n**Alternatives:** Django (batteries included), Flask (minimalist), Node.js/Express`,
        task:"Write a FastAPI endpoint for user registration: accepts email+password, validates, hashes the password, returns a JWT token. Pseudocode with comments.", hint:"Pydantic for validation, bcrypt for password, python-jose for JWT..." },
      { id:"b3", title:"Databases", level:"Practice", xp:100,
        theory:`**Two worlds:**\n\n**SQL (relational):**\nData in tables with relationships.\nPostgreSQL, MySQL, SQLite.\n\`SELECT users.name, orders.total FROM users JOIN orders ON users.id = orders.user_id WHERE orders.total > 1000\`\n\n**NoSQL:**\n• **MongoDB** — documents (JSON-like)\n• **Redis** — key-value, cache, queues\n• **Elasticsearch** — full-text search\n\n**When to use what:**\n• Complex relations, transactions → PostgreSQL\n• Flexible schema, scaling → MongoDB\n• Cache, sessions → Redis\n\n**ORM** (Object-Relational Mapper) — work with DB through code:\n\`user = User.query.filter_by(email='a@b.com').first()\``,
        task:"Design the database schema for an online learning platform (like this one). Draw tables, fields, relationships. Write a SQL query: 'top 5 students by XP in the last month'.", hint:"Tables: users, courses, lessons, progress, achievements, xp_log..." },
      { id:"b4", title:"REST API Design", level:"Practice", xp:125,
        theory:`**REST** (Representational State Transfer) — an architectural style for APIs.\n\n**Principles:**\n• Resources as URLs: \`/users\`, \`/posts/{id}\`\n• HTTP methods match actions\n• Stateless — server doesn't store client state\n• JSON as data format\n\n**Good design:**\n✅ \`GET /api/v1/users/{id}/orders\`\n❌ \`GET /api/getUserOrders?userId=123\`\n\n**Authentication:**\n• JWT — token in header \`Authorization: Bearer ...\`\n• OAuth2 — "Sign in with Google"\n• API Key — service-to-service\n\n**Documentation:** OpenAPI/Swagger\n\n**Rate limiting, versioning, pagination** — must-have for production.`,
        task:"Design a REST API for a Twitter clone. Describe at least 10 endpoints with methods, URLs, request body, and response. Add authentication.", hint:"Think about: users, tweets, likes, follows, feed, search..." },
      { id:"b5", title:"Deploy & DevOps Basics", level:"Advanced", xp:175,
        theory:`**Docker** — package your app in a container. "Works on my machine" → "works everywhere".\n\n\`\`\`dockerfile\nFROM python:3.11\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0"]\n\`\`\`\n\n**Docker Compose** — run multiple containers (app + db + redis).\n\n**CI/CD (GitHub Actions):**\n1. Push code → tests → Docker build → deploy\n\n**Cloud options:**\n• AWS, GCP, Azure — enterprise\n• Render, Railway, Fly.io — for starters\n• VPS (DigitalOcean, Hetzner) — full control\n\n**Monitoring:** logs, metrics, alerts (Grafana, Sentry)`,
        task:"Write a Dockerfile for a FastAPI app + docker-compose.yml with PostgreSQL and Redis. Describe the CI/CD pipeline for auto-deploy on push to main.", hint:"Multi-stage build for smaller image, healthcheck, env variables..." },
    ]
  },
  {
    id: "data", title: "Data Analyst", icon: "📊", color: "#fbbf24", accent: "#d97706",
    description: "SQL, Python, data visualisation, business analytics",
    salary: "$2,000–7,000", demand: "🔥🔥",
    lessons: [
      { id:"d1", title:"Thinking Like a Data Analyst", level:"Basics", xp:50,
        theory:`**Data Analyst** — the translator between data and business.\n\nYour job: ask the right question → find the data → analyse → give an insight → help make a decision.\n\n**Analysis cycle:**\n1. Business question — "Why did sales drop in March?"\n2. Data collection — gather the data\n3. Cleaning — remove noise\n4. EDA — explore, find patterns\n5. Insights — draw conclusions\n6. Communication — present to stakeholders\n\n**Tools:**\n• SQL — must-have\n• Python (Pandas) — analysis\n• Excel/Google Sheets — quick analysis\n• Tableau/Power BI/Looker — visualisation\n• Jupyter Notebook — research\n\n**The key skill:** not technical — it's asking the right questions.`,
        task:"Task: 'Help us understand why Q3 revenue is 23% below Q2'. Write 8 questions you'd ask the business, and what data you'd request.", hint:"Think about: seasonality, cohorts, channels, products, regions, competitors..." },
      { id:"d2", title:"SQL from Zero to Confident", level:"Basics", xp:100,
        theory:`**SQL** — the query language for databases. The most important analyst skill.\n\n**Basic SELECT:**\n\`SELECT name, revenue FROM orders WHERE date >= '2024-01-01' ORDER BY revenue DESC LIMIT 10\`\n\n**Aggregations:**\n\`SELECT category, COUNT(*) as orders, SUM(amount) as total, AVG(amount) as avg_check FROM orders GROUP BY category HAVING total > 10000\`\n\n**JOIN — combining tables:**\n\`SELECT u.name, COUNT(o.id) as orders FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id\`\n\n**Window functions (advanced):**\n\`SELECT name, salary, RANK() OVER (PARTITION BY dept ORDER BY salary DESC) as rank FROM employees\`\n\n**Subqueries and CTEs:**\n\`WITH top_users AS (...) SELECT * FROM top_users WHERE rank <= 10\``,
        task:"Write SQL queries for e-commerce analytics: 1) top-10 products by monthly revenue 2) cohort retention 3) average order value by day of week. Explain the logic of each.", hint:"GROUP BY, JOIN, DATE_TRUNC, window functions — all will come in handy..." },
      { id:"d3", title:"Python & Pandas", level:"Practice", xp:100,
        theory:`**Pandas** — Python library for data manipulation. DataFrame = a table on steroids.\n\n\`\`\`python\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv('sales.csv')\n\n# Basic analysis\ndf.info()\ndf.describe()\ndf.isnull().sum()\n\n# Filter and aggregate\ntop_products = df[df['revenue'] > 1000].groupby('product')['revenue'].sum().sort_values(ascending=False).head(10)\n\n# Visualise\ntop_products.plot(kind='bar')\nplt.title('Top Products')\nplt.show()\n\`\`\`\n\n**Seaborn** for beautiful statistical charts.\n**Plotly** for interactive dashboards.`,
        task:"You have a sales dataset: date, product, category, region, units, revenue. Write Python/Pandas code for: EDA, anomaly detection, top-5 insights with visualisation.", hint:"Think about distributions, outliers, correlations, time trends..." },
      { id:"d4", title:"Dashboards & Visualisation", level:"Practice", xp:125,
        theory:`**The rule of good visualisation:**\nOne chart — one message. The viewer should understand in 5 seconds.\n\n**When to use what:**\n• Line chart — trends over time\n• Bar chart — comparing categories\n• Scatter plot — correlation between two variables\n• Heatmap — matrix of values\n• Funnel — conversion funnel\n• Treemap — hierarchical data\n\n**Tableau / Power BI:**\nDrag-and-drop dashboards without code. Connect to DB → build dashboard → share with team.\n\n**Design principles:**\n• Minimal decoration, maximum data\n• Colour — for meaning, not beauty\n• Labels must answer the question\n• Comparison — always give context`,
        task:"Design a dashboard for an e-commerce CEO. Which 6 key metrics? Which chart type for each? Why are these metrics important for a CEO vs an analyst?", hint:"CEO looks at: revenue, growth, unit economics, churn. Not technical metrics..." },
    ]
  },
  {
    id: "devops", title: "DevOps / Cloud", icon: "☁️", color: "#f87171", accent: "#dc2626",
    description: "Docker, Kubernetes, CI/CD, AWS/GCP, infrastructure",
    salary: "$3,000–12,000", demand: "🔥🔥🔥",
    lessons: [
      { id:"o1", title:"What is DevOps?", level:"Basics", xp:50,
        theory:`**DevOps** — a culture and set of practices that unite development (Dev) and operations (Ops).\n\n**The problem before DevOps:**\nDevs write code → throw it over the wall → Ops deploys → everything breaks → blame game.\n\n**The DevOps solution:**\n"You build it, you run it" — one team owns the full lifecycle.\n\n**Key practices:**\n• **CI** — automated tests on every commit\n• **CD** — automated deployment\n• **IaC** — infrastructure as code\n• **Monitoring** — know what's happening in prod\n• **On-call** — you're on duty and you fix your own stuff\n\n**Tools:** Git, Docker, Kubernetes, Terraform, Ansible, Jenkins/GitHub Actions, Prometheus, Grafana`,
        task:"Explain DevOps to a beginner using a real-life analogy. Why do companies adopt DevOps? What specific problems does it solve? 3 real company examples.", hint:"Amazon deploys every 11 seconds. Netflix Chaos Engineering. Google SRE..." },
      { id:"o2", title:"Linux & the Command Line", level:"Basics", xp:75,
        theory:`**Linux** — the foundation of the server world. 96% of internet servers run Linux.\n\n**Essential commands:**\n\`ls -la\` — list files\n\`cd /path\` — change directory\n\`cat file.txt\` — show file\n\`grep "error" logs.txt\` — search in file\n\`ps aux | grep python\` — find process\n\`kill -9 PID\` — kill process\n\`df -h\` — disk space\n\`htop\` — resource monitor\n\n**SSH:**\n\`ssh user@server-ip\` — connect to server\n\`scp file.txt user@server:/path\` — copy file\n\n**Bash scripts:**\n\`#!/bin/bash\` — shebang\n\`chmod +x script.sh && ./script.sh\` — run\n\n**Permissions:** \`chmod 755\`, \`chown user:group\``,
        task:"Write a bash script for server health monitoring: CPU, RAM, disk, top-5 processes. Prints an alert if anything exceeds 80%. Explain each command.", hint:"free -h, df -h, top -bn1, uptime, iostat..." },
      { id:"o3", title:"Docker — Containers", level:"Practice", xp:100,
        theory:`**Docker** — the containerisation standard. Isolate your app with all its dependencies.\n\n**Dockerfile:**\n\`\`\`dockerfile\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]\n\`\`\`\n\n**Key commands:**\n\`docker build -t myapp .\`\n\`docker run -p 3000:3000 myapp\`\n\`docker ps\` — running containers\n\`docker logs container_id\`\n\`docker exec -it container_id sh\`\n\n**Docker Compose** for multiple services:\napp + postgres + redis + nginx — all start with \`docker-compose up\`\n\n**Best practices:** multi-stage builds, .dockerignore, non-root user, healthcheck`,
        task:"Write a multi-stage Dockerfile for a Node.js API + docker-compose.yml with PostgreSQL, Redis, Nginx. Explain each line. Add a healthcheck.", hint:"Stage 1: build. Stage 2: production image. Volumes for DB data..." },
      { id:"o4", title:"Kubernetes", level:"Advanced", xp:175,
        theory:`**Kubernetes (K8s)** — container orchestration. Manages thousands of Docker containers.\n\n**Key objects:**\n• **Pod** — smallest unit (1+ container)\n• **Deployment** — declarative pod management\n• **Service** — network access to pods\n• **Ingress** — incoming traffic (HTTP routing)\n• **ConfigMap/Secret** — configuration\n• **PersistentVolume** — storage\n\n**Philosophy:** declarative config. You describe the desired state — K8s maintains it.\n\n**Helm** — package manager for K8s.\n\n**Managed K8s:** EKS (AWS), GKE (GCP), AKS (Azure) — no need to manage master nodes.\n\n**Career:** DevOps/SRE with K8s experience earns 2× more.`,
        task:"Write K8s manifests to deploy a FastAPI app: Deployment (3 replicas), Service, Ingress, HorizontalPodAutoscaler. Explain what each resource does.", hint:"Deployment → pod management, Service → LB, HPA → auto-scaling by CPU..." },
    ]
  },
  {
    id: "web3", title: "Web3 / Blockchain", icon: "⛓️", color: "#f472b6", accent: "#db2777",
    description: "Blockchain, smart contracts, DeFi, Solidity",
    salary: "$4,000–20,000", demand: "🔥🔥",
    lessons: [
      { id:"w1", title:"How Blockchain Works", level:"Basics", xp:50,
        theory:`**Blockchain** — a distributed database where records cannot be altered or deleted.\n\n**Analogy:** Imagine a notebook where a million people each have a copy. To change a record you'd need to convince 51% of all owners. That's practically impossible.\n\n**How it works:**\n1. Someone creates a transaction\n2. Transaction is broadcast to all nodes\n3. Miners/validators verify the transaction\n4. Transaction is added to a block\n5. Block is added to the chain\n6. The block can't be changed — it contains the hash of the previous one\n\n**Consensus mechanisms:**\n• **PoW** (Proof of Work) — Bitcoin, computational work\n• **PoS** (Proof of Stake) — Ethereum, coin staking\n\n**Key properties:**\nDecentralisation, transparency, immutability, security.`,
        task:"Explain blockchain to a friend who knows nothing about technology. Why is it revolutionary? In which industries beyond crypto is it useful?", hint:"Logistics, voting, medical records, NFTs, DeFi, DAOs..." },
      { id:"w2", title:"Smart Contracts & Solidity", level:"Practice", xp:125,
        theory:`**A smart contract** is a program on the blockchain. It executes automatically when conditions are met.\n\nAnalogy: a vending machine. You insert a coin (condition) → you get the product (execution). No middlemen.\n\n**Solidity** — Ethereum's smart contract language:\n\`\`\`solidity\npragma solidity ^0.8.0;\n\ncontract SimpleToken {\n    mapping(address => uint) public balances;\n    \n    function deposit() public payable {\n        balances[msg.sender] += msg.value;\n    }\n    \n    function withdraw(uint amount) public {\n        require(balances[msg.sender] >= amount);\n        balances[msg.sender] -= amount;\n        payable(msg.sender).transfer(amount);\n    }\n}\n\`\`\`\n\n**Gas** — the fee for computation on the Ethereum network.\n\n**Tools:** Hardhat, Foundry, OpenZeppelin (library), Remix IDE`,
        task:"Write a Solidity smart contract for a simple vote: create a vote, cast a vote, view results. Protect against double voting.", hint:"mapping for storing votes, require for checks, events for logging..." },
      { id:"w3", title:"DeFi & the Web3 Ecosystem", level:"Advanced", xp:150,
        theory:`**DeFi** (Decentralized Finance) — financial services without banks.\n\n**Key protocols:**\n• **Uniswap** — decentralised exchange (DEX), AMM\n• **Aave/Compound** — lending/borrowing\n• **MakerDAO** — DAI stablecoin\n• **Curve** — stablecoin swaps\n\n**TVL** (Total Value Locked) — metric for DeFi protocol size.\n\n**Concepts:**\n• **Liquidity Pool** — pool of assets\n• **Yield Farming** — earning on liquidity\n• **Flash Loans** — uncollateralised loans within one transaction\n• **Oracle** — real-world data on-chain (Chainlink)\n\n**Web3 stack:**\nSolidity + Hardhat + ethers.js/viem + wagmi + React + The Graph\n\n**Security:** code audits are critical. DeFi hacks cost billions.`,
        task:"Explain how an AMM (Automated Market Maker) works using Uniswap as an example. Explain the x*y=k formula. What is impermanent loss? When is it worth it for an LP?", hint:"Liquidity, pool, price through reserve ratio, arbitrage..." },
    ]
  }
];

const ACHIEVEMENTS = [
  { id:"first_lesson", title:"First Step", desc:"Completed your first lesson", icon:"🌱" },
  { id:"first_track", title:"Specialist", desc:"Completed a full track", icon:"🎓" },
  { id:"xp_500", title:"Gaining Momentum", desc:"500 XP earned", icon:"⚡" },
  { id:"xp_1000", title:"Four Figures", desc:"1,000 XP earned", icon:"💎" },
  { id:"three_tracks", title:"Polymath", desc:"Lessons in 3 different tracks", icon:"🔥" },
  { id:"xp_2000", title:"Senior Mode", desc:"2,000 XP — senior level", icon:"🚀" },
];

const LEVELS = [
  { name:"Beginner", min:0, icon:"🌱" },
  { name:"Junior", min:200, icon:"💡" },
  { name:"Mid-level", min:600, icon:"⚡" },
  { name:"Senior", min:1200, icon:"🔥" },
  { name:"Architect", min:2000, icon:"🚀" },
  { name:"Legend", min:3000, icon:"👑" },
];

const getLevel = (xp) => { let l = LEVELS[0]; for (const lvl of LEVELS) { if (xp >= lvl.min) l = lvl; } return l; };
const getNextLevel = (xp) => { for (let i = 0; i < LEVELS.length; i++) { if (xp < LEVELS[i].min) return LEVELS[i]; } return null; };

const MENTOR_SYSTEM = (lesson) =>
  `You are an IT mentor. Evaluate the student's answer to a practical task.

LESSON: "${lesson.title}"
TASK: "${lesson.task}"

Reply strictly in this format:

⚡ **Strengths**
[what is specifically good, 2-3 points]

🔍 **What to improve**
[specific gaps or weaknesses]

💡 **Practitioner's insight**
[1 advanced point the student didn't mention]

🎯 **Score: X/10**
[one sentence — why this score]

Max 180 words. Talk like a senior colleague, not a teacher.`;

export default function Defy() {
  const [screen, setScreen] = useState("home");
  const [activeTrack, setActiveTrack] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonView, setLessonView] = useState("theory");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsgs, setChatMsgs] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [xp, setXp] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [earnedAchievements, setEarnedAchievements] = useState([]);
  const [showXpPopup, setShowXpPopup] = useState(null);
  const [showAchievement, setShowAchievement] = useState(null);
  const [activeTab, setActiveTab] = useState("tracks");
  const chatRef = useRef(null);

  useEffect(() => { chatRef.current?.scrollIntoView({ behavior:"smooth" }); }, [chatMsgs]);

  const checkAchievements = (newXp, newCompleted) => {
    const toCheck = [
      { id:"first_lesson", cond: newCompleted.length >= 1 },
      { id:"xp_500", cond: newXp >= 500 },
      { id:"xp_1000", cond: newXp >= 1000 },
      { id:"xp_2000", cond: newXp >= 2000 },
      { id:"three_tracks", cond: new Set(newCompleted.map(id => TRACKS.find(t => t.lessons.find(l => l.id === id))?.id)).size >= 3 },
    ];
    toCheck.forEach(({ id, cond }) => {
      if (cond && !earnedAchievements.includes(id)) {
        setEarnedAchievements(prev => [...prev, id]);
        const ach = ACHIEVEMENTS.find(a => a.id === id);
        setShowAchievement(ach);
        setTimeout(() => setShowAchievement(null), 3000);
      }
    });
  };

  const submitAnswer = async () => {
    if (!answer.trim() || loadingFeedback) return;
    setLoadingFeedback(true); setLessonView("feedback"); setFeedback("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system: MENTOR_SYSTEM(activeLesson), messages:[{ role:"user", content: answer }] }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text||"").join("") || "Error. Please try again.";
      setFeedback(text);
      if (!completedLessons.includes(activeLesson.id)) {
        const gained = activeLesson.xp; const newXp = xp + gained;
        const newCompleted = [...completedLessons, activeLesson.id];
        setXp(newXp); setCompletedLessons(newCompleted);
        setShowXpPopup(`+${gained} XP`); setTimeout(() => setShowXpPopup(null), 2000);
        checkAchievements(newXp, newCompleted);
      }
    } catch { setFeedback("Connection error. Please try again."); }
    setLoadingFeedback(false);
  };

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const msg = { role:"user", content: chatInput };
    const msgs = [...chatMsgs, msg];
    setChatMsgs(msgs); setChatInput(""); setChatLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:600,
          system:`You are an IT mentor. Answer briefly (max 120 words) the student's questions about: "${activeLesson?.title}". Talk like a senior colleague, use examples.`,
          messages: msgs }),
      });
      const data = await res.json();
      setChatMsgs(prev => [...prev, { role:"assistant", content: data.content?.map(b=>b.text||"").join("") || "Error." }]);
    } catch { setChatMsgs(prev => [...prev, { role:"assistant", content:"Connection error." }]); }
    setChatLoading(false);
  };

  const bold = (text) => text.split(/(\*\*.*?\*\*)/g).map((p,i) =>
    p.startsWith("**") && p.endsWith("**") ? <strong key={i} style={{ color:"#fde68a" }}>{p.slice(2,-2)}</strong> : p
  );
  const renderText = (text) => text.split("\n").map((line,i) => (
    <div key={i} style={{ marginBottom: line===""?6:0, lineHeight:1.7 }}>{bold(line)}</div>
  ));

  const currentLevel = getLevel(xp);
  const nextLevel = getNextLevel(xp);
  const xpProgress = nextLevel ? ((xp - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100 : 100;
  const track = activeTrack ? TRACKS.find(t => t.id === activeTrack) : null;

  // ── HOME ──
  if (screen === "home") {
    const totalLessons = TRACKS.reduce((a,t) => a+t.lessons.length, 0);
    return (
      <div style={{ minHeight:"100vh", background:"#070b12", color:"#c8d8e8", fontFamily:"'Georgia', serif" }}>
        <div style={{ padding:"16px 28px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", gap:16, background:"rgba(0,0,0,0.3)" }}>
          <div style={{ fontSize:20, fontWeight:"bold", color:"#e8f0f8", letterSpacing:1 }}>⚡ Defy</div>
          <div style={{ fontSize:11, color:"#6ceeb4", fontStyle:"italic", marginLeft:4 }}>Dare to imagine. Dare to build.</div>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:20 }}>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:12, color:"#fde68a" }}>{currentLevel.icon} {currentLevel.name}</div>
              <div style={{ fontSize:11, color:"#5a7a8a" }}>{xp} XP</div>
            </div>
            <div style={{ width:80 }}>
              <div style={{ height:4, background:"rgba(255,255,255,0.08)", borderRadius:2 }}>
                <div style={{ height:"100%", width:`${xpProgress}%`, background:"linear-gradient(90deg,#fde68a,#f59e0b)", borderRadius:2, transition:"width 0.5s" }} />
              </div>
              {nextLevel && <div style={{ fontSize:9, color:"#3a5060", marginTop:2 }}>to {nextLevel.name}: {nextLevel.min - xp} XP</div>}
            </div>
            <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#f59e0b,#fde68a)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:"bold", color:"#070b12" }}>{currentLevel.icon}</div>
          </div>
        </div>

        <div style={{ padding:"0 28px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", gap:0 }}>
          {[["tracks","🗺 Tracks"],["progress","📈 Progress"],["achievements","🏆 Achievements"]].map(([tab,label]) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding:"12px 20px", background:"transparent", border:"none", borderBottom: activeTab===tab ? "2px solid #f59e0b" : "2px solid transparent", color: activeTab===tab ? "#fde68a" : "#4a6070", cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>{label}</button>
          ))}
        </div>

        {activeTab === "tracks" && (
          <div style={{ padding:"28px", maxWidth:900, margin:"0 auto" }}>
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:22, fontWeight:"bold", color:"#e8f0f8", marginBottom:6 }}>Choose your career track</div>
              <div style={{ fontSize:13, color:"#4a6070" }}>{completedLessons.length} of {totalLessons} lessons completed</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16 }}>
              {TRACKS.map(t => {
                const done = t.lessons.filter(l => completedLessons.includes(l.id)).length;
                const pct = Math.round((done/t.lessons.length)*100);
                return (
                  <div key={t.id} onClick={() => { setActiveTrack(t.id); setScreen("track"); }}
                    style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:"20px", cursor:"pointer", transition:"all 0.2s", borderTop:`3px solid ${t.color}` }}
                    onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.transform="translateY(0)"; }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <span style={{ fontSize:28 }}>{t.icon}</span>
                      <div>
                        <div style={{ fontWeight:"bold", color:"#e8f0f8", fontSize:15 }}>{t.title}</div>
                        <div style={{ fontSize:11, color:t.color }}>{t.demand} Demand</div>
                      </div>
                    </div>
                    <div style={{ fontSize:12, color:"#5a7a8a", marginBottom:12, lineHeight:1.5 }}>{t.description}</div>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#4a6070", marginBottom:8 }}>
                      <span>💰 {t.salary}</span>
                      <span>{done}/{t.lessons.length} lessons</span>
                    </div>
                    <div style={{ height:3, background:"rgba(255,255,255,0.06)", borderRadius:2 }}>
                      <div style={{ height:"100%", width:`${pct}%`, background:t.color, borderRadius:2, transition:"width 0.5s" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "progress" && (
          <div style={{ padding:"28px", maxWidth:700 }}>
            <div style={{ fontSize:18, fontWeight:"bold", color:"#e8f0f8", marginBottom:20 }}>Your Progress</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:24 }}>
              {[["⚡ XP", xp],["📚 Lessons", completedLessons.length],["🏆 Badges", earnedAchievements.length]].map(([label,val]) => (
                <div key={label} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"16px", textAlign:"center" }}>
                  <div style={{ fontSize:22, fontWeight:"bold", color:"#fde68a" }}>{val}</div>
                  <div style={{ fontSize:12, color:"#4a6070", marginTop:4 }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:12, padding:"20px" }}>
              <div style={{ fontSize:13, color:"#8a9aaa", marginBottom:16 }}>Career Ladder</div>
              {LEVELS.map((l, i) => {
                const reached = xp >= l.min; const isCurrent = currentLevel.name === l.name;
                return (
                  <div key={l.name} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12, opacity: reached ? 1 : 0.35 }}>
                    <div style={{ width:32, height:32, borderRadius:"50%", background: isCurrent ? "linear-gradient(135deg,#f59e0b,#fde68a)" : reached ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.04)", border: `2px solid ${isCurrent ? "#f59e0b" : reached ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.08)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{l.icon}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, color: isCurrent ? "#fde68a" : "#8a9aaa" }}>{l.name}</div>
                      <div style={{ fontSize:11, color:"#3a5060" }}>{l.min} XP{i < LEVELS.length-1 ? ` — ${LEVELS[i+1].min} XP` : "+"}</div>
                    </div>
                    {isCurrent && <div style={{ fontSize:11, color:"#f59e0b", background:"rgba(245,158,11,0.1)", padding:"2px 8px", borderRadius:10 }}>current</div>}
                    {reached && !isCurrent && <div style={{ fontSize:11, color:"#34d399" }}>✓</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div style={{ padding:"28px", maxWidth:700 }}>
            <div style={{ fontSize:18, fontWeight:"bold", color:"#e8f0f8", marginBottom:20 }}>Achievements</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {ACHIEVEMENTS.map(a => {
                const earned = earnedAchievements.includes(a.id);
                return (
                  <div key={a.id} style={{ background: earned ? "rgba(245,158,11,0.08)" : "rgba(255,255,255,0.02)", border: `1px solid ${earned ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.06)"}`, borderRadius:12, padding:"16px", display:"flex", gap:12, alignItems:"center", opacity: earned ? 1 : 0.4 }}>
                    <span style={{ fontSize:28, filter: earned ? "none" : "grayscale(1)" }}>{a.icon}</span>
                    <div>
                      <div style={{ fontSize:13, color: earned ? "#fde68a" : "#6a8090", fontWeight:"bold" }}>{a.title}</div>
                      <div style={{ fontSize:11, color:"#4a6070", marginTop:2 }}>{a.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {showXpPopup && <div style={{ position:"fixed", top:80, right:28, background:"linear-gradient(135deg,#f59e0b,#fde68a)", color:"#070b12", padding:"10px 20px", borderRadius:20, fontWeight:"bold", fontSize:16, animation:"fadeUp 0.3s ease", zIndex:1000, boxShadow:"0 8px 30px rgba(245,158,11,0.4)" }}>{showXpPopup} 🎉</div>}
        {showAchievement && <div style={{ position:"fixed", bottom:28, right:28, background:"rgba(10,15,25,0.95)", border:"1px solid rgba(245,158,11,0.4)", borderRadius:14, padding:"16px 20px", display:"flex", gap:12, alignItems:"center", zIndex:1000, boxShadow:"0 8px 40px rgba(0,0,0,0.6)", animation:"fadeUp 0.3s ease" }}><span style={{ fontSize:32 }}>{showAchievement.icon}</span><div><div style={{ fontSize:11, color:"#f59e0b", textTransform:"uppercase", letterSpacing:1 }}>Achievement Unlocked!</div><div style={{ fontSize:14, color:"#fde68a", fontWeight:"bold" }}>{showAchievement.title}</div><div style={{ fontSize:12, color:"#5a7a8a" }}>{showAchievement.desc}</div></div></div>}
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box;}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:rgba(245,158,11,0.2);border-radius:2px;}`}</style>
      </div>
    );
  }

  // ── TRACK ──
  if (screen === "track" && track) {
    return (
      <div style={{ minHeight:"100vh", background:"#070b12", color:"#c8d8e8", fontFamily:"'Georgia', serif" }}>
        <div style={{ padding:"16px 28px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={() => setScreen("home")} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#5a7a8a", padding:"6px 12px", cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>← Back</button>
          <span style={{ fontSize:22 }}>{track.icon}</span>
          <div><div style={{ fontWeight:"bold", color:"#e8f0f8" }}>{track.title}</div><div style={{ fontSize:11, color:track.color }}>{track.description}</div></div>
          <div style={{ marginLeft:"auto", fontSize:12, color:"#4a6070" }}>{track.lessons.filter(l=>completedLessons.includes(l.id)).length}/{track.lessons.length} lessons</div>
        </div>
        <div style={{ padding:"28px", maxWidth:700, margin:"0 auto" }}>
          <div style={{ marginBottom:20, fontSize:13, color:"#4a6070" }}>💰 Salary: <span style={{ color:track.color }}>{track.salary}</span> · Demand: {track.demand}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {track.lessons.map((lesson, idx) => {
              const done = completedLessons.includes(lesson.id);
              const locked = idx > 0 && !completedLessons.includes(track.lessons[idx-1].id);
              return (
                <div key={lesson.id} onClick={() => { if (!locked) { setActiveLesson(lesson); setLessonView("theory"); setAnswer(""); setFeedback(""); setChatMsgs([]); setChatOpen(false); setScreen("lesson"); } }}
                  style={{ background: done ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)", border: `1px solid ${done ? `${track.color}50` : "rgba(255,255,255,0.07)"}`, borderLeft: `3px solid ${done ? track.color : locked ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)"}`, borderRadius:10, padding:"16px 20px", cursor: locked ? "default" : "pointer", opacity: locked ? 0.4 : 1, transition:"all 0.2s", display:"flex", alignItems:"center", gap:14 }}
                  onMouseEnter={e => { if (!locked) e.currentTarget.style.background="rgba(255,255,255,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = done ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)"; }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background: done ? `${track.color}30` : "rgba(255,255,255,0.05)", border:`2px solid ${done ? track.color : "rgba(255,255,255,0.1)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{locked ? "🔒" : done ? "✅" : idx+1}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, color: done ? "#e8f0f8" : "#8a9aaa", fontWeight: done ? "bold" : "normal" }}>{lesson.title}</div>
                    <div style={{ fontSize:11, color:"#3a5060", marginTop:2 }}>{lesson.level} · {lesson.xp} XP</div>
                  </div>
                  {done && <div style={{ fontSize:11, color:track.color }}>✓ Done</div>}
                  {!done && !locked && <div style={{ fontSize:18, color:"#3a5060" }}>→</div>}
                </div>
              );
            })}
          </div>
        </div>
        {showXpPopup && <div style={{ position:"fixed", top:80, right:28, background:"linear-gradient(135deg,#f59e0b,#fde68a)", color:"#070b12", padding:"10px 20px", borderRadius:20, fontWeight:"bold", fontSize:16, zIndex:1000 }}>{showXpPopup} 🎉</div>}
        <style>{`*{box-sizing:border-box;}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:rgba(245,158,11,0.2);border-radius:2px;}`}</style>
      </div>
    );
  }

  // ── LESSON ──
  if (screen === "lesson" && activeLesson && track) {
    const lessonIdx = track.lessons.findIndex(l => l.id === activeLesson.id);
    const nextLesson = track.lessons[lessonIdx + 1];
    return (
      <div style={{ minHeight:"100vh", background:"#070b12", color:"#c8d8e8", fontFamily:"'Georgia', serif", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"12px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", gap:10, background:"rgba(0,0,0,0.2)", flexShrink:0 }}>
          <button onClick={() => setScreen("track")} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.08)", borderRadius:6, color:"#5a7a8a", padding:"5px 10px", cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>← Lessons</button>
          <div style={{ flex:1, textAlign:"center" }}>
            <div style={{ fontSize:14, fontWeight:"bold", color:"#e8f0f8" }}>{activeLesson.title}</div>
            <div style={{ fontSize:10, color:"#3a5060" }}>{activeLesson.level} · {activeLesson.xp} XP</div>
          </div>
          <div style={{ display:"flex", gap:6 }}>
            {["theory","practice"].map(v => (
              <button key={v} onClick={() => setLessonView(v)} style={{ padding:"5px 12px", borderRadius:6, border:"1px solid", borderColor: lessonView===v ? track.color : "rgba(255,255,255,0.08)", background: lessonView===v ? `${track.color}18` : "transparent", color: lessonView===v ? track.color : "#4a6070", cursor:"pointer", fontSize:11, fontFamily:"inherit" }}>{v==="theory" ? "📖 Theory" : "⚡ Practice"}</button>
            ))}
          </div>
        </div>

        <div style={{ flex:1, overflow:"auto", padding:"24px 20px", maxWidth:680, width:"100%", alignSelf:"center" }}>
          {lessonView === "theory" && (
            <div>
              <div style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:"22px 24px", fontSize:14, lineHeight:1.75 }}>{renderText(activeLesson.theory)}</div>
              <button onClick={() => setLessonView("practice")} style={{ marginTop:16, padding:"12px 28px", background:`linear-gradient(135deg,${track.accent},${track.color})`, border:"none", borderRadius:8, color:"#070b12", fontWeight:"bold", fontSize:14, cursor:"pointer", fontFamily:"inherit", boxShadow:`0 4px 20px ${track.color}40` }}>⚡ Go to Practice →</button>
            </div>
          )}
          {lessonView === "practice" && (
            <div>
              <div style={{ background:`${track.color}0f`, border:`1px solid ${track.color}30`, borderRadius:12, padding:"18px 22px", marginBottom:16 }}>
                <div style={{ fontSize:10, color:track.color, letterSpacing:1.5, textTransform:"uppercase", marginBottom:8 }}>Task</div>
                <div style={{ fontSize:14, color:"#d0e0f0", lineHeight:1.7 }}>{activeLesson.task}</div>
                <div style={{ marginTop:12, padding:"10px 14px", background:"rgba(0,0,0,0.25)", borderRadius:8, fontSize:12, color:"#4a6070" }}>💡 Hint: {activeLesson.hint}</div>
              </div>
              <textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Write your answer here..." style={{ width:"100%", minHeight:150, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, padding:"14px", color:"#c8d8e8", fontSize:14, resize:"vertical", outline:"none", fontFamily:"inherit", lineHeight:1.65 }} onFocus={e=>e.target.style.borderColor=`${track.color}60`} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"} />
              <div style={{ display:"flex", gap:10, marginTop:10 }}>
                <button onClick={submitAnswer} disabled={!answer.trim()||loadingFeedback} style={{ padding:"11px 22px", background: answer.trim() ? `linear-gradient(135deg,${track.accent},${track.color})` : "rgba(255,255,255,0.04)", border:"none", borderRadius:8, color: answer.trim() ? "#070b12" : "#3a5060", fontWeight:"bold", fontSize:13, cursor: answer.trim() ? "pointer" : "default", fontFamily:"inherit" }}>{loadingFeedback ? "Checking..." : "🚀 Get Feedback"}</button>
                <button onClick={() => { setChatOpen(true); setChatMsgs([]); }} style={{ padding:"11px 18px", background:"transparent", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, color:"#5a7a8a", cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>💬 Ask Mentor</button>
              </div>
            </div>
          )}
          {lessonView === "feedback" && (
            <div>
              {loadingFeedback ? (
                <div style={{ display:"flex", gap:8, alignItems:"center", padding:"30px 0", color:track.color }}>
                  {[0,1,2].map(j=><div key={j} style={{ width:8,height:8,borderRadius:"50%",background:track.color,animation:`pulse 1.2s ease-in-out ${j*0.2}s infinite` }}/>)}
                  <span style={{ fontSize:13, marginLeft:8 }}>Mentor is reviewing your answer...</span>
                </div>
              ) : (
                <>
                  <div style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:"22px 24px", fontSize:14 }}>{renderText(feedback)}</div>
                  <div style={{ display:"flex", gap:10, marginTop:14, flexWrap:"wrap" }}>
                    <button onClick={() => { setLessonView("practice"); setAnswer(""); setFeedback(""); }} style={{ padding:"10px 18px", background:"transparent", border:`1px solid ${track.color}40`, borderRadius:8, color:track.color, cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>🔄 Try Again</button>
                    {nextLesson && <button onClick={() => { setActiveLesson(nextLesson); setLessonView("theory"); setAnswer(""); setFeedback(""); setChatMsgs([]); }} style={{ padding:"10px 18px", background:`linear-gradient(135deg,${track.accent},${track.color})`, border:"none", borderRadius:8, color:"#070b12", fontWeight:"bold", fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>Next Lesson →</button>}
                    {!nextLesson && <button onClick={() => setScreen("home")} style={{ padding:"10px 18px", background:`linear-gradient(135deg,${track.accent},${track.color})`, border:"none", borderRadius:8, color:"#070b12", fontWeight:"bold", fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>🏠 Home</button>}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {chatOpen && (
          <div style={{ position:"fixed", bottom:0, right:0, width:340, height:420, background:"#0d1520", border:`1px solid ${track.color}30`, borderRadius:"14px 14px 0 0", display:"flex", flexDirection:"column", zIndex:100, boxShadow:"0 -8px 40px rgba(0,0,0,0.5)" }}>
            <div style={{ padding:"12px 16px", borderBottom:`1px solid ${track.color}20`, display:"flex", alignItems:"center", gap:8 }}>
              <span>🤖</span><span style={{ fontSize:13, color:track.color }}>Mentor — {activeLesson.title}</span>
              <button onClick={()=>setChatOpen(false)} style={{ marginLeft:"auto", background:"transparent", border:"none", color:"#4a6070", cursor:"pointer", fontSize:18 }}>×</button>
            </div>
            <div style={{ flex:1, overflow:"auto", padding:"12px", display:"flex", flexDirection:"column", gap:10 }}>
              {chatMsgs.length === 0 && <div style={{ color:"#3a5060", fontSize:12, textAlign:"center", marginTop:20 }}>Ask anything about this lesson 👆</div>}
              {chatMsgs.map((m,i) => (
                <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
                  <div style={{ maxWidth:"80%", padding:"9px 13px", borderRadius:10, background:m.role==="user"?`${track.color}18`:"rgba(255,255,255,0.04)", border:`1px solid ${m.role==="user"?`${track.color}25`:"rgba(255,255,255,0.06)"}`, fontSize:12, lineHeight:1.6, color:"#c8d8e8", whiteSpace:"pre-wrap" }}>{m.content}</div>
                </div>
              ))}
              {chatLoading && <div style={{ display:"flex", gap:4 }}>{[0,1,2].map(j=><div key={j} style={{ width:6,height:6,borderRadius:"50%",background:track.color,animation:`pulse 1.2s ease-in-out ${j*0.2}s infinite` }}/>)}</div>}
              <div ref={chatRef}/>
            </div>
            <div style={{ padding:"10px", borderTop:`1px solid ${track.color}15`, display:"flex", gap:8 }}>
              <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Ask the mentor..." style={{ flex:1, background:"transparent", border:"none", color:"#c8d8e8", fontSize:12, outline:"none", fontFamily:"inherit" }} />
              <button onClick={sendChat} disabled={!chatInput.trim()||chatLoading} style={{ padding:"6px 12px", background:chatInput.trim()?track.color:"rgba(255,255,255,0.05)", border:"none", borderRadius:6, color:chatInput.trim()?"#070b12":"#3a5060", cursor:chatInput.trim()?"pointer":"default", fontSize:12, fontFamily:"inherit" }}>→</button>
            </div>
          </div>
        )}

        {showXpPopup && <div style={{ position:"fixed", top:70, right:20, background:"linear-gradient(135deg,#f59e0b,#fde68a)", color:"#070b12", padding:"10px 20px", borderRadius:20, fontWeight:"bold", fontSize:16, zIndex:1000, animation:"fadeUp 0.3s ease" }}>{showXpPopup} 🎉</div>}
        {showAchievement && <div style={{ position:"fixed", bottom:28, left:20, background:"rgba(10,15,25,0.95)", border:"1px solid rgba(245,158,11,0.4)", borderRadius:14, padding:"14px 18px", display:"flex", gap:10, alignItems:"center", zIndex:1000, animation:"fadeUp 0.3s ease" }}><span style={{ fontSize:28 }}>{showAchievement.icon}</span><div><div style={{ fontSize:10, color:"#f59e0b", textTransform:"uppercase" }}>Achievement!</div><div style={{ fontSize:13, color:"#fde68a", fontWeight:"bold" }}>{showAchievement.title}</div></div></div>}
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes pulse{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1.1)}}*{box-sizing:border-box;}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:rgba(245,158,11,0.2);border-radius:2px;}`}</style>
      </div>
    );
  }
  return null;
}
