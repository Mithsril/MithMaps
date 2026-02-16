// ==EMEVD==
// @docs    er-common.emedf.json
// @compress    DCX_KRAK
// @game    Sekiro
// @string    "N:\\GR\\data\\Param\\event\\common_func.emevd\u0000N:\\GR\\data\\Param\\event\\common_macro.emevd\u0000\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82]
// @version    3.6.2
// ==/EMEVD==

$Event(0, Default, function() {
    RegisterBonfire(46050000, 46051950, 0, 0, 0, 0);
    InitializeEvent(0, 46052260, 46, 5, 0, 0);
    //---start signal---
    //startsignal1
    $InitializeCommonEvent(0, 46990051, 46059052, 46059050, 46059051, 1, 2.75);
    $InitializeCommonEvent(0, 46990050, 46020200, 46059050, 46059051);
    //startsignal2
    $InitializeCommonEvent(0, 46990051, 46059062, 46059060, 46059061, 1, 2.75);
    $InitializeCommonEvent(0, 46990050, 46020200, 46059060, 46059061);
    //startsignal3
    $InitializeCommonEvent(0, 46990051, 46059072, 46059070, 46059071, 0, 2.75);
    $InitializeCommonEvent(0, 46990050, 46020200, 46059070, 46059071);
    //startsignal4
    $InitializeCommonEvent(0, 46990051, 46059082, 46059080, 46059081, 1, 2.75);
    $InitializeCommonEvent(0, 46990050, 46020200, 46059080, 46059081);
    //------------------
    $InitializeEvent(0, 46059010);
    $InitializeEvent(0, 46059020);
    $InitializeEvent(0, 46059001);
    $InitializeEvent(0, 46049002);
    //---warp pads---
    //warp1
    $InitializeCommonEvent(0, 46990065, 46059100, 46059101, 46059102, 46059103, 46059102, 46059101);
    //vfx
    $InitializeCommonEvent(0, 46990068, 46059105);
    $InitializeCommonEvent(0, 46990068, 46059106);
    //warp2
    $InitializeCommonEvent(0, 46990065, 46059107, 46059108, 46059109, 46059110, 46059109, 46059108);
    //vfx
    $InitializeCommonEvent(0, 46990068, 46059111);
    $InitializeCommonEvent(0, 46990068, 46059112);
    //warp3
    $InitializeCommonEvent(0, 46990065, 46059113, 46059114, 46059115, 46059116, 46059115, 46059114);
    //vfx
    $InitializeCommonEvent(0, 46990068, 46059117);
    $InitializeCommonEvent(0, 46990068, 46059118);
    //warp4
    $InitializeCommonEvent(0, 46990065, 46059119, 46059120, 46059121, 46059122, 46059121, 46059120);
    //vfx
    $InitializeCommonEvent(0, 46990068, 46059123);
    $InitializeCommonEvent(0, 46990068, 46059124);
    //-------------------
    //arena flag
    $InitializeCommonEvent(0, 46059030, 46059130);
});

$Event(46052260, Restart, function(X0_4, X4_4, X8_4, X12_4) {
    EndIf(!PlayerInMap(X0_4, X4_4, X8_4, X12_4));
    SetPlayerPositionDisplay(Disabled, true, 60, 46, 44, 0, -64, 0, 128);
});

$Event(46059001, Restart, function() {
    DisableNetworkSync();
    SetCurrentTime(12, 0, 0, false, false, false, 0, 0, 0);
    FreezeTime(true);
});

$Event(46049002, Restart, function() {
    DisableNetworkSync();
    ChangeWeather(Weather.HeavyFog, 0, true);
});

$Event(46059010, Restart, function() {
    DisableNetworkSync();
    WaitFor(
        CharacterHasSpEffect(10000, 46020220, NotEqual, 1)
            && InArea(10000, 46059010)
            && !InArea(10000, 46059020));
    ClearSpEffect(10000, 46000000);
    SetSpEffect(10000, 46020210);
    SetSpEffect(10000, 46020211);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

$Event(46059020, Restart, function() {
    DisableNetworkSync();
    WaitFor(CharacterHasSpEffect(10000, 46020220, NotEqual, 1) && InArea(10000, 46059020));
    WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, 46059000, -1, 10000);
    SetSpEffect(10000, 9651);
    ForceAnimationPlayback(10000, 63010, false, false, false);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

//inside arena flag
$Event(46059030, Restart, function (areaID) {
    DisableNetworkSync();
    if (InArea(10000, areaID)) {
        SetSpEffect(10000, 46010050);//set inside arena death flag
    } else {
        ClearSpEffect(10000, 46010050);//clear flag
    }
    RestartEvent();
});
