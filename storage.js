let android = { running:true, version:'Android 13 (Waydroid)', uptime:'2h 14m', brightness:80, volume:60 };

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') return res.json({ ok:true, android });

  if (req.method === 'POST') {
    const { action, value } = req.body || {};
    if (action==='start')      android.running = true;
    if (action==='stop')       android.running = false;
    if (action==='restart')  { android.running = true; android.uptime = '0m'; }
    if (action==='brightness') android.brightness = Math.max(0,Math.min(100,parseInt(value)||80));
    if (action==='volume')     android.volume     = Math.max(0,Math.min(100,parseInt(value)||60));
    return res.json({ ok:true, android, message:`${action} executed` });
  }
  res.status(405).end();
}
