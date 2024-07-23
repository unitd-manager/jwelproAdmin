(this["webpackJsonpmain-bt5"]=this["webpackJsonpmain-bt5"]||[]).push([[144,183],{1170:function(e,t,s){"use strict";s.r(t);var c=s(27),r=s(1),a=s(63),l=s(951),n=s(952),i=s.n(n),j=s(142),d=s(148),b=s(3);t.default=function(){var e=Object(l.a)(),t=e.register,s=e.handleSubmit,n=e.errors,m=Object(r.useState)({firstname:"",lastname:"",email:"",age:"",title:"",mobile:"",developer:""}),o=Object(c.a)(m,2),x=o[0],h=o[1];return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(j.a,{}),Object(b.jsx)(a.eb,{children:Object(b.jsx)(a.s,{sm:"12",children:Object(b.jsxs)(d.default,{title:"Form Validation",children:[Object(b.jsxs)(i.a,{onSubmit:s((function(e){h(e)})),children:[Object(b.jsxs)(a.C,{children:[Object(b.jsx)(a.H,{className:"control-Label",htmlFor:"firstname",children:"First name *"}),Object(b.jsx)("div",{className:"mb-2",children:Object(b.jsx)("input",{type:"text",name:"firstname",ref:t({required:!0}),className:"form-control"})}),Object(b.jsx)("span",{className:"text-danger",children:n.firstname&&"First name is required."})]}),Object(b.jsxs)(a.C,{children:[Object(b.jsx)(a.H,{className:"control-Label",htmlFor:"lastname",children:"Last name *"}),Object(b.jsx)("div",{className:"mb-2",children:Object(b.jsx)("input",{type:"text",name:"lastname",ref:t({required:!0}),className:"form-control"})}),Object(b.jsx)("span",{className:"text-danger",children:n.lastname&&"Last name is required."})]}),Object(b.jsxs)(a.C,{children:[Object(b.jsx)(a.H,{className:"control-Label",htmlFor:"username",children:"Username *"}),Object(b.jsx)("div",{className:"mb-2",children:Object(b.jsx)("input",{type:"text",name:"username",ref:t({required:!0}),className:"form-control"})}),Object(b.jsx)("span",{className:"text-danger",children:n.username&&"Username is required."})]}),Object(b.jsxs)(a.C,{children:[Object(b.jsx)(a.H,{className:"control-Label",htmlFor:"email",children:"Email *"}),Object(b.jsx)("div",{className:"mb-2",children:Object(b.jsx)("input",{type:"text",name:"email",ref:t({required:!0,pattern:/^\S+@\S+$/i}),className:"form-control"})}),Object(b.jsx)("span",{className:"text-danger",children:n.email&&"Email is required."})]}),Object(b.jsxs)(a.C,{children:[Object(b.jsx)(a.H,{className:"control-Label",htmlFor:"mobile",children:"Mobile No *"}),Object(b.jsx)("div",{className:"mb-2",children:Object(b.jsx)("input",{type:"text",name:"mobile",ref:t({required:!0,maxLength:11,minLength:8}),className:"form-control"})}),Object(b.jsx)("span",{className:"text-danger",children:n.mobile&&"Enter a Valid mobile number."})]}),Object(b.jsxs)(a.C,{children:[Object(b.jsx)(a.H,{className:"control-Label",htmlFor:"age",children:"Age *"}),Object(b.jsx)("div",{className:"mb-2",children:Object(b.jsx)("input",{type:"number",name:"age",ref:t({required:!0,pattern:/\d+/}),className:"form-control"})}),Object(b.jsx)("span",{className:"text-danger",children:n.age&&"Please enter number for age."})]}),Object(b.jsxs)(a.C,{children:[Object(b.jsx)(a.H,{className:"control-Label",htmlFor:"title",children:"Select Gender *"}),Object(b.jsx)("div",{className:"mb-2",children:Object(b.jsxs)("select",{name:"title",className:"form-control",ref:t({required:!0}),children:[Object(b.jsx)("option",{value:"",children:"Select Option"}),Object(b.jsx)("option",{value:"Mr",children:"Mr"}),Object(b.jsx)("option",{value:"Mrs",children:"Mrs"}),Object(b.jsx)("option",{value:"Miss",children:"Miss"})]})}),Object(b.jsx)("span",{className:"text-danger",children:n.title&&"Please select value."})]}),Object(b.jsxs)(a.C,{children:[Object(b.jsx)(a.H,{children:"Are you a developer?"}),Object(b.jsx)("br",{}),Object(b.jsxs)(a.C,{check:!0,inline:!0,children:[Object(b.jsx)(a.E,{name:"developer",type:"radio",value:"Yes",ref:t({required:!0})}),Object(b.jsx)(a.H,{check:!0,children:"Yes"})]}),Object(b.jsxs)(a.C,{check:!0,inline:!0,children:[Object(b.jsx)(a.E,{name:"developer",type:"radio",value:"No",ref:t({required:!0})}),Object(b.jsx)(a.H,{check:!0,children:"No"})]}),Object(b.jsx)("span",{className:"text-danger",children:n.developer&&"Please select value."})]}),Object(b.jsx)(a.C,{children:Object(b.jsx)(a.e,{className:"button btn-info",type:"submit",children:"Submit"})})]}),Object(b.jsx)("hr",{}),Object(b.jsx)("h4",{className:"mt-5",children:"Check Data after form submit"}),Object(b.jsxs)(a.I,{children:[Object(b.jsxs)(a.J,{children:["Firstname: ",x.firstname]}),Object(b.jsxs)(a.J,{children:["Lirstname: ",x.lastname]}),Object(b.jsxs)(a.J,{children:["Username: ",x.username]}),Object(b.jsxs)(a.J,{children:["Age: ",x.age]}),Object(b.jsxs)(a.J,{children:["Email Id: ",x.email]}),Object(b.jsxs)(a.J,{children:["Mobile No: ",x.mobile]}),Object(b.jsxs)(a.J,{children:["Gender: ",x.title]}),Object(b.jsxs)(a.J,{children:["Are you developer?: ",x.developer]})]})]})})})]})}},142:function(e,t,s){"use strict";var c=s(63),r=s(12),a=s(58),l=s(3);t.a=function(e){var t=Object(r.f)(),s=t.pathname.split("/")[1],n=t.pathname.split("/")[2];return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("h4",{children:e.heading}),Object(l.jsxs)(c.c,{children:[Object(l.jsx)(c.d,{to:"/",tag:a.b,className:"text-decoration-none",children:"Home"}),s?Object(l.jsx)(c.d,{active:!0,children:s}):"",n?Object(l.jsx)(c.d,{active:!0,children:n}):""]})]})}},148:function(e,t,s){"use strict";s.r(t);var c=s(63),r=(s(1),s(3));function a(e){var t=e.details,s=void 0===t?null:t,a=e.title;return Object(r.jsx)(r.Fragment,{children:Object(r.jsx)(c.o,{tag:"h4",className:"border-bottom px-4 py-3 mb-0",children:Object(r.jsxs)(c.eb,{children:[Object(r.jsx)(c.s,{children:a}),s&&Object(r.jsxs)(c.s,{children:[Object(r.jsx)(c.eb,{children:Object(r.jsxs)("small",{children:[" Creation: ",s&&s.created_by," ",s&&s.creation_date]})}),Object(r.jsx)(c.eb,{className:"d-flex",children:Object(r.jsxs)("small",{children:[" Modified: ",s&&s.modified_by," ",s&&s.modification_date]})})]})]})})})}t.default=function(e){var t=e.children,s=e.title,l=e.subtitle,n=e.creationModificationDate;return Object(r.jsxs)(c.i,{className:"shadow-none",children:[Object(r.jsx)(a,{details:n,title:s}),Object(r.jsxs)(c.j,{className:"p-4",children:[Object(r.jsx)(c.m,{className:"text-muted mb-3",children:l||""}),Object(r.jsx)("div",{children:t})]})]})}}}]);
//# sourceMappingURL=144.6c7b7242.chunk.js.map