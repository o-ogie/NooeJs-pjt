const { urlencoded } = require("body-parser");
const userService = require("../services/user.service")


exports.getLogin = (req,res) => {
    res.render("user/login.html")
}

exports.postLogin = async (req,res,next) => {
    const {user_id,user_pw} = req.body
    const user = await userService.getUser({user_id,user_pw})
    if(user === undefined) return next(new Error("아이디와 패스워드가 일치하지 않습니다."))
    const token = {
        id : user.user_id,
        nickname: encodeURI(user.nickname)
    }
    const cookies = JSON.stringify(token)

    res.setHeader("Set-Cookie",`token= ${cookies}; path=/;`)
    res.redirect(`/`)
}

exports.getJoin = (req,res) => {
    res.render("user/join.html")
}

exports.postJoin = async (req,res) => {
    const {user_id,user_pw,user_name,nickname,birth,gender,phone,tel} = req.body;
    const user = await userService.getUserJoin({user_id,user_pw,user_name,nickname,birth,gender,phone,tel})
    console.log('req.body:::::::::::',req.body)
    console.log('user:::::::::::::::::',user)
    res.redirect("/user/login")   
}

exports.getProfile = async (req,res) => {

    const cookies = JSON.parse(req.cookies.token)
    const [user] = await userService.getUserProfile({id:cookies.id})
    res.render("user/profile.html",{user})
}

exports.logout = (req,res)=>{
    res.setHeader('Set-Cookie',`token=; Path=/;`)
    res.redirect('/')
    res.send('/user/logout')
}