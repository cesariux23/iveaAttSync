webpackJsonp([1],{"+Gxq":function(t,s,a){"use strict";function e(t){a("FdwB")}var n=a("/Put"),i=a("VU/8"),r=e,o=i(n.a,null,!1,r,null,null);s.a=o.exports},"+K8V":function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"hello"},[a("h1",[t._v(t._s(t.msg))]),t._v(" "),a("h2",[t._v("Essential Links")]),t._v(" "),t._m(0,!1,!1),t._v(" "),a("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1,!1,!1)])},n=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ul",[a("li",[a("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("Core Docs")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("Forum")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[t._v("Community Chat")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("Twitter")])]),t._v(" "),a("br"),t._v(" "),a("li",[a("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("Docs for This Template")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ul",[a("li",[a("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[t._v("vue-router")])]),t._v(" "),a("li",[a("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[t._v("vuex")])]),t._v(" "),a("li",[a("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[t._v("vue-loader")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[t._v("awesome-vue")])])])}],i={render:e,staticRenderFns:n};s.a=i},"+ryg":function(t,s,a){"use strict";function e(t){a("pca1")}var n=a("urb5"),i=a("i/8e"),r=a("VU/8"),o=e,c=r(n.a,i.a,!1,o,"data-v-7f24a0ce",null);s.a=c.exports},"+zPA":function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"app"}},[a("b-navbar",{attrs:{toggleable:"md",type:"dark",variant:"info",fixed:"top"}},[a("b-nav-toggle",{attrs:{target:"nav_collapse"}}),a("b-navbar-brand",{attrs:{href:"#/asistencia"}},[t._v("Control de asistencia")]),a("b-collapse",{attrs:{"is-nav":"is-nav",id:"nav_collapse"}},[a("b-nav",{attrs:{"is-nav-bar":"is-nav-bar"}},[a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/empleados/registro","active-class":"active"}},[t._v("Registro de emplado")])],1),a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/dispositivos","active-class":"active"}},[t._v("Dispositivos en línea")])],1)])],1)],1),a("div",{staticClass:"main"},[a("router-view")],1)],1)},n=[],i={render:e,staticRenderFns:n};s.a=i},"/Put":function(t,s,a){"use strict";var e=a("fnDg");s.a=e.a},"/rwW":function(t,s){},0:function(t,s){},"0zyd":function(t,s,a){"use strict";var e=a("mtWM"),n=a.n(e);s.a=n.a.create({baseURL:"/api"})},"1rAC":function(t,s){},"9M+g":function(t,s){},DMGt:function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"container"},[a("h1",[t._v("Dispositivos en línea")]),a("br"),a("table",{staticClass:"table"},[t._m(0,!1,!1),a("tbody",t._l(t.czs,function(s){return a("tr",{key:s.id},[a("td",[t._v(t._s(s.zona))]),a("td",[a("b-button",{attrs:{variant:"outline-primary",disabled:!s.online},on:{click:function(a){t.sync(s.id)}}},[t._v("Sincronizar")])],1),a("td",[t._v(t._s(s.mensaje))])])}))])])},n=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("thead",[a("tr",[a("th",[t._v("Ubicación")]),a("th",[t._v("Acciones")]),a("th",[t._v("Estatus")])])])}],i={render:e,staticRenderFns:n};s.a=i},ELjZ:function(t,s,a){"use strict";s.a={name:"Dia",props:["eventos"],data:function(){return{eventsClass:""}},computed:{evento:function(){return this.eventos.length>0&&this.eventos[0]},statusClass:function(){var t="";switch(this.eventsClass="visible",this.evento.status){case"PENDIENTE":t="fa-circle-thin text-secondary";break;case"ASISTENCIA":t="fa-check",this.eventsClass="";break;case"COMISIÓN":t="fa-external-link";break;case"RETARDO RECUPERABLE":t="fa-clock-o";break;case"RETARDO MAYOR":t="fa-clock-o text-warning";break;case"NO LABORAL":t="fa-calendar-minus-o text-info";break;case"PERIODO VACACIONAL":t="fa-user-o text-secondary";break;case"OMISIÓN DE SALIDA":t="fa-sign-out text-warning";break;case"OMISIÓN DE ENTRADA":t="fa-sign-in text-warning";break;case"PUNTUALIDAD":t="fa-check-circle-o text-success",this.eventsClass="";break;case"INASISTENCIA":t="fa-times text-danger"}return t}},filters:{zeroFill:function(t){var s=2-t.toString().length;return s>0?new Array(s+(/\./.test(t)?2:1)).join("0")+t:t+""}}}},FPDf:function(t,s){},FdwB:function(t,s){},"HUt/":function(t,s,a){"use strict";function e(t){a("ff44")}var n=a("fcFS"),i=a("VU/8"),r=e,o=i(n.a,null,!1,r,null,null);s.a=o.exports},"I4+c":function(t,s,a){"use strict";function e(t){a("OmWK")}var n=a("sU4x"),i=a("tyuJ"),r=a("VU/8"),o=e,c=r(n.a,i.a,!1,o,"data-v-7fad696f",null);s.a=c.exports},JCpY:function(t,s,a){"use strict";function e(t){a("wmKd")}var n=a("aPSQ"),i=a("VU/8"),r=e,o=i(n.a,null,!1,r,null,null);s.a=o.exports},JDVb:function(t,s,a){"use strict";function e(t){a("FPDf")}var n=a("kJiG"),i=a("VU/8"),r=e,o=i(n.a,null,!1,r,null,null);s.a=o.exports},Jdir:function(t,s,a){"use strict";var e=a("sLPG"),n=a("DMGt"),i=a("VU/8"),r=i(e.a,n.a,!1,null,null,null);s.a=r.exports},Jmt5:function(t,s){},"LjY/":function(t,s,a){"use strict";function e(t){a("/rwW")}var n=a("ELjZ"),i=a("nzti"),r=a("VU/8"),o=e,c=r(n.a,i.a,!1,o,"data-v-0024aec4",null);s.a=c.exports},M93x:function(t,s,a){"use strict";function e(t){a("e4LB")}var n=a("xJD8"),i=a("+zPA"),r=a("VU/8"),o=e,c=r(n.a,i.a,!1,o,null,null);s.a=c.exports},NHnr:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("7+uW"),n=a("M93x"),i=a("YaEn"),r=a("e6fC"),o=a("Jmt5"),c=(a.n(o),a("1rAC")),l=(a.n(c),a("9M+g")),u=(a.n(l),a("mjDs")),d=a.n(u);e.a.use(d.a),e.a.config.productionTip=!1,e.a.use(r.a),new e.a({el:"#app",router:i.a,template:"<App/>",components:{App:n.a}})},OmWK:function(t,s){},Orh2:function(t,s){},Rz9o:function(t,s,a){"use strict";var e=a("bW3S"),n=a("pM64"),i=a("VU/8"),r=i(e.a,n.a,!1,null,null,null);s.a=r.exports},SS6n:function(t,s){},SsFf:function(t,s,a){"use strict";function e(t){a("SS6n")}var n=a("euDc"),i=a("VU/8"),r=e,o=i(n.a,null,!1,r,null,null);s.a=o.exports},"Sy/s":function(t,s){},U0GY:function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-xl-9"},[a("div",{staticClass:"calendar"},[a("div",{staticClass:"month container-fluid"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-4 text-left"},[a("button",{staticClass:"btn btn-light",attrs:{type:"button"},on:{click:t.anterior}},[a("i",{staticClass:"fa fa-chevron-left fa-2x"})])]),a("div",{staticClass:"col-sm-4 title"},[a("b",[t._v(t._s(t.meses[t.info.mesActual-1]))]),a("br"),a("span",[t._v(t._s(t.info.anio))])]),a("div",{staticClass:"col-sm-4 text-right"},[a("button",{staticClass:"btn btn-light",attrs:{type:"button"},on:{click:t.siguiente}},[a("i",{staticClass:"fa fa-chevron-right fa-2x"})])])])]),a("ul",{staticClass:"weekdays"},t._l(t.weekdays,function(s){return a("li",[t._v(t._s(s))])})),a("div",{staticClass:"row days"},t._l(t.dias,function(s){return a("div",{staticClass:"calendar-day",class:t.dayClass(s),on:{click:function(a){t.openDetail(s)}}},[a("div",{staticClass:"day-label"},[a("span",[t._v(t._s(s))])]),a("dia",{attrs:{eventos:t._f("attEvent")(t.asistencia,s)}})],1)})),a("b-modal",{ref:"attModal",attrs:{title:t.modalTitle,closeTitle:"Cerrar",okTitle:"Actualizar asistencia"},on:{ok:t.updateAtt}},[a("div",{staticClass:"d-block"},[a("b-form-group",{attrs:{label:"Marcar la asistencia de este día como","label-for":"status"}},[a("b-form-select",{attrs:{id:"status",options:t.statuses,required:"required"},model:{value:t.selectedStatus,callback:function(s){t.selectedStatus=s},expression:"selectedStatus"}})],1),a("b-form-textarea",{attrs:{id:"observaciones",placeholder:"Observaciones",rows:3,"max-rows":6},model:{value:t.observaciones,callback:function(s){t.observaciones=s},expression:"observaciones"}}),a("hr"),t.selectedDay?a("div",[a("p",[t._v("Eventos Registrados:")]),a("div",{staticClass:"alert alert-info"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("b",[t._v("Entrada: ")]),t.selectedDay.entradaEvt?a("span",[t._v(t._s(t._f("zeroFill")(t.selectedDay.entradaEvt.hora))+":"+t._s(t._f("zeroFill")(t.selectedDay.entradaEvt.minuto))+" hrs.")]):a("span",[t._v("No definido.")])]),a("div",{staticClass:"col"},[a("b",[t._v("Salida: ")]),t.selectedDay.salidaEvt?a("span",[t._v(t._s(t._f("zeroFill")(t.selectedDay.salidaEvt.hora))+":"+t._s(t._f("zeroFill")(t.selectedDay.salidaEvt.minuto))+" hrs.")]):a("span",[t._v("No definido.")])])])])]):a("div",{staticClass:"alert alert-secondary"},[t._v("Sin eventos registrados")])],1)])],1)]),a("div",{staticClass:"col-xl-3"},[a("div",{staticClass:"card"},[t._m(0,!1,!1),a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-xl-12 col"},t._l(t.resumen,function(s,e){return a("p",[a("b",[t._v(t._s(e))]),t._v(": "),a("span",[t._v(t._s(s))])])}))])])])])])},n=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"card-header"},[a("div",{staticClass:"float-right"},[a("button",{staticClass:"btn btn-sm btn-outline-primary",attrs:{title:"Recalcular asistencia"}},[a("i",{staticClass:"fa fa-refresh"})])]),a("h4",[t._v("Resumen del mes")])])}],i={render:e,staticRenderFns:n};s.a=i},WT8W:function(t,s){},YaEn:function(t,s,a){"use strict";var e=a("7+uW"),n=a("/ocq"),i=a("qSdX"),r=a("+ryg"),o=a("xsoF"),c=a("Jdir");e.a.use(n.a),s.a=new n.a({routes:[{path:"/",name:"Hello",component:i.a},{path:"/asistencia",name:"asistenciaGeneral",component:r.a},{path:"/empleados/registro",name:"registroEmpleado",component:o.a},{path:"/empleado/:id",name:"edicionEmpleado",component:o.a,props:!0},{path:"/dispositivos",name:"enLinea",component:c.a,props:!0}]})},aPSQ:function(t,s,a){"use strict";var e=a("rKsW");s.a=e.a},bW3S:function(t,s,a){"use strict";var e=this;s.a={name:"EmpleadoForm",props:["empleado","isPatch"],data:function(){return{_form:{userid:null,nombre:"",adscripcion:"",entrada:"08:00",salida:"15:00",entrada_comer:null,salida_comer:null},form:{}}},methods:{onSubmit:function(){this.$emit("save",this.form)}},watch:{empleado:function(){this.empleado?this.form=this.empleado.data:this.form=this._form,this.$forceUpdate()},isPatch:function(){console.log(this.isPatch)}},created:function(){e.form=e._form}}},bl7x:function(t,s,a){"use strict";var e=a("Rz9o"),n=a("0zyd");s.a={name:"Registro",props:["id"],components:{EmpleadoForm:e.a},data:function(){return{empleado:{userid:null,nombre:"",adscripcion:"",entrada:"08:00",salida:"15:00",entrada_comer:null,salida_comer:null},isPatch:!1}},methods:{save:function(t){var s=this,e="/empleados"+(this.id?"/"+t.userid:""),i={userid:t.userid,nombre:t.nombre,adscripcion:t.adscripcion,entrada:t.entrada,salida:t.salida,entrada_comer:t.entrada_comer,salida_comer:t.salida_comer},r=this.isPatch?"patch":"post";a.i(n.a)({method:r,url:e,data:i}).then(function(t){s.$router.push("/asistencia")})}},created:function(){var t=this;this.id&&n.a.get("/empleados/"+this.id).then(function(s){console.log(s),s.data&&(t.empleado=s.data,t.isPatch=!0)})}}},e4LB:function(t,s){},euDc:function(t,s,a){"use strict";var e=a("xT7b");s.a=e.a},fcFS:function(t,s,a){"use strict";var e=a("qRo1");s.a=e.a},ff44:function(t,s){},"i/8e":function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"event-content container-fluid"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-3 empleados"},[a("empleado-list",{on:{selectedEmp:t.updateSelected}})],1),a("div",{staticClass:"col-md-9 detalles"},[a("div",{staticClass:"eventos"},[t.empleado?a("div",{staticClass:"container-fluid"},[a("div",{staticClass:"float-right"},[a("router-link",{staticClass:"btn btn-outline-secondary",attrs:{to:{name:"edicionEmpleado",params:{id:t.empleado.userid}}}},[a("i",{staticClass:"fa fa-pencil"}),t._v(" Editar empleado")])],1),a("h3",[t._v("Detalle de la asistencia")]),a("hr"),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4 col-lg-1"},[a("b",[t._v("Userid")]),a("p",[t._v(t._s(t.empleado.userid))])]),a("div",{staticClass:"col"},[a("b",[t._v("Nombre")]),a("p",[t._v(t._s(t.empleado.nombre))])]),a("div",{staticClass:"col"},[a("b",[t._v("Adscripción")]),a("p",[t._v(t._s(t.empleado.adscripcion))])]),a("div",{staticClass:"col-md-3 col-lg-1"},[a("b",[t._v("Entrada")]),a("p",[t._v(" "+t._s(t.empleado.entrada))])]),a("div",{staticClass:"col-md-3 col-lg-1"},[a("b",[t._v("Salida")]),a("p",[t._v(" "+t._s(t.empleado.salida))])]),t._m(0,!1,!1)]),a("hr"),a("calendar",{attrs:{info:t.info,userid:t.empleado.userid},on:{anterior:t.mesAnterior,siguiente:t.mesSiguiente}})],1):a("div",{staticClass:"center well empty-data"},[t._m(1,!1,!1)])])])])])},n=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"col-md-3 col-lg-1"},[a("b",[t._v("Tolerancia")]),a("p",[t._v("15 mins.")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("p",[a("i",{staticClass:"fa fa-users fa-5x"})]),a("p",[t._v("Seleccione un empleado de la lista")])])}],i={render:e,staticRenderFns:n};s.a=i},kJiG:function(t,s,a){"use strict";var e=a("9NuQ");s.a=e.a},nzti:function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"dia"},[t.eventos.length>0?a("div",[a("i",{staticClass:"fa fa-2x",class:t.statusClass,attrs:{title:t.evento.status}}),a("div",{staticClass:"container event-container"},[a("div",{staticClass:"row",class:t.eventsClass},[t.evento.entradaEvt?a("div",{staticClass:"col-lg-6",attrs:{title:"Entrada"}},[a("b-badge",{attrs:{variant:"success"}},[a("span",[t._v(t._s(t._f("zeroFill")(t.evento.entradaEvt.hora))+":"+t._s(t._f("zeroFill")(t.evento.entradaEvt.minuto)))])])],1):t._e(),t.evento.salidaEvt?a("div",{staticClass:"col-lg-6",attrs:{title:"Salida"}},[a("b-badge",{attrs:{variant:"info"}},[a("span",[t._v(t._s(t._f("zeroFill")(t.evento.salidaEvt.hora))+":"+t._s(t._f("zeroFill")(t.evento.salidaEvt.minuto)))])])],1):t._e()])])]):t._e()])},n=[],i={render:e,staticRenderFns:n};s.a=i},pM64:function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"form"},[a("b-form",{on:{submit:t.onSubmit}},[a("h3",[t._v("Datos generales")]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-1"},[a("b-form-group",{attrs:{id:"grupo1",label:"UserId","label-for":"userid"}},[t.isPatch?a("span",[t._v(t._s(t.form.userid))]):t._e(),t.isPatch?t._e():a("b-form-input",{attrs:{id:"userid",placeholder:"Último ID"},model:{value:t.form.userid,callback:function(s){t.$set(t.form,"userid",s)},expression:"form.userid"}})],1)],1),a("div",{staticClass:"col"},[a("b-form-group",{attrs:{id:"grupo1",label:"Nombre *","label-for":"nombre"}},[a("b-form-input",{attrs:{id:"nombre",placeholder:"Nombre completo del empleado",required:"required"},model:{value:t.form.nombre,callback:function(s){t.$set(t.form,"nombre",s)},expression:"form.nombre"}})],1)],1),a("div",{staticClass:"col-2"},[a("b-form-group",{attrs:{id:"grupoRFc",label:"RFC","label-for":"rfc"}},[a("b-form-input",{attrs:{id:"rfc"},model:{value:t.form.rfc,callback:function(s){t.$set(t.form,"rfc",s)},expression:"form.rfc"}})],1)],1),a("div",{staticClass:"col"},[a("b-form-group",{attrs:{id:"grupo2",label:"Adscripción *","label-for":"adscripcion"}},[a("b-form-input",{attrs:{id:"adscripcion",required:"required"},model:{value:t.form.adscripcion,callback:function(s){t.$set(t.form,"adscripcion",s)},expression:"form.adscripcion"}})],1)],1)]),a("h3",[t._v("Horario")]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("b-form-group",{attrs:{id:"grupo3",label:"Hora de entrada *","label-for":"entrada"}},[a("b-form-input",{attrs:{id:"entrada",type:"time",required:"required"},model:{value:t.form.entrada,callback:function(s){t.$set(t.form,"entrada",s)},expression:"form.entrada"}})],1)],1),a("div",{staticClass:"col"},[a("b-form-group",{attrs:{id:"grupo6",label:"Hora de salida *","label-for":"salida",required:"required"}},[a("b-form-input",{attrs:{id:"salida",type:"time",required:"required"},model:{value:t.form.salida,callback:function(s){t.$set(t.form,"salida",s)},expression:"form.salida"}})],1)],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("b-form-group",{attrs:{id:"grupo4",label:"Hora de salida a comer","label-for":"salidacomer"}},[a("b-form-input",{attrs:{id:"salidacomer",type:"time"},model:{value:t.form.salidacomer,callback:function(s){t.$set(t.form,"salidacomer",s)},expression:"form.salidacomer"}})],1)],1),a("div",{staticClass:"col"},[a("b-form-group",{attrs:{id:"grupo5",label:"Hora de entrada de comer","label-for":"entradacomer"}},[a("b-form-input",{attrs:{id:"entradacomer",type:"time"},model:{value:t.form.entradacomer,callback:function(s){t.$set(t.form,"entradacomer",s)},expression:"form.entradacomer"}})],1)],1)]),a("div",{staticClass:"btn-form-group"},[a("router-link",{staticClass:"btn btn-secondary",attrs:{to:{name:"asistenciaGeneral"}}},[t._v("Regresar")]),a("b-button",{attrs:{type:"submit",variant:"success"}},[t._v(t._s(t.isPatch?"Actualizar registro":"Registrar nuevo empleado"))])],1)])],1)},n=[],i={render:e,staticRenderFns:n};s.a=i},pMZz:function(t,s,a){"use strict";s.a={name:"hello",data:function(){return{msg:"Welcome to Your Vue.js App"}}}},pca1:function(t,s){},qSdX:function(t,s,a){"use strict";function e(t){a("Orh2")}var n=a("pMZz"),i=a("+K8V"),r=a("VU/8"),o=e,c=r(n.a,i.a,!1,o,"data-v-bb47b6d2",null);s.a=c.exports},r15W:function(t,s,a){"use strict";function e(t){a("WT8W")}var n=a("xKc6"),i=a("VU/8"),r=e,o=i(n.a,null,!1,r,null,null);s.a=o.exports},rCls:function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"container"},[a("h1",[t._v(t._s(t.isPatch?"Actualizar datos del empleado":"Registro de empleados"))]),a("hr"),a("empleado-form",{attrs:{empleado:t.empleado,isPatch:t.isPatch},on:{save:t.save}})],1)},n=[],i={render:e,staticRenderFns:n};s.a=i},rwh1:function(t,s,a){"use strict";var e=a("c/Tr"),n=a.n(e),i=a("0zyd"),r=a("LjY/"),o=a("PJh5"),c=a.n(o);c.a.locale("es"),s.a={name:"Calendar",components:{dia:r.a},props:["info","userid"],data:function(){return{eventos:[],meses:c.a.months(),asistencia:[],statuses:[{text:"Seleccione uno",value:null},"PUNTUALIDAD","ASISTENCIA","RETARDO RECUPERABLE","RETARDO MAYOR","COMISIÓN","PERMISO ECONÓMICO","OMISIÓN DE ENTRADA","OMISIÓN DE SALIDA","INASISTENCIA","LICENCIA MEDICA","NO LABORAL","PERIODO VACACIONAL","VACACIONES EXTRA","PENDIENTE"],selectedStatus:null,observaciones:null,weekdays:c.a.weekdaysMin(),selectedDay:{},modalTitle:"",dia:null}},filters:{attEvent:function(t,s){return t.filter(function(t){return t.dia===parseInt(s)})},zeroFill:function(t){var s=2-t.toString().length;return s>0?new Array(s+(/\./.test(t)?2:1)).join("0")+t:t+""}},computed:{dias:function(){var t=c()({y:this.info.anio,M:this.info.mesActual-1,d:1}),s=c()({y:this.info.anio,M:this.info.mesActual-1,d:1}).add(1,"month").subtract(1,"day");return(t.day()>=1?n()(new Array(t.day()),function(t,s){return""}):[]).concat(n()(new Array(s.date()),function(t,s){return s+1}))},resumen:function(){var t=this.asistencia.map(function(t){return t.status}),s={};return t.forEach(function(t){s[t]||(s[t]=0),s[t]+=1}),s}},watch:{userid:function(t){this.getEvents()}},methods:{anterior:function(){this.$emit("anterior"),this.getEvents()},siguiente:function(){this.$emit("siguiente"),this.getEvents()},getEvents:function(){var t=this;i.a.get("/asistencia",{params:{userid:this.userid,anio:this.info.anio,mes:this.info.mesActual}}).then(function(s){t.asistencia=s.data.data,t.$forceUpdate()})},dayClass:function(t){return{data:t>=1,empty:""===t}},openDetail:function(t){var s=this;t&&(this.dia=t,this.modalTitle="Asistencia del día "+t+" de "+this.meses[this.info.mesActual-1]+" de "+this.info.anio,this.selectedStatus=null,this.observaciones=null,i.a.get("/asistencia",{params:{userid:this.userid,anio:this.info.anio,mes:this.info.mesActual,dia:t}}).then(function(t){s.selectedDay=t.data.data[0],s.selectedDay&&(s.selectedStatus=s.statuses.indexOf(s.selectedDay.status)>=0?s.selectedDay.status:null),s.selectedDay&&(s.observaciones=s.selectedDay.observaciones),s.$refs.attModal.show(),s.$forceUpdate()}))},updateAtt:function(){var t=this,s="/asistencia"+(this.selectedDay?"/"+this.selectedDay.id:""),e={userid:this.userid,anio:this.info.anio,mes:this.info.mesActual,dia:this.dia,observaciones:this.observaciones,status:this.selectedStatus},n=this.selectedDay?"patch":"post";a.i(i.a)({method:n,url:s,data:e}).then(function(s){t.getEvents()})}},created:function(){this.getEvents()}}},sLPG:function(t,s,a){"use strict";var e=a("d7EF"),n=a.n(e),i=a("W3Iv"),r=a.n(i),o=a("DmT9"),c=a.n(o),l=c()("http://192.168.30.248:3000/czs");s.a={name:"listaDispositivos",data:function(){return{czs:[],ubicaciones:{}}},methods:{sync:function(t){l.emit("reqSync",t)}},watch:{ubicaciones:function(){var t=this;this.czs=[],r()(this.ubicaciones).forEach(function(s){var a=n()(s,2),e=(a[0],a[1]);t.czs.push(e)})}},created:function(){l.close(),l.open();var t=this;l.on("connect",function(){l.emit("reqZonas")}),l.on("menssages",function(){console.log("mensaje")}),l.on("reconnect",function(){l.emit("reqZonas")}),l.on("online",function(s){t.ubicaciones=s.coordinaciones}),l.on("logSync",function(s){s.hasOwnProperty("zona")&&(t.ubicaciones[s.zona].mensaje=s.mensaje,t.ubicaciones[s.zona].online=s.online)})}}},sU4x:function(t,s,a){"use strict";var e=a("0zyd");s.a={name:"empleado-list",data:function(){return{search:"",msg:"Empleados",empleados:[]}},computed:{filteredEmpleados:function(){var t=this;return t.empleados.filter(function(s){return-1!==s.nombre.toLowerCase().indexOf(t.search.toLowerCase())||-1!==s.adscripcion.toLowerCase().indexOf(t.search.toLowerCase())||s.userid===parseInt(t.search)})}},methods:{selectEmpleado:function(t){this.$emit("selectedEmp",t)}},created:function(){var t=this;console.log("Created"),e.a.get("/empleados").then(function(s){console.log(s),t.empleados=s.data.data})}}},tyuJ:function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("h4",[t._v("Empleados")]),a("div",{staticClass:"form-group"},[a("div",{staticClass:"input-group"},[a("b-form-input",{attrs:{type:"text",placeholder:"Buscar ..."},model:{value:t.search,callback:function(s){t.search=s},expression:"search"}}),t.search?a("span",{staticClass:"input-group-addon"},[a("i",{staticClass:"fa fa-times"})]):t._e()],1)])]),a("div",{staticClass:"card-body"},[a("div",{staticClass:"empleados-list"},[t.search?a("div",[0===t.filteredEmpleados.length?a("div",{staticClass:"alert alert-warning"},[t._v("Sin resultados.")]):a("div",{staticClass:"alert alert-info"},[t._v("Mostrando "+t._s(t.filteredEmpleados.length)+" resultado(s).")])]):t._e(),a("b-list-group",t._l(t.filteredEmpleados,function(s){return a("b-list-group-item",{key:s.userid,attrs:{href:"#"},on:{click:function(a){t.selectEmpleado(s)}}},[a("h5",[a("b",[t._v(t._s(s.userid))])]),a("p",[t._v(t._s(s.nombre))]),a("p",{staticClass:"text-secondary"},[t._v(t._s(s.adscripcion))])])}))],1)]),t._m(0,!1,!1)])},n=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"card-footer"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6 text-left"},[a("button",{staticClass:"btn btn-light",attrs:{title:"Empleado anterior"}},[a("i",{staticClass:"fa fa-chevron-left"})])]),a("div",{staticClass:"col-md-6 text-right"},[a("button",{staticClass:"btn btn-light",attrs:{title:"Siguente empleado"}},[a("i",{staticClass:"fa fa-chevron-right"})])])])])}],i={render:e,staticRenderFns:n};s.a=i},ujvY:function(t,s,a){"use strict";function e(t){a("Sy/s")}var n=a("rwh1"),i=a("U0GY"),r=a("VU/8"),o=e,c=r(n.a,i.a,!1,o,null,null);s.a=c.exports},urb5:function(t,s,a){"use strict";var e=a("I4+c"),n=a("ujvY"),i=a("PJh5"),r=a.n(i);s.a={name:"Asistencia",components:{"empleado-list":e.a,calendar:n.a},methods:{updateSelected:function(t){this.empleado=t},mesAnterior:function(){1===this.info.mesActual?(this.info.mesActual=12,this.info.anio--):this.info.mesActual--},mesSiguiente:function(){12===this.info.mesActual?(this.info.mesActual=1,this.info.anio++):this.info.mesActual++}},data:function(){return{msg:":p",empleado:null,info:{mesActual:r()().month()+1,anio:r()().year()}}}}},uslO:function(t,s,a){function e(t){return a(n(t))}function n(t){var s=i[t];if(!(s+1))throw new Error("Cannot find module '"+t+"'.");return s}var i={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};e.keys=function(){return Object.keys(i)},e.resolve=n,t.exports=e,e.id="uslO"},wmKd:function(t,s){},xJD8:function(t,s,a){"use strict";s.a={name:"app"}},xKc6:function(t,s,a){"use strict";var e=a("E9Zr");s.a=e.a},xsoF:function(t,s,a){"use strict";var e=a("bl7x"),n=a("rCls"),i=a("VU/8"),r=i(e.a,n.a,!1,null,null,null);s.a=r.exports}},["NHnr"]);
//# sourceMappingURL=app.e5049a12e65e086986ed.js.map