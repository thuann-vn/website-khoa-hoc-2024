import{j as s,d as r,a as c}from"./app-BKEzGz0K.js";import{G as d}from"./GuestLayout-BHKYrTrm.js";import{f as m}from"./helper-nczUq3Rf.js";import"./bootstrap.bundle.min-BluACLJN.js";const o=({matchedBlog:e})=>{var i;return s.jsx(s.Fragment,{children:s.jsxs("div",{className:"content",children:[s.jsx("div",{className:"post-thumbnail mb--30 position-relative wp-block-image alignwide",children:s.jsxs("figure",{children:[e.media&&s.jsx("img",{src:(i=e.media)==null?void 0:i.url,width:1085,height:645,alt:"Blog Images"}),s.jsx("figcaption",{children:e.description})]})}),s.jsx("div",{dangerouslySetInnerHTML:{__html:e.content}})]})})},h=o,x=({matchedBlog:e})=>{var i;return s.jsx(s.Fragment,{children:s.jsxs("div",{className:"breadcrumb-image-container breadcrumb-style-max-width",children:[s.jsx("div",{className:"breadcrumb-image-wrapper",children:s.jsx("img",{src:"/images/bg/bg-image-10.jpg",alt:"Education Images"})}),s.jsxs("div",{className:"breadcrumb-content-top text-center",children:[s.jsxs("ul",{className:"meta-list justify-content-center mb--10",children:[s.jsx("li",{className:"list-item",children:s.jsx("div",{className:"author-thumbnail",children:e&&s.jsx("img",{src:(i=e.media)==null?void 0:i.url,width:494,height:494,style:{objectFit:"cover"}})})}),e&&s.jsxs("li",{className:"list-item",children:[s.jsx("i",{className:"feather-clock"}),s.jsx("span",{children:m(e.published_at)})]})]}),e&&s.jsx("h1",{className:"title",children:e.title})]})]})})},g=x,j=({start:e,end:i,selectedBlogs:a})=>s.jsx(s.Fragment,{children:a&&a.slice(e,i).map((t,n)=>{var l;return s.jsxs("div",{className:"rbt-card card-list variation-02 rbt-hover mt--30",children:[s.jsx("div",{className:"rbt-card-img",children:s.jsxs(r,{href:route("blog.detail",{slug:t.slug}),children:[s.jsx("img",{src:((l=t.media)==null?void 0:l.url)||"/images/blog/blog-single-03.png",width:580,height:300,alt:"Card image"})," "]})}),s.jsxs("div",{className:"rbt-card-body",children:[s.jsx("h5",{className:"rbt-card-title",children:s.jsx(r,{href:route("blog.detail",{slug:t.slug}),children:t.title})}),s.jsx("div",{className:"rbt-card-bottom",children:s.jsxs(r,{className:"transparent-button",href:route("blog.detail",{slug:t.slug}),children:["Đọc thêm",s.jsx("i",{children:s.jsx("svg",{width:"17",height:"12",xmlns:"http://www.w3.org/2000/svg",children:s.jsxs("g",{stroke:"#27374D",fill:"none",fillRule:"evenodd",children:[s.jsx("path",{d:"M10.614 0l5.629 5.629-5.63 5.629"}),s.jsx("path",{strokeLinecap:"square",d:"M.663 5.572h14.594"})]})})})]})})]})]},n)})}),b=j;function f({post:e,relatedPosts:i}){return console.log(i),s.jsxs(s.Fragment,{children:[s.jsx(c,{title:e.title}),s.jsx(d,{children:s.jsxs("div",{className:"rbt-overlay-page-wrapper",children:[s.jsx(g,{matchedBlog:e}),s.jsx("div",{className:"rbt-blog-details-area rbt-section-gapBottom breadcrumb-style-max-width",children:s.jsxs("div",{className:"blog-content-wrapper rbt-article-content-wrapper",children:[s.jsx(h,{matchedBlog:e}),i&&i.length?s.jsxs("div",{className:"related-post pt--60",children:[s.jsxs("div",{className:"section-title text-start mb--40",children:[s.jsx("span",{className:"subtitle bg-primary-opacity",children:"Bài viết liên quan"}),s.jsx("h4",{className:"title",children:"Có thể bạn quan tâm"})]}),s.jsx(b,{selectedBlogs:i,start:0,end:4})]}):null]})})]})})]})}export{f as default};