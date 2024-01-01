<template>
    <div id="boardPositionPopUpContainer" ref="boardPositionPopUpContainer" style="display: none;">
        <section class="gridContainer" ref="gridContainerPopUp">
            <div class="gridItem">1</div>
            <div class="gridItem">
                <PlayerBank :boardPosition=1 :function="'popUp'" :playerPositions="playerPositions"
                    :activePlayerData="activePlayerData" :colors="colors"></PlayerBank>
            </div>
            <div class="gridItem">3</div>
            <div class="gridItem">
                <PlayerBank :boardPosition=4 :function="'popUp'" :playerPositions="playerPositions"
                    :activePlayerData="activePlayerData" :colors="colors"></PlayerBank>
            </div>
            <div class="gridItem">
                <button v-if="!nonSeatedPlayers" @click="fetchSetPlayerPositions()">Safe and Start Game</button>
            </div>
            <div class="gridItem">
                <PlayerBank :boardPosition=2 :function="'popUp'" :playerPositions="playerPositions"
                    :activePlayerData="activePlayerData" :colors="colors"></PlayerBank>
            </div>
            <div class="gridItem"></div>
            <div class="gridItem">
                <PlayerBank :boardPosition=3 :function="'popUp'" :playerPositions="playerPositions"
                    :activePlayerData="activePlayerData" :colors="colors"></PlayerBank>
            </div>
            <div class="gridItem"></div>
        </section>
    </div>

    <!-- <div id="gameBox" @mousemove="trackMousePosition($event)"> -->
    <div id="gameBox">
        <div id="items">
            <!-- <Item v-for="item in itemsOnBoard" :positionTop="item.position.yPosition"
                :positionLeft="item.position.xPosition" :owner="item.owner_id_player" :itemTypeId="item.id_item_type"
                :itemId="item.rel_player_item_played_id" :item_types="item_types" @updateSelectedItem="updateSelectedItem">
            </Item> -->
        </div>
        <section class="gridContainer" ref="gridContainerPlayfield">
            <div class="gridItem">1</div>
            <div class="gridItem">
                <PlayerBank :boardPosition=1 :function="'inGame'" :playerPositions="playerPositions"
                    :activePlayerData="activePlayerData" :colors="colors" :playedItems="playedItems"></PlayerBank>
            </div>
            <div class="gridItem">3</div>
            <div class="gridItem">
                <PlayerBank :boardPosition=4 :function="'inGame'" :playerPositions="playerPositions"
                    :activePlayerData="activePlayerData" :colors="colors" :playedItems="playedItems"></PlayerBank>
            </div>
            <!-- <div class="gridItem gridEdge" id="personalEdgeTop">{{ mousePosition.mouseXPosition + "|" +
                mousePosition.mouseYPosition }} {{ playerPositions[1] }}</div>
            <div class="gridItem" id="player1Field" v-if="item_types != null && itemArrayPlayer1 != null">
                <MainItem class="mainItem top" v-for="item in itemArrayPlayer1" v-if="playerPositions[1] != null"
                    :style="{ width: (0.8 * screenSize.windowWidth) / 14 + 'px', margin: defineMargin('player1') }"
                    :position="item.position" :item_types="item_types" :currentItem="item" @emitMainItem="emitMainItem">
                </MainItem>
                <section class="hoverBanksTopBottom" v-if="playerPositions[1] != null">
                    <div id="hoverToSideDevicePlayer1" @mouseenter="sendCardVisualFeedbackMain(1, true)"
                        @mouseleave="sendCardVisualFeedbackMain(1, false)" @click="itemToSideDevice(1)"></div>
                    <div id="hoverToBankPlayer1" @click="itemToBank(1)">

                    </div>
                </section>


            </div>
            <div class="gridItem gridEdge" id="personalEdgeRight">{{ playerPositions[2] }}</div>
            <div class="gridItem" id="player4Field" v-if="item_types != null && itemArrayPlayer4 != null">
                <MainItem class="mainItem left" v-for="item in itemArrayPlayer4" v-if="playerPositions[4] != null"
                    :style="{ height: (0.8 * screenSize.windowHeight) / 9 + 'px', margin: defineMargin('player4') }"
                    :position="item.position" :item_types="item_types" :currentItem="item" @emitMainItem="emitMainItem">
                </MainItem>
                <section class="hoverBanksLeftRight" v-if="playerPositions[4] != null">
                    <div id="hoverToSideDevicePlayer4" @mouseenter="sendCardVisualFeedbackMain(4, true)"
                        @mouseleave="sendCardVisualFeedbackMain(4, false)" @click="itemToSideDevice(4)"></div>
                    <div id="hoverToBankPlayer4" @click="itemToBank(4)">

                    </div>
                </section>
            </div>-->
            <div class="gridItem" id="middleGridItem">
                <!-- Nachziehstapel -->
                <section id="drawPiles">
                    <div id="drawPileBrick" class="drawPileCard">
                        <img src="@/assets/resources_horizontal/card_brick.svg" alt="card_brick">
                        <!-- <p>Lehm</p> -->
                    </div>
                    <div id="drawPileOre" class="drawPileCard">
                        <img src="@/assets/resources_horizontal/card_ore.svg" alt="card_ore">
                        <!-- <p>Erz</p> -->
                    </div>
                    <div id="drawPileWool" class="drawPileCard">
                        <img src="@/assets/resources_horizontal/card_wool.svg" alt="card_wool">
                        <!-- <p>Wolle</p> -->
                    </div>
                    <div id="drawPileGrain" class="drawPileCard">
                        <img src="@/assets/resources_horizontal/card_grain.svg" alt="card_grain">
                        <!-- <p>Getreide</p> -->
                    </div>
                    <div id="drawPileLumber" class="drawPileCard">
                        <img src="@/assets/resources_horizontal/card_lumber.svg" alt="card_lumber">
                        <!-- <p>Holz</p> -->
                    </div>
                    <div id="drawPileDevelopmentCard" class="drawPileCard">
                        <img src="@/assets/resources_horizontal/card_classic_back.svg" alt="card_development">
                        <!-- <p>Entwicklungskarte</p> -->
                    </div>
                </section>

                <!-- Spielfeld -->
                <svg id="playfield" ref="playfield" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1992.35 1725.42">
                    <!--Place svg below-->
                    <!-- <g id="Spielfeld">
                        <g id="Spielfeld_Sand">
                            <polygon
                                points="498.09 1725.42 0 862.71 498.09 0 1494.26 0 1992.35 862.71 1494.26 1725.42 498.09 1725.42"
                                style="fill: #c59b6b; stroke-width: 0px;" />
                        </g>
                        <g id="Positions_Players">
                            <g id="Gitter">
                                <g>
                                    <polyline points="1176.99 350.22 1172.67 347.69 1172.67 342.69"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1172.67" y1="250.44" x2="1172.67" y2="192.78"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1172.67 146.65 1172.67 141.65 1176.99 139.13"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1255.94" y1="93.02" x2="1305.28" y2="64.21"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1344.76 41.15 1349.08 38.63 1353.39 41.15"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1432.35" y1="87.26" x2="1481.69" y2="116.08"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1521.17 139.13 1525.49 141.65 1525.49 146.65"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1525.49" y1="238.91" x2="1525.49" y2="296.57"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1525.49 342.7 1525.49 347.7 1521.17 350.22"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1442.22" y1="396.32" x2="1392.87" y2="425.14"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1353.39 448.19 1349.08 450.72 1344.76 448.19"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1265.81" y1="402.09" x2="1216.46" y2="373.27"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="824.17 350.22 819.85 347.69 819.85 342.69"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="819.85" y1="250.44" x2="819.85" y2="192.78"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="819.85 146.65 819.85 141.65 824.17 139.13"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="903.12" y1="93.02" x2="952.46" y2="64.21"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="991.94 41.15 996.26 38.63 1000.58 41.15"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1079.53" y1="87.26" x2="1128.87" y2="116.08"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1168.35 139.13 1172.67 141.65 1172.67 146.65"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1172.67" y1="238.91" x2="1172.67" y2="296.57"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1172.67 342.7 1172.67 347.7 1168.35 350.22"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1089.4" y1="396.32" x2="1040.05" y2="425.14"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1000.58 448.19 996.26 450.72 991.94 448.19"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="912.99" y1="402.09" x2="863.64" y2="373.27"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="471.35 350.22 467.03 347.69 467.03 342.69"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="467.03" y1="250.44" x2="467.03" y2="192.78"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="467.03 146.65 467.03 141.65 471.35 139.13"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="550.3" y1="93.02" x2="599.65" y2="64.21"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="639.12 41.15 643.44 38.63 647.76 41.15"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="726.71" y1="87.26" x2="776.06" y2="116.08"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="815.53 139.13 819.85 141.65 819.85 146.65"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="819.85" y1="238.91" x2="819.85" y2="296.57"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="819.85 342.69 819.85 347.69 815.53 350.22"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="736.58" y1="396.32" x2="687.23" y2="425.14"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="647.76 448.19 643.44 450.72 639.12 448.19"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="560.17" y1="402.09" x2="510.82" y2="373.27"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="1000.7 659.39 996.39 656.87 996.39 651.87"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="996.39" y1="559.61" x2="996.39" y2="501.95"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="996.39 455.82 996.39 450.82 1000.7 448.3"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1079.66" y1="402.2" x2="1129" y2="373.38"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1168.48 350.33 1172.8 347.8 1177.11 350.33"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1256.07" y1="396.43" x2="1305.41" y2="425.25"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1344.89 448.3 1349.2 450.82 1349.2 455.82"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1349.2" y1="548.08" x2="1349.2" y2="605.74"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1349.2 651.87 1349.2 656.87 1344.89 659.39"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1265.93" y1="705.5" x2="1216.59" y2="734.31"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1177.11 757.37 1172.79 759.89 1168.48 757.37"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1089.52" y1="711.26" x2="1040.18" y2="682.44"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="647.88 659.39 643.57 656.87 643.57 651.87"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="643.57" y1="559.61" x2="643.57" y2="501.95"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="643.57 455.82 643.57 450.82 647.89 448.3"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="726.84" y1="402.2" x2="776.18" y2="373.38"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="815.66 350.33 819.98 347.8 824.29 350.33"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="903.25" y1="396.43" x2="952.59" y2="425.25"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="992.07 448.3 996.39 450.82 996.39 455.82"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="996.39" y1="548.08" x2="996.39" y2="605.74"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="996.39 651.87 996.39 656.87 992.07 659.39"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="913.12" y1="705.5" x2="863.77" y2="734.31"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="824.29 757.37 819.98 759.89 815.66 757.37"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="736.71" y1="711.26" x2="687.36" y2="682.44"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="295.07 659.39 290.75 656.87 290.75 651.87"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="290.75" y1="559.61" x2="290.75" y2="501.95"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="290.75 455.82 290.75 450.82 295.07 448.3"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="374.02" y1="402.2" x2="423.36" y2="373.38"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="462.84 350.33 467.16 347.8 471.48 350.33"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="550.43" y1="396.43" x2="599.77" y2="425.25"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="639.25 448.3 643.57 450.82 643.57 455.82"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="643.57" y1="548.08" x2="643.57" y2="605.74"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="643.57 651.87 643.57 656.87 639.25 659.39"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="560.3" y1="705.5" x2="510.95" y2="734.31"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="471.48 757.37 467.16 759.89 462.84 757.37"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="383.89" y1="711.26" x2="334.54" y2="682.44"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="1697.71 448.3 1702.02 450.83 1702.02 455.83"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1702.02" y1="548.08" x2="1702.02" y2="605.74"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1702.02 651.87 1702.02 656.87 1697.7 659.39"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1618.75" y1="705.5" x2="1569.41" y2="734.31"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1529.93 757.37 1525.61 759.89 1521.3 757.37"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1442.34" y1="711.26" x2="1393" y2="682.44"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1353.52 659.39 1349.2 656.87 1349.2 651.87"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1349.2" y1="559.61" x2="1349.2" y2="501.95"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1349.2 455.82 1349.2 450.82 1353.52 448.3"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1432.47" y1="402.2" x2="1481.82" y2="373.38"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1521.3 350.33 1525.61 347.8 1529.93 350.33"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1608.88" y1="396.43" x2="1658.23" y2="425.25"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="648.34 1277.49 644.02 1274.97 644.02 1269.97"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="644.02" y1="1177.71" x2="644.02" y2="1120.05"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="644.02 1073.93 644.02 1068.93 648.34 1066.4"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="727.29" y1="1020.3" x2="776.63" y2="991.48"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="816.11 968.43 820.43 965.9 824.75 968.43"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="903.7" y1="1014.53" x2="953.04" y2="1043.35"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="992.52 1066.4 996.84 1068.93 996.84 1073.93"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="996.84" y1="1166.18" x2="996.84" y2="1223.84"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="996.84 1269.97 996.84 1274.97 992.52 1277.49"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="913.57" y1="1323.6" x2="864.22" y2="1352.41"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="824.74 1375.47 820.43 1377.99 816.11 1375.47"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="737.16" y1="1329.36" x2="687.81" y2="1300.54"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="639.7 1066.4 644.02 1068.93 644.02 1073.93"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="644.02" y1="1166.18" x2="644.02" y2="1223.84"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="644.02 1269.97 644.02 1274.97 639.7 1277.49"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="560.75" y1="1323.6" x2="511.4" y2="1352.41"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="471.93 1375.47 467.61 1377.99 463.29 1375.47"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="384.34" y1="1329.36" x2="334.99" y2="1300.54"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="295.52 1277.49 291.2 1274.97 291.2 1269.97"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="291.2" y1="1177.71" x2="291.2" y2="1120.05"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="291.2 1073.92 291.2 1068.92 295.52 1066.4"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="374.47" y1="1020.3" x2="423.82" y2="991.48"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="463.29 968.43 467.61 965.9 471.93 968.43"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="550.88" y1="1014.53" x2="600.22" y2="1043.35"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="1345.34 1066.4 1349.66 1068.93 1349.66 1073.93"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1349.65" y1="1166.18" x2="1349.65" y2="1223.84"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1349.65 1269.97 1349.65 1274.97 1345.34 1277.49"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1266.38" y1="1323.6" x2="1217.04" y2="1352.41"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1177.56 1375.47 1173.25 1377.99 1168.93 1375.47"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1089.98" y1="1329.36" x2="1040.63" y2="1300.54"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1001.15 1277.49 996.84 1274.97 996.84 1269.97"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="996.84" y1="1177.71" x2="996.84" y2="1120.05"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="996.84 1073.93 996.84 1068.93 1001.15 1066.4"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1080.11" y1="1020.3" x2="1129.45" y2="991.48"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1168.93 968.43 1173.25 965.9 1177.56 968.43"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1256.52" y1="1014.53" x2="1305.86" y2="1043.35"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="1353.97 1277.49 1349.65 1274.97 1349.65 1269.97"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1349.65" y1="1177.71" x2="1349.66" y2="1120.05"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1349.66 1073.93 1349.66 1068.93 1353.97 1066.4"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1432.93" y1="1020.3" x2="1482.27" y2="991.48"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1521.75 968.43 1526.06 965.9 1530.38 968.43"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1609.33" y1="1014.53" x2="1658.68" y2="1043.35"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1698.16 1066.4 1702.47 1068.93 1702.47 1073.93"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1702.47" y1="1166.18" x2="1702.47" y2="1223.84"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1702.47 1269.97 1702.47 1274.97 1698.16 1277.49"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1619.2" y1="1323.6" x2="1569.86" y2="1352.41"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1530.38 1375.47 1526.06 1377.99 1521.75 1375.47"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1442.79" y1="1329.36" x2="1393.45" y2="1300.54"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="471.79 1586.29 467.47 1583.77 467.47 1578.77"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="467.47" y1="1486.52" x2="467.47" y2="1428.86"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="467.47 1382.73 467.47 1377.73 471.79 1375.21"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="550.74" y1="1329.1" x2="600.09" y2="1300.28"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="639.56 1277.23 643.88 1274.71 648.2 1277.23"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="727.15" y1="1323.34" x2="776.5" y2="1352.15"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="815.97 1375.21 820.29 1377.73 820.29 1382.73"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="820.29" y1="1474.98" x2="820.29" y2="1532.64"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="820.29 1578.77 820.29 1583.77 815.97 1586.29"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="737.02" y1="1632.4" x2="687.67" y2="1661.22"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="648.2 1684.27 643.88 1686.79 639.56 1684.27"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="560.61" y1="1638.16" x2="511.27" y2="1609.35"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="1168.79 1375.21 1173.11 1377.73 1173.11 1382.73"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1173.11" y1="1474.98" x2="1173.11" y2="1532.64"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1173.11 1578.77 1173.11 1583.77 1168.79 1586.29"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1089.84" y1="1632.4" x2="1040.49" y2="1661.22"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1001.02 1684.27 996.7 1686.79 992.38 1684.27"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="913.43" y1="1638.16" x2="864.08" y2="1609.35"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="824.61 1586.29 820.29 1583.77 820.29 1578.77"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="820.29" y1="1486.52" x2="820.29" y2="1428.86"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="820.29 1382.73 820.29 1377.73 824.61 1375.21"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="903.56" y1="1329.1" x2="952.91" y2="1300.28"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="992.38 1277.23 996.7 1274.71 1001.02 1277.23"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1079.97" y1="1323.34" x2="1129.31" y2="1352.15"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="1177.43 1586.29 1173.11 1583.77 1173.11 1578.77"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1173.11" y1="1486.52" x2="1173.11" y2="1428.86"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1173.11 1382.73 1173.11 1377.73 1177.43 1375.21"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1256.38" y1="1329.1" x2="1305.72" y2="1300.28"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1345.2 1277.23 1349.52 1274.71 1353.84 1277.23"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1432.79" y1="1323.34" x2="1482.13" y2="1352.15"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1521.61 1375.21 1525.93 1377.73 1525.93 1382.73"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1525.93" y1="1474.98" x2="1525.93" y2="1532.64"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1525.93 1578.77 1525.93 1583.77 1521.61 1586.29"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1442.66" y1="1632.4" x2="1393.31" y2="1661.22"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1353.84 1684.27 1349.52 1686.79 1345.2 1684.27"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1266.25" y1="1638.16" x2="1216.9" y2="1609.35"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="825.08 968.23 820.76 965.71 820.76 960.71"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="820.76" y1="868.45" x2="820.76" y2="810.79"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="820.76 764.67 820.76 759.67 825.08 757.14"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="904.04" y1="711.04" x2="953.38" y2="682.22"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="992.86 659.17 997.17 656.64 1001.49 659.17"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1080.44" y1="705.27" x2="1129.79" y2="734.09"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1169.27 757.14 1173.58 759.67 1173.58 764.67"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1173.58" y1="856.92" x2="1173.58" y2="914.58"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1173.58 960.71 1173.58 965.71 1169.27 968.23"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1090.31" y1="1014.34" x2="1040.97" y2="1043.15"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1001.49 1066.21 997.17 1068.73 992.86 1066.21"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="913.9" y1="1020.1" x2="864.56" y2="991.28"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="472.26 968.23 467.95 965.71 467.95 960.71"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="467.95" y1="868.45" x2="467.95" y2="810.79"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="467.95 764.67 467.95 759.67 472.26 757.14"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="551.22" y1="711.04" x2="600.56" y2="682.22"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="640.04 659.17 644.36 656.64 648.67 659.17"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="727.63" y1="705.27" x2="776.97" y2="734.09"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="816.45 757.14 820.76 759.67 820.76 764.67"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="820.76" y1="856.92" x2="820.76" y2="914.58"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="820.76 960.71 820.76 965.71 816.45 968.23"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="737.49" y1="1014.34" x2="688.15" y2="1043.15"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="648.67 1066.21 644.36 1068.73 640.04 1066.21"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="561.09" y1="1020.1" x2="511.74" y2="991.28"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="463.63 757.14 467.95 759.67 467.95 764.67"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="467.95" y1="856.92" x2="467.95" y2="914.58"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="467.95 960.71 467.95 965.71 463.63 968.23"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="384.68" y1="1014.34" x2="335.33" y2="1043.15"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="295.85 1066.21 291.54 1068.73 287.22 1066.21"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="208.27" y1="1020.1" x2="158.92" y2="991.28"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="119.45 968.23 115.13 965.71 115.13 960.71"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="115.13" y1="868.45" x2="115.13" y2="810.79"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="115.13 764.67 115.13 759.67 119.45 757.14"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="198.4" y1="711.04" x2="247.74" y2="682.22"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="287.22 659.17 291.54 656.64 295.86 659.17"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="374.81" y1="705.27" x2="424.15" y2="734.09"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="1177.9 968.23 1173.58 965.71 1173.58 960.71"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1173.58" y1="868.45" x2="1173.58" y2="810.79"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1173.58 764.67 1173.58 759.67 1177.9 757.14"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1256.85" y1="711.04" x2="1306.2" y2="682.22"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1345.68 659.17 1349.99 656.65 1354.31 659.17"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1433.26" y1="705.27" x2="1482.61" y2="734.09"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1522.08 757.14 1526.4 759.67 1526.4 764.67"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1526.4" y1="856.92" x2="1526.4" y2="914.58"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1526.4 960.71 1526.4 965.71 1522.08 968.23"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1443.13" y1="1014.34" x2="1393.79" y2="1043.15"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1354.31 1066.21 1349.99 1068.73 1345.67 1066.21"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1266.72" y1="1020.1" x2="1217.38" y2="991.28"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                                <g>
                                    <polyline points="1874.9 757.14 1879.22 759.67 1879.22 764.67"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1879.22" y1="856.92" x2="1879.22" y2="914.58"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1879.22 960.71 1879.22 965.71 1874.9 968.23"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1795.95" y1="1014.34" x2="1746.6" y2="1043.15"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1707.13 1066.21 1702.81 1068.73 1698.49 1066.21"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1619.54" y1="1020.1" x2="1570.2" y2="991.28"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1530.72 968.23 1526.4 965.71 1526.4 960.71"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1526.4" y1="868.45" x2="1526.4" y2="810.79"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.53 92.25; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1526.4 764.67 1526.4 759.67 1530.72 757.14"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1609.67" y1="711.04" x2="1659.02" y2="682.22"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <polyline points="1698.49 659.17 1702.81 656.65 1707.13 659.17"
                                        style="fill: none; stroke: #221f22; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                    <line x1="1786.08" y1="705.27" x2="1835.43" y2="734.09"
                                        style="fill: none; stroke: #221f22; stroke-dasharray: 0 0 11.43 91.43; stroke-linecap: round; stroke-linejoin: round; stroke-width: 11px;" />
                                </g>
                            </g>
                        </g>
                    </g> -->
                    <!-- <g id="Rohstoff_Felder_und_Nummern">
                        <g id="fields_field4">
                            <polygon
                                points="1494.13 1559.09 1348.62 1643.1 1203.11 1559.09 1203.11 1391.07 1348.62 1307.05 1494.13 1391.07 1494.13 1559.09"
                                style="fill: #fcd800; stroke-width: 0px;" />
                            <g>
                                <line x1="1250.96" y1="1445.84" x2="1363.98" y2="1405.55"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1254.57" y1="1451.29" x2="1367.59" y2="1411.01"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1257.33" y1="1457.38" x2="1370.35" y2="1417.09"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1260.72" y1="1464.51" x2="1373.74" y2="1424.23"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1264.75" y1="1471.44" x2="1377.77" y2="1431.15"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1268.15" y1="1477.53" x2="1381.17" y2="1437.24"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1271.12" y1="1484.66" x2="1384.14" y2="1444.38"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1274.94" y1="1491.59" x2="1387.96" y2="1451.3"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <line x1="1222.32" y1="1518.24" x2="1335.33" y2="1477.95"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1225.93" y1="1523.69" x2="1338.94" y2="1483.41"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1228.68" y1="1529.78" x2="1341.7" y2="1489.5"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1345.1" y1="1496.63" x2="1232.08" y2="1536.92"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1236.11" y1="1543.84" x2="1349.13" y2="1503.56"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1239.5" y1="1549.93" x2="1352.52" y2="1509.64"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1242.48" y1="1557.06" x2="1355.49" y2="1516.78"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1246.29" y1="1563.99" x2="1359.31" y2="1523.7"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <line x1="1411.24" y1="1490.6" x2="1358.35" y2="1383.91"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1417.9" y1="1488.43" x2="1365.01" y2="1381.74"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1424.91" y1="1485.38" x2="1372.02" y2="1378.7"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1431.9" y1="1482.78" x2="1379.01" y2="1376.09"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1438.58" y1="1480.83" x2="1385.7" y2="1374.15"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1445.03" y1="1478.45" x2="1392.14" y2="1371.77"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1451.41" y1="1475.62" x2="1398.52" y2="1368.93"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1458.61" y1="1473.22" x2="1405.72" y2="1366.54"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <line x1="1390.54" y1="1579.54" x2="1337.65" y2="1472.85"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1397.2" y1="1577.37" x2="1344.31" y2="1470.69"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1404.21" y1="1574.32" x2="1351.33" y2="1467.64"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1411.2" y1="1571.72" x2="1358.32" y2="1465.03"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1417.89" y1="1569.77" x2="1365" y2="1463.09"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1424.33" y1="1567.4" x2="1371.45" y2="1460.71"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1430.71" y1="1564.56" x2="1377.82" y2="1457.87"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1437.91" y1="1562.16" x2="1385.03" y2="1455.48"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path d="M1362.16,1439.94c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M1362.1,1439.96c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="1359.74" cy="1449.41" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1367.68,1454.63c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1372.14,1446.86c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1370.15,1445.39c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1369.94,1450.17c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M1298.08,1447.07c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M1298.02,1447.09c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="1295.66" cy="1456.55" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1303.6,1461.76c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1308.06,1454c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1306.07,1452.53c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1305.86,1457.3c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M1292.78,1515.07c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M1292.72,1515.09c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="1290.35" cy="1524.54" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1298.3,1529.76c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1302.75,1521.99c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1300.77,1520.52c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1300.56,1525.3c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M1400.99,1408.46c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M1400.93,1408.48c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="1398.57" cy="1417.93" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1406.51,1423.15c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1410.97,1415.38c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1408.98,1413.91c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1408.77,1418.69c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M1411.82,1428.6c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M1411.75,1428.62c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="1409.39" cy="1438.08" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1417.33,1443.29c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1421.79,1435.53c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1419.8,1434.06c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1419.59,1438.84c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M1308.91,1425.88c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M1308.84,1425.89c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="1306.48" cy="1435.35" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1314.42,1440.57c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1318.88,1432.8c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1316.9,1431.33c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1316.68,1436.11c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                        </g>
                        <g id="fields_field3">
                            <polygon
                                points="616.13 1253.09 470.62 1337.1 325.11 1253.09 325.11 1085.07 470.62 1001.05 616.13 1085.07 616.13 1253.09"
                                style="fill: #fcd800; stroke-width: 0px;" />
                            <g>
                                <line x1="372.96" y1="1139.84" x2="485.98" y2="1099.55"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="376.57" y1="1145.29" x2="489.59" y2="1105.01"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="379.33" y1="1151.38" x2="492.35" y2="1111.09"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="382.72" y1="1158.51" x2="495.74" y2="1118.23"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="386.75" y1="1165.44" x2="499.77" y2="1125.15"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="390.15" y1="1171.53" x2="503.17" y2="1131.24"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="393.12" y1="1178.66" x2="506.14" y2="1138.38"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="396.94" y1="1185.59" x2="509.96" y2="1145.3"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <line x1="344.32" y1="1212.24" x2="457.33" y2="1171.95"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="347.93" y1="1217.69" x2="460.94" y2="1177.41"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="350.68" y1="1223.78" x2="463.7" y2="1183.5"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="467.1" y1="1190.63" x2="354.08" y2="1230.92"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="358.11" y1="1237.84" x2="471.13" y2="1197.56"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="361.5" y1="1243.93" x2="474.52" y2="1203.64"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="364.48" y1="1251.06" x2="477.49" y2="1210.78"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="368.29" y1="1257.99" x2="481.31" y2="1217.7"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <line x1="533.24" y1="1184.6" x2="480.35" y2="1077.91"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="539.9" y1="1182.43" x2="487.01" y2="1075.74"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="546.91" y1="1179.38" x2="494.02" y2="1072.7"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="553.9" y1="1176.78" x2="501.01" y2="1070.09"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="560.58" y1="1174.83" x2="507.7" y2="1068.15"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="567.03" y1="1172.45" x2="514.14" y2="1065.77"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="573.41" y1="1169.62" x2="520.52" y2="1062.93"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="580.61" y1="1167.22" x2="527.72" y2="1060.54"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <line x1="512.54" y1="1273.54" x2="459.65" y2="1166.85"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="519.2" y1="1271.37" x2="466.31" y2="1164.69"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="526.21" y1="1268.32" x2="473.33" y2="1161.64"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="533.2" y1="1265.72" x2="480.32" y2="1159.03"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="539.89" y1="1263.77" x2="487" y2="1157.09"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="546.33" y1="1261.4" x2="493.45" y2="1154.71"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="552.71" y1="1258.56" x2="499.82" y2="1151.87"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="559.91" y1="1256.16" x2="507.03" y2="1149.48"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path d="M484.16,1133.94c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M484.1,1133.96c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="481.74" cy="1143.41" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M489.68,1148.63c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M494.14,1140.86c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M492.15,1139.39c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M491.94,1144.17c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M420.08,1141.07c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M420.02,1141.09c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="417.66" cy="1150.55" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M425.6,1155.76c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M430.06,1148c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M428.07,1146.53c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M427.86,1151.3c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M414.78,1209.07c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M414.72,1209.09c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="412.35" cy="1218.54" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M420.3,1223.76c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M424.75,1215.99c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M422.77,1214.52c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M422.56,1219.3c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M522.99,1102.46c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M522.93,1102.48c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="520.57" cy="1111.93" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M528.51,1117.15c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M532.97,1109.38c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M530.98,1107.91c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M530.77,1112.69c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M533.82,1122.6c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M533.75,1122.62c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="531.39" cy="1132.08" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M539.33,1137.29c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M543.79,1129.53c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M541.8,1128.06c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M541.59,1132.84c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M430.91,1119.88c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M430.84,1119.89c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="428.48" cy="1129.35" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M436.42,1134.57c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M440.88,1126.8c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M438.9,1125.33c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M438.68,1130.11c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                        </g>
                        <g id="fields_field2">
                            <polygon
                                points="1671.13 640.09 1525.62 724.1 1380.11 640.09 1380.11 472.07 1525.62 388.05 1671.13 472.07 1671.13 640.09"
                                style="fill: #fcd800; stroke-width: 0px;" />
                            <g>
                                <line x1="1427.96" y1="526.84" x2="1540.98" y2="486.55"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1431.57" y1="532.29" x2="1544.59" y2="492.01"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1434.33" y1="538.38" x2="1547.35" y2="498.09"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1437.72" y1="545.51" x2="1550.74" y2="505.23"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1441.75" y1="552.44" x2="1554.77" y2="512.15"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1445.15" y1="558.53" x2="1558.17" y2="518.24"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1448.12" y1="565.66" x2="1561.14" y2="525.38"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1451.94" y1="572.59" x2="1564.96" y2="532.3"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <line x1="1399.32" y1="599.24" x2="1512.33" y2="558.95"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1402.93" y1="604.69" x2="1515.94" y2="564.41"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1405.68" y1="610.78" x2="1518.7" y2="570.5"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1522.1" y1="577.63" x2="1409.08" y2="617.92"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1413.11" y1="624.84" x2="1526.13" y2="584.56"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1416.5" y1="630.93" x2="1529.52" y2="590.64"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1419.48" y1="638.06" x2="1532.49" y2="597.78"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1423.29" y1="644.99" x2="1536.31" y2="604.7"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <line x1="1588.24" y1="571.6" x2="1535.35" y2="464.91"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1594.9" y1="569.43" x2="1542.01" y2="462.74"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1601.91" y1="566.38" x2="1549.02" y2="459.7"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1608.9" y1="563.78" x2="1556.01" y2="457.09"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1615.58" y1="561.83" x2="1562.7" y2="455.15"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1622.03" y1="559.45" x2="1569.14" y2="452.77"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1628.41" y1="556.62" x2="1575.52" y2="449.93"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1635.61" y1="554.22" x2="1582.72" y2="447.54"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <line x1="1567.54" y1="660.54" x2="1514.65" y2="553.85"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1574.2" y1="658.37" x2="1521.31" y2="551.69"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1581.21" y1="655.32" x2="1528.33" y2="548.64"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1588.2" y1="652.72" x2="1535.32" y2="546.03"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1594.89" y1="650.77" x2="1542" y2="544.09"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1601.33" y1="648.4" x2="1548.45" y2="541.71"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1607.71" y1="645.56" x2="1554.82" y2="538.87"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1614.91" y1="643.16" x2="1562.03" y2="536.48"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path d="M1539.16,520.94c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M1539.1,520.96c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="1536.74" cy="530.41" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1544.68,535.63c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1549.14,527.86c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1547.15,526.39c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1546.94,531.17c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M1475.08,528.07c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M1475.02,528.09c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="1472.66" cy="537.55" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1480.6,542.76c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1485.06,535c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1483.07,533.53c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1482.86,538.3c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M1469.78,596.07c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M1469.72,596.09c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="1467.35" cy="605.54" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1475.3,610.76c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1479.75,602.99c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1477.77,601.52c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1477.56,606.3c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M1577.99,489.46c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M1577.93,489.48c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="1575.57" cy="498.93" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1583.51,504.15c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1587.97,496.38c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1585.98,494.91c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1585.77,499.69c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M1588.82,509.6c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M1588.75,509.62c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="1586.39" cy="519.08" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1594.33,524.29c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1598.79,516.53c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1596.8,515.06c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1596.59,519.84c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M1485.91,506.88c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M1485.84,506.89c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="1483.48" cy="516.35" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1491.42,521.57c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1495.88,513.8c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1493.9,512.33c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1493.68,517.11c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                        </g>
                        <g id="fields_field1">
                            <polygon
                                points="792.13 334.09 646.62 418.1 501.11 334.09 501.11 166.07 646.62 82.05 792.13 166.07 792.13 334.09"
                                style="fill: #fcd800; stroke-width: 0px;" />
                            <g>
                                <line x1="548.96" y1="220.84" x2="661.98" y2="180.55"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="552.57" y1="226.29" x2="665.59" y2="186.01"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="555.33" y1="232.38" x2="668.35" y2="192.09"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="558.72" y1="239.51" x2="671.74" y2="199.23"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="562.75" y1="246.44" x2="675.77" y2="206.15"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="566.15" y1="252.53" x2="679.17" y2="212.24"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="569.12" y1="259.66" x2="682.14" y2="219.38"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="572.94" y1="266.59" x2="685.96" y2="226.3"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <line x1="520.32" y1="293.24" x2="633.33" y2="252.95"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="523.93" y1="298.69" x2="636.94" y2="258.41"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="526.68" y1="304.78" x2="639.7" y2="264.5"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="643.1" y1="271.63" x2="530.08" y2="311.92"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="534.11" y1="318.84" x2="647.13" y2="278.56"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="537.5" y1="324.93" x2="650.52" y2="284.64"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="540.48" y1="332.06" x2="653.49" y2="291.78"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="544.29" y1="338.99" x2="657.31" y2="298.7"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <line x1="709.24" y1="265.6" x2="656.35" y2="158.91"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="715.9" y1="263.43" x2="663.01" y2="156.74"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="722.91" y1="260.38" x2="670.02" y2="153.7"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="729.9" y1="257.78" x2="677.01" y2="151.09"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="736.58" y1="255.83" x2="683.7" y2="149.15"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="743.03" y1="253.45" x2="690.14" y2="146.77"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="749.41" y1="250.62" x2="696.52" y2="143.93"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="756.61" y1="248.22" x2="703.72" y2="141.54"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <line x1="688.54" y1="354.54" x2="635.65" y2="247.85"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="695.2" y1="352.37" x2="642.31" y2="245.69"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="702.21" y1="349.32" x2="649.33" y2="242.64"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="709.2" y1="346.72" x2="656.32" y2="240.03"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="715.89" y1="344.77" x2="663" y2="238.09"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="722.33" y1="342.4" x2="669.45" y2="235.71"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="728.71" y1="339.56" x2="675.82" y2="232.87"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="735.91" y1="337.16" x2="683.03" y2="230.48"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path d="M660.16,214.94c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M660.1,214.96c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="657.74" cy="224.41" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M665.68,229.63c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M670.14,221.86c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M668.15,220.39c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M667.94,225.17c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M596.08,222.07c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M596.02,222.09c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="593.66" cy="231.55" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M601.6,236.76c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M606.06,229c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M604.07,227.53c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M603.86,232.3c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M590.78,290.07c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M590.72,290.09c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="588.35" cy="299.54" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M596.3,304.76c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M600.75,296.99c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M598.77,295.52c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M598.56,300.3c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M698.99,183.46c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M698.93,183.48c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="696.57" cy="192.93" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M704.51,198.15c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M708.97,190.38c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M706.98,188.91c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M706.77,193.69c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M709.82,203.6c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M709.75,203.62c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="707.39" cy="213.08" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M715.33,218.29c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M719.79,210.53c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M717.8,209.06c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M717.59,213.84c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                            <g>
                                <path d="M606.91,200.88c-1.51.63-3.02,1.26-4.53,1.89"
                                    style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M606.84,200.89c4.38-1.16,8.85,1.43,9.96,5.5,1.01,3.73-1.04,7.84-4.87,9.38"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <ellipse cx="604.48" cy="210.35" rx="7.96" ry="7.87"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M612.42,215.57c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M616.88,207.8c-1.51.63-3.02,1.26-4.53,1.89"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M614.9,206.33c-.99.42-1.98.84-2.97,1.26"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M614.68,211.11c-.78.35-1.56.7-2.33,1.05"
                                        style="fill: #fcd800; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                            </g>
                        </g>
                        <g id="desert_field">
                            <polygon
                                points="1143.18 951.77 997.67 1035.78 852.16 951.77 852.16 783.75 997.67 699.73 1143.18 783.75 1143.18 951.77"
                                style="fill: #ca9765; stroke-width: 0px;" />
                            <path
                                d="M891.67,882.99c8.64-3.15,15.77-6.51,21.36-9.43,10.17-5.33,12.7-7.94,18.49-8.17,6.97-.27,10.54,3.17,20.85,8.27,5.78,2.86,14.24,6.52,25.29,9.49"
                                style="fill: none; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 2px;" />
                            <path
                                d="M1016.51,863.38c-4.3-2.03-10.98-5.31-19.02-9.84-8.88-5-10.61-6.56-14.59-6.89-2.19-.18-3.77.12-22.03,9.73-7.29,3.84-13.33,7.1-22.39,10.23"
                                style="fill: none; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 2px;" />
                            <path
                                d="M959.03,890.8c15.33-5.6,28-11.55,37.91-16.75,18.06-9.46,22.54-14.09,32.83-14.5,11.84-.47,17.74,5.21,37.01,14.69,9.67,4.76,23.7,10.96,41.72,16.56"
                                style="fill: none; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 2px;" />
                            <path
                                d="M870.44,851.17c10.29-3.76,18.79-7.75,25.44-11.24,12.12-6.35,15.13-9.46,22.03-9.73,7.94-.31,11.91,3.5,24.84,9.86,6.49,3.19,15.9,7.36,28,11.11"
                                style="fill: none; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 2px;" />
                            <path d="M917.3,830.2c-2.24,3.99-5.16,8.33-8.96,12.65-12.94,14.71-28.76,20.8-37.74,23.4"
                                style="fill: none; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 2px;" />
                            <path d="M982.65,846.38c-1.56,2.79-3.59,5.8-6.23,8.79-9.46,10.74-21.23,14.89-27.65,16.57"
                                style="fill: none; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 2px;" />
                            <path d="M1029.38,859.51c-2.46,4.12-5.41,8.39-8.96,12.65-16.44,19.74-37.06,28.86-50.26,33.18"
                                style="fill: none; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 2px;" />
                            <path d="M931.35,865.01c-2.24,3.99-5.16,8.33-8.96,12.65-12.94,14.71-28.76,20.8-37.74,23.4"
                                style="fill: none; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 2px;" />
                            <path
                                d="M1042.66,862.15c4.25-1.95,11.09-5.2,19.4-9.67,11.01-5.92,13.41-7.96,18.49-8.17,6.66-.28,9.97,2.92,20.85,8.27,5.45,2.68,13.35,6.18,23.51,9.33"
                                style="fill: none; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 2px;" />
                            <path d="M1054.35,867.79c4.09-1.59,10.78-4.82,17.06-11.2,4.51-4.58,7.29-9.24,8.96-12.65"
                                style="fill: none; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 2px;" />
                        </g>
                        <g id="mountains_field3">
                            <polygon
                                points="1317.54 1252.81 1172.03 1336.82 1026.52 1252.81 1026.52 1084.79 1172.03 1000.78 1317.54 1084.79 1317.54 1252.81"
                                style="fill: #82a6ba; stroke-width: 0px;" />
                            <g>
                                <polygon
                                    points="1060.29 1231.44 1114.73 1163.15 1141.48 1176.05 1166.72 1231.44 1060.29 1231.44"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <polyline points="1249.18 1231.44 1162.01 1154.56 1141.48 1176.05"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1209.77" y1="1144.05" x2="1197.02" y2="1185.43"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1091.56" y1="1231.44" x2="1113.51" y2="1193"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <polyline
                                    points="1166.72 1231.44 1282.84 1231.44 1224.1 1136.41 1209.77 1144.05 1171.09 1105.85 1121.31 1166.32"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                        </g>
                        <g id="mountains_field2">
                            <polygon
                                points="440.58 946.84 295.07 1030.85 149.56 946.84 149.56 778.81 295.07 694.8 440.58 778.81 440.58 946.84"
                                style="fill: #82a6ba; stroke-width: 0px;" />
                            <g>
                                <polygon points="183.34 925.47 237.78 857.18 264.52 870.07 289.77 925.47 183.34 925.47"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <polyline points="372.23 925.47 285.06 848.58 264.52 870.07"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="332.81" y1="838.08" x2="320.06" y2="879.46"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="214.6" y1="925.47" x2="236.55" y2="887.03"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <polyline
                                    points="289.77 925.47 405.88 925.47 347.14 830.44 332.81 838.08 294.13 799.87 244.35 860.35"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                        </g>
                        <g id="mountains_field1">
                            <polygon
                                points="1493.99 334.05 1348.48 418.06 1202.96 334.05 1202.97 166.03 1348.48 82.02 1493.99 166.03 1493.99 334.05"
                                style="fill: #82a6ba; stroke-width: 0px;" />
                            <g>
                                <polygon points="1236.74 312.68 1291.18 244.39 1317.93 257.29 1343.17 312.68 1236.74 312.68"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <polyline points="1425.63 312.68 1338.46 235.8 1317.93 257.29"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1386.22" y1="225.29" x2="1373.47" y2="266.67"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <line x1="1268.01" y1="312.68" x2="1289.96" y2="274.24"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <polyline
                                    points="1343.17 312.68 1459.29 312.68 1400.55 217.65 1386.22 225.29 1347.54 187.09 1297.76 247.56"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                        </g>
                        <g id="pasture_field4">
                            <polygon
                                points="1142.71 1559.7 997.2 1643.71 851.69 1559.7 851.69 1391.68 997.2 1307.67 1142.71 1391.68 1142.71 1559.7"
                                style="fill: #9ac21c; stroke-width: 0px;" />
                            <g>
                                <g>
                                    <path
                                        d="M1005.55,1445.82c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1004.52,1453.55c-.2.31-.41.63-.61.94-.34.73-.87,2.14-.76,3.94.03.43.22,3.45,2.44,5.35.99.84,1.69.89,1.85.89,1.11.04,1.92-.76,2.34-1.17,1.59-1.56,1.81-3.67,1.95-4.68.36-2.61-.42-4.64-.79-5.47-.34.66-1.04,1.05-1.74.98-.91-.1-1.34-.92-1.37-.98-.47.96-1.45,1.43-2.24,1.2-.7-.2-1.01-.87-1.07-1.01Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1011.22,1454.49c1.21-.72,2.56-.69,3.3,0,.31.28.66.82.63,1.5-.03.61-.35,1.33-.84,1.5-.72.24-1.94-.7-2.72-2.55"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1003.44,1454.49c-1.21-.72-2.56-.69-3.3,0-.31.28-.66.82-.63,1.5.03.61.35,1.33.84,1.5.72.24,1.94-.7,2.72-2.55"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1007.71" y1="1464.78" x2="1007.64" y2="1463"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1008.52 1461.47 1007.6 1463.06 1006.68 1461.47"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1006.09" cy="1457.26" r=".2"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1008.82" cy="1457.26" r=".2"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1081.62,1484.14c.57-1.15,1.75-1.86,2.96-1.78,1.45.1,2.68,1.29,2.86,2.86,1.56-1.03,3.56-1.02,5.04,0,1.99,1.38,1.89,3.82,1.88,3.95.98-.63,2.2-.61,2.96,0,1.01.82,1.16,2.63,0,3.85,2.57.36,4.29,2.44,4.15,4.44-.15,2.07-2.23,3.19-2.37,3.26,1.25,1.65,1.35,3.82.3,5.33-1.1,1.58-2.97,1.75-3.26,1.78.55,1.41.18,2.97-.89,3.85-1.24,1.03-2.8.63-2.96.59-.11,1.73-1.15,3.24-2.66,3.85-1.85.75-4.12.04-5.33-1.78-.88,1.22-2.27,1.93-3.63,1.78-1.9-.21-3.53-2.1-3.48-4.44-.87.46-1.89.48-2.66,0-1.07-.66-1.51-2.19-.89-3.55-1.52.43-3.12.12-4.15-.89-1.44-1.41-1.56-4.03,0-5.94-1.51-.48-2.57-1.78-2.66-3.24-.11-1.79,1.27-3.52,3.26-3.85-1.43-1.49-1.47-3.73-.3-5.03.9-1,2.43-1.36,3.85-.89-.97-2.27.04-4.9,2.19-5.92,2.05-.97,4.58-.22,5.8,1.78Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1080.41,1493.25c-.24.37-.48.74-.72,1.11-.4.86-1.02,2.52-.89,4.65.03.51.26,4.07,2.88,6.31,1.16,1,2,1.05,2.19,1.05,1.3.05,2.27-.9,2.76-1.38,1.88-1.84,2.14-4.33,2.3-5.52.42-3.08-.5-5.47-.94-6.44-.4.78-1.22,1.24-2.06,1.15-1.08-.12-1.58-1.08-1.61-1.15-.55,1.14-1.71,1.69-2.65,1.42-.82-.24-1.19-1.03-1.27-1.19Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1088.3,1494.36c1.42-.85,3.01-.82,3.89,0,.36.34.78.97.74,1.76-.03.72-.41,1.57-.99,1.76-.85.28-2.28-.82-3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1079.14,1494.36c-1.42-.85-3.01-.82-3.89,0-.36.34-.78.97-.74,1.76.03.72.41,1.57.99,1.76.85.28,2.28-.82,3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1084.17" y1="1506.49" x2="1084.08" y2="1504.39"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1085.11 1502.59 1084.03 1504.46 1082.95 1502.59"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1082.25" cy="1497.62" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1085.47" cy="1497.62" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M930.43,1536.45c.36-.73,1.11-1.18,1.88-1.13.92.06,1.7.82,1.81,1.81.99-.65,2.26-.65,3.19,0,1.26.87,1.2,2.42,1.19,2.51.62-.4,1.4-.39,1.88,0,.64.52.74,1.67,0,2.44,1.63.23,2.72,1.55,2.63,2.82-.1,1.31-1.42,2.02-1.5,2.07.79,1.05.86,2.42.19,3.38-.7,1-1.89,1.11-2.07,1.13.35.89.11,1.88-.56,2.44-.78.65-1.78.4-1.88.38-.07,1.1-.73,2.05-1.69,2.44-1.18.48-2.61.02-3.38-1.13-.56.77-1.44,1.22-2.3,1.13-1.21-.14-2.24-1.33-2.21-2.82-.55.29-1.2.3-1.69,0-.68-.42-.96-1.39-.56-2.25-.96.28-1.98.08-2.63-.56-.91-.9-.99-2.55,0-3.77-.96-.3-1.63-1.13-1.69-2.05-.07-1.14.8-2.23,2.07-2.44-.91-.94-.93-2.36-.19-3.19.57-.64,1.54-.86,2.44-.56-.62-1.44.02-3.11,1.39-3.76,1.3-.61,2.91-.14,3.68,1.13Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M929.66,1542.23c-.15.23-.3.47-.46.7-.25.55-.65,1.6-.57,2.95.02.32.16,2.58,1.82,4,.74.63,1.27.66,1.39.67.83.03,1.44-.57,1.75-.88,1.19-1.17,1.36-2.74,1.46-3.5.27-1.95-.32-3.47-.59-4.09-.25.5-.78.79-1.3.73-.68-.07-1-.69-1.02-.73-.35.72-1.08,1.07-1.68.9-.52-.15-.76-.65-.8-.75Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M934.66,1542.93c.9-.54,1.91-.52,2.47,0,.23.21.49.61.47,1.12-.02.45-.26,1-.63,1.12-.54.18-1.45-.52-2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M928.85,1542.93c-.9-.54-1.91-.52-2.47,0-.23.21-.49.61-.47,1.12.02.45.26,1,.63,1.12.54.18,1.45-.52,2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="932.04" y1="1550.63" x2="931.99" y2="1549.3"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="932.64 1548.16 931.96 1549.34 931.27 1548.16"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="930.83" cy="1545.01" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="932.87" cy="1545.01" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M946.63,1525.65c.36-.73,1.11-1.18,1.88-1.13.92.06,1.7.82,1.81,1.81.99-.65,2.26-.65,3.19,0,1.26.87,1.2,2.42,1.19,2.51.62-.4,1.4-.39,1.88,0,.64.52.74,1.67,0,2.44,1.63.23,2.72,1.55,2.63,2.82-.1,1.31-1.42,2.02-1.5,2.07.79,1.05.86,2.42.19,3.38-.7,1-1.89,1.11-2.07,1.13.35.89.11,1.88-.56,2.44-.78.65-1.78.4-1.88.38-.07,1.1-.73,2.05-1.69,2.44-1.18.48-2.61.02-3.38-1.13-.56.77-1.44,1.22-2.3,1.13-1.21-.14-2.24-1.33-2.21-2.82-.55.29-1.2.3-1.69,0-.68-.42-.96-1.39-.56-2.25-.96.28-1.98.08-2.63-.56-.91-.9-.99-2.55,0-3.77-.96-.3-1.63-1.13-1.69-2.05-.07-1.14.8-2.23,2.07-2.44-.91-.94-.93-2.36-.19-3.19.57-.64,1.54-.86,2.44-.56-.62-1.44.02-3.11,1.39-3.76,1.3-.61,2.91-.14,3.68,1.13Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M945.86,1531.43c-.15.23-.3.47-.46.7-.25.55-.65,1.6-.57,2.95.02.32.16,2.58,1.82,4,.74.63,1.27.66,1.39.67.83.03,1.44-.57,1.75-.88,1.19-1.17,1.36-2.74,1.46-3.5.27-1.95-.32-3.47-.59-4.09-.25.5-.78.79-1.3.73-.68-.07-1-.69-1.02-.73-.35.72-1.08,1.07-1.68.9-.52-.15-.76-.65-.8-.75Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M950.87,1532.13c.9-.54,1.91-.52,2.47,0,.23.21.49.61.47,1.12-.02.45-.26,1-.63,1.12-.54.18-1.45-.52-2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M945.06,1532.13c-.9-.54-1.91-.52-2.47,0-.23.21-.49.61-.47,1.12.02.45.26,1,.63,1.12.54.18,1.45-.52,2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="948.25" y1="1539.83" x2="948.19" y2="1538.5"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="948.85 1537.35 948.16 1538.54 947.48 1537.35"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="947.03" cy="1534.2" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="949.08" cy="1534.2" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M960.13,1538.25c.36-.73,1.11-1.18,1.88-1.13.92.06,1.7.82,1.81,1.81.99-.65,2.26-.65,3.19,0,1.26.87,1.2,2.42,1.19,2.51.62-.4,1.4-.39,1.88,0,.64.52.74,1.67,0,2.44,1.63.23,2.72,1.55,2.63,2.82-.1,1.31-1.42,2.02-1.5,2.07.79,1.05.86,2.42.19,3.38-.7,1-1.89,1.11-2.07,1.13.35.89.11,1.88-.56,2.44-.78.65-1.78.4-1.88.38-.07,1.1-.73,2.05-1.69,2.44-1.18.48-2.61.02-3.38-1.13-.56.77-1.44,1.22-2.3,1.13-1.21-.14-2.24-1.33-2.21-2.82-.55.29-1.2.3-1.69,0-.68-.42-.96-1.39-.56-2.25-.96.28-1.98.08-2.63-.56-.91-.9-.99-2.55,0-3.77-.96-.3-1.63-1.13-1.69-2.05-.07-1.14.8-2.23,2.07-2.44-.91-.94-.93-2.36-.19-3.19.57-.64,1.54-.86,2.44-.56-.62-1.44.02-3.11,1.39-3.76,1.3-.61,2.91-.14,3.68,1.13Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M959.37,1544.03c-.15.23-.3.47-.46.7-.25.55-.65,1.6-.57,2.95.02.32.16,2.58,1.82,4,.74.63,1.27.66,1.39.67.83.03,1.44-.57,1.75-.88,1.19-1.17,1.36-2.74,1.46-3.5.27-1.95-.32-3.47-.59-4.09-.25.5-.78.79-1.3.73-.68-.07-1-.69-1.02-.73-.35.72-1.08,1.07-1.68.9-.52-.15-.76-.65-.8-.75Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M964.37,1544.73c.9-.54,1.91-.52,2.47,0,.23.21.49.61.47,1.12-.02.45-.26,1-.63,1.12-.54.18-1.45-.52-2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M958.56,1544.73c-.9-.54-1.91-.52-2.47,0-.23.21-.49.61-.47,1.12.02.45.26,1,.63,1.12.54.18,1.45-.52,2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="961.75" y1="1552.43" x2="961.7" y2="1551.1"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="962.35 1549.96 961.67 1551.14 960.98 1549.96"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="960.54" cy="1546.81" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="962.58" cy="1546.81" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M948.72,1553.02c.46-.92,1.4-1.49,2.37-1.42,1.16.08,2.15,1.03,2.29,2.29,1.25-.82,2.85-.82,4.03,0,1.59,1.1,1.51,3.06,1.51,3.17.79-.51,1.76-.49,2.37,0,.81.65.93,2.11,0,3.08,2.06.29,3.44,1.96,3.32,3.56-.12,1.65-1.79,2.55-1.9,2.61,1,1.32,1.08,3.06.24,4.27-.88,1.26-2.38,1.41-2.61,1.42.44,1.13.14,2.38-.71,3.08-.99.82-2.24.51-2.37.47-.09,1.38-.92,2.59-2.13,3.08-1.49.6-3.3.03-4.27-1.42-.7.98-1.82,1.55-2.91,1.42-1.53-.17-2.83-1.68-2.79-3.56-.7.37-1.52.38-2.13,0-.85-.53-1.21-1.76-.71-2.85-1.21.35-2.5.1-3.32-.71-1.15-1.13-1.25-3.23,0-4.76-1.21-.38-2.06-1.43-2.13-2.59-.09-1.43,1.01-2.82,2.61-3.08-1.15-1.19-1.18-2.99-.24-4.03.72-.8,1.95-1.09,3.08-.71-.78-1.82.03-3.93,1.75-4.74,1.64-.77,3.67-.17,4.65,1.42Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M947.76,1560.32c-.19.3-.38.59-.57.89-.32.69-.82,2.02-.72,3.72.02.41.21,3.26,2.3,5.05.93.8,1.6.84,1.75.84,1.04.04,1.82-.72,2.21-1.11,1.5-1.47,1.71-3.47,1.84-4.42.34-2.47-.4-4.38-.75-5.16-.32.63-.98.99-1.65.92-.86-.09-1.26-.87-1.29-.92-.44.91-1.37,1.35-2.12,1.13-.66-.19-.96-.82-1.01-.95Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M954.08,1561.21c1.14-.68,2.41-.65,3.12,0,.29.27.62.77.59,1.41-.02.57-.33,1.26-.79,1.41-.68.23-1.83-.66-2.57-2.41"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M946.74,1561.21c-1.14-.68-2.41-.65-3.12,0-.29.27-.62.77-.59,1.41.02.57.33,1.26.79,1.41.68.23,1.83-.66,2.57-2.41"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="950.77" y1="1570.93" x2="950.7" y2="1569.25"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="951.53 1567.8 950.66 1569.3 949.79 1567.8"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="949.23" cy="1563.82" r=".18"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="951.81" cy="1563.82" r=".18"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1044.71,1507.54c.57-1.15,1.75-1.86,2.96-1.78,1.45.1,2.68,1.29,2.86,2.86,1.56-1.03,3.56-1.02,5.04,0,1.99,1.38,1.89,3.82,1.88,3.95.98-.63,2.2-.61,2.96,0,1.01.82,1.16,2.63,0,3.85,2.57.36,4.29,2.44,4.15,4.44-.15,2.07-2.23,3.19-2.37,3.26,1.25,1.65,1.35,3.82.3,5.33-1.1,1.58-2.97,1.75-3.26,1.78.55,1.41.18,2.97-.89,3.85-1.24,1.03-2.8.63-2.96.59-.11,1.73-1.15,3.24-2.66,3.85-1.85.75-4.12.04-5.33-1.78-.88,1.22-2.27,1.93-3.63,1.78-1.9-.21-3.53-2.1-3.48-4.44-.87.46-1.89.48-2.66,0-1.07-.66-1.51-2.19-.89-3.55-1.52.43-3.12.12-4.15-.89-1.44-1.41-1.56-4.03,0-5.94-1.51-.48-2.57-1.78-2.66-3.24-.11-1.79,1.27-3.52,3.26-3.85-1.43-1.49-1.47-3.73-.3-5.03.9-1,2.43-1.36,3.85-.89-.97-2.27.04-4.9,2.19-5.92,2.05-.97,4.58-.22,5.8,1.78Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1043.5,1516.66c-.24.37-.48.74-.72,1.11-.4.86-1.02,2.52-.89,4.65.03.51.26,4.07,2.88,6.31,1.16,1,2,1.05,2.19,1.05,1.3.05,2.27-.9,2.76-1.38,1.88-1.84,2.14-4.33,2.3-5.52.42-3.08-.5-5.47-.94-6.44-.4.78-1.22,1.24-2.06,1.15-1.08-.12-1.58-1.08-1.61-1.15-.55,1.14-1.71,1.69-2.65,1.42-.82-.24-1.19-1.03-1.27-1.19Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1051.39,1517.77c1.42-.85,3.01-.82,3.89,0,.36.34.78.97.74,1.76-.03.72-.41,1.57-.99,1.76-.85.28-2.28-.82-3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1042.23,1517.77c-1.42-.85-3.01-.82-3.89,0-.36.34-.78.97-.74,1.76.03.72.41,1.57.99,1.76.85.28,2.28-.82,3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1047.26" y1="1529.9" x2="1047.17" y2="1527.8"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1048.2 1526 1047.12 1527.87 1046.04 1526"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1045.34" cy="1521.03" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1048.56" cy="1521.03" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1088.81,1427.85c.46-.93,1.41-1.49,2.38-1.43,1.16.08,2.16,1.04,2.3,2.3,1.25-.82,2.87-.82,4.05,0,1.6,1.11,1.52,3.07,1.51,3.18.79-.51,1.77-.49,2.38,0,.81.66.94,2.12,0,3.1,2.07.29,3.45,1.97,3.34,3.57-.12,1.66-1.8,2.56-1.91,2.62,1.01,1.33,1.09,3.07.24,4.29-.88,1.27-2.39,1.41-2.62,1.43.44,1.13.14,2.39-.71,3.1-1,.82-2.25.51-2.38.48-.09,1.39-.93,2.6-2.14,3.1-1.49.6-3.31.03-4.29-1.43-.71.98-1.82,1.55-2.92,1.43-1.53-.17-2.84-1.69-2.8-3.57-.7.37-1.52.39-2.14,0-.86-.53-1.22-1.76-.71-2.86-1.22.35-2.51.1-3.34-.71-1.16-1.14-1.26-3.24,0-4.78-1.22-.38-2.07-1.44-2.14-2.61-.09-1.44,1.02-2.83,2.62-3.1-1.15-1.2-1.18-3-.24-4.05.73-.81,1.96-1.09,3.1-.71-.78-1.83.03-3.95,1.76-4.76,1.65-.78,3.69-.18,4.67,1.43Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1087.84,1435.18c-.19.3-.38.59-.58.89-.32.69-.82,2.03-.72,3.74.02.41.21,3.27,2.31,5.08.93.8,1.61.84,1.76.85,1.05.04,1.82-.72,2.22-1.11,1.51-1.48,1.72-3.48,1.85-4.44.34-2.48-.4-4.4-.75-5.18-.32.63-.99,1-1.65.93-.87-.09-1.27-.87-1.3-.93-.45.91-1.37,1.36-2.13,1.14-.66-.19-.96-.83-1.02-.95Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1094.19,1436.07c1.14-.69,2.42-.66,3.13,0,.29.27.62.78.6,1.42-.02.58-.33,1.26-.8,1.42-.68.23-1.84-.66-2.58-2.42"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1086.82,1436.07c-1.14-.69-2.42-.66-3.13,0-.29.27-.62.78-.6,1.42.02.58.33,1.26.8,1.42.68.23,1.84-.66,2.58-2.42"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1090.87" y1="1445.84" x2="1090.79" y2="1444.15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1091.63 1442.7 1090.76 1444.21 1089.89 1442.7"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1089.32" cy="1438.7" r=".19"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1091.91" cy="1438.7" r=".19"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1008.69,1494.04c.57-1.15,1.75-1.86,2.96-1.78,1.45.1,2.68,1.29,2.86,2.86,1.56-1.03,3.56-1.02,5.04,0,1.99,1.38,1.89,3.82,1.88,3.95.98-.63,2.2-.61,2.96,0,1.01.82,1.16,2.63,0,3.85,2.57.36,4.29,2.44,4.15,4.44-.15,2.07-2.23,3.19-2.37,3.26,1.25,1.65,1.35,3.82.3,5.33-1.1,1.58-2.97,1.75-3.26,1.78.55,1.41.18,2.97-.89,3.85-1.24,1.03-2.8.63-2.96.59-.11,1.73-1.15,3.24-2.66,3.85-1.85.75-4.12.04-5.33-1.78-.88,1.22-2.27,1.93-3.63,1.78-1.9-.21-3.53-2.1-3.48-4.44-.87.46-1.89.48-2.66,0-1.07-.66-1.51-2.19-.89-3.55-1.52.43-3.12.12-4.15-.89-1.44-1.41-1.56-4.03,0-5.94-1.51-.48-2.57-1.78-2.66-3.24-.11-1.79,1.27-3.52,3.26-3.85-1.43-1.49-1.47-3.73-.3-5.03.9-1,2.43-1.36,3.85-.89-.97-2.27.04-4.9,2.19-5.92,2.05-.97,4.58-.22,5.8,1.78Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1007.49,1503.15c-.24.37-.48.74-.72,1.11-.4.86-1.02,2.52-.89,4.65.03.51.26,4.07,2.88,6.31,1.16,1,2,1.05,2.19,1.05,1.3.05,2.27-.9,2.76-1.38,1.88-1.84,2.14-4.33,2.3-5.52.42-3.08-.5-5.47-.94-6.44-.4.78-1.22,1.24-2.06,1.15-1.08-.12-1.58-1.08-1.61-1.15-.55,1.14-1.71,1.69-2.65,1.42-.82-.24-1.19-1.03-1.27-1.19Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1015.38,1504.26c1.42-.85,3.01-.82,3.89,0,.36.34.78.97.74,1.76-.03.72-.41,1.57-.99,1.76-.85.28-2.28-.82-3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1006.21,1504.26c-1.42-.85-3.01-.82-3.89,0-.36.34-.78.97-.74,1.76.03.72.41,1.57.99,1.76.85.28,2.28-.82,3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1011.25" y1="1516.4" x2="1011.16" y2="1514.3"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1012.19 1512.49 1011.11 1514.37 1010.03 1512.49"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1009.33" cy="1507.53" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1012.55" cy="1507.53" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M916.02,1469.83c.36-.73,1.11-1.18,1.88-1.13.92.06,1.7.82,1.81,1.81.99-.65,2.26-.65,3.19,0,1.26.87,1.2,2.42,1.19,2.51.62-.4,1.4-.39,1.88,0,.64.52.74,1.67,0,2.44,1.63.23,2.72,1.55,2.63,2.82-.1,1.31-1.42,2.02-1.5,2.07.79,1.05.86,2.42.19,3.38-.7,1-1.89,1.11-2.07,1.13.35.89.11,1.88-.56,2.44-.78.65-1.78.4-1.88.38-.07,1.1-.73,2.05-1.69,2.44-1.18.48-2.61.02-3.38-1.13-.56.77-1.44,1.22-2.3,1.13-1.21-.14-2.24-1.33-2.21-2.82-.55.29-1.2.3-1.69,0-.68-.42-.96-1.39-.56-2.25-.96.28-1.98.08-2.63-.56-.91-.9-.99-2.55,0-3.77-.96-.3-1.63-1.13-1.69-2.05-.07-1.14.8-2.23,2.07-2.44-.91-.94-.93-2.36-.19-3.19.57-.64,1.54-.86,2.44-.56-.62-1.44.02-3.11,1.39-3.76,1.3-.61,2.91-.14,3.68,1.13Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M915.26,1475.61c-.15.23-.3.47-.46.7-.25.55-.65,1.6-.57,2.95.02.32.16,2.58,1.82,4,.74.63,1.27.66,1.39.67.83.03,1.44-.57,1.75-.88,1.19-1.17,1.36-2.74,1.46-3.5.27-1.95-.32-3.47-.59-4.09-.25.5-.78.79-1.3.73-.68-.07-1-.69-1.02-.73-.35.72-1.08,1.07-1.68.9-.52-.15-.76-.65-.8-.75Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M920.26,1476.31c.9-.54,1.91-.52,2.47,0,.23.21.49.61.47,1.12-.02.45-.26,1-.63,1.12-.54.18-1.45-.52-2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M914.45,1476.31c-.9-.54-1.91-.52-2.47,0-.23.21-.49.61-.47,1.12.02.45.26,1,.63,1.12.54.18,1.45-.52,2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="917.64" y1="1484.01" x2="917.58" y2="1482.68"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="918.24 1481.54 917.55 1482.72 916.87 1481.54"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="916.42" cy="1478.38" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="918.47" cy="1478.38" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M954.37,1456.07c.35-.71,1.08-1.14,1.82-1.09.89.06,1.65.79,1.75,1.76.96-.63,2.19-.63,3.09,0,1.22.85,1.16,2.35,1.16,2.43.6-.39,1.35-.38,1.82,0,.62.5.72,1.62,0,2.37,1.58.22,2.64,1.5,2.55,2.73-.09,1.27-1.37,1.96-1.46,2,.77,1.01.83,2.35.18,3.28-.67.97-1.83,1.08-2,1.09.34.86.11,1.82-.55,2.37-.76.63-1.72.39-1.82.36-.07,1.06-.71,1.99-1.64,2.37-1.14.46-2.53.02-3.28-1.09-.54.75-1.39,1.19-2.23,1.09-1.17-.13-2.17-1.29-2.14-2.73-.53.29-1.16.3-1.64,0-.66-.41-.93-1.35-.55-2.18-.93.27-1.92.07-2.55-.55-.88-.87-.96-2.47,0-3.65-.93-.29-1.58-1.1-1.64-1.99-.07-1.1.78-2.16,2-2.37-.88-.92-.9-2.29-.18-3.09.55-.62,1.49-.83,2.37-.55-.6-1.39.02-3.01,1.35-3.64,1.26-.59,2.81-.13,3.57,1.09Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M953.63,1461.67c-.15.23-.29.45-.44.68-.25.53-.63,1.55-.55,2.85.02.31.16,2.5,1.77,3.88.71.61,1.23.64,1.34.65.8.03,1.39-.55,1.7-.85,1.15-1.13,1.31-2.66,1.41-3.39.26-1.89-.31-3.36-.58-3.96-.25.48-.75.76-1.26.71-.66-.07-.97-.67-.99-.71-.34.7-1.05,1.04-1.63.87-.5-.15-.73-.63-.78-.73Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M958.48,1462.35c.87-.52,1.85-.5,2.39,0,.22.21.48.59.46,1.08-.02.44-.25.97-.61,1.08-.52.17-1.4-.5-1.97-1.85"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M952.85,1462.35c-.87-.52-1.85-.5-2.39,0-.22.21-.48.59-.46,1.08.02.44.25.97.61,1.08.52.17,1.4-.5,1.97-1.85"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="955.94" y1="1469.8" x2="955.88" y2="1468.51"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="956.52 1467.4 955.86 1468.56 955.19 1467.4"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="954.76" cy="1464.35" r=".14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="956.74" cy="1464.35" r=".14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M936.37,1455.16c.35-.71,1.08-1.14,1.82-1.09.89.06,1.65.79,1.75,1.76.96-.63,2.19-.63,3.09,0,1.22.85,1.16,2.35,1.16,2.43.6-.39,1.35-.38,1.82,0,.62.5.72,1.62,0,2.37,1.58.22,2.64,1.5,2.55,2.73-.09,1.27-1.37,1.96-1.46,2,.77,1.01.83,2.35.18,3.28-.67.97-1.83,1.08-2,1.09.34.86.11,1.82-.55,2.37-.76.63-1.72.39-1.82.36-.07,1.06-.71,1.99-1.64,2.37-1.14.46-2.53.02-3.28-1.09-.54.75-1.39,1.19-2.23,1.09-1.17-.13-2.17-1.29-2.14-2.73-.53.29-1.16.3-1.64,0-.66-.41-.93-1.35-.55-2.18-.93.27-1.92.07-2.55-.55-.88-.87-.96-2.47,0-3.65-.93-.29-1.58-1.1-1.64-1.99-.07-1.1.78-2.16,2-2.37-.88-.92-.9-2.29-.18-3.09.55-.62,1.49-.83,2.37-.55-.6-1.39.02-3.01,1.35-3.64,1.26-.59,2.81-.13,3.57,1.09Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M935.62,1460.77c-.15.23-.29.45-.44.68-.25.53-.63,1.55-.55,2.85.02.31.16,2.5,1.77,3.88.71.61,1.23.64,1.34.65.8.03,1.39-.55,1.7-.85,1.15-1.13,1.31-2.66,1.41-3.39.26-1.89-.31-3.36-.58-3.96-.25.48-.75.76-1.26.71-.66-.07-.97-.67-.99-.71-.34.7-1.05,1.04-1.63.87-.5-.15-.73-.63-.78-.73Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M940.47,1461.45c.87-.52,1.85-.5,2.39,0,.22.21.48.59.46,1.08-.02.44-.25.97-.61,1.08-.52.17-1.4-.5-1.97-1.85"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M934.84,1461.45c-.87-.52-1.85-.5-2.39,0-.22.21-.48.59-.46,1.08.02.44.25.97.61,1.08.52.17,1.4-.5,1.97-1.85"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="937.93" y1="1468.9" x2="937.88" y2="1467.61"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="938.52 1466.5 937.85 1467.66 937.19 1466.5"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="936.75" cy="1463.45" r=".14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="938.73" cy="1463.45" r=".14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M931.28,1389.08c.43-.87,1.33-1.41,2.24-1.35,1.09.07,2.03.98,2.16,2.16,1.18-.78,2.7-.77,3.81,0,1.5,1.04,1.43,2.89,1.42,3,.74-.48,1.67-.46,2.24,0,.77.62.88,1.99,0,2.92,1.95.27,3.25,1.85,3.14,3.36-.12,1.56-1.69,2.41-1.79,2.47.95,1.25,1.02,2.89.22,4.04-.83,1.19-2.25,1.33-2.47,1.35.42,1.07.13,2.25-.67,2.92-.94.78-2.12.48-2.24.45-.08,1.31-.87,2.45-2.02,2.92-1.4.57-3.12.03-4.04-1.35-.66.92-1.72,1.46-2.75,1.35-1.44-.16-2.67-1.59-2.64-3.36-.66.35-1.43.36-2.02,0-.81-.5-1.14-1.66-.67-2.69-1.15.33-2.36.09-3.14-.67-1.09-1.07-1.18-3.05,0-4.5-1.14-.36-1.95-1.35-2.02-2.45-.09-1.36.96-2.67,2.47-2.92-1.09-1.13-1.11-2.82-.22-3.81.68-.76,1.84-1.03,2.92-.67-.74-1.72.03-3.71,1.66-4.49,1.55-.73,3.47-.17,4.4,1.35Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M930.36,1395.98c-.18.28-.36.56-.54.84-.3.65-.77,1.91-.68,3.52.02.39.2,3.08,2.18,4.78.88.75,1.51.79,1.66.8.99.04,1.72-.68,2.09-1.05,1.42-1.39,1.62-3.28,1.74-4.18.32-2.33-.38-4.14-.71-4.88-.3.59-.93.94-1.56.87-.81-.09-1.19-.82-1.22-.87-.42.86-1.29,1.28-2,1.07-.62-.18-.9-.78-.96-.9Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M936.34,1396.82c1.08-.65,2.28-.62,2.95,0,.27.25.59.73.56,1.34-.02.54-.31,1.19-.75,1.34-.64.21-1.73-.62-2.43-2.27"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M929.4,1396.82c-1.08-.65-2.28-.62-2.95,0-.27.25-.59.73-.56,1.34.02.54.31,1.19.75,1.34.64.21,1.73-.62,2.43-2.27"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="933.21" y1="1406.01" x2="933.14" y2="1404.42"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="933.93 1403.05 933.11 1404.47 932.29 1403.05"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="931.76" cy="1399.29" r=".17"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="934.2" cy="1399.29" r=".17"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M926.29,1409.6c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M928.1,1421.06c-1,.46-1.64,1.44-1.62,2.48.02,1.25.99,2.36,2.33,2.59.88-.55,1.4-1.53,1.35-2.53-.07-1.17-.89-2.19-2.06-2.54Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M1041.14,1434.28c.39-.79,1.21-1.28,2.04-1.22.99.07,1.85.89,1.96,1.96,1.07-.71,2.45-.7,3.46,0,1.37.95,1.3,2.63,1.29,2.72.68-.44,1.51-.42,2.04,0,.7.56.8,1.81,0,2.65,1.77.25,2.95,1.68,2.85,3.06-.1,1.42-1.54,2.19-1.63,2.24.86,1.14.93,2.63.2,3.67-.76,1.08-2.05,1.21-2.24,1.22.38.97.12,2.04-.61,2.65-.85.71-1.93.44-2.04.41-.08,1.19-.79,2.23-1.83,2.65-1.28.52-2.83.03-3.67-1.22-.6.84-1.56,1.33-2.5,1.22-1.31-.15-2.43-1.44-2.39-3.06-.6.32-1.3.33-1.83,0-.73-.46-1.04-1.51-.61-2.44-1.04.3-2.15.08-2.85-.61-.99-.97-1.07-2.77,0-4.09-1.04-.33-1.77-1.23-1.83-2.23-.08-1.23.87-2.42,2.24-2.65-.99-1.02-1.01-2.56-.2-3.46.62-.69,1.67-.93,2.65-.61-.67-1.56.02-3.37,1.51-4.07,1.41-.67,3.15-.15,3.99,1.22Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1042.61,1443.57c-.81.37-1.33,1.17-1.31,2.01.02,1.01.81,1.92,1.89,2.1.72-.45,1.14-1.24,1.09-2.06-.05-.95-.72-1.78-1.67-2.06Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M1057.15,1404.25c.4-.81,1.22-1.3,2.07-1.24,1.01.07,1.87.9,1.99,1.99,1.09-.72,2.49-.71,3.52,0,1.39.96,1.32,2.67,1.31,2.76.69-.44,1.54-.43,2.07,0,.71.57.81,1.84,0,2.69,1.8.25,3,1.71,2.89,3.1-.11,1.44-1.56,2.22-1.65,2.27.87,1.15.94,2.67.21,3.72-.77,1.1-2.08,1.22-2.27,1.24.38.98.12,2.07-.62,2.69-.86.72-1.96.44-2.07.41-.08,1.21-.8,2.26-1.86,2.69-1.29.52-2.87.03-3.72-1.24-.61.85-1.58,1.35-2.53,1.24-1.33-.15-2.46-1.46-2.43-3.1-.61.32-1.32.34-1.86,0-.74-.46-1.05-1.53-.62-2.48-1.06.3-2.18.08-2.89-.62-1-.99-1.09-2.81,0-4.15-1.05-.33-1.8-1.25-1.86-2.26-.08-1.25.88-2.46,2.27-2.69-1-1.04-1.03-2.6-.21-3.51.63-.7,1.7-.95,2.69-.62-.68-1.58.03-3.42,1.53-4.13,1.43-.68,3.2-.15,4.05,1.24Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1058.64,1413.68c-.82.38-1.35,1.19-1.33,2.04.02,1.03.82,1.94,1.92,2.13.73-.45,1.15-1.26,1.11-2.09-.05-.96-.73-1.8-1.7-2.09Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M946.28,1471.55c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M948.1,1483c-1,.46-1.64,1.44-1.62,2.48.02,1.25.99,2.36,2.33,2.59.88-.55,1.4-1.53,1.35-2.53-.07-1.17-.89-2.19-2.06-2.54Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M1068.72,1521.06c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1070.53,1532.52c-1,.46-1.64,1.44-1.62,2.48.02,1.25.99,2.36,2.33,2.59.88-.55,1.4-1.53,1.35-2.53-.07-1.17-.89-2.19-2.06-2.54Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M991.3,1552.57c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M993.11,1564.03c-1,.46-1.64,1.44-1.62,2.48.02,1.25.99,2.36,2.33,2.59.88-.55,1.4-1.53,1.35-2.53-.07-1.17-.89-2.19-2.06-2.54Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M949.74,1397.72c.51-1.02,1.55-1.65,2.63-1.58,1.28.08,2.38,1.15,2.53,2.53,1.38-.91,3.16-.91,4.47,0,1.76,1.22,1.68,3.39,1.67,3.51.87-.56,1.95-.54,2.63,0,.9.72,1.03,2.34,0,3.42,2.29.32,3.81,2.17,3.68,3.94-.13,1.83-1.98,2.83-2.1,2.89,1.11,1.47,1.2,3.39.26,4.73-.97,1.4-2.64,1.56-2.89,1.58.49,1.25.16,2.63-.79,3.42-1.1.91-2.49.56-2.63.53-.1,1.53-1.02,2.87-2.37,3.42-1.65.67-3.65.03-4.73-1.58-.78,1.08-2.01,1.71-3.22,1.58-1.69-.19-3.13-1.86-3.09-3.94-.77.41-1.68.43-2.37,0-.95-.59-1.34-1.94-.79-3.15-1.35.38-2.77.11-3.68-.79-1.28-1.26-1.39-3.57,0-5.27-1.34-.42-2.28-1.58-2.37-2.87-.1-1.59,1.12-3.12,2.89-3.42-1.27-1.32-1.31-3.31-.26-4.47.8-.89,2.16-1.2,3.42-.79-.86-2.01.03-4.35,1.94-5.26,1.82-.86,4.06-.19,5.15,1.58Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M951.63,1409.71c-1.04.48-1.71,1.51-1.69,2.59.03,1.3,1.04,2.47,2.44,2.71.92-.58,1.47-1.6,1.41-2.65-.07-1.22-.93-2.29-2.16-2.65Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1027.6,1451.73c.57-1.15,1.75-1.86,2.96-1.78,1.45.1,2.68,1.29,2.86,2.86,1.56-1.03,3.56-1.02,5.04,0,1.99,1.38,1.89,3.82,1.88,3.95.98-.63,2.2-.61,2.96,0,1.01.82,1.16,2.63,0,3.85,2.57.36,4.29,2.44,4.15,4.44-.15,2.07-2.23,3.19-2.37,3.26,1.25,1.65,1.35,3.82.3,5.33-1.1,1.58-2.97,1.75-3.26,1.78.55,1.41.18,2.97-.89,3.85-1.24,1.03-2.8.63-2.96.59-.11,1.73-1.15,3.24-2.66,3.85-1.85.75-4.12.04-5.33-1.78-.88,1.22-2.27,1.93-3.63,1.78-1.9-.21-3.53-2.1-3.48-4.44-.87.46-1.89.48-2.66,0-1.07-.66-1.51-2.19-.89-3.55-1.52.43-3.12.12-4.15-.89-1.44-1.41-1.56-4.03,0-5.94-1.51-.48-2.57-1.78-2.66-3.24-.11-1.79,1.27-3.52,3.26-3.85-1.43-1.49-1.47-3.73-.3-5.03.9-1,2.43-1.36,3.85-.89-.97-2.27.04-4.9,2.19-5.92,2.05-.97,4.58-.22,5.8,1.78Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1026.39,1460.84c-.24.37-.48.74-.72,1.11-.4.86-1.02,2.52-.89,4.65.03.51.26,4.07,2.88,6.31,1.16,1,2,1.05,2.19,1.05,1.3.05,2.27-.9,2.76-1.38,1.88-1.84,2.14-4.33,2.3-5.52.42-3.08-.5-5.47-.94-6.44-.4.78-1.22,1.24-2.06,1.15-1.08-.12-1.58-1.08-1.61-1.15-.55,1.14-1.71,1.69-2.65,1.42-.82-.24-1.19-1.03-1.27-1.19Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1034.28,1461.95c1.42-.85,3.01-.82,3.89,0,.36.34.78.97.74,1.76-.03.72-.41,1.57-.99,1.76-.85.28-2.28-.82-3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1025.12,1461.95c-1.42-.85-3.01-.82-3.89,0-.36.34-.78.97-.74,1.76.03.72.41,1.57.99,1.76.85.28,2.28-.82,3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1030.15" y1="1474.08" x2="1030.06" y2="1471.98"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1031.1 1470.18 1030.02 1472.05 1028.94 1470.18"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1028.23" cy="1465.21" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1031.45" cy="1465.21" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                        </g>
                        <g id="pasture_field3">
                            <polygon
                                points="1844.83 947.98 1699.32 1031.99 1553.81 947.98 1553.81 779.96 1699.32 695.95 1844.83 779.96 1844.83 947.98"
                                style="fill: #9ac21c; stroke-width: 0px;" />
                            <g>
                                <g>
                                    <path
                                        d="M1707.67,834.1c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1706.65,841.83c-.2.31-.41.63-.61.94-.34.73-.87,2.14-.76,3.94.03.43.22,3.45,2.44,5.35.99.84,1.69.89,1.85.89,1.11.04,1.92-.76,2.34-1.17,1.59-1.56,1.81-3.67,1.95-4.68.36-2.61-.42-4.64-.79-5.47-.34.66-1.04,1.05-1.74.98-.91-.1-1.34-.92-1.37-.98-.47.96-1.45,1.43-2.24,1.2-.7-.2-1.01-.87-1.07-1.01Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1713.34,842.77c1.21-.72,2.56-.69,3.3,0,.31.28.66.82.63,1.5-.03.61-.35,1.33-.84,1.5-.72.24-1.94-.7-2.72-2.55"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1705.57,842.77c-1.21-.72-2.56-.69-3.3,0-.31.28-.66.82-.63,1.5.03.61.35,1.33.84,1.5.72.24,1.94-.7,2.72-2.55"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1709.84" y1="853.07" x2="1709.76" y2="851.29"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1710.64 849.75 1709.72 851.34 1708.8 849.75"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1708.21" cy="845.54" r=".2"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1710.94" cy="845.54" r=".2"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1783.74,872.42c.57-1.15,1.75-1.86,2.96-1.78,1.45.1,2.68,1.29,2.86,2.86,1.56-1.03,3.56-1.02,5.04,0,1.99,1.38,1.89,3.82,1.88,3.95.98-.63,2.2-.61,2.96,0,1.01.82,1.16,2.63,0,3.85,2.57.36,4.29,2.44,4.15,4.44-.15,2.07-2.23,3.19-2.37,3.26,1.25,1.65,1.35,3.82.3,5.33-1.1,1.58-2.97,1.75-3.26,1.78.55,1.41.18,2.97-.89,3.85-1.24,1.03-2.8.63-2.96.59-.11,1.73-1.15,3.24-2.66,3.85-1.85.75-4.12.04-5.33-1.78-.88,1.22-2.27,1.93-3.63,1.78-1.9-.21-3.53-2.1-3.48-4.44-.87.46-1.89.48-2.66,0-1.07-.66-1.51-2.19-.89-3.55-1.52.43-3.12.12-4.15-.89-1.44-1.41-1.56-4.03,0-5.94-1.51-.48-2.57-1.78-2.66-3.24-.11-1.79,1.27-3.52,3.26-3.85-1.43-1.49-1.47-3.73-.3-5.03.9-1,2.43-1.36,3.85-.89-.97-2.27.04-4.9,2.19-5.92,2.05-.97,4.58-.22,5.8,1.78Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1782.53,881.53c-.24.37-.48.74-.72,1.11-.4.86-1.02,2.52-.89,4.65.03.51.26,4.07,2.88,6.31,1.16,1,2,1.05,2.19,1.05,1.3.05,2.27-.9,2.76-1.38,1.88-1.84,2.14-4.33,2.3-5.52.42-3.08-.5-5.47-.94-6.44-.4.78-1.22,1.24-2.06,1.15-1.08-.12-1.58-1.08-1.61-1.15-.55,1.14-1.71,1.69-2.65,1.42-.82-.24-1.19-1.03-1.27-1.19Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1790.42,882.64c1.42-.85,3.01-.82,3.89,0,.36.34.78.97.74,1.76-.03.72-.41,1.57-.99,1.76-.85.28-2.28-.82-3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1781.26,882.64c-1.42-.85-3.01-.82-3.89,0-.36.34-.78.97-.74,1.76.03.72.41,1.57.99,1.76.85.28,2.28-.82,3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1786.29" y1="894.77" x2="1786.2" y2="892.68"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1787.24 890.87 1786.16 892.74 1785.07 890.87"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1784.37" cy="885.9" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1787.59" cy="885.9" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1632.55,924.73c.36-.73,1.11-1.18,1.88-1.13.92.06,1.7.82,1.81,1.81.99-.65,2.26-.65,3.19,0,1.26.87,1.2,2.42,1.19,2.51.62-.4,1.4-.39,1.88,0,.64.52.74,1.67,0,2.44,1.63.23,2.72,1.55,2.63,2.82-.1,1.31-1.42,2.02-1.5,2.07.79,1.05.86,2.42.19,3.38-.7,1-1.89,1.11-2.07,1.13.35.89.11,1.88-.56,2.44-.78.65-1.78.4-1.88.38-.07,1.1-.73,2.05-1.69,2.44-1.18.48-2.61.02-3.38-1.13-.56.77-1.44,1.22-2.3,1.13-1.21-.14-2.24-1.33-2.21-2.82-.55.29-1.2.3-1.69,0-.68-.42-.96-1.39-.56-2.25-.96.28-1.98.08-2.63-.56-.91-.9-.99-2.55,0-3.77-.96-.3-1.63-1.13-1.69-2.05-.07-1.14.8-2.23,2.07-2.44-.91-.94-.93-2.36-.19-3.19.57-.64,1.54-.86,2.44-.56-.62-1.44.02-3.11,1.39-3.76,1.3-.61,2.91-.14,3.68,1.13Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1631.78,930.51c-.15.23-.3.47-.46.7-.25.55-.65,1.6-.57,2.95.02.32.16,2.58,1.82,4,.74.63,1.27.66,1.39.67.83.03,1.44-.57,1.75-.88,1.19-1.17,1.36-2.74,1.46-3.5.27-1.95-.32-3.47-.59-4.09-.25.5-.78.79-1.3.73-.68-.07-1-.69-1.02-.73-.35.72-1.08,1.07-1.68.9-.52-.15-.76-.65-.8-.75Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1636.79,931.22c.9-.54,1.91-.52,2.47,0,.23.21.49.61.47,1.12-.02.45-.26,1-.63,1.12-.54.18-1.45-.52-2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1630.98,931.22c-.9-.54-1.91-.52-2.47,0-.23.21-.49.61-.47,1.12.02.45.26,1,.63,1.12.54.18,1.45-.52,2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1634.17" y1="938.91" x2="1634.11" y2="937.58"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1634.77 936.44 1634.08 937.63 1633.4 936.44"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1632.95" cy="933.29" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1634.99" cy="933.29" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1648.75,913.93c.36-.73,1.11-1.18,1.88-1.13.92.06,1.7.82,1.81,1.81.99-.65,2.26-.65,3.19,0,1.26.87,1.2,2.42,1.19,2.51.62-.4,1.4-.39,1.88,0,.64.52.74,1.67,0,2.44,1.63.23,2.72,1.55,2.63,2.82-.1,1.31-1.42,2.02-1.5,2.07.79,1.05.86,2.42.19,3.38-.7,1-1.89,1.11-2.07,1.13.35.89.11,1.88-.56,2.44-.78.65-1.78.4-1.88.38-.07,1.1-.73,2.05-1.69,2.44-1.18.48-2.61.02-3.38-1.13-.56.77-1.44,1.22-2.3,1.13-1.21-.14-2.24-1.33-2.21-2.82-.55.29-1.2.3-1.69,0-.68-.42-.96-1.39-.56-2.25-.96.28-1.98.08-2.63-.56-.91-.9-.99-2.55,0-3.77-.96-.3-1.63-1.13-1.69-2.05-.07-1.14.8-2.23,2.07-2.44-.91-.94-.93-2.36-.19-3.19.57-.64,1.54-.86,2.44-.56-.62-1.44.02-3.11,1.39-3.76,1.3-.61,2.91-.14,3.68,1.13Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1647.99,919.71c-.15.23-.3.47-.46.7-.25.55-.65,1.6-.57,2.95.02.32.16,2.58,1.82,4,.74.63,1.27.66,1.39.67.83.03,1.44-.57,1.75-.88,1.19-1.17,1.36-2.74,1.46-3.5.27-1.95-.32-3.47-.59-4.09-.25.5-.78.79-1.3.73-.68-.07-1-.69-1.02-.73-.35.72-1.08,1.07-1.68.9-.52-.15-.76-.65-.8-.75Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1652.99,920.41c.9-.54,1.91-.52,2.47,0,.23.21.49.61.47,1.12-.02.45-.26,1-.63,1.12-.54.18-1.45-.52-2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1647.18,920.41c-.9-.54-1.91-.52-2.47,0-.23.21-.49.61-.47,1.12.02.45.26,1,.63,1.12.54.18,1.45-.52,2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1650.37" y1="928.11" x2="1650.32" y2="926.78"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1650.97 925.63 1650.29 926.82 1649.6 925.63"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1649.16" cy="922.48" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1651.2" cy="922.48" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1662.26,926.53c.36-.73,1.11-1.18,1.88-1.13.92.06,1.7.82,1.81,1.81.99-.65,2.26-.65,3.19,0,1.26.87,1.2,2.42,1.19,2.51.62-.4,1.4-.39,1.88,0,.64.52.74,1.67,0,2.44,1.63.23,2.72,1.55,2.63,2.82-.1,1.31-1.42,2.02-1.5,2.07.79,1.05.86,2.42.19,3.38-.7,1-1.89,1.11-2.07,1.13.35.89.11,1.88-.56,2.44-.78.65-1.78.4-1.88.38-.07,1.1-.73,2.05-1.69,2.44-1.18.48-2.61.02-3.38-1.13-.56.77-1.44,1.22-2.3,1.13-1.21-.14-2.24-1.33-2.21-2.82-.55.29-1.2.3-1.69,0-.68-.42-.96-1.39-.56-2.25-.96.28-1.98.08-2.63-.56-.91-.9-.99-2.55,0-3.77-.96-.3-1.63-1.13-1.69-2.05-.07-1.14.8-2.23,2.07-2.44-.91-.94-.93-2.36-.19-3.19.57-.64,1.54-.86,2.44-.56-.62-1.44.02-3.11,1.39-3.76,1.3-.61,2.91-.14,3.68,1.13Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1661.49,932.31c-.15.23-.3.47-.46.7-.25.55-.65,1.6-.57,2.95.02.32.16,2.58,1.82,4,.74.63,1.27.66,1.39.67.83.03,1.44-.57,1.75-.88,1.19-1.17,1.36-2.74,1.46-3.5.27-1.95-.32-3.47-.59-4.09-.25.5-.78.79-1.3.73-.68-.07-1-.69-1.02-.73-.35.72-1.08,1.07-1.68.9-.52-.15-.76-.65-.8-.75Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1666.5,933.02c.9-.54,1.91-.52,2.47,0,.23.21.49.61.47,1.12-.02.45-.26,1-.63,1.12-.54.18-1.45-.52-2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1660.68,933.02c-.9-.54-1.91-.52-2.47,0-.23.21-.49.61-.47,1.12.02.45.26,1,.63,1.12.54.18,1.45-.52,2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1663.88" y1="940.71" x2="1663.82" y2="939.38"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1664.48 938.24 1663.79 939.43 1663.1 938.24"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1662.66" cy="935.09" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1664.7" cy="935.09" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1650.85,941.3c.46-.92,1.4-1.49,2.37-1.42,1.16.08,2.15,1.03,2.29,2.29,1.25-.82,2.85-.82,4.03,0,1.59,1.1,1.51,3.06,1.51,3.17.79-.51,1.76-.49,2.37,0,.81.65.93,2.11,0,3.08,2.06.29,3.44,1.96,3.32,3.56-.12,1.65-1.79,2.55-1.9,2.61,1,1.32,1.08,3.06.24,4.27-.88,1.26-2.38,1.41-2.61,1.42.44,1.13.14,2.38-.71,3.08-.99.82-2.24.51-2.37.47-.09,1.38-.92,2.59-2.13,3.08-1.49.6-3.3.03-4.27-1.42-.7.98-1.82,1.55-2.91,1.42-1.53-.17-2.83-1.68-2.79-3.56-.7.37-1.52.38-2.13,0-.85-.53-1.21-1.76-.71-2.85-1.21.35-2.5.1-3.32-.71-1.15-1.13-1.25-3.23,0-4.76-1.21-.38-2.06-1.43-2.13-2.59-.09-1.43,1.01-2.82,2.61-3.08-1.15-1.19-1.18-2.99-.24-4.03.72-.8,1.95-1.09,3.08-.71-.78-1.82.03-3.93,1.75-4.74,1.64-.77,3.67-.17,4.65,1.42Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1649.88,948.6c-.19.3-.38.59-.57.89-.32.69-.82,2.02-.72,3.72.02.41.21,3.26,2.3,5.05.93.8,1.6.84,1.75.84,1.04.04,1.82-.72,2.21-1.11,1.5-1.47,1.71-3.47,1.84-4.42.34-2.47-.4-4.38-.75-5.16-.32.63-.98.99-1.65.92-.86-.09-1.26-.87-1.29-.92-.44.91-1.37,1.35-2.12,1.13-.66-.19-.96-.82-1.01-.95Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1656.2,949.49c1.14-.68,2.41-.65,3.12,0,.29.27.62.77.59,1.41-.02.57-.33,1.26-.79,1.41-.68.23-1.83-.66-2.57-2.41"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1648.86,949.49c-1.14-.68-2.41-.65-3.12,0-.29.27-.62.77-.59,1.41.02.57.33,1.26.79,1.41.68.23,1.83-.66,2.57-2.41"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1652.89" y1="959.21" x2="1652.82" y2="957.53"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1653.65 956.08 1652.78 957.58 1651.92 956.08"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1651.35" cy="952.11" r=".18"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1653.94" cy="952.11" r=".18"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1746.83,895.83c.57-1.15,1.75-1.86,2.96-1.78,1.45.1,2.68,1.29,2.86,2.86,1.56-1.03,3.56-1.02,5.04,0,1.99,1.38,1.89,3.82,1.88,3.95.98-.63,2.2-.61,2.96,0,1.01.82,1.16,2.63,0,3.85,2.57.36,4.29,2.44,4.15,4.44-.15,2.07-2.23,3.19-2.37,3.26,1.25,1.65,1.35,3.82.3,5.33-1.1,1.58-2.97,1.75-3.26,1.78.55,1.41.18,2.97-.89,3.85-1.24,1.03-2.8.63-2.96.59-.11,1.73-1.15,3.24-2.66,3.85-1.85.75-4.12.04-5.33-1.78-.88,1.22-2.27,1.93-3.63,1.78-1.9-.21-3.53-2.1-3.48-4.44-.87.46-1.89.48-2.66,0-1.07-.66-1.51-2.19-.89-3.55-1.52.43-3.12.12-4.15-.89-1.44-1.41-1.56-4.03,0-5.94-1.51-.48-2.57-1.78-2.66-3.24-.11-1.79,1.27-3.52,3.26-3.85-1.43-1.49-1.47-3.73-.3-5.03.9-1,2.43-1.36,3.85-.89-.97-2.27.04-4.9,2.19-5.92,2.05-.97,4.58-.22,5.8,1.78Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1745.62,904.94c-.24.37-.48.74-.72,1.11-.4.86-1.02,2.52-.89,4.65.03.51.26,4.07,2.88,6.31,1.16,1,2,1.05,2.19,1.05,1.3.05,2.27-.9,2.76-1.38,1.88-1.84,2.14-4.33,2.3-5.52.42-3.08-.5-5.47-.94-6.44-.4.78-1.22,1.24-2.06,1.15-1.08-.12-1.58-1.08-1.61-1.15-.55,1.14-1.71,1.69-2.65,1.42-.82-.24-1.19-1.03-1.27-1.19Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1753.51,906.05c1.42-.85,3.01-.82,3.89,0,.36.34.78.97.74,1.76-.03.72-.41,1.57-.99,1.76-.85.28-2.28-.82-3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1744.35,906.05c-1.42-.85-3.01-.82-3.89,0-.36.34-.78.97-.74,1.76.03.72.41,1.57.99,1.76.85.28,2.28-.82,3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1749.38" y1="918.18" x2="1749.29" y2="916.08"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1750.33 914.28 1749.25 916.15 1748.16 914.28"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1747.46" cy="909.31" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1750.68" cy="909.31" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1790.93,816.13c.46-.93,1.41-1.49,2.38-1.43,1.16.08,2.16,1.04,2.3,2.3,1.25-.82,2.87-.82,4.05,0,1.6,1.11,1.52,3.07,1.51,3.18.79-.51,1.77-.49,2.38,0,.81.66.94,2.12,0,3.1,2.07.29,3.45,1.97,3.34,3.57-.12,1.66-1.8,2.56-1.91,2.62,1.01,1.33,1.09,3.07.24,4.29-.88,1.27-2.39,1.41-2.62,1.43.44,1.13.14,2.39-.71,3.1-1,.82-2.25.51-2.38.48-.09,1.39-.93,2.6-2.14,3.1-1.49.6-3.31.03-4.29-1.43-.71.98-1.82,1.55-2.92,1.43-1.53-.17-2.84-1.69-2.8-3.57-.7.37-1.52.39-2.14,0-.86-.53-1.22-1.76-.71-2.86-1.22.35-2.51.1-3.34-.71-1.16-1.14-1.26-3.24,0-4.78-1.22-.38-2.07-1.44-2.14-2.61-.09-1.44,1.02-2.83,2.62-3.1-1.15-1.2-1.18-3-.24-4.05.73-.81,1.96-1.09,3.1-.71-.78-1.83.03-3.95,1.76-4.76,1.65-.78,3.69-.18,4.67,1.43Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1789.96,823.47c-.19.3-.38.59-.58.89-.32.69-.82,2.03-.72,3.74.02.41.21,3.27,2.31,5.08.93.8,1.61.84,1.76.85,1.05.04,1.82-.72,2.22-1.11,1.51-1.48,1.72-3.48,1.85-4.44.34-2.48-.4-4.4-.75-5.18-.32.63-.99,1-1.65.93-.87-.09-1.27-.87-1.3-.93-.45.91-1.37,1.36-2.13,1.14-.66-.19-.96-.83-1.02-.95Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1796.31,824.36c1.14-.69,2.42-.66,3.13,0,.29.27.62.78.6,1.42-.02.58-.33,1.26-.8,1.42-.68.23-1.84-.66-2.58-2.42"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1788.94,824.36c-1.14-.69-2.42-.66-3.13,0-.29.27-.62.78-.6,1.42.02.58.33,1.26.8,1.42.68.23,1.84-.66,2.58-2.42"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1792.99" y1="834.12" x2="1792.91" y2="832.43"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1793.75 830.98 1792.88 832.49 1792.01 830.98"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1791.44" cy="826.98" r=".19"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1794.04" cy="826.98" r=".19"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1710.82,882.32c.57-1.15,1.75-1.86,2.96-1.78,1.45.1,2.68,1.29,2.86,2.86,1.56-1.03,3.56-1.02,5.04,0,1.99,1.38,1.89,3.82,1.88,3.95.98-.63,2.2-.61,2.96,0,1.01.82,1.16,2.63,0,3.85,2.57.36,4.29,2.44,4.15,4.44-.15,2.07-2.23,3.19-2.37,3.26,1.25,1.65,1.35,3.82.3,5.33-1.1,1.58-2.97,1.75-3.26,1.78.55,1.41.18,2.97-.89,3.85-1.24,1.03-2.8.63-2.96.59-.11,1.73-1.15,3.24-2.66,3.85-1.85.75-4.12.04-5.33-1.78-.88,1.22-2.27,1.93-3.63,1.78-1.9-.21-3.53-2.1-3.48-4.44-.87.46-1.89.48-2.66,0-1.07-.66-1.51-2.19-.89-3.55-1.52.43-3.12.12-4.15-.89-1.44-1.41-1.56-4.03,0-5.94-1.51-.48-2.57-1.78-2.66-3.24-.11-1.79,1.27-3.52,3.26-3.85-1.43-1.49-1.47-3.73-.3-5.03.9-1,2.43-1.36,3.85-.89-.97-2.27.04-4.9,2.19-5.92,2.05-.97,4.58-.22,5.8,1.78Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1709.61,891.44c-.24.37-.48.74-.72,1.11-.4.86-1.02,2.52-.89,4.65.03.51.26,4.07,2.88,6.31,1.16,1,2,1.05,2.19,1.05,1.3.05,2.27-.9,2.76-1.38,1.88-1.84,2.14-4.33,2.3-5.52.42-3.08-.5-5.47-.94-6.44-.4.78-1.22,1.24-2.06,1.15-1.08-.12-1.58-1.08-1.61-1.15-.55,1.14-1.71,1.69-2.65,1.42-.82-.24-1.19-1.03-1.27-1.19Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1717.5,892.54c1.42-.85,3.01-.82,3.89,0,.36.34.78.97.74,1.76-.03.72-.41,1.57-.99,1.76-.85.28-2.28-.82-3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1708.34,892.54c-1.42-.85-3.01-.82-3.89,0-.36.34-.78.97-.74,1.76.03.72.41,1.57.99,1.76.85.28,2.28-.82,3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1713.37" y1="904.68" x2="1713.28" y2="902.58"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1714.32 900.77 1713.23 902.65 1712.15 900.77"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1711.45" cy="895.81" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1714.67" cy="895.81" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1618.14,858.11c.36-.73,1.11-1.18,1.88-1.13.92.06,1.7.82,1.81,1.81.99-.65,2.26-.65,3.19,0,1.26.87,1.2,2.42,1.19,2.51.62-.4,1.4-.39,1.88,0,.64.52.74,1.67,0,2.44,1.63.23,2.72,1.55,2.63,2.82-.1,1.31-1.42,2.02-1.5,2.07.79,1.05.86,2.42.19,3.38-.7,1-1.89,1.11-2.07,1.13.35.89.11,1.88-.56,2.44-.78.65-1.78.4-1.88.38-.07,1.1-.73,2.05-1.69,2.44-1.18.48-2.61.02-3.38-1.13-.56.77-1.44,1.22-2.3,1.13-1.21-.14-2.24-1.33-2.21-2.82-.55.29-1.2.3-1.69,0-.68-.42-.96-1.39-.56-2.25-.96.28-1.98.08-2.63-.56-.91-.9-.99-2.55,0-3.77-.96-.3-1.63-1.13-1.69-2.05-.07-1.14.8-2.23,2.07-2.44-.91-.94-.93-2.36-.19-3.19.57-.64,1.54-.86,2.44-.56-.62-1.44.02-3.11,1.39-3.76,1.3-.61,2.91-.14,3.68,1.13Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1617.38,863.89c-.15.23-.3.47-.46.7-.25.55-.65,1.6-.57,2.95.02.32.16,2.58,1.82,4,.74.63,1.27.66,1.39.67.83.03,1.44-.57,1.75-.88,1.19-1.17,1.36-2.74,1.46-3.5.27-1.95-.32-3.47-.59-4.09-.25.5-.78.79-1.3.73-.68-.07-1-.69-1.02-.73-.35.72-1.08,1.07-1.68.9-.52-.15-.76-.65-.8-.75Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1622.38,864.6c.9-.54,1.91-.52,2.47,0,.23.21.49.61.47,1.12-.02.45-.26,1-.63,1.12-.54.18-1.45-.52-2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1616.57,864.6c-.9-.54-1.91-.52-2.47,0-.23.21-.49.61-.47,1.12.02.45.26,1,.63,1.12.54.18,1.45-.52,2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1619.76" y1="872.29" x2="1619.71" y2="870.96"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1620.36 869.82 1619.68 871.01 1618.99 869.82"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1618.55" cy="866.67" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1620.59" cy="866.67" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1656.49,844.35c.35-.71,1.08-1.14,1.82-1.09.89.06,1.65.79,1.75,1.76.96-.63,2.19-.63,3.09,0,1.22.85,1.16,2.35,1.16,2.43.6-.39,1.35-.38,1.82,0,.62.5.72,1.62,0,2.37,1.58.22,2.64,1.5,2.55,2.73-.09,1.27-1.37,1.96-1.46,2,.77,1.01.83,2.35.18,3.28-.67.97-1.83,1.08-2,1.09.34.86.11,1.82-.55,2.37-.76.63-1.72.39-1.82.36-.07,1.06-.71,1.99-1.64,2.37-1.14.46-2.53.02-3.28-1.09-.54.75-1.39,1.19-2.23,1.09-1.17-.13-2.17-1.29-2.14-2.73-.53.29-1.16.3-1.64,0-.66-.41-.93-1.35-.55-2.18-.93.27-1.92.07-2.55-.55-.88-.87-.96-2.47,0-3.65-.93-.29-1.58-1.1-1.64-1.99-.07-1.1.78-2.16,2-2.37-.88-.92-.9-2.29-.18-3.09.55-.62,1.49-.83,2.37-.55-.6-1.39.02-3.01,1.35-3.64,1.26-.59,2.81-.13,3.57,1.09Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1655.75,849.95c-.15.23-.29.45-.44.68-.25.53-.63,1.55-.55,2.85.02.31.16,2.5,1.77,3.88.71.61,1.23.64,1.34.65.8.03,1.39-.55,1.7-.85,1.15-1.13,1.31-2.66,1.41-3.39.26-1.89-.31-3.36-.58-3.96-.25.48-.75.76-1.26.71-.66-.07-.97-.67-.99-.71-.34.7-1.05,1.04-1.63.87-.5-.15-.73-.63-.78-.73Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1660.6,850.63c.87-.52,1.85-.5,2.39,0,.22.21.48.59.46,1.08-.02.44-.25.97-.61,1.08-.52.17-1.4-.5-1.97-1.85"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1654.97,850.63c-.87-.52-1.85-.5-2.39,0-.22.21-.48.59-.46,1.08.02.44.25.97.61,1.08.52.17,1.4-.5,1.97-1.85"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1658.06" y1="858.09" x2="1658.01" y2="856.8"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1658.64 855.69 1657.98 856.84 1657.31 855.69"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1656.88" cy="852.63" r=".14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1658.86" cy="852.63" r=".14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1638.49,843.45c.35-.71,1.08-1.14,1.82-1.09.89.06,1.65.79,1.75,1.76.96-.63,2.19-.63,3.09,0,1.22.85,1.16,2.35,1.16,2.43.6-.39,1.35-.38,1.82,0,.62.5.72,1.62,0,2.37,1.58.22,2.64,1.5,2.55,2.73-.09,1.27-1.37,1.96-1.46,2,.77,1.01.83,2.35.18,3.28-.67.97-1.83,1.08-2,1.09.34.86.11,1.82-.55,2.37-.76.63-1.72.39-1.82.36-.07,1.06-.71,1.99-1.64,2.37-1.14.46-2.53.02-3.28-1.09-.54.75-1.39,1.19-2.23,1.09-1.17-.13-2.17-1.29-2.14-2.73-.53.29-1.16.3-1.64,0-.66-.41-.93-1.35-.55-2.18-.93.27-1.92.07-2.55-.55-.88-.87-.96-2.47,0-3.65-.93-.29-1.58-1.1-1.64-1.99-.07-1.1.78-2.16,2-2.37-.88-.92-.9-2.29-.18-3.09.55-.62,1.49-.83,2.37-.55-.6-1.39.02-3.01,1.35-3.64,1.26-.59,2.81-.13,3.57,1.09Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1637.75,849.05c-.15.23-.29.45-.44.68-.25.53-.63,1.55-.55,2.85.02.31.16,2.5,1.77,3.88.71.61,1.23.64,1.34.65.8.03,1.39-.55,1.7-.85,1.15-1.13,1.31-2.66,1.41-3.39.26-1.89-.31-3.36-.58-3.96-.25.48-.75.76-1.26.71-.66-.07-.97-.67-.99-.71-.34.7-1.05,1.04-1.63.87-.5-.15-.73-.63-.78-.73Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1642.6,849.73c.87-.52,1.85-.5,2.39,0,.22.21.48.59.46,1.08-.02.44-.25.97-.61,1.08-.52.17-1.4-.5-1.97-1.85"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1636.96,849.73c-.87-.52-1.85-.5-2.39,0-.22.21-.48.59-.46,1.08.02.44.25.97.61,1.08.52.17,1.4-.5,1.97-1.85"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1640.06" y1="857.19" x2="1640" y2="855.9"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1640.64 854.79 1639.97 855.94 1639.31 854.79"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1638.88" cy="851.73" r=".14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1640.86" cy="851.73" r=".14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1633.4,777.36c.43-.87,1.33-1.41,2.24-1.35,1.09.07,2.03.98,2.16,2.16,1.18-.78,2.7-.77,3.81,0,1.5,1.04,1.43,2.89,1.42,3,.74-.48,1.67-.46,2.24,0,.77.62.88,1.99,0,2.92,1.95.27,3.25,1.85,3.14,3.36-.12,1.56-1.69,2.41-1.79,2.47.95,1.25,1.02,2.89.22,4.04-.83,1.19-2.25,1.33-2.47,1.35.42,1.07.13,2.25-.67,2.92-.94.78-2.12.48-2.24.45-.08,1.31-.87,2.45-2.02,2.92-1.4.57-3.12.03-4.04-1.35-.66.92-1.72,1.46-2.75,1.35-1.44-.16-2.67-1.59-2.64-3.36-.66.35-1.43.36-2.02,0-.81-.5-1.14-1.66-.67-2.69-1.15.33-2.36.09-3.14-.67-1.09-1.07-1.18-3.05,0-4.5-1.14-.36-1.95-1.35-2.02-2.45-.09-1.36.96-2.67,2.47-2.92-1.09-1.13-1.11-2.82-.22-3.81.68-.76,1.84-1.03,2.92-.67-.74-1.72.03-3.71,1.66-4.49,1.55-.73,3.47-.17,4.4,1.35Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1632.49,784.26c-.18.28-.36.56-.54.84-.3.65-.77,1.91-.68,3.52.02.39.2,3.08,2.18,4.78.88.75,1.51.79,1.66.8.99.04,1.72-.68,2.09-1.05,1.42-1.39,1.62-3.28,1.74-4.18.32-2.33-.38-4.14-.71-4.88-.3.59-.93.94-1.56.87-.81-.09-1.19-.82-1.22-.87-.42.86-1.29,1.28-2,1.07-.62-.18-.9-.78-.96-.9Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1638.46,785.1c1.08-.65,2.28-.62,2.95,0,.27.25.59.73.56,1.34-.02.54-.31,1.19-.75,1.34-.64.21-1.73-.62-2.43-2.27"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1631.52,785.1c-1.08-.65-2.28-.62-2.95,0-.27.25-.59.73-.56,1.34.02.54.31,1.19.75,1.34.64.21,1.73-.62,2.43-2.27"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1635.34" y1="794.29" x2="1635.27" y2="792.7"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1636.05 791.33 1635.23 792.75 1634.41 791.33"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1633.88" cy="787.57" r=".17"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1636.32" cy="787.57" r=".17"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M1628.41,797.89c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1630.23,809.34c-1,.46-1.64,1.44-1.62,2.48.02,1.25.99,2.36,2.33,2.59.88-.55,1.4-1.53,1.35-2.53-.07-1.17-.89-2.19-2.06-2.54Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M1743.26,822.56c.39-.79,1.21-1.28,2.04-1.22.99.07,1.85.89,1.96,1.96,1.07-.71,2.45-.7,3.46,0,1.37.95,1.3,2.63,1.29,2.72.68-.44,1.51-.42,2.04,0,.7.56.8,1.81,0,2.65,1.77.25,2.95,1.68,2.85,3.06-.1,1.42-1.54,2.19-1.63,2.24.86,1.14.93,2.63.2,3.67-.76,1.08-2.05,1.21-2.24,1.22.38.97.12,2.04-.61,2.65-.85.71-1.93.44-2.04.41-.08,1.19-.79,2.23-1.83,2.65-1.28.52-2.83.03-3.67-1.22-.6.84-1.56,1.33-2.5,1.22-1.31-.15-2.43-1.44-2.39-3.06-.6.32-1.3.33-1.83,0-.73-.46-1.04-1.51-.61-2.44-1.04.3-2.15.08-2.85-.61-.99-.97-1.07-2.77,0-4.09-1.04-.33-1.77-1.23-1.83-2.23-.08-1.23.87-2.42,2.24-2.65-.99-1.02-1.01-2.56-.2-3.46.62-.69,1.67-.93,2.65-.61-.67-1.56.02-3.37,1.51-4.07,1.41-.67,3.15-.15,3.99,1.22Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1744.73,831.85c-.81.37-1.33,1.17-1.31,2.01.02,1.01.81,1.92,1.89,2.1.72-.45,1.14-1.24,1.09-2.06-.05-.95-.72-1.78-1.67-2.06Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M1759.27,792.53c.4-.81,1.22-1.3,2.07-1.24,1.01.07,1.87.9,1.99,1.99,1.09-.72,2.49-.71,3.52,0,1.39.96,1.32,2.67,1.31,2.76.69-.44,1.54-.43,2.07,0,.71.57.81,1.84,0,2.69,1.8.25,3,1.71,2.89,3.1-.11,1.44-1.56,2.22-1.65,2.27.87,1.15.94,2.67.21,3.72-.77,1.1-2.08,1.22-2.27,1.24.38.98.12,2.07-.62,2.69-.86.72-1.96.44-2.07.41-.08,1.21-.8,2.26-1.86,2.69-1.29.52-2.87.03-3.72-1.24-.61.85-1.58,1.35-2.53,1.24-1.33-.15-2.46-1.46-2.43-3.1-.61.32-1.32.34-1.86,0-.74-.46-1.05-1.53-.62-2.48-1.06.3-2.18.08-2.89-.62-1-.99-1.09-2.81,0-4.15-1.05-.33-1.8-1.25-1.86-2.26-.08-1.25.88-2.46,2.27-2.69-1-1.04-1.03-2.6-.21-3.51.63-.7,1.7-.95,2.69-.62-.68-1.58.03-3.42,1.53-4.13,1.43-.68,3.2-.15,4.05,1.24Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1760.76,801.96c-.82.38-1.35,1.19-1.33,2.04.02,1.03.82,1.94,1.92,2.13.73-.45,1.15-1.26,1.11-2.09-.05-.96-.73-1.8-1.7-2.09Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M1648.41,859.83c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1650.22,871.28c-1,.46-1.64,1.44-1.62,2.48.02,1.25.99,2.36,2.33,2.59.88-.55,1.4-1.53,1.35-2.53-.07-1.17-.89-2.19-2.06-2.54Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M1770.84,909.34c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1772.66,920.8c-1,.46-1.64,1.44-1.62,2.48.02,1.25.99,2.36,2.33,2.59.88-.55,1.4-1.53,1.35-2.53-.07-1.17-.89-2.19-2.06-2.54Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M1693.42,940.85c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1695.23,952.31c-1,.46-1.64,1.44-1.62,2.48.02,1.25.99,2.36,2.33,2.59.88-.55,1.4-1.53,1.35-2.53-.07-1.17-.89-2.19-2.06-2.54Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M1651.86,786c.51-1.02,1.55-1.65,2.63-1.58,1.28.08,2.38,1.15,2.53,2.53,1.38-.91,3.16-.91,4.47,0,1.76,1.22,1.68,3.39,1.67,3.51.87-.56,1.95-.54,2.63,0,.9.72,1.03,2.34,0,3.42,2.29.32,3.81,2.17,3.68,3.94-.13,1.83-1.98,2.83-2.1,2.89,1.11,1.47,1.2,3.39.26,4.73-.97,1.4-2.64,1.56-2.89,1.58.49,1.25.16,2.63-.79,3.42-1.1.91-2.49.56-2.63.53-.1,1.53-1.02,2.87-2.37,3.42-1.65.67-3.65.03-4.73-1.58-.78,1.08-2.01,1.71-3.22,1.58-1.69-.19-3.13-1.86-3.09-3.94-.77.41-1.68.43-2.37,0-.95-.59-1.34-1.94-.79-3.15-1.35.38-2.77.11-3.68-.79-1.28-1.26-1.39-3.57,0-5.27-1.34-.42-2.28-1.58-2.37-2.87-.1-1.59,1.12-3.12,2.89-3.42-1.27-1.32-1.31-3.31-.26-4.47.8-.89,2.16-1.2,3.42-.79-.86-2.01.03-4.35,1.94-5.26,1.82-.86,4.06-.19,5.15,1.58Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1653.75,797.99c-1.04.48-1.71,1.51-1.69,2.59.03,1.3,1.04,2.47,2.44,2.71.92-.58,1.47-1.6,1.41-2.65-.07-1.22-.93-2.29-2.16-2.65Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1729.72,840.01c.57-1.15,1.75-1.86,2.96-1.78,1.45.1,2.68,1.29,2.86,2.86,1.56-1.03,3.56-1.02,5.04,0,1.99,1.38,1.89,3.82,1.88,3.95.98-.63,2.2-.61,2.96,0,1.01.82,1.16,2.63,0,3.85,2.57.36,4.29,2.44,4.15,4.44-.15,2.07-2.23,3.19-2.37,3.26,1.25,1.65,1.35,3.82.3,5.33-1.1,1.58-2.97,1.75-3.26,1.78.55,1.41.18,2.97-.89,3.85-1.24,1.03-2.8.63-2.96.59-.11,1.73-1.15,3.24-2.66,3.85-1.85.75-4.12.04-5.33-1.78-.88,1.22-2.27,1.93-3.63,1.78-1.9-.21-3.53-2.1-3.48-4.44-.87.46-1.89.48-2.66,0-1.07-.66-1.51-2.19-.89-3.55-1.52.43-3.12.12-4.15-.89-1.44-1.41-1.56-4.03,0-5.94-1.51-.48-2.57-1.78-2.66-3.24-.11-1.79,1.27-3.52,3.26-3.85-1.43-1.49-1.47-3.73-.3-5.03.9-1,2.43-1.36,3.85-.89-.97-2.27.04-4.9,2.19-5.92,2.05-.97,4.58-.22,5.8,1.78Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1728.52,849.12c-.24.37-.48.74-.72,1.11-.4.86-1.02,2.52-.89,4.65.03.51.26,4.07,2.88,6.31,1.16,1,2,1.05,2.19,1.05,1.3.05,2.27-.9,2.76-1.38,1.88-1.84,2.14-4.33,2.3-5.52.42-3.08-.5-5.47-.94-6.44-.4.78-1.22,1.24-2.06,1.15-1.08-.12-1.58-1.08-1.61-1.15-.55,1.14-1.71,1.69-2.65,1.42-.82-.24-1.19-1.03-1.27-1.19Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1736.41,850.23c1.42-.85,3.01-.82,3.89,0,.36.34.78.97.74,1.76-.03.72-.41,1.57-.99,1.76-.85.28-2.28-.82-3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1727.24,850.23c-1.42-.85-3.01-.82-3.89,0-.36.34-.78.97-.74,1.76.03.72.41,1.57.99,1.76.85.28,2.28-.82,3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1732.28" y1="862.37" x2="1732.18" y2="860.27"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1733.22 858.46 1732.14 860.33 1731.06 858.46"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1730.36" cy="853.49" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1733.58" cy="853.49" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                        </g>
                        <g id="pasture_field2">
                            <polygon
                                points="792.71 946.7 647.2 1030.71 501.69 946.7 501.69 778.68 647.2 694.67 792.71 778.68 792.71 946.7"
                                style="fill: #9ac21c; stroke-width: 0px;" />
                            <g>
                                <g>
                                    <path
                                        d="M655.55,832.82c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M654.52,840.55c-.2.31-.41.63-.61.94-.34.73-.87,2.14-.76,3.94.03.43.22,3.45,2.44,5.35.99.84,1.69.89,1.85.89,1.11.04,1.92-.76,2.34-1.17,1.59-1.56,1.81-3.67,1.95-4.68.36-2.61-.42-4.64-.79-5.47-.34.66-1.04,1.05-1.74.98-.91-.1-1.34-.92-1.37-.98-.47.96-1.45,1.43-2.24,1.2-.7-.2-1.01-.87-1.07-1.01Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M661.22,841.49c1.21-.72,2.56-.69,3.3,0,.31.28.66.82.63,1.5-.03.61-.35,1.33-.84,1.5-.72.24-1.94-.7-2.72-2.55"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M653.44,841.49c-1.21-.72-2.56-.69-3.3,0-.31.28-.66.82-.63,1.5.03.61.35,1.33.84,1.5.72.24,1.94-.7,2.72-2.55"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="657.71" y1="851.78" x2="657.64" y2="850"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="658.52 848.47 657.6 850.06 656.68 848.47"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="656.09" cy="844.26" r=".2"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="658.82" cy="844.26" r=".2"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M731.62,871.14c.57-1.15,1.75-1.86,2.96-1.78,1.45.1,2.68,1.29,2.86,2.86,1.56-1.03,3.56-1.02,5.04,0,1.99,1.38,1.89,3.82,1.88,3.95.98-.63,2.2-.61,2.96,0,1.01.82,1.16,2.63,0,3.85,2.57.36,4.29,2.44,4.15,4.44-.15,2.07-2.23,3.19-2.37,3.26,1.25,1.65,1.35,3.82.3,5.33-1.1,1.58-2.97,1.75-3.26,1.78.55,1.41.18,2.97-.89,3.85-1.24,1.03-2.8.63-2.96.59-.11,1.73-1.15,3.24-2.66,3.85-1.85.75-4.12.04-5.33-1.78-.88,1.22-2.27,1.93-3.63,1.78-1.9-.21-3.53-2.1-3.48-4.44-.87.46-1.89.48-2.66,0-1.07-.66-1.51-2.19-.89-3.55-1.52.43-3.12.12-4.15-.89-1.44-1.41-1.56-4.03,0-5.94-1.51-.48-2.57-1.78-2.66-3.24-.11-1.79,1.27-3.52,3.26-3.85-1.43-1.49-1.47-3.73-.3-5.03.9-1,2.43-1.36,3.85-.89-.97-2.27.04-4.9,2.19-5.92,2.05-.97,4.58-.22,5.8,1.78Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M730.41,880.25c-.24.37-.48.74-.72,1.11-.4.86-1.02,2.52-.89,4.65.03.51.26,4.07,2.88,6.31,1.16,1,2,1.05,2.19,1.05,1.3.05,2.27-.9,2.76-1.38,1.88-1.84,2.14-4.33,2.3-5.52.42-3.08-.5-5.47-.94-6.44-.4.78-1.22,1.24-2.06,1.15-1.08-.12-1.58-1.08-1.61-1.15-.55,1.14-1.71,1.69-2.65,1.42-.82-.24-1.19-1.03-1.27-1.19Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M738.3,881.36c1.42-.85,3.01-.82,3.89,0,.36.34.78.97.74,1.76-.03.72-.41,1.57-.99,1.76-.85.28-2.28-.82-3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M729.14,881.36c-1.42-.85-3.01-.82-3.89,0-.36.34-.78.97-.74,1.76.03.72.41,1.57.99,1.76.85.28,2.28-.82,3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="734.17" y1="893.49" x2="734.08" y2="891.39"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="735.11 889.59 734.03 891.46 732.95 889.59"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="732.25" cy="884.62" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="735.47" cy="884.62" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M580.43,923.45c.36-.73,1.11-1.18,1.88-1.13.92.06,1.7.82,1.81,1.81.99-.65,2.26-.65,3.19,0,1.26.87,1.2,2.42,1.19,2.51.62-.4,1.4-.39,1.88,0,.64.52.74,1.67,0,2.44,1.63.23,2.72,1.55,2.63,2.82-.1,1.31-1.42,2.02-1.5,2.07.79,1.05.86,2.42.19,3.38-.7,1-1.89,1.11-2.07,1.13.35.89.11,1.88-.56,2.44-.78.65-1.78.4-1.88.38-.07,1.1-.73,2.05-1.69,2.44-1.18.48-2.61.02-3.38-1.13-.56.77-1.44,1.22-2.3,1.13-1.21-.14-2.24-1.33-2.21-2.82-.55.29-1.2.3-1.69,0-.68-.42-.96-1.39-.56-2.25-.96.28-1.98.08-2.63-.56-.91-.9-.99-2.55,0-3.77-.96-.3-1.63-1.13-1.69-2.05-.07-1.14.8-2.23,2.07-2.44-.91-.94-.93-2.36-.19-3.19.57-.64,1.54-.86,2.44-.56-.62-1.44.02-3.11,1.39-3.76,1.3-.61,2.91-.14,3.68,1.13Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M579.66,929.23c-.15.23-.3.47-.46.7-.25.55-.65,1.6-.57,2.95.02.32.16,2.58,1.82,4,.74.63,1.27.66,1.39.67.83.03,1.44-.57,1.75-.88,1.19-1.17,1.36-2.74,1.46-3.5.27-1.95-.32-3.47-.59-4.09-.25.5-.78.79-1.3.73-.68-.07-1-.69-1.02-.73-.35.72-1.08,1.07-1.68.9-.52-.15-.76-.65-.8-.75Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M584.66,929.93c.9-.54,1.91-.52,2.47,0,.23.21.49.61.47,1.12-.02.45-.26,1-.63,1.12-.54.18-1.45-.52-2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M578.85,929.93c-.9-.54-1.91-.52-2.47,0-.23.21-.49.61-.47,1.12.02.45.26,1,.63,1.12.54.18,1.45-.52,2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="582.04" y1="937.63" x2="581.99" y2="936.3"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="582.64 935.16 581.96 936.34 581.27 935.16"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="580.83" cy="932.01" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="582.87" cy="932.01" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M596.63,912.65c.36-.73,1.11-1.18,1.88-1.13.92.06,1.7.82,1.81,1.81.99-.65,2.26-.65,3.19,0,1.26.87,1.2,2.42,1.19,2.51.62-.4,1.4-.39,1.88,0,.64.52.74,1.67,0,2.44,1.63.23,2.72,1.55,2.63,2.82-.1,1.31-1.42,2.02-1.5,2.07.79,1.05.86,2.42.19,3.38-.7,1-1.89,1.11-2.07,1.13.35.89.11,1.88-.56,2.44-.78.65-1.78.4-1.88.38-.07,1.1-.73,2.05-1.69,2.44-1.18.48-2.61.02-3.38-1.13-.56.77-1.44,1.22-2.3,1.13-1.21-.14-2.24-1.33-2.21-2.82-.55.29-1.2.3-1.69,0-.68-.42-.96-1.39-.56-2.25-.96.28-1.98.08-2.63-.56-.91-.9-.99-2.55,0-3.77-.96-.3-1.63-1.13-1.69-2.05-.07-1.14.8-2.23,2.07-2.44-.91-.94-.93-2.36-.19-3.19.57-.64,1.54-.86,2.44-.56-.62-1.44.02-3.11,1.39-3.76,1.3-.61,2.91-.14,3.68,1.13Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M595.86,918.43c-.15.23-.3.47-.46.7-.25.55-.65,1.6-.57,2.95.02.32.16,2.58,1.82,4,.74.63,1.27.66,1.39.67.83.03,1.44-.57,1.75-.88,1.19-1.17,1.36-2.74,1.46-3.5.27-1.95-.32-3.47-.59-4.09-.25.5-.78.79-1.3.73-.68-.07-1-.69-1.02-.73-.35.72-1.08,1.07-1.68.9-.52-.15-.76-.65-.8-.75Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M600.87,919.13c.9-.54,1.91-.52,2.47,0,.23.21.49.61.47,1.12-.02.45-.26,1-.63,1.12-.54.18-1.45-.52-2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M595.06,919.13c-.9-.54-1.91-.52-2.47,0-.23.21-.49.61-.47,1.12.02.45.26,1,.63,1.12.54.18,1.45-.52,2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="598.25" y1="926.83" x2="598.19" y2="925.5"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="598.85 924.35 598.16 925.54 597.48 924.35"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="597.03" cy="921.2" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="599.08" cy="921.2" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M610.13,925.25c.36-.73,1.11-1.18,1.88-1.13.92.06,1.7.82,1.81,1.81.99-.65,2.26-.65,3.19,0,1.26.87,1.2,2.42,1.19,2.51.62-.4,1.4-.39,1.88,0,.64.52.74,1.67,0,2.44,1.63.23,2.72,1.55,2.63,2.82-.1,1.31-1.42,2.02-1.5,2.07.79,1.05.86,2.42.19,3.38-.7,1-1.89,1.11-2.07,1.13.35.89.11,1.88-.56,2.44-.78.65-1.78.4-1.88.38-.07,1.1-.73,2.05-1.69,2.44-1.18.48-2.61.02-3.38-1.13-.56.77-1.44,1.22-2.3,1.13-1.21-.14-2.24-1.33-2.21-2.82-.55.29-1.2.3-1.69,0-.68-.42-.96-1.39-.56-2.25-.96.28-1.98.08-2.63-.56-.91-.9-.99-2.55,0-3.77-.96-.3-1.63-1.13-1.69-2.05-.07-1.14.8-2.23,2.07-2.44-.91-.94-.93-2.36-.19-3.19.57-.64,1.54-.86,2.44-.56-.62-1.44.02-3.11,1.39-3.76,1.3-.61,2.91-.14,3.68,1.13Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M609.37,931.03c-.15.23-.3.47-.46.7-.25.55-.65,1.6-.57,2.95.02.32.16,2.58,1.82,4,.74.63,1.27.66,1.39.67.83.03,1.44-.57,1.75-.88,1.19-1.17,1.36-2.74,1.46-3.5.27-1.95-.32-3.47-.59-4.09-.25.5-.78.79-1.3.73-.68-.07-1-.69-1.02-.73-.35.72-1.08,1.07-1.68.9-.52-.15-.76-.65-.8-.75Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M614.37,931.73c.9-.54,1.91-.52,2.47,0,.23.21.49.61.47,1.12-.02.45-.26,1-.63,1.12-.54.18-1.45-.52-2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M608.56,931.73c-.9-.54-1.91-.52-2.47,0-.23.21-.49.61-.47,1.12.02.45.26,1,.63,1.12.54.18,1.45-.52,2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="611.75" y1="939.43" x2="611.7" y2="938.1"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="612.35 936.96 611.67 938.14 610.98 936.96"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="610.54" cy="933.81" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="612.58" cy="933.81" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M598.72,940.02c.46-.92,1.4-1.49,2.37-1.42,1.16.08,2.15,1.03,2.29,2.29,1.25-.82,2.85-.82,4.03,0,1.59,1.1,1.51,3.06,1.51,3.17.79-.51,1.76-.49,2.37,0,.81.65.93,2.11,0,3.08,2.06.29,3.44,1.96,3.32,3.56-.12,1.65-1.79,2.55-1.9,2.61,1,1.32,1.08,3.06.24,4.27-.88,1.26-2.38,1.41-2.61,1.42.44,1.13.14,2.38-.71,3.08-.99.82-2.24.51-2.37.47-.09,1.38-.92,2.59-2.13,3.08-1.49.6-3.3.03-4.27-1.42-.7.98-1.82,1.55-2.91,1.42-1.53-.17-2.83-1.68-2.79-3.56-.7.37-1.52.38-2.13,0-.85-.53-1.21-1.76-.71-2.85-1.21.35-2.5.1-3.32-.71-1.15-1.13-1.25-3.23,0-4.76-1.21-.38-2.06-1.43-2.13-2.59-.09-1.43,1.01-2.82,2.61-3.08-1.15-1.19-1.18-2.99-.24-4.03.72-.8,1.95-1.09,3.08-.71-.78-1.82.03-3.93,1.75-4.74,1.64-.77,3.67-.17,4.65,1.42Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M597.76,947.32c-.19.3-.38.59-.57.89-.32.69-.82,2.02-.72,3.72.02.41.21,3.26,2.3,5.05.93.8,1.6.84,1.75.84,1.04.04,1.82-.72,2.21-1.11,1.5-1.47,1.71-3.47,1.84-4.42.34-2.47-.4-4.38-.75-5.16-.32.63-.98.99-1.65.92-.86-.09-1.26-.87-1.29-.92-.44.91-1.37,1.35-2.12,1.13-.66-.19-.96-.82-1.01-.95Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M604.08,948.21c1.14-.68,2.41-.65,3.12,0,.29.27.62.77.59,1.41-.02.57-.33,1.26-.79,1.41-.68.23-1.83-.66-2.57-2.41"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M596.74,948.21c-1.14-.68-2.41-.65-3.12,0-.29.27-.62.77-.59,1.41.02.57.33,1.26.79,1.41.68.23,1.83-.66,2.57-2.41"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="600.77" y1="957.93" x2="600.7" y2="956.25"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="601.53 954.8 600.66 956.3 599.79 954.8"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="599.23" cy="950.82" r=".18"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="601.81" cy="950.82" r=".18"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M694.71,894.54c.57-1.15,1.75-1.86,2.96-1.78,1.45.1,2.68,1.29,2.86,2.86,1.56-1.03,3.56-1.02,5.04,0,1.99,1.38,1.89,3.82,1.88,3.95.98-.63,2.2-.61,2.96,0,1.01.82,1.16,2.63,0,3.85,2.57.36,4.29,2.44,4.15,4.44-.15,2.07-2.23,3.19-2.37,3.26,1.25,1.65,1.35,3.82.3,5.33-1.1,1.58-2.97,1.75-3.26,1.78.55,1.41.18,2.97-.89,3.85-1.24,1.03-2.8.63-2.96.59-.11,1.73-1.15,3.24-2.66,3.85-1.85.75-4.12.04-5.33-1.78-.88,1.22-2.27,1.93-3.63,1.78-1.9-.21-3.53-2.1-3.48-4.44-.87.46-1.89.48-2.66,0-1.07-.66-1.51-2.19-.89-3.55-1.52.43-3.12.12-4.15-.89-1.44-1.41-1.56-4.03,0-5.94-1.51-.48-2.57-1.78-2.66-3.24-.11-1.79,1.27-3.52,3.26-3.85-1.43-1.49-1.47-3.73-.3-5.03.9-1,2.43-1.36,3.85-.89-.97-2.27.04-4.9,2.19-5.92,2.05-.97,4.58-.22,5.8,1.78Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M693.5,903.66c-.24.37-.48.74-.72,1.11-.4.86-1.02,2.52-.89,4.65.03.51.26,4.07,2.88,6.31,1.16,1,2,1.05,2.19,1.05,1.3.05,2.27-.9,2.76-1.38,1.88-1.84,2.14-4.33,2.3-5.52.42-3.08-.5-5.47-.94-6.44-.4.78-1.22,1.24-2.06,1.15-1.08-.12-1.58-1.08-1.61-1.15-.55,1.14-1.71,1.69-2.65,1.42-.82-.24-1.19-1.03-1.27-1.19Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M701.39,904.77c1.42-.85,3.01-.82,3.89,0,.36.34.78.97.74,1.76-.03.72-.41,1.57-.99,1.76-.85.28-2.28-.82-3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M692.23,904.77c-1.42-.85-3.01-.82-3.89,0-.36.34-.78.97-.74,1.76.03.72.41,1.57.99,1.76.85.28,2.28-.82,3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="697.26" y1="916.9" x2="697.17" y2="914.8"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="698.2 913 697.12 914.87 696.04 913"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="695.34" cy="908.03" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="698.56" cy="908.03" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M738.81,814.85c.46-.93,1.41-1.49,2.38-1.43,1.16.08,2.16,1.04,2.3,2.3,1.25-.82,2.87-.82,4.05,0,1.6,1.11,1.52,3.07,1.51,3.18.79-.51,1.77-.49,2.38,0,.81.66.94,2.12,0,3.1,2.07.29,3.45,1.97,3.34,3.57-.12,1.66-1.8,2.56-1.91,2.62,1.01,1.33,1.09,3.07.24,4.29-.88,1.27-2.39,1.41-2.62,1.43.44,1.13.14,2.39-.71,3.1-1,.82-2.25.51-2.38.48-.09,1.39-.93,2.6-2.14,3.1-1.49.6-3.31.03-4.29-1.43-.71.98-1.82,1.55-2.92,1.43-1.53-.17-2.84-1.69-2.8-3.57-.7.37-1.52.39-2.14,0-.86-.53-1.22-1.76-.71-2.86-1.22.35-2.51.1-3.34-.71-1.16-1.14-1.26-3.24,0-4.78-1.22-.38-2.07-1.44-2.14-2.61-.09-1.44,1.02-2.83,2.62-3.1-1.15-1.2-1.18-3-.24-4.05.73-.81,1.96-1.09,3.1-.71-.78-1.83.03-3.95,1.76-4.76,1.65-.78,3.69-.18,4.67,1.43Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M737.84,822.18c-.19.3-.38.59-.58.89-.32.69-.82,2.03-.72,3.74.02.41.21,3.27,2.31,5.08.93.8,1.61.84,1.76.85,1.05.04,1.82-.72,2.22-1.11,1.51-1.48,1.72-3.48,1.85-4.44.34-2.48-.4-4.4-.75-5.18-.32.63-.99,1-1.65.93-.87-.09-1.27-.87-1.3-.93-.45.91-1.37,1.36-2.13,1.14-.66-.19-.96-.83-1.02-.95Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M744.19,823.07c1.14-.69,2.42-.66,3.13,0,.29.27.62.78.6,1.42-.02.58-.33,1.26-.8,1.42-.68.23-1.84-.66-2.58-2.42"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M736.82,823.07c-1.14-.69-2.42-.66-3.13,0-.29.27-.62.78-.6,1.42.02.58.33,1.26.8,1.42.68.23,1.84-.66,2.58-2.42"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="740.87" y1="832.84" x2="740.79" y2="831.15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="741.63 829.7 740.76 831.21 739.89 829.7"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="739.32" cy="825.7" r=".19"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="741.91" cy="825.7" r=".19"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M658.69,881.04c.57-1.15,1.75-1.86,2.96-1.78,1.45.1,2.68,1.29,2.86,2.86,1.56-1.03,3.56-1.02,5.04,0,1.99,1.38,1.89,3.82,1.88,3.95.98-.63,2.2-.61,2.96,0,1.01.82,1.16,2.63,0,3.85,2.57.36,4.29,2.44,4.15,4.44-.15,2.07-2.23,3.19-2.37,3.26,1.25,1.65,1.35,3.82.3,5.33-1.1,1.58-2.97,1.75-3.26,1.78.55,1.41.18,2.97-.89,3.85-1.24,1.03-2.8.63-2.96.59-.11,1.73-1.15,3.24-2.66,3.85-1.85.75-4.12.04-5.33-1.78-.88,1.22-2.27,1.93-3.63,1.78-1.9-.21-3.53-2.1-3.48-4.44-.87.46-1.89.48-2.66,0-1.07-.66-1.51-2.19-.89-3.55-1.52.43-3.12.12-4.15-.89-1.44-1.41-1.56-4.03,0-5.94-1.51-.48-2.57-1.78-2.66-3.24-.11-1.79,1.27-3.52,3.26-3.85-1.43-1.49-1.47-3.73-.3-5.03.9-1,2.43-1.36,3.85-.89-.97-2.27.04-4.9,2.19-5.92,2.05-.97,4.58-.22,5.8,1.78Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M657.49,890.15c-.24.37-.48.74-.72,1.11-.4.86-1.02,2.52-.89,4.65.03.51.26,4.07,2.88,6.31,1.16,1,2,1.05,2.19,1.05,1.3.05,2.27-.9,2.76-1.38,1.88-1.84,2.14-4.33,2.3-5.52.42-3.08-.5-5.47-.94-6.44-.4.78-1.22,1.24-2.06,1.15-1.08-.12-1.58-1.08-1.61-1.15-.55,1.14-1.71,1.69-2.65,1.42-.82-.24-1.19-1.03-1.27-1.19Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M665.38,891.26c1.42-.85,3.01-.82,3.89,0,.36.34.78.97.74,1.76-.03.72-.41,1.57-.99,1.76-.85.28-2.28-.82-3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M656.21,891.26c-1.42-.85-3.01-.82-3.89,0-.36.34-.78.97-.74,1.76.03.72.41,1.57.99,1.76.85.28,2.28-.82,3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="661.25" y1="903.4" x2="661.16" y2="901.3"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="662.19 899.49 661.11 901.37 660.03 899.49"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="659.33" cy="894.53" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="662.55" cy="894.53" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M566.02,856.83c.36-.73,1.11-1.18,1.88-1.13.92.06,1.7.82,1.81,1.81.99-.65,2.26-.65,3.19,0,1.26.87,1.2,2.42,1.19,2.51.62-.4,1.4-.39,1.88,0,.64.52.74,1.67,0,2.44,1.63.23,2.72,1.55,2.63,2.82-.1,1.31-1.42,2.02-1.5,2.07.79,1.05.86,2.42.19,3.38-.7,1-1.89,1.11-2.07,1.13.35.89.11,1.88-.56,2.44-.78.65-1.78.4-1.88.38-.07,1.1-.73,2.05-1.69,2.44-1.18.48-2.61.02-3.38-1.13-.56.77-1.44,1.22-2.3,1.13-1.21-.14-2.24-1.33-2.21-2.82-.55.29-1.2.3-1.69,0-.68-.42-.96-1.39-.56-2.25-.96.28-1.98.08-2.63-.56-.91-.9-.99-2.55,0-3.77-.96-.3-1.63-1.13-1.69-2.05-.07-1.14.8-2.23,2.07-2.44-.91-.94-.93-2.36-.19-3.19.57-.64,1.54-.86,2.44-.56-.62-1.44.02-3.11,1.39-3.76,1.3-.61,2.91-.14,3.68,1.13Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M565.26,862.61c-.15.23-.3.47-.46.7-.25.55-.65,1.6-.57,2.95.02.32.16,2.58,1.82,4,.74.63,1.27.66,1.39.67.83.03,1.44-.57,1.75-.88,1.19-1.17,1.36-2.74,1.46-3.5.27-1.95-.32-3.47-.59-4.09-.25.5-.78.79-1.3.73-.68-.07-1-.69-1.02-.73-.35.72-1.08,1.07-1.68.9-.52-.15-.76-.65-.8-.75Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M570.26,863.31c.9-.54,1.91-.52,2.47,0,.23.21.49.61.47,1.12-.02.45-.26,1-.63,1.12-.54.18-1.45-.52-2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M564.45,863.31c-.9-.54-1.91-.52-2.47,0-.23.21-.49.61-.47,1.12.02.45.26,1,.63,1.12.54.18,1.45-.52,2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="567.64" y1="871.01" x2="567.58" y2="869.68"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="568.24 868.54 567.55 869.72 566.87 868.54"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="566.42" cy="865.38" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="568.47" cy="865.38" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M604.37,843.07c.35-.71,1.08-1.14,1.82-1.09.89.06,1.65.79,1.75,1.76.96-.63,2.19-.63,3.09,0,1.22.85,1.16,2.35,1.16,2.43.6-.39,1.35-.38,1.82,0,.62.5.72,1.62,0,2.37,1.58.22,2.64,1.5,2.55,2.73-.09,1.27-1.37,1.96-1.46,2,.77,1.01.83,2.35.18,3.28-.67.97-1.83,1.08-2,1.09.34.86.11,1.82-.55,2.37-.76.63-1.72.39-1.82.36-.07,1.06-.71,1.99-1.64,2.37-1.14.46-2.53.02-3.28-1.09-.54.75-1.39,1.19-2.23,1.09-1.17-.13-2.17-1.29-2.14-2.73-.53.29-1.16.3-1.64,0-.66-.41-.93-1.35-.55-2.18-.93.27-1.92.07-2.55-.55-.88-.87-.96-2.47,0-3.65-.93-.29-1.58-1.1-1.64-1.99-.07-1.1.78-2.16,2-2.37-.88-.92-.9-2.29-.18-3.09.55-.62,1.49-.83,2.37-.55-.6-1.39.02-3.01,1.35-3.64,1.26-.59,2.81-.13,3.57,1.09Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M603.63,848.67c-.15.23-.29.45-.44.68-.25.53-.63,1.55-.55,2.85.02.31.16,2.5,1.77,3.88.71.61,1.23.64,1.34.65.8.03,1.39-.55,1.7-.85,1.15-1.13,1.31-2.66,1.41-3.39.26-1.89-.31-3.36-.58-3.96-.25.48-.75.76-1.26.71-.66-.07-.97-.67-.99-.71-.34.7-1.05,1.04-1.63.87-.5-.15-.73-.63-.78-.73Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M608.48,849.35c.87-.52,1.85-.5,2.39,0,.22.21.48.59.46,1.08-.02.44-.25.97-.61,1.08-.52.17-1.4-.5-1.97-1.85"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M602.85,849.35c-.87-.52-1.85-.5-2.39,0-.22.21-.48.59-.46,1.08.02.44.25.97.61,1.08.52.17,1.4-.5,1.97-1.85"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="605.94" y1="856.8" x2="605.88" y2="855.51"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="606.52 854.4 605.86 855.56 605.19 854.4"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="604.76" cy="851.35" r=".14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="606.74" cy="851.35" r=".14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M586.37,842.16c.35-.71,1.08-1.14,1.82-1.09.89.06,1.65.79,1.75,1.76.96-.63,2.19-.63,3.09,0,1.22.85,1.16,2.35,1.16,2.43.6-.39,1.35-.38,1.82,0,.62.5.72,1.62,0,2.37,1.58.22,2.64,1.5,2.55,2.73-.09,1.27-1.37,1.96-1.46,2,.77,1.01.83,2.35.18,3.28-.67.97-1.83,1.08-2,1.09.34.86.11,1.82-.55,2.37-.76.63-1.72.39-1.82.36-.07,1.06-.71,1.99-1.64,2.37-1.14.46-2.53.02-3.28-1.09-.54.75-1.39,1.19-2.23,1.09-1.17-.13-2.17-1.29-2.14-2.73-.53.29-1.16.3-1.64,0-.66-.41-.93-1.35-.55-2.18-.93.27-1.92.07-2.55-.55-.88-.87-.96-2.47,0-3.65-.93-.29-1.58-1.1-1.64-1.99-.07-1.1.78-2.16,2-2.37-.88-.92-.9-2.29-.18-3.09.55-.62,1.49-.83,2.37-.55-.6-1.39.02-3.01,1.35-3.64,1.26-.59,2.81-.13,3.57,1.09Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M585.62,847.77c-.15.23-.29.45-.44.68-.25.53-.63,1.55-.55,2.85.02.31.16,2.5,1.77,3.88.71.61,1.23.64,1.34.65.8.03,1.39-.55,1.7-.85,1.15-1.13,1.31-2.66,1.41-3.39.26-1.89-.31-3.36-.58-3.96-.25.48-.75.76-1.26.71-.66-.07-.97-.67-.99-.71-.34.7-1.05,1.04-1.63.87-.5-.15-.73-.63-.78-.73Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M590.47,848.45c.87-.52,1.85-.5,2.39,0,.22.21.48.59.46,1.08-.02.44-.25.97-.61,1.08-.52.17-1.4-.5-1.97-1.85"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M584.84,848.45c-.87-.52-1.85-.5-2.39,0-.22.21-.48.59-.46,1.08.02.44.25.97.61,1.08.52.17,1.4-.5,1.97-1.85"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="587.93" y1="855.9" x2="587.88" y2="854.61"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="588.52 853.5 587.85 854.66 587.19 853.5"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="586.75" cy="850.45" r=".14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="588.73" cy="850.45" r=".14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M581.28,776.08c.43-.87,1.33-1.41,2.24-1.35,1.09.07,2.03.98,2.16,2.16,1.18-.78,2.7-.77,3.81,0,1.5,1.04,1.43,2.89,1.42,3,.74-.48,1.67-.46,2.24,0,.77.62.88,1.99,0,2.92,1.95.27,3.25,1.85,3.14,3.36-.12,1.56-1.69,2.41-1.79,2.47.95,1.25,1.02,2.89.22,4.04-.83,1.19-2.25,1.33-2.47,1.35.42,1.07.13,2.25-.67,2.92-.94.78-2.12.48-2.24.45-.08,1.31-.87,2.45-2.02,2.92-1.4.57-3.12.03-4.04-1.35-.66.92-1.72,1.46-2.75,1.35-1.44-.16-2.67-1.59-2.64-3.36-.66.35-1.43.36-2.02,0-.81-.5-1.14-1.66-.67-2.69-1.15.33-2.36.09-3.14-.67-1.09-1.07-1.18-3.05,0-4.5-1.14-.36-1.95-1.35-2.02-2.45-.09-1.36.96-2.67,2.47-2.92-1.09-1.13-1.11-2.82-.22-3.81.68-.76,1.84-1.03,2.92-.67-.74-1.72.03-3.71,1.66-4.49,1.55-.73,3.47-.17,4.4,1.35Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M580.36,782.98c-.18.28-.36.56-.54.84-.3.65-.77,1.91-.68,3.52.02.39.2,3.08,2.18,4.78.88.75,1.51.79,1.66.8.99.04,1.72-.68,2.09-1.05,1.42-1.39,1.62-3.28,1.74-4.18.32-2.33-.38-4.14-.71-4.88-.3.59-.93.94-1.56.87-.81-.09-1.19-.82-1.22-.87-.42.86-1.29,1.28-2,1.07-.62-.18-.9-.78-.96-.9Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M586.34,783.82c1.08-.65,2.28-.62,2.95,0,.27.25.59.73.56,1.34-.02.54-.31,1.19-.75,1.34-.64.21-1.73-.62-2.43-2.27"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M579.4,783.82c-1.08-.65-2.28-.62-2.95,0-.27.25-.59.73-.56,1.34.02.54.31,1.19.75,1.34.64.21,1.73-.62,2.43-2.27"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="583.21" y1="793.01" x2="583.14" y2="791.42"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="583.93 790.05 583.11 791.47 582.29 790.05"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="581.76" cy="786.29" r=".17"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="584.2" cy="786.29" r=".17"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M576.29,796.6c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M578.1,808.06c-1,.46-1.64,1.44-1.62,2.48.02,1.25.99,2.36,2.33,2.59.88-.55,1.4-1.53,1.35-2.53-.07-1.17-.89-2.19-2.06-2.54Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M691.14,821.28c.39-.79,1.21-1.28,2.04-1.22.99.07,1.85.89,1.96,1.96,1.07-.71,2.45-.7,3.46,0,1.37.95,1.3,2.63,1.29,2.72.68-.44,1.51-.42,2.04,0,.7.56.8,1.81,0,2.65,1.77.25,2.95,1.68,2.85,3.06-.1,1.42-1.54,2.19-1.63,2.24.86,1.14.93,2.63.2,3.67-.76,1.08-2.05,1.21-2.24,1.22.38.97.12,2.04-.61,2.65-.85.71-1.93.44-2.04.41-.08,1.19-.79,2.23-1.83,2.65-1.28.52-2.83.03-3.67-1.22-.6.84-1.56,1.33-2.5,1.22-1.31-.15-2.43-1.44-2.39-3.06-.6.32-1.3.33-1.83,0-.73-.46-1.04-1.51-.61-2.44-1.04.3-2.15.08-2.85-.61-.99-.97-1.07-2.77,0-4.09-1.04-.33-1.77-1.23-1.83-2.23-.08-1.23.87-2.42,2.24-2.65-.99-1.02-1.01-2.56-.2-3.46.62-.69,1.67-.93,2.65-.61-.67-1.56.02-3.37,1.51-4.07,1.41-.67,3.15-.15,3.99,1.22Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M692.61,830.57c-.81.37-1.33,1.17-1.31,2.01.02,1.01.81,1.92,1.89,2.1.72-.45,1.14-1.24,1.09-2.06-.05-.95-.72-1.78-1.67-2.06Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M707.15,791.25c.4-.81,1.22-1.3,2.07-1.24,1.01.07,1.87.9,1.99,1.99,1.09-.72,2.49-.71,3.52,0,1.39.96,1.32,2.67,1.31,2.76.69-.44,1.54-.43,2.07,0,.71.57.81,1.84,0,2.69,1.8.25,3,1.71,2.89,3.1-.11,1.44-1.56,2.22-1.65,2.27.87,1.15.94,2.67.21,3.72-.77,1.1-2.08,1.22-2.27,1.24.38.98.12,2.07-.62,2.69-.86.72-1.96.44-2.07.41-.08,1.21-.8,2.26-1.86,2.69-1.29.52-2.87.03-3.72-1.24-.61.85-1.58,1.35-2.53,1.24-1.33-.15-2.46-1.46-2.43-3.1-.61.32-1.32.34-1.86,0-.74-.46-1.05-1.53-.62-2.48-1.06.3-2.18.08-2.89-.62-1-.99-1.09-2.81,0-4.15-1.05-.33-1.8-1.25-1.86-2.26-.08-1.25.88-2.46,2.27-2.69-1-1.04-1.03-2.6-.21-3.51.63-.7,1.7-.95,2.69-.62-.68-1.58.03-3.42,1.53-4.13,1.43-.68,3.2-.15,4.05,1.24Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M708.64,800.68c-.82.38-1.35,1.19-1.33,2.04.02,1.03.82,1.94,1.92,2.13.73-.45,1.15-1.26,1.11-2.09-.05-.96-.73-1.8-1.7-2.09Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M596.28,858.55c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M598.1,870c-1,.46-1.64,1.44-1.62,2.48.02,1.25.99,2.36,2.33,2.59.88-.55,1.4-1.53,1.35-2.53-.07-1.17-.89-2.19-2.06-2.54Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M718.72,908.06c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M720.53,919.52c-1,.46-1.64,1.44-1.62,2.48.02,1.25.99,2.36,2.33,2.59.88-.55,1.4-1.53,1.35-2.53-.07-1.17-.89-2.19-2.06-2.54Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M641.3,939.57c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M643.11,951.03c-1,.46-1.64,1.44-1.62,2.48.02,1.25.99,2.36,2.33,2.59.88-.55,1.4-1.53,1.35-2.53-.07-1.17-.89-2.19-2.06-2.54Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M599.74,784.72c.51-1.02,1.55-1.65,2.63-1.58,1.28.08,2.38,1.15,2.53,2.53,1.38-.91,3.16-.91,4.47,0,1.76,1.22,1.68,3.39,1.67,3.51.87-.56,1.95-.54,2.63,0,.9.72,1.03,2.34,0,3.42,2.29.32,3.81,2.17,3.68,3.94-.13,1.83-1.98,2.83-2.1,2.89,1.11,1.47,1.2,3.39.26,4.73-.97,1.4-2.64,1.56-2.89,1.58.49,1.25.16,2.63-.79,3.42-1.1.91-2.49.56-2.63.53-.1,1.53-1.02,2.87-2.37,3.42-1.65.67-3.65.03-4.73-1.58-.78,1.08-2.01,1.71-3.22,1.58-1.69-.19-3.13-1.86-3.09-3.94-.77.41-1.68.43-2.37,0-.95-.59-1.34-1.94-.79-3.15-1.35.38-2.77.11-3.68-.79-1.28-1.26-1.39-3.57,0-5.27-1.34-.42-2.28-1.58-2.37-2.87-.1-1.59,1.12-3.12,2.89-3.42-1.27-1.32-1.31-3.31-.26-4.47.8-.89,2.16-1.2,3.42-.79-.86-2.01.03-4.35,1.94-5.26,1.82-.86,4.06-.19,5.15,1.58Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M601.63,796.71c-1.04.48-1.71,1.51-1.69,2.59.03,1.3,1.04,2.47,2.44,2.71.92-.58,1.47-1.6,1.41-2.65-.07-1.22-.93-2.29-2.16-2.65Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M677.6,838.73c.57-1.15,1.75-1.86,2.96-1.78,1.45.1,2.68,1.29,2.86,2.86,1.56-1.03,3.56-1.02,5.04,0,1.99,1.38,1.89,3.82,1.88,3.95.98-.63,2.2-.61,2.96,0,1.01.82,1.16,2.63,0,3.85,2.57.36,4.29,2.44,4.15,4.44-.15,2.07-2.23,3.19-2.37,3.26,1.25,1.65,1.35,3.82.3,5.33-1.1,1.58-2.97,1.75-3.26,1.78.55,1.41.18,2.97-.89,3.85-1.24,1.03-2.8.63-2.96.59-.11,1.73-1.15,3.24-2.66,3.85-1.85.75-4.12.04-5.33-1.78-.88,1.22-2.27,1.93-3.63,1.78-1.9-.21-3.53-2.1-3.48-4.44-.87.46-1.89.48-2.66,0-1.07-.66-1.51-2.19-.89-3.55-1.52.43-3.12.12-4.15-.89-1.44-1.41-1.56-4.03,0-5.94-1.51-.48-2.57-1.78-2.66-3.24-.11-1.79,1.27-3.52,3.26-3.85-1.43-1.49-1.47-3.73-.3-5.03.9-1,2.43-1.36,3.85-.89-.97-2.27.04-4.9,2.19-5.92,2.05-.97,4.58-.22,5.8,1.78Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M676.39,847.84c-.24.37-.48.74-.72,1.11-.4.86-1.02,2.52-.89,4.65.03.51.26,4.07,2.88,6.31,1.16,1,2,1.05,2.19,1.05,1.3.05,2.27-.9,2.76-1.38,1.88-1.84,2.14-4.33,2.3-5.52.42-3.08-.5-5.47-.94-6.44-.4.78-1.22,1.24-2.06,1.15-1.08-.12-1.58-1.08-1.61-1.15-.55,1.14-1.71,1.69-2.65,1.42-.82-.24-1.19-1.03-1.27-1.19Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M684.28,848.95c1.42-.85,3.01-.82,3.89,0,.36.34.78.97.74,1.76-.03.72-.41,1.57-.99,1.76-.85.28-2.28-.82-3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M675.12,848.95c-1.42-.85-3.01-.82-3.89,0-.36.34-.78.97-.74,1.76.03.72.41,1.57.99,1.76.85.28,2.28-.82,3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="680.15" y1="861.08" x2="680.06" y2="858.98"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="681.1 857.18 680.02 859.05 678.94 857.18"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="678.23" cy="852.21" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="681.45" cy="852.21" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                        </g>
                        <g id="pasture_field1">
                            <polygon
                                points="1143.09 334.35 997.58 418.36 852.07 334.35 852.07 166.33 997.58 82.31 1143.09 166.33 1143.09 334.35"
                                style="fill: #9ac21c; stroke-width: 0px;" />
                            <g>
                                <g>
                                    <path
                                        d="M1005.93,220.47c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1004.9,228.2c-.2.31-.41.63-.61.94-.34.73-.87,2.14-.76,3.94.03.43.22,3.45,2.44,5.35.99.84,1.69.89,1.85.89,1.11.04,1.92-.76,2.34-1.17,1.59-1.56,1.81-3.67,1.95-4.68.36-2.61-.42-4.64-.79-5.47-.34.66-1.04,1.05-1.74.98-.91-.1-1.34-.92-1.37-.98-.47.96-1.45,1.43-2.24,1.2-.7-.2-1.01-.87-1.07-1.01Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1011.6,229.14c1.21-.72,2.56-.69,3.3,0,.31.28.66.82.63,1.5-.03.61-.35,1.33-.84,1.5-.72.24-1.94-.7-2.72-2.55"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1003.82,229.14c-1.21-.72-2.56-.69-3.3,0-.31.28-.66.82-.63,1.5.03.61.35,1.33.84,1.5.72.24,1.94-.7,2.72-2.55"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1008.09" y1="239.43" x2="1008.02" y2="237.65"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1008.9 236.12 1007.98 237.71 1007.06 236.12"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1006.47" cy="231.91" r=".2"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1009.2" cy="231.91" r=".2"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1082,258.78c.57-1.15,1.75-1.86,2.96-1.78,1.45.1,2.68,1.29,2.86,2.86,1.56-1.03,3.56-1.02,5.04,0,1.99,1.38,1.89,3.82,1.88,3.95.98-.63,2.2-.61,2.96,0,1.01.82,1.16,2.63,0,3.85,2.57.36,4.29,2.44,4.15,4.44-.15,2.07-2.23,3.19-2.37,3.26,1.25,1.65,1.35,3.82.3,5.33-1.1,1.58-2.97,1.75-3.26,1.78.55,1.41.18,2.97-.89,3.85-1.24,1.03-2.8.63-2.96.59-.11,1.73-1.15,3.24-2.66,3.85-1.85.75-4.12.04-5.33-1.78-.88,1.22-2.27,1.93-3.63,1.78-1.9-.21-3.53-2.1-3.48-4.44-.87.46-1.89.48-2.66,0-1.07-.66-1.51-2.19-.89-3.55-1.52.43-3.12.12-4.15-.89-1.44-1.41-1.56-4.03,0-5.94-1.51-.48-2.57-1.78-2.66-3.24-.11-1.79,1.27-3.52,3.26-3.85-1.43-1.49-1.47-3.73-.3-5.03.9-1,2.43-1.36,3.85-.89-.97-2.27.04-4.9,2.19-5.92,2.05-.97,4.58-.22,5.8,1.78Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1080.79,267.9c-.24.37-.48.74-.72,1.11-.4.86-1.02,2.52-.89,4.65.03.51.26,4.07,2.88,6.31,1.16,1,2,1.05,2.19,1.05,1.3.05,2.27-.9,2.76-1.38,1.88-1.84,2.14-4.33,2.3-5.52.42-3.08-.5-5.47-.94-6.44-.4.78-1.22,1.24-2.06,1.15-1.08-.12-1.58-1.08-1.61-1.15-.55,1.14-1.71,1.69-2.65,1.42-.82-.24-1.19-1.03-1.27-1.19Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1088.68,269c1.42-.85,3.01-.82,3.89,0,.36.34.78.97.74,1.76-.03.72-.41,1.57-.99,1.76-.85.28-2.28-.82-3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1079.52,269c-1.42-.85-3.01-.82-3.89,0-.36.34-.78.97-.74,1.76.03.72.41,1.57.99,1.76.85.28,2.28-.82,3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1084.55" y1="281.14" x2="1084.46" y2="279.04"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1085.5 277.24 1084.41 279.11 1083.33 277.24"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1082.63" cy="272.27" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1085.85" cy="272.27" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M930.81,311.1c.36-.73,1.11-1.18,1.88-1.13.92.06,1.7.82,1.81,1.81.99-.65,2.26-.65,3.19,0,1.26.87,1.2,2.42,1.19,2.51.62-.4,1.4-.39,1.88,0,.64.52.74,1.67,0,2.44,1.63.23,2.72,1.55,2.63,2.82-.1,1.31-1.42,2.02-1.5,2.07.79,1.05.86,2.42.19,3.38-.7,1-1.89,1.11-2.07,1.13.35.89.11,1.88-.56,2.44-.78.65-1.78.4-1.88.38-.07,1.1-.73,2.05-1.69,2.44-1.18.48-2.61.02-3.38-1.13-.56.77-1.44,1.22-2.3,1.13-1.21-.14-2.24-1.33-2.21-2.82-.55.29-1.2.3-1.69,0-.68-.42-.96-1.39-.56-2.25-.96.28-1.98.08-2.63-.56-.91-.9-.99-2.55,0-3.77-.96-.3-1.63-1.13-1.69-2.05-.07-1.14.8-2.23,2.07-2.44-.91-.94-.93-2.36-.19-3.19.57-.64,1.54-.86,2.44-.56-.62-1.44.02-3.11,1.39-3.76,1.3-.61,2.91-.14,3.68,1.13Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M930.04,316.88c-.15.23-.3.47-.46.7-.25.55-.65,1.6-.57,2.95.02.32.16,2.58,1.82,4,.74.63,1.27.66,1.39.67.83.03,1.44-.57,1.75-.88,1.19-1.17,1.36-2.74,1.46-3.5.27-1.95-.32-3.47-.59-4.09-.25.5-.78.79-1.3.73-.68-.07-1-.69-1.02-.73-.35.72-1.08,1.07-1.68.9-.52-.15-.76-.65-.8-.75Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M935.05,317.58c.9-.54,1.91-.52,2.47,0,.23.21.49.61.47,1.12-.02.45-.26,1-.63,1.12-.54.18-1.45-.52-2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M929.23,317.58c-.9-.54-1.91-.52-2.47,0-.23.21-.49.61-.47,1.12.02.45.26,1,.63,1.12.54.18,1.45-.52,2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="932.43" y1="325.28" x2="932.37" y2="323.95"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="933.03 322.8 932.34 323.99 931.65 322.8"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="931.21" cy="319.65" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="933.25" cy="319.65" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M947.01,300.29c.36-.73,1.11-1.18,1.88-1.13.92.06,1.7.82,1.81,1.81.99-.65,2.26-.65,3.19,0,1.26.87,1.2,2.42,1.19,2.51.62-.4,1.4-.39,1.88,0,.64.52.74,1.67,0,2.44,1.63.23,2.72,1.55,2.63,2.82-.1,1.31-1.42,2.02-1.5,2.07.79,1.05.86,2.42.19,3.38-.7,1-1.89,1.11-2.07,1.13.35.89.11,1.88-.56,2.44-.78.65-1.78.4-1.88.38-.07,1.1-.73,2.05-1.69,2.44-1.18.48-2.61.02-3.38-1.13-.56.77-1.44,1.22-2.3,1.13-1.21-.14-2.24-1.33-2.21-2.82-.55.29-1.2.3-1.69,0-.68-.42-.96-1.39-.56-2.25-.96.28-1.98.08-2.63-.56-.91-.9-.99-2.55,0-3.77-.96-.3-1.63-1.13-1.69-2.05-.07-1.14.8-2.23,2.07-2.44-.91-.94-.93-2.36-.19-3.19.57-.64,1.54-.86,2.44-.56-.62-1.44.02-3.11,1.39-3.76,1.3-.61,2.91-.14,3.68,1.13Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M946.25,306.07c-.15.23-.3.47-.46.7-.25.55-.65,1.6-.57,2.95.02.32.16,2.58,1.82,4,.74.63,1.27.66,1.39.67.83.03,1.44-.57,1.75-.88,1.19-1.17,1.36-2.74,1.46-3.5.27-1.95-.32-3.47-.59-4.09-.25.5-.78.79-1.3.73-.68-.07-1-.69-1.02-.73-.35.72-1.08,1.07-1.68.9-.52-.15-.76-.65-.8-.75Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M951.25,306.78c.9-.54,1.91-.52,2.47,0,.23.21.49.61.47,1.12-.02.45-.26,1-.63,1.12-.54.18-1.45-.52-2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M945.44,306.78c-.9-.54-1.91-.52-2.47,0-.23.21-.49.61-.47,1.12.02.45.26,1,.63,1.12.54.18,1.45-.52,2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="948.63" y1="314.47" x2="948.57" y2="313.14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="949.23 312 948.54 313.19 947.86 312"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="947.41" cy="308.85" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="949.46" cy="308.85" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M960.52,312.9c.36-.73,1.11-1.18,1.88-1.13.92.06,1.7.82,1.81,1.81.99-.65,2.26-.65,3.19,0,1.26.87,1.2,2.42,1.19,2.51.62-.4,1.4-.39,1.88,0,.64.52.74,1.67,0,2.44,1.63.23,2.72,1.55,2.63,2.82-.1,1.31-1.42,2.02-1.5,2.07.79,1.05.86,2.42.19,3.38-.7,1-1.89,1.11-2.07,1.13.35.89.11,1.88-.56,2.44-.78.65-1.78.4-1.88.38-.07,1.1-.73,2.05-1.69,2.44-1.18.48-2.61.02-3.38-1.13-.56.77-1.44,1.22-2.3,1.13-1.21-.14-2.24-1.33-2.21-2.82-.55.29-1.2.3-1.69,0-.68-.42-.96-1.39-.56-2.25-.96.28-1.98.08-2.63-.56-.91-.9-.99-2.55,0-3.77-.96-.3-1.63-1.13-1.69-2.05-.07-1.14.8-2.23,2.07-2.44-.91-.94-.93-2.36-.19-3.19.57-.64,1.54-.86,2.44-.56-.62-1.44.02-3.11,1.39-3.76,1.3-.61,2.91-.14,3.68,1.13Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M959.75,318.68c-.15.23-.3.47-.46.7-.25.55-.65,1.6-.57,2.95.02.32.16,2.58,1.82,4,.74.63,1.27.66,1.39.67.83.03,1.44-.57,1.75-.88,1.19-1.17,1.36-2.74,1.46-3.5.27-1.95-.32-3.47-.59-4.09-.25.5-.78.79-1.3.73-.68-.07-1-.69-1.02-.73-.35.72-1.08,1.07-1.68.9-.52-.15-.76-.65-.8-.75Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M964.75,319.38c.9-.54,1.91-.52,2.47,0,.23.21.49.61.47,1.12-.02.45-.26,1-.63,1.12-.54.18-1.45-.52-2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M958.94,319.38c-.9-.54-1.91-.52-2.47,0-.23.21-.49.61-.47,1.12.02.45.26,1,.63,1.12.54.18,1.45-.52,2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="962.13" y1="327.08" x2="962.08" y2="325.75"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="962.73 324.6 962.05 325.79 961.36 324.6"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="960.92" cy="321.45" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="962.96" cy="321.45" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M949.1,327.67c.46-.92,1.4-1.49,2.37-1.42,1.16.08,2.15,1.03,2.29,2.29,1.25-.82,2.85-.82,4.03,0,1.59,1.1,1.51,3.06,1.51,3.17.79-.51,1.76-.49,2.37,0,.81.65.93,2.11,0,3.08,2.06.29,3.44,1.96,3.32,3.56-.12,1.65-1.79,2.55-1.9,2.61,1,1.32,1.08,3.06.24,4.27-.88,1.26-2.38,1.41-2.61,1.42.44,1.13.14,2.38-.71,3.08-.99.82-2.24.51-2.37.47-.09,1.38-.92,2.59-2.13,3.08-1.49.6-3.3.03-4.27-1.42-.7.98-1.82,1.55-2.91,1.42-1.53-.17-2.83-1.68-2.79-3.56-.7.37-1.52.38-2.13,0-.85-.53-1.21-1.76-.71-2.85-1.21.35-2.5.1-3.32-.71-1.15-1.13-1.25-3.23,0-4.76-1.21-.38-2.06-1.43-2.13-2.59-.09-1.43,1.01-2.82,2.61-3.08-1.15-1.19-1.18-2.99-.24-4.03.72-.8,1.95-1.09,3.08-.71-.78-1.82.03-3.93,1.75-4.74,1.64-.77,3.67-.17,4.65,1.42Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M948.14,334.97c-.19.3-.38.59-.57.89-.32.69-.82,2.02-.72,3.72.02.41.21,3.26,2.3,5.05.93.8,1.6.84,1.75.84,1.04.04,1.82-.72,2.21-1.11,1.5-1.47,1.71-3.47,1.84-4.42.34-2.47-.4-4.38-.75-5.16-.32.63-.98.99-1.65.92-.86-.09-1.26-.87-1.29-.92-.44.91-1.37,1.35-2.12,1.13-.66-.19-.96-.82-1.01-.95Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M954.46,335.85c1.14-.68,2.41-.65,3.12,0,.29.27.62.77.59,1.41-.02.57-.33,1.26-.79,1.41-.68.23-1.83-.66-2.57-2.41"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M947.12,335.85c-1.14-.68-2.41-.65-3.12,0-.29.27-.62.77-.59,1.41.02.57.33,1.26.79,1.41.68.23,1.83-.66,2.57-2.41"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="951.15" y1="345.58" x2="951.08" y2="343.89"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="951.91 342.45 951.04 343.95 950.17 342.45"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="949.61" cy="338.47" r=".18"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="952.19" cy="338.47" r=".18"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1045.09,282.19c.57-1.15,1.75-1.86,2.96-1.78,1.45.1,2.68,1.29,2.86,2.86,1.56-1.03,3.56-1.02,5.04,0,1.99,1.38,1.89,3.82,1.88,3.95.98-.63,2.2-.61,2.96,0,1.01.82,1.16,2.63,0,3.85,2.57.36,4.29,2.44,4.15,4.44-.15,2.07-2.23,3.19-2.37,3.26,1.25,1.65,1.35,3.82.3,5.33-1.1,1.58-2.97,1.75-3.26,1.78.55,1.41.18,2.97-.89,3.85-1.24,1.03-2.8.63-2.96.59-.11,1.73-1.15,3.24-2.66,3.85-1.85.75-4.12.04-5.33-1.78-.88,1.22-2.27,1.93-3.63,1.78-1.9-.21-3.53-2.1-3.48-4.44-.87.46-1.89.48-2.66,0-1.07-.66-1.51-2.19-.89-3.55-1.52.43-3.12.12-4.15-.89-1.44-1.41-1.56-4.03,0-5.94-1.51-.48-2.57-1.78-2.66-3.24-.11-1.79,1.27-3.52,3.26-3.85-1.43-1.49-1.47-3.73-.3-5.03.9-1,2.43-1.36,3.85-.89-.97-2.27.04-4.9,2.19-5.92,2.05-.97,4.58-.22,5.8,1.78Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1043.88,291.3c-.24.37-.48.74-.72,1.11-.4.86-1.02,2.52-.89,4.65.03.51.26,4.07,2.88,6.31,1.16,1,2,1.05,2.19,1.05,1.3.05,2.27-.9,2.76-1.38,1.88-1.84,2.14-4.33,2.3-5.52.42-3.08-.5-5.47-.94-6.44-.4.78-1.22,1.24-2.06,1.15-1.08-.12-1.58-1.08-1.61-1.15-.55,1.14-1.71,1.69-2.65,1.42-.82-.24-1.19-1.03-1.27-1.19Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1051.77,292.41c1.42-.85,3.01-.82,3.89,0,.36.34.78.97.74,1.76-.03.72-.41,1.57-.99,1.76-.85.28-2.28-.82-3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1042.61,292.41c-1.42-.85-3.01-.82-3.89,0-.36.34-.78.97-.74,1.76.03.72.41,1.57.99,1.76.85.28,2.28-.82,3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1047.64" y1="304.55" x2="1047.55" y2="302.45"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1048.58 300.64 1047.5 302.52 1046.42 300.64"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1045.72" cy="295.68" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1048.94" cy="295.68" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1089.19,202.5c.46-.93,1.41-1.49,2.38-1.43,1.16.08,2.16,1.04,2.3,2.3,1.25-.82,2.87-.82,4.05,0,1.6,1.11,1.52,3.07,1.51,3.18.79-.51,1.77-.49,2.38,0,.81.66.94,2.12,0,3.1,2.07.29,3.45,1.97,3.34,3.57-.12,1.66-1.8,2.56-1.91,2.62,1.01,1.33,1.09,3.07.24,4.29-.88,1.27-2.39,1.41-2.62,1.43.44,1.13.14,2.39-.71,3.1-1,.82-2.25.51-2.38.48-.09,1.39-.93,2.6-2.14,3.1-1.49.6-3.31.03-4.29-1.43-.71.98-1.82,1.55-2.92,1.43-1.53-.17-2.84-1.69-2.8-3.57-.7.37-1.52.39-2.14,0-.86-.53-1.22-1.76-.71-2.86-1.22.35-2.51.1-3.34-.71-1.16-1.14-1.26-3.24,0-4.78-1.22-.38-2.07-1.44-2.14-2.61-.09-1.44,1.02-2.83,2.62-3.1-1.15-1.2-1.18-3-.24-4.05.73-.81,1.96-1.09,3.1-.71-.78-1.83.03-3.95,1.76-4.76,1.65-.78,3.69-.18,4.67,1.43Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1088.22,209.83c-.19.3-.38.59-.58.89-.32.69-.82,2.03-.72,3.74.02.41.21,3.27,2.31,5.08.93.8,1.61.84,1.76.85,1.05.04,1.82-.72,2.22-1.11,1.51-1.48,1.72-3.48,1.85-4.44.34-2.48-.4-4.4-.75-5.18-.32.63-.99,1-1.65.93-.87-.09-1.27-.87-1.3-.93-.45.91-1.37,1.36-2.13,1.14-.66-.19-.96-.83-1.02-.95Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1094.57,210.72c1.14-.69,2.42-.66,3.13,0,.29.27.62.78.6,1.42-.02.58-.33,1.26-.8,1.42-.68.23-1.84-.66-2.58-2.42"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1087.2,210.72c-1.14-.69-2.42-.66-3.13,0-.29.27-.62.78-.6,1.42.02.58.33,1.26.8,1.42.68.23,1.84-.66,2.58-2.42"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1091.25" y1="220.48" x2="1091.17" y2="218.8"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1092.01 217.34 1091.14 218.85 1090.27 217.34"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1089.7" cy="213.35" r=".19"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1092.29" cy="213.35" r=".19"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1009.08,268.69c.57-1.15,1.75-1.86,2.96-1.78,1.45.1,2.68,1.29,2.86,2.86,1.56-1.03,3.56-1.02,5.04,0,1.99,1.38,1.89,3.82,1.88,3.95.98-.63,2.2-.61,2.96,0,1.01.82,1.16,2.63,0,3.85,2.57.36,4.29,2.44,4.15,4.44-.15,2.07-2.23,3.19-2.37,3.26,1.25,1.65,1.35,3.82.3,5.33-1.1,1.58-2.97,1.75-3.26,1.78.55,1.41.18,2.97-.89,3.85-1.24,1.03-2.8.63-2.96.59-.11,1.73-1.15,3.24-2.66,3.85-1.85.75-4.12.04-5.33-1.78-.88,1.22-2.27,1.93-3.63,1.78-1.9-.21-3.53-2.1-3.48-4.44-.87.46-1.89.48-2.66,0-1.07-.66-1.51-2.19-.89-3.55-1.52.43-3.12.12-4.15-.89-1.44-1.41-1.56-4.03,0-5.94-1.51-.48-2.57-1.78-2.66-3.24-.11-1.79,1.27-3.52,3.26-3.85-1.43-1.49-1.47-3.73-.3-5.03.9-1,2.43-1.36,3.85-.89-.97-2.27.04-4.9,2.19-5.92,2.05-.97,4.58-.22,5.8,1.78Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1007.87,277.8c-.24.37-.48.74-.72,1.11-.4.86-1.02,2.52-.89,4.65.03.51.26,4.07,2.88,6.31,1.16,1,2,1.05,2.19,1.05,1.3.05,2.27-.9,2.76-1.38,1.88-1.84,2.14-4.33,2.3-5.52.42-3.08-.5-5.47-.94-6.44-.4.78-1.22,1.24-2.06,1.15-1.08-.12-1.58-1.08-1.61-1.15-.55,1.14-1.71,1.69-2.65,1.42-.82-.24-1.19-1.03-1.27-1.19Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1015.76,278.91c1.42-.85,3.01-.82,3.89,0,.36.34.78.97.74,1.76-.03.72-.41,1.57-.99,1.76-.85.28-2.28-.82-3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1006.6,278.91c-1.42-.85-3.01-.82-3.89,0-.36.34-.78.97-.74,1.76.03.72.41,1.57.99,1.76.85.28,2.28-.82,3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1011.63" y1="291.04" x2="1011.54" y2="288.94"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1012.57 287.14 1011.49 289.01 1010.41 287.14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1009.71" cy="282.17" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1012.93" cy="282.17" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M916.4,244.48c.36-.73,1.11-1.18,1.88-1.13.92.06,1.7.82,1.81,1.81.99-.65,2.26-.65,3.19,0,1.26.87,1.2,2.42,1.19,2.51.62-.4,1.4-.39,1.88,0,.64.52.74,1.67,0,2.44,1.63.23,2.72,1.55,2.63,2.82-.1,1.31-1.42,2.02-1.5,2.07.79,1.05.86,2.42.19,3.38-.7,1-1.89,1.11-2.07,1.13.35.89.11,1.88-.56,2.44-.78.65-1.78.4-1.88.38-.07,1.1-.73,2.05-1.69,2.44-1.18.48-2.61.02-3.38-1.13-.56.77-1.44,1.22-2.3,1.13-1.21-.14-2.24-1.33-2.21-2.82-.55.29-1.2.3-1.69,0-.68-.42-.96-1.39-.56-2.25-.96.28-1.98.08-2.63-.56-.91-.9-.99-2.55,0-3.77-.96-.3-1.63-1.13-1.69-2.05-.07-1.14.8-2.23,2.07-2.44-.91-.94-.93-2.36-.19-3.19.57-.64,1.54-.86,2.44-.56-.62-1.44.02-3.11,1.39-3.76,1.3-.61,2.91-.14,3.68,1.13Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M915.64,250.26c-.15.23-.3.47-.46.7-.25.55-.65,1.6-.57,2.95.02.32.16,2.58,1.82,4,.74.63,1.27.66,1.39.67.83.03,1.44-.57,1.75-.88,1.19-1.17,1.36-2.74,1.46-3.5.27-1.95-.32-3.47-.59-4.09-.25.5-.78.79-1.3.73-.68-.07-1-.69-1.02-.73-.35.72-1.08,1.07-1.68.9-.52-.15-.76-.65-.8-.75Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M920.64,250.96c.9-.54,1.91-.52,2.47,0,.23.21.49.61.47,1.12-.02.45-.26,1-.63,1.12-.54.18-1.45-.52-2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M914.83,250.96c-.9-.54-1.91-.52-2.47,0-.23.21-.49.61-.47,1.12.02.45.26,1,.63,1.12.54.18,1.45-.52,2.04-1.91"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="918.02" y1="258.66" x2="917.96" y2="257.33"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="918.62 256.18 917.93 257.37 917.25 256.18"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="916.8" cy="253.03" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="918.85" cy="253.03" r=".15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M954.75,230.71c.35-.71,1.08-1.14,1.82-1.09.89.06,1.65.79,1.75,1.76.96-.63,2.19-.63,3.09,0,1.22.85,1.16,2.35,1.16,2.43.6-.39,1.35-.38,1.82,0,.62.5.72,1.62,0,2.37,1.58.22,2.64,1.5,2.55,2.73-.09,1.27-1.37,1.96-1.46,2,.77,1.01.83,2.35.18,3.28-.67.97-1.83,1.08-2,1.09.34.86.11,1.82-.55,2.37-.76.63-1.72.39-1.82.36-.07,1.06-.71,1.99-1.64,2.37-1.14.46-2.53.02-3.28-1.09-.54.75-1.39,1.19-2.23,1.09-1.17-.13-2.17-1.29-2.14-2.73-.53.29-1.16.3-1.64,0-.66-.41-.93-1.35-.55-2.18-.93.27-1.92.07-2.55-.55-.88-.87-.96-2.47,0-3.65-.93-.29-1.58-1.1-1.64-1.99-.07-1.1.78-2.16,2-2.37-.88-.92-.9-2.29-.18-3.09.55-.62,1.49-.83,2.37-.55-.6-1.39.02-3.01,1.35-3.64,1.26-.59,2.81-.13,3.57,1.09Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M954.01,236.31c-.15.23-.29.45-.44.68-.25.53-.63,1.55-.55,2.85.02.31.16,2.5,1.77,3.88.71.61,1.23.64,1.34.65.8.03,1.39-.55,1.7-.85,1.15-1.13,1.31-2.66,1.41-3.39.26-1.89-.31-3.36-.58-3.96-.25.48-.75.76-1.26.71-.66-.07-.97-.67-.99-.71-.34.7-1.05,1.04-1.63.87-.5-.15-.73-.63-.78-.73Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M958.86,236.99c.87-.52,1.85-.5,2.39,0,.22.21.48.59.46,1.08-.02.44-.25.97-.61,1.08-.52.17-1.4-.5-1.97-1.85"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M953.23,236.99c-.87-.52-1.85-.5-2.39,0-.22.21-.48.59-.46,1.08.02.44.25.97.61,1.08.52.17,1.4-.5,1.97-1.85"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="956.32" y1="244.45" x2="956.26" y2="243.16"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="956.9 242.05 956.24 243.2 955.57 242.05"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="955.14" cy="239" r=".14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="957.12" cy="239" r=".14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M936.75,229.81c.35-.71,1.08-1.14,1.82-1.09.89.06,1.65.79,1.75,1.76.96-.63,2.19-.63,3.09,0,1.22.85,1.16,2.35,1.16,2.43.6-.39,1.35-.38,1.82,0,.62.5.72,1.62,0,2.37,1.58.22,2.64,1.5,2.55,2.73-.09,1.27-1.37,1.96-1.46,2,.77,1.01.83,2.35.18,3.28-.67.97-1.83,1.08-2,1.09.34.86.11,1.82-.55,2.37-.76.63-1.72.39-1.82.36-.07,1.06-.71,1.99-1.64,2.37-1.14.46-2.53.02-3.28-1.09-.54.75-1.39,1.19-2.23,1.09-1.17-.13-2.17-1.29-2.14-2.73-.53.29-1.16.3-1.64,0-.66-.41-.93-1.35-.55-2.18-.93.27-1.92.07-2.55-.55-.88-.87-.96-2.47,0-3.65-.93-.29-1.58-1.1-1.64-1.99-.07-1.1.78-2.16,2-2.37-.88-.92-.9-2.29-.18-3.09.55-.62,1.49-.83,2.37-.55-.6-1.39.02-3.01,1.35-3.64,1.26-.59,2.81-.13,3.57,1.09Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M936,235.41c-.15.23-.29.45-.44.68-.25.53-.63,1.55-.55,2.85.02.31.16,2.5,1.77,3.88.71.61,1.23.64,1.34.65.8.03,1.39-.55,1.7-.85,1.15-1.13,1.31-2.66,1.41-3.39.26-1.89-.31-3.36-.58-3.96-.25.48-.75.76-1.26.71-.66-.07-.97-.67-.99-.71-.34.7-1.05,1.04-1.63.87-.5-.15-.73-.63-.78-.73Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M940.85,236.09c.87-.52,1.85-.5,2.39,0,.22.21.48.59.46,1.08-.02.44-.25.97-.61,1.08-.52.17-1.4-.5-1.97-1.85"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M935.22,236.09c-.87-.52-1.85-.5-2.39,0-.22.21-.48.59-.46,1.08.02.44.25.97.61,1.08.52.17,1.4-.5,1.97-1.85"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="938.31" y1="243.55" x2="938.26" y2="242.26"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="938.9 241.15 938.23 242.3 937.57 241.15"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="937.14" cy="238.1" r=".14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="939.11" cy="238.1" r=".14"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M931.66,163.72c.43-.87,1.33-1.41,2.24-1.35,1.09.07,2.03.98,2.16,2.16,1.18-.78,2.7-.77,3.81,0,1.5,1.04,1.43,2.89,1.42,3,.74-.48,1.67-.46,2.24,0,.77.62.88,1.99,0,2.92,1.95.27,3.25,1.85,3.14,3.36-.12,1.56-1.69,2.41-1.79,2.47.95,1.25,1.02,2.89.22,4.04-.83,1.19-2.25,1.33-2.47,1.35.42,1.07.13,2.25-.67,2.92-.94.78-2.12.48-2.24.45-.08,1.31-.87,2.45-2.02,2.92-1.4.57-3.12.03-4.04-1.35-.66.92-1.72,1.46-2.75,1.35-1.44-.16-2.67-1.59-2.64-3.36-.66.35-1.43.36-2.02,0-.81-.5-1.14-1.66-.67-2.69-1.15.33-2.36.09-3.14-.67-1.09-1.07-1.18-3.05,0-4.5-1.14-.36-1.95-1.35-2.02-2.45-.09-1.36.96-2.67,2.47-2.92-1.09-1.13-1.11-2.82-.22-3.81.68-.76,1.84-1.03,2.92-.67-.74-1.72.03-3.71,1.66-4.49,1.55-.73,3.47-.17,4.4,1.35Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M930.74,170.62c-.18.28-.36.56-.54.84-.3.65-.77,1.91-.68,3.52.02.39.2,3.08,2.18,4.78.88.75,1.51.79,1.66.8.99.04,1.72-.68,2.09-1.05,1.42-1.39,1.62-3.28,1.74-4.18.32-2.33-.38-4.14-.71-4.88-.3.59-.93.94-1.56.87-.81-.09-1.19-.82-1.22-.87-.42.86-1.29,1.28-2,1.07-.62-.18-.9-.78-.96-.9Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M936.72,171.46c1.08-.65,2.28-.62,2.95,0,.27.25.59.73.56,1.34-.02.54-.31,1.19-.75,1.34-.64.21-1.73-.62-2.43-2.27"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M929.78,171.46c-1.08-.65-2.28-.62-2.95,0-.27.25-.59.73-.56,1.34.02.54.31,1.19.75,1.34.64.21,1.73-.62,2.43-2.27"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="933.59" y1="180.65" x2="933.52" y2="179.06"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="934.31 177.7 933.49 179.12 932.67 177.7"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="932.14" cy="173.94" r=".17"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="934.58" cy="173.94" r=".17"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M926.67,184.25c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M928.48,195.71c-1,.46-1.64,1.44-1.62,2.48.02,1.25.99,2.36,2.33,2.59.88-.55,1.4-1.53,1.35-2.53-.07-1.17-.89-2.19-2.06-2.54Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M1041.52,208.93c.39-.79,1.21-1.28,2.04-1.22.99.07,1.85.89,1.96,1.96,1.07-.71,2.45-.7,3.46,0,1.37.95,1.3,2.63,1.29,2.72.68-.44,1.51-.42,2.04,0,.7.56.8,1.81,0,2.65,1.77.25,2.95,1.68,2.85,3.06-.1,1.42-1.54,2.19-1.63,2.24.86,1.14.93,2.63.2,3.67-.76,1.08-2.05,1.21-2.24,1.22.38.97.12,2.04-.61,2.65-.85.71-1.93.44-2.04.41-.08,1.19-.79,2.23-1.83,2.65-1.28.52-2.83.03-3.67-1.22-.6.84-1.56,1.33-2.5,1.22-1.31-.15-2.43-1.44-2.39-3.06-.6.32-1.3.33-1.83,0-.73-.46-1.04-1.51-.61-2.44-1.04.3-2.15.08-2.85-.61-.99-.97-1.07-2.77,0-4.09-1.04-.33-1.77-1.23-1.83-2.23-.08-1.23.87-2.42,2.24-2.65-.99-1.02-1.01-2.56-.2-3.46.62-.69,1.67-.93,2.65-.61-.67-1.56.02-3.37,1.51-4.07,1.41-.67,3.15-.15,3.99,1.22Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1042.99,218.22c-.81.37-1.33,1.17-1.31,2.01.02,1.01.81,1.92,1.89,2.1.72-.45,1.14-1.24,1.09-2.06-.05-.95-.72-1.78-1.67-2.06Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M1057.53,178.9c.4-.81,1.22-1.3,2.07-1.24,1.01.07,1.87.9,1.99,1.99,1.09-.72,2.49-.71,3.52,0,1.39.96,1.32,2.67,1.31,2.76.69-.44,1.54-.43,2.07,0,.71.57.81,1.84,0,2.69,1.8.25,3,1.71,2.89,3.1-.11,1.44-1.56,2.22-1.65,2.27.87,1.15.94,2.67.21,3.72-.77,1.1-2.08,1.22-2.27,1.24.38.98.12,2.07-.62,2.69-.86.72-1.96.44-2.07.41-.08,1.21-.8,2.26-1.86,2.69-1.29.52-2.87.03-3.72-1.24-.61.85-1.58,1.35-2.53,1.24-1.33-.15-2.46-1.46-2.43-3.1-.61.32-1.32.34-1.86,0-.74-.46-1.05-1.53-.62-2.48-1.06.3-2.18.08-2.89-.62-1-.99-1.09-2.81,0-4.15-1.05-.33-1.8-1.25-1.86-2.26-.08-1.25.88-2.46,2.27-2.69-1-1.04-1.03-2.6-.21-3.51.63-.7,1.7-.95,2.69-.62-.68-1.58.03-3.42,1.53-4.13,1.43-.68,3.2-.15,4.05,1.24Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1059.02,188.32c-.82.38-1.35,1.19-1.33,2.04.02,1.03.82,1.94,1.92,2.13.73-.45,1.15-1.26,1.11-2.09-.05-.96-.73-1.8-1.7-2.09Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M946.66,246.19c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M948.48,257.65c-1,.46-1.64,1.44-1.62,2.48.02,1.25.99,2.36,2.33,2.59.88-.55,1.4-1.53,1.35-2.53-.07-1.17-.89-2.19-2.06-2.54Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M1069.1,295.71c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1070.91,307.16c-1,.46-1.64,1.44-1.62,2.48.02,1.25.99,2.36,2.33,2.59.88-.55,1.4-1.53,1.35-2.53-.07-1.17-.89-2.19-2.06-2.54Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M991.68,327.22c.49-.98,1.49-1.57,2.51-1.51,1.23.08,2.28,1.1,2.42,2.42,1.32-.87,3.02-.87,4.27,0,1.69,1.17,1.6,3.24,1.59,3.35.83-.54,1.87-.52,2.51,0,.86.69.99,2.23,0,3.27,2.18.3,3.64,2.07,3.52,3.77-.13,1.75-1.89,2.7-2.01,2.76,1.06,1.4,1.14,3.24.25,4.52-.93,1.34-2.52,1.49-2.76,1.51.47,1.19.15,2.52-.75,3.27-1.05.87-2.38.54-2.51.5-.09,1.47-.98,2.75-2.26,3.27-1.57.64-3.49.03-4.52-1.51-.74,1.04-1.92,1.64-3.08,1.51-1.62-.18-2.99-1.78-2.95-3.77-.74.39-1.61.41-2.26,0-.9-.56-1.28-1.86-.75-3.01-1.29.37-2.65.1-3.52-.75-1.22-1.2-1.33-3.42,0-5.04-1.28-.41-2.18-1.51-2.26-2.75-.1-1.52,1.07-2.99,2.76-3.27-1.22-1.26-1.25-3.16-.25-4.27.77-.85,2.06-1.15,3.27-.75-.82-1.92.03-4.16,1.86-5.02,1.74-.82,3.89-.19,4.92,1.51Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M993.49,338.67c-1,.46-1.64,1.44-1.62,2.48.02,1.25.99,2.36,2.33,2.59.88-.55,1.4-1.53,1.35-2.53-.07-1.17-.89-2.19-2.06-2.54Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <path
                                    d="M950.12,172.37c.51-1.02,1.55-1.65,2.63-1.58,1.28.08,2.38,1.15,2.53,2.53,1.38-.91,3.16-.91,4.47,0,1.76,1.22,1.68,3.39,1.67,3.51.87-.56,1.95-.54,2.63,0,.9.72,1.03,2.34,0,3.42,2.29.32,3.81,2.17,3.68,3.94-.13,1.83-1.98,2.83-2.1,2.89,1.11,1.47,1.2,3.39.26,4.73-.97,1.4-2.64,1.56-2.89,1.58.49,1.25.16,2.63-.79,3.42-1.1.91-2.49.56-2.63.53-.1,1.53-1.02,2.87-2.37,3.42-1.65.67-3.65.03-4.73-1.58-.78,1.08-2.01,1.71-3.22,1.58-1.69-.19-3.13-1.86-3.09-3.94-.77.41-1.68.43-2.37,0-.95-.59-1.34-1.94-.79-3.15-1.35.38-2.77.11-3.68-.79-1.28-1.26-1.39-3.57,0-5.27-1.34-.42-2.28-1.58-2.37-2.87-.1-1.59,1.12-3.12,2.89-3.42-1.27-1.32-1.31-3.31-.26-4.47.8-.89,2.16-1.2,3.42-.79-.86-2.01.03-4.35,1.94-5.26,1.82-.86,4.06-.19,5.15,1.58Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M952.01,184.35c-1.04.48-1.71,1.51-1.69,2.59.03,1.3,1.04,2.47,2.44,2.71.92-.58,1.47-1.6,1.41-2.65-.07-1.22-.93-2.29-2.16-2.65Z"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M1027.98,226.37c.57-1.15,1.75-1.86,2.96-1.78,1.45.1,2.68,1.29,2.86,2.86,1.56-1.03,3.56-1.02,5.04,0,1.99,1.38,1.89,3.82,1.88,3.95.98-.63,2.2-.61,2.96,0,1.01.82,1.16,2.63,0,3.85,2.57.36,4.29,2.44,4.15,4.44-.15,2.07-2.23,3.19-2.37,3.26,1.25,1.65,1.35,3.82.3,5.33-1.1,1.58-2.97,1.75-3.26,1.78.55,1.41.18,2.97-.89,3.85-1.24,1.03-2.8.63-2.96.59-.11,1.73-1.15,3.24-2.66,3.85-1.85.75-4.12.04-5.33-1.78-.88,1.22-2.27,1.93-3.63,1.78-1.9-.21-3.53-2.1-3.48-4.44-.87.46-1.89.48-2.66,0-1.07-.66-1.51-2.19-.89-3.55-1.52.43-3.12.12-4.15-.89-1.44-1.41-1.56-4.03,0-5.94-1.51-.48-2.57-1.78-2.66-3.24-.11-1.79,1.27-3.52,3.26-3.85-1.43-1.49-1.47-3.73-.3-5.03.9-1,2.43-1.36,3.85-.89-.97-2.27.04-4.9,2.19-5.92,2.05-.97,4.58-.22,5.8,1.78Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1026.77,235.49c-.24.37-.48.74-.72,1.11-.4.86-1.02,2.52-.89,4.65.03.51.26,4.07,2.88,6.31,1.16,1,2,1.05,2.19,1.05,1.3.05,2.27-.9,2.76-1.38,1.88-1.84,2.14-4.33,2.3-5.52.42-3.08-.5-5.47-.94-6.44-.4.78-1.22,1.24-2.06,1.15-1.08-.12-1.58-1.08-1.61-1.15-.55,1.14-1.71,1.69-2.65,1.42-.82-.24-1.19-1.03-1.27-1.19Z"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1034.66,236.59c1.42-.85,3.01-.82,3.89,0,.36.34.78.97.74,1.76-.03.72-.41,1.57-.99,1.76-.85.28-2.28-.82-3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                    <path
                                        d="M1025.5,236.59c-1.42-.85-3.01-.82-3.89,0-.36.34-.78.97-.74,1.76.03.72.41,1.57.99,1.76.85.28,2.28-.82,3.21-3"
                                        style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1030.53" y1="248.73" x2="1030.44" y2="246.63"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1031.48 244.83 1030.4 246.7 1029.32 244.83"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1028.61" cy="239.86" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <circle cx="1031.84" cy="239.86" r=".23"
                                    style="fill: #9ac21c; stroke: #004c3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                        </g>
                        <g id="forest_field3">
                            <polygon
                                points="790.95 1559.27 645.44 1643.28 499.93 1559.27 499.93 1391.24 645.44 1307.23 790.95 1391.24 790.95 1559.27"
                                style="fill: #41722d; stroke-width: 0px;" />
                            <g>
                                <path d="M611.78,1545.68s0-83.92,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M619.37,1545.68s0-83.92,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M568.22,1545.68s0-81.91,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M575.82,1545.68s0-81.91,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <polyline
                                    points="614.8 1509.67 678.83 1487.87 634.99 1487.87 678.83 1467.24 635.16 1468.76 669.62 1458.36 634.99 1450.97 662.78 1446.66 648.68 1434.82 614.73 1407.43"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path
                                    d="M615.63,1407.43l-33.95,27.39-14.1,11.84c9.26,1.44,18.53,2.87,27.79,4.31-5.25,1.16-10.5,2.3-15.75,3.43l-.97.25"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M615.56,1509.67c-7.74-2.77-15.48-5.55-23.21-8.32"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M677.42,1545.65s0-34.12,0,0"
                                        style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M680.51,1545.65s0-34.12,0,0"
                                        style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <polyline
                                        points="678.65 1531.01 704.69 1522.31 686.86 1522.31 704.69 1514.08 686.93 1514.69 700.94 1510.54 686.86 1507.59 698.16 1505.87 692.43 1501.15 678.62 1490.23"
                                        style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <polyline
                                        points="678.96 1531.01 652.92 1522.31 670.75 1522.31 652.92 1514.08 670.68 1514.69 656.67 1510.54 670.75 1507.59 659.45 1505.87 665.18 1501.15 678.99 1490.23"
                                        style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                                <line x1="541.2" y1="1545.65" x2="745.26" y2="1545.65"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path
                                    d="M602.17,1481.47c0-15.23-13.75-27.58-30.71-27.58-4.47,0-8.71.86-12.55,2.4-7.05,2.84-12.7,8-15.73,14.4-1.57,3.31-2.44,6.96-2.44,10.78,0,15.23,13.75,27.58,30.71,27.58s30.71-12.35,30.71-27.58Z"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M654.19,1545.68s0-109.55,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M667.78,1545.68s0-40.2,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path
                                    d="M606.87,1414.43c2.75-6.08,6.88-11.56,12.05-16.15,6.77-6.01,15.33-10.49,24.92-12.78,4.72-1.13,9.68-1.73,14.81-1.73,30.73,0,55.63,21.66,55.63,48.38s-24.91,48.38-55.63,48.38c-.56,0-2.05.03-4.11-.13l-2.55-.53"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M654.21,1487.83s0-16.58,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M667.83,1487.83s0-16.58,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M667.83,1499.23s0-16.58,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M573.13,1461.17c-3.81,0-7.44.73-10.7,2.05-6.02,2.42-10.83,6.83-13.42,12.29"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M723.14,1545.46s0-65.92,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M729.1,1545.46s0-65.92,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path
                                    d="M749.8,1494.32c0-11.97-10.8-21.66-24.12-21.66-3.51,0-6.85.67-9.85,1.88-5.54,2.23-9.97,6.28-12.35,11.31-1.23,2.6-1.91,5.46-1.91,8.47,0,11.97,10.8,21.66,24.12,21.66s24.12-9.7,24.12-21.66Z"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M728.86,1480.46c-2.99,0-5.84.57-8.41,1.61-4.73,1.9-8.51,5.36-10.54,9.65"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                        </g>
                        <g id="forest_field2">
                            <polygon
                                points="1493.95 946.27 1348.44 1030.28 1202.93 946.27 1202.93 778.24 1348.44 694.23 1493.95 778.24 1493.95 946.27"
                                style="fill: #41722d; stroke-width: 0px;" />
                            <g>
                                <path d="M1314.78,932.68s0-83.92,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M1322.37,932.68s0-83.92,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M1271.22,932.68s0-81.91,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M1278.82,932.68s0-81.91,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <polyline
                                    points="1317.8 896.67 1381.83 874.87 1337.99 874.87 1381.83 854.24 1338.16 855.76 1372.62 845.36 1337.99 837.97 1365.78 833.66 1351.68 821.82 1317.73 794.43"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path
                                    d="M1318.63,794.43l-33.95,27.39-14.1,11.84c9.26,1.44,18.53,2.87,27.79,4.31-5.25,1.16-10.5,2.3-15.75,3.43l-.97.25"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M1318.56,896.67c-7.74-2.77-15.48-5.55-23.21-8.32"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M1380.42,932.65s0-34.12,0,0"
                                        style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M1383.51,932.65s0-34.12,0,0"
                                        style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <polyline
                                        points="1381.65 918.01 1407.69 909.31 1389.86 909.31 1407.69 901.08 1389.93 901.69 1403.94 897.54 1389.86 894.59 1401.16 892.87 1395.43 888.15 1381.62 877.23"
                                        style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <polyline
                                        points="1381.96 918.01 1355.92 909.31 1373.75 909.31 1355.92 901.08 1373.68 901.69 1359.67 897.54 1373.75 894.59 1362.45 892.87 1368.18 888.15 1381.99 877.23"
                                        style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                                <line x1="1244.2" y1="932.65" x2="1448.26" y2="932.65"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path
                                    d="M1305.17,868.47c0-15.23-13.75-27.58-30.71-27.58-4.47,0-8.71.86-12.55,2.4-7.05,2.84-12.7,8-15.73,14.4-1.57,3.31-2.44,6.96-2.44,10.78,0,15.23,13.75,27.58,30.71,27.58s30.71-12.35,30.71-27.58Z"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M1357.19,932.68s0-109.55,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M1370.78,932.68s0-40.2,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path
                                    d="M1309.87,801.43c2.75-6.08,6.88-11.56,12.05-16.15,6.77-6.01,15.33-10.49,24.92-12.78,4.72-1.13,9.68-1.73,14.81-1.73,30.73,0,55.63,21.66,55.63,48.38s-24.91,48.38-55.63,48.38c-.56,0-2.05.03-4.11-.13l-2.55-.53"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M1357.21,874.83s0-16.58,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M1370.83,874.83s0-16.58,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M1370.83,886.23s0-16.58,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M1276.13,848.17c-3.81,0-7.44.73-10.7,2.05-6.02,2.42-10.83,6.83-13.42,12.29"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M1426.14,932.46s0-65.92,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M1432.1,932.46s0-65.92,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path
                                    d="M1452.8,881.32c0-11.97-10.8-21.66-24.12-21.66-3.51,0-6.85.67-9.85,1.88-5.54,2.23-9.97,6.28-12.35,11.31-1.23,2.6-1.91,5.46-1.91,8.47,0,11.97,10.8,21.66,24.12,21.66s24.12-9.7,24.12-21.66Z"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M1431.86,867.46c-2.99,0-5.84.57-8.41,1.61-4.73,1.9-8.51,5.36-10.54,9.65"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                        </g>
                        <g id="forest_field1">
                            <polygon
                                points="967.15 641.12 821.64 725.13 676.13 641.12 676.13 473.1 821.64 389.09 967.15 473.1 967.15 641.12"
                                style="fill: #41722d; stroke-width: 0px;" />
                            <g>
                                <path d="M787.98,627.54s0-83.92,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M795.57,627.54s0-83.92,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M744.43,627.54s0-81.91,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M752.02,627.54s0-81.91,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <polyline
                                    points="791 591.53 855.03 569.72 811.19 569.72 855.03 549.09 811.36 550.62 845.82 540.21 811.19 532.83 838.98 528.52 824.88 516.68 790.93 489.29"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path
                                    d="M791.83,489.29l-33.95,27.39-14.1,11.84c9.26,1.44,18.53,2.87,27.79,4.31-5.25,1.16-10.5,2.3-15.75,3.43l-.97.25"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M791.76,591.53c-7.74-2.77-15.48-5.55-23.21-8.32"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <g>
                                    <path d="M853.62,627.5s0-34.12,0,0"
                                        style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <path d="M856.71,627.5s0-34.12,0,0"
                                        style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <polyline
                                        points="854.85 612.86 880.89 604.17 863.06 604.17 880.89 595.94 863.13 596.55 877.14 592.4 863.06 589.45 874.36 587.73 868.63 583.01 854.83 572.08"
                                        style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                    <polyline
                                        points="855.16 612.86 829.13 604.17 846.95 604.17 829.13 595.94 846.88 596.55 832.87 592.4 846.95 589.45 835.65 587.73 841.39 583.01 855.19 572.08"
                                        style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                </g>
                                <line x1="717.4" y1="627.5" x2="921.46" y2="627.5"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path
                                    d="M778.37,563.33c0-15.23-13.75-27.58-30.71-27.58-4.47,0-8.71.86-12.55,2.4-7.05,2.84-12.7,8-15.73,14.4-1.57,3.31-2.44,6.96-2.44,10.78,0,15.23,13.75,27.58,30.71,27.58s30.71-12.35,30.71-27.58Z"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M830.39,627.54s0-109.55,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M843.98,627.54s0-40.2,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path
                                    d="M783.07,496.29c2.75-6.08,6.88-11.56,12.05-16.15,6.77-6.01,15.33-10.49,24.92-12.78,4.72-1.13,9.68-1.73,14.81-1.73,30.73,0,55.63,21.66,55.63,48.38s-24.91,48.38-55.63,48.38c-.56,0-2.05.03-4.11-.13l-2.55-.53"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M830.41,569.69s0-16.58,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M844.04,569.69s0-16.58,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M844.04,581.08s0-16.58,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M749.33,543.02c-3.81,0-7.44.73-10.7,2.05-6.02,2.42-10.83,6.83-13.42,12.29"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M899.34,627.31s0-65.92,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M905.3,627.31s0-65.92,0,0"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path
                                    d="M926,576.18c0-11.97-10.8-21.66-24.12-21.66-3.51,0-6.85.67-9.85,1.88-5.54,2.23-9.97,6.28-12.35,11.31-1.23,2.6-1.91,5.46-1.91,8.47,0,11.97,10.8,21.66,24.12,21.66s24.12-9.7,24.12-21.66Z"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <path d="M905.06,562.32c-2.99,0-5.84.57-8.41,1.61-4.73,1.9-8.51,5.36-10.54,9.65"
                                    style="fill: none; stroke: #004c3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                            </g>
                        </g>
                        <g id="hills_field4">
                            <polygon
                                points="1669.3 1252.96 1523.79 1336.97 1378.28 1252.96 1378.28 1084.94 1523.79 1000.93 1669.3 1084.94 1669.3 1252.96"
                                style="fill: #e36a16; stroke-width: 0px;" />
                            <g>
                                <path
                                    d="M1399.52,1121.66c12.59-1.7,25.18-3.4,37.76-5.1,1.53,4.29,3.06,8.58,4.59,12.86v10.07l-4.59,7.78,2.07,9.96-18.66,30.57-7.07,1.8-14.11-6.26"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1450.41 1089.59 1433.55 1102.45 1433.55 1115.73 1446 1117.39 1458.03 1124.45 1466.94 1115.73 1479.98 1110.88 1500.11 1113.11 1500.72 1097.5 1505.2 1089.59"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <polyline
                                    points="1500.11 1113.11 1512.4 1118.45 1526.09 1123.2 1536.88 1131.92 1542.83 1129.43 1546.43 1119.47 1539.37 1104.94 1542.46 1092.28 1537.02 1089.59"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1553.25 1089.59 1559.71 1103.28 1561.37 1112.83 1546.43 1119.47"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1441.87 1139.49 1451.56 1136.52 1454.24 1135.7 1461.85 1137.6 1468.31 1131.92 1471.76 1126.88 1464.38 1126.88 1458.03 1124.45"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1451.56,1136.52l5.25,10.15,11.69,12.01-6.63,3.91-7.63,10.61,1.63,16.39c1.37,4.73,3.52,10.47,7,16.57,5.93,10.4,13.18,17.38,18.4,21.61l10.79-2.91,3.74-3.74"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1510.83 1254.34 1508.71 1239.69 1510.83 1223.21 1506.71 1215.11 1500.11 1200.03 1488.35 1184.38 1481.29 1171.96 1468.5 1158.69"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1420.69 1187.8 1422.34 1192.09 1419.44 1198.73 1419.44 1206.51 1424.42 1214.92 1416.53 1220.73 1416.53 1233.75 1413.21 1238.57 1406.99 1241.48 1399.52 1241.48"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1448.9 1254.34 1441.87 1244.59 1433.55 1237.73 1422.76 1235.25 1416.53 1233.75"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1424.42,1214.92c3.04.9,6.09,1.79,9.13,2.69,1.47-.97,4.36-2.58,8.32-2.97,6.01-.58,10.48,2.05,11.9,2.97l5.53-2.97"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="1474.78" y1="1254.34" x2="1481.27" y2="1227.78"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1481.29 1171.96 1504.1 1164.7 1524.85 1160.14 1524.85 1150.59 1527.34 1144.37 1519.87 1137.73 1507.96 1131.92 1504.31 1129.43 1504.31 1123.16 1497.78 1119.47 1488.49 1126.88 1477.66 1129.43 1471.76 1126.88"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1486.67 1221.14 1490.93 1217.61 1506.71 1215.11 1520.7 1209.94 1520.7 1200.58 1528.58 1193.34 1534.81 1183.79 1541.86 1175.08 1533.17 1171.96 1527.34 1166.96 1524.85 1160.14"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1523.27 1140.75 1528.31 1136.52 1536.88 1131.92"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1648.52,1182.15l-13.28-17.87h-4.41l-3.48,2.08-5.81-9.96-15.77-7.47c-5.3-1.39-11.75-2.65-19.13-3.22-6.14-.47-11.69-.36-16.45,0-4.48.24-10.11,1.04-16.29,3.16-13.63,4.68-22.3,13.19-26.56,18.08"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="1561.37" y1="1112.83" x2="1583.6" y2="1145.71"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1565.85 1119.47 1586.27 1104.53 1586.27 1098.3 1589.39 1089.59"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1640.58 1089.59 1634.82 1098.72 1637.7 1110.75 1629 1119.47 1605.77 1148.93"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1541.86 1175.08 1563.86 1192.92 1575.06 1189.6 1585.85 1197.49 1594.87 1197.49 1603.28 1199.98 1605.77 1178.43 1625.07 1162.44"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1508.71 1239.69 1535.45 1241.06 1541.86 1244.05 1556.48 1241.48 1561.37 1245.16 1567.75 1254.34"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1550.08 1182.15 1550.08 1205.25 1558.46 1212.43 1570.19 1221.14 1581.77 1227.78 1591.25 1224.88 1587.93 1209.82 1583.46 1200.98 1585.85 1197.49"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1598.83 1254.34 1610.41 1247.02 1598.83 1239.69 1591.25 1232.36 1591.25 1224.88 1597 1224.88 1600.83 1211.04 1603.28 1199.98 1604.11 1209.11 1608.68 1213.26 1611.93 1221.14 1610.11 1233.75 1609.19 1241.06 1611.93 1250.04 1615.29 1254.34"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1628.69 1254.34 1631.92 1237.74 1640.63 1225.29 1648.52 1216.12"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1648.52 1235.23 1640.63 1225.29 1638.6 1221.14 1631.13 1216.12 1617.81 1212.43 1604.11 1209.11"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1434.49 1165.2 1439.36 1167.19 1444.04 1165.2 1448.9 1162.44 1448.9 1157.1"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1497.9 1166.67 1492.49 1157.1 1494.01 1148.93 1499.55 1145.71 1503.68 1143.12 1506.81 1139.49"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1493.1 1153.83 1489.67 1152.29 1487.92 1148.93 1486.67 1144.78 1487.29 1139.49 1486.67 1134.93"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1499.55 1198.25 1506.81 1192.15 1510.83 1184.65 1515.72 1173.42 1518.87 1167.19"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1520.7 1200.58 1518.87 1195.12 1516.69 1190.64 1513.25 1187.8 1510.83 1186.06"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1605.77 1178.43 1597.89 1175.08 1591.25 1171.32 1587.93 1168.75 1589.39 1165.32 1591.25 1160.14 1594.15 1155.99 1596.02 1153.08"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1561.37 1152.05 1565.85 1158.69 1573.42 1163.93 1581.7 1169.68 1587.93 1168.75"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1572.48 1168.96 1573.42 1163.93 1571.74 1173 1571.74 1176.88 1574.65 1182.15"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="1553.9" y1="1148.87" x2="1542.83" y2="1129.43"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1558.46 1212.43 1553.9 1217.61 1547.26 1219.9 1542.83 1219.9 1539.25 1227.16 1531.9 1229.86 1516.68 1229.86"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="1556.48" y1="1241.48" x2="1558.46" y2="1223.3"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1556.48 1096.43 1565.85 1093.85 1574.65 1093.85 1579.25 1093.85"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1471.76 1089.59 1468.5 1098.59 1459.3 1107.02"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="1418.33" y1="1089.59" x2="1411.97" y2="1101.29"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1627.35 1166.36 1626.31 1173.04 1619.88 1176.74 1615.29 1186.06 1611.17 1196.24"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="1638.6" y1="1160.86" x2="1648.52" y2="1148.93"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="1631.9" y1="1116.56" x2="1645.2" y2="1126.11"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1399.52 1169.68 1407.85 1157.1 1405.14 1148.93 1409.54 1140.75"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="1399.52" y1="1210.83" x2="1411.97" y2="1202.04"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1455.54,1187.11c.94-1.07,3.15-3.27,6.74-4.39,2.62-.82,4.89-.73,6.22-.57,2.55-.28,5.09-.57,7.64-.85.63-.96,1.26-1.91,1.89-2.87"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1539.37 1104.94 1527.34 1104.53 1522.47 1102.64 1514.26 1110.75"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1586.27 1104.53 1595.48 1102.64 1605.77 1099.6 1615.29 1098.3 1617.45 1093.85"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                        </g>
                        <g id="hills_field3">
                            <polygon
                                points="967.52 1252.37 822.01 1336.39 676.5 1252.37 676.5 1084.35 822.01 1000.34 967.52 1084.35 967.52 1252.37"
                                style="fill: #e36a16; stroke-width: 0px;" />
                            <g>
                                <path
                                    d="M697.74,1121.07c12.59-1.7,25.18-3.4,37.76-5.1,1.53,4.29,3.06,8.58,4.59,12.87v10.07l-4.59,7.78,2.08,9.96-18.66,30.57-7.07,1.8-14.11-6.26"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="748.64 1089 731.77 1101.86 731.77 1115.14 744.22 1116.8 756.25 1123.86 765.16 1115.14 778.2 1110.29 798.33 1112.52 798.94 1096.92 803.42 1089"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <polyline
                                    points="798.33 1112.52 810.62 1117.86 824.31 1122.61 835.1 1131.33 841.05 1128.84 844.65 1118.88 837.59 1104.35 840.68 1091.7 835.25 1089"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="851.48 1089 857.93 1102.69 859.59 1112.24 844.65 1118.88"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="740.09 1138.91 749.78 1135.93 752.46 1135.11 760.07 1137.01 766.53 1131.33 769.98 1126.3 762.6 1126.3 756.25 1123.86"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M749.78,1135.93l5.25,10.15,11.69,12.01-6.63,3.91-7.63,10.61,1.63,16.39c1.37,4.73,3.52,10.47,7,16.57,5.93,10.4,13.18,17.38,18.4,21.61l10.79-2.91,3.74-3.73"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="809.05 1253.75 806.93 1239.1 809.05 1222.62 804.93 1214.52 798.33 1199.44 786.57 1183.8 779.51 1171.38 766.72 1158.1"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="718.91 1187.21 720.56 1191.5 717.66 1198.14 717.66 1205.93 722.64 1214.33 714.75 1220.14 714.75 1233.17 711.43 1237.98 705.21 1240.89 697.74 1240.89"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="747.13 1253.75 740.09 1244 731.77 1237.15 720.98 1234.66 714.75 1233.17"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M722.64,1214.33c3.04.9,6.09,1.79,9.13,2.69,1.47-.97,4.36-2.58,8.32-2.97,6.01-.58,10.48,2.05,11.9,2.97l5.53-2.97"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="773" y1="1253.75" x2="779.49" y2="1227.19"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="779.51 1171.38 802.32 1164.11 823.07 1159.55 823.07 1150 825.56 1143.78 818.09 1137.14 806.18 1131.33 802.53 1128.84 802.53 1122.57 796.01 1118.88 786.72 1126.3 775.88 1128.84 769.98 1126.3"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="784.89 1220.55 789.15 1217.02 804.93 1214.52 818.92 1209.35 818.92 1199.99 826.8 1192.75 833.03 1183.2 840.08 1174.49 831.4 1171.38 825.56 1166.37 823.07 1159.55"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="821.49 1140.16 826.53 1135.93 835.1 1131.33"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M946.74,1181.56l-13.28-17.87h-4.41l-3.48,2.08-5.81-9.96-15.77-7.47c-5.3-1.39-11.75-2.65-19.13-3.22-6.14-.47-11.69-.36-16.45,0-4.48.24-10.11,1.04-16.29,3.16-13.63,4.68-22.3,13.19-26.56,18.08"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="859.59" y1="1112.24" x2="881.82" y2="1145.13"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="864.08 1118.88 884.49 1103.94 884.49 1097.71 887.61 1089"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="938.8 1089 933.04 1098.13 935.92 1110.16 927.22 1118.88 903.99 1148.34"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="840.08 1174.49 862.08 1192.33 873.29 1189.01 884.07 1196.9 893.09 1196.9 901.5 1199.39 903.99 1177.84 923.29 1161.86"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="806.93 1239.1 833.68 1240.47 840.08 1243.46 854.7 1240.89 859.59 1244.57 865.97 1253.75"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="848.3 1181.56 848.3 1204.66 856.68 1211.84 868.41 1220.55 879.99 1227.19 889.47 1224.29 886.15 1209.23 881.69 1200.39 884.07 1196.9"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="897.05 1253.75 908.63 1246.43 897.05 1239.1 889.47 1231.78 889.47 1224.29 895.23 1224.29 899.05 1210.45 901.5 1199.39 902.33 1208.52 906.9 1212.67 910.16 1220.55 908.33 1233.17 907.41 1240.47 910.16 1249.45 913.51 1253.75"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="926.92 1253.75 930.14 1237.15 938.85 1224.7 946.74 1215.54"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="946.74 1234.64 938.85 1224.7 936.83 1220.55 929.35 1215.54 916.03 1211.84 902.33 1208.52"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="732.71 1164.61 737.58 1166.6 742.26 1164.61 747.13 1161.86 747.13 1156.51"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="796.13 1166.09 790.71 1156.51 792.24 1148.34 797.77 1145.13 801.9 1142.53 805.03 1138.91"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="791.32 1153.24 787.89 1151.7 786.14 1148.34 784.89 1144.2 785.52 1138.91 784.89 1134.35"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="797.77 1197.66 805.03 1191.57 809.05 1184.06 813.94 1172.83 817.1 1166.6"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="818.92 1199.99 817.1 1194.54 814.91 1190.05 811.47 1187.21 809.05 1185.47"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="903.99 1177.84 896.11 1174.49 889.47 1170.73 886.15 1168.16 887.61 1164.73 889.47 1159.55 892.37 1155.4 894.24 1152.49"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="859.59 1151.46 864.08 1158.1 871.64 1163.35 879.92 1169.09 886.15 1168.16"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="870.7 1168.37 871.64 1163.35 869.96 1172.41 869.96 1176.3 872.87 1181.56"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="852.12" y1="1148.29" x2="841.05" y2="1128.84"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="856.68 1211.84 852.12 1217.02 845.48 1219.31 841.05 1219.31 837.47 1226.57 830.12 1229.27 814.9 1229.27"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="854.7" y1="1240.89" x2="856.68" y2="1222.71"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="854.7 1095.84 864.08 1093.27 872.87 1093.27 877.47 1093.27"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="769.98 1089 766.72 1098 757.52 1106.43"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="716.55" y1="1089" x2="710.19" y2="1100.7"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="925.57 1165.77 924.54 1172.45 918.1 1176.15 913.51 1185.47 909.39 1195.65"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="936.83" y1="1160.28" x2="946.74" y2="1148.34"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="930.12" y1="1115.97" x2="943.42" y2="1125.52"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="697.74 1169.09 706.07 1156.51 703.37 1148.34 707.76 1140.16"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="697.74" y1="1210.24" x2="710.19" y2="1201.45"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M753.76,1186.52c.94-1.07,3.15-3.27,6.74-4.39,2.62-.82,4.89-.73,6.22-.57,2.55-.28,5.09-.57,7.64-.85.63-.96,1.26-1.91,1.89-2.87"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="837.59 1104.35 825.56 1103.94 820.69 1102.06 812.49 1110.16"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="884.49 1103.94 893.7 1102.06 903.99 1099.01 913.51 1097.71 915.68 1093.27"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                        </g>
                        <g id="hills_field2">
                            <polygon
                                points="1318.07 639.62 1172.56 723.63 1027.05 639.62 1027.05 471.59 1172.56 387.58 1318.07 471.59 1318.07 639.62"
                                style="fill: #e36a16; stroke-width: 0px;" />
                            <g>
                                <path
                                    d="M1048.29,508.31c12.59-1.7,25.18-3.4,37.77-5.1,1.53,4.29,3.06,8.58,4.59,12.87v10.07l-4.59,7.78,2.07,9.96-18.66,30.57-7.07,1.8-14.11-6.26"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1099.19 476.24 1082.32 489.1 1082.32 502.38 1094.77 504.04 1106.81 511.1 1115.71 502.38 1128.75 497.53 1148.88 499.76 1149.49 484.16 1153.97 476.24"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <polyline
                                    points="1148.88 499.76 1161.17 505.11 1174.87 509.85 1185.66 518.57 1191.6 516.08 1195.2 506.12 1188.15 491.59 1191.23 478.94 1185.8 476.24"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1202.03 476.24 1208.48 489.93 1210.14 499.48 1195.2 506.12"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1090.64 526.15 1100.34 523.18 1103.01 522.36 1110.62 524.25 1117.08 518.57 1120.53 513.54 1113.15 513.54 1106.81 511.1"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1100.34,523.18l5.25,10.15,11.69,12.01-6.63,3.91-7.63,10.61,1.63,16.39c1.37,4.73,3.52,10.47,7,16.57,5.93,10.4,13.18,17.38,18.4,21.61l10.79-2.91,3.74-3.73"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1159.61 640.99 1157.49 626.34 1159.61 609.86 1155.48 601.76 1148.88 586.68 1137.13 571.04 1130.06 558.62 1117.28 545.34"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1069.47 574.46 1071.12 578.74 1068.21 585.38 1068.21 593.17 1073.19 601.57 1065.31 607.38 1065.31 620.41 1061.99 625.22 1055.76 628.13 1048.29 628.13"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1097.68 640.99 1090.64 631.24 1082.32 624.39 1071.53 621.9 1065.31 620.41"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1073.19,601.57c3.04.9,6.09,1.79,9.13,2.69,1.47-.97,4.36-2.58,8.32-2.97,6.01-.58,10.48,2.05,11.9,2.97l5.53-2.97"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="1123.55" y1="640.99" x2="1130.05" y2="614.43"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1130.06 558.62 1152.87 551.35 1173.62 546.79 1173.62 537.24 1176.11 531.02 1168.64 524.38 1156.73 518.57 1153.08 516.08 1153.08 509.82 1146.56 506.12 1137.27 513.54 1126.43 516.08 1120.53 513.54"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1135.44 607.79 1139.7 604.26 1155.48 601.76 1169.47 596.59 1169.47 587.23 1177.36 579.99 1183.58 570.44 1190.64 561.73 1181.95 558.62 1176.11 553.61 1173.62 546.79"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1172.04 527.4 1177.08 523.18 1185.66 518.57"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1297.29,568.8l-13.28-17.87h-4.41l-3.48,2.07-5.81-9.96-15.77-7.47c-5.3-1.39-11.75-2.65-19.13-3.22-6.14-.47-11.69-.36-16.45,0-4.48.24-10.11,1.04-16.29,3.16-13.63,4.68-22.3,13.19-26.56,18.08"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="1210.14" y1="499.48" x2="1232.37" y2="532.37"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1214.63 506.12 1235.04 491.18 1235.04 484.95 1238.16 476.24"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1289.35 476.24 1283.6 485.37 1286.47 497.4 1277.77 506.12 1254.55 535.58"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1190.64 561.73 1212.63 579.57 1223.84 576.25 1234.63 584.14 1243.64 584.14 1252.06 586.63 1254.55 565.08 1273.84 549.1"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1157.49 626.34 1184.23 627.71 1190.64 630.7 1205.25 628.13 1210.14 631.82 1216.53 640.99"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1198.85 568.8 1198.85 591.9 1207.24 599.08 1218.96 607.79 1230.54 614.43 1240.02 611.53 1236.7 596.47 1232.24 587.63 1234.63 584.14"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1247.61 640.99 1259.18 633.67 1247.61 626.34 1240.02 619.02 1240.02 611.53 1245.78 611.53 1249.6 597.69 1252.06 586.63 1252.89 595.76 1257.45 599.91 1260.71 607.79 1258.88 620.41 1257.97 627.71 1260.71 636.69 1264.06 640.99"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1277.47 640.99 1280.69 624.39 1289.41 611.94 1297.29 602.78"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1297.29 621.89 1289.41 611.94 1287.38 607.79 1279.9 602.78 1266.58 599.08 1252.89 595.76"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1083.27 551.85 1088.13 553.84 1092.81 551.85 1097.68 549.1 1097.68 543.76"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1146.68 553.33 1141.26 543.76 1142.79 535.58 1148.32 532.37 1152.46 529.77 1155.58 526.15"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1141.87 540.48 1138.44 538.94 1136.69 535.58 1135.44 531.44 1136.07 526.15 1135.44 521.59"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1148.32 584.9 1155.58 578.81 1159.61 571.3 1164.49 560.07 1167.65 553.84"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1169.47 587.23 1167.65 581.78 1165.46 577.29 1162.02 574.46 1159.61 572.71"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1254.55 565.08 1246.66 561.73 1240.02 557.97 1236.7 555.4 1238.16 551.98 1240.02 546.79 1242.93 542.64 1244.79 539.73"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1210.14 538.7 1214.63 545.34 1222.19 550.59 1230.48 556.33 1236.7 555.4"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1221.26 555.62 1222.19 550.59 1220.52 559.65 1220.52 563.54 1223.42 568.8"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="1202.67" y1="535.53" x2="1191.6" y2="516.08"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="1207.24 599.08 1202.67 604.26 1196.03 606.55 1191.6 606.55 1188.02 613.81 1180.68 616.51 1165.45 616.51"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="1205.25" y1="628.13" x2="1207.24" y2="609.95"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1205.25 483.08 1214.63 480.51 1223.42 480.51 1228.03 480.51"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1120.53 476.24 1117.28 485.24 1108.07 493.67"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="1067.1" y1="476.24" x2="1060.74" y2="487.95"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1276.13 553.01 1275.09 559.7 1268.66 563.39 1264.06 572.71 1259.94 582.89"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="1287.38" y1="547.52" x2="1297.29" y2="535.58"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="1280.67" y1="503.21" x2="1293.97" y2="512.76"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1048.29 556.33 1056.62 543.76 1053.92 535.58 1058.31 527.4"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="1048.29" y1="597.48" x2="1060.74" y2="588.69"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M1104.32,573.76c.94-1.07,3.15-3.27,6.74-4.39,2.62-.82,4.89-.73,6.22-.57,2.55-.28,5.09-.57,7.64-.85.63-.96,1.26-1.91,1.89-2.87"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1188.15 491.59 1176.11 491.18 1171.24 489.3 1163.04 497.4"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="1235.04 491.18 1244.25 489.3 1254.55 486.26 1264.06 484.95 1266.23 480.51"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                        </g>
                        <g id="hills_field1">
                            <polygon
                                points="616.52 640.37 471.01 724.39 325.5 640.37 325.5 472.35 471.01 388.34 616.52 472.35 616.52 640.37"
                                style="fill: #e36a16; stroke-width: 0px;" />
                            <g>
                                <path
                                    d="M346.74,509.07c12.59-1.7,25.18-3.4,37.76-5.1,1.53,4.29,3.06,8.58,4.59,12.87v10.07l-4.59,7.78,2.08,9.96-18.66,30.57-7.07,1.8-14.11-6.26"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="397.64 477 380.77 489.86 380.77 503.14 393.22 504.8 405.25 511.86 414.16 503.14 427.2 498.29 447.33 500.52 447.94 484.92 452.42 477"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 10; stroke-width: 1.5px;" />
                                <polyline
                                    points="447.33 500.52 459.62 505.86 473.31 510.61 484.1 519.33 490.05 516.84 493.65 506.88 486.59 492.35 489.68 479.7 484.25 477"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="500.48 477 506.93 490.69 508.59 500.24 493.65 506.88"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="389.09 526.91 398.78 523.93 401.46 523.11 409.07 525.01 415.53 519.33 418.98 514.3 411.6 514.3 405.25 511.86"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M398.78,523.93l5.25,10.15,11.69,12.01-6.63,3.91-7.63,10.61,1.63,16.39c1.37,4.73,3.52,10.47,7,16.57,5.93,10.4,13.18,17.38,18.4,21.61l10.79-2.9,3.74-3.73"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="458.05 641.75 455.93 627.1 458.05 610.62 453.93 602.52 447.33 587.44 435.57 571.8 428.51 559.38 415.72 546.1"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="367.91 575.21 369.56 579.5 366.66 586.14 366.66 593.93 371.64 602.33 363.75 608.14 363.75 621.17 360.43 625.98 354.21 628.89 346.74 628.89"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="396.13 641.75 389.09 632 380.77 625.15 369.98 622.66 363.75 621.17"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M371.64,602.33c3.04.9,6.09,1.79,9.13,2.69,1.47-.97,4.36-2.58,8.32-2.97,6.01-.58,10.48,2.05,11.9,2.97l5.53-2.97"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="422" y1="641.75" x2="428.49" y2="615.19"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="428.51 559.38 451.32 552.11 472.07 547.55 472.07 538 474.56 531.78 467.09 525.14 455.18 519.33 451.53 516.84 451.53 510.57 445.01 506.88 435.72 514.3 424.88 516.84 418.98 514.3"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="433.89 608.55 438.15 605.02 453.93 602.52 467.92 597.35 467.92 587.99 475.8 580.75 482.03 571.2 489.08 562.49 480.4 559.38 474.56 554.37 472.07 547.55"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="470.49 528.16 475.53 523.93 484.1 519.33"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M595.74,569.56l-13.28-17.87h-4.41l-3.48,2.07-5.81-9.96-15.77-7.47c-5.3-1.39-11.75-2.65-19.13-3.22-6.14-.47-11.69-.36-16.45,0-4.48.24-10.11,1.04-16.29,3.16-13.63,4.68-22.3,13.19-26.56,18.08"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="508.59" y1="500.24" x2="530.82" y2="533.13"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="513.08 506.88 533.49 491.94 533.49 485.71 536.61 477"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="587.8 477 582.04 486.13 584.92 498.16 576.22 506.88 552.99 536.34"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="489.08 562.49 511.08 580.33 522.29 577.01 533.07 584.9 542.09 584.9 550.5 587.39 552.99 565.84 572.29 549.86"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="455.93 627.1 482.68 628.47 489.08 631.46 503.7 628.89 508.59 632.57 514.97 641.75"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="497.3 569.56 497.3 592.66 505.68 599.84 517.41 608.55 528.99 615.19 538.47 612.29 535.15 597.23 530.69 588.39 533.07 584.9"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="546.05 641.75 557.63 634.43 546.05 627.1 538.47 619.78 538.47 612.29 544.23 612.29 548.05 598.45 550.5 587.39 551.33 596.52 555.9 600.67 559.16 608.55 557.33 621.17 556.41 628.47 559.16 637.45 562.51 641.75"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="575.92 641.75 579.14 625.15 587.85 612.7 595.74 603.54"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="595.74 622.64 587.85 612.7 585.83 608.55 578.35 603.54 565.03 599.84 551.33 596.52"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="381.71 552.61 386.58 554.6 391.26 552.61 396.13 549.86 396.13 544.51"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="445.13 554.09 439.71 544.51 441.24 536.34 446.77 533.13 450.9 530.53 454.03 526.91"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="440.32 541.24 436.89 539.7 435.14 536.34 433.89 532.2 434.52 526.91 433.89 522.35"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="446.77 585.66 454.03 579.57 458.05 572.06 462.94 560.83 466.1 554.6"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="467.92 587.99 466.1 582.54 463.91 578.05 460.47 575.21 458.05 573.47"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="552.99 565.84 545.11 562.49 538.47 558.73 535.15 556.16 536.61 552.73 538.47 547.55 541.37 543.4 543.24 540.49"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="508.59 539.46 513.08 546.1 520.64 551.35 528.92 557.09 535.15 556.16"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="519.7 556.37 520.64 551.35 518.96 560.41 518.96 564.3 521.87 569.56"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="501.12" y1="536.29" x2="490.05" y2="516.84"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline
                                    points="505.68 599.84 501.12 605.02 494.48 607.31 490.05 607.31 486.47 614.57 479.12 617.27 463.9 617.27"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="503.7" y1="628.89" x2="505.68" y2="610.71"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="503.7 483.84 513.08 481.27 521.87 481.27 526.47 481.27"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="418.98 477 415.72 486 406.52 494.43"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="365.55" y1="477" x2="359.19" y2="488.7"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="574.57 553.77 573.54 560.45 567.1 564.15 562.51 573.47 558.39 583.65"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="585.83" y1="548.28" x2="595.74" y2="536.34"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="579.12" y1="503.97" x2="592.42" y2="513.52"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="346.74 557.09 355.07 544.51 352.37 536.34 356.76 528.16"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <line x1="346.74" y1="598.24" x2="359.19" y2="589.45"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <path
                                    d="M402.76,574.52c.94-1.07,3.15-3.27,6.74-4.39,2.62-.82,4.89-.73,6.22-.57,2.55-.28,5.09-.57,7.64-.85.63-.96,1.26-1.91,1.89-2.87"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="486.59 492.35 474.56 491.94 469.69 490.06 461.49 498.16"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                                <polyline points="533.49 491.94 542.7 490.06 552.99 487.01 562.51 485.71 564.68 481.27"
                                    style="fill: none; stroke: #004d3b; stroke-miterlimit: 20; stroke-width: 1.5px;" />
                            </g>
                        </g>
                        <g id="Numbers">
                            <g id="number8">
                                <circle cx="474.39" cy="1171.46" r="32.6"
                                    style="fill: #fff; stroke: #e42320; stroke-miterlimit: 10; stroke-width: 6px;" />
                                <text transform="translate(462.82 1184.34)"
                                    style="fill: #e42320; font-family: Garet-Book, Garet; font-size: 37.14px;">
                                    <tspan x="0" y="0">8</tspan>
                                </text>
                            </g>
                            <g id="number10">
                                <circle cx="1527.39" cy="556.1" r="32.6"
                                    style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 6px;" />
                                <text transform="translate(1509.12 569.45)"
                                    style="font-family: Garet-Book, Garet; font-size: 37.14px;">
                                    <tspan x="0" y="0">10</tspan>
                                </text>
                            </g>
                            <g id="number6">
                                <circle cx="1000.66" cy="1478.32" r="32.6"
                                    style="fill: #fff; stroke: #e42320; stroke-miterlimit: 10; stroke-width: 6px;" />
                                <text transform="translate(988.92 1490.16)"
                                    style="fill: #e42320; font-family: Garet-Book, Garet; font-size: 37.14px;">
                                    <tspan x="0" y="0">6</tspan>
                                </text>
                            </g>
                            <g id="number9">
                                <circle cx="294.67" cy="863.91" r="32.6"
                                    style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 6px;" />
                                <text transform="translate(283.83 877.26)"
                                    style="font-family: Garet-Book, Garet; font-size: 37.14px;">
                                    <tspan x="0" y="0">9</tspan>
                                </text>
                            </g>
                            <g id="number5">
                                <circle cx="647.93" cy="1478.32" r="32.6"
                                    style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 6px;" />
                                <text transform="translate(637.36 1493.02)"
                                    style="font-family: Garet-Book, Garet; font-size: 37.14px;">
                                    <tspan x="0" y="0">5</tspan>
                                </text>
                            </g>
                            <g id="number4">
                                <circle cx="1173.02" cy="1171.46" r="32.6"
                                    style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 6px;" />
                                <text transform="translate(1162.2 1185.22)"
                                    style="font-family: Garet-Book, Garet; font-size: 37.14px;">
                                    <tspan x="0" y="0">4</tspan>
                                </text>
                            </g>
                            <g id="number3">
                                <circle cx="1349.41" cy="863.91" r="32.6"
                                    style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 6px;" />
                                <text transform="translate(1338.99 878.09)"
                                    style="font-family: Garet-Book, Garet; font-size: 37.14px;">
                                    <tspan x="0" y="0">3</tspan>
                                </text>
                            </g>
                            <g id="number11">
                                <circle cx="1349.41" cy="1478.32" r="32.6"
                                    style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 6px;" />
                                <text transform="translate(1335.59 1492.08)"
                                    style="font-family: Garet-Book, Garet; font-size: 37.14px;">
                                    <tspan x="0" y="0">11</tspan>
                                </text>
                            </g>
                            <g id="number12">
                                <circle cx="474.39" cy="556.1" r="32.6"
                                    style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 6px;" />
                                <text transform="translate(456.36 569.9)"
                                    style="font-family: Garet-Book, Garet; font-size: 37.14px;">
                                    <tspan x="0" y="0">12</tspan>
                                </text>
                            </g>
                            <g id="number11-2" data-name="number11">
                                <g id="number11-3" data-name="number11">
                                    <circle cx="647.93" cy="863.91" r="32.6"
                                        style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 6px;" />
                                    <text transform="translate(634.11 877.67)"
                                        style="font-family: Garet-Book, Garet; font-size: 37.14px;">
                                        <tspan x="0" y="0">11</tspan>
                                    </text>
                                </g>
                            </g>
                            <g id="number10-2" data-name="number10">
                                <g id="number10-3" data-name="number10">
                                    <circle cx="647.93" cy="249.11" r="32.6"
                                        style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 6px;" />
                                    <text transform="translate(629.66 262.45)"
                                        style="font-family: Garet-Book, Garet; font-size: 37.14px;">
                                        <tspan x="0" y="0">10</tspan>
                                    </text>
                                </g>
                            </g>
                            <g id="number9-2" data-name="number9">
                                <g id="number9-3" data-name="number9">
                                    <circle cx="1349.41" cy="249.11" r="32.6"
                                        style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 6px;" />
                                    <text transform="translate(1338.57 262.45)"
                                        style="font-family: Garet-Book, Garet; font-size: 37.14px;">
                                        <tspan x="0" y="0">9</tspan>
                                    </text>
                                </g>
                            </g>
                            <g id="number8-2" data-name="number8">
                                <g id="number8-3" data-name="number8">
                                    <circle cx="1704.44" cy="863.91" r="32.6"
                                        style="fill: #fff; stroke: #e42320; stroke-miterlimit: 10; stroke-width: 6px;" />
                                    <text transform="translate(1692.87 876.8)"
                                        style="fill: #e42320; font-family: Garet-Book, Garet; font-size: 37.14px;">
                                        <tspan x="0" y="0">8</tspan>
                                    </text>
                                </g>
                            </g>
                            <g id="number6-2" data-name="number6">
                                <circle cx="825.6" cy="556.1" r="32.6"
                                    style="fill: #fff; stroke: #e42320; stroke-miterlimit: 10; stroke-width: 6px;" />
                                <text transform="translate(813.87 567.95)"
                                    style="fill: #e42320; font-family: Garet-Book, Garet; font-size: 37.14px;">
                                    <tspan x="0" y="0">6</tspan>
                                </text>
                            </g>
                            <g id="number5-2" data-name="number5">
                                <g id="number5-3" data-name="number5">
                                    <circle cx="1524.66" cy="1171.46" r="32.6"
                                        style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 6px;" />
                                    <text transform="translate(1514.09 1186.16)"
                                        style="font-family: Garet-Book, Garet; font-size: 37.14px;">
                                        <tspan x="0" y="0">5</tspan>
                                    </text>
                                </g>
                            </g>
                            <g id="number4-2" data-name="number4">
                                <g id="number4-3" data-name="number4">
                                    <circle cx="1173.02" cy="556.1" r="32.6"
                                        style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 6px;" />
                                    <text transform="translate(1162.2 569.86)"
                                        style="font-family: Garet-Book, Garet; font-size: 37.14px;">
                                        <tspan x="0" y="0">4</tspan>
                                    </text>
                                </g>
                            </g>
                            <g id="number3-2" data-name="number3">
                                <g id="number3-3" data-name="number3">
                                    <circle cx="825.6" cy="1171.46" r="32.6"
                                        style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 6px;" />
                                    <text transform="translate(815.18 1185.64)"
                                        style="font-family: Garet-Book, Garet; font-size: 37.14px;">
                                        <tspan x="0" y="0">3</tspan>
                                    </text>
                                </g>
                            </g>
                            <g id="number2">
                                <circle cx="1000.66" cy="249.1" r="32.6"
                                    style="fill: #fff; stroke: #000; stroke-miterlimit: 10; stroke-width: 6px;" />
                                <text transform="translate(989.64 262.45)"
                                    style="font-family: Garet-Book, Garet; font-size: 37.14px;">
                                    <tspan x="0" y="0">2</tspan>
                                </text>
                            </g>
                        </g>
                    </g> -->
                    <g id="Positions_Background">
                        <g>
                            <ellipse id="_145" data-name="145" cx="1702.24" cy="863.18" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_144" data-name="144" cx="1349.11" cy="863.18" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_143" data-name="143" cx="996.58" cy="863.18" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_142" data-name="142" cx="643.97" cy="863.18" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_141" data-name="141" cx="291.71" cy="863.18" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_140" data-name="140" cx="1525.69" cy="1170.07" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_139" data-name="139" cx="1173.35" cy="1170.07" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_138" data-name="138" cx="820.58" cy="1170.07" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_137" data-name="137" cx="468.11" cy="1170.07" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_136" data-name="136" cx="1349.11" cy="1479.06" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_135" data-name="135" cx="996.58" cy="1479.06" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_134" data-name="134" cx="643.97" cy="1479.06" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_133" data-name="133" cx="1525.69" cy="553.94" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_132" data-name="132" cx="1173.35" cy="553.94" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_131" data-name="131" cx="820.58" cy="553.94" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_130" data-name="130" cx="468.11" cy="557.94" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_129" data-name="129" cx="1349.11" cy="247.21" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_128" data-name="128" cx="996.58" cy="252.29" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_127" data-name="127" cx="643.97" cy="247.21" rx="133.31" ry="130.14"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_126" data-name="126" cx="996.58" cy="1273.47" rx="29.02" ry="28.33"
                                transform="translate(-506.2 676.35) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_125" data-name="125" cx="908.36" cy="1325.8" rx="29.02" ry="28.33"
                                transform="translate(-544.63 639.01) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_124" data-name="124" cx="820.58" cy="1378.02" rx="29.02" ry="28.33"
                                transform="translate(-582.94 601.87) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_123" data-name="123" cx="732.25" cy="399.2" rx="29.02" ry="28.33"
                                transform="translate(-101.38 423.74) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_122" data-name="122" cx="820.58" cy="347.52" rx="29.02" ry="28.33"
                                transform="translate(-63.27 461.24) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_121" data-name="121" cx="996.58" cy="553.94" rx="29.02" ry="28.33"
                                transform="translate(-143.35 578.16) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_120" data-name="120" cx="996.58" cy="450.97" rx="29.02" ry="28.33"
                                transform="translate(-91.42 564.11) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_119" data-name="119" cx="908.36" cy="399.2" rx="29.02" ry="28.33"
                                transform="translate(-77.35 512.56) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_118" data-name="118" cx="1084.79" cy="399.2" rx="29.02" ry="28.33"
                                transform="translate(-53.27 601.53) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_117" data-name="117" cx="1173.35" cy="347.52" rx="29.02" ry="28.33"
                                transform="translate(-15.13 639.14) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_116" data-name="116" cx="1702.24" cy="553.94" rx="29.02" ry="28.33"
                                transform="translate(-47.05 934.02) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_115" data-name="115" cx="1702.24" cy="450.97" rx="29.02" ry="28.33"
                                transform="translate(4.88 919.97) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_114" data-name="114" cx="1349.11" cy="553.94" rx="29.02" ry="28.33"
                                transform="translate(-95.24 755.94) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_113" data-name="113" cx="1349.11" cy="450.97" rx="29.02" ry="28.33"
                                transform="translate(-43.31 741.89) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_112" data-name="112" cx="1437.99" cy="399.2" rx="29.02" ry="28.33"
                                transform="translate(-5.07 779.65) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_111" data-name="111" cx="1525.69" cy="347.52" rx="29.02" ry="28.33"
                                transform="translate(32.95 816.82) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_110" data-name="110" cx="1614.88" cy="399.2" rx="29.02" ry="28.33"
                                transform="translate(19.07 868.85) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_109" data-name="109" cx="1261.4" cy="399.2" rx="29.02" ry="28.33"
                                transform="translate(-29.17 690.59) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_108" data-name="108" cx="1173.35" cy="247.21" rx="29.02" ry="28.33"
                                transform="translate(35.46 625.45) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_107" data-name="107" cx="1173.35" cy="141.17" rx="29.02" ry="28.33"
                                transform="translate(88.93 610.98) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_106" data-name="106" cx="1084.79" cy="89.67" rx="29.02" ry="28.33"
                                transform="translate(102.82 559.29) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_105" data-name="105" cx="996.58" cy="39.17" rx="29.02" ry="28.33"
                                transform="translate(116.25 507.91) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_104" data-name="104" cx="820.58" cy="141.17" rx="29.02" ry="28.33"
                                transform="translate(40.79 433.08) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_103" data-name="103" cx="820.58" cy="247.21" rx="29.02" ry="28.33"
                                transform="translate(-12.68 447.55) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_102" data-name="102" cx="732.25" cy="89.67" rx="29.02" ry="28.33"
                                transform="translate(54.71 381.5) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_101" data-name="101" cx="643.97" cy="39.17" rx="29.02" ry="28.33"
                                transform="translate(68.13 330.1) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_100" data-name="100" cx="555.82" cy="89.67" rx="29.02" ry="28.33"
                                transform="translate(30.63 292.53) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_99" data-name="99" cx="468.11" cy="141.17" rx="29.02" ry="28.33"
                                transform="translate(-7.31 255.33) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_98" data-name="98" cx="468.11" cy="247.21" rx="29.02" ry="28.33"
                                transform="translate(-60.78 269.8) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_97" data-name="97" cx="908.36" cy="89.67" rx="29.02" ry="28.33"
                                transform="translate(78.74 470.32) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_96" data-name="96" cx="1261.4" cy="89.67" rx="29.02" ry="28.33"
                                transform="translate(126.92 648.35) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_95" data-name="95" cx="1349.11" cy="39.17" rx="29.02" ry="28.33"
                                transform="translate(164.36 685.69) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_94" data-name="94" cx="1437.99" cy="89.67" rx="29.02" ry="28.33"
                                transform="translate(151.02 737.41) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_93" data-name="93" cx="1525.69" cy="141.17" rx="29.02" ry="28.33"
                                transform="translate(137.02 788.66) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_92" data-name="92" cx="1525.69" cy="247.21" rx="29.02" ry="28.33"
                                transform="translate(83.54 803.13) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_91" data-name="91" cx="820.58" cy="1479.06" rx="29.02" ry="28.33"
                                transform="translate(-633.9 615.66) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_90" data-name="90" cx="820.58" cy="1582.94" rx="29.02" ry="28.33"
                                transform="translate(-686.28 629.83) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_89" data-name="89" cx="732.25" cy="1634.71" rx="29.02" ry="28.33"
                                transform="translate(-724.44 592.35) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_88" data-name="88" cx="908.36" cy="1634.71" rx="29.02" ry="28.33"
                                transform="translate(-700.41 681.16) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_87" data-name="87" cx="996.58" cy="1685.52" rx="29.02" ry="28.33"
                                transform="translate(-714 732.58) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_86" data-name="86" cx="1084.79" cy="1634.71" rx="29.02" ry="28.33"
                                transform="translate(-676.33 770.14) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_85" data-name="85" cx="1173.35" cy="1582.94" rx="29.02" ry="28.33"
                                transform="translate(-638.14 807.73) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_84" data-name="84" cx="1261.4" cy="1634.71" rx="29.02" ry="28.33"
                                transform="translate(-652.23 859.2) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_83" data-name="83" cx="1349.11" cy="1685.52" rx="29.02" ry="28.33"
                                transform="translate(-665.89 910.37) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_82" data-name="82" cx="1437.99" cy="1634.71" rx="29.02" ry="28.33"
                                transform="translate(-628.13 948.25) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_81" data-name="81" cx="1525.69" cy="1582.94" rx="29.02" ry="28.33"
                                transform="translate(-590.06 985.41) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_80" data-name="80" cx="1525.69" cy="1479.06" rx="29.02" ry="28.33"
                                transform="translate(-537.67 971.24) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_79" data-name="79" cx="1525.69" cy="1378.02" rx="29.02" ry="28.33"
                                transform="translate(-486.72 957.45) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_78" data-name="78" cx="1614.88" cy="1325.8" rx="29.02" ry="28.33"
                                transform="translate(-448.21 995.3) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_77" data-name="77" cx="1437.99" cy="1325.8" rx="29.02" ry="28.33"
                                transform="translate(-472.35 906.1) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_76" data-name="76" cx="1349.11" cy="1273.47" rx="29.02" ry="28.33"
                                transform="translate(-458.09 854.13) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_75" data-name="75" cx="1261.4" cy="1325.8" rx="29.02" ry="28.33"
                                transform="translate(-496.45 817.04) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_74" data-name="74" cx="1173.35" cy="1378.02" rx="29.02" ry="28.33"
                                transform="translate(-534.8 779.77) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_73" data-name="73" cx="1084.79" cy="1325.8" rx="29.02" ry="28.33"
                                transform="translate(-520.55 727.98) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_72" data-name="72" cx="1173.35" cy="1479.06" rx="29.02" ry="28.33"
                                transform="translate(-585.75 793.56) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_71" data-name="71" cx="643.97" cy="1685.52" rx="29.02" ry="28.33"
                                transform="translate(-762.12 554.77) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_70" data-name="70" cx="555.82" cy="1634.71" rx="29.02" ry="28.33"
                                transform="translate(-748.52 503.38) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_69" data-name="69" cx="468.11" cy="1582.94" rx="29.02" ry="28.33"
                                transform="translate(-734.38 452.08) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_68" data-name="68" cx="468.11" cy="1479.06" rx="29.02" ry="28.33"
                                transform="translate(-682 437.91) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_67" data-name="67" cx="468.11" cy="1378.02" rx="29.02" ry="28.33"
                                transform="translate(-631.04 424.12) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_66" data-name="66" cx="555.82" cy="1325.8" rx="29.02" ry="28.33"
                                transform="translate(-592.74 461.22) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_65" data-name="65" cx="643.97" cy="1273.47" rx="29.02" ry="28.33"
                                transform="translate(-554.32 498.54) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_64" data-name="64" cx="732.25" cy="1325.8" rx="29.02" ry="28.33"
                                transform="translate(-568.67 550.2) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_63" data-name="63" cx="643.97" cy="1170.07" rx="29.02" ry="28.33"
                                transform="translate(-502.18 484.43) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_62" data-name="62" cx="643.97" cy="1068.76" rx="29.02" ry="28.33"
                                transform="translate(-451.08 470.6) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_61" data-name="61" cx="732.25" cy="1017.15" rx="29.02" ry="28.33"
                                transform="translate(-413.01 508.07) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_60" data-name="60" cx="820.58" cy="965.6" rx="29.02" ry="28.33"
                                transform="translate(-374.96 545.59) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_59" data-name="59" cx="555.82" cy="1017.15" rx="29.02" ry="28.33"
                                transform="translate(-437.09 419.1) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_58" data-name="58" cx="468.11" cy="965.6" rx="29.02" ry="28.33"
                                transform="translate(-423.06 367.84) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_57" data-name="57" cx="820.58" cy="863.18" rx="29.02" ry="28.33"
                                transform="translate(-323.31 531.61) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_56" data-name="56" cx="820.58" cy="759.51" rx="29.02" ry="28.33"
                                transform="translate(-271.03 517.46) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_55" data-name="55" cx="908.36" cy="707.79" rx="29.02" ry="28.33"
                                transform="translate(-232.97 554.67) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_54" data-name="54" cx="732.25" cy="707.79" rx="29.02" ry="28.33"
                                transform="translate(-257.01 465.86) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_53" data-name="53" cx="996.58" cy="656.79" rx="29.02" ry="28.33"
                                transform="translate(-195.22 592.2) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_52" data-name="52" cx="1084.79" cy="707.79" rx="29.02" ry="28.33"
                                transform="translate(-208.9 643.64) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_51" data-name="51" cx="1173.35" cy="759.51" rx="29.02" ry="28.33"
                                transform="translate(-222.89 695.36) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_50" data-name="50" cx="1173.35" cy="863.18" rx="29.02" ry="28.33"
                                transform="translate(-275.17 709.51) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_49" data-name="49" cx="1261.4" cy="707.79" rx="29.02" ry="28.33"
                                transform="translate(-184.8 732.71) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_48" data-name="48" cx="1349.11" cy="656.79" rx="29.02" ry="28.33"
                                transform="translate(-147.11 769.98) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_47" data-name="47" cx="1437.99" cy="707.79" rx="29.02" ry="28.33"
                                transform="translate(-160.7 821.76) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_46" data-name="46" cx="1525.69" cy="759.51" rx="29.02" ry="28.33"
                                transform="translate(-174.81 873.04) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_45" data-name="45" cx="1525.69" cy="863.18" rx="29.02" ry="28.33"
                                transform="translate(-227.09 887.19) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_44" data-name="44" cx="1525.69" cy="965.6" rx="29.02" ry="28.33"
                                transform="translate(-278.74 901.17) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_43" data-name="43" cx="1437.99" cy="1017.15" rx="29.02" ry="28.33"
                                transform="translate(-316.7 863.98) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_42" data-name="42" cx="1614.88" cy="1017.15" rx="29.02" ry="28.33"
                                transform="translate(-292.56 953.18) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_41" data-name="41" cx="1349.11" cy="1068.76" rx="29.02" ry="28.33"
                                transform="translate(-354.86 826.2) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_40" data-name="40" cx="1349.11" cy="1170.07" rx="29.02" ry="28.33"
                                transform="translate(-405.95 840.02) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_39" data-name="39" cx="1261.4" cy="1017.15" rx="29.02" ry="28.33"
                                transform="translate(-340.8 774.92) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_38" data-name="38" cx="1173.35" cy="965.6" rx="29.02" ry="28.33"
                                transform="translate(-326.82 723.49) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_37" data-name="37" cx="1084.79" cy="1017.15" rx="29.02" ry="28.33"
                                transform="translate(-364.9 685.86) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_36" data-name="36" cx="996.58" cy="1068.76" rx="29.02" ry="28.33"
                                transform="translate(-402.97 648.42) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_35" data-name="35" cx="996.58" cy="1170.07" rx="29.02" ry="28.33"
                                transform="translate(-454.06 662.24) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_34" data-name="34" cx="908.36" cy="1017.15" rx="29.02" ry="28.33"
                                transform="translate(-388.98 596.89) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_33" data-name="33" cx="643.97" cy="656.79" rx="29.02" ry="28.33"
                                transform="translate(-243.33 414.38) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_32" data-name="32" cx="555.82" cy="707.79" rx="29.02" ry="28.33"
                                transform="translate(-281.08 376.88) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_31" data-name="31" cx="468.11" cy="759.51" rx="29.02" ry="28.33"
                                transform="translate(-319.14 339.71) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_30" data-name="30" cx="379.8" cy="707.79" rx="29.02" ry="28.33"
                                transform="translate(-305.11 288.12) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_29" data-name="29" cx="291.71" cy="656.79" rx="29.02" ry="28.33"
                                transform="translate(-291.41 236.74) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_28" data-name="28" cx="203.44" cy="707.79" rx="29.02" ry="28.33"
                                transform="translate(-329.17 199.18) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_27" data-name="27" cx="116.08" cy="759.51" rx="29.02" ry="28.33"
                                transform="translate(-367.18 162.19) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_26" data-name="26" cx="116.08" cy="863.18" rx="29.02" ry="28.33"
                                transform="translate(-419.46 176.33) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_25" data-name="25" cx="116.08" cy="965.6" rx="29.02" ry="28.33"
                                transform="translate(-471.1 190.31) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_24" data-name="24" cx="203.44" cy="1017.15" rx="29.02" ry="28.33"
                                transform="translate(-485.18 241.4) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_23" data-name="23" cx="291.71" cy="1068.76" rx="29.02" ry="28.33"
                                transform="translate(-499.16 292.95) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_22" data-name="22" cx="379.8" cy="1017.15" rx="29.02" ry="28.33"
                                transform="translate(-461.11 330.34) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_21" data-name="21" cx="468.11" cy="863.18" rx="29.02" ry="28.33"
                                transform="translate(-371.42 353.86) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_20" data-name="20" cx="291.71" cy="1170.07" rx="29.02" ry="28.33"
                                transform="translate(-550.25 306.78) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_19" data-name="19" cx="291.71" cy="1273.47" rx="29.02" ry="28.33"
                                transform="translate(-602.39 320.89) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_18" data-name="18" cx="379.8" cy="1325.8" rx="29.02" ry="28.33"
                                transform="translate(-616.76 372.46) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_17" data-name="17" cx="1702.24" cy="1273.47" rx="29.02" ry="28.33"
                                transform="translate(-409.9 1032.21) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_16" data-name="16" cx="1702.24" cy="1170.07" rx="29.02" ry="28.33"
                                transform="translate(-357.76 1018.1) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_15" data-name="15" cx="1702.24" cy="1068.76" rx="29.02" ry="28.33"
                                transform="translate(-306.67 1004.27) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_14" data-name="14" cx="1790.61" cy="1017.15" rx="29.02" ry="28.33"
                                transform="translate(-268.58 1041.8) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_13" data-name="13" cx="1879.59" cy="965.6" rx="29.02" ry="28.33"
                                transform="translate(-230.44 1079.64) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_12" data-name="12" cx="1879.59" cy="863.18" rx="29.02" ry="28.33"
                                transform="translate(-178.79 1065.66) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_11" data-name="11" cx="1879.59" cy="759.51" rx="29.02" ry="28.33"
                                transform="translate(-126.51 1051.51) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_10" data-name="10" cx="1790.61" cy="707.79" rx="29.02" ry="28.33"
                                transform="translate(-112.58 999.58) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_9" data-name="9" cx="1702.24" cy="656.79" rx="29.02" ry="28.33"
                                transform="translate(-98.92 948.05) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_8" data-name="8" cx="1614.88" cy="707.79" rx="29.02" ry="28.33"
                                transform="translate(-136.56 910.96) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_7" data-name="7" cx="291.71" cy="553.94" rx="29.02" ry="28.33"
                                transform="translate(-239.54 222.7) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_6" data-name="6" cx="291.71" cy="450.97" rx="29.02" ry="28.33"
                                transform="translate(-187.61 208.65) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_5" data-name="5" cx="379.8" cy="399.2" rx="29.02" ry="28.33"
                                transform="translate(-149.48 246.01) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_4" data-name="4" cx="555.82" cy="399.2" rx="29.02" ry="28.33"
                                transform="translate(-125.46 334.77) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_3" data-name="3" cx="643.97" cy="450.97" rx="29.02" ry="28.33"
                                transform="translate(-139.54 386.29) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_2" data-name="2" cx="468.11" cy="347.52" rx="29.02" ry="28.33"
                                transform="translate(-111.37 283.49) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                            <ellipse id="_1" data-name="1" cx="643.97" cy="558.94" rx="29.02" ry="28.33"
                                transform="translate(-193.99 401.03) rotate(-30.28)"
                                style="fill: #221f22; stroke-width: 0px;" />
                        </g>
                    </g>
                    <!--Place SVG before-->
                </svg>
                <!-- Ende Spielfeld -->

                <!-- Würfel -->
                <section id="diceSection">
                    <button id="diceContainer" @click="rollDice()">
                        <img class="dice" ref="die1" src="@/assets/dice/dieValue1.svg" alt="dice Number 1">
                        <img class="dice" ref="die2" src="@/assets/dice/dieValue1.svg" alt="dice Number 1">
                    </button>
                    <button @click="getStatesProcess()">
                        <h1>get States
                        </h1>
                    </button>
                </section>
                <!-- <div class="dice">
                    <button id="diceButton" @click="rollDice">Würfeln</button>
                    <div id="ImageDice">
                        <img :src="require(`@/assets/DieValue${die1}.svg`)" alt="Die1">
                        <img :src="require(`@/assets/DieValue${die2}.svg`)" alt="Die2">
                    </div>
                </div> -->
            </div>
            <!-- Splayer Banks noch mehr modularisieren-->
            <!-- <div class="gridItem" id="player2Field" v-if="item_types != null && itemArrayPlayer2 != null">
                <MainItem class="mainItem right" v-for="item in itemArrayPlayer2" v-if="playerPositions[2] != null"
                    :style="{ height: (0.8 * screenSize.windowHeight) / 9 + 'px', margin: defineMargin('player2') }"
                    :position="item.position" :item_types="item_types" :currentItem="item" @emitMainItem="emitMainItem">
                </MainItem>
                <section class="hoverBanksLeftRight" v-if="playerPositions[2] != null">
                    <div id="hoverToBankPlayer2" @click="itemToBank(2)">
                    </div>
                    <div id="hoverToSideDevicePlayer2" @mouseenter="sendCardVisualFeedbackMain(2, true)"
                        @mouseleave="sendCardVisualFeedbackMain(2, false)" @click="itemToSideDevice(2)"></div>
                </section>
            </div>
            <div class="gridItem gridEdge" id="personalEdgeLeft">{{ playerPositions[4] }}</div>
            <div class="gridItem" id="player3Field" v-if="item_types != null && itemArrayPlayer3 != null">
                <MainItem class="mainItem bottom" v-for="item in itemArrayPlayer3" v-if="playerPositions[3] != null"
                    :style="{ width: (0.8 * screenSize.windowWidth) / 14 + 'px', margin: defineMargin('player3') }"
                    :position="item.position" :item_types="item_types" :currentItem="item" @emitMainItem="emitMainItem">
                </MainItem>
                <section class="hoverBanksTopBottom" v-if="playerPositions[3] != null">
                    <div id="hoverToBankPlayer3" @click="itemToBank(3)">

                    </div>
                    <div id="hoverToSideDevicePlayer3" @mouseenter="sendCardVisualFeedbackMain(3, true)"
                        @mouseleave="sendCardVisualFeedbackMain(3, false)" @click="itemToSideDevice(3)"></div>

                </section>
            </div>
            <div class="gridItem gridEdge" id="personalEdgeBottom">{{ playerPositions[3] }}</div> -->
            <div class="gridItem">
                <PlayerBank :boardPosition=2 :function="'inGame'" :playerPositions="playerPositions"
                    :activePlayerData="activePlayerData" :colors="colors" :playedItems="playedItems"></PlayerBank>
            </div>
            <div class="gridItem">7</div>
            <div class="gridItem">
                <PlayerBank :boardPosition=3 :function="'inGame'" :playerPositions="playerPositions"
                    :activePlayerData="activePlayerData" :colors="colors" :playedItems="playedItems"></PlayerBank>
            </div>
            <div class="gridItem">9</div>
        </section>
    </div>
