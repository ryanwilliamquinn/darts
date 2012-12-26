<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<div style="font-size:13px;">Welcome back <shiro:principal/></div>
<div>
    <span>Play a game</span>
    <div>
        <a class="blueButton" href="/games/twenties">twenties</a>
        <a class="blueButton" href="/games/bulls">bulls</a>
        <a class="blueButton" href="/games/301">301</a>
    </div>
</div>


