// //ref for server set up https://www.youtube.com/watch?v=r4t72mSj_X4
// //To run use npm start

// require('dotenv').config();
// //for stripe payments
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 

// const express = require('express');
// const db = require('./db');
// const app = express();
// const bcrypt = require('bcrypt');
// const cors = require('cors');

// //using port 3000 because 3306 is mainly used my mysql. Having issues with docker.
// const port = 3000;
// const salt = 10;

// app.use(cors());
// app.use(express.json());


// //-------------MAIN SERVER PAGE-----------------
// app.get('/', (req, res) => {
//     res.send("Testing server running maybe 2.0");
// });

// //-------------GET users PAGE-------------------
// app.get('/users/:searchId', (req, res) => {
//     const { searchId } = req.params;
//     db.query(`SELECT * FROM Users WHERE user_id = ?;`, [searchId], (err, results) => {
//         if (err) {
//             console.error('Error getting users:', err);
//             res.status(500).send('Server error');
//             return
//         }
//         //should output all attributes from users table 
//         res.json(results);
//         console.log(`test: ${results}`)
//     });
// });

// //-------------POST addUsers PAGE---------------------
// //ran to decode json sent via webpage
// app.use(express.urlencoded({ extended: true }));
// app.post('/addUsers', (req, res) => {
//     //details holds the insert data.
//     //should contain username, password, firstname, lastname, admin, user_icon
//     const details = req.body;
//     //MySQL INSERT query should insert new user with details and auto-incremented user_id
//     db.query(`INSERT INTO Users SET ?`, details, (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });

// //-------------GET SavedTips PAGE---------------------------
// app.get('/SavedTips/:user', (req, res) => {
//     const { user } = req.params;
//     db.query(`SELECT * FROM Savedtips WHERE user_id = ?;`, [user], (err, results) => {
//         if (err) {
//             console.err('Error getting tips by type:', err);
//             res.status(500).send('Server error');

//         }
//     })
// });
// //-------------GET tipsCategory PAGE ----------------------
// app.get('/tipsType/:category', (req, res) => {
//     const {category} = req.params;
//     db.query(`SELECT  title, details, ytlink FROM Tips WHERE type= ?;`, [category],(err,results) => {
//         if(err){
//             console.error("Error getting tips by type:",err);
//             res.sendStatus(500);
//             return;
//         }
//         res.json(results);
//     });
// });

// //-------------GET SavedTips PAGE---------------------------
// app.get('/SavedTips/:user', (req,res) => {
//     const {user} = req.params;
//     db.query(`SELECT * FROM Savedtips WHERE user_id = ?;`, [user],(err,results) =>{
//         if(err){
//             console.error('Error getting tips by type:',err);
//             res.sendStatus(500);
//             return;
//         }
//         res.json(results);
//     });
// });

// //-------------GET Tips PAGE---------------------------

// app.get('/gettingtips', (req, res) => {
//     // const {searchId} = req.params;
//     const query = `SELECT * FROM Tips WHERE tips_id = 18;`;
//     db.query(query, (err, results) => {
//         if (err) {
//             console.error('Error getting users:', err);
//             res.status(500).send('Server error');
//             return
//         }
//         res.json(results);
//         //need to JSONIFY the table or else will return object:object
//         console.log(`test: ${JSON.stringify(results)}`)
//     });

// });

// //-------------GET All Tips PAGE---------------------------
// app.get('/allTips', (req, res) => {
//     const query = `SELECT * FROM Tips;`;
//     db.query(query, (err, results) => {
//         if(err){
//             console.error('Error getting all tips for search:', err);
//             res.status(500).send('Server error');
//             return
//         }
//         res.json(results);
//         console.log(`test: ${JSON.stringify(results)}`)
//     });    
// });


// //-------------POST addSavedTips PAGE-----------------------------
// app.use(express.urlencoded({ extended: true }));
// app.post('/addSavedTip', (req, res) => {
//     const data = req.body;
//     db.query(`INSERT INTO Savedtips SET ?;`, data, (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });

// //-------------DELETE delSavedTips PAGE--------------------------
// app.delete('/delSavedTips/:save_id', (req, res) => {
//     const { save_id } = req.params;
//     db.query(`DELETE FROM Savedtips WHERE save_id = ?;`, save_id, (err, results) => {
//         if (err) {
//             console.error('Error deleting saved tip:', err);
//             res.sendStatus(500);
//             return
//         }
//         res.json(results);
//     });
// });

// //--------------POSTING------------
// app.post('/putuserinfo', (req, res) => {

//     const { username, password, firstname, lastname, admin, user_icon } = req.body;