</template>

<script setup>
//  Route importieren
import { useRoute } from 'vue-router';

// Supabaes importieren
import { supabase } from '@/lib/supabaseClient'

// Vue importieren
import { ref, onMounted, computed } from 'vue';

// Store importieren
import { useStore } from 'vuex';
const store = useStore();

// Komponenten importieren
import Item from '@/components/Item.vue';
import PlayerBank from '@/components/PlayerBank.vue';
import ChoosePlayerPositionBank from '@/components/ChoosePlayerPositionBank.vue';

// OnMount Variabeln
// const id_session = useRoute().params.id;
// const title_session = useRoute().query.session_title;
//const code_session = ref();
let positionRobber = ref();
let longestRoad = ref();
let largestArmy = ref();
// const item_types = ref([{}])



//Zuerst Ref und dann Computed

// const player_ids = computed(() => {
//     if (activePlayers.value.length === 0) return []
//     return activePlayers.value.map(playerData => playerData.player_id);
// })







const player_names = ref([]);
//let playerNamesToBePositioned = ref([]);
let itemArray = ref([]);
let playerNameIds = ref([]);
let playerNameColors = ref([]);
let itemArrayPlayer1 = ref([]);
let itemArrayPlayer2 = ref([]);
let itemArrayPlayer3 = ref([]);
let itemArrayPlayer4 = ref([]);
let itemsOnBoard = ref([]);
let positionConversionObject = ref({});
//let screenSize = ref({ 'windowWidth': '', 'windowHeight': '' })
let eventListenerArray = ref({});
// let die1 = ref(1);
// let die2 = ref(1);
// let nonSeatedPlayers = false;
let itemDistribution = ref([]);


