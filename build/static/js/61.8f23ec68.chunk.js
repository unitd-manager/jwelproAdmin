(this["webpackJsonpmain-bt5"]=this["webpackJsonpmain-bt5"]||[]).push([[61,183],{142:function(e,t,c){"use strict";var n=c(63),a=c(12),s=c(58),i=c(3);t.a=function(e){var t=Object(a.f)(),c=t.pathname.split("/")[1],r=t.pathname.split("/")[2];return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("h4",{children:e.heading}),Object(i.jsxs)(n.c,{children:[Object(i.jsx)(n.d,{to:"/",tag:s.b,className:"text-decoration-none",children:"Home"}),c?Object(i.jsx)(n.d,{active:!0,children:c}):"",r?Object(i.jsx)(n.d,{active:!0,children:r}):""]})]})}},143:function(e,t,c){"use strict";var n=c(159);c(184);t.a=function(e,t){return"success"===t?n.b.success(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"error"===t?n.b.error(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"info"===t?n.b.info(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"warning"===t?n.b.warning(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):Object(n.b)(e)}},1449:function(e,t,c){"use strict";c.r(t);var n=c(2),a=c(9),s=c(27),i=c(1),r=c(12),o=(c(270),c(271),c(576)),l=c(159),d=c(63),j=c(142),b=c(143),u=c(7),h=c(763),O=c(764),x=c(202),p=c(308),f=c(307),m=c(148),g=c(3);t.default=function(){var e=Object(i.useState)(),t=Object(s.a)(e,2),c=t[0],y=t[1],v=Object(i.useState)("1"),C=Object(s.a)(v,2),w=C[0],_=C[1],N=Object(i.useState)(!1),k=Object(s.a)(N,2),P=k[0],S=k[1],T=Object(i.useState)(""),D=Object(s.a)(T,2),E=D[0],M=D[1],H=Object(i.useState)(""),F=Object(s.a)(H,2),I=F[0],B=F[1],A=Object(i.useState)(),U=Object(s.a)(A,2),L=U[0],Y=U[1],G=Object(i.useState)(),R=Object(s.a)(G,2),J=R[0],V=R[1],z=Object(i.useState)({modelType:""}),q=Object(s.a)(z,2),W=q[0],K=q[1],Q=Object(i.useState)(!1),X=Object(s.a)(Q,2),Z=X[0],$=X[1],ee=Object(r.h)().id,te=Object(r.g)();return Object(i.useEffect)((function(){u.a.post("/category/getCategoryById",{category_id:ee}).then((function(e){y(e.data.data[0])})).catch((function(){Object(b.a)("category Data Not Found","info")})),u.a.get("/category/getSectionTitle").then((function(e){Y(e.data.data)})).catch((function(){Object(b.a)("Section not found","info")})),u.a.get("/category/get-ValueList").then((function(e){V(e.data.data)})).catch((function(){Object(b.a)("valuelist not found","info")}))}),[ee]),Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(j.a,{}),Object(g.jsx)(l.a,{}),Object(g.jsx)(h.a,{editCategoryData:function(){c.modification_date=x.a,""!==c.category_title?u.a.post("/category/editCategory",c).then((function(){Object(b.a)("Record editted successfully","success")})).catch((function(){Object(b.a)("Unable to edit record.","error")})):Object(b.a)("Please fill all required fields","warning")},navigate:te,applyChanges:function(){},saveChanges:function(){""!==c.category_title&&te("/Category")},deleteCategoryData:function(){u.a.post("/category/deleteCategory",{category_id:ee}).then((function(){Object(b.a)("Record deteled successfully","success")})).catch((function(){Object(b.a)("Unable to delete record.","error")}))},backToList:function(){te("/Category")},id:ee}),Object(g.jsx)(O.a,{categoryDetails:c,handleInputs:function(e){y(Object(a.a)(Object(a.a)({},c),{},Object(n.a)({},e.target.name,e.target.value)))},section:L,valuelist:J}),Object(g.jsxs)(m.default,{children:[Object(g.jsx)(l.a,{}),Object(g.jsx)(d.R,{tabs:!0,children:Object(g.jsx)(d.S,{children:Object(g.jsx)(d.T,{className:"1"===w?"active":"",onClick:function(){var e;w!==(e="1")&&_(e)},children:"Picture"})})}),Object(g.jsx)(d.gb,{className:"p-4",activeTab:w,children:Object(g.jsx)(d.hb,{tabId:"1",children:Object(g.jsx)(d.A,{children:Object(g.jsxs)(d.C,{children:[Object(g.jsx)(d.eb,{children:Object(g.jsx)(d.s,{xs:"12",md:"3",className:"mb-3",children:Object(g.jsx)(d.e,{className:"shadow-none",color:"primary",onClick:function(){M("Category"),B(["JPG","JPEG","PNG","GIF","OGG","MP3","WAV","M4A"]),K({modelType:"picture"}),S(!0)},children:Object(g.jsx)(o.a,{className:"rounded-circle",width:"20"})})})}),Object(g.jsx)(f.a,{moduleId:ee,attachmentModal:P,setAttachmentModal:S,roomName:E,fileTypes:I,altTagData:"Category Data",desc:"Category Data",recordType:"Picture",mediaType:W.modelType,update:Z,setUpdate:$}),Object(g.jsx)(p.a,{moduleId:ee,roomName:"Category",recordType:"Picture",update:Z,setUpdate:$})]})})})})]})]})}},148:function(e,t,c){"use strict";c.r(t);var n=c(63),a=(c(1),c(3));function s(e){var t=e.details,c=void 0===t?null:t,s=e.title;return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(n.o,{tag:"h4",className:"border-bottom px-4 py-3 mb-0",children:Object(a.jsxs)(n.eb,{children:[Object(a.jsx)(n.s,{children:s}),c&&Object(a.jsxs)(n.s,{children:[Object(a.jsx)(n.eb,{children:Object(a.jsxs)("small",{children:[" Creation: ",c&&c.created_by," ",c&&c.creation_date]})}),Object(a.jsx)(n.eb,{className:"d-flex",children:Object(a.jsxs)("small",{children:[" Modified: ",c&&c.modified_by," ",c&&c.modification_date]})})]})]})})})}t.default=function(e){var t=e.children,c=e.title,i=e.subtitle,r=e.creationModificationDate;return Object(a.jsxs)(n.i,{className:"shadow-none",children:[Object(a.jsx)(s,{details:r,title:c}),Object(a.jsxs)(n.j,{className:"p-4",children:[Object(a.jsx)(n.m,{className:"text-muted mb-3",children:i||""}),Object(a.jsx)("div",{children:t})]})]})}},202:function(e,t,c){"use strict";var n=c(187),a=c.n(n)()().format("DD-MM-YYYY h:mm:ss a");t.a=a},270:function(e,t,c){},271:function(e,t,c){},272:function(e,t,c){"use strict";var n=c(63),a=c(3),s={textAlign:"right",marginRight:"10px"},i={outline:"none",border:"none"};t.a=function(e){var t=e.children;return Object(a.jsx)(n.i,{className:"shadow-none",children:Object(a.jsx)(n.j,{style:s,children:Object(a.jsx)("div",{className:"btn btn-space text-nowrap shadow-none outline-none",style:i,children:t})})})}},307:function(e,t,c){"use strict";var n=c(27),a=c(1),s=c(63),i=c(372),r=c(7),o=c(143),l=c(3);t.a=function(e){var t=e.attachmentModal,c=e.setAttachmentModal,d=e.moduleId,j=e.roomName,b=e.fileTypes,u=e.altTagData,h=e.desc,O=Object(a.useState)([]),x=Object(n.a)(O,2),p=x[0],f=x[1],m=Object(a.useState)(),g=Object(n.a)(m,2),y=g[0],v=g[1],C=Object(a.useState)(null),w=Object(n.a)(C,2),_=w[0],N=w[1];return Object(l.jsx)("div",{children:Object(l.jsxs)(s.N,{isOpen:t,children:[Object(l.jsx)(s.Q,{children:"Upload Media"}),Object(l.jsxs)(s.O,{children:[Object(l.jsxs)(s.C,{children:[Object(l.jsx)(i.a,{multiple:!0,handleChange:function(e){var t=Object.entries(e).map((function(e){return e[1]}));f(e),v(t),console.log(e)},name:"file",types:b}),y?y.map((function(e){return Object(l.jsx)("div",{children:Object(l.jsxs)("span",{children:[" Name: ",e.name," "]})})})):Object(l.jsx)("span",{children:"No file selected"})]}),_&&Object(l.jsx)("div",{className:"progress mt-2",children:Object(l.jsx)("div",{className:"progress-bar h-4",role:"progressbar","aria-valuenow":_,"aria-valuemin":"0","aria-valuemax":"100",style:{width:"".concat(_,"%")},children:"".concat(_,"% uploaded")})})]}),Object(l.jsxs)(s.P,{children:[Object(l.jsx)(s.e,{color:"primary",className:"shadow-none",onClick:function(){!function(){if(p){var e=new FormData;Object.entries(p).map((function(e){return e[1]})).forEach((function(t){e.append("files",t)})),e.append("record_id",d),e.append("room_name",j),e.append("alt_tag_data",u),e.append("description",h),r.a.post("/file/uploadFiles",e,{onUploadProgress:function(e){console.log(Math.round(e.loaded/e.total*100)),N(Math.round(e.loaded/e.total*100))}}).then((function(){Object(o.a)("Files Uploaded Successfully","success")})).catch((function(){c(!1),Object(o.a)("Unable to upload File","error")}))}else Object(o.a)("No files selected","info")}()},children:"Upload"}),Object(l.jsx)(s.e,{color:"secondary",className:"shadow-none",onClick:function(){window.location.reload(),c(!1)},children:"Cancel"})]})]})})}},308:function(e,t,c){"use strict";var n=c(27),a=c(1),s=c(291),i=c.n(s),r=c(500),o=c(143),l=c(7),d=c(3);t.a=function(e){var t=e.moduleId,c=e.roomName,s={},j=Object(a.useState)(null),b=Object(n.a)(j,2),u=b[0],h=b[1];return Object(a.useEffect)((function(){l.a.post("/file/getListOfFiles",{record_id:t,room_name:c}).then((function(e){h(e.data)}))}),[]),Object(d.jsx)(d.Fragment,{children:Object(d.jsxs)("table",{style:s,children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{style:s,children:[Object(d.jsx)("th",{style:s,children:"File Name"}),Object(d.jsx)("th",{width:"5%"})]})}),Object(d.jsx)("tbody",{children:u?u.map((function(e){return Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{style:s,children:Object(d.jsx)("a",{href:"https://emsweb.unitdtechnologies.com/storage/uploads/".concat(e.name),target:"_blank",rel:"noreferrer",children:e.name})}),Object(d.jsx)("td",{style:s,children:Object(d.jsxs)("button",{type:"button",className:"btn shadow-none",onClick:function(){var t;t=e.media_id,i.a.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then((function(e){e.isConfirmed&&l.a.post("/file/deleteFile",{media_id:t}).then((function(e){console.log(e),i.a.fire("Deleted!","Media has been deleted.","success"),window.location.reload()})).catch((function(){Object(o.a)("Unable to Delete Media","info")}))}))},children:[Object(d.jsx)(r.a,{})," "]})})]},e.media_id)})):Object(d.jsx)("tr",{children:Object(d.jsx)("td",{children:Object(d.jsx)("p",{children:"no files uploaded yet"})})})})]})})}},576:function(e,t,c){"use strict";var n=c(1),a=c.n(n),s=c(0),i=c.n(s);function r(){return r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var c=arguments[t];for(var n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n])}return e},r.apply(this,arguments)}function o(e,t){if(null==e)return{};var c,n,a=function(e,t){if(null==e)return{};var c,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)c=s[n],t.indexOf(c)>=0||(a[c]=e[c]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)c=s[n],t.indexOf(c)>=0||Object.prototype.propertyIsEnumerable.call(e,c)&&(a[c]=e[c])}return a}var l=Object(n.forwardRef)((function(e,t){var c=e.color,n=void 0===c?"currentColor":c,s=e.size,i=void 0===s?24:s,l=o(e,["color","size"]);return a.a.createElement("svg",r({ref:t,xmlns:"http://www.w3.org/2000/svg",width:i,height:i,viewBox:"0 0 24 24",fill:"none",stroke:n,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},l),a.a.createElement("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),a.a.createElement("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),a.a.createElement("polyline",{points:"21 15 16 10 5 21"}))}));l.propTypes={color:i.a.string,size:i.a.oneOfType([i.a.string,i.a.number])},l.displayName="Image",t.a=l},763:function(e,t,c){"use strict";c.d(t,"a",(function(){return r}));c(1);var n=c(63),a=c(12),s=c(272),i=c(3);function r(e){var t=e.editCategoryData,c=e.applyChanges,r=e.saveChanges,o=e.backToList,l=Object(a.g)();return Object(i.jsx)(n.A,{children:Object(i.jsx)(n.C,{children:Object(i.jsx)(s.a,{children:Object(i.jsxs)(n.eb,{children:[Object(i.jsx)(n.s,{children:Object(i.jsx)(n.e,{className:"shadow-none",color:"primary",onClick:function(){t(),r(),setTimeout((function(){l("/Category")}),1100)},children:"Save"})}),Object(i.jsx)(n.s,{children:Object(i.jsx)(n.e,{color:"primary",className:"shadow-none",onClick:function(){t(),c(),console.log("cancel process")},children:"Apply"})}),Object(i.jsx)(n.s,{children:Object(i.jsx)(n.e,{color:"dark",className:"shadow-none",onClick:function(){o(),console.log("back to list")},children:"Back to List"})})]})})})})}},764:function(e,t,c){"use strict";c.d(t,"a",(function(){return i}));c(1);var n=c(63),a=c(148),s=c(3);function i(e){var t=e.categoryDetails,c=e.handleInputs,i=e.section,r=e.valuelist;return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)(n.A,{children:Object(s.jsxs)(n.C,{children:[Object(s.jsxs)(a.default,{title:"Category Details",creationModificationDate:t,children:[Object(s.jsxs)(n.eb,{children:[Object(s.jsx)(n.s,{md:"4",children:Object(s.jsxs)(n.C,{children:[Object(s.jsxs)(n.H,{children:["Title ",Object(s.jsx)("span",{className:"required",children:" *"})]}),Object(s.jsx)(n.E,{type:"text",onChange:c,value:t&&t.category_title,name:"category_title"})]})}),Object(s.jsx)(n.s,{md:"4",children:Object(s.jsxs)(n.C,{children:[Object(s.jsx)(n.H,{children:"Section"}),Object(s.jsxs)(n.E,{type:"select",onChange:c,value:t&&t.section_id,name:"section_id",children:[Object(s.jsx)("option",{defaultValue:"selected",children:"Please Select"}),i&&i.map((function(e){return Object(s.jsx)("option",{value:e.section_id,children:e.section_title},e.section_id)}))]})]})}),Object(s.jsx)(n.s,{md:"4",children:Object(s.jsxs)(n.C,{children:[Object(s.jsx)(n.H,{children:"Category Type"}),Object(s.jsxs)(n.E,{type:"select",onChange:c,value:t&&t.category_type,name:"category_type",children:[Object(s.jsx)("option",{defaultValue:"selected",children:"Please Select"}),r&&r.map((function(e){return Object(s.jsx)("option",{value:e.value,children:e.value},e.value)}))]})]})})]}),Object(s.jsxs)(n.eb,{children:[Object(s.jsx)(n.s,{md:"4",children:Object(s.jsxs)(n.C,{children:[Object(s.jsx)(n.H,{children:"Internal Link"}),Object(s.jsx)(n.E,{type:"text",value:t&&t.internal_link,onChange:c,name:"internal_link"})]})}),Object(s.jsx)(n.s,{md:"4",children:Object(s.jsxs)(n.C,{children:[Object(s.jsx)(n.H,{children:"Published"}),Object(s.jsx)("br",{}),Object(s.jsx)(n.E,{name:"published",value:"1",type:"radio",defaultChecked:t&&1===t.published&&!0,onChange:c}),Object(s.jsx)(n.H,{children:" Yes "}),Object(s.jsx)(n.E,{name:"published",value:"0",type:"radio",defaultChecked:t&&0===t.published&&!0,onChange:c}),Object(s.jsx)(n.H,{children:"No"})]})})]})]}),Object(s.jsxs)(a.default,{title:"Page Meta Data",children:[Object(s.jsxs)(n.eb,{children:[Object(s.jsx)(n.s,{md:"6",children:Object(s.jsxs)(n.C,{children:[Object(s.jsx)(n.H,{children:"Page Title"}),Object(s.jsx)(n.E,{value:t&&t.meta_title,type:"text",onChange:c,name:"meta_title"})]})}),Object(s.jsx)(n.s,{md:"6",children:Object(s.jsxs)(n.C,{children:[Object(s.jsx)(n.H,{children:"Page Description"}),Object(s.jsx)(n.E,{value:t&&t.meta_description,type:"textarea",onChange:c,name:"meta_description"})]})})]}),Object(s.jsxs)(n.eb,{children:[Object(s.jsx)(n.s,{md:"6",children:Object(s.jsxs)(n.C,{children:[Object(s.jsx)(n.H,{children:"Page Keywords"}),Object(s.jsx)(n.E,{value:t&&t.meta_keyword,type:"textarea",onChange:c,name:"meta_keyword"})]})}),Object(s.jsx)(n.s,{md:"6",children:Object(s.jsxs)(n.C,{children:[Object(s.jsx)(n.H,{children:"SEO Title"}),Object(s.jsx)(n.E,{value:t&&t.seo_title,type:"text",onChange:c,name:"seo_title"})]})})]})]}),Object(s.jsx)(n.eb,{})]})})})}}}]);
//# sourceMappingURL=61.8f23ec68.chunk.js.map