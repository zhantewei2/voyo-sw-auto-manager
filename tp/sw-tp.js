const version="%{version}%";
const cacheBrand="%{cacheBrand}%";
const scopeRule=%{scopeRule||null}%;
const dynamicCacheRules=%{dynamicCacheRules}%;

const log=(...args)=> {
  %{useDebugger?'console.log("%c [voyo sw]", "background:#ff976a;color:white;border-radius:8px;padding:2px", ...args)':''}%
}
const cacheName=cacheBrand+"-v"+version;

self.addEventListener("install",event=>{
  event.waitUntil(
    fetch("%{cachePagesFilePath}%")
      .then(res=>res.json())
      .then(({version:fileVersion,fileList})=>{
        if(fileVersion!==version){
          log("warn",`fileVersion(${fileVersion}) not equiv version(${version})`)
        }
        caches.open(cacheName).then(cache=>{
          cache.addAll(Object.keys(fileList))
        })
      })
  )
})
self.addEventListener("activate",event=>{
  caches.keys().then(keys=>{
    keys.forEach(key=>{
      if(key.startsWith(cacheBrand)){
        if(key!==cacheName){
          caches.delete(key);
          log("delete cache",key);
        }
      }
    })
  })
})

const matchRule=(url,rule)=>{
  if(typeof rule ==="string"){
    return url===rule;
  }else if(rule instanceof RegExp){
    return rule.test(url);
  }else{
    return false;
  }
};
const matchRules=(url,rules)=>{
  if(rules instanceof Array){
    for(let rule of rules){
      if(matchRule(url,rule))return true;
    }
  }else{
    return matchRule(url,rules);
  }
  return false;
}
self.addEventListener("fetch",event=>{
  const req=event.request;
  const url=req.url;
  if(scopeRule&&!scopeRule.test(url))return;
  event.respondWith(
    caches.match(req).then(response=>{
      if(response!==undefined)return response;
      return fetch(req).then(res=>{
        if(dynamicCacheRules&&matchRules(url,dynamicCacheRules)){
          log("match dynamicCacheRules:",url);
          const resClone=res.clone();
          caches.open(cacheName).then(cache=>{
            cache.put(req,resClone);
          });
        }
        return res;
      })
    })
  )
})