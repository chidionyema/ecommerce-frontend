"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[196],{6540:function(e,t,o){var r=o(4836);t.Z=void 0;var n=r(o(4938)),i=o(5893);t.Z=(0,n.default)((0,i.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"}),"Add")},1733:function(e,t,o){var r=o(4836);t.Z=void 0;var n=r(o(4938)),i=o(5893);t.Z=(0,n.default)((0,i.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"}),"Delete")},4895:function(e,t,o){var r=o(4836);t.Z=void 0;var n=r(o(4938)),i=o(5893);t.Z=(0,n.default)((0,i.jsx)("path",{d:"M19 13H5v-2h14z"}),"Remove")},9334:function(e,t,o){var r=o(3366),n=o(272),i=o(7294),a=o(512),s=o(4780),p=o(5861),l=o(9773),c=o(8628),f=o(948),u=o(6336),d=o(5893);let m=["children","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"],h=e=>{let{classes:t,inset:o,primary:r,secondary:n,dense:i}=e;return(0,s.Z)({root:["root",o&&"inset",i&&"dense",r&&n&&"multiline"],primary:["primary"],secondary:["secondary"]},u.L,t)},v=(0,f.ZP)("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:o}=e;return[{[`& .${u.Z.primary}`]:t.primary},{[`& .${u.Z.secondary}`]:t.secondary},t.root,o.inset&&t.inset,o.primary&&o.secondary&&t.multiline,o.dense&&t.dense]}})(({ownerState:e})=>(0,n.Z)({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},e.primary&&e.secondary&&{marginTop:6,marginBottom:6},e.inset&&{paddingLeft:56})),y=i.forwardRef(function(e,t){let o=(0,c.i)({props:e,name:"MuiListItemText"}),{children:s,className:f,disableTypography:u=!1,inset:y=!1,primary:g,primaryTypographyProps:b,secondary:w,secondaryTypographyProps:x}=o,O=(0,r.Z)(o,m),{dense:Z}=i.useContext(l.Z),P=null!=g?g:s,T=w,j=(0,n.Z)({},o,{disableTypography:u,inset:y,primary:!!P,secondary:!!T,dense:Z}),R=h(j);return null==P||P.type===p.Z||u||(P=(0,d.jsx)(p.Z,(0,n.Z)({variant:Z?"body2":"body1",className:R.primary,component:null!=b&&b.variant?void 0:"span",display:"block"},b,{children:P}))),null==T||T.type===p.Z||u||(T=(0,d.jsx)(p.Z,(0,n.Z)({variant:"body2",className:R.secondary,color:"text.secondary",display:"block"},x,{children:T}))),(0,d.jsxs)(v,(0,n.Z)({className:(0,a.Z)(R.root,f),ownerState:j,ref:t},O,{children:[P,T]}))});t.Z=y},1292:function(e,t,o){o.d(t,{Z:function(){return e7}});var r,n,i,a,s,p=o(3366),l=o(272),c=o(7294),f=o(512),u=o(6271),d=o(4780),m=o(2101),h=o(2056),v=o(6542),y=o(948),g=o(2734),b=o(8628),w=o(8216),x=o(6514),O=o(1070),Z=o(3703),P=o(3546),T=o(2690);function j(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function R(e){var t=j(e).Element;return e instanceof t||e instanceof Element}function E(e){var t=j(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function M(e){if("undefined"==typeof ShadowRoot)return!1;var t=j(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}var k=Math.max,L=Math.min,A=Math.round;function D(){var e=navigator.userAgentData;return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(e){return e.brand+"/"+e.version}).join(" "):navigator.userAgent}function W(){return!/^((?!chrome|android).)*safari/i.test(D())}function S(e,t,o){void 0===t&&(t=!1),void 0===o&&(o=!1);var r=e.getBoundingClientRect(),n=1,i=1;t&&E(e)&&(n=e.offsetWidth>0&&A(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&A(r.height)/e.offsetHeight||1);var a=(R(e)?j(e):window).visualViewport,s=!W()&&o,p=(r.left+(s&&a?a.offsetLeft:0))/n,l=(r.top+(s&&a?a.offsetTop:0))/i,c=r.width/n,f=r.height/i;return{width:c,height:f,top:l,right:p+c,bottom:l+f,left:p,x:p,y:l}}function B(e){var t=j(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function C(e){return e?(e.nodeName||"").toLowerCase():null}function N(e){return((R(e)?e.ownerDocument:e.document)||window.document).documentElement}function H(e){return S(N(e)).left+B(e).scrollLeft}function I(e){return j(e).getComputedStyle(e)}function V(e){var t=I(e),o=t.overflow,r=t.overflowX,n=t.overflowY;return/auto|scroll|overlay|hidden/.test(o+n+r)}function F(e){var t=S(e),o=e.offsetWidth,r=e.offsetHeight;return 1>=Math.abs(t.width-o)&&(o=t.width),1>=Math.abs(t.height-r)&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:o,height:r}}function $(e){return"html"===C(e)?e:e.assignedSlot||e.parentNode||(M(e)?e.host:null)||N(e)}function _(e,t){void 0===t&&(t=[]);var o,r=function e(t){return["html","body","#document"].indexOf(C(t))>=0?t.ownerDocument.body:E(t)&&V(t)?t:e($(t))}(e),n=r===(null==(o=e.ownerDocument)?void 0:o.body),i=j(r),a=n?[i].concat(i.visualViewport||[],V(r)?r:[]):r,s=t.concat(a);return n?s:s.concat(_($(a)))}function q(e){return E(e)&&"fixed"!==I(e).position?e.offsetParent:null}function z(e){for(var t=j(e),o=q(e);o&&["table","td","th"].indexOf(C(o))>=0&&"static"===I(o).position;)o=q(o);return o&&("html"===C(o)||"body"===C(o)&&"static"===I(o).position)?t:o||function(e){var t=/firefox/i.test(D());if(/Trident/i.test(D())&&E(e)&&"fixed"===I(e).position)return null;var o=$(e);for(M(o)&&(o=o.host);E(o)&&0>["html","body"].indexOf(C(o));){var r=I(o);if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return o;o=o.parentNode}return null}(e)||t}var U="bottom",X="right",Y="left",G="auto",J=["top",U,X,Y],K="start",Q="viewport",ee="popper",et=J.reduce(function(e,t){return e.concat([t+"-"+K,t+"-end"])},[]),eo=[].concat(J,[G]).reduce(function(e,t){return e.concat([t,t+"-"+K,t+"-end"])},[]),er=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"],en={placement:"bottom",modifiers:[],strategy:"absolute"};function ei(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];return!t.some(function(e){return!(e&&"function"==typeof e.getBoundingClientRect)})}var ea={passive:!0};function es(e){return e.split("-")[0]}function ep(e){return e.split("-")[1]}function el(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function ec(e){var t,o=e.reference,r=e.element,n=e.placement,i=n?es(n):null,a=n?ep(n):null,s=o.x+o.width/2-r.width/2,p=o.y+o.height/2-r.height/2;switch(i){case"top":t={x:s,y:o.y-r.height};break;case U:t={x:s,y:o.y+o.height};break;case X:t={x:o.x+o.width,y:p};break;case Y:t={x:o.x-r.width,y:p};break;default:t={x:o.x,y:o.y}}var l=i?el(i):null;if(null!=l){var c="y"===l?"height":"width";switch(a){case K:t[l]=t[l]-(o[c]/2-r[c]/2);break;case"end":t[l]=t[l]+(o[c]/2-r[c]/2)}}return t}var ef={top:"auto",right:"auto",bottom:"auto",left:"auto"};function eu(e){var t,o,r,n,i,a,s,p=e.popper,l=e.popperRect,c=e.placement,f=e.variation,u=e.offsets,d=e.position,m=e.gpuAcceleration,h=e.adaptive,v=e.roundOffsets,y=e.isFixed,g=u.x,b=void 0===g?0:g,w=u.y,x=void 0===w?0:w,O="function"==typeof v?v({x:b,y:x}):{x:b,y:x};b=O.x,x=O.y;var Z=u.hasOwnProperty("x"),P=u.hasOwnProperty("y"),T=Y,R="top",E=window;if(h){var M=z(p),k="clientHeight",L="clientWidth";M===j(p)&&"static"!==I(M=N(p)).position&&"absolute"===d&&(k="scrollHeight",L="scrollWidth"),("top"===c||(c===Y||c===X)&&"end"===f)&&(R=U,x-=(y&&M===E&&E.visualViewport?E.visualViewport.height:M[k])-l.height,x*=m?1:-1),(c===Y||("top"===c||c===U)&&"end"===f)&&(T=X,b-=(y&&M===E&&E.visualViewport?E.visualViewport.width:M[L])-l.width,b*=m?1:-1)}var D=Object.assign({position:d},h&&ef),W=!0===v?(t={x:b,y:x},o=j(p),r=t.x,n=t.y,{x:A(r*(i=o.devicePixelRatio||1))/i||0,y:A(n*i)/i||0}):{x:b,y:x};return(b=W.x,x=W.y,m)?Object.assign({},D,((s={})[R]=P?"0":"",s[T]=Z?"0":"",s.transform=1>=(E.devicePixelRatio||1)?"translate("+b+"px, "+x+"px)":"translate3d("+b+"px, "+x+"px, 0)",s)):Object.assign({},D,((a={})[R]=P?x+"px":"",a[T]=Z?b+"px":"",a.transform="",a))}var ed={left:"right",right:"left",bottom:"top",top:"bottom"};function em(e){return e.replace(/left|right|bottom|top/g,function(e){return ed[e]})}var eh={start:"end",end:"start"};function ev(e){return e.replace(/start|end/g,function(e){return eh[e]})}function ey(e,t){var o=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(o&&M(o)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function eg(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function eb(e,t,o){var r,n,i,a,s,p,l,c,f,u;return t===Q?eg(function(e,t){var o=j(e),r=N(e),n=o.visualViewport,i=r.clientWidth,a=r.clientHeight,s=0,p=0;if(n){i=n.width,a=n.height;var l=W();(l||!l&&"fixed"===t)&&(s=n.offsetLeft,p=n.offsetTop)}return{width:i,height:a,x:s+H(e),y:p}}(e,o)):R(t)?((r=S(t,!1,"fixed"===o)).top=r.top+t.clientTop,r.left=r.left+t.clientLeft,r.bottom=r.top+t.clientHeight,r.right=r.left+t.clientWidth,r.width=t.clientWidth,r.height=t.clientHeight,r.x=r.left,r.y=r.top,r):eg((n=N(e),a=N(n),s=B(n),p=null==(i=n.ownerDocument)?void 0:i.body,l=k(a.scrollWidth,a.clientWidth,p?p.scrollWidth:0,p?p.clientWidth:0),c=k(a.scrollHeight,a.clientHeight,p?p.scrollHeight:0,p?p.clientHeight:0),f=-s.scrollLeft+H(n),u=-s.scrollTop,"rtl"===I(p||a).direction&&(f+=k(a.clientWidth,p?p.clientWidth:0)-l),{width:l,height:c,x:f,y:u}))}function ew(){return{top:0,right:0,bottom:0,left:0}}function ex(e){return Object.assign({},ew(),e)}function eO(e,t){return t.reduce(function(t,o){return t[o]=e,t},{})}function eZ(e,t){void 0===t&&(t={});var o,r,n,i,a,s,p,l=t,c=l.placement,f=void 0===c?e.placement:c,u=l.strategy,d=void 0===u?e.strategy:u,m=l.boundary,h=l.rootBoundary,v=l.elementContext,y=void 0===v?ee:v,g=l.altBoundary,b=l.padding,w=void 0===b?0:b,x=ex("number"!=typeof w?w:eO(w,J)),O=e.rects.popper,Z=e.elements[void 0!==g&&g?y===ee?"reference":ee:y],P=(o=R(Z)?Z:Z.contextElement||N(e.elements.popper),s=(a=[].concat("clippingParents"===(r=void 0===m?"clippingParents":m)?(n=_($(o)),R(i=["absolute","fixed"].indexOf(I(o).position)>=0&&E(o)?z(o):o)?n.filter(function(e){return R(e)&&ey(e,i)&&"body"!==C(e)}):[]):[].concat(r),[void 0===h?Q:h]))[0],(p=a.reduce(function(e,t){var r=eb(o,t,d);return e.top=k(r.top,e.top),e.right=L(r.right,e.right),e.bottom=L(r.bottom,e.bottom),e.left=k(r.left,e.left),e},eb(o,s,d))).width=p.right-p.left,p.height=p.bottom-p.top,p.x=p.left,p.y=p.top,p),T=S(e.elements.reference),j=ec({reference:T,element:O,strategy:"absolute",placement:f}),M=eg(Object.assign({},O,j)),A=y===ee?M:T,D={top:P.top-A.top+x.top,bottom:A.bottom-P.bottom+x.bottom,left:P.left-A.left+x.left,right:A.right-P.right+x.right},W=e.modifiersData.offset;if(y===ee&&W){var B=W[f];Object.keys(D).forEach(function(e){var t=[X,U].indexOf(e)>=0?1:-1,o=["top",U].indexOf(e)>=0?"y":"x";D[e]+=B[o]*t})}return D}function eP(e,t,o){return k(e,L(t,o))}function eT(e,t,o){return void 0===o&&(o={x:0,y:0}),{top:e.top-t.height-o.y,right:e.right-t.width+o.x,bottom:e.bottom-t.height+o.y,left:e.left-t.width-o.x}}function ej(e){return["top",X,U,Y].some(function(t){return e[t]>=0})}var eR=(i=void 0===(n=(r={defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,o=e.instance,r=e.options,n=r.scroll,i=void 0===n||n,a=r.resize,s=void 0===a||a,p=j(t.elements.popper),l=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&l.forEach(function(e){e.addEventListener("scroll",o.update,ea)}),s&&p.addEventListener("resize",o.update,ea),function(){i&&l.forEach(function(e){e.removeEventListener("scroll",o.update,ea)}),s&&p.removeEventListener("resize",o.update,ea)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,o=e.name;t.modifiersData[o]=ec({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,o=e.options,r=o.gpuAcceleration,n=o.adaptive,i=o.roundOffsets,a=void 0===i||i,s={placement:es(t.placement),variation:ep(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:void 0===r||r,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,eu(Object.assign({},s,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:void 0===n||n,roundOffsets:a})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,eu(Object.assign({},s,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:a})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach(function(e){var o=t.styles[e]||{},r=t.attributes[e]||{},n=t.elements[e];E(n)&&C(n)&&(Object.assign(n.style,o),Object.keys(r).forEach(function(e){var t=r[e];!1===t?n.removeAttribute(e):n.setAttribute(e,!0===t?"":t)}))})},effect:function(e){var t=e.state,o={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,o.popper),t.styles=o,t.elements.arrow&&Object.assign(t.elements.arrow.style,o.arrow),function(){Object.keys(t.elements).forEach(function(e){var r=t.elements[e],n=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:o[e]).reduce(function(e,t){return e[t]="",e},{});E(r)&&C(r)&&(Object.assign(r.style,i),Object.keys(n).forEach(function(e){r.removeAttribute(e)}))})}},requires:["computeStyles"]},{name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,o=e.options,r=e.name,n=o.offset,i=void 0===n?[0,0]:n,a=eo.reduce(function(e,o){var r,n,a,s,p,l;return e[o]=(r=t.rects,a=[Y,"top"].indexOf(n=es(o))>=0?-1:1,p=(s="function"==typeof i?i(Object.assign({},r,{placement:o})):i)[0],l=s[1],p=p||0,l=(l||0)*a,[Y,X].indexOf(n)>=0?{x:l,y:p}:{x:p,y:l}),e},{}),s=a[t.placement],p=s.x,l=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=p,t.modifiersData.popperOffsets.y+=l),t.modifiersData[r]=a}},{name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,o=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var n=o.mainAxis,i=void 0===n||n,a=o.altAxis,s=void 0===a||a,p=o.fallbackPlacements,l=o.padding,c=o.boundary,f=o.rootBoundary,u=o.altBoundary,d=o.flipVariations,m=void 0===d||d,h=o.allowedAutoPlacements,v=t.options.placement,y=es(v)===v,g=p||(y||!m?[em(v)]:function(e){if(es(e)===G)return[];var t=em(e);return[ev(e),t,ev(t)]}(v)),b=[v].concat(g).reduce(function(e,o){var r,n,i,a,s,p,u,d,v,y,g,b;return e.concat(es(o)===G?(n=(r={placement:o,boundary:c,rootBoundary:f,padding:l,flipVariations:m,allowedAutoPlacements:h}).placement,i=r.boundary,a=r.rootBoundary,s=r.padding,p=r.flipVariations,d=void 0===(u=r.allowedAutoPlacements)?eo:u,0===(g=(y=(v=ep(n))?p?et:et.filter(function(e){return ep(e)===v}):J).filter(function(e){return d.indexOf(e)>=0})).length&&(g=y),Object.keys(b=g.reduce(function(e,o){return e[o]=eZ(t,{placement:o,boundary:i,rootBoundary:a,padding:s})[es(o)],e},{})).sort(function(e,t){return b[e]-b[t]})):o)},[]),w=t.rects.reference,x=t.rects.popper,O=new Map,Z=!0,P=b[0],T=0;T<b.length;T++){var j=b[T],R=es(j),E=ep(j)===K,M=["top",U].indexOf(R)>=0,k=M?"width":"height",L=eZ(t,{placement:j,boundary:c,rootBoundary:f,altBoundary:u,padding:l}),A=M?E?X:Y:E?U:"top";w[k]>x[k]&&(A=em(A));var D=em(A),W=[];if(i&&W.push(L[R]<=0),s&&W.push(L[A]<=0,L[D]<=0),W.every(function(e){return e})){P=j,Z=!1;break}O.set(j,W)}if(Z)for(var S=m?3:1,B=function(e){var t=b.find(function(t){var o=O.get(t);if(o)return o.slice(0,e).every(function(e){return e})});if(t)return P=t,"break"},C=S;C>0&&"break"!==B(C);C--);t.placement!==P&&(t.modifiersData[r]._skip=!0,t.placement=P,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},{name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,o=e.options,r=e.name,n=o.mainAxis,i=o.altAxis,a=o.boundary,s=o.rootBoundary,p=o.altBoundary,l=o.padding,c=o.tether,f=void 0===c||c,u=o.tetherOffset,d=void 0===u?0:u,m=eZ(t,{boundary:a,rootBoundary:s,padding:l,altBoundary:p}),h=es(t.placement),v=ep(t.placement),y=!v,g=el(h),b="x"===g?"y":"x",w=t.modifiersData.popperOffsets,x=t.rects.reference,O=t.rects.popper,Z="function"==typeof d?d(Object.assign({},t.rects,{placement:t.placement})):d,P="number"==typeof Z?{mainAxis:Z,altAxis:Z}:Object.assign({mainAxis:0,altAxis:0},Z),T=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,j={x:0,y:0};if(w){if(void 0===n||n){var R,E="y"===g?"top":Y,M="y"===g?U:X,A="y"===g?"height":"width",D=w[g],W=D+m[E],S=D-m[M],B=f?-O[A]/2:0,C=v===K?x[A]:O[A],N=v===K?-O[A]:-x[A],H=t.elements.arrow,I=f&&H?F(H):{width:0,height:0},V=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:ew(),$=V[E],_=V[M],q=eP(0,x[A],I[A]),G=y?x[A]/2-B-q-$-P.mainAxis:C-q-$-P.mainAxis,J=y?-x[A]/2+B+q+_+P.mainAxis:N+q+_+P.mainAxis,Q=t.elements.arrow&&z(t.elements.arrow),ee=Q?"y"===g?Q.clientTop||0:Q.clientLeft||0:0,et=null!=(R=null==T?void 0:T[g])?R:0,eo=D+G-et-ee,er=D+J-et,en=eP(f?L(W,eo):W,D,f?k(S,er):S);w[g]=en,j[g]=en-D}if(void 0!==i&&i){var ei,ea,ec="x"===g?"top":Y,ef="x"===g?U:X,eu=w[b],ed="y"===b?"height":"width",em=eu+m[ec],eh=eu-m[ef],ev=-1!==["top",Y].indexOf(h),ey=null!=(ea=null==T?void 0:T[b])?ea:0,eg=ev?em:eu-x[ed]-O[ed]-ey+P.altAxis,eb=ev?eu+x[ed]+O[ed]-ey-P.altAxis:eh,ex=f&&ev?(ei=eP(eg,eu,eb))>eb?eb:ei:eP(f?eg:em,eu,f?eb:eh);w[b]=ex,j[b]=ex-eu}t.modifiersData[r]=j}},requiresIfExists:["offset"]},{name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,o,r=e.state,n=e.name,i=e.options,a=r.elements.arrow,s=r.modifiersData.popperOffsets,p=es(r.placement),l=el(p),c=[Y,X].indexOf(p)>=0?"height":"width";if(a&&s){var f=ex("number"!=typeof(t="function"==typeof(t=i.padding)?t(Object.assign({},r.rects,{placement:r.placement})):t)?t:eO(t,J)),u=F(a),d="y"===l?"top":Y,m="y"===l?U:X,h=r.rects.reference[c]+r.rects.reference[l]-s[l]-r.rects.popper[c],v=s[l]-r.rects.reference[l],y=z(a),g=y?"y"===l?y.clientHeight||0:y.clientWidth||0:0,b=f[d],w=g-u[c]-f[m],x=g/2-u[c]/2+(h/2-v/2),O=eP(b,x,w);r.modifiersData[n]=((o={})[l]=O,o.centerOffset=O-x,o)}},effect:function(e){var t=e.state,o=e.options.element,r=void 0===o?"[data-popper-arrow]":o;null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&ey(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,o=e.name,r=t.rects.reference,n=t.rects.popper,i=t.modifiersData.preventOverflow,a=eZ(t,{elementContext:"reference"}),s=eZ(t,{altBoundary:!0}),p=eT(a,r),l=eT(s,n,i),c=ej(p),f=ej(l);t.modifiersData[o]={referenceClippingOffsets:p,popperEscapeOffsets:l,isReferenceHidden:c,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":c,"data-popper-escaped":f})}}]}).defaultModifiers)?[]:n,s=void 0===(a=r.defaultOptions)?en:a,function(e,t,o){void 0===o&&(o=s);var r,n={placement:"bottom",orderedModifiers:[],options:Object.assign({},en,s),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},a=[],p=!1,l={state:n,setOptions:function(o){var r,p,f,u,d,m="function"==typeof o?o(n.options):o;c(),n.options=Object.assign({},s,n.options,m),n.scrollParents={reference:R(e)?_(e):e.contextElement?_(e.contextElement):[],popper:_(t)};var h=(p=Object.keys(r=[].concat(i,n.options.modifiers).reduce(function(e,t){var o=e[t.name];return e[t.name]=o?Object.assign({},o,t,{options:Object.assign({},o.options,t.options),data:Object.assign({},o.data,t.data)}):t,e},{})).map(function(e){return r[e]}),f=new Map,u=new Set,d=[],p.forEach(function(e){f.set(e.name,e)}),p.forEach(function(e){u.has(e.name)||function e(t){u.add(t.name),[].concat(t.requires||[],t.requiresIfExists||[]).forEach(function(t){if(!u.has(t)){var o=f.get(t);o&&e(o)}}),d.push(t)}(e)}),er.reduce(function(e,t){return e.concat(d.filter(function(e){return e.phase===t}))},[]));return n.orderedModifiers=h.filter(function(e){return e.enabled}),n.orderedModifiers.forEach(function(e){var t=e.name,o=e.options,r=e.effect;if("function"==typeof r){var i=r({state:n,name:t,instance:l,options:void 0===o?{}:o});a.push(i||function(){})}}),l.update()},forceUpdate:function(){if(!p){var e,t,o,r,i,a,s,c,f,u,d,m,h=n.elements,v=h.reference,y=h.popper;if(ei(v,y)){n.rects={reference:(t=z(y),o="fixed"===n.options.strategy,r=E(t),c=E(t)&&(a=A((i=t.getBoundingClientRect()).width)/t.offsetWidth||1,s=A(i.height)/t.offsetHeight||1,1!==a||1!==s),f=N(t),u=S(v,c,o),d={scrollLeft:0,scrollTop:0},m={x:0,y:0},(r||!r&&!o)&&(("body"!==C(t)||V(f))&&(d=(e=t)!==j(e)&&E(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:B(e)),E(t)?(m=S(t,!0),m.x+=t.clientLeft,m.y+=t.clientTop):f&&(m.x=H(f))),{x:u.left+d.scrollLeft-m.x,y:u.top+d.scrollTop-m.y,width:u.width,height:u.height}),popper:F(y)},n.reset=!1,n.placement=n.options.placement,n.orderedModifiers.forEach(function(e){return n.modifiersData[e.name]=Object.assign({},e.data)});for(var g=0;g<n.orderedModifiers.length;g++){if(!0===n.reset){n.reset=!1,g=-1;continue}var b=n.orderedModifiers[g],w=b.fn,x=b.options,O=void 0===x?{}:x,Z=b.name;"function"==typeof w&&(n=w({state:n,options:O,name:Z,instance:l})||n)}}}},update:function(){return r||(r=new Promise(function(e){Promise.resolve().then(function(){r=void 0,e(new Promise(function(e){l.forceUpdate(),e(n)}))})})),r},destroy:function(){c(),p=!0}};if(!ei(e,t))return l;function c(){a.forEach(function(e){return e()}),a=[]}return l.setOptions(o).then(function(e){!p&&o.onFirstUpdate&&o.onFirstUpdate(e)}),l}),eE=o(2963),eM=o(424),ek=o(1588),eL=o(4867);function eA(e){return(0,eL.ZP)("MuiPopper",e)}(0,ek.Z)("MuiPopper",["root"]);var eD=o(5893);let eW=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],eS=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function eB(e){return"function"==typeof e?e():e}let eC=e=>{let{classes:t}=e;return(0,d.Z)({root:["root"]},eA,t)},eN={},eH=c.forwardRef(function(e,t){var o;let{anchorEl:r,children:n,direction:i,disablePortal:a,modifiers:s,open:f,placement:u,popperOptions:d,popperRef:m,slotProps:h={},slots:v={},TransitionProps:y}=e,g=(0,p.Z)(e,eW),b=c.useRef(null),w=(0,Z.Z)(b,t),x=c.useRef(null),O=(0,Z.Z)(x,m),T=c.useRef(O);(0,P.Z)(()=>{T.current=O},[O]),c.useImperativeHandle(m,()=>x.current,[]);let j=function(e,t){if("ltr"===t)return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}(u,i),[R,E]=c.useState(j),[M,k]=c.useState(eB(r));c.useEffect(()=>{x.current&&x.current.forceUpdate()}),c.useEffect(()=>{r&&k(eB(r))},[r]),(0,P.Z)(()=>{if(!M||!f)return;let e=e=>{E(e.placement)},t=[{name:"preventOverflow",options:{altBoundary:a}},{name:"flip",options:{altBoundary:a}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:t})=>{e(t)}}];null!=s&&(t=t.concat(s)),d&&null!=d.modifiers&&(t=t.concat(d.modifiers));let o=eR(M,b.current,(0,l.Z)({placement:j},d,{modifiers:t}));return T.current(o),()=>{o.destroy(),T.current(null)}},[M,a,s,f,d,j]);let L={placement:R};null!==y&&(L.TransitionProps=y);let A=eC(e),D=null!=(o=v.root)?o:"div",W=(0,eE.Z)({elementType:D,externalSlotProps:h.root,externalForwardedProps:g,additionalProps:{role:"tooltip",ref:w},ownerState:e,className:A.root});return(0,eD.jsx)(D,(0,l.Z)({},W,{children:"function"==typeof n?n(L):n}))}),eI=c.forwardRef(function(e,t){let o;let{anchorEl:r,children:n,container:i,direction:a="ltr",disablePortal:s=!1,keepMounted:f=!1,modifiers:u,open:d,placement:m="bottom",popperOptions:h=eN,popperRef:v,style:y,transition:g=!1,slotProps:b={},slots:w={}}=e,x=(0,p.Z)(e,eS),[O,Z]=c.useState(!0);if(!f&&!d&&(!g||O))return null;if(i)o=i;else if(r){let e=eB(r);o=e&&void 0!==e.nodeType?(0,T.Z)(e).body:(0,T.Z)(null).body}let P=!d&&f&&(!g||O)?"none":void 0;return(0,eD.jsx)(eM.Z,{disablePortal:s,container:o,children:(0,eD.jsx)(eH,(0,l.Z)({anchorEl:r,direction:a,disablePortal:s,modifiers:u,ref:t,open:g?!O:d,placement:m,popperOptions:h,popperRef:v,slotProps:b,slots:w},x,{style:(0,l.Z)({position:"fixed",top:0,left:0,display:P},y),TransitionProps:g?{in:d,onEnter:()=>{Z(!1)},onExited:()=>{Z(!0)}}:void 0,children:n}))})}),eV=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],eF=(0,y.ZP)(eI,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),e$=c.forwardRef(function(e,t){var o;let r=(0,O.Z)(),n=(0,b.i)({props:e,name:"MuiPopper"}),{anchorEl:i,component:a,components:s,componentsProps:c,container:f,disablePortal:u,keepMounted:d,modifiers:m,open:h,placement:v,popperOptions:y,popperRef:g,transition:w,slots:x,slotProps:Z}=n,P=(0,p.Z)(n,eV),T=null!=(o=null==x?void 0:x.root)?o:null==s?void 0:s.Root,j=(0,l.Z)({anchorEl:i,container:f,disablePortal:u,keepMounted:d,modifiers:m,open:h,placement:v,popperOptions:y,popperRef:g,transition:w},P);return(0,eD.jsx)(eF,(0,l.Z)({as:a,direction:null==r?void 0:r.direction,slots:{root:T},slotProps:null!=Z?Z:c},j,{ref:t}))});var e_=o(2068),eq=o(1705),ez=o(7909),eU=o(9674),eX=o(9299);function eY(e){return(0,eL.ZP)("MuiTooltip",e)}let eG=(0,ek.Z)("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),eJ=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"],eK=e=>{let{classes:t,disableInteractive:o,arrow:r,touch:n,placement:i}=e,a={popper:["popper",!o&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",n&&"touch",`tooltipPlacement${(0,w.Z)(i.split("-")[0])}`],arrow:["arrow"]};return(0,d.Z)(a,eY,t)},eQ=(0,y.ZP)(e$,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{let{ownerState:o}=e;return[t.popper,!o.disableInteractive&&t.popperInteractive,o.arrow&&t.popperArrow,!o.open&&t.popperClose]}})(({theme:e,ownerState:t,open:o})=>(0,l.Z)({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!o&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${eG.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${eG.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${eG.arrow}`]:(0,l.Z)({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${eG.arrow}`]:(0,l.Z)({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),e0=(0,y.ZP)("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{let{ownerState:o}=e;return[t.tooltip,o.touch&&t.touch,o.arrow&&t.tooltipArrow,t[`tooltipPlacement${(0,w.Z)(o.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>(0,l.Z)({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:(0,m.Fq)(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Math.round(1e5*(16/14))/1e5}em`,fontWeight:e.typography.fontWeightRegular},{[`.${eG.popper}[data-popper-placement*="left"] &`]:(0,l.Z)({transformOrigin:"right center"},t.isRtl?(0,l.Z)({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):(0,l.Z)({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${eG.popper}[data-popper-placement*="right"] &`]:(0,l.Z)({transformOrigin:"left center"},t.isRtl?(0,l.Z)({marginRight:"14px"},t.touch&&{marginRight:"24px"}):(0,l.Z)({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${eG.popper}[data-popper-placement*="top"] &`]:(0,l.Z)({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${eG.popper}[data-popper-placement*="bottom"] &`]:(0,l.Z)({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),e1=(0,y.ZP)("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:(0,m.Fq)(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}})),e2=!1,e4=new u.V,e6={x:0,y:0};function e3(e,t){return(o,...r)=>{t&&t(o,...r),e(o,...r)}}let e9=c.forwardRef(function(e,t){var o,r,n,i,a,s,d,m,y,w,O,Z,P,T,j,R,E,M,k;let L=(0,b.i)({props:e,name:"MuiTooltip"}),{arrow:A=!1,children:D,components:W={},componentsProps:S={},describeChild:B=!1,disableFocusListener:C=!1,disableHoverListener:N=!1,disableInteractive:H=!1,disableTouchListener:I=!1,enterDelay:V=100,enterNextDelay:F=0,enterTouchDelay:$=700,followCursor:_=!1,id:q,leaveDelay:z=0,leaveTouchDelay:U=1500,onClose:X,onOpen:Y,open:G,placement:J="bottom",PopperComponent:K,PopperProps:Q={},slotProps:ee={},slots:et={},title:eo,TransitionComponent:er=x.Z,TransitionProps:en}=L,ei=(0,p.Z)(L,eJ),ea=c.isValidElement(D)?D:(0,eD.jsx)("span",{children:D}),es=(0,g.Z)(),ep=(0,h.V)(),[el,ec]=c.useState(),[ef,eu]=c.useState(null),ed=c.useRef(!1),em=H||_,eh=(0,u.Z)(),ev=(0,u.Z)(),ey=(0,u.Z)(),eg=(0,u.Z)(),[eb,ew]=(0,eX.Z)({controlled:G,default:!1,name:"Tooltip",state:"open"}),ex=eb,eO=(0,ez.Z)(q),eZ=c.useRef(),eP=(0,e_.Z)(()=>{void 0!==eZ.current&&(document.body.style.WebkitUserSelect=eZ.current,eZ.current=void 0),eg.clear()});c.useEffect(()=>eP,[eP]);let eT=e=>{e4.clear(),e2=!0,ew(!0),Y&&!ex&&Y(e)},ej=(0,e_.Z)(e=>{e4.start(800+z,()=>{e2=!1}),ew(!1),X&&ex&&X(e),eh.start(es.transitions.duration.shortest,()=>{ed.current=!1})}),eR=e=>{ed.current&&"touchstart"!==e.type||(el&&el.removeAttribute("title"),ev.clear(),ey.clear(),V||e2&&F?ev.start(e2?F:V,()=>{eT(e)}):eT(e))},eE=e=>{ev.clear(),ey.start(z,()=>{ej(e)})},{isFocusVisibleRef:eM,onBlur:ek,onFocus:eL,ref:eA}=(0,eU.Z)(),[,eW]=c.useState(!1),eS=e=>{ek(e),!1===eM.current&&(eW(!1),eE(e))},eB=e=>{el||ec(e.currentTarget),eL(e),!0===eM.current&&(eW(!0),eR(e))},eC=e=>{ed.current=!0;let t=ea.props;t.onTouchStart&&t.onTouchStart(e)};c.useEffect(()=>{if(ex)return document.addEventListener("keydown",e),()=>{document.removeEventListener("keydown",e)};function e(e){("Escape"===e.key||"Esc"===e.key)&&ej(e)}},[ej,ex]);let eN=(0,eq.Z)(ea.ref,eA,ec,t);eo||0===eo||(ex=!1);let eH=c.useRef(),eI={},eV="string"==typeof eo;B?(eI.title=ex||!eV||N?null:eo,eI["aria-describedby"]=ex?eO:null):(eI["aria-label"]=eV?eo:null,eI["aria-labelledby"]=ex&&!eV?eO:null);let eF=(0,l.Z)({},eI,ei,ea.props,{className:(0,f.Z)(ei.className,ea.props.className),onTouchStart:eC,ref:eN},_?{onMouseMove:e=>{let t=ea.props;t.onMouseMove&&t.onMouseMove(e),e6={x:e.clientX,y:e.clientY},eH.current&&eH.current.update()}}:{}),eY={};I||(eF.onTouchStart=e=>{eC(e),ey.clear(),eh.clear(),eP(),eZ.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",eg.start($,()=>{document.body.style.WebkitUserSelect=eZ.current,eR(e)})},eF.onTouchEnd=e=>{ea.props.onTouchEnd&&ea.props.onTouchEnd(e),eP(),ey.start(U,()=>{ej(e)})}),N||(eF.onMouseOver=e3(eR,eF.onMouseOver),eF.onMouseLeave=e3(eE,eF.onMouseLeave),em||(eY.onMouseOver=eR,eY.onMouseLeave=eE)),C||(eF.onFocus=e3(eB,eF.onFocus),eF.onBlur=e3(eS,eF.onBlur),em||(eY.onFocus=eB,eY.onBlur=eS));let eG=c.useMemo(()=>{var e;let t=[{name:"arrow",enabled:!!ef,options:{element:ef,padding:4}}];return null!=(e=Q.popperOptions)&&e.modifiers&&(t=t.concat(Q.popperOptions.modifiers)),(0,l.Z)({},Q.popperOptions,{modifiers:t})},[ef,Q]),e9=(0,l.Z)({},L,{isRtl:ep,arrow:A,disableInteractive:em,placement:J,PopperComponentProp:K,touch:ed.current}),e7=eK(e9),e8=null!=(o=null!=(r=et.popper)?r:W.Popper)?o:eQ,e5=null!=(n=null!=(i=null!=(a=et.transition)?a:W.Transition)?i:er)?n:x.Z,te=null!=(s=null!=(d=et.tooltip)?d:W.Tooltip)?s:e0,tt=null!=(m=null!=(y=et.arrow)?y:W.Arrow)?m:e1,to=(0,v.Z)(e8,(0,l.Z)({},Q,null!=(w=ee.popper)?w:S.popper,{className:(0,f.Z)(e7.popper,null==Q?void 0:Q.className,null==(O=null!=(Z=ee.popper)?Z:S.popper)?void 0:O.className)}),e9),tr=(0,v.Z)(e5,(0,l.Z)({},en,null!=(P=ee.transition)?P:S.transition),e9),tn=(0,v.Z)(te,(0,l.Z)({},null!=(T=ee.tooltip)?T:S.tooltip,{className:(0,f.Z)(e7.tooltip,null==(j=null!=(R=ee.tooltip)?R:S.tooltip)?void 0:j.className)}),e9),ti=(0,v.Z)(tt,(0,l.Z)({},null!=(E=ee.arrow)?E:S.arrow,{className:(0,f.Z)(e7.arrow,null==(M=null!=(k=ee.arrow)?k:S.arrow)?void 0:M.className)}),e9);return(0,eD.jsxs)(c.Fragment,{children:[c.cloneElement(ea,eF),(0,eD.jsx)(e8,(0,l.Z)({as:null!=K?K:e$,placement:J,anchorEl:_?{getBoundingClientRect:()=>({top:e6.y,left:e6.x,right:e6.x,bottom:e6.y,width:0,height:0})}:el,popperRef:eH,open:!!el&&ex,id:eO,transition:!0},eY,to,{popperOptions:eG,children:({TransitionProps:e})=>(0,eD.jsx)(e5,(0,l.Z)({timeout:es.transitions.duration.shorter},e,tr,{children:(0,eD.jsxs)(te,(0,l.Z)({},tn,{children:[eo,A?(0,eD.jsx)(tt,(0,l.Z)({},ti,{ref:eu})):null]}))}))}))]})});var e7=e9},1070:function(e,t,o){t.Z=void 0;var r=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var o=i(t);if(o&&o.has(e))return o.get(e);var r={__proto__:null},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var s=n?Object.getOwnPropertyDescriptor(e,a):null;s&&(s.get||s.set)?Object.defineProperty(r,a,s):r[a]=e[a]}return r.default=e,o&&o.set(e,r),r}(o(7294)),n=o(3390);function i(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,o=new WeakMap;return(i=function(e){return e?o:t})(e)}t.Z=function(e=null){let t=r.useContext(n.ThemeContext);return t&&0!==Object.keys(t).length?t:e}}}]);