let activePlayers = ref([]);


// Variabeln
let currentSelectedMainItem = ref(null);
let mousePosition = ref({ 'mouseXPosition': '', 'mouseYPosition': '', 'relMouseXPosition': '', 'relMouseYPosition': '' });
//let playerPositions = ref({});


// Manuelle Variabeln
// let itemIdRange = { 'first': 100, 'last': 102 };

// DOM Elemente
// const gridContainerPopUp = ref(null)
// const gridContainerPlayfield = ref(null)
// const playfield = ref(null)


// Emit Funktionen
// const emitMainItem = (mainItem) => {
//     currentSelectedMainItem.value = mainItem.mainItemId;
//     console.log(currentSelectedMainItem.value);
// }

// const updateSelectedItem = (itemId) => {
//     currentSelectedMainItem.value = itemId;
//     console.log(currentSelectedMainItem.value);
// }




///////////////////////////////////// Hilfsfunktionen ////////////////////////////////







///////////////////////////////////// Ende Hilfsfunktionen ////////////////////////////////













///////////////////////////////////// Process ////////////////////////////////
function getStatesProcess() {
    console.log(id_session);
    console.log(item_types.value);
    console.log(colors.value.find(color => color.color_id === 1).hex_code);
    console.log(title_session);
    console.log(allPlayerData.value);
    console.log(activePlayerData.value);
    console.log(playerPositions.value);
    console.log(playersToBePositioned.value);
    console.log(store.state.STOREcurrentHoveredObject)
    //console.log(sessionData.value);
}

