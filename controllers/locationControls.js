const express = require('express')
const {Users, Locations} = require('../models')


exports.createLocations = async(req, res) => {
    let {latitude, longitude, UserId, user} = req.body

    const LocationsExists = await Locations.findOne({where: {UserId: UserId}})

    if(!LocationsExists){
        Locations.create({
            latitude,
            longitude,
            UserId,
            user
        });
        res.json({
            status: "Locations successfully created"
        })
    }else{
        Locations.update({
        latitude,
        longitude
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
        attributes: ['id','latitude', 'longitude', 'UserId', 'user']
    }).then(locations=>{
        res.json({
            message: "all locations listed",
            locations: locations
        })
    })
}

exports.updateLocation = async(req, res) => {
    const {latitude, longitude} = req.body
  const updatedLocation = await Locations.update({
        latitude,
        longitude
    }, {where:{
        UserId: 7
    }
})
res.json({
    location:updatedLocation
})
}