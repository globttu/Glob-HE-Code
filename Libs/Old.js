let storage={}
let blocks;
let pilotable;
nonpilotable = [
    "Dirt"
]
blocks = {
    ["0,0,0"]: {id:"Concrete"},
    ["0,0,1"]: {id:"Concrete"},
    ["1,0,0"]: {id:"Concrete"},
    ["1,0,1"]: {id:"Concrete"},
    ["0,0,2"]: {id:"Concrete"},
    ["2,0,0"]: {id:"Concrete"},
    ["2,1,0"]: {id:"Concrete"},
    ["2,2,0"]: {id:"Concrete"},
    ["5,5,5"]: {id:"Concrete"},
};

const x_ajustment_value=3
const y_ajustment_value=0
const z_ajustment_value=1
let player_pos=[0,1,0]
function get_data(x,y,z){
    let position_string=`${x},${y},${z}`
    let block_data=blocks[position_string]
    //console.log(position_string,"",block_data)
    if (block_data && ! nonpilotable.includes(position_string)){
        console.log(position_string,true,block_data)

    }
}
function get_block_around_player(pos,radius){

    let target_number=radius //the size of box; if 5 then 5x5x5 box
    let index_start=1
    let x_=pos[0]|1

    let y_=pos[1]|1
    let z_=pos[2]|1
    let x,y,z;
    let incrementing_mode="x"
    let incremented=0
    let incrementing_target=3
    Array(target_number).fill(1).forEach((_,y)=>{
        Array(target_number+x_ajustment_value).fill(1).forEach((_,x)=>{
            if (incremented>=-incrementing_target){
                if (incrementing_mode==="x"){
                   // x=x+1
                   // x=z-1
                    incremented=incremented+1
                }
                if (incrementing_mode==="z"){
                   // z=z-1
                    incremented=incremented+1
                }
            } else {
                if (incrementing_mode==="x"){
                   // x=x-1
                    incrementing_mode="z"
                    incremented=0
                }
            }
            Array(target_number+z_ajustment_value).fill(1).forEach((_,z)=>{

                //x=Number(x)+Number(x_)
                y=Number(y)+Number(y_)
                z=Number(z)+Number(z_)
               console.log("x",x,y,z,pos)
                get_data(x,y,z)
            })
        })


    })
}
get_block_around_player([1,1,0],2)
function start() {

}
