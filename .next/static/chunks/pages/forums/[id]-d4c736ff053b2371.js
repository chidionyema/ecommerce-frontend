(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[675],{3384:function(n,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/forums/[id]",function(){return t(3053)}])},3053:function(n,r,t){"use strict";t.r(r);var i=t(5893);t(7294);var s=t(1163),e=t(5904),o=t(5861),a=t(5582),c=t(629),d=t(5616),u=t(9417);r.default=()=>{let n=(0,s.useRouter)(),{id:r}=n.query,{state:t,loading:h,error:l}=(0,e.S)(),x=t.forums.find(n=>n.id===r);return h?(0,i.jsx)(o.Z,{children:"Loading..."}):l?(0,i.jsx)(o.Z,{children:l}):x?(0,i.jsx)(a.Z,{maxWidth:"lg",sx:{mt:4,mb:4},children:(0,i.jsxs)(c.Z,{elevation:3,sx:{p:4},children:[(0,i.jsx)(o.Z,{variant:"h4",gutterBottom:!0,children:x.title}),(0,i.jsx)(o.Z,{variant:"body1",paragraph:!0,children:x.description}),(0,i.jsxs)(d.Z,{sx:{mt:2},children:[(0,i.jsx)(o.Z,{variant:"h6",gutterBottom:!0,children:"Posts"}),x.posts.map(n=>(0,i.jsxs)(c.Z,{elevation:1,sx:{p:2,mb:2},children:[(0,i.jsx)(o.Z,{variant:"body1",children:n.content}),(0,i.jsxs)(o.Z,{variant:"caption",children:["By ",n.author]})]},n.id))]}),(0,i.jsx)(u.Z,{variant:"contained",color:"primary",onClick:()=>n.push("/forums"),children:"Back to Forums"})]})}):(0,i.jsx)(o.Z,{children:"Forum not found"})}}},function(n){n.O(0,[774,888,179],function(){return n(n.s=3384)}),_N_E=n.O()}]);