require('dotenv').config();
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const monsterModel = require('../models/monsterModel');
const { sendEmail } = require('../services/user');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Post Method for registering a new account
router.post('/register', async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;
  try {
    email = email.toLowerCase();
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email déjà enregistré.' });
    }

    username = username.toLowerCase();
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Nom déjà enregistré.' });
    }

    if ( username === '' || email === '' || password === '' || passwordConfirm === '') {
      return res.status(400).json({ message: 'Veuillez remplir tous les champs.' });
    }

    if ( username.length < 3 || username.length > 12) {
      return res.status(400).json({ message: 'Username entre 3 et 12 caractère.' });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ message: 'Les mots de passe ne correspondent pas.' });
    }

    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '168h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Put Method for adding starter info in User
router.put('/addStarterToUser', async (req, res) => {
  const { starterName, starterPV, starterDMG } = req.body;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token manquant.' });
  }

  try {
    const decodedToken = verifyToken(token);
    const username = decodedToken.username;
    const existingUser = await userModel.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: 'Utilisateur introuvable.' });
    }

    existingUser.starterName = starterName;
    existingUser.starterMAXPV = starterPV;
    existingUser.starterPV = starterPV;
    existingUser.starterDMG = starterDMG;

    await existingUser.save();

    res.status(200).json({ message: 'Starter ajouté.'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Post Method for adding a monster
router.post('/addMonster', async (req, res) => {
  const { monstername, monsterPV, monsterDMG } = req.body;
  try {
    const existingMonster = await monsterModel.findOne({ monstername });
    if (existingMonster) {
      return res.status(400).json({ message: 'Monstre déjà enregistré.' });
    }

    const newMonster = new monsterModel({
      monstername,
      monsterPV,
      monsterDMG
    });

    await newMonster.save();

    res.status(200).json({ message: 'Monstre ajouté.'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Post Method for adding multiple monsters
router.post('/addMultipleMonsters', async (req, res) => {
  const monsters = req.body;
  try {
    for (let i = 0; i < monsters.length; i++) {
      const { monstername, monsterPV, monsterDMG } = monsters[i];
      const existingMonster = await monsterModel.findOne({ monstername });
      if (existingMonster) {
        return res.status(400).json({ message: `Monstre ${monstername} déjà enregistré.` });
      }
      const newMonster = new monsterModel({
        monstername,
        monsterPV,
        monsterDMG
      });
      await newMonster.save();
    }
    res.status(200).json({ message: 'Monstres ajoutés.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete method for deleting a monster
router.delete('/deleteMonster', async (req, res) => {
  const { monstername } = req.body;
  try {
    const deletedMonster = await monsterModel.findOneAndDelete({ monstername });
    if (!deletedMonster) {
      return res.status(400).json({ message: 'Monstre introuvable.' });
    }
    res.status(200).json({ message: 'Monstre supprimé.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update method for updating a monster
router.put('/updateMonster', async (req, res) => {
  const { monstername, monsterPV, monsterDMG } = req.body;
  try {
    const existingMonster = await monsterModel.findOne({ monstername });
    if (!existingMonster) {
      return res.status(400).json({ message: 'Monstre introuvable.' });
    }

    existingMonster.monsterPV = monsterPV;
    existingMonster.monsterDMG = monsterDMG;

    await existingMonster.save();

    res.status(200).json({ message: 'Monstre mis à jour.'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all method for monster
router.get('/getAllMonster', async (req, res) => {
  try {
      const data = await monsterModel.find();
      res.json(data)
  }
  catch (error) {
      res.status(500).json({ message: error.message })
  }
})

// Get random method for monster
router.get('/getRandomMonster/', async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token manquant.' });
  }

  try {
    const decodedToken = verifyToken(token);
    const username = decodedToken.username;
    const existingUser = await userModel.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: 'User introuvable.' });
    }
    const count = await monsterModel.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomMonster = await monsterModel.findOne().skip(randomIndex);
    randomMonster.monsterPV += Math.round(randomMonster.monsterPV * (existingUser.starterLVL * 0.5));
    randomMonster.monsterDMG += Math.round(randomMonster.monsterDMG * (existingUser.starterLVL * 0.1));
    if (existingUser.starterLVL % 5 == 0) {
      randomMonster.monsterPV = Math.round(randomMonster.monsterPV * 1.5);
      randomMonster.monsterDMG = Math.round(randomMonster.monsterDMG * 1.5);
    }
    res.json(randomMonster);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Put Method for changing stats after combat
router.put('/EndCombat', async (req, res) => {
  const { starterPV, monsterPV, nbPotion } = req.body;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token manquant.' });
  }

  try {
    const decodedToken = verifyToken(token);
    const username = decodedToken.username;
    const existingUser = await userModel.findOne({ username });
    if (!existingUser) {
      return res.status(200).json({ message: 'Utilisateur introuvable.' });
    }
    if (starterPV <= 0) {
      existingUser.starterPV = existingUser.starterMAXPV;
      existingUser.deathCount += 1;
      await existingUser.save();
      return res.status(200).json({ message: 'Vous avez perdu.' });
    }
    if (starterPV > 0 && monsterPV > 0) {
      return res.status(200).json({ message: 'Vous avez leave.' });
    }
    
    existingUser.healthPotionCount = nbPotion;

    if (Math.random() < 0.2) {
      existingUser.healthPotionCount += 1;
    }

    if (starterPV < existingUser.starterPV) {
      existingUser.starterPV = Math.round(starterPV + ((existingUser.starterPV - starterPV) * 0.5))+ 10;
    }else {
      existingUser.starterPV = starterPV + 10;
    }
    existingUser.starterMAXPV += 10;
    existingUser.starterDMG += 1;
    existingUser.starterLVL += 1;
    existingUser.killCount += 1;

    await existingUser.save();

    res.status(200).json({ message: 'Gagné ! LVL augmenté.'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get leaderboard Info
router.get('/leaderboard', async (req, res) => {
  try {
    const data = await userModel.find({}, { username: 1, killCount: 1, deathCount: 1, starterLVL: 1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Get all method for account
router.get('/getAll', async (req, res) => {
    try {
        const data = await userModel.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Validate token method
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Token invalide ou expiré.');
  }
}

// Get user method for an account
router.get('/getUser/', async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token manquant.' });
  }

  try {
    const decodedToken = verifyToken(token);
    const username = decodedToken.username;

    const user = await userModel.findOne({ username });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    // Si le token est invalide ou expiré, renvoyez une erreur
    res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
});

// Delete method for deleting a user
router.delete('/deleteUser', async (req, res) => {
  const { username } = req.body;
  try {
    const deletedUser = await userModel.findOneAndDelete({ username });
    if (!deletedUser) {
      return res.status(400).json({ message: 'User introuvable.' });
    }
    res.status(200).json({ message: 'User supprimé.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Post method for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'Utilisateur introuvable.' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '168h' });
        return res.status(200).json({ message: 'Authentification réussie.', token, starterName: user.starterName});
      } else {
        return res.status(400).json({ message: 'Authentification échouée.' });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
});
  
//Password Reset Request Method
router.post('/reset-password', async (req, res) => {
  try {
      const email = req.body.email;
      const user = await userModel.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Utilisateur non existant' });
      }
      // Generate a password reset token and store it in the user object
      const token = crypto.randomBytes(20).toString('hex');
      user.resetToken = token;
      user.resetTokenExpires = Date.now() + 3600000; // Token expires in 1 hour
      await user.save();
      // Send the password reset email with the reset link
      const resetLink = `http://localhost:3000/api/reset-password/${token}`;
      const emailBody = `Cliquer sur ce lien pour réinitialiser votre mot de passe : <a href="${resetLink}">${resetLink}</a><br><br>Si vous n'êtes pas à l'origine de ce changement, modifier immédiatement votre mot de passe.`;
      await sendEmail(email, 'Modification de votre mot de passe.', emailBody);
      res.status(200).json({ message: 'Lien de réinitialisation envoyé.' });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
})

//Password Reset Link Method
router.patch('/reset-password/:token', async (req, res) => {
  try {
    const token = req.params.token;
    const user = await userModel.findOne({ resetToken: token, resetTokenExpires: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: 'Token invalide ou expiré.' });
    }
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'Mot de passe requis.' });
    }
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();
    res.status(200).json({ message: 'Mot de passe changé.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;