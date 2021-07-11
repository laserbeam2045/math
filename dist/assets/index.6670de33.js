import{d as e,r as l,c as a,w as t,o as n,C as s,A as u,L as r,B as o,P as i,a as d,b as p,D as c,e as v,f as m,g as h,R as f,S as y,h as b,i as g,j as D,k as A,T as M,l as V,p as k,m as B,n as C,q as x,s as q,t as I,u as S,v as $,x as R,y as _,z as w,E,F,G as O,H as j,I as H,J as L,K as N,M as T,N as z,O as K,Q as P}from"./vendor.7ce2c5a8.js";var W=e({model:{prop:"modelValue",event:"update:modelValue"},props:{modelValue:{type:[String,Number],required:!0},error:{type:Boolean,required:!1,default:!1},type:{type:String,required:!1,default:"text"},placeholder:{type:String,required:!1,default:""},spellcheck:{type:Boolean,required:!1,default:!1},autocomplete:{type:String,required:!1,default:"on"}},emits:["update:modelValue"],setup(e,{emit:a}){const t=l(null);return{inputRef:t,handleInput:e=>{const l=e.target;a("update:modelValue",l.value)},focus:()=>t.value.focus()}}});const G=t()(((e,l,t,s,u,r)=>(n(),a("input",{ref:"inputRef",class:["app-input-text",{error:e.error}],type:e.type,value:e.modelValue,spellcheck:e.spellcheck,placeholder:e.placeholder,autocomplete:e.autocomplete,onInput:l[1]||(l[1]=(...l)=>e.handleInput&&e.handleInput(...l))},null,42,["type","value","spellcheck","placeholder","autocomplete"]))));W.render=G,W.__scopeId="data-v-cd001e12",s.register(u,r,o,i,d,p,c,v,m,h,f,y,b,g,D,A,M,V,k,B,C,x,q);var J=e({components:{BarChart:I.BarChart},props:{labels:{type:Array,required:!0},srcData:{type:Array,required:!0}},setup(e){const a=l(),t=l({responsive:!0,plugins:{legend:{position:"none"},title:{display:!1,text:"はうチャート"}}});return{testData:S((()=>({labels:e.labels,datasets:[{data:e.srcData,backgroundColor:["#77CEFF","#0079AF","#123E6B","#97B0C4","#A5C8ED"]}]}))),BarRef:a,myOptions:t}}});J.render=function(e,l,t,s,u,r){const o=R("BarChart");return n(),a("div",null,[$(o,{ref:"BarRef",data:e.testData,options:e.myOptions},null,8,["data","options"])])};var Q=e({setup(e,{attrs:l}){var a;return{listeners:null!=(a=l.listeners)?a:{}}}});const U=t();F("data-v-52d800f6");const X={class:"container"},Y=j("Submit");O();const Z=U(((e,l,t,s,u,r)=>(n(),a("button",w({class:"app-button"},E(e.listeners)),[$("div",X,[_(e.$slots,"default",{},(()=>[Y]),{})])],16))));Q.render=Z,Q.__scopeId="data-v-52d800f6";const ee="ontouchend"in document,le=ee?"touchstart":"mousedown";var ae=e({name:"App",components:{Chart:J,AppInputText:W,AppButton:Q},setup(){const e=H({input:"",numbers:[],normStandardDeviation:10,normAverage:50}),a=(e,l=2)=>null===e?null:Math.round(e*Math.pow(10,l))/Math.pow(10,l),t=S((()=>e.numbers.concat().sort(((e,l)=>e-l)))),n=S((()=>e.numbers.length)),s=S((()=>[...Array(n.value).keys()].map((e=>String.fromCharCode(65+e%26))))),u=S((()=>n.value?e.numbers.reduce(((e,l)=>e+l)):0)),r=S((()=>n.value?p.value.reduce(((e,l)=>e+l),0):0)),o=S((()=>n.value?u.value/n.value:null)),i=S((()=>{if(0===n.value)return null;const e=Math.floor(n.value/2),l=t.value;return n.value%2?l[e]:(l[e-1]+l[e])/2})),d=S((()=>{if(0===n.value)return null;const e=t.value.reduce(((e,l)=>{const a=e.find((e=>e.value===l));return a?a.count++:e.push({value:l,count:1}),e}),[]);e.sort(((e,l)=>l.count-e.count));const l=e[0].count,a=e.filter((e=>e.count===l)).map((e=>e.value));return 1===a.length?a[0]:a})),p=S((()=>e.numbers.map((e=>e-o.value)))),c=S((()=>n.value?p.value.reduce(((e,l)=>e+Math.pow(l,2)),0)/n.value:null)),v=S((()=>null===c.value?null:Math.sqrt(c.value))),m=S((()=>p.value.map((l=>{switch(v.value){case null:return null;case 0:return e.normAverage;default:return l/v.value*e.normStandardDeviation+e.normAverage}})))),h=S((()=>({labels:s.value,numbers:e.numbers,sortedData:t.value,deviation:p.value.map((e=>a(e,1))),deviationValue:m.value.map((e=>a(e,0))),totalValue:a(u.value),totalDeviation:a(r.value),average:a(o.value),median:a(i.value),n:n.value,mode:d.value,variance:a(c.value),standardDeviation:a(v.value)}))),f=l(null),y=()=>{var l;const a=e.input.trim();var t;null==(l=f.value)||l.focus(),("number"==typeof(t=a)||t.match(/^[0-9０-９]+(\.[0-9０-９]+)?$/))&&(e.numbers.push(Number(a)),e.input="")};return{state:e,display:h,inputRef:f,eventListener:{[le+"Prevent"]:y},isMinus:e=>null!==e&&e<0,submit:y}}});const te=t();F("data-v-24bc85c8");const ne=$("legend",null,"データ分析",-1),se={key:0},ue=$("th",null,null,-1),re=$("th",{class:"heading empty"},null,-1),oe=$("th",{class:"heading empty"},null,-1),ie=$("th",{class:"heading"}," 合計 ",-1),de=$("th",null,"値",-1),pe=$("td",{class:"empty"},null,-1),ce=$("td",{class:"empty"},null,-1),ve=$("th",null,"偏差",-1),me=$("td",{class:"empty"},null,-1),he=$("td",{class:"empty"},null,-1),fe=$("th",null,"偏差値",-1),ye=$("td",{class:"empty"},null,-1),be=$("td",{class:"empty"},null,-1),ge=$("td",{class:"slash"},null,-1),De=$("legend",null,"概要",-1),Ae=$("span",null,"標本数",-1),Me=$("span",null,"分散",-1),Ve=$("span",null,"標準偏差",-1),ke=$("legend",null,"代表値",-1),Be=$("span",null,"平均値",-1),Ce=$("span",null,"中央値",-1),xe=$("span",null,"最頻値",-1),qe={class:"chart"},Ie={class:"input"},Se={class:"box"},$e=j(" OK ");O();const Re=te(((e,l,t,s,u,r)=>{const o=R("Chart"),i=R("AppInputText"),d=R("AppButton");return n(),a("form",{onSubmit:l[2]||(l[2]=K(((...l)=>e.submit&&e.submit(...l)),["prevent"]))},[$("fieldset",null,[ne,e.display.n?(n(),a("table",se,[$("tr",null,[ue,re,(n(!0),a(L,null,N(e.display.labels,((e,l)=>(n(),a("th",{key:`h-${e}-${l}`,class:"heading"},T(e),1)))),128)),oe,ie]),$("tr",null,[de,pe,(n(!0),a(L,null,N(e.display.numbers,((l,t)=>(n(),a("td",{key:`h-${l}-${t}`,class:{minus:e.isMinus(l)}},T(l),3)))),128)),ce,$("td",null,T(e.display.totalValue),1)]),$("tr",null,[ve,me,(n(!0),a(L,null,N(e.display.deviation,((l,t)=>(n(),a("td",{key:`i-${l}-${t}`,class:{minus:e.isMinus(l)}},T(l),3)))),128)),he,$("td",null,T(e.display.totalDeviation),1)]),$("tr",null,[fe,ye,(n(!0),a(L,null,N(e.display.deviationValue,((l,t)=>(n(),a("td",{key:`j-${l}-${t}`,class:{minus:e.isMinus(l)}},T(l),3)))),128)),be,ge])])):z("",!0),$("fieldset",null,[De,$("label",null,[Ae,j("："+T(e.display.n),1)]),$("label",null,[Me,j("："+T(e.display.variance),1)]),$("label",null,[Ve,j("："+T(e.display.standardDeviation),1)])]),$("fieldset",null,[ke,$("label",null,[Be,j("："+T(e.display.average),1)]),$("label",null,[Ce,j("："+T(e.display.median),1)]),$("label",null,[xe,j("："+T(e.display.mode),1)])]),$("div",qe,[$(o,{srcData:e.display.numbers,labels:e.display.labels},null,8,["srcData","labels"])]),$("label",Ie,[$("div",Se,[$(i,{ref:"inputRef",modelValue:e.state.input,"onUpdate:modelValue":l[1]||(l[1]=l=>e.state.input=l),placeholder:"数字を入力！",class:"input"},null,8,["modelValue"]),$(d,w({class:"button -fill -night -bold"},E(e.eventListener)),{default:te((()=>[$e])),_:1},16)])])])],32)}));ae.render=Re,ae.__scopeId="data-v-24bc85c8";const _e={pin:(e,{arg:l,value:a})=>{const t=l||"top";e.style[t]=a+"px",e.style.position="fixed"},focus:{mounted(e,l){e.focus(),null==l||l.value(e)}},center:{mounted(e,{arg:l}){const a=document.documentElement;if(e.style.position="absolute","vertical"===l||!l){const l=Math.floor((a.offsetHeight-e.offsetHeight)/2);e.style.top=l+"px"}if("horizontal"===l||!l){const l=Math.floor((a.offsetWidth-e.offsetWidth)/2);e.style.left=l+"px"}}}},we=P(ae);!function(e){for(const l in _e){const a=_e[l];e.directive(l,a)}}(we),we.mount("#app");
