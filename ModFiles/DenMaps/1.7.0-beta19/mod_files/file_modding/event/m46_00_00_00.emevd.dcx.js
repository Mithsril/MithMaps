// ==EMEVD==
// @docs    er-common.emedf.json
// @compress    DCX_KRAK
// @game    Sekiro
// @string    "N:\\GR\\data\\Param\\event\\common_func.emevd\u0000N:\\GR\\data\\Param\\event\\common_macro.emevd\u0000\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82]
// @version    3.6.1
// ==/EMEVD==

// コンストラクタ -- constructor
$Event(0, Default, function() {
    RegisterBonfire(46000000, 46001950, 0, 0, 0, 0);
    $InitializeEvent(0, 45002200);
    $InitializeEvent(0, 45002210);
    $InitializeEvent(0, 45002220);
    $InitializeEvent(0, 45002260);
    $InitializeEvent(0, 45002261);
    $InitializeEvent(0, 45002262);
    $InitializeEvent(0, 45002263);
    //starting arrows
    $InitializeCommonEvent(0, 46990051, 4500000, 4500001, 4500002, 0, 1.65);
    $InitializeCommonEvent(0, 46990051, 4500003, 4500004, 4500005, 1, 1);
    //teleporters
    $InitializeCommonEvent(0, 46990065, 4500010, 4500011, 4500012, 0, 0, 0);
    $InitializeCommonEvent(0, 46990065, 4500020, 4500021, 4500022, 0, 0, 0);
    $InitializeCommonEvent(0, 46990065, 4500030, 4500031, 4500032, 0, 0, 0);
    $InitializeCommonEvent(0, 46990065, 4500040, 4500041, 4500042, 0, 0, 0);
    InitializeCommonEvent(0, 46990065, 4500050, 4500051, 4500052, 0, 0, 0);
    $InitializeCommonEvent(0, 46990065, 4500060, 4500061, 4500062, 0, 0, 0);
    //vfx
    $InitializeCommonEvent(0, 46990070, 4500013, 4500014);
    $InitializeCommonEvent(0, 46990070, 4500023, 4500014);
    $InitializeCommonEvent(0, 46990070, 4500033, 4500014);
    $InitializeCommonEvent(0, 46990069, 4500043, 4500014);
    $InitializeCommonEvent(0, 46990069, 4500053, 4500014);
    $InitializeCommonEvent(0, 46990069, 4500063, 4500014);
    
    GotoIf(L0, HasArenaMatchType(ArenaMatchType.Duel, false));
    GotoIf(L0, HasArenaMatchType(ArenaMatchType.Duel, true));
    GotoIf(L1, HasArenaMatchType(ArenaMatchType.TwoPlayerBrawl, false));
    GotoIf(L1, HasArenaMatchType(ArenaMatchType.TwoPlayerBrawl, true));
    GotoIf(L2, HasArenaMatchType(ArenaMatchType.FourPlayerBrawl, false));
    GotoIf(L2, HasArenaMatchType(ArenaMatchType.FourPlayerBrawl, true));
    GotoIf(L3, HasArenaMatchType(ArenaMatchType.SixPlayerBrawl, false));
    GotoIf(L3, HasArenaMatchType(ArenaMatchType.SixPlayerBrawl, true));
    GotoIf(L4, HasArenaMatchType(ArenaMatchType.OneVersusOne, false));
    GotoIf(L4, HasArenaMatchType(ArenaMatchType.OneVersusOne, true));
    GotoIf(L5, HasArenaMatchType(ArenaMatchType.TwoVersusTwo, false));
    GotoIf(L5, HasArenaMatchType(ArenaMatchType.TwoVersusTwo, true));
    GotoIf(L6, HasArenaMatchType(ArenaMatchType.ThreeVersusThree, false));
    GotoIf(L6, HasArenaMatchType(ArenaMatchType.ThreeVersusThree, true));
L0:
    $InitializeCommonEvent(0, 98005100, ArenaMatchType.Duel, 45002300, 88000, 88020);
    $InitializeCommonEvent(0, 98005110, 45002300);
    $InitializeCommonEvent(0, 98005121, 45002300);
    EndEvent();
L1:
    $InitializeCommonEvent(0, 98005100, ArenaMatchType.TwoPlayerBrawl, 45002300, 88001, 88021);
    Goto(L9);
L2:
    $InitializeCommonEvent(0, 98005100, ArenaMatchType.FourPlayerBrawl, 45002300, 88002, 88022);
    Goto(L9);
L3:
    $InitializeCommonEvent(0, 98005100, ArenaMatchType.SixPlayerBrawl, 45002300, 88003, 88023);
    Goto(L9);
L4:
    $InitializeCommonEvent(0, 98005100, ArenaMatchType.OneVersusOne, 45002300, 88004, 88024);
    Goto(L9);
L5:
    $InitializeCommonEvent(0, 98005100, ArenaMatchType.TwoVersusTwo, 45002300, 88005, 88025);
    Goto(L9);
L6:
    $InitializeCommonEvent(0, 98005100, ArenaMatchType.ThreeVersusThree, 45002300, 88006, 88026);
    Goto(L9);
L9:
    $InitializeCommonEvent(0, 98005120, 45002300);
});