//     const query = `INSERT INTO Users (username, password, firstname, lastname, admin, user_icon) VALUES(?, ?, ?, ?,?,?)`;
//     db.query(query, [username, password, firstname, lastname, admin, user_icon], (err, result) => {
//         if (err) {
//             console.error('Error sending to users:', err);
//             res.status(500).send('Server error');
//             return
//         }

//         // res.json(db.query, [username, password, firstname, lastname, admin, user_icon])
//         res.status(200).json({ message: 'User added successfully', userId: result.insertId });


//     })
// });

// //-------------GET ytLink PAGE-----------------------------
// app.get('/ytLink/:tip_id', (req, res) => {
//     const { tip_id } = req.params;
//     db.query(`SELECT ytlink FROM Tips WHERE tips_id = ?`, tip_id, (err, results) => {
//         if (err) {
//             console.error('Error getting youtube link:', err);
//             res.sendStatus(500);
//         }
//         res.json(results);
//     });
// });



// //----------GET req for different Tips-------------
// app.get('/gettipsonclick/:type', (req,res) =>{

//     const type = req.params.type;
//     const query = `SELECT * FROM Tips WHERE type = ?;`;
//     db.query(query,[type], (err, results) => {
//         if (err) {
//             console.error('Error getting users:', err);
//             res.status(500).send('Server error');
//             return
//         }
//         // tipsid = results[0].tips_id;
//         res.json(results);
//         //need to JSONIFY the table or else will return object:object
//         console.log(`tips information ${JSON.stringify(results)}`);
//     });


// });

// // API to check user login
// //get username & password
// //very basic checker
// app.post('/checkuserlogin', (req, res) => {
//     const { username, password } = req.body;
    
//     const query = `SELECT password, user_id FROM Users WHERE username = ?`;
//     db.query(query, [username], (err, results) => {
//         if (err) {

//             console.error('Error fetching user:', err);
//             return res.status(500).send('Server error');
//         }
//         //if there's no results
//         if (results.length === 0) {
//             // no user found
//             return res.status(404).json({ message: 'User not found' });
//         }

//         //store the actual password 
//         const storedPassword = results[0].password;
//         const userid = results[0].user_id; 
        
//         if (results.length > 0) {
//             //compare the password
//             bcrypt.compare(password, storedPassword, (err, isMatch) => {
//                 if (err) {
//                     console.error('Error comparing passwords:', err);
//                     return res.status(500).send('Server error');
//                 }
//                 if (isMatch) {
//                     // Passwords match
//                     return res.status(200).json({ message: 'Login successful', userId: userid });
//                 } else {
//                     // Passwords do not match
//                     return res.status(401).json({ message: 'Invalid password' });
//                 }
//             });
//         }else {
//             // User not found
//             return res.status(404).json({ message: 'User not found' });
//         }
//     });
// });

// //-------------------POST signup PAGE ------------------------------------------
// app.post('/signup', (req, res) => {
//     const { username, password} = req.body;

//     // Check if the username already exists in the database
//     const checkQuery = `SELECT * FROM Users WHERE username = ?`;
//     db.query(checkQuery, [username], (err, results) => {
//         if (err) {
//             console.error('Error checking username:', err);
//             return res.status(500).send('Server error');
//         }

//         if (results.length > 0) {
//             // Username already exists
//             return res.status(400).json({ message: 'Username already exists' });
//         }

//         // Hash the password 
//         bcrypt.hash(password, salt, (err, hash) => {
//             if (err) {
//                 console.error('Error hashing password:', err);
//                 return res.status(500).send('Server error');
//             }

//             // Insert the new user into the database
//             const query = `INSERT INTO Users (username, password) VALUES (?, ?)`;
//             db.query(query, [username, hash], (err, result) => {
//                 if (err) {
//                     console.error('Error inserting user:', err);
//                     return res.status(500).send('Server error');
//                 }
//                 res.status(200).json({ message: 'User added successfully', userId: result.insertId });
//             });
//         });
//     });
// });

// //----------------------POST addTip PAGE ------------------------------------------
// app.post('/addTip', (req, res) => {
//     const tip = req.body;
//     const query = 'INSERT INTO tips SET ?';
//     db.query(query, tip, (err) => {
//         if(err) {
//             console.log('Error inserting tip:', err);
//             return res.status(500).send('Cannot add tip');
//         }
//         res.status(200).json({message: 'Tip added successfully'})
//     });
// });

