const express = require('express')
const router = express.Router()

const user = require('./user.route')
const board = require('./board.route')
const admin = require('./admin.route')


router.get('/',(req,res)=>{
    const {token} = req.cookies
    const cookies = token
                    .split(' ')
                    .map(v=>v.split('='))
                    .reduce((acc,val)=>{
                        const [k,v] = val
                        acc[k]=v
                        return acc
                    }, {})

    console.log('token::::',cookies)
    res.render('index.html',{token:cookies.id})
})
router.use('/user', user)
router.use('/board', board)
router.use('/admin', admin)


module.exports = router
