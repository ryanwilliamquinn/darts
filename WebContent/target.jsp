<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<jsp:include page="header.jsp"/>
<div ng-controller="mainController">
    <div style="float:left; margin-bottom:20px;">
        <div>Game mode: ${practiceMode}</div>
        <div ng-hide="isShowRounds">
            Target:
            <select ng-model="target" ng-options="target.label for target in targetTypes" ng-change="changedTarget()"></select>
            Rounds Per Game:
            <select ng-model="numRounds" ng-options="numRounds.rounds for numRounds in numRoundsAvailable" ng-change="changedRounds()"></select>
            <span type="button" ng-click="showRounds()" class="smallBlueButton" style="margin-left:20px;">Start round</span>
        </div>
        <div class="rounds" ng-show="isShowRounds">
            <form name="simplePracticeForm" id="simplePracticeForm" data-ng-submit="recordResult(result)" ng-hide="checkRoundsComplete()">
                <label for="simplePracticeInput">Round {{round.number}} of {{numRounds.id}}:</label><input type="text" id="simplePracticeInput" class="scoreInput" data-ng-model="result.score"/>
                <input type="Submit" value="next" style="margin-left:5px;" />
            </form>
            <span ng-click="postResult()" class="smallBlueButton" ng-show="checkRoundsComplete()">Save Round</span>
            <span ng-click="cancelRound()" class="smallBlueButton" style="display:inline-block; margin-left:15px;">Cancel Round</span>
            <div style="margin-top:10px;">
                <div ng-repeat="result in results">
                    Round: <span>{{result.round}}</span>
                    <span style="margin-left:20px;" >{{result.score}}</span>
                </div>
            </div>
        </div>
        <div style="float:left; margin:10px 0px 0px 20px;">
            Round average: {{results|average}}
        </div>
        <div style="clear:both; float:left; margin-top:30px;">
            <div style="border-bottom:solid 1px #000; margin-bottom:20px; padding-bottom:2px; width:200px;">Past ${practiceMode} totals:</div>
            <div ng-repeat="game in games | orderBy:predicate" ng-click="gameClicked()">
                <span>{{game.date}}</span>
                <span style="margin-left:16px;">score: {{game.score}}</span>
            </div>
        </div>
        <div style="margin:30px 0px 0px 20px; float:left;">
            All time average: {{allGames|average}}
        </div>
    </div>
    <a href="/practice" style="display:block; float:right;" class="blueButton">Practice home</a>
    <div style="clear:both;" ng-show="needsShowAll">
        <span ng-click="showAll()" style="cursor:pointer;" class="blueButton">Show all results</span>
    </div>
</div>

<script src="/js/angular/angular.js"></script>
<script src="/js/directives.js"></script>
<script src="/js/services.js"></script>
<script src="/js/filters.js"></script>
<script src="/js/utils.js"></script>
<script src="/js/dartsApp.js"></script>
<script src="/js/targetController.js"></script>
<jsp:include page="footer.jsp"/>


