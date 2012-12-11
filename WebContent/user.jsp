<jsp:include page="header.jsp"/>
${userName}
<div>Twenties</div>
<form action="/twenties" name="twentiesForm" id="twentiesForm">
    <label for="twenties0">First Round</label><input type="text" id="twenties0" class="scoreInput"/>
    <input type="button" value="Submit" style="display:block;"/>
</form>
<jsp:include page="footer.jsp"/>

