(function(){
%{useDebugger?`const log=(...args)=>{
  console.log("%c[${pluginName}]","background:#ff976a;color:white;border-radius:8px;padding:2px",...args);
}`:""}%
if("serviceWorker" in navigator){
  const baseDom=document.querySelector("base[href]");
  const scopePath=baseDom?baseDom.getAttribute("href"):"/";
  navigator.serviceWorker.register("%{swFilePath}%",{
    scope:scopePath
  }).then(reg=>{
    %{updateInterval?`
    setInterval(()=>{reg.update();},${updateInterval})
    `:''}%
    %{useDebugger?`log('sw register completed')`:''}%
  }).catch(err=>{
    console.error(err);
  })
}else{
  %{useDebugger?`log('serviceWorker not exists');`:''}%
}})()