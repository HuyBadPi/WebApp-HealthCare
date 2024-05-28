import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll(); // User này chính là modelName trong file user.js
        console.log("-----------------------------------------------");
        console.log(data);
        console.log("-----------------------------------------------");
        return res.render("homepage.ejs", {
            data: JSON.stringify(data),
        });
    } catch (error) {
        console.log(error);
    }
};

let test = (req, res) => {
    return res.render("test/aboutme.ejs");
};

let getCRUD = (req, res) => {
    return res.render("getcrud.ejs");
};

let postCRUD = async (req, res) => {
    await CRUDService.createNewUser(req.body);
    // console.log(req.body); // dòng này giúp in ra console trên vscode user nhập vào form, nó dùng để để kiểm tra xem mình đã đúng chưa chứ ko cần phải có dòng này
    return res.send("post crud");
};

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log(data);
    return res.render("displayCRUD.ejs", {
        dataTable: data,
    });
};

let getEditCRUD = async (req, res) => {
    let userId = req.query.id; // req.query.id, id chính là để : id? trên url
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);

        return res.render("editCRUD.ejs", {
            user: userData, // biến user sẽ được hiểu bên file view, {user: userData} : cái này có nghĩa là truyền object vào file editCRUD.ejs, lệnh này cũng na ná như gán userData cho user
        });
    } else {
        return res.send("No user found");
    }
};

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render("displayCRUD.ejs", {
        dataTable: allUsers,
    });
};

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send("delete the user successfully");
    } else {
        return res.send("No user found");
    }
};

module.exports = {
    getHomePage: getHomePage,
    test: test,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
};
