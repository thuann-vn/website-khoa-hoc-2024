import{W as x,r as h,j as s,a as j,d as f}from"./app-BKEzGz0K.js";import{G as w}from"./GuestLayout-BHKYrTrm.js";import{T as l,I as o}from"./TextInput-CiBVIDRp.js";import{I as i}from"./InputLabel-C7utLVK-.js";import{P as g}from"./PrimaryButton-BqlALMXI.js";import"./bootstrap.bundle.min-BluACLJN.js";function C({status:a,canResetPassword:n}){const{data:r,setData:t,post:d,processing:c,errors:m,reset:u}=x({email:"",password:"",remember:!1});h.useEffect(()=>()=>{u("password")},[]);const p=e=>{e.preventDefault(),d(route("login"))};return s.jsxs(w,{children:[s.jsx(j,{title:"Log in"}),s.jsx("div",{className:"container mt-5 mb-5",children:s.jsx("div",{className:"row",children:s.jsx("div",{className:"col-md-6 offset-3",children:s.jsxs("div",{className:"discount-coupon edu-bg-shade",children:[s.jsx("div",{className:"section-title text-start",children:s.jsx("h4",{className:"title mb--30",children:"Đăng nhập"})}),a&&s.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:a}),s.jsxs("form",{onSubmit:p,children:[s.jsxs("div",{className:"rbt-form-group",children:[s.jsx(i,{htmlFor:"email",value:"Email"}),s.jsx(l,{id:"email",type:"email",name:"email",value:r.email,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,onChange:e=>t("email",e.target.value)}),s.jsx(o,{message:m.email,className:"mt-2"})]}),s.jsxs("div",{className:"mt-4",children:[s.jsx(i,{htmlFor:"password",value:"Password"}),s.jsx(l,{id:"password",type:"password",name:"password",value:r.password,className:"mt-1 block w-full",autoComplete:"current-password",onChange:e=>t("password",e.target.value)}),s.jsx(o,{message:m.password,className:"mt-2"})]}),s.jsxs("div",{className:"d-flex align-items-center justify-end mt-4",children:[n&&s.jsx(f,{href:route("password.request"),className:"flex-grow-1 text-nowrap me-5 w-50",children:"Quên mật khẩu?"}),s.jsx(g,{disabled:c,children:"Đăng nhập"})]})]})]})})})})]})}export{C as default};
