// ==EMEVD==
// @docs    er-common.emedf.json
// @compress    DCX_KRAK
// @game    Sekiro
// @string    "N:\\GR\\data\\Param\\event\\common_func.emevd\u0000N:\\GR\\data\\Param\\event\\common_macro.emevd\u0000\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82]
// @version    3.6.2
// ==/EMEVD==

$Event(0, Default, function() {
    RegisterBonfire(46090000, 46091950, 0, 0, 0, 0);
    InitializeEvent(0, 46092260, 46, 9, 0, 0);
    $InitializeCommonEvent(0, 46990051, 46099052, 46099050, 46099051);
    $InitializeCommonEvent(0, 46990050, 46020200, 46099050, 46099051);
    $InitializeEvent(0, 46099010);
    $InitializeEvent(0, 46099020);
    $InitializeEvent(0, 46099001);
    $InitializeEvent(0, 46099030);
});

$Event(46092260, Restart, function(X0_4, X4_4, X8_4, X12_4) {
    EndIf(!PlayerInMap(X0_4, X4_4, X8_4, X12_4));
    SetPlayerPositionDisplay(Disabled, true, 60, 46, 44, 0, 64, 0, 0);
});

$Event(46099001, Restart, function() {
    DisableNetworkSync();
    SetCurrentTime(12, 0, 0, false, false, false, 0, 0, 0);
    FreezeTime(true);
});

$Event(46099010, Restart, function() {
    DisableNetworkSync();
    WaitFor(
        CharacterHasSpEffect(10000, 46020220, NotEqual, 1)
            && InArea(10000, 46099010)
            && !InArea(10000, 46099020));
    ClearSpEffect(10000, 46000000);
    SetSpEffect(10000, 46020210);
    SetSpEffect(10000, 46020211);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

$Event(46099020, Restart, function() {
    DisableNetworkSync();
    WaitFor(CharacterHasSpEffect(10000, 46020220, NotEqual, 1) && InArea(10000, 46099020));
    WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, 46099000, -1, 10000);
    SetSpEffect(10000, 9651);
    ForceAnimationPlayback(10000, 63010, false, false, false);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

//QuickRespawn in specified area
$Event(46099030, Restart, function() {
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


