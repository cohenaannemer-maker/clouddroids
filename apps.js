export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET')
    return res.json({
      ok:true, provider:'TeraBox', total:1024, used:2.3, available:1021.7, percent:0.22,
      last_sync: new Date(Date.now()-3*60000).toISOString(),
      folders:[
        {name:'App Backups', size:'1.1 GB', files:12, icon:'📁'},
        {name:'APK Files',   size:'847 MB', files:8,  icon:'📁'},
        {name:'App Data',    size:'234 MB', files:34, icon:'📁'},
        {name:'Screenshots', size:'128 MB', files:210,icon:'📁'},
      ],
    });

  if (req.method === 'POST') {
    const { action } = req.body || {};
    if (action==='sync')
      return res.json({ ok:true, message:'Sync complete', synced_at:new Date().toISOString(), files_synced:Math.floor(Math.random()*12)+3 });
  }
  res.status(405).end();
}