///////////////////////////////////// Ende Process ////////////////////////////////


///////////////////////////////////// Variabeln ////////////////////////////////
const id_session = useRoute().params.id;
const item_types = ref([])
const title_session = useRoute().query.session_title;
//const sessionData = ref([{}]);
let allPlayerData = ref([]);
//let playerPositions = ref([]);
let colors = ref([])
let playedItems = ref([]);

// Board
let objectMousePosition = ref({ 'objectId': "" })

// PopUp
// let nonSeatedPlayers = true;

// Manuelle Variabeln
let circleOnBoardRange = { 'first': 1, 'last': 145 };

///////////////////////////////////// Ende Variabeln ////////////////////////////////

///////////////////////////////////// Computed ////////////////////////////////

// Alle Player-Daten, welche einen Namen haben, als Grundlage für alle weiteren Operationen
// --> Änderung von allPlayerData
let activePlayerData = computed(() => {
    if (store.state.STOREallPlayerData.length === 0) return []
    return store.state.STOREallPlayerData.filter(player => player.name != null);
})

// Funktion, welches die Positionen der Spieler speichert
// --> Manuelle Änderung bei der Spielerzuweisung & Änderung von activePlayerData
let playerPositions = computed(() => {
    if (activePlayerData.value.length === 0) return [];

    // Temporäre Variabel, welche die Positionen der Spieler speichert
    let tempPlayerPositions = [];

    activePlayerData.value.forEach(player => {
        let tempPlayerPositionsObject = {
            'playerId': player.player_id,
            'boardPosition': player.board_position
        };
        tempPlayerPositions.push(tempPlayerPositionsObject);
    })

    return tempPlayerPositions;
})

