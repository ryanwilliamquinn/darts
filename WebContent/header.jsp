<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>

<!doctype html>
<html lang="en" ng-app="dartsApp">
    <head>
        <title>freaking darts</title>
        <link rel="stylesheet" href="/css/main.css" type="text/css"/>
        <script src="/js/angular/angular.js"></script>
        <script src="/js/app.js"></script>
        <script src="/js/directives.js"></script>
    </head>
    <body>
        <div class="header">
            <div id="headerContent">
                <h3 id="headerTitle">Darts Practice</h3>

                <div class="headerAccount">
                    <shiro:guest>
                        <a href="/login">Login</a> | <a href="signup.jsp">Signup</a>
                    </shiro:guest>
                    <shiro:user>
                        <a href="/logout">Logout</a>
                    </shiro:user>
                </div>
                <div style="clear:both;"> </div>
            </div>
        </div>
        <div class="content">