// //---------------DELETE deleteTip PAGE -----------------------------------------------
// app.delete('/deleteTip/:tip_id', (req,res) => {
//     const tip_id = req.params;
//     const query = `DELETE FROM tips WHERE tip_id = ?`
//     db.query(query, tip_id, (err, results) =>{
//         if(err){
//             console.log("Error deleting tip:", err);
//             return res.status(500).send('Cannot delete tip');
//         }
//         res.status(200).json(results);
//     });
// });

// //save the tips
// app.post('/saveTip/:user_id', (req, res) => { 
//     const { user_id, tips_id } = req.body;
//     // console.log('🌐 [saveTips] req.body =', req.body);
//     const query = `INSERT INTO Savedtips (user_id, tips_id) VALUES (?, ?)`;
//     db.query(query, [user_id, tips_id], (err, results) => {
//         if (err) {
//             console.error('Error saving tips:', err);
//             return res.status(500).send('Server error');
//         }
//         res.json({ message: 'Tips saved successfully', results });           
//     });
// });

// //remove saved tips

// app.delete('/removeSavedTips/:save_id', (req, res) => {
//   const { save_id } = req.params;

//   const query = `DELETE FROM Savedtips WHERE save_id = ?`;
//   db.query(query, [save_id], (err, results) => {
//     if (err) {
//       console.error('Error deleting saved tip:', err);
//       return res.status(500).send('Server error');
//     }

//     if (results.affectedRows === 0) {
//       return res.status(404).json({ message: 'Saved tip not found' });
//     }

//     res.json({ message: 'Saved tip deleted successfully', results });
//   });
// });



// //retrive saved tips
// app.get('/retriveSavedTips/:user_id', (req, res) => {
    
//     const user_id = req.params.user_id;

//  const query = 
//   `SELECT DISTINCT t.*
// FROM Tips AS t
// JOIN Savedtips AS s
//   ON t.tips_id = s.tips_id
// WHERE s.user_id = ?
// ORDER BY s.save_id DESC;
// `
//  //`
// //     SELECT *
// //     FROM Tips
// //     JOIN Savedtips ON Tips.tips_id = Savedtips.tips_id
// //     WHERE Savedtips.user_id = ?
// //   `
  
//  ;

//   db.query(query, [user_id], (err, results) => {
//     if (err) {
//       console.error('Error fetching saved tips:', err);
//       return res.status(500).send('Server error');
//     }

//     return res.status(200).json(results); // Send even if results is empty
//   });
// });


// //-------------STRIPE PAYMENTS-------------------

