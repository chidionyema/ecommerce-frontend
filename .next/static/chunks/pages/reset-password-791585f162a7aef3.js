(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6],{1173:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/reset-password",function(){return n(4667)}])},4667:function(e,t,n){"use strict";n.r(t);var s=n(5893),r=n(7294),a=n(7066);t.default=()=>{let[e,t]=(0,r.useState)(""),[n,i]=(0,r.useState)(""),[u,l]=(0,r.useState)(!1),d=async t=>{t.preventDefault(),l(!0);try{await a.Z.post("/auth/request-password-reset",{email:e}),i("Password reset link sent. Check your email.")}catch(e){i("Failed to send reset link. Please try again.")}finally{l(!1)}};return(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{children:"Reset Password"}),(0,s.jsxs)("form",{onSubmit:d,children:[(0,s.jsx)("input",{type:"email",placeholder:"Enter your email",value:e,onChange:e=>t(e.target.value),required:!0}),(0,s.jsx)("button",{type:"submit",disabled:u,children:u?"Sending...":"Send Reset Link"})]}),n&&(0,s.jsx)("p",{children:n})]})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=1173)}),_N_E=e.O()}]);