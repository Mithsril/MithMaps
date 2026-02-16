// ==EMEVD==
// @docs    er-common.emedf.json
// @compress    DCX_KRAK
// @game    Sekiro
// @string    "N:\\GR\\data\\Param\\event\\common_func.emevd\u0000N:\\GR\\data\\Param\\event\\common_macro.emevd\u0000\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82]
// @version    3.6.2
// ==/EMEVD==

$Event(0, Default, function () {
    RegisterBonfire(46030000, 46031950, 0, 0, 0, 0);
    RegisterBonfire(46030001, 46031951, 0, 0, 0, 0);
    InitializeEvent(0, 46032260, 46, 3, 0, 0);
    //---start signal---
    //how the start signals work:
    //event id,
    //triggerAsset (action button entityid asset),
    //team source (c1000, object type: enemy) above bullet source at 30.075Y,
    //bullet source (object type: other) below team source 30.00Y,
    //is it a dueling arena? 0: false / 1: true
    $InitializeCommonEvent(0, 46990051, 47039052, 47039050, 47039051, 0, 2.75);
    $InitializeCommonEvent(0, 46990051, 47039053, 47039050, 47039051, 0, 2.75);
    $InitializeCommonEvent(0, 46990051, 47039054, 47039050, 47039051, 0, 2.75);
    $InitializeCommonEvent(0, 46990051, 47039055, 47039050, 47039051, 0, 2.75);
    //
    $InitializeCommonEvent(0, 46990051, 46039056, 46039060, 46039061, 1, 2.75);
    $InitializeCommonEvent(0, 46990051, 46039057, 46039060, 46039061, 1, 2.75);
    $InitializeCommonEvent(0, 46990051, 46039058, 46039060, 46039061, 1, 2.75);
    //
    $InitializeCommonEvent(0, 46990050, 47020200, 47039050, 47039051);
    $InitializeCommonEvent(0, 46990050, 47020200, 47039060, 47039061);
    //------------------
    $InitializeEvent(0, 46039010);
    $InitializeEvent(0, 46039020);
    $InitializeEvent(0, 46039001);
    $InitializeEvent(0, 46031965, 460000000);
    $InitializeEvent(0, 46032265);
    //------warps-----
    //arena specific warp
    $InitializeEvent(0, 46031963, 460000210, 460000211, 460000212, 460000220, 460000221, 460000222, 460000230, 460000231, 460000232, 460000240, 460000241, 460000242, 460000250, 460000251, 460000252, 460000260, 460000261, 460000262);
    //warpvfx
    $InitializeEvent(0, 46031964, 4630020, 4630010, 4630040, 4630030, 4630050, 4630060);
    //common warp
    $InitializeCommonEvent(0, 46990065, 47039062, 47039063, 47039064, 47039065, 47039064,47039063);
    //vfx
    $InitializeCommonEvent(0, 46990068, 47039066);
    $InitializeCommonEvent(0, 46990068, 47039067);
    //-----------------
    DisableCharacterAI(14005104);
});

$Event(46032265, Restart, function () {
    DisableNetworkSync();
    ChangeWeather(Weather.None, 0, true);
});

$Event(46032260, Restart, function (X0_4, X4_4, X8_4, X12_4) {
    EndIf(!PlayerInMap(X0_4, X4_4, X8_4, X12_4));
    SetPlayerPositionDisplay(Disabled, true, 60, 46, 45, 0, -64, 0, 0);
});

$Event(46039001, Restart, function () {
    DisableNetworkSync();
    SetCurrentTime(12, 0, 0, false, false, false, 0, 0, 0);
    FreezeTime(true);
});