// Variabel, die true oder false ausgibet, je nach dem, ob es Spieler gibt, welche noch nicht temporär positioniert sind
// --> Änderung von playerPositions
let nonSeatedPlayers = computed(() => {

    // Temporäre Variabel, die speichert ob es noch nicht positionierte Spieler gibt
    let tempNonSeatetPlayers = false;

    playerPositions.value.forEach(object => {
        if (object.boardPosition === null) {
            tempNonSeatetPlayers = true;
        }
    })
    return tempNonSeatetPlayers;
})

// Array, welches alle Spieler-Ids enthält
// --> Änderung von activePlayerData
let playerIds = computed(() => {
    if (activePlayerData.value.length === 0) return []
    return activePlayerData.value.map(player => player.player_id);
})


///////////////////////////////////// Ende Computed ////////////////////////////////

///////////////////////////////////// DOM Elemente ////////////////////////////////
const gridContainerPopUp = ref(null)
const gridContainerPlayfield = ref(null)
const boardPositionPopUpContainer = ref(null);

const playfield = ref(null);
const die1 = ref(null);
const die2 = ref(null);


///////////////////////////////////// Ende DOM Elemente ////////////////////////////////

///////////////////////////////////// ONMOUNT ////////////////////////////////

onMounted(async () => {
    // Styling für GridContainer
    defineGridContainerSize();

    // Initialisierung der EventListener auf dem Spielbrett
    initializeBoardEventListener();

    // Alle Item-Typen aus der Datenbank holen
    fetchItemTypes();

    // Alle Farben aus der Datenbank holen
    fetchColors();

    // Alle Player-Daten aus der Datenbank holen
    fetchPlayerData();
})

