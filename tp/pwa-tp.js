(function(){
  let dismissed=false;
window.addEventListener("beforeinstallprompt",e=>{
  if(dismissed)return;
  const scriptDom=document.createElement("script");
  scriptDom.onload=()=>{
    const p=new VoyoPWAPromptComponent();
    p.show(e,(pass)=>{
      dismissed=!pass;
    });
  };
  scriptDom.src="%{pwaPromptPath}%";
  document.body.appendChild(scriptDom);
})
})()