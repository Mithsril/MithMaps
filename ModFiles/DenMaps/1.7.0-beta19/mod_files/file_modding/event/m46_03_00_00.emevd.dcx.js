// ==EMEVD==
// @docs    er-common.emedf.json
// @compress    DCX_KRAK
// @game    Sekiro
// @string    "N:\\GR\\data\\Param\\event\\common_func.emevd\u0000N:\\GR\\data\\Param\\event\\common_macro.emevd\u0000\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82]
// @version    3.6.1
// ==/EMEVD==

$Event(0, Default, function() {
    RegisterBonfire(46030000, 46031950, 0, 0, 0, 0);
    RegisterBonfire(46030001, 46031951, 0, 0, 0, 0);
    InitializeEvent(0, 46032260, 46, 3, 0, 0);
    $InitializeCommonEvent(0, 46990051, 46039052, 46039050, 46039051);
    $InitializeCommonEvent(0, 46990051, 46039053, 46039050, 46039051);
    $InitializeCommonEvent(0, 46990051, 46039054, 46039050, 46039051);
    $InitializeCommonEvent(0, 46990050, 46020200, 46039050, 46039051);
    $InitializeEvent(0, 46039010);
    $InitializeEvent(0, 46039020);
    $InitializeEvent(0, 46039001);
    DisableCharacterAI(14005104);
});

$Event(46032260, Restart, function(X0_4, X4_4, X8_4, X12_4) {
    EndIf(!PlayerInMap(X0_4, X4_4, X8_4, X12_4));
    SetPlayerPositionDisplay(Disabled, true, 60, 46, 45, 0, -64, 0, 0);
});

$Event(46039001, Restart, function() {
    DisableNetworkSync();
    SetCurrentTime(12, 0, 0, false, false, false, 0, 0, 0);
    FreezeTime(true);
});

$Event(46039010, Restart, function() {
    DisableNetworkSync();
    WaitFor(
        CharacterHasSpEffect(10000, 46020220, NotEqual, 1)
            && InArea(10000, 46039010)
            && !InArea(10000, 46039020));
    ClearSpEffect(10000, 46000000);
    SetSpEffect(10000, 46020210);
    SetSpEffect(10000, 46020211);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

$Event(46039020, Restart, function() {
    DisableNetworkSync();
    WaitFor(CharacterHasSpEffect(10000, 46020220, NotEqual, 1) && InArea(10000, 46039020));
    WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, 46039000, -1, 10000);
    SetSpEffect(10000, 9651);
    ForceAnimationPlayback(10000, 63010, false, false, false);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});


