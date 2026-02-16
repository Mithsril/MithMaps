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
    //colo bonfire
    RegisterBonfire(45020000, 45021950, 0, 0, 0, 0);
    $InitializeEvent(0, 45022200);
    $InitializeEvent(0, 45022210);
    $InitializeEvent(0, 45022220);
    $InitializeEvent(0, 45022260);
    $InitializeEvent(0, 45022261);
    $InitializeEvent(0, 45022262);
    $InitializeEvent(0, 45022263);
    //---start signal---
    //how the start signals work:
    //event id,
    //triggerAsset (action button entityid asset),
    //team source (c1000, object type: enemy) above bullet source at 30.075Y,
    //bullet source (object type: other) below team source 30.00Y,
    //is it a dueling arena? 0: false / 1: true
    $InitializeCommonEvent(0, 46990051, 4520000, 4520001, 4520002, 0, 2.5);
    $InitializeCommonEvent(0, 46990051, 4520003, 4520004, 4520005, 1, 1.7);
    //warps 
    $InitializeCommonEvent(0, 46990065, 4520006, 4520007, 4520008, 0, 0, 0);
    $InitializeCommonEvent(0, 46990065, 4520010, 4520011, 4520012, 0, 0, 0);
    $InitializeCommonEvent(0, 46990065, 4520020, 4520021, 4520022, 0, 0, 0);
    $InitializeCommonEvent(0, 46990065, 4520030, 4520031, 4520032, 0, 0, 0);
    $InitializeCommonEvent(0, 46990065, 4520040, 4520041, 4520042, 0, 0, 0);
    $InitializeCommonEvent(0, 46990065, 4520050, 4520051, 4520052, 0, 0, 0);
    //vfx
    $InitializeCommonEvent(0, 46990069, 4520009, 4520014);
    $InitializeCommonEvent(0, 46990069, 4520013, 4520014);
    $InitializeCommonEvent(0, 46990069, 4520023, 4520014);
    $InitializeCommonEvent(0, 46990070, 4520033, 4520014);
    $InitializeCommonEvent(0, 46990070, 4520043, 4520014);
    $InitializeCommonEvent(0, 46990070, 4520053, 4520014);
    
    
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
    $InitializeCommonEvent(0, 98005100, ArenaMatchType.Duel, 45022300, 88000, 88020);
    $InitializeCommonEvent(0, 98005110, 45022300);
    $InitializeCommonEvent(0, 98005121, 45022300);
    EndEvent();
L1:
    $InitializeCommonEvent(0, 98005100, ArenaMatchType.TwoPlayerBrawl, 45022300, 88001, 88021);
    Goto(L9);
L2:
    $InitializeCommonEvent(0, 98005100, ArenaMatchType.FourPlayerBrawl, 45022300, 88002, 88022);
    Goto(L9);
L3:
    $InitializeCommonEvent(0, 98005100, ArenaMatchType.SixPlayerBrawl, 45022300, 88003, 88023);
    Goto(L9);
L4:
    $InitializeCommonEvent(0, 98005100, ArenaMatchType.OneVersusOne, 45022300, 88004, 88024);
    Goto(L9);
L5:
    $InitializeCommonEvent(0, 98005100, ArenaMatchType.TwoVersusTwo, 45022300, 88005, 88025);
    Goto(L9);
L6:
    $InitializeCommonEvent(0, 98005100, ArenaMatchType.ThreeVersusThree, 45022300, 88006, 88026);
    Goto(L9);
L9:
    $InitializeCommonEvent(0, 98005120, 45022300);
});

// PC死亡復活時_バディ召喚済みフラグ折る -- When PC dies and revives_Fold buddy summoned flag
$Event(45022200, Default, function() {
    DisableNetworkSync();
    EndIf(HasArenaMatchType(ArenaMatchType.Duel, false));
    EndIf(HasArenaMatchType(ArenaMatchType.Duel, true));
    EndIf(HasArenaMatchType(ArenaMatchType.Duel, false));
    EndIf(HasArenaMatchType(ArenaMatchType.TwoPlayerBrawl, false));
    EndIf(HasArenaMatchType(ArenaMatchType.FourPlayerBrawl, false));
    EndIf(HasArenaMatchType(ArenaMatchType.SixPlayerBrawl, false));
    EndIf(HasArenaMatchType(ArenaMatchType.OneVersusOne, false));
    EndIf(HasArenaMatchType(ArenaMatchType.TwoVersusTwo, false));
    EndIf(HasArenaMatchType(ArenaMatchType.ThreeVersusThree, false));
    WaitFor(PlayerRespawnedInArena());
    SetEventFlagID(45020110, OFF);
    WaitFixedTimeFrames(1);
    RestartEvent();
});

// PC死亡時_バディを帰還させる -- When PC dies_Return buddy
$Event(45022210, Default, function() {
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
$Event(45022220, Default, function() {
    DisableNetworkSync();
    EndIf(HasArenaMatchType(ArenaMatchType.Duel, true));
    EndIf(HasArenaMatchType(ArenaMatchType.TwoPlayerBrawl, true));
    EndIf(HasArenaMatchType(ArenaMatchType.FourPlayerBrawl, true));
    EndIf(HasArenaMatchType(ArenaMatchType.SixPlayerBrawl, true));
    EndIf(HasArenaMatchType(ArenaMatchType.OneVersusOne, true));
    EndIf(HasArenaMatchType(ArenaMatchType.TwoVersusTwo, true));
    EndIf(HasArenaMatchType(ArenaMatchType.ThreeVersusThree, true));
    SetEventFlagID(45020110, ON);
    DisableCharacter(45020110);
});

// 位置非表示設定 -- Location hidden setting
$Event(45022260, Restart, function() {
    EndIf(!PlayerInMap(45, 2, 0, 0));
    SetPlayerPositionDisplay(Disabled, true, 60, 42, 40, 0, -24.47, 208.82, -66.69);
});

$Event(45022261, Restart, function(){
    DisableNetworkSync();
    SetCurrentTime(12, 0, 0, false, false, false, 0, 0, 0);
    FreezeTime(true);
});

$Event(45022262, Restart, function(){
    DisableNetworkSync();
    ChangeWeather(Weather.Snow, 0, true);
});

//disable objects in arena match
$Event(45022263, Restart, function(){
    DisableNetworkSync();
    if (ArenaMatchReadyState(true)){    
        DisableAsset(11101760);
        DisableAsset(11101761);
        DisableAsset(45021950);
        DisableCharacter(45020950);
        DisableCharacterCollision(45020950);
    }
});
