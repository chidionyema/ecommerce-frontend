"use strict";(()=>{var e={};e.id=271,e.ids=[271],e.modules={75600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},96762:(e,n)=>{Object.defineProperty(n,"M",{enumerable:!0,get:function(){return function e(n,r){return r in n?n[r]:"then"in n&&"function"==typeof n.then?n.then(n=>e(n,r)):"function"==typeof n&&"default"===r?n:void 0}}})},61667:(e,n,r)=>{r.r(n),r.d(n,{config:()=>d,default:()=>c,routeModule:()=>l});var t={};r.r(t),r.d(t,{default:()=>p});var s=r(89947),o=r(2706),a=r(96762);let i=require("nodemailer");var u=r.n(i);async function p(e,n){if("POST"!==e.method)return n.status(405).json({message:"Method not allowed"});let{name:r,email:t,phone:s,message:o,selectedPlan:a}=e.body,i=u().createTransport({service:"Gmail",auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS}});try{await i.sendMail({from:`"Website Contact" <${process.env.EMAIL_USER}>`,to:process.env.ADMIN_EMAIL,subject:`New ${a} Inquiry`,html:`
        <h2>New Contact Form Submission</h2>
        <p><strong>Plan:</strong> ${a}</p>
        <p><strong>Name:</strong> ${r}</p>
        <p><strong>Email:</strong> ${t}</p>
        <p><strong>Phone:</strong> ${s||"Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${o}</p>
      `}),await i.sendMail({from:`"${process.env.COMPANY_NAME}" <${process.env.EMAIL_USER}>`,to:t,subject:"Thank you for contacting us!",html:`
        <h2>We've received your inquiry</h2>
        <p>Thank you ${r} for contacting us about our ${a} services.</p>
        <p>We'll respond to your message within 24 hours.</p>
        <p><strong>Your message:</strong></p>
        <p>${o}</p>
      `}),n.status(200).json({success:!0})}catch(e){console.error("Error sending email:",e),n.status(500).json({message:"Error sending message"})}}let c=(0,a.M)(t,"default"),d=(0,a.M)(t,"config"),l=new s.PagesAPIRouteModule({definition:{kind:o.A.PAGES_API,page:"/api/sendEmail",pathname:"/api/sendEmail",bundlePath:"",filename:""},userland:t})},2706:(e,n)=>{Object.defineProperty(n,"A",{enumerable:!0,get:function(){return r}});var r=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},89947:(e,n,r)=>{e.exports=r(75600)}};var n=require("../../webpack-api-runtime.js");n.C(e);var r=n(n.s=61667);module.exports=r})();