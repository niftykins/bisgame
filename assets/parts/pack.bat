:: setup
set c=gm convert -background none

:: combat buttons, base: 40x40 x5
set d=buttons
%c% +append %d%\icon_sword.png %d%\icon_magic.png %d%\icon_defend.png %d%\icon_item.png %d%\icon_run.png %d%\icon_close.png ..\combat_buttons.png

:: will exploration sprites, base: 53x80 x4
set d=will\explore
%c% -append %d%\will_idle.png %d%\will_walk.png ..\will.png

:: will combat sprites, base: 100x100 x4
set d=will\combat
%c% -append %d%\combat_will_idle.png %d%\combat_will_sword_swing.png %d%\combat_will_magic_cast.png %d%\combat_will_hurt.png %d%\combat_will_consume.png %d%\combat_will_defend.png %d%\combat_will_die.png ..\will_combat.png

:: will's sword 1, base: 100x100 x4
set d=swords
%c% -append %d%\combat_sword_1_idle.png %d%\combat_sword_1_swing.png %d%\combat_sword_1_cast.png %d%\combat_sword_1_hurt.png %d%\combat_sword_1_consume.png %d%\combat_sword_1_defend.png %d%\combat_sword_1_die.png ..\combat_sword_1.png

:: will's magic fire, base: 100x100 x4
set d=spells\fire
%c% -append %d%\combat_magic_fire_1_cast.png %d%\combat_magic_fire_1_travel.png %d%\combat_magic_fire_1_hit.png ..\combat_magic_fire_1.png

:: items
set d=items
:: potions
%c% +append %d%\potion_health.png %d%\potion_mana.png %d%\potion_rejuvenation.png %d%\ROW_POTION.png
:: magic
%c% +append %d%\item_fire_sphere.png %d%\item_ice_sphere.png %d%\item_dark_sphere.png %d%\item_earth_sphere.png %d%\item_lightning_sphere.png %d%\ROW_MAGIC.png
:: whole
%c% -append %d%\ROW_POTION.png %d%\ROW_MAGIC.png ..\items.png