///////////////////////////////////// Ende ONMOUNT ////////////////////////////////



///////////////////////////////////// Methoden ////////////////////////////////

// Funktion, welche testet, ob alle ActivePlayer bereits positioniert sind
// --> Clicken auf Start-Button
function playersToBePositioned() {
    if (activePlayerData.value.filter(player => player.board_position === null).length === 0) {
        boardPositionPopUpContainer.value.style.display = "none";
    } else {
        boardPositionPopUpContainer.value.style.display = "block";
    }
}


// Funktion, welche den GridContainer gemäss FensterGrösse skaliert
// --> onMounted
function defineGridContainerSize() {
    // Breite und Höhe des Fensters werden in der Variabel screenSize gespeichert
    let innerHeight = window.innerHeight;
    let innerWidth = window.innerWidth;

    // Grid Container (Playfield und PopUp) wird auf die Fenstergrösse angepasst
    let gridTemplateColumns = `${innerWidth * 0.1}px ${innerWidth * 0.8}px ${innerWidth * 0.1}px`;
    let gridTemplateRows = `${innerWidth * 0.1}px ${innerHeight - (innerWidth * 0.2)}px ${innerWidth * 0.1}px`;
    gridContainerPopUp.value.style.gridTemplateColumns = gridTemplateColumns;
    gridContainerPopUp.value.style.gridTemplateRows = gridTemplateRows;
    gridContainerPlayfield.value.style.gridTemplateColumns = gridTemplateColumns;
    gridContainerPlayfield.value.style.gridTemplateRows = gridTemplateRows;
}

