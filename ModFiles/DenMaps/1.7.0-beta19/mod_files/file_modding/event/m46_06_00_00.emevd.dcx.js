// ==EMEVD==
// @docs    er-common.emedf.json
// @compress    DCX_KRAK
// @game    Sekiro
// @string    "N:\\GR\\data\\Param\\event\\common_func.emevd\u0000N:\\GR\\data\\Param\\event\\common_macro.emevd\u0000\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82]
// @version    3.6.2
// ==/EMEVD==

$Event(0, Default, function() {
    RegisterBonfire(46060000, 46061950, 0, 0, 0, 0);
    //---start signal---
    $InitializeCommonEvent(0, 46990051, 46069052, 46069050, 46069051, 1, 2.75);
    $InitializeCommonEvent(0, 46990050, 47020200, 46069050, 46069051);
    //------------------
    //$InitializeEvent(0, 46069010, 46, 6, 0, 0);
    $InitializeEvent(0, 46069020);
    $InitializeEvent(0, 46069021);
    //---inside areana flag---
    $InitializeEvent(0, 46069022, 46069040);
    //---quick respawn---
    $InitializeEvent(0, 46069030, 46069040, 1, 2, 46069060, 46069061);
    $InitializeEvent(0, 46069031, 46069041, 1, 2, 46069062, 46069063);
    $InitializeEvent(0, 46069032, 46069060, 46069061, 46069062, 46069063);
    $InitializeEvent(0, 46069033);
    //-------------------

});

//player pos?
//$Event(46069010, Restart, function(X0_4, X4_4, X8_4, X12_4) {
    //EndIf(!PlayerInMap(X0_4, X4_4, X8_4, X12_4));
    //SetPlayerPositionDisplay(Disabled, true, 60, 45, 44, 0, 64, 0, 0);
//});

//set time of day to be constant
$Event(46069020, Restart, function() {
    DisableNetworkSync();
    SetCurrentTime(12, 0, 0, false, false, false, 0, 0, 0);
    FreezeTime(true);
});

//kill plane invulnerability? force death? rework this
$Event(46069021, Restart, function() {
    DisableNetworkSync();
    WaitFor(CharacterHasSpEffect(10000, 46020220, NotEqual, 1) && InArea(10000, 46069020));
    WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, 46069000, -1, 10000);
    SetSpEffect(10000, 9651);
    ForceAnimationPlayback(10000, 63010, false, false, false);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

//inside arena flag
$Event(46069022, Restart, function (areaID) {
    EndEvent();//disabled for now
    DisableNetworkSync();
    if (InArea(10000, areaID)) {
        SetSpEffect(10000, 46010050);//set inside arena death flag
    } else {
        ClearSpEffect(10000, 46010050);//clear flag
    }
    RestartEvent();
});


//quick respawn1
$Event(46069030, Restart, function (areaID, spawnFlag1, spawnFlag2, spawn1, spawn2) {
    EndEvent();//disabled for now
    DisableNetworkSync();
    SetEventFlagID(1, OFF);
    SetEventFlagID(2, OFF);
    WaitFor(CharacterHPValue(10000) < 1 && InArea(10000, areaID))
    EnableCharacterInvincibility(10000);
    WaitFixedTimeSeconds(2);
    RequestCharacterAnimationReset(10000, Enabled);
    RandomlySetEventFlagInRange(1, 2, ON);
    if (EventFlag(spawnFlag1)) { WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, spawn1, -1, 10000) }
    if (EventFlag(spawnFlag2)) { WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, spawn2, -1, 10000) }
    SetSpEffect(10000, 46010000);
    ForceAnimationPlayback(10000, 60260, true, false, false);
    WaitFixedTimeSeconds(2);
    ShootBullet(10000, 10000, 905, 46000100, 0, -1, 0);
    ForceAnimationPlayback(10000, 0, false, false, false);
    ForceAnimationPlayback(10000, 60501, false, false, false);
    SetSpEffect(10000, 46010020);
    SetSpEffect(10000, 46010040);
    SetSpEffect(10000, 46020202);
    ClearSpEffect(10000, 70);
    RestartEvent();
});

//quick respawn2
$Event(46069031, Restart, function (areaID, spawnFlag1, spawnFlag2, spawn1, spawn2) {
    EndEvent();//disabled for now
    DisableNetworkSync();
    SetEventFlagID(1, OFF);
    SetEventFlagID(2, OFF);
    WaitFor(CharacterHPValue(10000) < 1 && InArea(10000, areaID))
    EnableCharacterInvincibility(10000);
    WaitFixedTimeSeconds(2);
    RequestCharacterAnimationReset(10000, Enabled);
    RandomlySetEventFlagInRange(1, 2, ON);
    if (EventFlag(spawnFlag1)) { WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, spawn1, -1, 10000) }
    if (EventFlag(spawnFlag2)) { WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, spawn2, -1, 10000) }
    SetSpEffect(10000, 46010000);
    ForceAnimationPlayback(10000, 60260, true, false, false);
    WaitFixedTimeSeconds(2);
    ShootBullet(10000, 10000, 905, 46000100, 0, -1, 0);
    ForceAnimationPlayback(10000, 0, false, false, false);
    ForceAnimationPlayback(10000, 60501, false, false, false);
    SetSpEffect(10000, 46010020);
    SetSpEffect(10000, 46010040);
    SetSpEffect(10000, 46020202);
    ClearSpEffect(10000, 70);
    RestartEvent();
});

//quick respawn explosion trigger after leaving spawn point
$Event(46069032, Restart, function (spawn1, spawn2, spawn3, spawn4) {
    DisableNetworkSync();
    if (CharacterHasSpEffect(10000, 46010000)) {
        if (InArea(10000, spawn1) || InArea(10000, spawn2) || InArea(10000, spawn3) || InArea(10000, spawn4)) {
            SetSpEffect(10000, 46020202);
        } else {
            SetSpEffect(10000, 46010030);
            DisableCharacterInvincibility(10000);
            DisableCharacterImmortality(10000);
        }
    }
    RestartEvent();
});

//quick respawn explosion following end of time and leave trigger
$Event(46069033, Restart, function () {
    DisableNetworkSync();
    WaitFor(CharacterHasSpEffect(10000, 46010030));
    BonfirelikeRecovery();
    DisableCharacterInvincibility(10000);
    DisableCharacterImmortality(10000);
    EnableCharacterCollision(10000);
    EnableCharacter(10000);
    ClearSpEffect(10000, 90);
    ClearSpEffect(10000, 46010030);
    ClearSpEffect(10000, 46020202);
    ClearSpEffect(10000, 46020203);
    ClearSpEffect(10000, 46010000);
    ClearSpEffect(10000, 46010040);
    ClearSpEffect(10000, 46000601);
    RequestCharacterAnimationReset(10000, Enabled);
    RestartEvent();
});
