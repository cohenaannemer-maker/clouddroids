const APPS = [
  { id:'whatsapp',  name:'WhatsApp',   icon:'💬', pkg:'com.whatsapp',              color:'#25D366', cat:'Social'        },
  { id:'instagram', name:'Instagram',  icon:'📸', pkg:'com.instagram.android',     color:'#E1306C', cat:'Social'        },
  { id:'tiktok',    name:'TikTok',     icon:'🎵', pkg:'com.zhiliaoapp.musically',  color:'#010101', cat:'Entertainment' },
  { id:'youtube',   name:'YouTube',    icon:'▶️', pkg:'com.google.android.youtube',color:'#FF0000', cat:'Entertainment' },
  { id:'telegram',  name:'Telegram',   icon:'✈️', pkg:'org.telegram.messenger',    color:'#2CA5E0', cat:'Social'        },
  { id:'chrome',    name:'Chrome',     icon:'🌐', pkg:'com.android.chrome',        color:'#4285F4', cat:'Utility'       },
  { id:'netflix',   name:'Netflix',    icon:'🎬', pkg:'com.netflix.mediaclient',   color:'#E50914', cat:'Entertainment' },
  { id:'spotify',   name:'Spotify',    icon:'🎧', pkg:'com.spotify.music',         color:'#1DB954', cat:'Music'         },
  { id:'discord',   name:'Discord',    icon:'🎮', pkg:'com.discord',               color:'#5865F2', cat:'Social'        },
  { id:'gmail',     name:'Gmail',      icon:'📧', pkg:'com.google.android.gm',     color:'#EA4335', cat:'Utility'       },
  { id:'maps',      name:'Maps',       icon:'🗺️', pkg:'com.google.android.apps.maps',color:'#34A853',cat:'Utility'      },
  { id:'twitter',   name:'X / Twitter',icon:'🐦', pkg:'com.twitter.android',       color:'#1DA1F2', cat:'Social'        },
];

const installed = new Set(['chrome','gmail']);

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET')
    return res.json({ ok:true, apps: APPS.map(a=>({...a, installed:installed.has(a.id)})) });

  if (req.method === 'POST') {
    const { action, id } = req.body || {};
    const app = APPS.find(a=>a.id===id);
    if (!app) return res.status(404).json({ ok:false, error:'Not found' });
    if (action==='install')   installed.add(id);
    if (action==='uninstall') installed.delete(id);
    return res.json({ ok:true, app:{...app, installed:installed.has(id)}, message: action==='install'?`${app.name} installed`:`${app.name} removed` });
  }
  res.status(405).end();
}
