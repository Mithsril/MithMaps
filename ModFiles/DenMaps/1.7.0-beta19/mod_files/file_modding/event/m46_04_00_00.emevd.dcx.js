// ==EMEVD==
// @docs    er-common.emedf.json
// @compress    DCX_KRAK
// @game    Sekiro
// @string    "N:\\GR\\data\\Param\\event\\common_func.emevd\u0000N:\\GR\\data\\Param\\event\\common_macro.emevd\u0000\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82]
// @version    3.6.1
// ==/EMEVD==

$Event(0, Default, function() {
    $InitializeEvent(0, 46049100);
    $InitializeEvent(0, 46049154);
    $InitializeEvent(0, 46049156);
    $InitializeEvent(0, 46049158);
    $InitializeEvent(0, 46049160);
    $InitializeEvent(0, 46049162);
    InitializeEvent(0, 46049163, 0);
    $InitializeEvent(0, 46049166);
    $InitializeEvent(0, 46049168);
    RegisterBonfire(46040000, 46041950, 0, 0, 0, 0);
    InitializeEvent(0, 46042260, 46, 4, 0, 0);
    //$InitializeCommonEvent(0, 46990051, 46049052, 46049050, 46049051);
    $InitializeCommonEvent(0, 46990050, 46020200, 46049050, 46049051);
    $InitializeEvent(0, 46049010);
    $InitializeEvent(0, 46049020);
    $InitializeEvent(0, 46049001);
    //$InitializeEvent(0, 46049002);
});

$Event(46042260, Restart, function(X0_4, X4_4, X8_4, X12_4) {
    EndIf(!PlayerInMap(X0_4, X4_4, X8_4, X12_4));
    SetPlayerPositionDisplay(Disabled, true, 60, 45, 44, 0, 64, 0, 128);
});

$Event(46049001, Restart, function() {
    DisableNetworkSync();
    SetCurrentTime(12, 0, 0, false, false, false, 0, 0, 0);
    FreezeTime(true);
});

/*$Event(46049002, Restart, function() {
    DisableNetworkSync();
    ChangeWeather(Weather.Unknown18, 0, true);
});*/

