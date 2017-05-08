import * as THREE from "three";

export const ROOM_SIZE = 20;
export const WALL_HEIGHT = 8;
export const WALL_THICKNESS = 0.5;

export class Room {
    constructor(row, column, walls, floorModel, wallModel) {
        this.row = row;
        this.column = column;
        this.walls = walls;

        // calc origin of the room
        let origin = new THREE.Vector3(column * ROOM_SIZE, 0, row * ROOM_SIZE);
        this.origin = origin;

        // make floor
        let floor = floorModel.clone();
        floor.rotation.x =  -Math.PI / 2;
        floor.position.x = origin.x + ROOM_SIZE / 2;
        floor.position.z = origin.z + ROOM_SIZE / 2;
        this.floor = floor;

        // make wall if needed
        for (let i = 0; i < 4; i++) {
            if (this.walls[i] === null) {
                let wall = wallModel.clone();
                let wallGroup = new THREE.Group();
                wall.add(wall);

                wallGroup.position.y = origin.y + WALL_HEIGHT / 2;
                switch (i) {
                    // north
                    case 0:
                        wallGroup.position.x = origin.x + ROOM_SIZE / 2;
                        wallGroup.position.z = origin.z;
                        break;
                    // south
                    case 1:
                        wallGroup.position.x = origin.x + ROOM_SIZE / 2;
                        wallGroup.position.z = origin.z + ROOM_SIZE;
                        break;
                    // west
                    case 2:
                        wallGroup.rotation.y = Math.PI / 2;
                        wallGroup.position.x = origin.x;
                        wallGroup.position.z = origin.z + ROOM_SIZE / 2;
                        break;
                    // east
                    case 3:
                        wallGroup.rotation.y = Math.PI / 2;
                        wallGroup.position.x = origin.x + ROOM_SIZE;
                        wallGroup.position.z = origin.z + ROOM_SIZE / 2;
                        break;
                }

                this.walls[i] = wall;
            }
        }
    }
}
