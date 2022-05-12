const fs = require('fs')
const db = require('../config/db');
const User = require("../models/index").User;
const bcrypt = require('bcrypt')
const { generateToken } = require ('../middleware/auth.js');
const { error } = require('console');

exports.getUser = async (req, res) => {
    return User.findAll().then(users=> {
        res.status(200).send({
            status : "SUCCES",
            data: users
        })
    }).catch(e => {
        console.log(e)
        res.status(500).send({
            status : "FAIL",
            message : 'INTERNAL SERVER ERROR'
        })
    })
}

exports.postUser = async (req, res) => {
    const body = req.body;
    const email = body.email;
    const full_name = body.full_name;
    const username = body.username;
    const password = body.password;
    const profile_image_url = body.profile_image_url;
    const age = body.age;
    const phone_number = body.phone_number;

    return User.create({
        email: email,
        full_name: full_name,
        username: username,
        password: password,
        profile_image_url: profile_image_url,
        age: age,
        phone_number: phone_number

    })
    .then(user => {
        res.status(200).send({
           status : "SUCCESS",
           message : "User berhasil dibuat",
           data : user
        })
    }).catch(e => {
        console.log(e)
        res.status(500).send({
            status : "FAIL",
            message : "Gagal membuat user"
        })
    })
}
exports.signUp = async(req, res) => {
    const body = req.body;
    const full_name = body.full_name;
    const email = body.email;
    const username = body.username;
    const password = body.password;
    const profile_image_url = body.profile_image_url;
    const age = body.age;
    const phone_number = body.phone_number;

    return User.findOne({
        where: {
        username : username,
        email: email,

        },
    }).then((user) => {
        if (user) {
            return res.status(400).send({
                message: "Email already Exist",
            });
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        
        return User.create({
                full_name : full_name,
                email: email,
                username : username,
                password: hash,
                profile_image_url : profile_image_url,
                age : age,
                phone_number : phone_number,
            })
            .then((user) => {
                const token = generateToken({
                    id: user.id,
                    full_name: user.full_name,
                    username: user.username,
                });
                res.status(200).send({
                    status: "SUKSES",
                    message: "SUCCES ADD USER",
                    token: token,
                });
            })
            .catch((e) => {
                console.log(e);
                res.status(400).send({
                    status : "FAIL",
                    message : "Gagal membuat user"
                });
            });
    }).catch((e) => {
        console.log(e);
        res.status(400).send({
            status : "FAIL",
            message : "Gagal membuat user"
        });
});
};

exports.signIn = async(req, res) => {
    const body = req.body;
    const username = body.username;
    const password = body.password;

    return User.findOne({
            where: {
                username: username,
            },
        })
        .then(user => {
            if (!user) {
                return res.status(400).send({
                    message: "Email Not Found please Sign UP",
                });
            }

            const isValid = bcrypt.compareSync(password, user.password);
            if (!isValid) {
                return res.status(400).send({
                    message: "email and password not match",
                });
            }
            const token = generateToken({
                id: user.id,
                full_name: user.full_name,
                username: user.username,
            });
            res.status(200).send({
                status: "SUKSES",
                token: token,
            });
        })
        .catch((e) => {
            console.log(e);
            res.status(400).send({
                status : "FAIL",
                message : "Gagal login"
        });
});
}

exports.updateUser = async (req, res) => {
    const id = req.params.userId;
    const full_name = req.body.full_name;
    const email = req.body.email;
    const username = req.body.username;
    const profile_image_url = req.body.profile_image_url;
    const age = req.body.age;
    const phone_number = req.body.phone_number;
    const dataUser = {
        full_name,
        email,
        username,
        profile_image_url,
        age,
        phone_number,
      };
      await User.update(dataUser,
          { where: { id: req.params.id },
          returning : true,
        })
        .then((user) => {
            res.status(200).json({
                user: user[1]
            })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "INTERNAL SERVER",
                error: error,
            });
        })
}
exports.deleteUser = (req, res) => {
    const id = req.params.userId;
    User.destroy({
      where: {  id: req.params.id },
    })
    .then (() => {
        res.status(200).json({
            message: "Your User has been succesfully deleted",
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            message: "INTERNAL SERVER",
            error: error,
        });
    })
}