// ///for stripe payments
// // This endpoint creates a PaymentIntent and returns its client secret
// app.post('/create-payment-intent', async (req, res) => {
//   const { amount, currency = 'usd' } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount, // in cents, e.g. $10 => 1000
//       currency,
//       payment_method_types: ['card'], // or ['card', 'apple_pay'] if you set that up
//     });

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error("Stripe error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // This endpoint returns the publishable key for the frontend
// app.get('/getpkey', (req, res) => {
//   res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
// });

// // This endpoint returns the secret key from the backend to the frontend
// app.get('/getskey', (req, res) => {
//     res.json({ secretKey: process.env.STRIPE_SECRET_KEY });
// });

// //----------SERVER INITIALIZATION ALERTSv--------
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}, debugging 101`)
//     console.log(`Server listening on port ${port}`);
// });

//ref for server set up https://www.youtube.com/watch?v=r4t72mSj_X4
//To run use npm start

require('dotenv').config();
//for stripe payments
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // 🔒 Use your actual *secret* key here

const express = require('express');
const db = require('./db');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');

//using port 3000 because 3306 is mainly used my mysql. Having issues with docker.
const port = 3000;
const salt = 10;

app.use(cors());
app.use(express.json());


//-------------MAIN SERVER PAGE-----------------
app.get('/', (req, res) => {
    res.send("Testing server running maybe 2.0");
});

//-------------GET users PAGE-------------------
app.get('/users/:searchId', (req, res) => {
    const { searchId } = req.params;
    db.query(`SELECT * FROM Users WHERE user_id = ?;`, [searchId], (err, results) => {
        if (err) {
            console.error('Error getting users:', err);
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
app.use(express.urlencoded({ extended: true }));
app.post('/addUsers', (req, res) => {
    //details holds the insert data.
    //should contain username, password, firstname, lastname, admin, user_icon
    const details = req.body;
    //MySQL INSERT query should insert new user with details and auto-incremented user_id
    db.query(`INSERT INTO Users SET ?`, details, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//-------------GET SavedTips PAGE---------------------------
app.get('/SavedTips/:user', (req, res) => {
    const { user } = req.params;
    db.query(`SELECT * FROM Savedtips WHERE user_id = ?;`, [user], (err, results) => {
        if (err) {
            console.err('Error getting tips by type:', err);
            res.status(500).send('Server error');

        }
    })
});
//-------------GET tipsCategory PAGE ----------------------
app.get('/tipsType/:category', (req, res) => {
    const {category} = req.params;
    db.query(`SELECT  title, details, ytlink FROM Tips WHERE type= ?;`, [category],(err,results) => {
        if(err){
            console.error("Error getting tips by type:",err);
            res.sendStatus(500);
            return;
        }
        res.json(results);
    });
});

//-------------GET SavedTips PAGE---------------------------
app.get('/SavedTips/:user', (req,res) => {
    const {user} = req.params;
    db.query(`SELECT * FROM Savedtips WHERE user_id = ?;`, [user],(err,results) =>{
        if(err){
            console.error('Error getting tips by type:',err);
            res.sendStatus(500);
            return;
        }
        res.json(results);
    });
});

//-------------GET Tips PAGE---------------------------

app.get('/gettingtips', (req, res) => {
    // const {searchId} = req.params;
    const query = `SELECT * FROM Tips WHERE tips_id = 18;`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error getting users:', err);
            res.status(500).send('Server error');
            return
        }
        res.json(results);
        //need to JSONIFY the table or else will return object:object
        console.log(`test: ${JSON.stringify(results)}`)
    });

});

//-------------GET All Tips PAGE---------------------------
app.get('/allTips', (req, res) => {
    const query = `SELECT * FROM Tips;`;
    db.query(query, (err, results) => {
        if(err){
            console.error('Error getting all tips for search:', err);
            res.status(500).send('Server error');
            return
        }
        res.json(results);
        console.log(`test: ${JSON.stringify(results)}`)
    });    
});


//-------------POST addSavedTips PAGE-----------------------------
app.use(express.urlencoded({ extended: true }));
app.post('/addSavedTip', (req, res) => {
    const data = req.body;
    db.query(`INSERT INTO Savedtips SET ?;`, data, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

//-------------DELETE delSavedTips PAGE--------------------------
app.delete('/delSavedTips/:save_id', (req, res) => {
    const { save_id } = req.params;
    db.query(`DELETE FROM Savedtips WHERE save_id = ?;`, save_id, (err, results) => {
        if (err) {
            console.error('Error deleting saved tip:', err);
            res.sendStatus(500);
            return
        }
        res.json(results);
    });
});

//--------------POSTING------------
app.post('/putuserinfo', (req, res) => {

    const { username, password, firstname, lastname, admin, user_icon } = req.body;

    const query = `INSERT INTO Users (username, password, firstname, lastname, admin, user_icon) VALUES(?, ?, ?, ?,?,?)`;
    db.query(query, [username, password, firstname, lastname, admin, user_icon], (err, result) => {
        if (err) {
            console.error('Error sending to users:', err);
            res.status(500).send('Server error');
            return
        }

        // res.json(db.query, [username, password, firstname, lastname, admin, user_icon])
        res.status(200).json({ message: 'User added successfully', userId: result.insertId });


    })
});

//-------------GET ytLink PAGE-----------------------------
app.get('/ytLink/:tip_id', (req, res) => {
    const { tip_id } = req.params;
    db.query(`SELECT ytlink FROM Tips WHERE tips_id = ?`, tip_id, (err, results) => {
        if (err) {
            console.error('Error getting youtube link:', err);
            res.sendStatus(500);
        }
        res.json(results);
    });
});



//----------GET req for different Tips-------------
app.get('/gettipsonclick/:type', (req,res) =>{

    const type = req.params.type;
    const query = `SELECT * FROM Tips WHERE type = ?;`;
    db.query(query,[type], (err, results) => {
        if (err) {
            console.error('Error getting users:', err);
            res.status(500).send('Server error');
            return
        }
        // tipsid = results[0].tips_id;
        res.json(results);
        //need to JSONIFY the table or else will return object:object
        console.log(`tips information ${JSON.stringify(results)}`);
    });


});

// API to check user login
//get username & password
//very basic checker
app.post('/checkuserlogin', (req, res) => {
    const { username, password } = req.body;
    
    const query = `SELECT password, user_id FROM Users WHERE username = ?`;
    db.query(query, [username], (err, results) => {
        if (err) {

            console.error('Error fetching user:', err);
            return res.status(500).send('Server error');
        }
        //if there's no results
        if (results.length === 0) {
            // no user found
            return res.status(404).json({ message: 'User not found' });
        }

        //store the actual password 
        const storedPassword = results[0].password;
        const userid = results[0].user_id; 
        
        if (results.length > 0) {
            //compare the password
            bcrypt.compare(password, storedPassword, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).send('Server error');
                }
                if (isMatch) {
                    // Passwords match
                    return res.status(200).json({ message: 'Login successful', userId: userid });
                } else {
                    // Passwords do not match
                    return res.status(401).json({ message: 'Invalid password' });
                }
            });
        }else {
            // User not found
            return res.status(404).json({ message: 'User not found' });
        }
    });
});

//-------------------POST signup PAGE ------------------------------------------
app.post('/signup', (req, res) => {
    const {firstname, lastname, email, phone_number, username, password} = req.body;

    // Check if the username already exists in the database
    const checkQuery = `SELECT * FROM Users WHERE username = ?`;
    db.query(checkQuery, [username], (err, results) => {
        if (err) {
            console.error('Error checking username:', err);
            return res.status(500).send('Server error');
        }

        if (results.length > 0) {
            // Username already exists
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password 
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).send('Server error');
            }

            // Insert the new user into the database
            const query = `INSERT INTO Users (firstname, lastname, email, phone_number, username, password) VALUES (?, ?, ?, ?, ?, ?)`;
            db.query(query, [firstname, lastname, email, phone_number, username, hash], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).send('Server error');
                }
                res.status(200).json({ message: 'User added successfully', userId: result.insertId });
            });
        });
    });
});

//----------------------POST addTip PAGE ------------------------------------------
app.post('/addTip', (req, res) => {
    const tip = req.body;
    const query = 'INSERT INTO tips SET ?';
    db.query(query, tip, (err) => {
        if(err) {
            console.log('Error inserting tip:', err);
            return res.status(500).send('Cannot add tip');
        }
        res.status(200).json({message: 'Tip added successfully'})
    });
});

//---------------DELETE deleteTip PAGE -----------------------------------------------
app.delete('/deleteTip/:tip_id', (req,res) => {
    const tip_id = req.params;
    const query = `DELETE FROM tips WHERE tip_id = ?`
    db.query(query, tip_id, (err, results) =>{
        if(err){
            console.log("Error deleting tip:", err);
            return res.status(500).send('Cannot delete tip');
        }
        res.status(200).json(results);
    });
});

app.delete('/deleteTipTitle/:title', (req, res) => {
    const title = req.params;
    const query = `DELETE FROM tips WHERE title = ?`;
    db.query(query, title, (err, results) => {
        if (err) {
            console.log("Error deleting tip:", err);
            return res.status(500).send('Cannot delete tip');
        }
        res.status(200).json(results);
    });
});

//save the tips
app.post('/saveTips', (req, res) => { 
    const { user_id, tips_id } = req.body;
    // console.log('🌐 [saveTips] req.body =', req.body);
    const query = `INSERT INTO Savedtips (user_id, tips_id) VALUES (?, ?)`;
    db.query(query, [user_id, tips_id], (err, results) => {
        if (err) {
            console.error('Error saving tips:', err);
            return res.status(500).send('Server error');
        }
        res.json({ message: 'Tips saved successfully', results });           
    });
});

//remove saved tips

app.delete('/removeSavedTips/:save_id', (req, res) => {
  const { save_id } = req.params;

  const query = `DELETE FROM Savedtips WHERE save_id = ?`;
  db.query(query, [save_id], (err, results) => {
    if (err) {
      console.error('Error deleting saved tip:', err);
      return res.status(500).send('Server error');
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Saved tip not found' });
    }

    res.json({ message: 'Saved tip deleted successfully', results });
  });
});



//retrive saved tips
app.get('/retriveSavedTips/:user_id', (req, res) => {
    
    const user_id = req.params.user_id;

  const query = `
    SELECT *
    FROM Tips
    JOIN Savedtips ON Tips.tips_id = Savedtips.tips_id
    WHERE Savedtips.user_id = ?;
  `;

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching saved tips:', err);
      return res.status(500).send('Server error');
    }

    return res.status(200).json(results); // Send even if results is empty
  });
});


//-------------STRIPE PAYMENTS-------------------

///for stripe payments
// This endpoint creates a PaymentIntent and returns its client secret
app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency = 'usd' } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // in cents, e.g. $10 => 1000
      currency,
      payment_method_types: ['card'], // or ['card', 'apple_pay'] if you set that up
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

// This endpoint returns the publishable key for the frontend
app.get('/getpkey', (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

// This endpoint returns the secret key from the backend to the frontend
app.get('/getskey', (req, res) => {
    res.json({ secretKey: process.env.STRIPE_SECRET_KEY });
});

//----------SERVER INITIALIZATION ALERTSv--------
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}, debugging 101`)
    console.log(`Server listening on port ${port}`);
});