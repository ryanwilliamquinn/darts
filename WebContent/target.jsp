<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<jsp:include page="header.jsp"/>

<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<div ng-controller="mainController">
    <div style="float:left; margin-bottom:20px;">
        <div>Game mode: ${practiceMode}</div>
        <div ng-hide="isShowRounds">
            Target:
            <select ng-model="target" ng-options="target.label for target in targetTypes" ng-change="changedTarget()"></select>
            Rounds Per Game:
            <select ng-model="numRounds" ng-options="numRounds.rounds for numRounds in numRoundsAvailable" ng-change="changedRounds()"></select>
            <span ng-click="showRounds()" class="smallButton blue" style="margin-left:20px;">Start game</span>
        </div>
        <div class="rounds" ng-show="isShowRounds">
            <form name="simplePracticeForm" id="simplePracticeForm" data-ng-submit="recordResult(result)" ng-hide="checkRoundsComplete()">
                <label for="simplePracticeInput">Round {{round.number}} of {{numRounds.id}}:</label><input type="text" id="simplePracticeInput" class="scoreInput" data-ng-model="result.score"/>
                <input type="Submit" value="next" style="margin:5px; line-height:20px;" class="blue button" />
            </form>
            <span ng-click="postResult()" class="smallButton blue" ng-show="checkRoundsComplete()">Save game</span>
            <div style="margin-top:10px;">
                <div ng-repeat="result in results">
                    Round: <span>{{result.round}}</span>
                    <span style="margin-left:20px;" >{{result.score}}</span>
                </div>
            </div>

            <span ng-click="cancelGame()" class="smallButton red" style="display:inline-block;">Cancel game</span>
        </div>
        <div style="float:left; margin:5px 0px 0px 20px;" ng-show="results.length > 0">
            Round average: {{results|runningAverage}}
        </div>
        <div style="clear:both; float:left; margin-top:30px;">
            <div style="border-bottom:solid 1px #000; margin-bottom:20px; padding-bottom:2px; width:200px;">Past ${practiceMode} totals:</div>
            <div ng-repeat="game in games | orderBy:predicate" ng-click="gameClicked()">
                <span>{{game.date}}</span>
                <span style="margin-left:16px;">Average score: {{game.avg}}</span>
            </div>
        </div>
        <div style="margin:30px 0px 0px 20px; float:left;" ng-show="allGames.length > 0">
            All time average: {{allGames|lifetimeAverage}}
        </div>
    </div>
    <a href="/practice" style="display:block; float:right;" class="button blue">Practice home</a>
    <div style="clear:both;" ng-show="needsShowAll">
        <span ng-click="showAll()" style="cursor:pointer;" class="button blue">Show all results</span>
    </div>
            <div google-chart></div>

</div>

<div id="chart_div" style="clear:both; width:400; height:300"></div>


<script src="/js/angular/angular.js"></script>
<script src="/js/directives.js"></script>
<script src="/js/services.js"></script>
<script src="/js/filters.js"></script>
<script src="/js/utils.js"></script>
<script src="/js/dartsApp.js"></script>
<script src="/js/targetController.js"></script>
<jsp:include page="footer.jsp"/>


