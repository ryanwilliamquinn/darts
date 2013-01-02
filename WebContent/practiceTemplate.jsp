<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<jsp:include page="header.jsp"/>
<script src="/js/simplePracticeController.js"></script>
<div ng-controller="mainController">
<div style="float:left; margin-bottom:20px;">
    <div>Game mode: ${practiceMode}</div>
    <div style="float:left; margin-bottom:20px;">
        <form name="simplePracticeForm" id="simplePracticeForm" data-ng-submit="recordResult(result)">
            <label for="simplePracticeInput">Round {{round.number}}:</label><input type="text" id="simplePracticeInput" class="scoreInput" data-ng-model="result.score"/>
            <input type="Submit" value="next" style="margin-left:5px;" />
        </form>
        <input type="button" value="save round" ng-click="postResult()"/>
        <div style="margin-top:10px;">
            <div ng-repeat="result in results">
                <span>Round: {{result.round}}</span>
                <span style="margin-left:20px;">{{result.score}}</span>
            </div>
        </div>
    </div>
    <div style="float:left; margin:10px 0px 0px 20px;">
        {{results|average}}
    </div>
    <div style="margin-top:30px;">
        <div style="border-bottom:solid 1px #000; margin-bottom:20px; padding-bottom:2px; width:200px;">Past ${practiceMode} totals:</div>
        <div ng-repeat="game in games | orderBy:predicate">
            <span>{{game.date}}</span>
            <span style="margin-left:16px;">score: {{game.score}}</span>
        </div>

    </div>
</div>
<a href="/practice" style="display:block; float:right;" class="blueButton">Practice home</a>

<%-- should hide this section if all results are shown --%>
<div style="clear:both;" class="{{displayShowAll}}">
    <span ng-click="showAll()" style="cursor:pointer;" class="blueButton">Show all results</span>
</div>
</div>
<jsp:include page="footer.jsp"/>


