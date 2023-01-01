const express = require('express')
const {Users, Locations} = require('../models')

exports.createLocations = async(req, res) => {
    let {latitude, longitude,direction, UserId, user} = req.body

    const LocationsExists = await Locations.findOne({where: {UserId: UserId}})

    if(!LocationsExists){
        Locations.create({
            latitude,
            longitude,
            direction,
            UserId,
            user
        });
        res.json({
            status: "Locations successfully created"
        })
    }else{
        Locations.update({
        latitude,
        longitude,
        direction
    }, {where:{
        UserId: UserId
    }});
    res.json({
        status: "Locations successfully updated"
    })
    }
   
}


exports.getLocations = (req, res) => {
    Locations.findAll({
        attributes: ['id','latitude', 'longitude','direction', 'UserId', 'user']
    }).then(locations=>{
        res.json({
            message: "all locations listed",
            locations: locations
        })
    })
}

exports.updateLocation = async(io, msg) => {
    const {latitude, longitude,direction, id} = msg
    const newLocations = await Locations.update({
        latitude,
        longitude,
        direction,
    }, {where:{
        UserId: id
    }
}).then((res)=>{
    res.json({
        newLocations
    }).catch(err=>{
        console.log(err)
    })
})

}

exports.locations = (io)=>{
     Locations.findAll({
        attributes: ['id','latitude', 'longitude', 'direction', 'UserId', 'user']
    }).then(res=>{
            io.emit('receive_locations', res);
    }).catch((err)=>{
        console.log(err)
    })
}
