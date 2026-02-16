// ==EMEVD==
// @docs    er-common.emedf.json
// @compress    DCX_KRAK
// @game    Sekiro
// @string    "N:\\GR\\data\\Param\\event\\common_func.emevd\u0000N:\\GR\\data\\Param\\event\\common_macro.emevd\u0000\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82]
// @version    3.6.2
// ==/EMEVD==

$Event(0, Default, function() {
    RegisterBonfire(46070000, 46071950, 0, 0, 0, 0);
    RegisterBonfire(46070001, 46071951, 0, 0, 0, 0);
    InitializeEvent(0, 46072260, 46, 7, 0, 0);
    $InitializeCommonEvent(0, 46990051, 46079052, 46079050, 46079051, 0, 2.75);
    $InitializeCommonEvent(0, 46990051, 46079053, 46079050, 46079051, 0, 2.75);
    $InitializeCommonEvent(0, 46990050, 46020200, 46079050, 46079051);
    //pressure plate template 
    //behaviorparam must have a atkparamnpc and bullet
    //(0, 90005660, chrEntityId, entityId, areaEntityId, behaviorId, entityId2, entityId3, entityId4) 
    $InitializeCommonEvent (0, 90005660, 30060616, 30061600, 30062616, 40607000, 30062619, 30062620, 30062621);
    $InitializeEvent(0, 46079020);
    $InitializeEvent(0, 46079030);
    $InitializeEvent(0, 46079040);
    $InitializeEvent(0, 46079001);
    //waygates
    $InitializeCommonEvent(0, 46990062, 1050361614, 90015, 46079026, 470002, 1, 2, 3);
    $InitializeCommonEvent(0, 46990062, 1050361611, 90015, 46079023, 470002, 1, 2, 3);
    $InitializeCommonEvent(0, 46990062, 1050361610, 90015, 46079022, 470002, 1, 2, 3);
    $InitializeCommonEvent(0, 46990062, 1050361613, 90015, 46079024, 470002, 1, 2, 3);
    $InitializeCommonEvent(0, 46990062, 1050361612, 90015, 46079025, 470002, 1, 2, 3); 
    //kill plane
    $InitializeCommonEvent(0, 46990063, 46079010);
    //rot plane
    $InitializeCommonEvent(0, 46990064, 1051361506);
    //
    DisableCharacterAI(1051560210);
});

$Event(46072260, Restart, function(X0_4, X4_4, X8_4, X12_4) {
    EndIf(!PlayerInMap(X0_4, X4_4, X8_4, X12_4));
    SetPlayerPositionDisplay(Disabled, true, 60, 46, 44, 0, -64, 0, 0);
});

$Event(46079001, Restart, function() {
    DisableNetworkSync();
    SetCurrentTime(12, 0, 0, false, false, false, 0, 0, 0);
    FreezeTime(true);
});

$Event(46079020, Restart, function() {
    DisableNetworkSync();
    WaitFor(CharacterHasSpEffect(10000, 46020220, NotEqual, 1) && InArea(10000, 46079020));
    WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, 46079000, -1, 10000);
    SetSpEffect(10000, 9651);
    ForceAnimationPlayback(10000, 63010, false, false, false);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

//QuickRespawn in  specified area
$Event(46079030, Restart, function() {
    DisableNetworkSync();
    WaitFor(CharacterHPValue(10000) < 1 && InArea(10000, 460000000));
    RequestCharacterAnimationReset(10000, Enabled);
    EnableCharacterInvincibility(10000);
    ShootBullet(10000, 10000, 905, 46000100, 0, -1, 0);
    SetSpEffect(10000, 46000100);
    ClearSpEffect(10000, 70);
    ForceAnimationPlayback(10000, 60502, false, true, false);
    ForceAnimationPlayback(10000, 60502, false, false, false);
    WaitFixedTimeRealFrames(120);
    DisableCharacterInvincibility(10000);
    RestartEvent();
});

//ladder interactions
$Event(46079040, Restart, function() {
    RegisterLadder(1051361599, 1051361600, 1051361599);
    RegisterLadder(1051361601, 1051361602, 1051361601);
});

//fast warp vfx
$Event(46031964, Restart, function() {
    DisableNetworkSync();
    if(InArea(10000, 4630009)){
            DeleteAssetfollowingSFX(4630010, true);
            CreateAssetfollowingSFX(4630010, 100, 4721);
            DeleteAssetfollowingSFX(4630020, true);
            CreateAssetfollowingSFX(4630020, 100, 4721);
            DeleteAssetfollowingSFX(4630030, true);
            CreateAssetfollowingSFX(4630030, 100, 4711);
            DeleteAssetfollowingSFX(4630040, true);
            CreateAssetfollowingSFX(4630040, 100, 4711);
       } else {
           DeleteAssetfollowingSFX(4630010, true);
           DeleteAssetfollowingSFX(4630020, true);
           DeleteAssetfollowingSFX(4630030, true);
           DeleteAssetfollowingSFX(4630040, true);
       }
       WaitFixedTimeSeconds(1);
        RestartEvent();
});