// Funkiton, welche Würfelt sobald der Würfel-Button geklickt wird
// --> @click (Würfel-Button)
function rollDice() {
    // let die1Value = Math.floor(Math.random() * 6) + 1;
    // let die2Value = Math.floor(Math.random() * 6) + 1;
}

///////////////////////////////////// Ende Methoden ////////////////////////////////





///////////////////////////////////// Fetch ////////////////////////////////
// Funktion, welche die Item-Daten, der aktuellen Session aus der Datenbank holt
// --> onMounted
const fetchItemTypes = async () => {
    try {
        const { data, error } = await supabase
            .from('item_type')
            .select()
        if (error) {
            console.error('Fehler:', error)
        } else {
            item_types.value = data;
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, welche die Farben der aktuellen Session aus der Datenbank holt
// --> onMounted
const fetchColors = async () => {
    try {
        const { data, error } = await supabase
            .from('color')
            .select()
        if (error) {
            console.error('Fehler:', error)
        } else {
            colors.value = data;
        };
    }
    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, welche die Spieler-Daten, der aktuellen Session aus der Datenbank holt
// --> onMounted
const fetchPlayerData = async () => {
    try {
        const { data, error } = await supabase
            .from('player')
            .select()
            .eq('id_session', id_session)
        if (error) {
            console.error('Fehler (PlayerData):', error);
        } else {
            store.commit('STOREsetAllPlayerData', data);

            // Das PlayerChoose PopUp wird angezeigt, wenn es noch nicht positionierte Spieler gibt
            playersToBePositioned();



            // playedItems wird geleert
            playedItems.value = [];
            // playedItems wird mit den Daten aus der Datenbank gefüllt
            if (playerIds.value.length > 0) {
                playerIds.value.forEach(playerId => {
                    fetchRelItemPlayed(playerId);
                    console.log('fetchRelItemPlayed')
                })
            }








            //             itemDistribution.value = activePlayers.value.map(playerData => ({ playerId: playerData.player_id, position: playerData.board_position }));
            //             // console.log(itemDistribution.value)

            //             // Für jeden Spieler wird die Funktion fetchRelItemPlayed ausgeführt
            //             const fetchPromises = player_ids.value.map((player_id) => fetchRelItemPlayed(player_id));

            //             // Alle Fetches werden abgewartet
            //             await Promise.all(fetchPromises);

            //             separateItemArray()
            //             // player_ids.value.forEach(player_id => {
            //             //     fetchRelItemPlayed(player_id);
            //             // });

        }
    }

    catch (e) {
        console.error('CatchFehler:', e)
    }
}

// Funktion, welche die neu gewählten Positionen der Spieler in der Datenbank speichert
// --> @click (PopUp, StartGame-Button)
const fetchSetPlayerPositions = async () => {
    for (let player of playerPositions.value) {
        try {
            const { data, error } = await supabase
                .from('player')
                .update({ board_position: player.boardPosition })
                .eq('player_id', player.playerId)
            if (error) {
                console.error('Fehler (RelData):', error);
            } else {
                playersToBePositioned();
                //fetchPlayerData();
            }
        }

        catch (e) {
            console.error('CatchFehler:', e)
        }
    }
}

// fetch-Funktion, die die Daten aus der Relationstabelle 'rel_player_item_played' holt
// --> onMounted
const fetchRelItemPlayed = async (playerId) => {
    try {
        const { data, error } = await supabase
            .from('rel_player_item_played')
            .select()
            .eq('owner_id_player', playerId)
        if (error) {
            console.error('Fehler (RelData):', error);
        } else {
            //console.log('Geklappt (RelData):', data);
            data.forEach(item => {
                playedItems.value.push(item);
            });
        }
    }

    catch (e) {
        console.error('CatchFehler:', e)
    }
}

///////////////////////////////////// Ende Fetch ////////////////////////////////





///////////////////////////////////// EventListener ////////////////////////////////
// Eventlistener für Fenstergrössenänderung
window.addEventListener('resize', defineGridContainerSize)

// Eventlistener für Spielbrett, mouseenter und mouseleave
// --> onMounted
function initializeBoardEventListener() {
    for (let currentCircleId = circleOnBoardRange.first; currentCircleId <= circleOnBoardRange.last; currentCircleId++) {
        playfield.value.querySelector('#_' + currentCircleId).addEventListener('mouseover', () => {
            store.commit('STOREsetcurrentHoveredObject', currentCircleId);
        })
        playfield.value.querySelector('#_' + currentCircleId).addEventListener('mouseout', () => {
            store.commit('STOREresetCurrentHoveredObject');
        })

    }
}


///////////////////////////////////// Ende EventListener ////////////////////////////////

///////////////////////////////////// Watcher ////////////////////////////////
supabase
    .channel('player')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'player' }, (payload) => {
        if (payload.new.id_session == id_session) {
            fetchPlayerData()
        }
    })
    .subscribe()

supabase
    .channel('rel_player_item_played')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'rel_player_item_played' }, (payload) => {
        playerIds.value.forEach(player_id => {
            if (payload.new.owner_id_player == player_id) {
                fetchPlayerData();
                console.log('Eigener Spieler hat was geändert INSERT');
            }
        });
    })
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'rel_player_item_played' }, (payload) => {
        playerIds.value.forEach(player_id => {
            if (payload.old.owner_id_player == player_id) {
                fetchPlayerData();
                console.log('Eigener Spieler hat was geändert DELETE');
            }
        });
    })
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rel_player_item_played' }, (payload) => {
        console.log('hallo')
        console.log(payload)
        playerIds.value.forEach(player_id => {
            if (payload.new.owner_id_player == player_id) {
                fetchPlayerData();
                console.log('Eigener Spieler hat was geändert UPDATE');
            }
        });
    })
    .subscribe()

