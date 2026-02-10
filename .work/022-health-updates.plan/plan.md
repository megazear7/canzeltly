Move health from the game object to a new "health" affect. Update game over check and other code references to use this health affect instead of updating game object properties.
Ghosts and voids do not do damage anymore because the damage is only applied during the collision.

There should be an "overlapping damage" affect.
This affect has the following properties:

Damage (default 0)
Attack speed (integer in ms)
Last attack (unix timestamp)
Makes attacks (boolean)
Receives attacks (boolean)
Any object with this affect and the makes attack property is true, does damage to other objects with this affect that have the receives attacks property as true.
The damage is subtracted from the other objects health.
The last attack is updated to the current timestamp.
The damage is skipped if the last attack was more recent than the attack speed.
Refactor elastic collision and damage collision affects

Remove the damage collision affect
Update the elastic collision affect to have a damage property that is applied to the other object directly in this collision instead of setting properties for the other affect to apply the damage.
update the elastic collision to have properties like the overlapping damage affect:

Damage
Attack speed
Last attack
Makes attacks
Receives attacks
Update the existing object types:

Use these new properties with a attack speed of 1000 ms.
Only the hero receives damage