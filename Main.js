
let blocks,computerblocks,nonpilotable,pilotable,storage;
storage = {};
nonpilotable= ["Dirt"];
computerblocks=["jukebox"]

blocks = {
    ["0,0,0"]: { id: "Concrete" },
    ["0,0,1"]: { id: "Concrete" },
    ["1,0,0"]: { id: "Concrete" },
    ["1,0,1"]: { id: "Concrete" },
    ["0,0,2"]: { id: "Concrete" },
    ["2,0,0"]: { id: "Concrete" },
    ["2,1,0"]: { id: "Concrete" },
    ["2,2,0"]: { id: "Concrete" },
    ["5,5,5"]: { id: "Concrete" },
};

const x_ajustment_value = 3;
const y_ajustment_value = 0;
const z_ajustment_value = 1;

let player_pos = [0, 1, 0];


function get_data(x, y, z) {
    let position_string = `${x},${y},${z}`;
    let block_data = blocks[position_string];
    if (block_data && !nonpilotable.includes(block_data.id)) {
        console.log(position_string, true, block_data);
        return [[x,y,z], true, block_data];
    } else {
        return [[x,y,z], false, block_data];
    }
}
function get_touching_blocks(x, y, z) {
    const touching = [];
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {
                if (dx === 0 && dy === 0 && dz === 0) continue; // Skip center block
                touching.push([x + dx, y + dy, z + dz]);
            }
        }
    }
    return touching;
}

function scan_touching_blocks(x,y,z){
    let touching_blocks=get_touching_blocks(x,y,z);
    let output=Array(0);
    touching_blocks.forEach(touching_block=>{
        let tb_x=touching_block[0]
        let tb_y=touching_block[1]
        let tb_z=touching_block[2]

        let result=get_touching_blocks(tb_x,tb_y,tb_z);

    })
}


function get_block_around_player(pos, radius) {
    let output=Array(0);

    let [px, py, pz] = pos;
    console.log(px,py,pz)
    for (let y = -radius; y <= radius; y++) {
        for (let x = -radius; x <= radius + x_ajustment_value; x++) {
            for (let z = -radius; z <= radius + z_ajustment_value; z++) {
                let cx = px + x;
                let cy = py + y + y_ajustment_value;
                let cz = pz + z;
               let result= get_data(cx, cy, cz);
              // console.log(result);

               if (result[1]===true){
                   let formated={["id"]: result[2].id, x,y,z}
                   formated.x=px-[result[0][0]]
                   formated.y=py-[result[0][1]]
                   formated.z=pz-[result[0][2]]
                   output[output.length]=formated

               }
            }
        }
    }
    return output;
}



let final=get_block_around_player([5, 4, 3], 3);
console.log(final);