$Event(46049010, Restart, function() {
    DisableNetworkSync();
    WaitFor(
        CharacterHasSpEffect(10000, 46020220, NotEqual, 1)
            && InArea(10000, 46049010)
            && !InArea(10000, 46049020));
    ClearSpEffect(10000, 46000000);
    SetSpEffect(10000, 46020210);
    SetSpEffect(10000, 46020211);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

$Event(46049020, Restart, function() {
    DisableNetworkSync();
    WaitFor(CharacterHasSpEffect(10000, 46020220, NotEqual, 1) && InArea(10000, 46049020));
    WarpCharacterAndCopyFloor(10000, TargetEntityType.Area, 46049000, -1, 10000);
    SetSpEffect(10000, 9651);
    ForceAnimationPlayback(10000, 63010, false, false, false);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

$Event(46049100, Restart, function() {
    DisableNetworkSync();
    CreateAssetfollowingSFX(46049100, 100, 800235);
    CreateAssetfollowingSFX(46049101, 100, 800235);
    CreateAssetfollowingSFX(46049102, 100, 800235);
    CreateAssetfollowingSFX(46049103, 100, 800235);
    CreateAssetfollowingSFX(46049104, 100, 800235);
    CreateAssetfollowingSFX(46049105, 100, 800235);
    CreateAssetfollowingSFX(46049106, 100, 800235);
    CreateAssetfollowingSFX(46049107, 100, 800235);
    CreateAssetfollowingSFX(46049108, 100, 800235);
    CreateAssetfollowingSFX(46049109, 100, 800235);
    CreateAssetfollowingSFX(46049110, 100, 800235);
    CreateAssetfollowingSFX(46049111, 100, 800235);
    CreateAssetfollowingSFX(46049112, 100, 800235);
    CreateAssetfollowingSFX(46049113, 100, 800235);
    CreateAssetfollowingSFX(46049114, 100, 800235);
    CreateAssetfollowingSFX(46049115, 100, 800235);
    CreateAssetfollowingSFX(46049116, 100, 800235);
    CreateAssetfollowingSFX(46049117, 100, 800235);
    CreateAssetfollowingSFX(46049118, 100, 800235);
    CreateAssetfollowingSFX(46049119, 100, 800235);
    CreateAssetfollowingSFX(46049120, 100, 800235);
    CreateAssetfollowingSFX(46049121, 100, 800235);
    CreateAssetfollowingSFX(46049122, 100, 800235);
    CreateAssetfollowingSFX(46049123, 100, 800235);
    CreateAssetfollowingSFX(46049124, 100, 800235);
    CreateAssetfollowingSFX(46049125, 100, 800235);
    CreateAssetfollowingSFX(46049126, 100, 800235);
    CreateAssetfollowingSFX(46049127, 100, 800235);
    CreateAssetfollowingSFX(46049128, 100, 800235);
    CreateAssetfollowingSFX(46049129, 100, 800235);
    CreateAssetfollowingSFX(46049130, 100, 800235);
    CreateAssetfollowingSFX(46049131, 100, 800235);
    CreateAssetfollowingSFX(46049132, 100, 800235);
    CreateAssetfollowingSFX(46049133, 100, 800235);
    CreateAssetfollowingSFX(46049134, 100, 800235);
    CreateAssetfollowingSFX(46049135, 100, 800061);
    CreateAssetfollowingSFX(46049136, 100, 800061);
    CreateAssetfollowingSFX(46049137, 100, 800190);
    CreateAssetfollowingSFX(46049138, 100, 800190);
    CreateAssetfollowingSFX(46049139, 100, 800190);
    CreateAssetfollowingSFX(46049140, 100, 800190);
    CreateAssetfollowingSFX(46049141, 100, 800190);
    CreateAssetfollowingSFX(46049142, 100, 800190);
    CreateAssetfollowingSFX(46049143, 100, 800190);
    CreateAssetfollowingSFX(46049144, 100, 800190);
    CreateAssetfollowingSFX(46049145, 100, 800190);
    CreateAssetfollowingSFX(46049146, 100, 800190);
    CreateAssetfollowingSFX(46049147, 100, 800190);
    CreateAssetfollowingSFX(46049148, 100, 800190);
    CreateAssetfollowingSFX(46049149, 100, 800190);
    CreateAssetfollowingSFX(46049150, 100, 800190);
    CreateAssetfollowingSFX(46049151, 100, 800190);
    CreateAssetfollowingSFX(46049152, 100, 800190);
    CreateAssetfollowingSFX(46049153, 100, 800060);
    CreateAssetfollowingSFX(46049155, 100, 800060);
    CreateAssetfollowingSFX(46049157, 100, 800060);
    CreateAssetfollowingSFX(46049159, 100, 800060);
    CreateAssetfollowingSFX(46049161, 100, 800060);
    CreateAssetfollowingSFX(46049163, 100, 800060);
    CreateAssetfollowingSFX(46049165, 100, 800060);
    CreateAssetfollowingSFX(46049167, 100, 800060);
    CreateAssetfollowingSFX(46049169, 100, 800060);
});

$Event(46049154, Restart, function() {
    DisableNetworkSync();
    WaitFor(AssetDestroyed(46049154));
    DeleteAssetfollowingSFX(46049155, true);
});

$Event(46049156, Restart, function() {
    DisableNetworkSync();
    WaitFor(AssetDestroyed(46049156));
    DeleteAssetfollowingSFX(46049157, true);
});

$Event(46049158, Restart, function() {
    DisableNetworkSync();
    WaitFor(AssetDestroyed(46049158));
    DeleteAssetfollowingSFX(46049159, true);
});

$Event(46049160, Restart, function() {
    DisableNetworkSync();
    WaitFor(AssetDestroyed(46049160));
    DeleteAssetfollowingSFX(46049161, true);
});

$Event(46049162, Restart, function() {
    DisableNetworkSync();
    WaitFor(AssetDestroyed(46049162));
    DeleteAssetfollowingSFX(46049163, true);
});

$Event(46049164, Restart, function() {
    DisableNetworkSync();
    WaitFor(AssetDestroyed(46049164));
    DeleteAssetfollowingSFX(46049165, true);
});

$Event(46049166, Restart, function() {
    DisableNetworkSync();
    WaitFor(AssetDestroyed(46049166));
    DeleteAssetfollowingSFX(46049167, true);
});

$Event(46049168, Restart, function() {
    DisableNetworkSync();
    WaitFor(AssetDestroyed(46049168));
    DeleteAssetfollowingSFX(46049169, true);
});
