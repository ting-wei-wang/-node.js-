const http = require("http");

const fs = require("fs");
const port = 300;
const ip = "127.0.0.1";


const sendResponse = (filename, statusCode, response) => {
	fs.readFile(`./html/${filename}`,(error,data) => {
		if(error){
			response.statusCode = 500;
			response.setHeader("Content-Type","text/plain");
			response.end("Sorry I'm Broken ~");
        }
		else{
			response.statusCode = statusCode;
			response.setHeader("Content-Type","text/html");
			response.end(data);
		}
	});
};

const server = http.createServer((request, response) => {
	//console.log(request.url, request.method);
    const method = request.method;
    let url = request.url;

    if (method === "GET") {
    	const requestUrl = new URL(url,`http://${ip}:${port}`);
    	//console.log(requestUrl); // see URL
    	//console.log(requestUrl.searchParams.get("lang"));
    	url = requestUrl.pathname;

    	const lang = requestUrl.searchParams.get("lang");

    	let choose;

    	if(lang === null || lang === "en"){
    		choose = "";
    	}
    	else if(lang === "zh"){
    		choose = "-zh";
    	}
    	else{
    		choose = "";
    	}


    	if(url === "/"){
            sendResponse(`index${choose}.html`,200,response);
    	}
    	else if(url === "/intro.html"){
    		sendResponse(`intro${choose}.html`,200,response);
        }
    	else{
    		sendResponse(`404${choose}.html`,404,response);
        }
    }
	//response.end("hello Server");
});



server.listen(port,ip, () => {
	console.log(`Server is running at http://${ip}:${port}`);
});