
//const express = require('express');
//const app = express.Router();

const User = require('../models/user.js');

//module.exports = app;

/*app.get('/', (req, res) => {
    res.render('foods/index.ejs', {title: 'Index Page'})
  });*/

  const pantryIndex = (req, res) => {
    res.render('foods/index.ejs', {title: 'Index Page'})
  };

  const addNewItem = (req, res) => {
    res.render('foods/new.ejs', {title: 'Add Item'})
  };

  const createItem = async (req, res) => {
    
    try {  
        const currentUser = await User.findById(req.params.userId)
        currentUser.pantry.push(req.body) // pushing the formData into the user model
        await currentUser.save() // save our edits
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}

const index = async (req, res) => {
    try {

        const currentUser = await User.findById(req.params.userId)
        //const item = currentUser.pantry.id(req.params.itemId)


        if(req.params.userId){
            
            res.render('foods/index.ejs', {
                title: 'My Pantry',
                pantry: currentUser.pantry,
                msg: '',
            })
        } else {
            res.render('foods/index.ejs', {
                title: 'My Pantry',
                msg: 'There are no items in this pantry.',
            })
        }
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}

const show = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const item = currentUser.pantry.id(req.params.itemId)
        console.log(item)
        res.render('foods/show.ejs', {
            title: item.name,
            item,
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}





const deleteItem = async (req, res)=>{
    try {
        console.log('inside delete')
        const currentUser = await User.findById(req.params.userId)
        currentUser.pantry.id(req.params.itemId).deleteOne()
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }

}


const edit = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const item = currentUser.pantry.id(req.params.itemId)
        res.render('foods/edit.ejs', {
            title: item.title,
            item,
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}

const update = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const item = currentUser.pantry.id(req.params.itemId)
        console.log(item)
        item.set(req.body)
        await currentUser.save()

        res.redirect(`/users/${currentUser._id}/foods/${req.params.itemId}`)

    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}

  module.exports = {
    pantryIndex,
    addNewItem,
    createItem,
    index,
    show,
    deleteItem,
    edit,
    update,
  };