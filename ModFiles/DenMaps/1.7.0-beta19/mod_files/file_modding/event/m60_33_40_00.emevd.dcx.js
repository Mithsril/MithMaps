// ==EMEVD==
// @docs    er-common.emedf.json
// @compress    DCX_KRAK
// @game    Sekiro
// @string    "N:\\GR\\data\\Param\\event\\common_func.emevd\u0000N:\\GR\\data\\Param\\event\\common_macro.emevd\u0000N:\\GR\\data\\Param\\event\\m60.emevd\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82,166]
// @version    3.6.1
// ==/EMEVD==

// コンストラクタ -- constructor
$Event(0, Default, function() {
    RegisterBonfire(1033400000, 1033401950, 0, 0, 0, 5);
    $InitializeEvent(0, 1033402510);
    $InitializeCommonEvent(0, 90005501, 1033400510, 1033400511, 0, 1033401510, 1033401511, 1033401512, 1033400512);
    $InitializeEvent(0, 1033402610, 1033400610, 1033420610, 1035410610, 1033400615);
    $InitializeEvent(0, 1034432613, 1033400610, 1033400610);
    $InitializeEvent(0, 1034432614, 1033400610, 1033400610);
    $InitializeEvent(0, 1033402611);
    $InitializeEvent(0, 1034432612);
    $InitializeCommonEvent(0, 90005201, 1033400610, 30006, 20006, 0, 0, 0, 0, 0, 0);
    $InitializeCommonEvent(0, 90005300, 1033400610, 1033400610, 0, 0, 0);
    WarpPlayer(45, 0, 0, 0, 0, 0);
});

// プリコンストラクタ -- preconstructor
$Event(50, Default, function() {
    $InitializeEvent(0, 1033400519);
});

// コンストラクタ_LOD2 -- constructor_LOD2
$Event(200, Default, function() {
    $InitializeEvent(0, 1033402615);
});

// エレベータイベント起動 -- Elevator event activation
$Event(1033402510, Restart, function() {
    $InitializeCommonEvent(0, 90005500, 1033400510, 1033400511, 0, 1033401510, 1033401511, 1033403511, 1033401512, 1033403512, 1033402511, 1033402512, 1033400512, 1033400513, 0);
});

// エレベーター初期フラグ -- Elevator initial flag
$Event(1033400519, Default, function() {
    EndIf(ThisEventSlot());
    SetEventFlagID(1033400510, OFF);
    SetThisEventSlot(ON);
});

// 魔術師の塔イベント扉 -- Magician's Tower Event Door
$Event(1033402610, Restart, function(eventFlagId, eventFlagId2, eventFlagId3, eventFlagId4) {
    if (EventFlag(eventFlagId4)) {
        DisableAsset(1033401610);
        DeleteAssetfollowingSFX(1033401610, true);
        EndEvent();
    }
L0:
    DeleteAssetfollowingSFX(1033401610, true);
    CreateAssetfollowingSFX(1033401610, 200, 1500);
    WaitFor(EventFlag(eventFlagId) && EventFlag(eventFlagId2) && EventFlag(eventFlagId3));
    SetEventFlagID(eventFlagId4, ON);
    PlaySE(1033401610, SoundType.SFX, 1500);
    DisableAsset(1033401610);
    DeleteAssetfollowingSFX(1033401610, true);
    EndEvent();
});

// 魔術師塔イベント_霧壁エラーメッセージ -- Magician Tower Event_Fog Wall Error Message
$Event(1033402611, Restart, function() {
    DisableNetworkSync();
    EndIf(EventFlag(1033400615));
    WaitFor(ActionButtonInArea(9320, 1033401610) || EventFlag(1033400615));
    EndIf(EventFlag(1033400615));
    DisplayGenericDialog(20200, PromptType.OKCANCEL, NumberofOptions.NoButtons, 1033401610, 3);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

// 魔術師塔イベント_ヒントテキスト表示 -- Magician Tower Event_Hint text display
$Event(1034432612, Restart, function() {
    DisableNetworkSync();
    WaitFor(ActionButtonInArea(9210, 1034431611));
    DisplayGenericDialog(60026, PromptType.OKCANCEL, NumberofOptions.NoButtons, 1034431611, 3);
    if (PlayerIsInOwnWorld()) {
        SetNetworkconnectedEventFlagID(1034432616, ON);
    }
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

// 魔術師塔イベント_カメ出現 -- Magician Tower Event_Turtle Appearance
$Event(1034432613, Restart, function(eventFlagId, chrEntityId) {
    EndIf(EventFlag(eventFlagId));
    DisableCharacter(chrEntityId);
    DisableCharacterCollision(chrEntityId);
    if (!PlayerIsInOwnWorld()) {
        EnableCharacterInvincibility(chrEntityId);
    }
    WaitFor(EventFlag(1034432616));
    EnableCharacter(chrEntityId);
    EnableCharacterCollision(chrEntityId);
    EnableCharacterImmortality(chrEntityId);
    DisableCharacterHPBarDisplay(chrEntityId);
});

// 魔術師塔イベント_カメ死亡演出 -- Magician Tower Event_Turtle Death Production
$Event(1034432614, Restart, function(eventFlagId, entityId) {
    EndIf(EventFlag(eventFlagId));
    WaitFor(HasDamageType(entityId, 10000, DamageType.Unspecified));
    ForceAnimationPlayback(entityId, 20008, false, false, false);
    SetEventFlagID(eventFlagId, ON);
});

// 魔術師の塔_扉解除ダイアログ -- Magician's Tower_Door release dialog
$Event(1033402615, Restart, function() {
    EndIf(EventFlag(1033400615));
    WaitFor(EventFlag(1033400610) && EventFlag(1033420610) && EventFlag(1035410610));
    DisplayGenericDialog(20210, PromptType.OKCANCEL, NumberofOptions.NoButtons, 0, 5);
});


