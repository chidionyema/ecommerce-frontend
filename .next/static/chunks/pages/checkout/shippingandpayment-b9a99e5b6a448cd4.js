(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[459],{2981:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/checkout/shippingandpayment",function(){return i(9216)}])},9216:function(e,t,i){"use strict";i.r(t);var s=i(5893),r=i(7294),a=i(5582),n=i(6720),o=i(629),l=i(5861),c=i(6886),d=i(1903),m=i(6836),x=i(5071),h=i(5616),p=i(9417),u=i(8456),y=i(8462),j=i(891),g=i(9334),Z=i(3946),f=i(1292),b=i(7720),C=i(1163),v=i(7066),_=i(2859),P=i(6664),E=i(1712),k=i(4895),z=i(6540),B=i(1733),T=i(5675),w=i.n(T),q=i(4155);let S=(0,_.J)(q.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY),A={style:{base:{fontSize:"16px",color:"#424770","::placeholder":{color:"#aab7c4"},iconColor:"#c4f0ff"},invalid:{color:"#9e2146"}},hidePostalCode:!0},N=()=>{let{state:e,dispatch:t}=(0,E.K)(),i=(0,P.useStripe)(),_=(0,P.useElements)(),T=(0,C.useRouter)(),[q,S]=(0,r.useState)({name:"",address:"",city:"",state:"",zip:"",country:"GB"}),[N,R]=(0,r.useState)({name:"",address:"",city:"",state:"",zip:"",country:"GB"}),[I,U]=(0,r.useState)(!1),[O,D]=(0,r.useState)({name:!1,address:!1,city:!1,state:!1,zip:!1,country:!1}),[M,F]=(0,r.useState)(!1);(0,r.useMemo)(()=>e.items.every(e=>"digital"===e.type),[e.items]);let K=e=>{let{name:t,value:i}=e.target;e.target.closest(".billing-info")?R({...N,[t]:i}):(S({...q,[t]:i}),I&&R({...q,[t]:i})),""===i.trim()?D({...O,[t]:!0}):D({...O,[t]:!1})},L=e=>{let t={name:""===e.name.trim(),address:""===e.address.trim(),city:""===e.city.trim(),state:""===e.state.trim(),zip:""===e.zip.trim(),country:""===e.country.trim()};return D(t),!Object.values(t).some(Boolean)},W=async t=>{t.preventDefault();let s=L(q),r=!!I||L(N);if(s&&r&&i&&_){F(!0);try{let t=await v.Z.post("/api/checkout/create-session",{items:e.items}),s=t.data.id,r=_.getElement(P.CardElement),{error:a,paymentMethod:n}=await i.createPaymentMethod({type:"card",card:r,billing_details:{name:N.name,address:{line1:N.address,city:N.city,state:N.state,postal_code:N.zip,country:N.country}}});if(a){console.error("Error creating payment method",a),F(!1);return}let{error:o}=await i.confirmCardPayment(s,{payment_method:n.id});if(o){console.error("Error confirming card payment",o),F(!1);return}T.push("/checkout/thankyou")}catch(e){console.error("Error creating checkout session",e),F(!1)}}},Y=(0,r.useCallback)((e,i)=>{i<=0?t({type:"REMOVE_FROM_BASKET",id:e}):t({type:"UPDATE_BASKET_QUANTITY",id:e,quantity:i})},[t]),G=(0,r.useCallback)(e=>{t({type:"REMOVE_ALL_QUANTITY",id:e})},[t]),X=(0,r.useMemo)(()=>e.items.reduce((e,t)=>e+t.price*t.quantity,0),[e.items]);return(0,s.jsxs)(a.Z,{maxWidth:"md",sx:{mt:5},children:[(0,s.jsx)(n.ZP,{}),(0,s.jsxs)(o.Z,{elevation:4,sx:{padding:4,borderRadius:2,backgroundColor:"#ffffff"},children:[(0,s.jsx)(l.Z,{variant:"h4",gutterBottom:!0,align:"center",sx:{color:"#2c3e50"},children:"Checkout"}),(0,s.jsxs)(c.ZP,{container:!0,spacing:4,children:[(0,s.jsxs)(c.ZP,{item:!0,xs:12,md:6,children:[(0,s.jsx)(l.Z,{variant:"h6",gutterBottom:!0,sx:{color:"#34495e"},children:"Shipping Details"}),(0,s.jsxs)("form",{className:"shipping-info",children:[(0,s.jsx)(c.ZP,{container:!0,spacing:3,children:["name","address","city","state","zip","country"].map(e=>(0,s.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,s.jsx)(d.Z,{required:!0,fullWidth:!0,label:e.charAt(0).toUpperCase()+e.slice(1),name:e,value:q[e],onChange:K,error:O[e],helperText:O[e]&&"".concat(e.charAt(0).toUpperCase()+e.slice(1)," is required")})},e))}),(0,s.jsx)(m.Z,{control:(0,s.jsx)(x.Z,{checked:I,onChange:()=>{U(!I),I?R({name:"",address:"",city:"",state:"",zip:"",country:"GB"}):R(q)},name:"sameAsShipping",color:"primary"}),label:"Billing address is the same as shipping address",sx:{mt:2}})]})]}),(0,s.jsxs)(c.ZP,{item:!0,xs:12,md:6,children:[(0,s.jsx)(l.Z,{variant:"h6",gutterBottom:!0,sx:{color:"#34495e"},children:"Billing Details"}),(0,s.jsx)("form",{className:"billing-info",children:(0,s.jsx)(c.ZP,{container:!0,spacing:3,children:["name","address","city","state","zip","country"].map(e=>(0,s.jsx)(c.ZP,{item:!0,xs:12,sm:6,children:(0,s.jsx)(d.Z,{required:!0,fullWidth:!0,label:e.charAt(0).toUpperCase()+e.slice(1),name:e,value:I?q[e]:N[e],onChange:K,error:O[e],helperText:O[e]&&"".concat(e.charAt(0).toUpperCase()+e.slice(1)," is required"),disabled:I})},e))})})]}),(0,s.jsxs)(c.ZP,{item:!0,xs:12,children:[(0,s.jsx)(l.Z,{variant:"h6",gutterBottom:!0,sx:{color:"#34495e"},children:"Payment Details"}),(0,s.jsxs)("form",{onSubmit:W,children:[(0,s.jsxs)(h.Z,{sx:{border:"1px solid #dcdcdc",borderRadius:"4px",padding:"16px",mt:2},children:[(0,s.jsx)(P.CardElement,{options:A}),(0,s.jsx)(d.Z,{required:!0,fullWidth:!0,label:"Postal Code",name:"postalCode",value:N.zip,onChange:K,error:O.zip,helperText:O.zip&&"Postal Code is required",sx:{mt:2}})]}),(0,s.jsx)(p.Z,{variant:"contained",color:"primary",type:"submit",disabled:M,sx:{width:"100%",mt:3,py:1.5,backgroundColor:"#3498db","&:hover":{backgroundColor:"#2980b9"}},children:M?(0,s.jsx)(u.Z,{size:24,sx:{color:"white"}}):"Confirm Order"})]})]}),(0,s.jsxs)(c.ZP,{item:!0,xs:12,children:[(0,s.jsx)(l.Z,{variant:"h6",gutterBottom:!0,sx:{color:"#34495e"},children:"Shopping Basket"}),(0,s.jsx)(y.Z,{children:0===e.items.length?(0,s.jsx)(l.Z,{variant:"body1",color:"text.secondary",children:"Your basket is empty"}):e.items.map(e=>(0,s.jsxs)(j.ZP,{sx:{display:"flex",alignItems:"center"},children:[(0,s.jsx)(h.Z,{component:"div",sx:{width:"100px",height:"100px",marginRight:"1rem",position:"relative"},children:(0,s.jsx)(w(),{src:e.images[0],alt:e.name,layout:"fill",objectFit:"cover",sizes:"(max-width: 600px) 100px, (max-width: 960px) 100px, 100px",loading:"lazy","aria-hidden":"true"})}),(0,s.jsx)(g.Z,{primary:e.name,secondary:(0,s.jsxs)(h.Z,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[(0,s.jsxs)(l.Z,{variant:"body2",children:["Price: $",e.price.toFixed(2)]}),(0,s.jsxs)(l.Z,{variant:"body2",children:["Total: $",(e.price*e.quantity).toFixed(2)]})]})}),(0,s.jsxs)(h.Z,{display:"flex",alignItems:"center",children:[(0,s.jsx)(Z.Z,{onClick:()=>Y(e.id,e.quantity-1),"aria-label":"Decrease quantity",children:(0,s.jsx)(k.Z,{})}),(0,s.jsx)(l.Z,{variant:"body1",sx:{mx:1},children:e.quantity}),(0,s.jsx)(Z.Z,{onClick:()=>Y(e.id,e.quantity+1),"aria-label":"Increase quantity",children:(0,s.jsx)(z.Z,{})})]}),(0,s.jsx)(f.Z,{title:"Remove all quantities",children:(0,s.jsx)(Z.Z,{edge:"end","aria-label":"Remove from basket",onClick:()=>G(e.id),children:(0,s.jsx)(B.Z,{})})})]},e.id))}),(0,s.jsx)(b.Z,{}),(0,s.jsx)(h.Z,{sx:{padding:"1rem",textAlign:"right"},children:(0,s.jsxs)(l.Z,{variant:"h6",sx:{color:"#e74c3c"},children:["Total: $",X.toFixed(2)]})})]})]})]})]})};t.default=()=>(0,s.jsx)(P.Elements,{stripe:S,children:(0,s.jsx)(N,{})})}},function(e){e.O(0,[903,260,196,931,491,774,888,179],function(){return e(e.s=2981)}),_N_E=e.O()}]);