///////////////////////////////////// Ende Watcher ////////////////////////////////


































// function defineMargin(player) {
//     switch (player) {
//         case 'player1':
//             if (itemArrayPlayer1.value.length > 12) {
//                 return '0 ' + ((((((0.8 * screenSize.value.windowWidth) - (((0.8 * screenSize.value.windowWidth) / 14) * (itemArrayPlayer1.value.length + 1))) / itemArrayPlayer1.value.length) / 2) - 5)) + 'px';
//             }
//         case 'player2':
//             if (itemArrayPlayer2.value.length > 6) {
//                 return ((((((screenSize.value.windowHeight - (screenSize.value.windowWidth * 0.2)) - (((0.8 * screenSize.value.windowHeight) / 9) * (itemArrayPlayer2.value.length + 1))) / itemArrayPlayer2.value.length) / 2) - 5)) + 'px 0';
//             }
//         case 'player3':
//             if (itemArrayPlayer3.value.length > 12) {
//                 return '0 ' + ((((((0.8 * screenSize.value.windowWidth) - (((0.8 * screenSize.value.windowWidth) / 14) * (itemArrayPlayer3.value.length + 1))) / itemArrayPlayer3.value.length) / 2) - 5)) + 'px';
//             }
//         case 'player4':
//             if (itemArrayPlayer4.value.length > 6) {
//                 return ((((((screenSize.value.windowHeight - (screenSize.value.windowWidth * 0.2)) - (((0.8 * screenSize.value.windowHeight) / 9) * (itemArrayPlayer4.value.length + 1))) / itemArrayPlayer4.value.length) / 2) - 5)) + 'px 0';
//             }
//     }
// }

// function itemToBank(position) {
//     console.log('itemToBank')
//     // Falls das Aktuell ausgewählte item bereits existiert (eine Nummer ist), wird es in die Bank verschoben
//     // Falls das Aktuell ausgewählte item noch nicht existiert = man vom Stapel eines gezogen hat (ein String ist), wird es neu erstellt
//     if (currentSelectedMainItem.value != null && !isNaN(currentSelectedMainItem.value)) {
//         fetchUpdateItemPosition(position)
//     } else if (currentSelectedMainItem.value != null && isNaN(currentSelectedMainItem.value)) {
//         let tempItemId = item_types.value.find(item => item.name == currentSelectedMainItem.value).item_type_id;
//         let tempOwnerId = playerNameIds.value.find(item => item.name == playerPositions.value[position]).id;

//         fetchChangeRelPlayerItemPlayed(position, tempItemId, tempOwnerId);
//     }
// }

// In Relationstabelle vom MainDevice (rel_player_item_played) wird die Karte hinzugefügt
// const fetchChangeRelPlayerItemPlayed = async (position, itemType, tempOwnerId) => {
//     console.log('ich werde zu oft ausgeführt')
//     try {
//         const { data, error } = await supabase
//             .from('rel_player_item_played')
//             .insert([{ owner_id_player: tempOwnerId, id_item_type: itemType, position: position }])

//         if (error) {
//             console.error('Fehler:', error);
//         } else {
//             console.log('Geklappt: 4', data);

//         }
//     }
//     catch (e) {
//         console.error('CatchFehler:', e)
//     }
// }


// function itemToSideDevice(position) {
//     console.log('itemToSideDevice')

//     if (currentSelectedMainItem.value != null && isNaN(currentSelectedMainItem.value)) {

//         let playerId = itemDistribution.value.find(item => item.position == position)?.playerId;
//         console.log(playerId);

//         if (playerId != null) {
//             fetchChangeRelTable(playerId, currentSelectedMainItem.value)
//         }

//     }
// }


// fetch um den Amount eines Items bei dem entsprechenden Spieler zu ändern.
// const fetchChangeRelTable = async (playerId, item) => {
//     try {
//         const { data, error } = await supabase
//             .from('item_type')
//             .select('item_type_id')
//             .eq('name', item)

//         if (error) {
//             console.error('Fehler:', error);
//         } else {
//             console.log('Geklappt: 1', data);
//             item = data[0].item_type_id;
//         }
//     }
//     catch (e) {
//         console.error('CatchFehler:', e)
//     }

//     let tempAmount = 0;

//     try {
//         const { data, error } = await supabase
//             .from('rel_player_item')
//             .select('amount')
//             .eq('owner_id_player', playerId)
//             .eq('id_item_type', item)

//         if (error) {
//             console.error('Fehler:', error);
//         } else {
//             console.log('Geklappt: 2', data);
//             tempAmount = data[0].amount;
//         }
//     }
//     catch (e) {
//         console.error('CatchFehler:', e)
//     }

//     try {
//         const { data, error } = await supabase
//             .from('rel_player_item')
//             .update({ amount: tempAmount + 1 })
//             .eq('owner_id_player', playerId)
//             .eq('id_item_type', item)

//         if (error) {
//             console.error('Fehler:', error);
//         } else {
//             console.log('Geklappt:3', data);
//         }
//     }
//     catch (e) {
//         console.error('CatchFehler:', e)
//     }
// }


// function rollDice() {
//     die1.value = Math.floor(Math.random() * 6) + 1;
//     die2.value = Math.floor(Math.random() * 6) + 1;
//     console.log(playerPositions.value, playerNameIds.value);
//     // Funktion, welche alle Variabeln in console.log ausgibt

//     variables();
// }


// function drawCard(itemType) {

//     if (itemType == 'developmentCard') {
//         let developmentItem = ['knight', 'road_building', 'year_of_plenty', 'monopoly', 'victory_point'];
//         itemType = developmentItem[Math.floor(Math.random() * developmentItem.length)];
//     }

//     currentSelectedMainItem.value = itemType;
//     console.log(currentSelectedMainItem.value);

// }















///////////////////////////////////// FUNKTIONEN ////////////////////////////////


///////////////////////////////////// FETCH-FUNKTIONEN ////////////////////////////////





// Karte ziehen, bzw Amount erhöhen. Funktion wird ausgeführt, sobald auf einen Nachziehstapel geklickt wird (Funktion: drawCard).
// const fetchChangeRelPlayerItem = async (itemId, drawingPlayer) => {

//     let tempAmount = 0;

//     try {
//         const { data, error } = await supabase
//             .from('rel_player_item')
//             .select('amount')
//             .eq('owner_id_player', drawingPlayer)
//             .eq('id_item_type', itemId)

//         if (error) {
//             console.error('Fehler:', error);
//         } else {
//             console.log('Geklappt: 2', data);
//             tempAmount = data[0].amount;
//             console.log(tempAmount);
//         }
//     }
//     catch (e) {
//         console.error('CatchFehler:', e)
//     }

//     try {
//         const { data, error } = await supabase
//             .from('rel_player_item')
//             .update({ amount: tempAmount + 1 })
//             .eq('owner_id_player', drawingPlayer)
//             .eq('id_item_type', itemId)

//         if (error) {
//             console.error('Fehler:', error);
//         } else {
//             console.log('Geklappt:3', data);
//         }
//     }
//     catch (e) {
//         console.error('CatchFehler:', e)
//     }
// }


// function separateItemArray() {
//     // Die verschiedenen Items werden je nach Spieler in einzelnen Arrays gespeichert
//     itemArrayPlayer1.value = itemArray.value.filter(item => item.position == 1);
//     itemArrayPlayer2.value = itemArray.value.filter(item => item.position == 2);
//     itemArrayPlayer3.value = itemArray.value.filter(item => item.position == 3);
//     itemArrayPlayer4.value = itemArray.value.filter(item => item.position == 4);

//     // Die Umrechnungsliste für die Positionen wird erstellt
//     definePositionConversion()
// }

// function definePositionConversion() {
//     for (let i = itemIdRange.first; i <= itemIdRange.last; i++) {
//         let tempCircleId = '_' + i;
//         let tempCircle = playfield.value.querySelector('#' + tempCircleId);

//         let circleXPosition = (tempCircle.getBoundingClientRect().x) + (tempCircle.getBoundingClientRect().width / 2);
//         let circleYPosition = (tempCircle.getBoundingClientRect().y) + (tempCircle.getBoundingClientRect().height / 2);

//         positionConversionObject.value[tempCircleId] = {
//             xPosition: circleXPosition,
//             yPosition: circleYPosition
//         }

//         // Dem Circle wird ein Eventlistener hinzugefügt
//         initializeEventListener(i)
//     }

//     // Die in der Mitte liegenden Items werden in einem Array gespeichert
//     let tempItemsOnBoard = itemArray.value.filter(item => item.position > 9);

//     // Anhand der Positionen werden die echten Positionen der Elemente im Array mitgespeichert
//     itemsOnBoard.value = [];
//     tempItemsOnBoard.forEach(tempItem => {
//         itemsOnBoard.value.push({
//             rel_player_item_played_id: tempItem.rel_player_item_played_id,
//             owner_id_player: tempItem.owner_id_player,
//             id_item_type: tempItem.id_item_type,
//             position: calculatePosition(tempItem.position)
//         })
//     });

//     // ENDE VON ONMOUNT
//     //separateItemArray();

// }

// function calculatePosition(tempPosition) {
//     return positionConversionObject.value['_' + tempPosition];
// }
// supabase in realtime updaten
//
// supabase
//     .channel('player')
//     .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'player' }, (payload) => {

//         console.log(payload)

//         if (payload.new.id_session == id_session) {
//             fetchPlayerData()
//             console.log('Isch was passiert');
//         }

//     })
//     .subscribe()



////////////////////////////////////// Interaktion GameBox ////////////////////////////



// Funktion wird ausgeführt, sobald sich die Maus auf der GameBox bewegt
// function trackMousePosition(event) {

//     // Die Mausposition wird in das Array mousePosition gespeichert

//     mousePosition.value.mouseXPosition = event.clientX;
//     mousePosition.value.mouseYPosition = event.clientY;
//     // mousePosition.value.relMouseXPosition = (event.clientX / screenSize.value.windowWidth) * 100;
//     // mousePosition.value.relMouseYPosition = (event.clientY / screenSize.value.windowHeight) * 100;


// }

///////////////////////////////////// EventListener ////////////////////////////////
// Eventlistener für die Fenstergrösse
// window.addEventListener('resize', handleWindowResize)


// function initializeEventListener(circleId) {
//     if (!eventListenerArray.value[circleId]) {
//         document.querySelector('#_' + circleId).addEventListener('click', (event) => {
//             console.log('gotClicked')
//             if (currentSelectedMainItem.value != null) {
//                 let croppedPosition = event.target.id.replace('_', '');
//                 fetchUpdateItemPosition(croppedPosition)
//                 console.log('controll 1')
//             }
//         })
//     }
//     eventListenerArray.value[circleId] = true;
// }

// Funktion, welche die Position eines Items auf dem Spielfeld aktualisiert
// const fetchUpdateItemPosition = async (position) => {
//     console.log('controll 2')
//     try {
//         const { data, error } = await supabase
//             .from('rel_player_item_played')
//             .update({ position })
//             .eq('rel_player_item_played_id', currentSelectedMainItem.value)
//         if (error) {
//             console.error('Fehler (RelData):', error);
//         } else {
//             //console.log('Geklappt (RelData):', data);
//         }
//     }

//     catch (e) {
//         console.error('CatchFehler:', e)
//     }
// }



// function sendCardVisualFeedbackMain(playerNumber, actionType) {
//     let playerColor = 'red';
//     if (actionType) {
//         switch (playerNumber) {
//             case 1:
//                 document.querySelector('#hoverToSideDevicePlayer1').style.background = 'linear-gradient(to bottom,' + playerColor + ' 0%,  transparent 100%)';
//                 break;
//             case 2:
//                 document.querySelector('#hoverToSideDevicePlayer2').style.background = 'linear-gradient(to left,' + playerColor + ' 0%,  transparent 100%)';
//                 break;
//             case 3:
//                 document.querySelector('#hoverToSideDevicePlayer3').style.background = 'linear-gradient(to top,' + playerColor + ' 0%,  transparent 100%)';
//                 break;
//             case 4:
//                 document.querySelector('#hoverToSideDevicePlayer4').style.background = 'linear-gradient(to right,' + playerColor + ' 0%,  transparent 100%)';
//                 break;
//         }
//     } else {
//         switch (playerNumber) {
//             case 1:
//                 document.querySelector('#hoverToSideDevicePlayer1').style.background = 'transparent';
//                 break;
//             case 2:
//                 document.querySelector('#hoverToSideDevicePlayer2').style.background = 'transparent';
//                 break;
//             case 3:
//                 document.querySelector('#hoverToSideDevicePlayer3').style.background = 'transparent';
//                 break;
//             case 4:
//                 document.querySelector('#hoverToSideDevicePlayer4').style.background = 'transparent';
//                 break;
//         }
//     }
// }






</script>

<style scoped>
/* Grid styling ****************/
.gridContainer {
    display: inline-grid;
    /* justify-items: stretch;
    justify-content: stretch;
    align-content: stretch;  */
}

.gridItem {
    display: flex;
    /* align-items: center;
    justify-content: center;
    background-color: blanchedalmond;
    padding: 2px;
    gap: 10px;
    position: relative;
    color: black; */
}

/**************** Grid styling */

/* Playfield styling ****************/
#playfield {
    height: 100%;
    width: 100%;
}

/******************** Playfield styling */

/* PopUp styling ****************/
#boardPositionPopUpContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 20;
}

/********************* PopUp Styling */

/* DrawPile styling ****************/
#drawPiles {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 15%;
    padding: 1em;
}

.drawPileCard {
    width: 100%;
    margin: 0.3em 0;
}

.drawPileCard:last-child {
    margin: 1.5em 0;
}

/**************** DrawPile styling */

/* Dies ****************/
#diceSection {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 15%;
    flex-direction: column;
}

#diceContainer {
    display: flex;
    flex-direction: column;
    margin-top: 3em;
    width: 40%;
    background-color: white;
    padding: 0;
    border-radius: 0;
}

.dice {
    width: 100%;
    margin: 0.2em 0;
}

/**************** Dies */








/* #gameBox {
    z-index: 10;
    position: absolute;
    user-select: none;
    height: 100vh;
    width: 100vw;
} */




/* .chooseTop {
    flex-direction: column-reverse;
} */

/* #chooseBoxTop,
#personalEdgeTop {
    transform: rotate(180deg);
    flex-shrink: 0;

} */

/* .chooseRight {
    flex-direction: row;
} */

/* #chooseBoxRight,
#personalEdgeRight {
    transform: rotate(270deg);
    flex-shrink: 0;

} */

/* .chooseBottom {
    flex-direction: column;
} */
/* 
#chooseBoxBottom,
#personalEdgeBottom {
    transform: rotate(0deg);
    flex-shrink: 0;

} */
/* 
.chooseLeft {
    flex-direction: row-reverse;
} */

/* #chooseBoxLeft,
#personalEdgeLeft {
    transform: rotate(90deg);
    flex-shrink: 0;

} */

/* 
#chooseBox2 {
    transform: rotate(270deg);
    background-color: red;
} */

/* #player1Field {
    height: 100%;
    flex-direction: row;
    background-color: azure;
    border: 1px solid black;

} */

/* #player2Field {
    width: 100%;
    flex-direction: column;
    background-color: azure;
    border: 1px solid black;
} */

/* #player3Field {
    height: 100%;
    flex-direction: row;
    background-color: azure;
    border: 1px solid black;
} */


/* #player4Field {
    width: 100%;
    flex-direction: column;
    background-color: azure;
    border: 1px solid black;
} */


/* .gridEdge {
    background-color: blueviolet;
} */


/* 
#items {
    position: absolute;
} */

/* .mainItem {
    background-color: red;
    flex-shrink: 0;
    border: 1px solid black;
} */

/* .bottom,
.top {
    height: 100%;
} */

/* .right,
.left {
    width: 100%;
} */
/*************** */
/* .hoverBank {
    position: absolute;
    z-index: 20;
    background-color: red;
    background-color: transparent;
}

#hoverBankPlayer1 {
    top: 0;
    left: 10vw;
}
#hoverBankPlayer2 {
    top: 20vh;
    left: 95vw;
} */
/*************** */
/* .hoverBanksTopBottom {
    position: absolute;
    z-index: 20;
    background-color: transparent;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
} */

/* .hoverBanksLeftRight {
    position: absolute;
    z-index: 20;
    background-color: transparent;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
} */

/* #hoverToSideDevicePlayer1,
#hoverToSideDevicePlayer3,
#hoverToBankPlayer1,
#hoverToBankPlayer3 {
    height: 50%;
    width: 100%;
    position: relative;
} */

/* #hoverToSideDevicePlayer2,
#hoverToSideDevicePlayer4,
#hoverToBankPlayer2,
#hoverToBankPlayer4 {
    height: 100%;
    width: 50%;
    position: relative;
} */



/* DRAWPILE */

/* .drawPileCard {
    background-color: palevioletred;
    height: 60px;
    width: 100px;
    margin: 15px;
}*/
</style> 
