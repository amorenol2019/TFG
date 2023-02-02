// THIS IS A JAVASCRIPT SCRIPT FOR FRIDA
// YOU CAN USE THE API https://frida.re/docs/javascript-api/
console.log("Frida version " + Frida.version + ", finding libc functions...");


var waitModule = function (callback) {
    var interval = setInterval(function () { // La función setInterval() se utiliza comúnmente para establecer un retardo en funciones que son ejecutadas una y otra vez,
		var mod_intercept_lib = Module.findBaseAddress("rclcpp")
        if (mod_intercept_lib != null) {
			console.log("LOG: rclcpp at : " + mod_intercept_lib);
            callback(mod_intercept_lib);
            return;
        }
		//No sale de bucle porque mod_intercept_lib siempre es null
    }, 0);
}

waitModule((param) => {
	var mod_intercept = Module.getExportByName('rclcpp', 'async_send_request');
	console.log("LOG: rclcpp at : " + mod_intercept);

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
});


 

//EJECUCION CLIENTE Y SERVIDOR /TFG/code/ros2_ws/install/cpp_srvcli/lib/cpp_srvcli

//Bitácora: https://sway.office.com/CcAF9aDrLfMkgb9U?authoringPlay=true&publish
//https://urjc-my.sharepoint.com/:w:/r/personal/a_morenol_2019_alumnos_urjc_es/_layouts/15/doc2.aspx?sourcedoc=%7B61D2B483-B443-4877-8309-F08CC22E9BB4%7D&file=TFG_Bit%C3%A1cora.docx&action=default&mobileredirect=true&DefaultItemOpen=1&ct=1675248562532&wdOrigin=OFFICECOM-WEB.START.REC&cid=9969fca9-36cc-4693-962d-3d657da3be7e