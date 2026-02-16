// ==EMEVD==
// @docs    er-common.emedf.json
// @compress    DCX_KRAK
// @game    Sekiro
// @string    "N:\\GR\\data\\Param\\event\\common_func.emevd\u0000N:\\GR\\data\\Param\\event\\common_macro.emevd\u0000\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82]
// @version    3.6.2
// ==/EMEVD==

$Event(0, Default, function() {
    RegisterBonfire(46100000, 46101950, 0, 0, 0, 0);
    //$InitializeEvent(0, 46102260, 46, 10, 0, 0);
    $InitializeCommonEvent(0, 46990051, 46109052, 46109050, 46109051, 1, 2.75);
    $InitializeCommonEvent(0, 46990050, 46020200, 46109050, 46109051);
    $InitializeEvent(0, 46109010);
    $InitializeEvent(0, 46109020);
    $InitializeEvent(0, 46109001);
});

//$Event(46102260, Restart, function(X0_4, X4_4, X8_4, X12_4) {
    //EndIf(!PlayerInMap(X0_4, X4_4, X8_4, X12_4));
    //SetPlayerPositionDisplay(Disabled, true, 60, 47, 45, 0, -64, 10, 0);
//});

$Event(46109001, Restart, function() {
    DisableNetworkSync();
    SetCurrentTime(12, 0, 0, false, false, false, 0, 0, 0);
    FreezeTime(true);
});

$Event(46109010, Restart, function() {
    DisableNetworkSync();
    WaitFor(
        CharacterHasSpEffect(10000, 46020220, NotEqual, 1)
            && InArea(10000, 46109010)
            && !InArea(10000, 46109020));
    ClearSpEffect(10000, 46000000);
    SetSpEffect(10000, 46020210);
    SetSpEffect(10000, 46020211);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

$Event(46109020, Restart, function() {
    DisableNetworkSync();
    WaitFor(CharacterHasSpEffect(10000, 46020220, NotEqual, 1) && InArea(10000, 46109020));
    WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, 46109000, -1, 10000);
    SetSpEffect(10000, 9651);
    ForceAnimationPlayback(10000, 63010, false, false, false);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});


