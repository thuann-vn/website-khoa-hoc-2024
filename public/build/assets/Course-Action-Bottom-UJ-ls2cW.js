import{r as t,j as s,d as a}from"./app-BKEzGz0K.js";const l=({checkMatchCourses:e})=>{const[c,i]=t.useState(!1);return t.useEffect(()=>{const r=()=>{const n=window.pageYOffset>4365;i(n)};return window.addEventListener("scroll",r),()=>{window.removeEventListener("scroll",r)}},[]),s.jsx(s.Fragment,{children:s.jsx("div",{className:`rbt-course-action-bottom ${c?"rbt-course-action-active":""}`,children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"row align-items-center",children:[s.jsx("div",{className:"col-lg-6 col-md-6",children:s.jsx("div",{className:"section-title text-center text-md-start",children:s.jsx("h5",{className:"title mb--0",children:e.courseTitle})})}),s.jsx("div",{className:"col-lg-6 col-md-6 mt_sm--15",children:s.jsxs("div",{className:"course-action-bottom-right rbt-single-group",children:[s.jsxs("div",{className:"rbt-single-list rbt-price large-size justify-content-center",children:[s.jsxs("span",{className:"current-price color-primary",children:["$",e.price]}),s.jsxs("span",{className:"off-price",children:["$",e.offPrice]})]}),s.jsx("div",{className:"rbt-single-list action-btn",children:s.jsx(a,{className:"rbt-btn btn-gradient hover-icon-reverse btn-md",href:"#",children:s.jsxs("span",{className:"icon-reverse-wrapper",children:[s.jsx("span",{className:"btn-text",children:"Purchase Now"}),s.jsx("span",{className:"btn-icon",children:s.jsx("i",{className:"feather-arrow-right"})}),s.jsx("span",{className:"btn-icon",children:s.jsx("i",{className:"feather-arrow-right"})})]})})})]})})]})})})})},m=l;export{m as C};