$Event(46039010, Restart, function () {
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

$Event(46039020, Restart, function () {
    EndEvent();
    DisableNetworkSync();
    WaitFor(CharacterHasSpEffect(10000, 46020220, NotEqual, 1) && InArea(10000, 46039020));
    WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, 46039000, -1, 10000);
    SetSpEffect(10000, 9651);
    ForceAnimationPlayback(10000, 63010, false, false, false);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});


//inside arena flag
$Event(46031965, Restart, function (areaID) {
    DisableNetworkSync();
    if (InArea(10000, areaID)) {
        SetSpEffect(10000, 46010050);//set inside arena death flag
    } else {
        ClearSpEffect(10000, 46010050);//clear flag
    }
    RestartEvent();
});

//fast warp to arena
$Event(46031963, Restart, function (region1, destination1, warp1, region2, destination2, warp2, region3, destination3, warp3, region4, destination4, warp4, region5, destination5, warp5, region6, destination6, warp6) {
    DisableNetworkSync();
    SetEventFlagID(1, OFF);
    SetEventFlagID(2, OFF);
    SetEventFlagID(3, OFF);
    SetEventFlagID(4, OFF);
    SetEventFlagID(5, OFF);
    SetEventFlagID(6, OFF);
    WaitFor(ActionButtonInArea(90014, warp1) || ActionButtonInArea(90014, warp2) || ActionButtonInArea(90014, warp3) || ActionButtonInArea(90014, warp4)|| ActionButtonInArea(90014, warp5) || ActionButtonInArea(90014, warp6));
    
    if (InArea(10000, region1)) {
        SetEventFlagID(1, ON);
    }
    if (InArea(10000, region2)) {
        SetEventFlagID(2, ON);
    }
    if (InArea(10000, region3)) {
        SetEventFlagID(3, ON);
    }
    if (InArea(10000, region4)) {
        SetEventFlagID(4, ON);
    }
    if (InArea(10000, region5)) {
        SetEventFlagID(5, ON);
    }
    if (InArea(10000, region6)) {
        SetEventFlagID(6, ON);
    }


    ForceAnimationPlayback(10000, 60505, false, false, false);//fade out
    WaitFixedTimeSeconds(2);//wait for tp anim to get to transparent frame
    
    //invoke tp warp
    if (EventFlag(1)) { WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, destination1, -1, 10000) }
    if (EventFlag(2)) { WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, destination2, -1, 10000) }
    if (EventFlag(3)) { WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, destination3, -1, 10000) }
    if (EventFlag(4)) { WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, destination4, -1, 10000) }
    if (EventFlag(5)) { WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, destination5, -1, 10000) }
    if (EventFlag(6)) { WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, destination6, -1, 10000) }

    ForceAnimationPlayback(10000, 60502, false, false, false);//fade in
    WaitFixedTimeSeconds(1);
    RequestCharacterAnimationReset(10000, Enabled);//allow early exit
    
    RestartEvent();

});


//fast warp vfx
$Event(46031964, Restart, function (warp1, warp2, warp3, warp4, warp5, warp6) {
    DisableNetworkSync();
    if (InArea(10000, 4630009)) {
        //red
        DeleteAssetfollowingSFX(warp1, true);
        CreateAssetfollowingSFX(warp1, 100, 4721);
        DeleteAssetfollowingSFX(warp2, true);
        CreateAssetfollowingSFX(warp2, 100, 4721);
        DeleteAssetfollowingSFX(warp5, true);
        CreateAssetfollowingSFX(warp5, 100, 4721);
        //blue
        DeleteAssetfollowingSFX(warp3, true);
        CreateAssetfollowingSFX(warp3, 100, 4711);
        DeleteAssetfollowingSFX(warp4, true);
        CreateAssetfollowingSFX(warp4, 100, 4711);
        DeleteAssetfollowingSFX(warp6, true);
        CreateAssetfollowingSFX(warp6, 100, 4711);
    } else {
        DeleteAssetfollowingSFX(warp1, true);
        DeleteAssetfollowingSFX(warp2, true);
        DeleteAssetfollowingSFX(warp3, true);
        DeleteAssetfollowingSFX(warp4, true);
        DeleteAssetfollowingSFX(warp5, true);
        DeleteAssetfollowingSFX(warp6, true);
    }
    WaitFixedTimeSeconds(1);
    RestartEvent();
});
