import{c as ue,r as z,j as c,a as be,u as ge}from"./index-7FPpT3cv.js";import{L as fe}from"./Loading-Caz0TThF.js";const X="-",me=e=>{const r=xe(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:o}=e;return{getClassGroupId:a=>{const s=a.split(X);return s[0]===""&&s.length!==1&&s.shift(),ne(s,r)||he(a)},getConflictingClassGroupIds:(a,s)=>{const b=t[a]||[];return s&&o[a]?[...b,...o[a]]:b}}},ne=(e,r)=>{var a;if(e.length===0)return r.classGroupId;const t=e[0],o=r.nextPart.get(t),i=o?ne(e.slice(1),o):void 0;if(i)return i;if(r.validators.length===0)return;const n=e.join(X);return(a=r.validators.find(({validator:s})=>s(n)))==null?void 0:a.classGroupId},te=/^\[(.+)\]$/,he=e=>{if(te.test(e)){const r=te.exec(e)[1],t=r==null?void 0:r.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}},xe=e=>{const{theme:r,prefix:t}=e,o={nextPart:new Map,validators:[]};return we(Object.entries(e.classGroups),t).forEach(([n,a])=>{q(a,o,n,r)}),o},q=(e,r,t,o)=>{e.forEach(i=>{if(typeof i=="string"){const n=i===""?r:oe(r,i);n.classGroupId=t;return}if(typeof i=="function"){if(ye(i)){q(i(o),r,t,o);return}r.validators.push({validator:i,classGroupId:t});return}Object.entries(i).forEach(([n,a])=>{q(a,oe(r,n),t,o)})})},oe=(e,r)=>{let t=e;return r.split(X).forEach(o=>{t.nextPart.has(o)||t.nextPart.set(o,{nextPart:new Map,validators:[]}),t=t.nextPart.get(o)}),t},ye=e=>e.isThemeGetter,we=(e,r)=>r?e.map(([t,o])=>{const i=o.map(n=>typeof n=="string"?r+n:typeof n=="object"?Object.fromEntries(Object.entries(n).map(([a,s])=>[r+a,s])):n);return[t,i]}):e,ve=e=>{if(e<1)return{get:()=>{},set:()=>{}};let r=0,t=new Map,o=new Map;const i=(n,a)=>{t.set(n,a),r++,r>e&&(r=0,o=t,t=new Map)};return{get(n){let a=t.get(n);if(a!==void 0)return a;if((a=o.get(n))!==void 0)return i(n,a),a},set(n,a){t.has(n)?t.set(n,a):i(n,a)}}},se="!",ke=e=>{const{separator:r,experimentalParseClassName:t}=e,o=r.length===1,i=r[0],n=r.length,a=s=>{const b=[];let f=0,h=0,y;for(let u=0;u<s.length;u++){let m=s[u];if(f===0){if(m===i&&(o||s.slice(u,u+n)===r)){b.push(s.slice(h,u)),h=u+n;continue}if(m==="/"){y=u;continue}}m==="["?f++:m==="]"&&f--}const w=b.length===0?s:s.substring(h),k=w.startsWith(se),v=k?w.substring(1):w,g=y&&y>h?y-h:void 0;return{modifiers:b,hasImportantModifier:k,baseClassName:v,maybePostfixModifierPosition:g}};return t?s=>t({className:s,parseClassName:a}):a},Ce=e=>{if(e.length<=1)return e;const r=[];let t=[];return e.forEach(o=>{o[0]==="["?(r.push(...t.sort(),o),t=[]):t.push(o)}),r.push(...t.sort()),r},je=e=>({cache:ve(e.cacheSize),parseClassName:ke(e),...me(e)}),ze=/\s+/,Re=(e,r)=>{const{parseClassName:t,getClassGroupId:o,getConflictingClassGroupIds:i}=r,n=[],a=e.trim().split(ze);let s="";for(let b=a.length-1;b>=0;b-=1){const f=a[b],{modifiers:h,hasImportantModifier:y,baseClassName:w,maybePostfixModifierPosition:k}=t(f);let v=!!k,g=o(v?w.substring(0,k):w);if(!g){if(!v){s=f+(s.length>0?" "+s:s);continue}if(g=o(w),!g){s=f+(s.length>0?" "+s:s);continue}v=!1}const u=Ce(h).join(":"),m=y?u+se:u,x=m+g;if(n.includes(x))continue;n.push(x);const P=i(g,v);for(let T=0;T<P.length;++T){const _=P[T];n.push(m+_)}s=f+(s.length>0?" "+s:s)}return s};function Se(){let e=0,r,t,o="";for(;e<arguments.length;)(r=arguments[e++])&&(t=le(r))&&(o&&(o+=" "),o+=t);return o}const le=e=>{if(typeof e=="string")return e;let r,t="";for(let o=0;o<e.length;o++)e[o]&&(r=le(e[o]))&&(t&&(t+=" "),t+=r);return t};function Ne(e,...r){let t,o,i,n=a;function a(b){const f=r.reduce((h,y)=>y(h),e());return t=je(f),o=t.cache.get,i=t.cache.set,n=s,s(b)}function s(b){const f=o(b);if(f)return f;const h=Re(b,t);return i(b,h),h}return function(){return n(Se.apply(null,arguments))}}const d=e=>{const r=t=>t[e]||[];return r.isThemeGetter=!0,r},ae=/^\[(?:([a-z-]+):)?(.+)\]$/i,Te=/^\d+\/\d+$/,Ae=new Set(["px","full","screen"]),Me=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Ge=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Ie=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,Pe=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Ee=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,j=e=>G(e)||Ae.has(e)||Te.test(e),R=e=>I(e,"length",$e),G=e=>!!e&&!Number.isNaN(Number(e)),H=e=>I(e,"number",G),L=e=>!!e&&Number.isInteger(Number(e)),Le=e=>e.endsWith("%")&&G(e.slice(0,-1)),l=e=>ae.test(e),S=e=>Me.test(e),We=new Set(["length","size","percentage"]),_e=e=>I(e,We,ie),Ve=e=>I(e,"position",ie),Be=new Set(["image","url"]),Fe=e=>I(e,Be,He),Oe=e=>I(e,"",Ue),W=()=>!0,I=(e,r,t)=>{const o=ae.exec(e);return o?o[1]?typeof r=="string"?o[1]===r:r.has(o[1]):t(o[2]):!1},$e=e=>Ge.test(e)&&!Ie.test(e),ie=()=>!1,Ue=e=>Pe.test(e),He=e=>Ee.test(e),qe=()=>{const e=d("colors"),r=d("spacing"),t=d("blur"),o=d("brightness"),i=d("borderColor"),n=d("borderRadius"),a=d("borderSpacing"),s=d("borderWidth"),b=d("contrast"),f=d("grayscale"),h=d("hueRotate"),y=d("invert"),w=d("gap"),k=d("gradientColorStops"),v=d("gradientColorStopPositions"),g=d("inset"),u=d("margin"),m=d("opacity"),x=d("padding"),P=d("saturate"),T=d("scale"),_=d("sepia"),Z=d("skew"),K=d("space"),Q=d("translate"),F=()=>["auto","contain","none"],O=()=>["auto","hidden","clip","visible","scroll"],$=()=>["auto",l,r],p=()=>[l,r],Y=()=>["",j,R],V=()=>["auto",G,l],D=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],B=()=>["solid","dashed","dotted","double","none"],ee=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],U=()=>["start","end","center","between","around","evenly","stretch"],E=()=>["","0",l],re=()=>["auto","avoid","all","avoid-page","page","left","right","column"],C=()=>[G,l];return{cacheSize:500,separator:":",theme:{colors:[W],spacing:[j,R],blur:["none","",S,l],brightness:C(),borderColor:[e],borderRadius:["none","","full",S,l],borderSpacing:p(),borderWidth:Y(),contrast:C(),grayscale:E(),hueRotate:C(),invert:E(),gap:p(),gradientColorStops:[e],gradientColorStopPositions:[Le,R],inset:$(),margin:$(),opacity:C(),padding:p(),saturate:C(),scale:C(),sepia:E(),skew:C(),space:p(),translate:p()},classGroups:{aspect:[{aspect:["auto","square","video",l]}],container:["container"],columns:[{columns:[S]}],"break-after":[{"break-after":re()}],"break-before":[{"break-before":re()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...D(),l]}],overflow:[{overflow:O()}],"overflow-x":[{"overflow-x":O()}],"overflow-y":[{"overflow-y":O()}],overscroll:[{overscroll:F()}],"overscroll-x":[{"overscroll-x":F()}],"overscroll-y":[{"overscroll-y":F()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[g]}],"inset-x":[{"inset-x":[g]}],"inset-y":[{"inset-y":[g]}],start:[{start:[g]}],end:[{end:[g]}],top:[{top:[g]}],right:[{right:[g]}],bottom:[{bottom:[g]}],left:[{left:[g]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",L,l]}],basis:[{basis:$()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",l]}],grow:[{grow:E()}],shrink:[{shrink:E()}],order:[{order:["first","last","none",L,l]}],"grid-cols":[{"grid-cols":[W]}],"col-start-end":[{col:["auto",{span:["full",L,l]},l]}],"col-start":[{"col-start":V()}],"col-end":[{"col-end":V()}],"grid-rows":[{"grid-rows":[W]}],"row-start-end":[{row:["auto",{span:[L,l]},l]}],"row-start":[{"row-start":V()}],"row-end":[{"row-end":V()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",l]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",l]}],gap:[{gap:[w]}],"gap-x":[{"gap-x":[w]}],"gap-y":[{"gap-y":[w]}],"justify-content":[{justify:["normal",...U()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...U(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...U(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[x]}],px:[{px:[x]}],py:[{py:[x]}],ps:[{ps:[x]}],pe:[{pe:[x]}],pt:[{pt:[x]}],pr:[{pr:[x]}],pb:[{pb:[x]}],pl:[{pl:[x]}],m:[{m:[u]}],mx:[{mx:[u]}],my:[{my:[u]}],ms:[{ms:[u]}],me:[{me:[u]}],mt:[{mt:[u]}],mr:[{mr:[u]}],mb:[{mb:[u]}],ml:[{ml:[u]}],"space-x":[{"space-x":[K]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[K]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",l,r]}],"min-w":[{"min-w":[l,r,"min","max","fit"]}],"max-w":[{"max-w":[l,r,"none","full","min","max","fit","prose",{screen:[S]},S]}],h:[{h:[l,r,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[l,r,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[l,r,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[l,r,"auto","min","max","fit"]}],"font-size":[{text:["base",S,R]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",H]}],"font-family":[{font:[W]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",l]}],"line-clamp":[{"line-clamp":["none",G,H]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",j,l]}],"list-image":[{"list-image":["none",l]}],"list-style-type":[{list:["none","disc","decimal",l]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[m]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[m]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...B(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",j,R]}],"underline-offset":[{"underline-offset":["auto",j,l]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:p()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",l]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",l]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[m]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...D(),Ve]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",_e]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},Fe]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[v]}],"gradient-via-pos":[{via:[v]}],"gradient-to-pos":[{to:[v]}],"gradient-from":[{from:[k]}],"gradient-via":[{via:[k]}],"gradient-to":[{to:[k]}],rounded:[{rounded:[n]}],"rounded-s":[{"rounded-s":[n]}],"rounded-e":[{"rounded-e":[n]}],"rounded-t":[{"rounded-t":[n]}],"rounded-r":[{"rounded-r":[n]}],"rounded-b":[{"rounded-b":[n]}],"rounded-l":[{"rounded-l":[n]}],"rounded-ss":[{"rounded-ss":[n]}],"rounded-se":[{"rounded-se":[n]}],"rounded-ee":[{"rounded-ee":[n]}],"rounded-es":[{"rounded-es":[n]}],"rounded-tl":[{"rounded-tl":[n]}],"rounded-tr":[{"rounded-tr":[n]}],"rounded-br":[{"rounded-br":[n]}],"rounded-bl":[{"rounded-bl":[n]}],"border-w":[{border:[s]}],"border-w-x":[{"border-x":[s]}],"border-w-y":[{"border-y":[s]}],"border-w-s":[{"border-s":[s]}],"border-w-e":[{"border-e":[s]}],"border-w-t":[{"border-t":[s]}],"border-w-r":[{"border-r":[s]}],"border-w-b":[{"border-b":[s]}],"border-w-l":[{"border-l":[s]}],"border-opacity":[{"border-opacity":[m]}],"border-style":[{border:[...B(),"hidden"]}],"divide-x":[{"divide-x":[s]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[s]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[m]}],"divide-style":[{divide:B()}],"border-color":[{border:[i]}],"border-color-x":[{"border-x":[i]}],"border-color-y":[{"border-y":[i]}],"border-color-s":[{"border-s":[i]}],"border-color-e":[{"border-e":[i]}],"border-color-t":[{"border-t":[i]}],"border-color-r":[{"border-r":[i]}],"border-color-b":[{"border-b":[i]}],"border-color-l":[{"border-l":[i]}],"divide-color":[{divide:[i]}],"outline-style":[{outline:["",...B()]}],"outline-offset":[{"outline-offset":[j,l]}],"outline-w":[{outline:[j,R]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:Y()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[m]}],"ring-offset-w":[{"ring-offset":[j,R]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",S,Oe]}],"shadow-color":[{shadow:[W]}],opacity:[{opacity:[m]}],"mix-blend":[{"mix-blend":[...ee(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":ee()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[o]}],contrast:[{contrast:[b]}],"drop-shadow":[{"drop-shadow":["","none",S,l]}],grayscale:[{grayscale:[f]}],"hue-rotate":[{"hue-rotate":[h]}],invert:[{invert:[y]}],saturate:[{saturate:[P]}],sepia:[{sepia:[_]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[b]}],"backdrop-grayscale":[{"backdrop-grayscale":[f]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[h]}],"backdrop-invert":[{"backdrop-invert":[y]}],"backdrop-opacity":[{"backdrop-opacity":[m]}],"backdrop-saturate":[{"backdrop-saturate":[P]}],"backdrop-sepia":[{"backdrop-sepia":[_]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[a]}],"border-spacing-x":[{"border-spacing-x":[a]}],"border-spacing-y":[{"border-spacing-y":[a]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",l]}],duration:[{duration:C()}],ease:[{ease:["linear","in","out","in-out",l]}],delay:[{delay:C()}],animate:[{animate:["none","spin","ping","pulse","bounce",l]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[T]}],"scale-x":[{"scale-x":[T]}],"scale-y":[{"scale-y":[T]}],rotate:[{rotate:[L,l]}],"translate-x":[{"translate-x":[Q]}],"translate-y":[{"translate-y":[Q]}],"skew-x":[{"skew-x":[Z]}],"skew-y":[{"skew-y":[Z]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",l]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",l]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":p()}],"scroll-mx":[{"scroll-mx":p()}],"scroll-my":[{"scroll-my":p()}],"scroll-ms":[{"scroll-ms":p()}],"scroll-me":[{"scroll-me":p()}],"scroll-mt":[{"scroll-mt":p()}],"scroll-mr":[{"scroll-mr":p()}],"scroll-mb":[{"scroll-mb":p()}],"scroll-ml":[{"scroll-ml":p()}],"scroll-p":[{"scroll-p":p()}],"scroll-px":[{"scroll-px":p()}],"scroll-py":[{"scroll-py":p()}],"scroll-ps":[{"scroll-ps":p()}],"scroll-pe":[{"scroll-pe":p()}],"scroll-pt":[{"scroll-pt":p()}],"scroll-pr":[{"scroll-pr":p()}],"scroll-pb":[{"scroll-pb":p()}],"scroll-pl":[{"scroll-pl":p()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",l]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[j,R,H]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},Je=Ne(qe);function N(...e){return Je(ue(e))}const ce=z.forwardRef(({className:e,...r},t)=>c.jsx("div",{className:"relative w-full overflow-auto",children:c.jsx("table",{ref:t,className:N("w-full caption-bottom text-sm",e),...r})}));ce.displayName="Table";const de=z.forwardRef(({className:e,...r},t)=>c.jsx("thead",{ref:t,className:N("[&_tr]:border-b",e),...r}));de.displayName="TableHeader";const pe=z.forwardRef(({className:e,...r},t)=>c.jsx("tbody",{ref:t,className:N("[&_tr:last-child]:border-0",e),...r}));pe.displayName="TableBody";const Xe=z.forwardRef(({className:e,...r},t)=>c.jsx("tfoot",{ref:t,className:N("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",e),...r}));Xe.displayName="TableFooter";const J=z.forwardRef(({className:e,...r},t)=>c.jsx("tr",{ref:t,className:N("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",e),...r}));J.displayName="TableRow";const A=z.forwardRef(({className:e,...r},t)=>c.jsx("th",{ref:t,className:N("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",e),...r}));A.displayName="TableHead";const M=z.forwardRef(({className:e,...r},t)=>c.jsx("td",{ref:t,className:N("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",e),...r}));M.displayName="TableCell";const Ze=z.forwardRef(({className:e,...r},t)=>c.jsx("caption",{ref:t,className:N("mt-4 text-sm text-muted-foreground",e),...r}));Ze.displayName="TableCaption";const er=be("/history")({component:Qe,errorComponent:()=>c.jsx("div",{children:"Error!"})});function Ke(){return ge(r=>r.points)}function Qe(){const e=Ke();return c.jsx("div",{className:"container mx-auto py-10",children:c.jsx(z.Suspense,{fallback:c.jsx(fe,{}),children:c.jsxs(ce,{children:[c.jsx(de,{children:c.jsxs(J,{children:[c.jsx(A,{children:"x"}),c.jsx(A,{children:"y"}),c.jsx(A,{children:"r"}),c.jsx(A,{children:"hit"}),c.jsx(A,{children:"serverTime"}),c.jsx(A,{children:"durationInMilliseconds"})]})}),c.jsx(pe,{children:e.map((r,t)=>c.jsxs(J,{children:[c.jsx(M,{children:r.x}),c.jsx(M,{children:r.y}),c.jsx(M,{children:r.r}),c.jsx(M,{children:new String(r.hit)}),c.jsx(M,{children:r.serverTime}),c.jsx(M,{children:r.durationInMilliseconds})]},t))})]})})})}export{er as Route};