// PC死亡復活時_バディ召喚済みフラグ折る -- When PC dies and revives_Fold buddy summoned flag
$Event(45002200, Default, function() {
    DisableNetworkSync();
    EndIf(HasArenaMatchType(ArenaMatchType.Duel, false));
    EndIf(HasArenaMatchType(ArenaMatchType.Duel, true));
    EndIf(HasArenaMatchType(ArenaMatchType.TwoPlayerBrawl, false));
    EndIf(HasArenaMatchType(ArenaMatchType.FourPlayerBrawl, false));
    EndIf(HasArenaMatchType(ArenaMatchType.SixPlayerBrawl, false));
    EndIf(HasArenaMatchType(ArenaMatchType.OneVersusOne, false));
    EndIf(HasArenaMatchType(ArenaMatchType.TwoVersusTwo, false));
    EndIf(HasArenaMatchType(ArenaMatchType.ThreeVersusThree, false));
    WaitFor(PlayerRespawnedInArena());
    SetEventFlagID(45000110, OFF);
    WaitFixedTimeFrames(1);
    RestartEvent();
});

// PC死亡時_バディを帰還させる -- When PC dies_Return buddy
$Event(45002210, Default, function() {
    EndIf(HasArenaMatchType(ArenaMatchType.Duel, false));
    EndIf(HasArenaMatchType(ArenaMatchType.TwoPlayerBrawl, false));
    EndIf(HasArenaMatchType(ArenaMatchType.FourPlayerBrawl, false));
    EndIf(HasArenaMatchType(ArenaMatchType.SixPlayerBrawl, false));
    EndIf(HasArenaMatchType(ArenaMatchType.OneVersusOne, false));
    EndIf(HasArenaMatchType(ArenaMatchType.TwoVersusTwo, false));
    EndIf(HasArenaMatchType(ArenaMatchType.ThreeVersusThree, false));
    DisableNetworkSync();
    WaitFor(CharacterDead(10000));
    SetSpEffect(10000, 202);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

// バディ召喚無効化 -- Buddy summon disabled
$Event(45002220, Default, function() {
    DisableNetworkSync();
    EndIf(HasArenaMatchType(ArenaMatchType.Duel, true));
    EndIf(HasArenaMatchType(ArenaMatchType.TwoPlayerBrawl, true));
    EndIf(HasArenaMatchType(ArenaMatchType.FourPlayerBrawl, true));
    EndIf(HasArenaMatchType(ArenaMatchType.SixPlayerBrawl, true));
    EndIf(HasArenaMatchType(ArenaMatchType.OneVersusOne, true));
    EndIf(HasArenaMatchType(ArenaMatchType.TwoVersusTwo, true));
    EndIf(HasArenaMatchType(ArenaMatchType.ThreeVersusThree, true));
    SetEventFlagID(45000110, ON);
    DisableCharacter(45000110);
});

// 位置非表示設定 -- Location hidden setting
$Event(45002260, Restart, function() {
    EndIf(!PlayerInMap(45, 0, 0, 0));
    SetPlayerPositionDisplay(Disabled, true, 11, 0, 0, 0, -359.44, 32.74, -492.72);
});

$Event(45002261, Restart, function() {
    DisableNetworkSync();
    SetCurrentTime(12, 0, 0, false, false, false, 0, 0, 0);
    FreezeTime(true);
});

$Event(45002262, Restart, function()
{
    DisableNetworkSync();
    ChangeWeather(Weather.None, 0, true);
});

//disable objects in arena match 
$Event(45002263, Restart, function() {
    DisableNetworkSync();
    if (ArenaMatchReadyState(true)){
        DisableAsset(4500000);
        DisableAsset(4500001);
        DisableAsset(4500002);
        DisableAsset(4500003);
    }
});
