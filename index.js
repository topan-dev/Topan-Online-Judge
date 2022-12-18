function install(name){
    var res=require(name);
    console.log('Package '+name+' has been loaded.');
    return res;
}
var addifiles={};
addifiles.express=install('express');
addifiles.fileops=install('fs');
addifiles.terread=install('readline');
addifiles.terread_reader=addifiles.terread
    .createInterface({input:process.stdin,output:process.stdout});

var sys=addifiles.express();

addifiles.fileops.readFile('/cfg/port.cfg','utf8',(err,data)=>{
    if(err||data.length<=1){
        addifiles.terread_reader.question(
            "Input Port: ",
            function(res){
                sys.listen(res,function(){
                    console.log("Start to listen port "+String(res)+".");
                });
            }
        );
    }
    else{
        sys.listen(Number(data),function(){
            console.log("Start to listen port "+data+".");
        });
    }
});

sys.get("/f/*",function(req,res){
    var ip=req.ip,url=req.path,host=req.host;
    res.download("data"+url);
});
sys.get("/",function(req,res){
    var ip=req.ip,url=req.path,host=req.host;
    res.send(`
        <!DOCTYPE html>
        <html lang="zh-CN">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width">
                <title id="title">首页 - Topan Online Judge</title>
                <script src="/f/ui/src/jquery.js"></script>
                <link rel="stylesheet" href="/f/ui/topan.css">
                <script src="/f/ui/topan.js"></script>
                <style>
                </style>
            </head>
            <body>
                <div class="topan-header">
                    <div class="topan-header-home">
                        <a href="/">
                            <button class="topan-button-ordinary topan-button-commonly topan-button-header-round-left">
                                <i class="fa fa-home"></i>
                            </button>
                        </a>
                    </div>
                    <div class="topan-header-left">
                        <span class="topan-header-text">TopanOJ&nbsp;</span>
                        <a href="/repo/TopanUI/docs/test.html">
                            <span class="topan-button-ordinary topan-button-commonly topan-button-header-block">
                                <i class="fa fa-solid fa-umbrella"></i>
                                <span>&nbsp;Repositories</span>
                            </span>
                        </a>
                        <a href="https://github.com/topan-dev/">
                            <span class="topan-button-ordinary topan-button-commonly topan-button-header-block">
                                <i class="fa fa-brands fa-github"></i>
                                <span>&nbsp;GitHub</span>
                            </span>
                        </a>
                    </div>
                    <div class="topan-header-right">
                        <a href="/">
                            <button class="topan-button-ordinary topan-button-commonly topan-button-header-round-right">
                                <i class="fa fa-solid fa-rotate-right"></i>
                            </button>
                        </a>
                    </div>
                </div>
                <div class="topan-outer">
                    <div class="topan-page">
                        <div class="topan-mainpage-auto">
                            <br>
                            <h1 class="topan-center"><span>T</span>o<span>p</span>an <span>Dev</span>elopment Group</h1>
                            <h3 id="members"><i class="fa fa-solid fa-users"></i>&nbsp;&nbsp;Members</h3>
                            <div class="membercard">
                                <img src="https://molmin.github.io/file/image/head.png" width="100px" height="100px" class="topan-roundimage">
                                <div>
                                    <h3>Milmon</h3>
                                    <p><i class="fa fa-solid fa-envelope"></i>&nbsp;&nbsp;milmon@qq.com&nbsp;&nbsp;&nbsp;<a href="https://github.com/Molmin/"><i class="fa fa-brands fa-github"></i>&nbsp;&nbsp;GitHub</a></p>
                                </div>
                            </div>
                            <div style="display: block; position: relative; float: left; width: 10px;">&nbsp;</div>
                        </div>
                        <footer class="topan-footer">
                            <p></p>
                            <p style="text-align: center; color: #555; font-size: 12px;">
                                Copyright (c) 2022 <a href="https://github.com/topan-dev/">Topan Development Group</a>. Released under the MIT License.
                            </p>
                        </footer>
                    </div>
                </div>
            </body>
        </html>
        `);
});