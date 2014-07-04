/*! frontendlabs comunity */
if("undefined"==typeof yOSON)var yOSON={};!function(a){var b=function(a){this.url=a,this.status="request",this.message=""};b.prototype.request=function(a){var b=this;this.events=a||{},this.onRequest(),newScript=document.createElement("script"),newScript.type="text/javascript",newScript.src=this.url,newScript.readyState?this.requestIE(newScript,a):(newScript.onload=function(){b.onReadyRequest()},newScript.onerror=function(){b.onErrorRequest()}),document.getElementsByTagName("head")[0].appendChild(newScript)},b.prototype.requestIE=function(a,b){var c=this;a.onreadystatechange=function(){"loaded"==a.readyState||"complete"==a.readyState?(a.onreadystatechange=null,c.onReadyRequest()):c.onErrorRequest()}},b.prototype.onRequest=function(){var a=this.events.onRequest;a&&a.call(this)},b.prototype.onReadyRequest=function(){var a=this.events.onReady;this.setStatus("ready"),a&&a.call(this)},b.prototype.onErrorRequest=function(){var a=this.events.onError;this.setStatus("error"),a&&a.call(this)},b.prototype.getStatus=function(){return this.status},b.prototype.setStatus=function(a){this.status=a},yOSON.Dependency=b;var c=function(){this.data={},this.loaded={},this.config={staticHost:"",versionUrl:""}};c.prototype.setStaticHost=function(a){this.config.staticHost=a},c.prototype.getStaticHost=function(){return this.config.staticHost},c.prototype.setVersionUrl=function(a){this.config.versionUrl=a},c.prototype.getVersionUrl=function(){var a="";return""!==this.config.versionUrl&&(a=this.config.versionUrl),a},c.prototype.transformUrl=function(a){var b="",c=/((http?|https):\/\/)(www)?([\w-]+\.\w+)+(\/[\w-]+)+\.\w+/g;return b=c.test(a)?a:this.config.staticHost+a+this.getVersionUrl()},c.prototype.generateId=function(a){return-1!=a.indexOf("//")?a.split("//")[1].split("?")[0].replace(/[/.:]/g,"_"):a.split("?")[0].replace(/[/.:]/g,"_")},c.prototype.addScript=function(a){var c=this.generateId(a);return this.alreadyInCollection(c)?"the dependence already appended":(this.data[c]=new b(a),this.data[c].request(),!0)},c.prototype.ready=function(a,b){var c=0,d=this,e=function(f){var g=d.transformUrl(f[c]);c<f.length?(d.addScript(g),d.avaliable(g,function(){c++,e(a)})):b.apply(d)};e(a)},c.prototype.avaliable=function(a,b){var c=this,d=c.generateId(a),e=c.getDependency(a);if(this.alreadyLoaded(d))return!0;var f=setInterval(function(){"ready"==e.getStatus()&&(c.loaded[d]=!0,clearInterval(f),b.apply(c)),"error"==e.getStatus()&&(b=null,console.warn(e.getErrorMessage()),clearInterval(f))},500)},c.prototype.getDependency=function(a){var b=this.generateId(a);return this.data[b]},c.prototype.alreadyInCollection=function(a){return this.data[a]},c.prototype.alreadyLoaded=function(a){return this.loaded[a]},yOSON.DependencyManager=c;var d=function(){this.modules={},this.runningModules={},this.skeletonModule={},this.entityBridge={},this.alreadyAllModulesBeRunning=null,this.debug=!1};d.prototype.addMethodToBrigde=function(a,b){this.entityBridge[a]=b},d.prototype.addModule=function(a,b){this.existsModule(a)||(this.modules[a]=this.createDefinitionModule(a,b))},d.prototype.getModuleDefinition=function(a){var b=this.getModule(a),c=b.moduleDefinition(this.entityBridge),d=this;for(var e in c){var f=c[e];"function"==typeof f&&(c[e]=d.addFunctionToDefinitionModule(a,e,f))}return c},d.prototype.addFunctionToDefinitionModule=function(a,b,c){return function(){try{return c.apply(this,arguments)}catch(d){console.log("Modulo:"+a+"."+b+"(): "+d.message)}}},d.prototype.existsModule=function(a){var b=!1;return this.getModule(a)&&(b=!0),b},d.prototype.getModule=function(a){return this.modules[a]},d.prototype.createDefinitionModule=function(a,b){return this.skeletonModule[a]={moduleDefinition:b},this.skeletonModule[a]},d.prototype.runModule=function(a,b){var c="";if(this.existsModule(a)){c="undefined"==typeof b?{}:b,c.moduleName=a;var d=this.getModuleDefinition(a);"function"==typeof d.init&&(this.runningModule(a),d.init(c))}},d.prototype.runModules=function(a){var b=this;if(!(!a instanceof Array))for(var c=0;c<a.length;c++){var d=a[c];b.existsModule(d)&&b.runModule(d)}},d.prototype.runningModule=function(a){this.modules[a].running=!0},d.prototype.moduleIsRunning=function(a){return this.modules[a].running},d.prototype.setStatusModule=function(a,b){this.modules[a].status=b},d.prototype.getStatusModule=function(a){return this.modules[a].status},d.prototype.allModulesRunning=function(a,b){var c=this;if(this.alreadyAllModulesBeRunning)b.call(c);else var d=setInterval(function(){var e=0,f=0;for(var g in c.modules)c.moduleIsRunning(g)&&f++,"start"==c.getStatusModule(g)&&e++;e>0?e==f?(this.alreadyAllModulesBeRunning=!0,b.call(c),clearInterval(d)):a.call(c):(this.alreadyAllModulesBeRunning=!0,b.call(c),clearInterval(d))},200)},yOSON.Modular=d;var e=function(){this.events={}};e.prototype.subscribe=function(a,b,c){var d=this;this.finderEvents(a,function(){},function(a){console.log("register event",a),d.addEvent(a,b,c)})},e.prototype.publish=function(a,b){var c=this;this.finderEvents([a],function(a,d){var e=d.instanceOrigin,f=d.functionSelf,g=c.validateArguments(b);f.apply(e,g)},function(){})},e.prototype.validateArguments=function(a){var b=[];return"undefined"!=typeof a&&(b=a),b},e.prototype.stopSubscribe=function(a){var b=this;this.finderEvents(a,function(a,c){b.removeEvent(a)},function(){})},e.prototype.addEvent=function(a,b,c){var d={};return d.instanceOrigin=c,d.functionSelf=b,this.events[a]=d,this},e.prototype.removeEvent=function(a){delete this.events[a]},e.prototype.eventAlreadyRegistered=function(a){var b=!1;return this.getEvent(a)&&(b=!0),b},e.prototype.getEvent=function(a){return this.events[a]},e.prototype.finderEvents=function(a,b,c){for(var d=this,e=0;e<a.length;e++){var f=a[e];if(d.eventAlreadyRegistered(f)){var g=d.getEvent(f);b.call(d,f,g)}else c.call(d,f)}},yOSON.Comunicator=e;var f=function(a){this.schema=a,this.modules=this.schema.modules,this.controllers={},this.actions={}};return f.prototype.init=function(a,b,c){var d=this.checkLevelName(a),e=this.checkLevelName(b),f=this.checkLevelName(c);this.runModuleLevel(d,function(a){this.runControllerLevel(a,e,function(a){this.runActionLevel(a,f,function(a){a()},function(a){this.getByDefaultInActionLevel(a)})},function(a){this.getByDefaultInControllerLevel(a)})},function(){this.getByDefaultInModuleLevel()})},f.prototype.checkLevelName=function(a){var b="";return"undefined"==typeof a||(b=a),b},f.prototype.getModuleByName=function(a){return this.modules[a]},f.prototype.existsModuleByName=function(a){var b=!1;return this.getModuleByName(a)&&(b=!0),b},f.prototype.getByDefaultInModuleLevel=function(){if("function"!=typeof this.modules.byDefault)throw new Error("The level module dont have the default module or not is a function");this.modules.byDefault()},f.prototype.runModuleLevel=function(a,b,c){if(this.schema.modules.allModules(),this.existsModuleByName(a)){var d=this.getModuleByName(a);b.call(this,d)}else c.call(this)},f.prototype.getControllerByNameInModule=function(a,b){return b.controllers[a]},f.prototype.existsControllerByName=function(a,b){var c=!1;return this.getControllerByNameInModule(b,a)&&(c=!0),c},f.prototype.getByDefaultInControllerLevel=function(a){if("function"!=typeof a.controllers.byDefault)throw new Error("The level controller don't have the default controller or not is a function");a.controllers.byDefault()},f.prototype.runControllerLevel=function(a,b,c,d){if(a.allControllers(),this.existsControllerByName(a,b)){var e=this.getControllerByNameInModule(b,a);c.call(this,e)}else d.call(this,a)},f.prototype.getActionByNameInController=function(a,b){return b.actions[a]},f.prototype.existsActionInController=function(a,b){var c=!1;return this.getActionByNameInController(b,a)&&(c=!0),c},f.prototype.getByDefaultInActionLevel=function(a){if("function"!=typeof a.actions.byDefault)throw new Error("The level action don't have the default controller or not is a function");a.actions.byDefault()},f.prototype.runActionLevel=function(a,b,c,d){if(a.allActions(),this.existsActionInController(a,b)){var e=this.getActionByNameInController(b,a);c.call(this,e)}else d.call(this,a)},yOSON.Loader=f,yOSON.AppCore=function(){var a=new yOSON.Modular,b=new yOSON.DependencyManager,c=new yOSON.Comunicator,d={};a.addMethodToBrigde("events",function(a,b,d){c.subscribe(a,b,d)}),a.addMethodToBrigde("trigger",function(b,d){var e={};console.log("corriendo evento",b),a.allModulesRunning(function(){e[b]=d},function(){for(var a in e)c.publish(a,e[a]);c.publish(b,d)})});var e=function(a,b){d[a]=b},f=function(a){var b=[];return d[a]&&(b=d[a]),b};return{addModule:function(b,c,d){e(b,d),a.addModule(b,c)},runModule:function(c,d){var e=f(c);a.setStatusModule(c,"start"),b.ready(e,function(){a.runModule(c,d)})},setStaticHost:function(a){b.setStaticHost(a)},setVersionUrl:function(a){b.setVersionUrl(a)}}}(),yOSON}(yOSON);
//# sourceMappingURL=yoson.min.map