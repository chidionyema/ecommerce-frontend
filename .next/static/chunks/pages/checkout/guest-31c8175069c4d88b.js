(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[554],{8456:function(e,r,t){"use strict";t.d(r,{Z:function(){return w}});var i=t(3366),a=t(272),s=t(7294),n=t(512),l=t(4780),o=t(917),c=t(8216),d=t(8628),m=t(948),x=t(1588),u=t(4867);function h(e){return(0,u.ZP)("MuiCircularProgress",e)}(0,x.Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var p=t(5893);let Z=["className","color","disableShrink","size","style","thickness","value","variant"],f=e=>e,y,v,g,j,b=(0,o.F4)(y||(y=f`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),k=(0,o.F4)(v||(v=f`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),C=e=>{let{classes:r,variant:t,color:i,disableShrink:a}=e,s={root:["root",t,`color${(0,c.Z)(i)}`],svg:["svg"],circle:["circle",`circle${(0,c.Z)(t)}`,a&&"circleDisableShrink"]};return(0,l.Z)(s,h,r)},P=(0,m.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{let{ownerState:t}=e;return[r.root,r[t.variant],r[`color${(0,c.Z)(t.color)}`]]}})(({ownerState:e,theme:r})=>(0,a.Z)({display:"inline-block"},"determinate"===e.variant&&{transition:r.transitions.create("transform")},"inherit"!==e.color&&{color:(r.vars||r).palette[e.color].main}),({ownerState:e})=>"indeterminate"===e.variant&&(0,o.iv)(g||(g=f`
      animation: ${0} 1.4s linear infinite;
    `),b)),_=(0,m.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),E=(0,m.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{let{ownerState:t}=e;return[r.circle,r[`circle${(0,c.Z)(t.variant)}`],t.disableShrink&&r.circleDisableShrink]}})(({ownerState:e,theme:r})=>(0,a.Z)({stroke:"currentColor"},"determinate"===e.variant&&{transition:r.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,o.iv)(j||(j=f`
      animation: ${0} 1.4s ease-in-out infinite;
    `),k)),S=s.forwardRef(function(e,r){let t=(0,d.i)({props:e,name:"MuiCircularProgress"}),{className:s,color:l="primary",disableShrink:o=!1,size:c=40,style:m,thickness:x=3.6,value:u=0,variant:h="indeterminate"}=t,f=(0,i.Z)(t,Z),y=(0,a.Z)({},t,{color:l,disableShrink:o,size:c,thickness:x,value:u,variant:h}),v=C(y),g={},j={},b={};if("determinate"===h){let e=2*Math.PI*((44-x)/2);g.strokeDasharray=e.toFixed(3),b["aria-valuenow"]=Math.round(u),g.strokeDashoffset=`${((100-u)/100*e).toFixed(3)}px`,j.transform="rotate(-90deg)"}return(0,p.jsx)(P,(0,a.Z)({className:(0,n.Z)(v.root,s),style:(0,a.Z)({width:c,height:c},j,m),ownerState:y,ref:r,role:"progressbar"},b,f,{children:(0,p.jsx)(_,{className:v.svg,ownerState:y,viewBox:"22 22 44 44",children:(0,p.jsx)(E,{className:v.circle,style:g,ownerState:y,cx:44,cy:44,r:(44-x)/2,fill:"none",strokeWidth:x})})}))});var w=S},5373:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/checkout/guest",function(){return t(2799)}])},2799:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return T}});var i=t(5893),a=t(7294),s=t(5582),n=t(6720),l=t(6886),o=t(629),c=t(5616),d=t(5861),m=t(1903),x=t(9417),u=t(8456),h=t(8462),p=t(891),Z=t(9334),f=t(3946),y=t(1292),v=t(7720),g=t(1712),j=t(1163),b=t(2859),k=t(6664),C=t(4895),P=t(6540),_=t(1733),E=t(5675),S=t.n(E),w=t(5098);let q=(0,b.J)("your-publishable-key-here"),M={style:{base:{fontSize:"16px",color:"#424770","::placeholder":{color:"#aab7c4"},iconColor:"#c4f0ff"},invalid:{color:"#9e2146"}}},R=(0,w.Z)(k.CardElement)({padding:"16px",border:"1px solid #ced4da",borderRadius:"4px",marginBottom:"16px"}),N=()=>{let{state:e,dispatch:r}=(0,g.K)(),t=(0,k.useStripe)(),b=(0,k.useElements)(),E=(0,j.useRouter)(),[w,q]=(0,a.useState)({name:"",email:"",address:"",city:"",zip:""}),[N,D]=(0,a.useState)(!1),T=e=>{let{name:r,value:t}=e.target;q({...w,[r]:t})},$=async r=>{if(r.preventDefault(),!t||!b)return;D(!0);let i=b.getElement(k.CardElement),{error:a,paymentMethod:s}=await t.createPaymentMethod({type:"card",card:i,billing_details:{name:w.name,email:w.email,address:{line1:w.address,city:w.city,postal_code:w.zip}}});if(a){console.error("Error creating payment method:",a),D(!1);return}console.log("Guest info:",w),console.log("Basket items:",e.items),console.log("Payment method:",s),D(!1),E.push("/checkout/thankyou")},z=(e,t)=>{t<=0?r({type:"REMOVE_FROM_BASKET",id:e}):r({type:"UPDATE_BASKET_QUANTITY",id:e,quantity:t})},F=e=>{r({type:"REMOVE_ALL_QUANTITY",id:e})},I=(0,a.useMemo)(()=>e.items.reduce((e,r)=>e+r.price*r.quantity,0),[e.items]);return(0,i.jsxs)(s.Z,{maxWidth:"lg",sx:{mt:5},children:[(0,i.jsx)(n.ZP,{}),(0,i.jsxs)(l.ZP,{container:!0,spacing:4,children:[(0,i.jsx)(l.ZP,{item:!0,xs:12,md:6,children:(0,i.jsx)(o.Z,{elevation:3,sx:{padding:4},children:(0,i.jsxs)(c.Z,{component:"form",onSubmit:$,children:[(0,i.jsx)(d.Z,{variant:"h4",gutterBottom:!0,children:"Guest Checkout"}),(0,i.jsx)(R,{options:M}),(0,i.jsx)(m.Z,{required:!0,fullWidth:!0,label:"Name",name:"name",value:w.name,onChange:T,sx:{mb:2}}),(0,i.jsx)(m.Z,{required:!0,fullWidth:!0,label:"Email",name:"email",type:"email",value:w.email,onChange:T,sx:{mb:2}}),(0,i.jsx)(m.Z,{required:!0,fullWidth:!0,label:"Address",name:"address",value:w.address,onChange:T,sx:{mb:2}}),(0,i.jsx)(m.Z,{required:!0,fullWidth:!0,label:"City",name:"city",value:w.city,onChange:T,sx:{mb:2}}),(0,i.jsx)(m.Z,{required:!0,fullWidth:!0,label:"ZIP Code",name:"zip",value:w.zip,onChange:T,sx:{mb:2}}),(0,i.jsx)(x.Z,{variant:"contained",color:"primary",fullWidth:!0,type:"submit",disabled:!t||N,children:N?(0,i.jsx)(u.Z,{size:24}):"Place Order"})]})})}),(0,i.jsx)(l.ZP,{item:!0,xs:12,md:6,children:(0,i.jsxs)(o.Z,{elevation:3,sx:{padding:4},children:[(0,i.jsx)(d.Z,{variant:"h6",gutterBottom:!0,children:"Shopping Basket"}),(0,i.jsx)(h.Z,{children:0===e.items.length?(0,i.jsx)(d.Z,{variant:"body1",color:"text.secondary",children:"Your basket is empty"}):e.items.map(e=>(0,i.jsxs)(p.ZP,{sx:{display:"flex",alignItems:"center"},children:[(0,i.jsx)(c.Z,{component:"div",sx:{width:"100px",height:"100px",marginRight:"1rem",position:"relative"},children:(0,i.jsx)(S(),{src:e.images[0],alt:e.name,layout:"fill",objectFit:"cover",sizes:"(max-width: 600px) 100px, (max-width: 960px) 100px, 100px",loading:"lazy","aria-hidden":"true"})}),(0,i.jsx)(Z.Z,{primary:e.name,secondary:(0,i.jsxs)(c.Z,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[(0,i.jsxs)(d.Z,{variant:"body2",children:["Price: $",e.price.toFixed(2)]}),(0,i.jsxs)(d.Z,{variant:"body2",children:["Total: $",(e.price*e.quantity).toFixed(2)]})]})}),(0,i.jsxs)(c.Z,{display:"flex",alignItems:"center",children:[(0,i.jsx)(f.Z,{onClick:()=>z(e.id,e.quantity-1),"aria-label":"Decrease quantity",children:(0,i.jsx)(C.Z,{})}),(0,i.jsx)(d.Z,{variant:"body1",sx:{mx:1},children:e.quantity}),(0,i.jsx)(f.Z,{onClick:()=>z(e.id,e.quantity+1),"aria-label":"Increase quantity",children:(0,i.jsx)(P.Z,{})})]}),(0,i.jsx)(y.Z,{title:"Remove all quantities",children:(0,i.jsx)(f.Z,{edge:"end","aria-label":"Remove from basket",onClick:()=>F(e.id),children:(0,i.jsx)(_.Z,{})})})]},e.id))}),(0,i.jsx)(v.Z,{}),(0,i.jsx)(c.Z,{sx:{padding:"1rem"},children:(0,i.jsxs)(d.Z,{variant:"h6",children:["Total: $",I.toFixed(2)]})})]})})]})]})};var D=()=>(0,i.jsx)(k.Elements,{stripe:q,children:(0,i.jsx)(s.Z,{maxWidth:"lg",children:(0,i.jsx)(N,{})})}),T=()=>(0,i.jsx)(D,{})}},function(e){e.O(0,[903,260,196,491,774,888,179],function(){return e(e.s=5373)}),_N_E=e.O()}]);