import { useState, useRef, useEffect } from "react";

const TRACKS = [
  { id:"aiml", title:"AI / ML Engineer", tag:"Most Wanted", color:"#7c3aed", light:"#ede9fe", description:"Neural networks, machine learning, LLMs, prompt engineering", salary:"$3,000–12,000",
    lessons:[
      {id:"a1",title:"What is AI & ML?",level:"Basics",xp:50,theory:`**Artificial Intelligence (AI)** — when a computer does things only humans used to do: translate text, recognise voices, recommend movies.\n\n**Machine Learning (ML)** — a way to build AI without hard-coded rules. We show the model thousands of examples and it finds patterns on its own.\n\n**Analogy:** You don't teach a child chess through theory — you just play thousands of games. ML works the same way.\n\n**Where it's used right now:**\n• Spotify — track recommendations\n• Gmail — spam filter\n• Face ID — face recognition\n• ChatGPT, Claude — language models`,task:"Explain in your own words: what's the difference between AI and ML? Give 3 real examples of ML you use every day.",hint:"Think about apps you use daily — streaming, email, your phone camera..."},
      {id:"a2",title:"Neural Networks",level:"Basics",xp:75,theory:`**A neural network** is a mathematical model inspired by the brain.\n\nBrain: neurons pass signals → connections strengthen with repetition.\nNeural net: numbers multiply across layers → weights are adjusted during training.\n\n**Architecture:**\n• **Input layer** — receives data\n• **Hidden layers** — extract features\n• **Output layer** — produces the result\n\n**How it learns:**\n1. Pass data forward (forward pass)\n2. Calculate the error (loss function)\n3. Adjust weights backward (backpropagation)\n4. Repeat millions of times`,task:"Write a prompt for an AI that explains neural networks to a 10-year-old — no jargon, use a real-life analogy.",hint:"Good prompt: AI role, target audience, ban on jargon, specific output format..."},
      {id:"a3",title:"Prompt Engineering",level:"Practice",xp:100,theory:`**Prompt engineering** — the art of talking to AI so you get the result you actually want.\n\n**Bad:** "Write about marketing"\n**Good:** "You are a startup CMO. Write 5 Instagram content ideas for a fitness studio targeting women 25–35."\n\n**Techniques:**\n• **Role prompting** — "You are an expert in..."\n• **Few-shot** — show 2–3 examples\n• **Chain of Thought** — "Think step by step"\n• **Constraints** — format, length, style, what NOT to do`,task:"Write a system prompt for an AI Python tutor for beginners. Use at least 4 techniques from the lesson.",hint:"Include: role, audience, restrictions, style, response format examples..."},
    ]
  },
  { id:"frontend", title:"Frontend Developer", tag:"High Demand", color:"#0891b2", light:"#e0f2fe", description:"HTML, CSS, JavaScript, React — build what users see", salary:"$2,000–8,000",
    lessons:[
      {id:"f1",title:"HTML — Skeleton of the Web",level:"Basics",xp:50,theory:`**HTML** — the structure of every webpage you've ever visited.\n\n**Key tags:**\n• \`<html>\` — root element\n• \`<head>\` — metadata\n• \`<body>\` — everything the user sees\n• \`<h1>–<h6>\` — headings\n• \`<p>\` — paragraph\n• \`<a href="...">\` — link\n• \`<div>\` — block container\n\n**Semantic HTML:**\n\`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<footer>\`\nCritical for SEO and accessibility!`,task:"Write the HTML structure for an IT school landing page. Use semantic tags, navigation, sections, and a registration form.",hint:"Structure: header → nav → hero → benefits → form → footer"},
      {id:"f2",title:"CSS — Style & Beauty",level:"Basics",xp:75,theory:`**CSS** — controls how everything looks.\n\n**Box Model:** content → padding → border → margin\n\n**Flexbox** — one-dimensional layouts:\n\`display: flex; justify-content: center; align-items: center;\`\n\n**Grid** — two-dimensional:\n\`display: grid; grid-template-columns: repeat(3, 1fr);\`\n\n**Animations:**\n\`transition: all 0.3s ease;\``,task:"Write CSS for a course card: avatar, title, description, button. Add a hover effect, shadow, and smooth animation.",hint:"Flexbox for layout, transition for animations, box-shadow for depth..."},
    ]
  },
  { id:"backend", title:"Backend Developer", tag:"High Demand", color:"#059669", light:"#d1fae5", description:"Python, APIs, databases — the engine behind every app", salary:"$2,500–10,000",
    lessons:[
      {id:"b1",title:"How the Internet Works",level:"Basics",xp:50,theory:`**What happens when you type google.com:**\n\n1. **DNS** — translates domain to IP\n2. **TCP/IP** — establishes connection\n3. **HTTP request** — browser asks the server\n4. **Server** — processes and returns HTML\n5. **Browser** — renders the page\n\n**HTTP methods:** GET · POST · PUT · DELETE`,task:"Explain what happens when a user clicks 'Log In'. Describe the full journey: from click to response.",hint:"Frontend → HTTP POST → Backend → DB check → JWT token → response..."},
      {id:"b2",title:"Python & FastAPI",level:"Basics",xp:75,theory:`**Python** — the #1 language for backend and ML.\n\n**FastAPI** — modern, fast API framework.\n\n\`\`\`python\n@app.get("/users/{id}")\nasync def get_user(id: int):\n    return {"id": id, "name": "Alice"}\n\`\`\`\n\n**Why FastAPI:** auto docs, validation, async out of the box.`,task:"Write a FastAPI endpoint for user registration: accepts email+password, validates, hashes password, returns JWT token.",hint:"Pydantic for validation, bcrypt for password, python-jose for JWT..."},
    ]
  },
  { id:"data", title:"Data Analyst", tag:"Growing Fast", color:"#d97706", light:"#fef3c7", description:"SQL, Python, visualisation — turn data into decisions", salary:"$2,000–7,000",
    lessons:[
      {id:"d1",title:"Thinking Like an Analyst",level:"Basics",xp:50,theory:`**Data Analyst** — translator between data and business.\n\n**Analysis cycle:**\n1. Business question\n2. Data collection\n3. Cleaning\n4. EDA — explore, find patterns\n5. Insights → decisions\n\n**Tools:** SQL · Pandas · Tableau/Power BI`,task:"Task: 'Q3 revenue is 23% below Q2'. Write 8 questions you'd ask the business, and what data you'd request.",hint:"Think about: seasonality, cohorts, channels, products, regions..."},
    ]
  },
  { id:"devops", title:"DevOps / Cloud", tag:"Premium Salaries", color:"#dc2626", light:"#fee2e2", description:"Docker, Kubernetes, CI/CD — keep everything running", salary:"$3,000–12,000",
    lessons:[
      {id:"o1",title:"What is DevOps?",level:"Basics",xp:50,theory:`**DevOps** — culture uniting development and operations.\n\n**Before:** Devs write code → throw it over the wall → Ops deploys → everything breaks.\n\n**After:** "You build it, you run it"\n\n**Key practices:** CI · CD · IaC · Monitoring\n\n**Tools:** Docker · Kubernetes · Terraform · GitHub Actions`,task:"Explain DevOps using a real-life analogy. Why do companies adopt it? 3 real examples.",hint:"Amazon deploys every 11 seconds. Netflix Chaos Engineering. Google SRE..."},
    ]
  },
  { id:"web3", title:"Web3 / Blockchain", tag:"Highest Upside", color:"#7c3aed", light:"#ede9fe", description:"Smart contracts, DeFi, Solidity — the decentralised web", salary:"$4,000–20,000",
    lessons:[
      {id:"w1",title:"How Blockchain Works",level:"Basics",xp:50,theory:`**Blockchain** — a distributed database where records cannot be altered.\n\n**Analogy:** A notebook where a million people each have a copy. Changing a record requires 51% agreement.\n\n**How it works:**\n1. Transaction created → broadcast to nodes\n2. Validators verify → added to block\n3. Block added to chain — immutable forever\n\n**Consensus:** PoW (Bitcoin) · PoS (Ethereum)`,task:"Explain blockchain to someone non-technical. Why is it revolutionary? What industries beyond crypto could use it?",hint:"Logistics, voting, medical records, NFTs, DeFi, DAOs..."},
    ]
  },
];

