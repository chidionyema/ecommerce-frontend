(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[800],{7443:function(e,r,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/shop",function(){return a(6721)}])},6200:function(e,r,a){"use strict";a.d(r,{Z:function(){return v}});var t=a(5893);a(7294);var i=a(6886),n=a(6242),s=a(9974),l=a(3965),c=a(4267),o=a(5861),d=a(5616),u=a(9417),h=a(3946),x=a(7354),p=a(9378);a(5397);var m=a(1163),g=a(1712),j=a(1227),y=a(6111),Z=a(1811),b=e=>{let{product:r}=e,a=(0,m.useRouter)(),{dispatch:i}=(0,g.K)(),{state:b,dispatch:v}=(0,j.E)(),k=()=>{v({type:"ADD_TO_WISHLIST",product:r})},C=()=>{v({type:"REMOVE_FROM_WISHLIST",id:r.id})};return(0,t.jsxs)(n.Z,{children:[(0,t.jsxs)(s.Z,{onClick:()=>{a.push("/ProductDetails?id=".concat(r.id))},children:[(0,t.jsx)(p.Z,{children:(0,t.jsx)(l.Z,{component:"img",height:"200",image:r.images[0],alt:r.name,style:{cursor:"pointer"}})}),(0,t.jsxs)(c.Z,{children:[(0,t.jsx)(o.Z,{gutterBottom:!0,variant:"h5",component:"div",children:r.name}),(0,t.jsx)(o.Z,{variant:"body2",color:"text.secondary",children:r.description}),(0,t.jsxs)(o.Z,{variant:"h6",color:"primary",children:["$",r.price.toFixed(2)]})]})]}),(0,t.jsxs)(d.Z,{sx:{textAlign:"center",padding:"1rem"},children:[(0,t.jsx)(u.Z,{variant:"contained",color:"primary",endIcon:(0,t.jsx)(x.Z,{}),onClick:()=>{if(r.inStock){let e={...r,quantity:1};i({type:"ADD_TO_BASKET",product:e})}},disabled:!r.inStock,children:r.inStock?"Add to Basket":"Out of Stock"}),(0,t.jsx)(h.Z,{onClick:()=>b.items.some(e=>e.id===r.id)?C():k(),children:b.items.some(e=>e.id===r.id)?(0,t.jsx)(y.Z,{color:"secondary"}):(0,t.jsx)(Z.Z,{})})]})]})},v=e=>{let{products:r}=e;return(0,t.jsx)(i.ZP,{container:!0,spacing:3,children:r.map(e=>(0,t.jsx)(i.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,t.jsx)(b,{product:e})},e.id))})}},1227:function(e,r,a){"use strict";a.d(r,{E:function(){return n}}),a(5893);var t=a(7294);let i=(0,t.createContext)({state:{items:[]},dispatch:()=>void 0}),n=()=>(0,t.useContext)(i)},6721:function(e,r,a){"use strict";a.r(r),a.d(r,{default:function(){return er}});var t=a(5893),i=a(7294),n=a(5616),s=a(6720),l=a(9588),c=a(3795),o=a(5861),d=a(1903),u=a(3946),h=a(4054),x=a(3841),p=a(315),m=a(431),g=a(6656),j=a(1292),y=a(6653),Z=a(7533),b=a(8462),v=a(891),k=a(9334),C=a(7720),f=a(9417),S=a(5970),_=a(1521),E=a(5500),A=a(4895),P=a(6540),R=a(1733),T=a(2761),O=a(1163),w=a(5675),I=a.n(w),B=a(9008),D=a.n(B),M=a(1712),L=a(8327),N=a(6200),H=a(1023),q=a(3619),F=e=>{let{currentPage:r,totalPages:a,onPageChange:i}=e;return(0,t.jsxs)(n.Z,{display:"flex",alignItems:"center",justifyContent:"center",mt:3,children:[(0,t.jsx)(u.Z,{disabled:1===r,onClick:()=>i(r-1),children:(0,t.jsx)(H.Z,{})}),(0,t.jsx)(o.Z,{variant:"body1",children:"".concat(r," of ").concat(a)}),(0,t.jsx)(u.Z,{disabled:r===a,onClick:()=>i(r+1),children:(0,t.jsx)(q.Z,{})})]})},W=[{id:"banner1",message:"Summer Sale! Get up to 50% off selected items.",active:!0,condition:()=>!0,imageUrl:"/images/summer-sale.jpg",gradient:"linear-gradient(to right, rgba(255, 0, 150, 0.7), rgba(0, 204, 255, 0.7))"},{id:"banner2",message:"New Arrivals! Check out the latest products.",active:!0,condition:()=>!0,imageUrl:"/images/new-arrivals.jpg",gradient:"linear-gradient(to right, rgba(0, 0, 255, 0.7), rgba(0, 255, 255, 0.7))"}];let K="SET_FILTER",Q="SET_CATEGORY",U="SET_PRICE_RANGE",G="SET_BRAND",z="SET_SORT",Y="SET_SEARCH_QUERY",$="SET_PAGE",V="TOGGLE_BASKET",X="HIDE_SNACKBAR",J={filter:"all",category:"all",priceRange:[0,1e3],brand:"all",sort:"priceAsc",searchQuery:"",currentPage:1,basketOpen:!1,snackbarOpen:!1,snackbarMessage:"",snackbarSeverity:"success",discount:0};function ee(e,r){switch(r.type){case K:return{...e,filter:r.payload};case Q:return{...e,category:r.payload};case U:return{...e,priceRange:r.payload};case G:return{...e,brand:r.payload};case z:return{...e,sort:r.payload};case Y:return{...e,searchQuery:r.payload};case $:return{...e,currentPage:r.payload};case V:return{...e,basketOpen:!e.basketOpen};case"SHOW_SNACKBAR":return{...e,snackbarOpen:!0,snackbarMessage:r.payload.message,snackbarSeverity:r.payload.severity};case X:return{...e,snackbarOpen:!1};case"APPLY_COUPON":return{...e,discount:r.payload.discount};default:return e}}var er=()=>{let{state:e}=(0,L.i)(),{state:r,dispatch:a}=(0,M.K)(),[w,B]=(0,i.useReducer)(ee,J),H=(0,O.useRouter)(),q=()=>B({type:V}),er=()=>B({type:X}),ea=(0,i.useCallback)(e=>{B({type:K,payload:e.target.value})},[]),et=(0,i.useCallback)(e=>{B({type:z,payload:e.target.value})},[]),ei=(0,i.useCallback)(e=>{B({type:Q,payload:e.target.value})},[]),en=(0,i.useCallback)((e,r)=>{B({type:U,payload:r})},[]),es=(0,i.useCallback)(e=>{B({type:G,payload:e.target.value})},[]),el=(0,i.useCallback)(e=>{B({type:$,payload:e})},[]),ec=(0,i.useCallback)(e=>{B({type:Y,payload:e.target.value})},[]),eo=(0,i.useMemo)(()=>e.products.filter(e=>("all"===w.filter||e.type===w.filter)&&("all"===w.category||e.category===w.category)&&("all"===w.brand||e.brand===w.brand)&&!(e.price<w.priceRange[0])&&!(e.price>w.priceRange[1])&&(!!e.name.toLowerCase().includes(w.searchQuery.toLowerCase())||!!e.description.toLowerCase().includes(w.searchQuery.toLowerCase()))),[e.products,w]),ed=(0,i.useMemo)(()=>eo.sort((e,r)=>"priceAsc"===w.sort?e.price-r.price:"priceDesc"===w.sort?r.price-e.price:"rating"===w.sort?r.rating-e.rating:0),[eo,w.sort]),eu=(0,i.useMemo)(()=>ed.slice((w.currentPage-1)*6,6*w.currentPage),[ed,w.currentPage]),eh=(0,i.useCallback)((e,r)=>{r<=0?a({type:"REMOVE_FROM_BASKET",id:e}):a({type:"UPDATE_BASKET_QUANTITY",id:e,quantity:r})},[a]),ex=(0,i.useCallback)(e=>{a({type:"REMOVE_ALL_QUANTITY",id:e})},[a]),ep=(0,i.useMemo)(()=>r.items.reduce((e,r)=>e+r.price*r.quantity,0),[r.items]),em=(0,i.useMemo)(()=>Math.ceil(eo.length/6),[eo.length]),eg=(0,i.useMemo)(()=>W.filter(e=>e.active&&e.condition()),[]);return(0,t.jsxs)(n.Z,{sx:{padding:{xs:"1rem",sm:"2rem"}},children:[(0,t.jsxs)(D(),{children:[(0,t.jsx)("title",{children:"Shop"}),(0,t.jsx)("meta",{name:"description",content:"Shop the best products online"}),(0,t.jsx)("meta",{name:"keywords",content:"shop, ecommerce, products, online store"})]}),(0,t.jsx)(s.ZP,{}),(0,t.jsxs)(l.Z,{"aria-label":"breadcrumb",sx:{mb:3},children:[(0,t.jsx)(c.Z,{color:"inherit",href:"/",children:"Home"}),(0,t.jsx)(o.Z,{color:"textPrimary",children:"Shop"})]}),(0,t.jsxs)(n.Z,{display:"flex",flexDirection:{xs:"column",sm:"row"},justifyContent:"space-between",alignItems:{xs:"flex-start",sm:"center"},mb:3,children:[(0,t.jsx)(o.Z,{variant:"h4",gutterBottom:!0,children:"Shop"}),(0,t.jsxs)(n.Z,{display:"flex",flexDirection:{xs:"column",sm:"row"},alignItems:"center",children:[(0,t.jsx)(d.Z,{variant:"outlined",placeholder:"Search...",value:w.searchQuery,onChange:ec,InputProps:{endAdornment:(0,t.jsx)(u.Z,{"aria-label":"search",children:(0,t.jsx)(T.Z,{})})},sx:{minWidth:200,mr:2}}),(0,t.jsxs)(h.Z,{variant:"outlined",sx:{minWidth:120,mr:2,mt:{xs:2,sm:0}},children:[(0,t.jsx)(x.Z,{children:"Filter"}),(0,t.jsxs)(p.Z,{value:w.filter,onChange:ea,label:"Filter",children:[(0,t.jsx)(m.Z,{value:"all",children:"All"}),(0,t.jsx)(m.Z,{value:"physical",children:"Physical"}),(0,t.jsx)(m.Z,{value:"digital",children:"Digital"})]})]}),(0,t.jsxs)(h.Z,{variant:"outlined",sx:{minWidth:120,mr:2,mt:{xs:2,sm:0}},children:[(0,t.jsx)(x.Z,{children:"Category"}),(0,t.jsxs)(p.Z,{value:w.category,onChange:ei,label:"Category",children:[(0,t.jsx)(m.Z,{value:"all",children:"All"}),(0,t.jsx)(m.Z,{value:"electronics",children:"Electronics"}),(0,t.jsx)(m.Z,{value:"apparel",children:"Apparel"}),(0,t.jsx)(m.Z,{value:"home",children:"Home"})]})]}),(0,t.jsxs)(h.Z,{variant:"outlined",sx:{minWidth:120,mr:2,mt:{xs:2,sm:0}},children:[(0,t.jsx)(x.Z,{children:"Brand"}),(0,t.jsxs)(p.Z,{value:w.brand,onChange:es,label:"Brand",children:[(0,t.jsx)(m.Z,{value:"all",children:"All"}),(0,t.jsx)(m.Z,{value:"brandA",children:"Brand A"}),(0,t.jsx)(m.Z,{value:"brandB",children:"Brand B"})]})]}),(0,t.jsxs)(n.Z,{sx:{minWidth:200,mr:2,mt:{xs:2,sm:0}},children:[(0,t.jsx)(o.Z,{gutterBottom:!0,children:"Price Range"}),(0,t.jsx)(g.ZP,{value:w.priceRange,onChange:en,valueLabelDisplay:"auto",min:0,max:1e3,"aria-labelledby":"price-range-slider"})]}),(0,t.jsxs)(h.Z,{variant:"outlined",sx:{minWidth:120,mr:2,mt:{xs:2,sm:0}},children:[(0,t.jsx)(x.Z,{children:"Sort"}),(0,t.jsxs)(p.Z,{value:w.sort,onChange:et,label:"Sort",children:[(0,t.jsx)(m.Z,{value:"priceAsc",children:"Price: Low to High"}),(0,t.jsx)(m.Z,{value:"priceDesc",children:"Price: High to Low"}),(0,t.jsx)(m.Z,{value:"rating",children:"Rating"})]})]}),(0,t.jsx)(j.Z,{title:"Open shopping basket",children:(0,t.jsx)(u.Z,{onClick:q,"aria-label":"Open shopping basket",children:(0,t.jsx)(y.Z,{badgeContent:r.items.reduce((e,r)=>e+r.quantity,0),color:"secondary",children:(0,t.jsx)(E.Z,{fontSize:"large"})})})})]})]}),eg.map(e=>(0,t.jsxs)(n.Z,{sx:{mb:2,p:2,borderRadius:1,backgroundImage:"url(".concat(e.imageUrl,")"),backgroundSize:"cover",backgroundPosition:"center",position:"relative",color:"#fff",textAlign:"center"},children:[(0,t.jsx)(n.Z,{sx:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:e.gradient,borderRadius:1}}),(0,t.jsx)(o.Z,{variant:"h5",sx:{position:"relative",zIndex:1},children:e.message})]},e.id)),(0,t.jsx)(N.Z,{products:eu}),(0,t.jsx)(F,{currentPage:w.currentPage,totalPages:em,onPageChange:el}),(0,t.jsx)(Z.ZP,{anchor:"right",open:w.basketOpen,onClose:q,children:(0,t.jsxs)(n.Z,{sx:{width:350,padding:"1rem"},children:[(0,t.jsx)(o.Z,{variant:"h6",gutterBottom:!0,children:"Shopping Basket"}),(0,t.jsx)(b.Z,{children:0===r.items.length?(0,t.jsxs)(n.Z,{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"20vh",children:[(0,t.jsx)(o.Z,{variant:"body1",color:"text.secondary",children:"Your basket is empty"}),(0,t.jsx)(I(),{src:"/empty-basket.png",alt:"Empty basket",width:150,height:150})]}):r.items.map(e=>(0,t.jsxs)(v.ZP,{sx:{display:"flex",alignItems:"center"},children:[(0,t.jsx)(n.Z,{component:"div",sx:{width:"100px",height:"100px",marginRight:"1rem",position:"relative"},children:(0,t.jsx)(I(),{src:e.images[0],alt:e.name,layout:"fill",objectFit:"cover",sizes:"(max-width: 600px) 100px, (max-width: 960px) 100px, 100px",loading:"lazy","aria-hidden":"true"})}),(0,t.jsx)(k.Z,{primary:e.name,secondary:(0,t.jsxs)(n.Z,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[(0,t.jsxs)(o.Z,{variant:"body2",children:["Price: $",e.price.toFixed(2)]}),(0,t.jsxs)(o.Z,{variant:"body2",children:["Total: $",(e.price*e.quantity).toFixed(2)]})]})}),(0,t.jsxs)(n.Z,{display:"flex",alignItems:"center",children:[(0,t.jsx)(u.Z,{onClick:()=>eh(e.id,e.quantity-1),"aria-label":"Decrease quantity",children:(0,t.jsx)(A.Z,{})}),(0,t.jsx)(o.Z,{variant:"body1",sx:{mx:1},children:e.quantity}),(0,t.jsx)(u.Z,{onClick:()=>eh(e.id,e.quantity+1),"aria-label":"Increase quantity",children:(0,t.jsx)(P.Z,{})})]}),(0,t.jsx)(j.Z,{title:"Remove all quantities",children:(0,t.jsx)(u.Z,{edge:"end","aria-label":"Remove from basket",onClick:()=>ex(e.id),children:(0,t.jsx)(R.Z,{})})})]},e.id))}),(0,t.jsx)(C.Z,{}),(0,t.jsxs)(n.Z,{sx:{padding:"1rem"},children:[(0,t.jsxs)(o.Z,{variant:"h6",children:["Total: $",ep.toFixed(2)]}),r.items.length>0&&(0,t.jsxs)(n.Z,{display:"flex",flexDirection:"column",gap:1,children:[(0,t.jsx)(f.Z,{variant:"contained",color:"primary",onClick:()=>{H.push("/checkout/shippingandpayment")},children:"Proceed to Checkout"}),(0,t.jsx)(f.Z,{variant:"outlined",color:"primary",onClick:()=>{H.push("/checkout/guest")},children:"Guest Checkout"})]})]})]})}),(0,t.jsx)(S.Z,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:w.snackbarOpen,autoHideDuration:3e3,onClose:er,children:(0,t.jsx)(_.Z,{onClose:er,severity:w.snackbarSeverity,children:w.snackbarMessage})})]})}}},function(e){e.O(0,[903,260,454,196,706,838,774,888,179],function(){return e(e.s=7443)}),_N_E=e.O()}]);