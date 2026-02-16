// ==EMEVD==
// @docs    er-common.emedf.json
// @compress    DCX_KRAK
// @game    Sekiro
// @string    "N:\\GR\\data\\Param\\event\\common_func.emevd\u0000N:\\GR\\data\\Param\\event\\common_macro.emevd\u0000\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82]
// @version    3.6.2
// ==/EMEVD==

$Event(0, Default, function() {
    RegisterBonfire(47060000, 47061950, 0, 0, 0, 0);
    InitializeEvent(0, 47062260, 47, 6, 0, 0);
    $InitializeCommonEvent(0, 46990061, 47069052, 47069050, 47069051);
    $InitializeCommonEvent(0, 46990060, 46020200, 47069050, 47069051);
    $InitializeEvent(0, 47069010);
    $InitializeEvent(0, 47069020);
    $InitializeEvent(0, 47069001);
});

$Event(47062260, Restart, function(X0_4, X4_4, X8_4, X12_4) {
    EndIf(!PlayerInMap(X0_4, X4_4, X8_4, X12_4));
    SetPlayerPositionDisplay(Disabled, true, 60, 44, 44, 0, -64, 0, 0);
});

$Event(47069001, Restart, function() {
    DisableNetworkSync();
    SetCurrentTime(12, 0, 0, false, false, false, 0, 0, 0);
    FreezeTime(true);
});

$Event(47069010, Restart, function() {
    DisableNetworkSync();
    WaitFor(
        CharacterHasSpEffect(10000, 46020220, NotEqual, 1)
            && InArea(10000, 47069010)
            && !InArea(10000, 47069020));
    ClearSpEffect(10000, 46000000);
    SetSpEffect(10000, 46020210);
    SetSpEffect(10000, 46020211);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

$Event(47069020, Restart, function() {
    DisableNetworkSync();
    WaitFor(CharacterHasSpEffect(10000, 46020220, NotEqual, 1) && InArea(10000, 47069020));
    WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, 47069000, -1, 10000);
    SetSpEffect(10000, 9651);
    ForceAnimationPlayback(10000, 63010, false, false, false);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});
