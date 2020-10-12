class VoyoPWAPromptComponent{
  classPrefix="voyo-sw-packing-prompt";
  well(name){
    if(name.startsWith("@")){
      return "@keyframes "+this.classPrefix+"-"+name.slice(1);
    }else{
      return "."+this.classPrefix+'-'+name
    }
  };
  will(name){
    return this.classPrefix+'-'+name;
  }

  promptClass={
    "wrapper":`
    background:rgb(240,240,240);
    position:fixed;
    bottom:10px;
    right:10px;
    z-index:999;
    width:300px;
    height:150px;
    box-shadow:0 0 12px -3px rgba(100,100,100,.2);
    border-radius:2px;
  `,
    "article":`
      padding:20px;
      font-weight:bold;
  `,
    "@entry":`
  from {transform:translate3d(20%,0,0) scale(.5);opacity:.2}
  to {}
  `,
    "@leave":`
  from {}
  to {transform:translate3d(0,50%,0);opacity:0}
  `,
    "an-entry":`
  animation: ${this.will('entry')} .3s ease-out;
  `,
    "an-leave":`
  animation: ${this.will('leave')} .2s ease-in;
  `,
    "footer":`
      display:flex;
      padding:20px;
      `,
    "btn":`
    box-sizing:border-box;
    border:none;
    outline:none;
    background:white;
    border-radius:2px;
    font-size:16px;
    padding:10px 15px;
    flex:1;
      `,
    "close":`
    position:absolute;
    right:10px;
    top:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    height:30px;
    width:30px;
    color:rgb(150,150,150);
    font-size:18px;
    border-radius:50%;
      `
  }
  render=`
  <main class="${this.will('container')}">
    <span class="${this.will('close')}">x</span>
    <article class="${this.will('article')}">
      您可以将本网站添加为本地应用
    </article>
    <footer class="${this.will('footer')}">
      <button class='${this.will('btn')} ${this.will('confirm')}'>确定</button>
    </footer>
  </main>
  `;
  wrapperDom=null;
  entryRunning=false;
  leaveRunning=false;
  isShow=false;
  injectStyle(){
    const styleDom=document.createElement("style");
    styleDom.innerText=Object.keys(this.promptClass).map((key)=>{
      return `${this.well(key)}{${this.promptClass[key].replace(/\n|\r\n/g,"")}}`
    }).join("");
    document.body.appendChild(styleDom);
  }

  constructor() {
    this.injectStyle();
  }
  show(deferredPrompt,clickCb){
    if(this.isShow)return;
    if(!this.containerDom){
      this.wrapperDom&&this.wrapperDom.parentNode&&this.wrapperDom.parentNode.removeChild(this.wrapperDom);
      this.wrapperDom=document.createElement("div");
      this.wrapperDom.className=`${this.will('wrapper')} ${this.will("an-entry")}`;
      this.wrapperDom.innerHTML=this.render;
      this.entryRunning=true;
      this.wrapperDom.addEventListener("animationend",e=>{
        if(e.currentTarget!==e.target)return;
        this.clearEntryState();
        this.handleLeaveState();
      })
      document.body.appendChild(this.wrapperDom);
      const confirmBtn=this.wrapperDom.querySelector(this.well("confirm"));
      const closeBtn=this.wrapperDom.querySelector(this.well("close"));
      confirmBtn.onclick=()=>{
        if(deferredPrompt){
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult)=>{
            clickCb(choiceResult.outcome==="accepted");
          }).finally(()=>{
            this.hide();
          })
        }
      };
      closeBtn.onclick=()=>{
        console.log(123)
        this.hide();
      }
      this.isShow=true;
    }
  }
  clearEntryState(){
    if(this.entryRunning){
      this.entryRunning=false;
      this.wrapperDom&&this.wrapperDom.classList.remove(this.will("an-entry"));
    }
  }
  handleLeaveState(){
    if(this.leaveRunning){
      this.leaveRunning=false;
      this.wrapperDom&&this.wrapperDom.parentNode&&this.wrapperDom.parentNode.removeChild(this.wrapperDom);
      this.wrapperDom=null;
    }
  }

  hide(){
    if(!this.isShow)return;
    this.isShow=false;
    this.clearEntryState();
    this.leaveRunning=true;
    this.wrapperDom&&this.wrapperDom.classList.add(this.will("an-leave"));
  }

}