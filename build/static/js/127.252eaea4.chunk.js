(this["webpackJsonpmain-bt5"]=this["webpackJsonpmain-bt5"]||[]).push([[127],{1397:function(e,t,a){"use strict";a.r(t);var s=a(2),n=a(9),c=a(27),o=a(1),r=a(63),i=a(1495),d=a(1514),l=a(1494),b=a(1404),j=a(1464),f=a(1515),u=(a(270),a(271),a(187)),O=a.n(u),h=a(159),m=a(143),p=a(7),x=a(64),_=a(3);t.default=function(){var e=Object(o.useState)(),t=Object(c.a)(e,2),a=t[0],u=t[1],g=Object(o.useState)(),v=Object(c.a)(g,2),N=v[0],C=v[1],k=Object(o.useContext)(x.b).loggedInuser,y=Object(o.useState)(),Y=Object(c.a)(y,2),w=Y[0],B=Y[1],P=Object(o.useState)({}),D=Object(c.a)(P,2),M=D[0],E=D[1];function S(e){return M[e]}var A=function(){p.a.post("/attendance/getYesterdayNotes",{staff_id:k.staff_id}).then((function(e){"200"===e.data.status&&B(e.data.data)})).catch((function(){Object(m.a)("Unable to edit record.","error")}))},F=function(){p.a.post("/attendance/getStaff",{date:O()().format("DD-MM-YYYY")}).then((function(e){u(e.data.data),function(e){for(var t={},a=0;a<e.length;a++)t[a]=1;E(t)}(e.data.data),A()})).catch((function(){Object(m.a)("Unable to edit record.","error")}))},H=function(e,t){var a={};a.staff_id=e.staff_id,a.record_date=O()().format("h:mm:ss a"),a.creation_date=O()().format("DD-MM-YYYY"),a.modification_date=O()().format("DD-MM-YYYY"),a.created_by=e.staff_id,a.modified_by=e.staff_id,""!==t&&(a.attendance_id=t),p.a.post("/attendance/insertAttendance",a).then((function(){Object(m.a)("Attendance inserted successfully.","success"),F()})).catch((function(){Object(m.a)("Network connection error.","error")}))},z=function(e,t){""===e.target.value?Object(m.a)("Enter valid Notes","warning"):N.attendance_id?(N.notes=e.target.value,N.type=t,p.a.post("/attendance/editNotes",N).then((function(){A(),Object(m.a)("Task edited successfully.","success")})).catch((function(){Object(m.a)("Cannot Update Data","error")}))):Object(m.a)("Please Login first","error")},I=function(e){var t=w&&w.filter((function(t){return t.staff_id===e}));return t?t[0]:{notes:"",completed_notes:"",in_progress_notes:""}};return Object(o.useEffect)((function(){F()}),[]),Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)(h.a,{}),Object(_.jsx)(r.i,{className:"shadow-none",children:Object(_.jsx)(r.A,{children:Object(_.jsx)(r.j,{className:"shadow-none",children:Object(_.jsx)(r.eb,{children:a&&a.map((function(e,t){var a;return Object(_.jsx)(r.s,{md:"4",children:Object(_.jsxs)(r.i,{className:"border border-gray shadow-none p-1 pt-2",children:[Object(_.jsxs)(r.eb,{className:"border-bottom border-gray p-2",children:[Object(_.jsx)(r.s,{md:"9",children:Object(_.jsx)("span",{children:Object(_.jsxs)(r.eb,{children:[Object(_.jsx)(r.s,{md:"3",children:Object(_.jsx)(l.a,{})}),Object(_.jsxs)(r.s,{md:"9",children:[Object(_.jsx)(r.eb,{children:Object(_.jsx)("b",{children:e.first_name})}),Object(_.jsx)(r.eb,{children:Object(_.jsx)("span",{children:"designation"})})]})]})})}),Object(_.jsx)(r.s,{md:"3",children:k.staff_id===e.staff_id&&(e.time_in&&!e.leave_time?Object(_.jsx)(r.e,{color:"primary",className:"shadow-none",size:"sm",onClick:function(){H(e,e.attendance_id)},children:"Logout"}):e.time_in?Object(_.jsx)(r.e,{color:"success",className:"shadow-none",size:"sm",children:"Marked"}):Object(_.jsx)(r.e,{color:"primary",className:"shadow-none",size:"sm",onClick:function(){H(e,"")},children:"Login"}))})]}),Object(_.jsx)("br",{}),Object(_.jsxs)("div",{className:"text-muted mb-3 card-subtitle",children:[Object(_.jsxs)("p",{children:["Time In:",Object(_.jsxs)("code",{children:[" ",e.time_in?e.time_in:""]})," "]}),Object(_.jsxs)("p",{children:["Time Out:",Object(_.jsxs)("code",{children:[" ",e.leave_time?e.leave_time:""]})," "]})]}),Object(_.jsx)(r.eb,{children:Object(_.jsxs)(b.a,{value:null!==(a=S(t))&&void 0!==a?a:1,children:[Object(_.jsx)(i.a,{sx:{borderBottom:1,borderColor:"divider"},className:"col-12",children:Object(_.jsxs)(j.a,{onChange:function(e,a){return function(e,t,a){E(Object(n.a)(Object(n.a)({},M),{},Object(s.a)({},a,t)))}(0,a,t)},"aria-label":"lab API tabs example",children:[Object(_.jsx)(d.a,{label:"Pending",value:1,className:"col-4"}),Object(_.jsx)(d.a,{label:"Progress",value:2,className:"col-4"}),Object(_.jsx)(d.a,{label:"Comments",value:3,className:"col-4"})]})}),Object(_.jsx)(f.a,{value:1,children:Object(_.jsx)(r.E,{onFocus:function(){C(e)},onBlur:function(e){z(e,"pending")},type:"textarea",name:"task_pending",defaultValue:I(e.staff_id)&&I(e.staff_id).notes,disabled:k.staff_id!==e.staff_id})}),Object(_.jsx)(f.a,{value:2,children:Object(_.jsx)(r.E,{onFocus:function(){C(e)},onBlur:function(e){z(e,"inprogress")},type:"textarea",name:"task_progress",defaultValue:I(e.staff_id)&&I(e.staff_id).in_progress_notes,disabled:k.staff_id!==e.staff_id})}),Object(_.jsx)(f.a,{value:3,children:Object(_.jsx)(r.E,{onFocus:function(){C(e)},onBlur:function(e){z(e,"completed")},type:"textarea",name:"task_complete",defaultValue:I(e.staff_id)&&I(e.staff_id).completed_notes,disabled:k.staff_id!==e.staff_id})})]})})]},e.staff_id)},e.staff_id)}))})})})})]})}},143:function(e,t,a){"use strict";var s=a(159);a(184);t.a=function(e,t){return"success"===t?s.b.success(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"error"===t?s.b.error(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"info"===t?s.b.info(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):"warning"===t?s.b.warning(e,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):Object(s.b)(e)}},271:function(e,t,a){}}]);
//# sourceMappingURL=127.252eaea4.chunk.js.map