const ACHIEVEMENTS=[
  {id:"first_lesson",title:"First Step",desc:"Completed your first lesson",icon:"🌱"},
  {id:"xp_500",title:"On Fire",desc:"500 XP earned",icon:"⚡"},
  {id:"xp_1000",title:"Four Figures",desc:"1,000 XP earned",icon:"💎"},
  {id:"three_tracks",title:"Polymath",desc:"Explored 3 different tracks",icon:"🔥"},
  {id:"xp_2000",title:"Senior Mode",desc:"2,000 XP — senior level",icon:"🚀"},
  {id:"all_done",title:"Legend",desc:"Completed every lesson",icon:"👑"},
];

const LEVELS=[
  {name:"Beginner",min:0},{name:"Junior",min:200},{name:"Mid-level",min:600},
  {name:"Senior",min:1200},{name:"Architect",min:2000},{name:"Legend",min:3000},
];

const getLevel=(xp)=>{let l=LEVELS[0];for(const lvl of LEVELS){if(xp>=lvl.min)l=lvl;}return l;};
const getNextLevel=(xp)=>{for(let i=0;i<LEVELS.length;i++){if(xp<LEVELS[i].min)return LEVELS[i];}return null;};

const MENTOR=(lesson)=>`You are a Defy mentor. Evaluate the student's answer to this task.
LESSON: "${lesson.title}"
TASK: "${lesson.task}"
Reply strictly in this format:
⚡ **Strengths** — [2-3 specific good points]
🔍 **Improve** — [specific gaps]
💡 **Pro insight** — [1 thing a senior would add]
🎯 **Score: X/10** — [one sentence why]
Max 150 words. Be direct and encouraging.`;

