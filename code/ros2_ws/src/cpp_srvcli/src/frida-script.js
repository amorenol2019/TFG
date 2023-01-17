// THIS IS A JAVASCRIPT SCRIPT FOR FRIDA
// YOU CAN USE THE API https://frida.re/docs/javascript-api/
console.log("Frida version " + Frida.version + ", finding libc functions...");

var mod_intercept = Module.findExportByName("rclcpp", "async_send_request")
console.log("LOG: strlen at : " + mod_intercept);

Interceptor.attach(mod_intercept, {
	onEnter: function(args) {
		send("CALL call_async:" + Memory.readUtf8String(args[0]));
	console.log("LOG: call_async called " + Memory.readUtf8String(args[0]));
    },
	onLeave: function(retval) {
		send("RETURN call_async: " + retval);
		console.log("LOG: call_async returned " + retval);
	}
});