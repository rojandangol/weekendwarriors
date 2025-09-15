//ref for server set up https://www.youtube.com/watch?v=r4t72mSj_X4
//To run use npm start


const express = require('express');
const db = require('./db');
const app = express();
const cors = require('cors');
const port = 3000;


app.use(cors());
app.use(express.json());


//-------------MAIN SERVER PAGE-----------------
app.get('/', (req,res)=> {
    res.send("Test Server running");
});
//-------------GET users PAGE-------------------
app.get('/users/:searchId', (req,res) => {
    const {searchId} = req.params;
    db.query(`SELECT * FROM Users WHERE user_id = ?;`, [searchId],(err,results) => {
        if (err) {
            console.error('Error getting users:' , err);
            res.status(500).send('Server error');
            return
        }
        //should output all attributes from users table 
        res.json(results);
        console.log(`test: ${results}`)
    });
});

//-------------POST addUsers PAGE---------------------
//ran to decode json sent via webpage
app.use(express.urlencoded({extended: true}));
app.post('/addUsers',(req,res) =>{
    //details holds the insert data.
    //should contain username, password, firstname, lastname, admin, user_icon
    const details = req.body;
    //MySQL INSERT query should insert new user with details and auto-incremented user_id
    db.query(`INSERT INTO Users SET ?`, details ,(err, results) =>{
        if (err) throw err;
        res.json(results);
    });
});   

//-------------GET SavedTips PAGE---------------------------
app.get('/SavedTips/:user', (req,res) => {
    const {user} = req.params;
    db.query(`SELECT * FROM Savedtips WHERE user_id = ?;`, [user],(err,results) =>{
        if(err){
            console.err('Error getting tips by type:',err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

//-------------POST addSavedTips PAGE-----------------------------
app.use(express.urlencoded({extended: true}));
app.post('/addSavedTip', (req, res)=> {
    const data = req.body;
    db.query(`INSERT INTO Savedtips SET ?;`, data, (err,results)=> {
        if (err) throw err;
        res.json(results);
    });
});

//-------------DELETE delSavedTips PAGE--------------------------
app.delete('/delSavedTips/:save_id',(req,res)=>{
    const {save_id} =  req.params;
    db.query(`DELETE FROM Savedtips WHERE save_id = ?;`, save_id, (err,results)=>{
        if(err){
            console.error('Error deleting saved tip:', err);
            res.status(500);
            return
        }
        res.json(results);
    });
});


//-------------GET ytLink PAGE-----------------------------
app.get('/ytLink/:tip_id',(req,res)=>{
    const {tip_id} = req.params;
    db.query(`SELECT ytlink FROM Tips WHERE tips_id = ?`, tip_id, (err,results)=>{
        if(err){
            console.error('Error getting youtube link:', err);
            res.status(500);
        }
        res.json(results);
    });
});
//----------SERVER INITIALIZATION ALERTSv--------
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
    console.log(`Server listening on port ${port}`);
});