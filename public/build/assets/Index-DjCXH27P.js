import{j as e,d as c,r as t,a as P}from"./app-BKEzGz0K.js";import{G as T}from"./GuestLayout-BHKYrTrm.js";import{u as w}from"./bootstrap.bundle.min-BluACLJN.js";import{P as C}from"./Pagination-D0ltLcIx.js";import{g as f,c as S}from"./helper-nczUq3Rf.js";const $=({category:s,courses:r})=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"rbt-banner-content-top",children:e.jsx("div",{className:"container",children:e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-lg-12",children:[e.jsxs("ul",{className:"page-list",children:[e.jsx("li",{className:"rbt-breadcrumb-item",children:e.jsx(c,{href:"/",children:"Trang chủ"})}),e.jsx("li",{children:e.jsx("div",{className:"icon-right",children:e.jsx("i",{className:"feather-chevron-right"})})}),e.jsx("li",{className:"rbt-breadcrumb-item active",children:s?s.name:"Tất cả khóa học"})]}),e.jsxs("div",{className:" title-wrapper",children:[e.jsxs("h1",{className:"title mb--0",children:[" ",s?s.name:"Tất cả khóa học"]}),e.jsxs(c,{href:"#",className:"rbt-badge-2",children:[e.jsx("div",{className:"image",children:"🎉"}),r==null?void 0:r.length," Khóa học"]})]}),e.jsx("p",{className:"description",children:s&&s.description?s.description:"Danh sách tất cả khóa học của chúng tôi"})]})})})})}),F=({category:s,courses:r})=>{const{toggle:a,setToggle:l}=w();return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"rbt-page-banner-wrapper",children:[e.jsx("div",{className:"rbt-banner-image"}),e.jsxs("div",{className:"rbt-banner-content",children:[e.jsx($,{category:s,courses:r}),e.jsx("div",{className:"rbt-course-top-wrapper mt--40 mt_sm--20",children:e.jsx("div",{className:"container",children:e.jsx("div",{className:"row g-5 align-items-center",children:e.jsx("div",{className:"col-lg-5 col-md-12",children:e.jsxs("div",{className:"rbt-sorting-list d-flex flex-wrap align-items-center",children:[e.jsx("div",{className:"rbt-short-item switch-layout-container",children:e.jsxs("ul",{className:"course-switch-layout",children:[e.jsx("li",{className:"course-switch-item",children:e.jsxs("button",{className:`rbt-grid-view ${a?"active":""}`,title:"Grid Layout",onClick:()=>l(!a),children:[e.jsx("i",{className:"feather-grid"})," ",e.jsx("span",{className:"text",children:"Dạng lưới"})]})}),e.jsx("li",{className:"course-switch-item",children:e.jsxs("button",{className:`rbt-grid-view ${a?"":"active"}`,title:"List Layout",onClick:()=>l(!a),children:[e.jsx("i",{className:"feather-list"})," ",e.jsx("span",{className:"text",children:"Danh sách"})]})})]})}),s&&e.jsx("div",{className:"rbt-short-item",children:s.id?e.jsxs("span",{className:"course-index",children:["Đang hiển thị từ 1-",s.id," của ",s.id]}):e.jsxs("span",{className:"course-index",children:["Đang hiển thị 1-",s.length/2," của ",s.length," ","kết quả"]})})]})})})})})]})]})})},E=F,G=({course:s,start:r,end:a})=>{const{toggle:l}=w(),[h,d]=t.useState([]),[o,m]=t.useState(1),[x,n]=t.useState(0),j=(o-1)*6,g=h.slice(j,j+6),N=i=>{m(i),window.scrollTo({top:0,behavior:"smooth"})};return t.useEffect(()=>{d(s),n(Math.ceil(s.length/6))},[n,d,g]),e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`rbt-course-grid-column ${l?"":"active-list-view"}`,children:s.slice(r,a).map((i,k)=>{var u,b,v,p;return e.jsx("div",{className:"course-grid-3",children:e.jsxs("div",{className:`rbt-card variation-01 rbt-hover ${l?"":"card-list-2"}`,children:[e.jsx("div",{className:"rbt-card-img",children:e.jsxs(c,{href:route("courses-detail",i.slug),children:[e.jsx("img",{src:f(i.image),width:355,height:244,alt:"Card image"}),i.offPrice>0?e.jsxs("div",{className:"rbt-badge-3 bg-white",children:[e.jsxs("span",{children:["-",i.offPrice,"%"]}),e.jsx("span",{children:"Off"})]}):""]})}),e.jsxs("div",{className:"rbt-card-body",children:[e.jsx("h4",{className:"rbt-card-title",children:e.jsx(c,{href:route("courses-detail",i.slug),children:i.name})}),e.jsx("ul",{className:"rbt-meta",children:e.jsxs("li",{children:[e.jsx("i",{className:"feather-book"}),i.course_lesson_count," bài học"]})}),e.jsx("p",{className:"rbt-card-text",children:i.description}),e.jsxs("div",{className:"rbt-author-meta mb--10",children:[e.jsx("div",{className:"rbt-avater",children:e.jsx(c,{href:route("courses-detail",i.slug),children:e.jsx("img",{src:f((u=i.teacher)==null?void 0:u.image),width:33,height:33,alt:(b=i.teacher)==null?void 0:b.name})})}),e.jsxs("div",{className:"rbt-author-info",children:["Giáo viên "," ",e.jsx(c,{href:`/teacher/${i.id}`,children:(v=i.teacher)==null?void 0:v.name})," ","trong ",e.jsx(c,{href:"#",children:(p=i.category)==null?void 0:p.name})]})]}),e.jsxs("div",{className:"rbt-card-bottom",children:[e.jsx("div",{className:"rbt-price",children:e.jsx("span",{className:"current-price",children:S(i.price)})}),e.jsxs(c,{className:"rbt-btn-link",href:`/course-details/${i.id}`,children:["Xem thêm",e.jsx("i",{className:"feather-arrow-right"})]})]})]})]})},k)})}),s.length>6?e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-lg-12 mt--60",children:e.jsx(C,{totalPages:x,pageNumber:o,handleClick:N})})}):""]})},I=G;function B({courses:s,category:r}){const[a,l]=t.useState([]),[h,d]=t.useState(1),[o,m]=t.useState(0);let x=s;const n=(h-1)*6,j=s.slice(n,n+6),g=N=>{d(N),window.scrollTo({top:0,behavior:"smooth"})};return t.useEffect(()=>{m(Math.ceil(x.length/6))},[m,l]),e.jsxs(e.Fragment,{children:[e.jsx(P,{title:r?r.name:"Tất cả các khóa học"}),e.jsxs(T,{children:[e.jsx(E,{courses:s,category:r}),e.jsx("div",{className:"rbt-section-overlayping-top rbt-section-gapBottom",children:e.jsx("div",{className:"inner",children:e.jsxs("div",{className:"container",children:[e.jsx(I,{course:j,start:0,end:1}),x.length>6?e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-lg-12 mt--60",children:e.jsx(C,{totalPages:o,pageNumber:h,handleClick:g})})}):""]})})})]})]})}export{B as default};
