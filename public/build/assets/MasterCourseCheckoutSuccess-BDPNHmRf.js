import{q as i,j as n,a as c}from"./app-BKEzGz0K.js";import{G as r}from"./GuestLayout-BHKYrTrm.js";import{B as h}from"./BreadCrumb-C62x0SYf.js";import{c as l}from"./helper-nczUq3Rf.js";import"./bootstrap.bundle.min-BluACLJN.js";function d({order:e,course:a}){const{site_settings:s={},banks:t}=i().props;return n.jsxs(n.Fragment,{children:[n.jsx(c,{title:"Mua khóa học thành công"}),n.jsxs(r,{children:[n.jsx(h,{title:"Đăng ký khóa học thành công",text:a.name}),n.jsx("div",{className:"checkout_area bg-color-white rbt-section-gap",children:n.jsx("div",{className:"container",children:n.jsxs("div",{className:"row align-items-center",children:[n.jsx("div",{className:"col-lg-4",children:n.jsx("img",{src:`https://vietqr.co/api/generate/${s.bank_name}/${s.bank_number}/${s.bank_account}/${parseInt(e.total_price)}/Thanh toan don hang ${e.id}?isMask=0&logo=1&style=1&bg=39`,alt:"QR Code"})}),n.jsx("div",{className:"col-lg-8",children:n.jsxs("p",{className:"p-5",style:{lineHeight:"32px"},children:["Cảm ơn bạn đã đăng ký khóa học ",n.jsx("b",{children:a.name})," của chúng tôi. ",n.jsx("br",{}),"Vui lòng thanh toán để hoàn tất quá trình đăng ký: ",n.jsx("br",{}),n.jsx("br",{}),"- Số tiền cần thanh toán: ",n.jsx("b",{children:l(e.total_price)})," ",n.jsx("br",{}),"- Số tài khoản: ",n.jsx("b",{children:s.bank_number})," ",n.jsx("br",{}),"- Chủ tài khoản: ",n.jsx("b",{children:s.bank_account})," ",n.jsx("br",{}),"- Ngân hàng: ",n.jsx("b",{children:t[s.bank_name]})," ",n.jsx("br",{}),"- Nội dung chuyển khoản: ",n.jsx("b",{children:"Tên học viên - Số điện thoại"})," ",n.jsx("br",{}),n.jsx("br",{}),"Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua: ",n.jsx("br",{}),"Email: ",n.jsx("b",{children:s.email})," ",n.jsx("br",{}),"Hotline: ",n.jsx("b",{children:s.phone}),n.jsx("br",{}),"Facebook: ",n.jsx("b",{children:s.facebook}),n.jsx("br",{}),"Zalo: ",n.jsx("b",{children:s.zalo})]})})]})})})]})]})}export{d as default};