export default function Defy() {
  const [screen,setScreen]=useState("home");
  const [activeTrack,setActiveTrack]=useState(null);
  const [activeLesson,setActiveLesson]=useState(null);
  const [view,setView]=useState("theory");
  const [answer,setAnswer]=useState("");
  const [feedback,setFeedback]=useState("");
  const [loading,setLoading]=useState(false);
  const [chatOpen,setChatOpen]=useState(false);
  const [chatMsgs,setChatMsgs]=useState([]);
  const [chatInput,setChatInput]=useState("");
  const [chatLoading,setChatLoading]=useState(false);
  const [xp,setXp]=useState(0);
  const [done,setDone]=useState([]);
  const [achs,setAchs]=useState([]);
  const [xpPop,setXpPop]=useState(null);
  const [achPop,setAchPop]=useState(null);
  const [tab,setTab]=useState("tracks");
  const chatRef=useRef(null);
  useEffect(()=>{chatRef.current?.scrollIntoView({behavior:"smooth"});},[chatMsgs]);

  const checkAchs=(newXp,newDone)=>{
    [{id:"first_lesson",cond:newDone.length>=1},{id:"xp_500",cond:newXp>=500},{id:"xp_1000",cond:newXp>=1000},{id:"xp_2000",cond:newXp>=2000},{id:"three_tracks",cond:new Set(newDone.map(id=>TRACKS.find(t=>t.lessons.find(l=>l.id===id))?.id)).size>=3}]
    .forEach(({id,cond})=>{
      if(cond&&!achs.includes(id)){
        setAchs(p=>[...p,id]);
        setAchPop(ACHIEVEMENTS.find(a=>a.id===id));
        setTimeout(()=>setAchPop(null),3000);
      }
    });
  };

  const submitAnswer=async()=>{
    if(!answer.trim()||loading)return;
    setLoading(true);setView("feedback");setFeedback("");
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,system:MENTOR(activeLesson),messages:[{role:"user",content:answer}]})});
      const data=await res.json();
      const text=data.content?.map(b=>b.text||"").join("")||"Error. Please try again.";
      setFeedback(text);
      if(!done.includes(activeLesson.id)){
        const g=activeLesson.xp;const nx=xp+g;const nd=[...done,activeLesson.id];
        setXp(nx);setDone(nd);setXpPop(`+${g} XP`);setTimeout(()=>setXpPop(null),2000);
        checkAchs(nx,nd);
      }
    }catch{setFeedback("Connection error. Please try again.");}
    setLoading(false);
  };

  const sendChat=async()=>{
    if(!chatInput.trim()||chatLoading)return;
    const msg={role:"user",content:chatInput};
    const msgs=[...chatMsgs,msg];
    setChatMsgs(msgs);setChatInput("");setChatLoading(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,system:`You are a Defy mentor. Answer in max 80 words about: "${activeLesson?.title}". Be direct.`,messages:msgs})});
      const data=await res.json();
      setChatMsgs(p=>[...p,{role:"assistant",content:data.content?.map(b=>b.text||"").join("")||"Error."}]);
    }catch{setChatMsgs(p=>[...p,{role:"assistant",content:"Connection error."}]);}
    setChatLoading(false);
  };

  const bold=(text)=>text.split(/(\*\*.*?\*\*)/g).map((p,i)=>
    p.startsWith("**")&&p.endsWith("**")?<strong key={i} style={{color:"#7c3aed",fontWeight:700}}>{p.slice(2,-2)}</strong>:p
  );
  const renderText=(text)=>text.split("\n").map((line,i)=>(
    <div key={i} style={{marginBottom:line===""?10:0,lineHeight:1.8}}>{bold(line)}</div>
  ));

  const currLevel=getLevel(xp);
  const nextLevel=getNextLevel(xp);
  const prog=nextLevel?((xp-currLevel.min)/(nextLevel.min-currLevel.min))*100:100;
  const track=activeTrack?TRACKS.find(t=>t.id===activeTrack):null;

  const Popups=()=>(
    <>
      {xpPop&&<div style={{position:"fixed",top:80,right:24,background:"#7c3aed",color:"#fff",padding:"10px 22px",borderRadius:100,fontWeight:800,fontSize:15,zIndex:999,boxShadow:"0 8px 24px rgba(124,58,237,0.5)",animation:"pop .3s cubic-bezier(.175,.885,.32,1.275)"}}>{xpPop} 🎉</div>}
      {achPop&&<div style={{position:"fixed",bottom:24,right:24,background:"#fff",border:"2px solid #7c3aed",borderRadius:20,padding:"16px 20px",display:"flex",gap:14,alignItems:"center",zIndex:999,boxShadow:"0 12px 40px rgba(124,58,237,0.2)",animation:"pop .3s cubic-bezier(.175,.885,.32,1.275)"}}>
        <span style={{fontSize:30}}>{achPop.icon}</span>
        <div><div style={{fontSize:10,color:"#7c3aed",fontWeight:800,letterSpacing:2,textTransform:"uppercase"}}>Achievement</div><div style={{fontSize:15,fontWeight:800,color:"#0f172a"}}>{achPop.title}</div></div>
      </div>}
    </>
  );

  // ── HOME ──────────────────────────────────
  if(screen==="home"){
    const total=TRACKS.reduce((a,t)=>a+t.lessons.length,0);
    return(
      <div style={{minHeight:"100vh",background:"#fafafa",fontFamily:"'Plus Jakarta Sans','DM Sans',sans-serif",color:"#0f172a"}}>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>

        {/* ── HEADER ── */}
        <header style={{background:"#fff",borderBottom:"1px solid #e8e8f0",position:"sticky",top:0,zIndex:50}}>
          <div style={{maxWidth:1100,margin:"0 auto",padding:"0 32px",height:64,display:"flex",alignItems:"center",gap:32}}>
            {/* Logo */}
            <div style={{fontSize:24,fontWeight:900,letterSpacing:2,color:"#0f172a"}}>
              DEF<span style={{color:"#7c3aed"}}>Y</span>
            </div>
            {/* Nav tabs */}
            <nav style={{display:"flex",gap:4,flex:1}}>
              {[["tracks","Tracks"],["progress","Progress"],["achievements","Achievements"]].map(([t,l])=>(
                <button key={t} onClick={()=>setTab(t)} style={{padding:"8px 16px",borderRadius:10,border:"none",background:tab===t?"#f3f0ff":"transparent",color:tab===t?"#7c3aed":"#64748b",cursor:"pointer",fontSize:14,fontWeight:tab===t?700:500,fontFamily:"inherit",transition:"all .15s"}}>
                  {l}
                </button>
              ))}
            </nav>
            {/* XP pill */}
            <div style={{display:"flex",alignItems:"center",gap:10,background:"#f8f7ff",border:"1px solid #e8e8f0",borderRadius:100,padding:"6px 16px 6px 8px"}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#7c3aed,#a78bfa)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:800}}>{currLevel.name.slice(0,1)}</div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:"#0f172a",lineHeight:1}}>{currLevel.name}</div>
                <div style={{fontSize:11,color:"#94a3b8",lineHeight:1,marginTop:2}}>{xp} XP</div>
              </div>
              {nextLevel&&(
                <div style={{width:48,height:4,background:"#e8e8f0",borderRadius:2,overflow:"hidden",marginLeft:4}}>
                  <div style={{height:"100%",width:`${prog}%`,background:"linear-gradient(90deg,#7c3aed,#a78bfa)",borderRadius:2,transition:"width .5s"}}/>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── TRACKS TAB ── */}
        {tab==="tracks"&&(
          <main style={{maxWidth:1100,margin:"0 auto",padding:"56px 32px"}}>
            {/* Hero */}
            <div style={{marginBottom:56}}>
              <div style={{display:"inline-block",background:"#f3f0ff",color:"#7c3aed",fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase",padding:"6px 14px",borderRadius:100,marginBottom:20}}>
                AI-powered learning
              </div>
              <h1 style={{fontSize:"clamp(36px,5vw,56px)",fontWeight:900,lineHeight:1.1,letterSpacing:-2,margin:0,color:"#0f172a"}}>
                From zero to<br/>
                <span style={{color:"#7c3aed"}}>hired engineer.</span>
              </h1>
              <p style={{fontSize:18,color:"#64748b",marginTop:20,maxWidth:480,lineHeight:1.6,fontWeight:500}}>
                Every lesson starts with a real task. Practice first, theory second — with an AI mentor that gives you feedback like a senior colleague.
              </p>
              <div style={{display:"flex",gap:12,marginTop:28,flexWrap:"wrap"}}>
                <div style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:12,padding:"10px 18px",fontSize:13,color:"#475569",fontWeight:600}}>{done.length} of {total} completed</div>
                <div style={{background:"#f3f0ff",border:"1px solid #ddd6fe",borderRadius:12,padding:"10px 18px",fontSize:13,color:"#7c3aed",fontWeight:600}}>6 career tracks</div>
                <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:12,padding:"10px 18px",fontSize:13,color:"#16a34a",fontWeight:600}}>AI mentor included</div>
              </div>
            </div>

            {/* Track grid */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:20}}>
              {TRACKS.map(t=>{
                const doneCount=t.lessons.filter(l=>done.includes(l.id)).length;
                const pct=Math.round((doneCount/t.lessons.length)*100);
                return(
                  <div key={t.id} onClick={()=>{setActiveTrack(t.id);setScreen("track");}}
                    style={{background:"#fff",border:"1px solid #e8e8f0",borderRadius:20,padding:"28px",cursor:"pointer",transition:"all .2s",position:"relative",overflow:"hidden"}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 20px 40px ${t.color}18`;e.currentTarget.style.borderColor=`${t.color}40`;}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor="#e8e8f0";}}>
                    {/* Tag */}
                    <div style={{display:"inline-block",background:t.light,color:t.color,fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",padding:"4px 10px",borderRadius:100,marginBottom:18}}>
                      {t.tag}
                    </div>
                    {/* Title */}
                    <h3 style={{fontSize:20,fontWeight:800,color:"#0f172a",margin:"0 0 8px",letterSpacing:-0.5}}>{t.title}</h3>
                    {/* Description */}
                    <p style={{fontSize:14,color:"#64748b",lineHeight:1.6,margin:"0 0 20px",fontWeight:500}}>{t.description}</p>
                    {/* Footer */}
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                      <span style={{fontSize:14,fontWeight:700,color:"#0f172a"}}>💰 {t.salary}</span>
                      <span style={{fontSize:12,color:"#94a3b8",fontWeight:500}}>{doneCount}/{t.lessons.length} lessons</span>
                    </div>
                    {/* Progress */}
                    <div style={{height:4,background:"#f1f5f9",borderRadius:2,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${t.color},${t.light})`,borderRadius:2,transition:"width .5s"}}/>
                    </div>
                    {/* Arrow */}
                    <div style={{position:"absolute",top:28,right:24,width:32,height:32,borderRadius:"50%",background:"#f8f7ff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#7c3aed",fontWeight:700}}>→</div>
                  </div>
                );
              })}
            </div>
          </main>
        )}

        {/* ── PROGRESS TAB ── */}
        {tab==="progress"&&(
          <main style={{maxWidth:700,margin:"0 auto",padding:"56px 32px"}}>
            <h2 style={{fontSize:32,fontWeight:900,letterSpacing:-1,marginBottom:32,color:"#0f172a"}}>Your Progress</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:32}}>
              {[["XP Earned",xp,"#7c3aed"],["Lessons",done.length,"#0891b2"],["Badges",achs.length,"#f59e0b"]].map(([label,val,col])=>(
                <div key={label} style={{background:"#fff",border:"1px solid #e8e8f0",borderRadius:16,padding:"24px",textAlign:"center"}}>
                  <div style={{fontSize:36,fontWeight:900,color:col,letterSpacing:-1}}>{val}</div>
                  <div style={{fontSize:13,color:"#94a3b8",marginTop:6,fontWeight:600}}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{background:"#fff",border:"1px solid #e8e8f0",borderRadius:20,padding:28}}>
              <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",letterSpacing:2,textTransform:"uppercase",marginBottom:24}}>Career Ladder</div>
              {LEVELS.map((l,i)=>{
                const reached=xp>=l.min;const isCurr=currLevel.name===l.name;
                return(
                  <div key={l.name} style={{display:"flex",alignItems:"center",gap:16,marginBottom:18,opacity:reached?1:0.3}}>
                    <div style={{width:44,height:44,borderRadius:14,background:isCurr?"#7c3aed":reached?"#f3f0ff":"#f8fafc",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:isCurr?"#fff":reached?"#7c3aed":"#94a3b8",flexShrink:0}}>
                      {l.name.slice(0,2).toUpperCase()}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:15,fontWeight:700,color:isCurr?"#7c3aed":"#0f172a"}}>{l.name}</div>
                      <div style={{fontSize:12,color:"#94a3b8"}}>{l.min} XP{i<LEVELS.length-1?` → ${LEVELS[i+1].min} XP`:""}</div>
                    </div>
                    {isCurr&&<div style={{fontSize:12,background:"#f3f0ff",color:"#7c3aed",padding:"4px 12px",borderRadius:100,fontWeight:700}}>You are here</div>}
                    {reached&&!isCurr&&<div style={{color:"#22c55e",fontWeight:800,fontSize:16}}>✓</div>}
                  </div>
                );
              })}
            </div>
          </main>
        )}

        {/* ── ACHIEVEMENTS TAB ── */}
        {tab==="achievements"&&(
          <main style={{maxWidth:700,margin:"0 auto",padding:"56px 32px"}}>
            <h2 style={{fontSize:32,fontWeight:900,letterSpacing:-1,marginBottom:32,color:"#0f172a"}}>Achievements</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              {ACHIEVEMENTS.map(a=>{
                const earned=achs.includes(a.id);
                return(
                  <div key={a.id} style={{background:earned?"#fff":"#fafafa",border:`1px solid ${earned?"#ddd6fe":"#e8e8f0"}`,borderRadius:16,padding:"20px",display:"flex",gap:14,alignItems:"center",opacity:earned?1:0.4,transition:"all .2s"}}>
                    <span style={{fontSize:28,filter:earned?"none":"grayscale(1)"}}>{a.icon}</span>
                    <div>
                      <div style={{fontSize:14,fontWeight:800,color:earned?"#7c3aed":"#94a3b8"}}>{a.title}</div>
                      <div style={{fontSize:12,color:"#94a3b8",marginTop:3,lineHeight:1.4}}>{a.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        )}
        <Popups/>
        <style>{`@keyframes pop{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}*{box-sizing:border-box;}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:#e8e8f0;border-radius:3px;}`}</style>
      </div>
    );
  }

  // ── TRACK PAGE ─────────────────────────────
  if(screen==="track"&&track){
    return(
      <div style={{minHeight:"100vh",background:"#fafafa",fontFamily:"'Plus Jakarta Sans','DM Sans',sans-serif",color:"#0f172a"}}>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <header style={{background:"#fff",borderBottom:"1px solid #e8e8f0",position:"sticky",top:0,zIndex:50}}>
          <div style={{maxWidth:1100,margin:"0 auto",padding:"0 32px",height:64,display:"flex",alignItems:"center",gap:16}}>
            <button onClick={()=>setScreen("home")} style={{background:"transparent",border:"1px solid #e8e8f0",borderRadius:10,color:"#64748b",padding:"8px 16px",cursor:"pointer",fontSize:14,fontFamily:"inherit",fontWeight:600}}>← Back</button>
            <div style={{flex:1}}>
              <div style={{fontWeight:900,fontSize:18,color:"#0f172a",letterSpacing:-0.5}}>{track.title}</div>
              <div style={{fontSize:12,color:"#94a3b8",fontWeight:500}}>{track.lessons.filter(l=>done.includes(l.id)).length}/{track.lessons.length} lessons · {track.salary}</div>
            </div>
            <div style={{display:"inline-block",background:track.light,color:track.color,fontSize:12,fontWeight:700,padding:"6px 14px",borderRadius:100}}>{track.tag}</div>
          </div>
        </header>
        <div style={{maxWidth:720,margin:"0 auto",padding:"48px 32px"}}>
          <p style={{fontSize:16,color:"#64748b",marginBottom:36,fontWeight:500,lineHeight:1.6}}>{track.description}</p>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {track.lessons.map((lesson,idx)=>{
              const isDone=done.includes(lesson.id);
              const locked=idx>0&&!done.includes(track.lessons[idx-1].id);
              return(
                <div key={lesson.id} onClick={()=>{if(!locked){setActiveLesson(lesson);setView("theory");setAnswer("");setFeedback("");setChatMsgs([]);setChatOpen(false);setScreen("lesson");}}}
                  style={{background:"#fff",border:`1px solid ${isDone?`${track.color}30`:"#e8e8f0"}`,borderRadius:16,padding:"20px 24px",display:"flex",alignItems:"center",gap:16,cursor:locked?"default":"pointer",opacity:locked?.35:1,transition:"all .2s"}}
                  onMouseEnter={e=>{if(!locked){e.currentTarget.style.borderColor=`${track.color}50`;e.currentTarget.style.transform="translateX(4px)";}}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=isDone?`${track.color}30`:"#e8e8f0";e.currentTarget.style.transform="none";}}>
                  <div style={{width:44,height:44,borderRadius:12,background:isDone?track.light:locked?"#f1f5f9":"#f8f7ff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:isDone?20:15,fontWeight:800,color:isDone?track.color:locked?"#cbd5e1":"#7c3aed",flexShrink:0}}>
                    {locked?"🔒":isDone?"✓":idx+1}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:16,fontWeight:700,color:"#0f172a"}}>{lesson.title}</div>
                    <div style={{fontSize:13,color:"#94a3b8",marginTop:3,fontWeight:500}}>{lesson.level} · {lesson.xp} XP</div>
                  </div>
                  {isDone&&<div style={{fontSize:12,fontWeight:700,color:track.color,background:track.light,padding:"5px 14px",borderRadius:100}}>Completed</div>}
                  {!isDone&&!locked&&<div style={{color:"#7c3aed",fontWeight:700,fontSize:18}}>→</div>}
                </div>
              );
            })}
          </div>
        </div>
        <Popups/>
        <style>{`@keyframes pop{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}*{box-sizing:border-box;}`}</style>
      </div>
    );
  }

  // ── LESSON PAGE ─────────────────────────────
  if(screen==="lesson"&&activeLesson&&track){
    const lessonIdx=track.lessons.findIndex(l=>l.id===activeLesson.id);
    const nextLesson=track.lessons[lessonIdx+1];
    return(
      <div style={{minHeight:"100vh",background:"#fafafa",fontFamily:"'Plus Jakarta Sans','DM Sans',sans-serif",color:"#0f172a",display:"flex",flexDirection:"column"}}>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <header style={{background:"#fff",borderBottom:"1px solid #e8e8f0",position:"sticky",top:0,zIndex:50}}>
          <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px",height:60,display:"flex",alignItems:"center",gap:12}}>
            <button onClick={()=>setScreen("track")} style={{background:"transparent",border:"1px solid #e8e8f0",borderRadius:10,color:"#64748b",padding:"7px 14px",cursor:"pointer",fontSize:13,fontFamily:"inherit",fontWeight:600}}>← Back</button>
            <div style={{flex:1,textAlign:"center"}}>
              <div style={{fontSize:15,fontWeight:800,color:"#0f172a"}}>{activeLesson.title}</div>
              <div style={{fontSize:11,color:"#94a3b8",fontWeight:500}}>{activeLesson.level} · {activeLesson.xp} XP</div>
            </div>
            <div style={{display:"flex",gap:6}}>
              {["theory","practice"].map(v=>(
                <button key={v} onClick={()=>setView(v)} style={{padding:"7px 16px",borderRadius:10,border:`1.5px solid ${view===v?track.color:"#e8e8f0"}`,background:view===v?track.light:"transparent",color:view===v?track.color:"#64748b",cursor:"pointer",fontSize:12,fontFamily:"inherit",fontWeight:700,transition:"all .15s"}}>
                  {v==="theory"?"Theory":"Practice"}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div style={{flex:1,overflow:"auto",padding:"40px 24px",maxWidth:700,width:"100%",alignSelf:"center"}}>
          {view==="theory"&&(
            <div>
              <div style={{background:"#fff",border:"1px solid #e8e8f0",borderRadius:20,padding:"32px",fontSize:15,lineHeight:1.85,borderLeft:`4px solid ${track.color}`}}>
                {renderText(activeLesson.theory)}
              </div>
              <button onClick={()=>setView("practice")} style={{marginTop:20,width:"100%",padding:"15px",background:track.color,border:"none",borderRadius:14,color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"inherit",boxShadow:`0 8px 24px ${track.color}35`,letterSpacing:-0.3}}>
                Start Practice →
              </button>
            </div>
          )}
          {view==="practice"&&(
            <div>
              <div style={{background:"#fff",border:`1.5px solid ${track.color}30`,borderRadius:20,padding:"24px 28px",marginBottom:16,borderLeft:`4px solid ${track.color}`}}>
                <div style={{fontSize:11,color:track.color,fontWeight:800,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Your Task</div>
                <p style={{fontSize:15,color:"#1e293b",lineHeight:1.7,margin:0,fontWeight:500}}>{activeLesson.task}</p>
                <div style={{marginTop:16,padding:"12px 16px",background:"#f8fafc",borderRadius:12,fontSize:13,color:"#64748b",lineHeight:1.5}}>
                  💡 {activeLesson.hint}
                </div>
              </div>
              <textarea value={answer} onChange={e=>setAnswer(e.target.value)}
                placeholder="Write your answer here — don't overthink it, just start."
                style={{width:"100%",minHeight:160,background:"#fff",border:"1.5px solid #e8e8f0",borderRadius:16,padding:"16px",color:"#0f172a",fontSize:15,resize:"vertical",outline:"none",fontFamily:"inherit",lineHeight:1.65,transition:"border .2s"}}
                onFocus={e=>e.target.style.borderColor=`${track.color}70`}
                onBlur={e=>e.target.style.borderColor="#e8e8f0"}/>
              <div style={{display:"flex",gap:10,marginTop:12}}>
                <button onClick={submitAnswer} disabled={!answer.trim()||loading} style={{flex:1,padding:"14px",background:answer.trim()?track.color:"#f1f5f9",border:"none",borderRadius:14,color:answer.trim()?"#fff":"#94a3b8",fontWeight:800,fontSize:14,cursor:answer.trim()?"pointer":"default",fontFamily:"inherit",boxShadow:answer.trim()?`0 6px 20px ${track.color}35`:"none",transition:"all .2s"}}>
                  {loading?"Reviewing your answer...":"Get Feedback →"}
                </button>
                <button onClick={()=>{setChatOpen(true);setChatMsgs([]);}} style={{padding:"14px 18px",background:"#fff",border:"1.5px solid #e8e8f0",borderRadius:14,color:"#64748b",cursor:"pointer",fontSize:13,fontFamily:"inherit",fontWeight:700}}>Ask</button>
              </div>
            </div>
          )}
          {view==="feedback"&&(
            <div>
              {loading?(
                <div style={{display:"flex",gap:8,alignItems:"center",padding:"48px 0",color:track.color}}>
                  {[0,1,2].map(j=><div key={j} style={{width:10,height:10,borderRadius:"50%",background:track.color,animation:`pulse 1.2s ease-in-out ${j*.2}s infinite`}}/>)}
                  <span style={{fontSize:15,marginLeft:10,fontWeight:600}}>Your mentor is reviewing...</span>
                </div>
              ):(
                <>
                  <div style={{background:"#fff",border:"1px solid #e8e8f0",borderRadius:20,padding:"28px 32px",fontSize:15,borderLeft:`4px solid ${track.color}`}}>
                    {renderText(feedback)}
                  </div>
                  <div style={{display:"flex",gap:10,marginTop:16,flexWrap:"wrap"}}>
                    <button onClick={()=>{setView("practice");setAnswer("");setFeedback("");}} style={{padding:"12px 20px",background:"#fff",border:`1.5px solid ${track.color}40`,borderRadius:12,color:track.color,cursor:"pointer",fontSize:13,fontFamily:"inherit",fontWeight:700}}>Try Again</button>
                    {nextLesson&&<button onClick={()=>{setActiveLesson(nextLesson);setView("theory");setAnswer("");setFeedback("");setChatMsgs([]);}} style={{padding:"12px 24px",background:track.color,border:"none",borderRadius:12,color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"inherit",flex:1}}>Next Lesson →</button>}
                    {!nextLesson&&<button onClick={()=>setScreen("home")} style={{padding:"12px 24px",background:track.color,border:"none",borderRadius:12,color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"inherit",flex:1}}>Back to Tracks</button>}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {chatOpen&&(
          <div style={{position:"fixed",bottom:0,right:0,width:340,height:420,background:"#fff",border:"1px solid #e8e8f0",borderRadius:"20px 20px 0 0",display:"flex",flexDirection:"column",zIndex:100,boxShadow:"0 -8px 40px rgba(0,0,0,0.08)"}}>
            <div style={{padding:"14px 18px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:32,height:32,borderRadius:10,background:track.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🤖</div>
              <span style={{fontSize:14,fontWeight:700,color:"#0f172a"}}>Defy Mentor</span>
              <button onClick={()=>setChatOpen(false)} style={{marginLeft:"auto",background:"transparent",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:20,lineHeight:1}}>×</button>
            </div>
            <div style={{flex:1,overflow:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:10}}>
              {chatMsgs.length===0&&<div style={{color:"#94a3b8",fontSize:13,textAlign:"center",marginTop:24,fontWeight:500,lineHeight:1.5}}>Ask anything about this lesson. No judgment.</div>}
              {chatMsgs.map((m,i)=>(
                <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                  <div style={{maxWidth:"80%",padding:"10px 14px",borderRadius:14,background:m.role==="user"?track.light:"#f8fafc",border:m.role==="user"?`1px solid ${track.color}20`:"1px solid #f1f5f9",fontSize:13,lineHeight:1.6,color:"#0f172a",fontWeight:500}}>{m.content}</div>
                </div>
              ))}
              {chatLoading&&<div style={{display:"flex",gap:5,padding:"4px 0"}}>{[0,1,2].map(j=><div key={j} style={{width:7,height:7,borderRadius:"50%",background:track.color,animation:`pulse 1.2s ease-in-out ${j*.2}s infinite`}}/>)}</div>}
              <div ref={chatRef}/>
            </div>
            <div style={{padding:"10px 14px",borderTop:"1px solid #f1f5f9",display:"flex",gap:8}}>
              <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Ask a question..." style={{flex:1,background:"transparent",border:"none",color:"#0f172a",fontSize:14,outline:"none",fontFamily:"inherit",fontWeight:500}}/>
              <button onClick={sendChat} disabled={!chatInput.trim()||chatLoading} style={{padding:"8px 16px",background:chatInput.trim()?track.color:"#f1f5f9",border:"none",borderRadius:10,color:chatInput.trim()?"#fff":"#94a3b8",cursor:chatInput.trim()?"pointer":"default",fontSize:13,fontFamily:"inherit",fontWeight:700,transition:"all .15s"}}>Send</button>
            </div>
          </div>
        )}
        <Popups/>
        <style>{`@keyframes pop{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}@keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}*{box-sizing:border-box;}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:#e8e8f0;border-radius:3px;}`}</style>
      </div>
    );
  }
  return null;
}
